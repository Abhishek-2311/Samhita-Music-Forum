/**
 * Google Drive Folder File ID Extractor - Browser Bookmarklet
 * 
 * INSTRUCTIONS:
 * 1. Open a Google Drive folder in your browser
 * 2. Open browser console (F12 or Right-click → Inspect → Console)
 * 3. Copy and paste this entire script into the console
 * 4. Press Enter
 * 5. It will extract all file IDs and display them
 * 
 * OR save as bookmarklet:
 * Copy the minified version below and create a bookmark with it
 */

(function() {
  console.log('🔍 Extracting file IDs from Google Drive folder...');
  
  const fileIds = [];
  const fileNames = [];
  
  // Method 1: Try to find file IDs in the page data
  try {
    // Google Drive stores file data in window._DRIVE_initialData
    if (window._DRIVE_initialData) {
      const data = window._DRIVE_initialData;
      const files = extractFilesFromData(data);
      files.forEach(file => {
        fileIds.push(file.id);
        fileNames.push(file.name);
      });
    }
  } catch (e) {
    console.log('Method 1 failed, trying alternative...');
  }
  
  // Method 2: Look for data-item-id attributes
  try {
    const items = document.querySelectorAll('[data-item-id]');
    items.forEach(item => {
      const fileId = item.getAttribute('data-item-id');
      if (fileId && !fileIds.includes(fileId)) {
        fileIds.push(fileId);
        const name = item.querySelector('[data-target="name"]')?.textContent || 'Unknown';
        fileNames.push(name);
      }
    });
  } catch (e) {
    console.log('Method 2 failed');
  }
  
  // Method 3: Extract from URLs in the page
  try {
    const links = document.querySelectorAll('a[href*="/file/d/"]');
    links.forEach(link => {
      const match = link.href.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1] && !fileIds.includes(match[1])) {
        fileIds.push(match[1]);
        const name = link.textContent.trim() || link.getAttribute('aria-label') || 'Unknown';
        fileNames.push(name);
      }
    });
  } catch (e) {
    console.log('Method 3 failed');
  }
  
  // Helper function to recursively extract files from nested data
  function extractFilesFromData(data, files = []) {
    if (!data) return files;
    
    if (Array.isArray(data)) {
      data.forEach(item => extractFilesFromData(item, files));
    } else if (typeof data === 'object') {
      // Check if this is a file object
      if (data.id && data.mimeType && data.mimeType.startsWith('image/')) {
        files.push({ id: data.id, name: data.name || 'Unknown' });
      }
      
      // Recursively search nested objects
      Object.values(data).forEach(value => {
        if (typeof value === 'object' && value !== null) {
          extractFilesFromData(value, files);
        }
      });
    }
    
    return files;
  }
  
  // Display results
  if (fileIds.length > 0) {
    console.log(`\n✅ Found ${fileIds.length} image files!\n`);
    console.log('📋 File IDs and Names:');
    fileIds.forEach((id, index) => {
      console.log(`${index + 1}. ${fileNames[index] || 'Unknown'}`);
      console.log(`   ID: ${id}`);
      console.log(`   Link: https://drive.google.com/file/d/${id}/view?usp=sharing`);
      console.log('');
    });
    
    // Create output for easy copying
    const output = {
      folderUrl: window.location.href,
      fileCount: fileIds.length,
      files: fileIds.map((id, index) => ({
        id: id,
        name: fileNames[index] || 'Unknown',
        shareLink: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
        directImageLink: `https://drive.google.com/uc?export=view&id=${id}`
      }))
    };
    
    console.log('\n📦 Complete Data (copy this):');
    console.log(JSON.stringify(output, null, 2));
    
    // Copy to clipboard if possible
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(output, null, 2)).then(() => {
        console.log('\n✅ Data copied to clipboard!');
      });
    }
    
    return output;
  } else {
    console.log('❌ No file IDs found. Make sure you are viewing a Google Drive folder.');
    console.log('💡 Try scrolling down to load more files, then run the script again.');
    return null;
  }
})();

