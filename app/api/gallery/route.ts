import { NextResponse } from 'next/server';
import galleryManifest from '../../../public/gallery/gallery-manifest.json';

// Simple helper to slugify text for filenames or URLs
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

// Scrapes a Google Drive folder view page for files and folders
async function scrapeFolder(folderId: string) {
  const url = `https://drive.google.com/embeddedfolderview?id=${folderId}`;
  
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    // Prevent fetching stale cached results in serverless environment
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch Google Drive folder: ${res.status}`);
  }
  
  const html = await res.text();
  
  // Extract entry fields
  const entryRegex = /<div class="flip-entry" id="entry-([^"]+)"[\s\S]*?<a href="([^"]+)"[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div>/g;
  let match;
  const folders = [];
  const files = [];
  
  while ((match = entryRegex.exec(html)) !== null) {
    const id = match[1];
    const href = match[2];
    const name = match[3].trim();
    
    if (href.includes('/folders/') || href.includes('/drive/folders/')) {
      folders.push({ id, name });
    } else if (href.includes('/file/d/')) {
      files.push({ id, name });
    }
  }
  
  return { folders, files };
}

export async function GET() {
  const parentFolderId = process.env.NEXT_PUBLIC_GDRIVE_PARENT_FOLDER_ID;
  
  // Fallback to static manifest if parent folder ID is not configured
  if (!parentFolderId) {
    console.log('NEXT_PUBLIC_GDRIVE_PARENT_FOLDER_ID is not configured. Falling back to local manifest.');
    return NextResponse.json(galleryManifest);
  }
  
  try {
    console.log(`Fetching categories from parent folder: ${parentFolderId}`);
    const { folders: subfolders, files: parentFiles } = await scrapeFolder(parentFolderId);
    
    let notice = null;
    const noticeFile = parentFiles.find(f => {
      const nameLower = f.name.toLowerCase();
      return nameLower === 'notice.txt' ||
             nameLower === 'notice.jpg' ||
             nameLower === 'notice.jpeg' ||
             nameLower === 'notice.png' ||
             nameLower === 'notice.webp';
    });

    if (noticeFile) {
      const nameLower = noticeFile.name.toLowerCase();
      if (nameLower.endsWith('.txt')) {
        try {
          const noticeRes = await fetch(`https://drive.google.com/uc?export=download&id=${noticeFile.id}`);
          if (noticeRes.ok) {
            const textContent = (await noticeRes.text()).trim();
            if (textContent) {
              notice = {
                type: 'text',
                content: textContent
              };
            }
          }
        } catch (err: any) {
          console.error(`Failed to fetch notice text content: ${err.message}`);
        }
      } else {
        // Image notice
        notice = {
          type: 'image',
          content: `https://drive.google.com/thumbnail?id=${noticeFile.id}&sz=w1000`
        };
      }
    }
    
    if (subfolders.length === 0) {
      console.log('No subfolders found in parent folder. Returning static manifest.');
      return NextResponse.json({
        ...galleryManifest,
        notice
      });
    }
    
    // Fetch files from all subfolders in parallel
    const folderFetches = subfolders.map(async (folder) => {
      try {
        console.log(`Fetching files from subfolder: ${folder.name} (${folder.id})`);
        const { files } = await scrapeFolder(folder.id);
        
        // Filter to keep only image files
        const images = files.filter(f => /\.(jpe?g|png|webp|gif)$/i.test(f.name));
        return {
          categoryName: folder.name,
          images
        };
      } catch (err: any) {
        console.error(`Error fetching folder ${folder.name}: ${err.message}`);
        return { categoryName: folder.name, images: [] };
      }
    });
    
    const results = await Promise.all(folderFetches);
    
    const singlePhotos: any[] = [];
    const conferencePhotos: any[] = [];
    
    let photoIdCounter = 1;
    
    results.forEach((folder) => {
      const isAnnualConference = folder.categoryName.toLowerCase().startsWith('annual conference');
      
      // Parse year and month for Annual Conference
      let year = '';
      let month = '';
      if (isAnnualConference) {
        const yearMatch = folder.categoryName.match(/\b(20\d{2})\b/);
        if (yearMatch) year = yearMatch[1];
        
        // Match standard 3-letter month abbreviations
        const monthMatch = folder.categoryName.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/i);
        if (monthMatch) month = monthMatch[1];
      }
      
      folder.images.forEach((img) => {
        const fileId = img.id;
        const cleanTitle = img.name.replace(/\.[^/.]+$/, ""); // remove extension
        
        // Drive direct image thumbnail URL
        const srcUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
        
        if (isAnnualConference) {
          conferencePhotos.push({
            id: `conf-${year}-${fileId}`,
            src: srcUrl,
            title: cleanTitle,
            category: folder.categoryName,
            year,
            month
          });
        } else {
          singlePhotos.push({
            id: photoIdCounter++,
            src: srcUrl,
            title: cleanTitle,
            category: folder.categoryName
          });
        }
      });
    });
    
    // Sort items so order is stable
    singlePhotos.sort((a, b) => a.id - b.id);
    
    const manifest = {
      singlePhotos,
      conferencePhotos,
      notice
    };
    
    // Return dynamically scraped manifest with Edge caching headers
    return new NextResponse(JSON.stringify(manifest), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (err: any) {
    console.error('Error fetching dynamic gallery:', err.message);
    // Graceful fallback to static manifest on any error
    return NextResponse.json(galleryManifest);
  }
}
