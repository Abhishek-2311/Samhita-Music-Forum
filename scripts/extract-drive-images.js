/**
 * Google Drive Folder Image Extractor
 * 
 * This script helps extract image file IDs from Google Drive folders.
 * 
 * Usage:
 * 1. Install: npm install googleapis (or use the script with API)
 * 2. Or use the manual method below
 * 
 * Manual Method (Easier - No API needed):
 * 1. Open each folder in Google Drive
 * 2. Select all images (Ctrl+A)
 * 3. Right-click → "Get link" → Copy
 * 4. Paste the links here or use the folder ID method below
 */

const fs = require('fs');
const path = require('path');

// Folder IDs from the user's links
const folderIds = [
  '1-caUnDkSTHNYuEul4bwdZTYf3iEPw2wZ', // Folder 1
  '11kdkcERyii6KZ_oT2t8J2Husq9iUnckv', // Folder 2
  '10XQJmfc_-DsV8k5Ew2RHeSHr1mWNWVMF', // Folder 3
  '11prj5JlkaKrX5ba0wqG9PlsYLKl3M-Qg', // Folder 4
  '10NvKzc9S4jabGxAqd4apolrCMGLyFIbE', // Folder 5
  '1-QwVtArPRLtO48yYbHhZP2yfhKgDJsE6', // Folder 6
  '104yUYmczK5HCqHzUzb5YgwJMeBj7LZmY', // Folder 7
  '10dkcfM9IWu1J9SHAocE4Dy3mFieOPER2', // Folder 8
  '11-ZNEhakw-qFDgXKxcNYZZ5hxFrTZvUD', // Folder 9
  '11dyIBacLs2lB1t8l0dQYjaJ22fN3noKo', // Folder 10
  '1-toqqcyIENCH4R8BcPv-d7Dm31BHSlvi', // Folder 11
  '1-8e-UshFP_pHWaEIVnNe9hKUvgug_oQa', // Folder 12
  '10to-MOJCL3USbCrEl2SRjrfGkHsbNRzx', // Folder 13
];

console.log('📁 Google Drive Folder Image Extractor\n');
console.log('Since Google Drive API requires authentication, here are two options:\n');

console.log('OPTION 1: Quick Manual Method (Recommended)');
console.log('1. Open each folder in Google Drive');
console.log('2. Select all images (Ctrl+A or Cmd+A)');
console.log('3. Right-click → "Get link" → Copy the link');
console.log('4. The link will contain all file IDs');
console.log('5. Share that link with me\n');

console.log('OPTION 2: Use Google Drive Folder Embed');
console.log('We can embed the entire folder using iframe (simpler but less control)\n');

console.log('OPTION 3: Browser Extension/Bookmarklet');
console.log('I can create a bookmarklet that extracts all file IDs from a folder page\n');

// Generate folder links for easy access
console.log('\n📋 Your Folder Links:');
folderIds.forEach((id, index) => {
  console.log(`${index + 1}. https://drive.google.com/drive/folders/${id}?usp=sharing`);
});

console.log('\n💡 Tip: If you can share a single link that contains all images from a folder,');
console.log('   I can extract all the file IDs from it automatically!');

