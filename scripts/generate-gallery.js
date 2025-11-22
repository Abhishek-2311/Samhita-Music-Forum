/**
 * Gallery Image Generator Script
 * 
 * This script automatically scans the public/gallery folders and generates
 * the galleryPhotos array for the gallery component.
 * 
 * Usage: node scripts/generate-gallery.js
 */

const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, '../public/gallery');
const outputPath = path.join(__dirname, '../components/gallery-data.ts');

// Category mapping: folder name -> display name
const categoryMapping = {
  'annual-conference-photos': 'Annual Conference Photos',
  'music-therapy': 'Music Therapy',
  'appreciations-by-neighbouring-institutions': 'Appreciations by Neighbouring Institutions',
  'bytak': 'bytak',
  'dashamana': 'dashamana',
  'kalagourav': 'kalagourav',
  'media-reflections': 'Media Reflections',
  'special': 'special',
};

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function getAllImages(dir, basePath = '') {
  const images = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    const relativePath = path.join(basePath, item.name);

    if (item.isDirectory()) {
      // Recursively scan subdirectories (for year folders in annual-conference-photos)
      images.push(...getAllImages(fullPath, relativePath));
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (imageExtensions.includes(ext)) {
        images.push(relativePath.replace(/\\/g, '/'));
      }
    }
  }

  return images;
}

function generateGalleryData() {
  const galleryPhotos = [];
  let id = 1;

  // Scan each category folder
  for (const [folderName, displayName] of Object.entries(categoryMapping)) {
    const categoryPath = path.join(galleryPath, folderName);

    if (!fs.existsSync(categoryPath)) {
      console.log(`⚠️  Folder not found: ${categoryPath}`);
      continue;
    }

    const images = getAllImages(categoryPath);

    if (images.length === 0) {
      console.log(`ℹ️  No images found in: ${folderName}`);
      continue;
    }

    console.log(`✅ Found ${images.length} images in: ${folderName}`);

    // Add each image to the gallery
    for (const imagePath of images) {
      const fileName = path.basename(imagePath, path.extname(imagePath));
      const yearMatch = imagePath.match(/\/(\d{4})\//);
      const year = yearMatch ? yearMatch[1] : null;

      // Generate title from filename (capitalize and replace dashes/underscores)
      const title = fileName
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());

      // For annual conference photos, include year in title if found
      const finalTitle = year && folderName === 'annual-conference-photos'
        ? `Annual Conference ${year} - ${title}`
        : title;

      galleryPhotos.push({
        id: id++,
        src: `/gallery/${folderName}/${imagePath}`,
        title: finalTitle,
        description: '', // Can be customized later
        category: displayName,
      });
    }
  }

  return galleryPhotos;
}

function generateTypeScriptFile(photos) {
  const content = `// Auto-generated gallery data
// Run: node scripts/generate-gallery.js
// Last generated: ${new Date().toISOString()}

export interface GalleryPhoto {
  id: number
  src: string
  title: string
  description?: string
  category: string
}

export const galleryPhotos: GalleryPhoto[] = ${JSON.stringify(photos, null, 2)}
`;

  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`\n✅ Generated ${photos.length} gallery photos in: ${outputPath}`);
}

// Main execution
try {
  console.log('🔍 Scanning gallery folders...\n');
  const photos = generateGalleryData();
  
  if (photos.length === 0) {
    console.log('\n⚠️  No images found in any gallery folder.');
    console.log('   Please add images to the gallery folders first.');
    process.exit(0);
  }

  generateTypeScriptFile(photos);
  console.log(`\n✨ Success! ${photos.length} images added to gallery.`);
  console.log('   Update components/gallery-section.tsx to import from gallery-data.ts');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

