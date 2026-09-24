const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function getPouchSVG(type) {
  // Config per grade
  let bgGradient, titleType, subTitle, labelArt, logoSubText;
  
  if (type === 'ceremonial') {
    titleType = 'MATCHA';
    subTitle = '(CEREMONIAL GRADE)';
    logoSubText = 'Laka';
    bgGradient = `
      <linearGradient id="lblBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#E8F4E5" />
        <stop offset="50%" stop-color="#D9ECD4" />
        <stop offset="100%" stop-color="#C5E3BE" />
      </linearGradient>
    `;
    labelArt = `
      <!-- Mt Fuji silhouette with snow cap -->
      <path d="M 50 320 Q 150 220 210 160 Q 220 168 230 160 Q 290 220 390 320 Z" fill="#E8F1E5" opacity="0.85" />
      <path d="M 195 175 Q 210 160 225 175 Q 235 195 245 205 L 225 210 L 215 200 L 205 210 L 190 200 Z" fill="#FFFFFF" />
      <!-- Soft misty mountain slopes in pale sage -->
      <path d="M 0 350 Q 120 290 240 330 Q 340 280 440 340 L 440 430 L 0 430 Z" fill="#A8CDA0" opacity="0.65" />
      <path d="M 0 370 Q 160 330 320 360 Q 380 340 440 380 L 440 430 L 0 430 Z" fill="#8BB883" opacity="0.8" />
      
      <!-- Foreground: Traditional Japanese Chawan Tea Bowl (Chén trà) -->
      <g transform="translate(180, 310)">
        <!-- Bowl Outer Shadow -->
        <ellipse cx="45" cy="58" rx="42" ry="10" fill="#000000" opacity="0.2" />
        <!-- Ceramic Chawan Bowl -->
        <path d="M 10 20 Q 5 45 25 54 Q 45 58 65 54 Q 85 45 80 20 Z" fill="#1C211E" stroke="#2D332F" stroke-width="2" />
        <!-- White glaze rim texture -->
        <ellipse cx="45" cy="20" rx="35" ry="8" fill="#2A332D" />
        <!-- Bright Jade Green Matcha froth inside bowl -->
        <ellipse cx="45" cy="20" rx="32" ry="6.5" fill="#48A834" />
        <ellipse cx="43" cy="20" rx="26" ry="4.5" fill="#58C042" />
        <circle cx="38" cy="19" r="2.5" fill="#78D862" opacity="0.8" />
        <circle cx="50" cy="21" r="2" fill="#78D862" opacity="0.8" />
      </g>

      <!-- Bamboo Whisk (Chổi tre Chasen) -->
      <g transform="translate(265, 315)">
        <!-- Shadow -->
        <ellipse cx="25" cy="46" rx="16" ry="5" fill="#000000" opacity="0.18" />
        <!-- Whisk handle -->
        <rect x="20" y="24" width="10" height="22" rx="3" fill="#D8BE91" stroke="#BA9C6B" stroke-width="1" />
        <!-- String binding -->
        <rect x="19.5" y="32" width="11" height="4" fill="#3D291A" />
        <!-- Tines fan -->
        <path d="M 17 24 Q 8 10 15 2 Q 25 6 35 2 Q 42 10 33 24 Z" fill="#E8D7B5" stroke="#C8AE82" stroke-width="1" />
        <path d="M 21 23 Q 23 7 25 3 Q 27 7 29 23" stroke="#BA9C6B" stroke-width="1" fill="none" />
      </g>

      <!-- Small ceramic dish with mound of fine green matcha powder -->
      <g transform="translate(260, 360)">
        <ellipse cx="28" cy="18" rx="24" ry="7" fill="#EAEAEA" stroke="#D0D0D0" stroke-width="1" />
        <path d="M 12 18 Q 28 8 44 18 Z" fill="#46A432" />
        <path d="M 16 18 Q 28 11 40 18 Z" fill="#5DC447" />
      </g>
    `;
  } else if (type === 'premium') {
    titleType = 'MATCHA';
    subTitle = '(PREMIUM)';
    logoSubText = 'Laka Food';
    bgGradient = `
      <linearGradient id="lblBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#E2F2F5" />
        <stop offset="50%" stop-color="#CCE7EC" />
        <stop offset="100%" stop-color="#B2DAE2" />
      </linearGradient>
    `;
    labelArt = `
      <!-- Soft reddish moon/sun dot in upper right -->
      <circle cx="340" cy="170" r="14" fill="#B85D48" opacity="0.85" />
      
      <!-- Flock of 5 flying birds -->
      <g stroke="#3A5850" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.75">
        <path d="M 90 180 Q 94 175 98 180 Q 102 175 106 180" />
        <path d="M 120 170 Q 124 165 128 170 Q 132 165 136 170" />
        <path d="M 115 195 Q 118 191 121 195 Q 124 191 127 195" />
        <path d="M 145 185 Q 148 181 151 185 Q 154 181 157 185" />
        <path d="M 165 175 Q 168 171 171 175 Q 174 171 177 175" />
      </g>

      <!-- Rolling misty mountains in rich teal & forest green -->
      <path d="M -10 320 Q 90 240 190 290 Q 290 230 450 310 L 450 430 L -10 430 Z" fill="#4B776A" opacity="0.7" />
      <path d="M -10 350 Q 120 270 260 340 Q 360 290 450 350 L 450 430 L -10 430 Z" fill="#32584C" opacity="0.85" />
      <path d="M -10 380 Q 80 320 200 370 Q 320 310 450 370 L 450 430 L -10 430 Z" fill="#203E35" />

      <!-- Foreground: White Teacup with green matcha latte swirl -->
      <g transform="translate(145, 290)">
        <!-- Teacup Shadow -->
        <ellipse cx="48" cy="48" rx="38" ry="12" fill="#000000" opacity="0.25" />
        <!-- Cup handle -->
        <path d="M 18 36 Q 4 38 10 50 Q 16 54 24 48" fill="none" stroke="#E5ECE9" stroke-width="4.5" stroke-linecap="round" />
        <!-- Cup outer -->
        <circle cx="48" cy="42" r="32" fill="#F4F8F6" stroke="#D3DDD8" stroke-width="2" />
        <!-- Cup inner & matcha swirl -->
        <circle cx="48" cy="42" r="27" fill="#3A8A32" />
        <path d="M 36 34 Q 48 28 58 38 Q 62 48 50 54 Q 38 52 42 42 Q 46 38 50 42" fill="none" stroke="#68CF58" stroke-width="3" stroke-linecap="round" />
        <circle cx="48" cy="42" r="2.5" fill="#A4F495" />
      </g>

      <!-- Bamboo Whisk (Chasen) -->
      <g transform="translate(235, 305) rotate(22)">
        <rect x="18" y="24" width="9" height="20" rx="2.5" fill="#D8BD8E" stroke="#BA9B6A" stroke-width="1" />
        <rect x="17.5" y="31" width="10" height="3.5" fill="#4A3423" />
        <path d="M 15 24 Q 7 11 14 3 Q 23 7 32 3 Q 39 11 31 24 Z" fill="#E5D3B0" stroke="#C4A87C" stroke-width="1" />
      </g>

      <!-- Wooden scoop & tea leaves -->
      <g transform="translate(210, 360)">
        <!-- Wooden spoon -->
        <path d="M 25 15 Q 35 28 65 52 Q 68 54 65 56 Q 62 56 32 28 Q 20 18 25 15 Z" fill="#D4A86A" stroke="#B0864A" stroke-width="1" />
        <!-- Scoop head with bright green matcha -->
        <circle cx="26" cy="17" r="14" fill="#3C9630" />
        <circle cx="25" cy="16" r="10" fill="#58BF48" />
        <!-- Green tea leaf -->
        <path d="M 5 8 Q 15 -4 30 2 Q 22 14 5 8 Z" fill="#2E6A26" />
      </g>
    `;
  } else {
    // Culinary Grade
    titleType = 'MATCHA';
    subTitle = '(CULINARY GRADE)';
    logoSubText = 'Laka';
    bgGradient = `
      <linearGradient id="lblBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFF9E6" />
        <stop offset="45%" stop-color="#FDF0C2" />
        <stop offset="100%" stop-color="#F5DB88" />
      </linearGradient>
    `;
    labelArt = `
      <!-- Bold Radiant RED SUN Rising -->
      <circle cx="220" cy="285" r="42" fill="#E63946" />
      
      <!-- Overlapping Green & Chartreuse Mountain Ridges -->
      <path d="M 0 310 L 80 240 L 160 300 L 220 270 L 320 340 L 440 280 L 440 430 L 0 430 Z" fill="#88B83E" opacity="0.9" />
      <path d="M 0 340 L 110 280 L 210 350 L 330 290 L 440 360 L 440 430 L 0 430 Z" fill="#628C28" opacity="0.95" />
      <path d="M 0 375 Q 120 330 230 380 Q 340 320 440 385 L 440 430 L 0 430 Z" fill="#426019" />
    `;
  }

  return `
<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Canvas Pure White -->
    <!-- Pouch 3D Shading Gradients -->
    <linearGradient id="pouchBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ECECEC" />
      <stop offset="4%" stop-color="#FAFAFA" />
      <stop offset="18%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#F7F7F7" />
      <stop offset="82%" stop-color="#FFFFFF" />
      <stop offset="96%" stop-color="#F5F5F5" />
      <stop offset="100%" stop-color="#E2E2E2" />
    </linearGradient>

    <!-- Top Seal Texture -->
    <linearGradient id="topSeal" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EAEAEA" />
      <stop offset="50%" stop-color="#F5F5F5" />
      <stop offset="100%" stop-color="#DFDFDF" />
    </linearGradient>

    <!-- Base Shadow Gradient -->
    <radialGradient id="baseShadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.32" />
      <stop offset="40%" stop-color="#000000" stop-opacity="0.18" />
      <stop offset="75%" stop-color="#000000" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    ${bgGradient}

    <!-- Filter for label shadow -->
    <filter id="labelShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.09" />
    </filter>
  </defs>

  <!-- Pure White Studio Canvas -->
  <rect width="1200" height="1200" fill="#FFFFFF" />

  <!-- 1. SOFT STUDIO DROP SHADOW AT THE BASE -->
  <ellipse cx="600" cy="1065" rx="340" ry="40" fill="url(#baseShadow)" />
  <ellipse cx="600" cy="1060" rx="270" ry="22" fill="#000000" opacity="0.16" />

  <!-- 2. STAND-UP WHITE MATTE ALUMINUM POUCH -->
  <g id="pouch-geometry">
    <!-- Main Pouch Body (Standup pouch with curved bottom gusset) -->
    <path d="
      M 340 180
      L 860 180
      Q 875 180 875 195
      L 865 990
      Q 865 1045 600 1055
      Q 335 1045 335 990
      L 325 195
      Q 325 180 340 180
      Z
    " fill="url(#pouchBody)" stroke="#E0E0E0" stroke-width="1.5" />

    <!-- Subtle 3D side crease reflections (natural crinkle of matte foil) -->
    <path d="M 335 220 Q 365 600 350 980" stroke="#FFFFFF" stroke-width="4" fill="none" opacity="0.8" />
    <path d="M 865 220 Q 835 600 850 980" stroke="#E6E6E6" stroke-width="3" fill="none" opacity="0.6" />
    <!-- Bottom Gusset Fold Line -->
    <path d="M 345 990 Q 600 1025 855 990" stroke="#DCDCDC" stroke-width="2" fill="none" />
    <path d="M 370 1015 Q 600 1045 830 1015" stroke="#E8E8E8" stroke-width="1.5" fill="none" />

    <!-- Top Heat Seal Bar (Khía xé & Seal) -->
    <g transform="translate(0, 0)">
      <!-- Sealed area background -->
      <path d="M 326 180 L 874 180 L 873 240 L 327 240 Z" fill="url(#topSeal)" />
      <!-- Left Notch (Khía xé trái) -->
      <polygon points="325,205 335,210 325,215" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1" />
      <!-- Right Notch (Khía xé phải) -->
      <polygon points="875,205 865,210 875,215" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="1" />
      <!-- Fine Vertical Seal Ribbing -->
      <line x1="330" y1="183" x2="870" y2="183" stroke="#D0D0D0" stroke-width="1.5" stroke-dasharray="3,3" />
      <line x1="330" y1="187" x2="870" y2="187" stroke="#FFFFFF" stroke-width="1" />
      
      <!-- PULL TAB TO OPEN Track -->
      <g transform="translate(355, 208)">
        <!-- Pull tab icon -->
        <path d="M 5 4 Q 0 8 5 12 Q 10 12 12 8 Q 10 4 5 4 Z" fill="#333333" />
        <text x="22" y="11" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10.5" font-weight="700" fill="#333333" letter-spacing="1.5">PULL TAB TO OPEN</text>
        <text x="175" y="11" font-family="Arial, sans-serif" font-size="9" fill="#444444" letter-spacing="4">▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶ ▶</text>
        <!-- Perforated Tear Line -->
        <line x1="0" y1="17" x2="490" y2="17" stroke="#777777" stroke-width="1.2" stroke-dasharray="5,4" />
      </g>

      <!-- PRESS TO RESEAL Zipper Line -->
      <g transform="translate(355, 238)">
        <text x="170" y="11" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="10" font-weight="800" fill="#222222" letter-spacing="2">PRESS TO RESEAL</text>
        <!-- Fine Zipper Teeth Graphic on left & right -->
        <path d="M 0 8 L 155 8" stroke="#333333" stroke-width="1.5" stroke-dasharray="2,2" />
        <path d="M 335 8 L 490 8" stroke="#333333" stroke-width="1.5" stroke-dasharray="2,2" />
      </g>
    </g>
  </g>

  <!-- 3. ROUNDED RECTANGULAR ARTISTIC LABEL (CHÍNH HÃNG LAKA) -->
  <g transform="translate(380, 275)" filter="url(#labelShadow)">
    <!-- Label Base Card with Rounded Corners (rx=24) -->
    <rect width="440" height="520" rx="26" fill="url(#lblBg)" stroke="#FFFFFF" stroke-width="3" />

    <!-- A. TOP BRAND LOGO: LAKA TREE EMBLEM -->
    <g transform="translate(220, 48)">
      <!-- Circular brown badge -->
      <ellipse cx="0" cy="0" rx="24" ry="24" fill="#8B4828" />
      <!-- Tree of Life silhouette inside logo -->
      <!-- Trunk and roots -->
      <path d="M -2 14 L -2 2 L 2 2 L 2 14 Z" fill="#FFFFFF" />
      <path d="M -2 12 Q -8 16 -12 18" stroke="#FFFFFF" stroke-width="1.5" fill="none" />
      <path d="M 2 12 Q 8 16 12 18" stroke="#FFFFFF" stroke-width="1.5" fill="none" />
      <!-- Tree branches & leaves canopy -->
      <circle cx="0" cy="-6" r="13" fill="#FFFFFF" opacity="0.95" />
      <circle cx="-7" cy="-2" r="7" fill="#FFFFFF" />
      <circle cx="7" cy="-2" r="7" fill="#FFFFFF" />
      <path d="M 0 -16 L 0 0" stroke="#8B4828" stroke-width="1.5" />
      <path d="M -8 -8 Q 0 -3 0 0" stroke="#8B4828" stroke-width="1.2" fill="none" />
      <path d="M 8 -8 Q 0 -3 0 0" stroke="#8B4828" stroke-width="1.2" fill="none" />

      <!-- Brand name below emblem -->
      <text x="0" y="38" font-family="'Plus Jakarta Sans', Georgia, serif" font-size="18" font-weight="900" fill="#7A3C20" text-anchor="middle" letter-spacing="1">
        ${logoSubText}
      </text>
    </g>

    <!-- B. TYPOGRAPHY: MATCHA & GRADE -->
    <text x="220" y="132" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="32" font-weight="900" fill="#1C2420" text-anchor="middle" letter-spacing="2.5">
      ${titleType}
    </text>
    <text x="220" y="156" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="800" fill="#2D3A32" text-anchor="middle" letter-spacing="1.2">
      ${subTitle}
    </text>

    <!-- C. ARTWORK (LANDSCAPE & ILLUSTRATION) -->
    <g clip-path="url(#labelClip)">
      <clipPath id="labelClip">
        <rect x="0" y="165" width="440" height="355" rx="26" />
      </clipPath>
      ${labelArt}
    </g>

    <!-- D. BOTTOM LEFT CHECKBOXES: 100g, 200g, 500g -->
    <g transform="translate(36, 420)">
      <!-- 100g (Checked) -->
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="14" height="14" rx="2" fill="#FFFFFF" stroke="#333333" stroke-width="1.5" />
        <path d="M 3 7 L 6 10 L 12 3" stroke="#1A532A" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <text x="20" y="12" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="800" fill="#1E2A22">100g</text>
      </g>

      <!-- 200g (Unchecked) -->
      <g transform="translate(0, 22)">
        <rect x="0" y="0" width="14" height="14" rx="2" fill="#FFFFFF" stroke="#555555" stroke-width="1.5" opacity="0.8" />
        <text x="20" y="12" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="#445046">200g</text>
      </g>

      <!-- 500g (Unchecked) -->
      <g transform="translate(0, 44)">
        <rect x="0" y="0" width="14" height="14" rx="2" fill="#FFFFFF" stroke="#555555" stroke-width="1.5" opacity="0.8" />
        <text x="20" y="12" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="#445046">500g</text>
      </g>
    </g>
  </g>
</svg>
  `;
}

