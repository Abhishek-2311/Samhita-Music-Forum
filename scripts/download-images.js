const fs = require('fs');
const path = require('path');
const https = require('https');

// Parse gallery-section.tsx to extract image data
const projectRoot = path.join(__dirname, '..');
const galleryFilePath = path.join(projectRoot, 'components', 'gallery-section.tsx');
console.log('Reading gallery file from:', galleryFilePath);
const galleryContent = fs.readFileSync(galleryFilePath, 'utf8');

// Extract metadata using a simpler approach - match each object individually
const idMatches = Array.from(galleryContent.matchAll(/id:\s*(\d+)/g));
const fileIdMatches = Array.from(galleryContent.matchAll(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g));
const titleMatches = Array.from(galleryContent.matchAll(/title:\s*'([^']+)'/g));
const categoryMatches = Array.from(galleryContent.matchAll(/category:\s*'([^']+)'/g));
const rotationMatches = Array.from(galleryContent.matchAll(/rotation:\s*(\d+)/g));

console.log(`Found ${idMatches.length} IDs`);
console.log(`Found ${fileIdMatches.length} file IDs`);
console.log(`Found ${titleMatches.length} titles`);
console.log(`Found ${categoryMatches.length} categories`);

//Build metadata array
const photoMetadata = [];
for (let i = 0; i < Math.min(idMatches.length, fileIdMatches.length); i++) {
    photoMetadata.push({
        id: parseInt(idMatches[i][1]),
        fileId: fileIdMatches[i][1],
        title: titleMatches[i] ? titleMatches[i][1] : `Image ${i + 1}`,
        category: categoryMatches[i] ? categoryMatches[i][1] : 'uncategorized'
    });
}

console.log(`Built metadata for ${photoMetadata.length} images`);

// Create folder structure
const publicDir = path.join(projectRoot, 'public', 'gallery');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Create category folders
const categories = [...new Set(photoMetadata.map(p => p.category))];
console.log(`Creating folders for ${categories.length} categories`);
categories.forEach(cat => {
    const folderName = cat.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const catDir = path.join(publicDir, folderName);
    if (!fs.existsSync(catDir)) {
        fs.mkdirSync(catDir, { recursive: true });
    }
});

// Function to download a file from Google Drive
function downloadFile(fileId, outputPath) {
    return new Promise((resolve, reject) => {
        const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

        https.get(url, (response) => {
            // Handle redirects
            if (response.statusCode === 302 || response.statusCode === 301) {
                https.get(response.headers.location, (redirectResponse) => {
                    if (redirectResponse.statusCode === 200) {
                        const fileStream = fs.createWriteStream(outputPath);
                        redirectResponse.pipe(fileStream);
                        fileStream.on('finish', () => {
                            fileStream.close();
                            resolve();
                        });
                    } else {
                        reject(new Error(`Failed to download: ${redirectResponse.statusCode}`));
                    }
                }).on('error', reject);
            } else if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(outputPath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download: ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

// Download all images
async function downloadAllImages() {
    let downloaded = 0;
    let failed = 0;

    for (const photo of photoMetadata) {
        const folderName = photo.category.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
        const fileName = `image-${photo.id}.jpg`;
        const outputPath = path.join(publicDir, folderName, fileName);

        // Skip if file already exists
        if (fs.existsSync(outputPath)) {
            console.log(`Skipping ${photo.id}: ${photo.title} (already exists)`);
            downloaded++;
            continue;
        }

        try {
            console.log(`Downloading ${photo.id}: ${photo.title}...`);
            await downloadFile(photo.fileId, outputPath);
            console.log(`✓ Downloaded ${photo.id}: ${photo.title}`);
            downloaded++;

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error(`✗ Failed to download ${photo.id}: ${photo.title}`, error.message);
            failed++;
        }
    }

    console.log(`\nDownload complete: ${downloaded} successful, ${failed} failed`);

    // Save metadata for reference
    fs.writeFileSync(
        path.join(publicDir, 'metadata.json'),
        JSON.stringify(photoMetadata, null, 2)
    );
}

downloadAllImages().catch(console.error);
