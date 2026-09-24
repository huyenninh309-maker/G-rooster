const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createShadow(width, height) {
  const shadowCanvas = Buffer.alloc(width * height * 4);
  const cx = width / 2;
  const cy = height / 2;
  const rx = width * 0.45;
  const ry = height * 0.35;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * width + x) * 4;

      if (dist < 1.0) {
        const alpha = Math.pow(1 - dist, 1.6) * 0.32;
        shadowCanvas[idx] = 30;
        shadowCanvas[idx + 1] = 35;
        shadowCanvas[idx + 2] = 35;
        shadowCanvas[idx + 3] = Math.round(alpha * 255);
      } else {
        shadowCanvas[idx + 3] = 0;
      }
    }
  }

  return await sharp(shadowCanvas, { raw: { width, height, channels: 4 } })
    .blur(14)
    .png()
    .toBuffer();
}

async function processAll() {
  const masterPath = '/tmp/img_check/matcha_ceremonial_laka.jpg';
  const rawMaster = await sharp(masterPath).raw().toBuffer({ resolveWithObject: true });
  const w = rawMaster.info.width;
  const data = rawMaster.data;

  function isGreenBackdrop(r, g, b) {
    return (r < 65 && g > 70 && g < 135 && b > 45 && b < 105);
  }

  // 1. POUCH A: Ceremonial Grade (Green Label)
  console.log("Extracting Pouch A (Ceremonial)...");
  const cropA = { left: 1010, top: 245, width: 805, height: 985 };
  const rgbaA = Buffer.alloc(cropA.width * cropA.height * 4);

  for (let y = 0; y < cropA.height; y++) {
    const origY = y + cropA.top;
    for (let x = 0; x < cropA.width; x++) {
      const origX = x + cropA.left;
      const srcIdx = (origY * w + origX) * 3;
      const dstIdx = (y * cropA.width + x) * 4;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const isBg = isGreenBackdrop(r, g, b);
      if (isBg) {
        rgbaA[dstIdx] = 255;
        rgbaA[dstIdx + 1] = 255;
        rgbaA[dstIdx + 2] = 255;
        rgbaA[dstIdx + 3] = 0;
      } else {
        let cr = r, cg = g, cb = b;
        if (cg > cr + 20 && cg > cb + 15 && (cr > 140 || cb > 140)) {
          const avg = Math.round((cr + cb) / 2);
          cg = Math.min(cg, avg + 6);
        }
        rgbaA[dstIdx] = cr;
        rgbaA[dstIdx + 1] = cg;
        rgbaA[dstIdx + 2] = cb;
        rgbaA[dstIdx + 3] = 255;
      }
    }
  }

  // 2. POUCH B: Premium Grade (Blue Label)
  console.log("Extracting Pouch B (Premium)...");
  const cropB = { left: 140, top: 530, width: 895, height: 995 };
  const rgbaB = Buffer.alloc(cropB.width * cropB.height * 4);

  for (let y = 0; y < cropB.height; y++) {
    const origY = y + cropB.top;
    for (let x = 0; x < cropB.width; x++) {
      const origX = x + cropB.left;
      const srcIdx = (origY * w + origX) * 3;
      const dstIdx = (y * cropB.width + x) * 4;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const isBg = isGreenBackdrop(r, g, b);
      if (isBg) {
        rgbaB[dstIdx] = 255;
        rgbaB[dstIdx + 1] = 255;
        rgbaB[dstIdx + 2] = 255;
        rgbaB[dstIdx + 3] = 0;
      } else {
        let cr = r, cg = g, cb = b;
        if (cg > cr + 20 && cg > cb + 15 && (cr > 140 || cb > 140)) {
          const avg = Math.round((cr + cb) / 2);
          cg = Math.min(cg, avg + 6);
        }
        rgbaB[dstIdx] = cr;
        rgbaB[dstIdx + 1] = cg;
        rgbaB[dstIdx + 2] = cb;
        rgbaB[dstIdx + 3] = 255;
      }
    }
  }

  // 3. POUCH C: Culinary Grade (Gold/Amber Label)
  console.log("Creating Pouch C (Culinary)...");
  const rgbaC = Buffer.alloc(cropA.width * cropA.height * 4);

  for (let y = 0; y < cropA.height; y++) {
    for (let x = 0; x < cropA.width; x++) {
      const idx = (y * cropA.width + x) * 4;
      const r = rgbaA[idx];
      const g = rgbaA[idx + 1];
      const b = rgbaA[idx + 2];
      const a = rgbaA[idx + 3];

      if (a === 0) {
        rgbaC[idx] = 255;
        rgbaC[idx + 1] = 255;
        rgbaC[idx + 2] = 255;
        rgbaC[idx + 3] = 0;
      } else {
        if (g > r + 12 && g > b + 12) {
          const lum = (r * 0.299 + g * 0.587 + b * 0.114);
          const goldR = Math.min(255, Math.round(lum * 1.35 + 50));
          const goldG = Math.min(255, Math.round(lum * 0.95 + 20));
          const goldB = Math.max(10, Math.round(lum * 0.35));
          rgbaC[idx] = goldR;
          rgbaC[idx + 1] = goldG;
          rgbaC[idx + 2] = goldB;
        } else {
          rgbaC[idx] = r;
          rgbaC[idx + 1] = g;
          rgbaC[idx + 2] = b;
        }
        rgbaC[idx + 3] = 255;
      }
    }
  }

  const CANVAS_SIZE = 1200;
  const shadowBuffer = await createShadow(720, 160);

  const packs = [
    { name: 'matcha-ceremonial-real', rgba: rgbaA, w: cropA.width, h: cropA.height, targetH: 880 },
    { name: 'matcha-premium-real', rgba: rgbaB, w: cropB.width, h: cropB.height, targetH: 880 },
    { name: 'matcha-culinary-real', rgba: rgbaC, w: cropA.width, h: cropA.height, targetH: 880 }
  ];

  for (const pack of packs) {
    const pngPouchBuffer = await sharp(pack.rgba, { raw: { width: pack.w, height: pack.h, channels: 4 } })
      .resize({ height: pack.targetH, fit: 'inside' })
      .png()
      .toBuffer();

    const pouchMeta = await sharp(pngPouchBuffer).metadata();
    const pouchLeft = Math.round((CANVAS_SIZE - pouchMeta.width) / 2);
    const pouchTop = Math.round((CANVAS_SIZE - pouchMeta.height) / 2) - 30;

    const shadowLeft = Math.round((CANVAS_SIZE - 720) / 2);
    const shadowTop = pouchTop + pouchMeta.height - 75;

    const finalJpg = await sharp({
      create: {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
      }
    })
    .composite([
      { input: shadowBuffer, left: shadowLeft, top: shadowTop },
      { input: pngPouchBuffer, left: pouchLeft, top: pouchTop }
    ])
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4' })
    .toBuffer();

    const dir1 = path.join(__dirname, 'public/images/matcha');
    const dir2 = path.join(__dirname, 'public/images/matcha-real');
    fs.mkdirSync(dir1, { recursive: true });
    fs.mkdirSync(dir2, { recursive: true });

    fs.writeFileSync(path.join(dir1, `${pack.name}.jpg`), finalJpg);
    fs.writeFileSync(path.join(dir2, `${pack.name}.jpg`), finalJpg);

    // Also write PNG format as well for crisp rendering
    const finalPng = await sharp({
      create: {
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      }
    })
    .composite([
      { input: shadowBuffer, left: shadowLeft, top: shadowTop },
      { input: pngPouchBuffer, left: pouchLeft, top: pouchTop }
    ])
    .png()
    .toBuffer();

    fs.writeFileSync(path.join(dir1, `${pack.name}.png`), finalPng);
    fs.writeFileSync(path.join(dir2, `${pack.name}.png`), finalPng);

    console.log(`Saved ${pack.name} (jpg and png) successfully! Size: ${finalJpg.length} bytes`);
  }
}

processAll().catch(err => {
  console.error("Error processing matcha:", err);
  process.exit(1);
});
