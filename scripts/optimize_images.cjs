const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

async function optimizeAll() {
  const imagesDir = path.resolve(__dirname, '../public/images');
  const allFiles = getAllFiles(imagesDir);
  console.log(`Found ${allFiles.length} files in public/images`);

  let convertedToWebp = 0;
  let generatedThumbs = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const dir = path.dirname(file);

    // Skip already generated -thumb files
    if (baseName.endsWith('-thumb')) {
      continue;
    }

    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const webpPath = path.join(dir, `${baseName}.webp`);
      const thumbPath = path.join(dir, `${baseName}-thumb.webp`);

      try {
        // 1. Create high-res WebP if not exists
        if (!fs.existsSync(webpPath)) {
          await sharp(file)
            .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 85 })
            .toFile(webpPath);
          convertedToWebp++;
        }

        // 2. Create 400px thumbnail WebP
        if (!fs.existsSync(thumbPath)) {
          await sharp(file)
            .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(thumbPath);
          generatedThumbs++;
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
        errors++;
      }
    } else if (ext === '.webp') {
      const thumbPath = path.join(dir, `${baseName}-thumb.webp`);
      try {
        if (!fs.existsSync(thumbPath)) {
          await sharp(file)
            .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(thumbPath);
          generatedThumbs++;
        }
      } catch (err) {
        console.error(`Error generating thumb for ${file}:`, err.message);
        errors++;
      }
    }
  }

  console.log(`Optimization complete:`);
  console.log(`- Converted to high-res WebP: ${convertedToWebp}`);
  console.log(`- Generated 400px WebP Thumbnails: ${generatedThumbs}`);
  console.log(`- Errors: ${errors}`);
}

optimizeAll();