async function renderAll() {
  const list = [
    { type: 'ceremonial', name: 'matcha-ceremonial-real' },
    { type: 'premium', name: 'matcha-premium-real' },
    { type: 'culinary', name: 'matcha-culinary-real' },
  ];

  for (const item of list) {
    const svgString = getPouchSVG(item.type);
    const svgBuffer = Buffer.from(svgString);

    // Render JPG with crisp 96% quality at 1200x1200
    const jpgBuffer = await sharp(svgBuffer)
      .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
      .toBuffer();

    const pngBuffer = await sharp(svgBuffer)
      .png()
      .toBuffer();

    const dir1 = path.join(__dirname, 'public/images/matcha');
    const dir2 = path.join(__dirname, 'public/images/matcha-real');
    fs.mkdirSync(dir1, { recursive: true });
    fs.mkdirSync(dir2, { recursive: true });

    fs.writeFileSync(path.join(dir1, `${item.name}.jpg`), jpgBuffer);
    fs.writeFileSync(path.join(dir1, `${item.name}.png`), pngBuffer);
    fs.writeFileSync(path.join(dir2, `${item.name}.jpg`), jpgBuffer);
    fs.writeFileSync(path.join(dir2, `${item.name}.png`), pngBuffer);

    console.log(`Generated ${item.name} at 1200x1200 successfully! JPG: ${jpgBuffer.length} bytes, PNG: ${pngBuffer.length} bytes`);
  }
}

renderAll().catch(err => {
  console.error("Render failed:", err);
  process.exit(1);
});
