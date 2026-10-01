import React from 'react';

export interface ChutChiuLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon' | 'badge';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  frameless?: boolean;
  monochrome?: boolean;
}

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png';
export const LOCAL_LOGO_FALLBACK = '/logo-chut-chiu.png';

/**
 * Official G-ROOSTER CO.,LTD Brand Logo
 * Strict requirement: Uses <img> with exact URL https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png
 * Supports frameless mode for modern clean layout (no harsh white frame container)
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  size = 'md',
  className = '',
  frameless = false,
  monochrome = false,
}) => {
  if (frameless || monochrome) {
    const imgHeight = {
      xs: 'w-[80px] h-auto max-h-[24px]', // V195: Kích thước nhỏ gọn khoảng 80px, đơn sắc trắng mờ
      sm: 'h-[35px]', // Mobile requirement: 35px
      md: 'h-[42px] sm:h-[45px]', // Desktop requirement: 40-45px
      lg: 'h-[48px]',
      xl: 'h-[52px]',
    }[size];

    return (
      <div
        className={`inline-flex items-center justify-center select-none ${className}`}
        title="G-ROOSTER CO.,LTD"
      >
        <img
          src={OFFICIAL_LOGO_URL}
          alt="G-ROOSTER CO.,LTD - Hệ Thống Phân Phối Nông Sản & Đặc Sản Cao Cấp"
          referrerPolicy="no-referrer"
          width="80"
          height="23"
          style={{ aspectRatio: '160 / 45' }}
          className={`${imgHeight} object-contain block ${
            monochrome
              ? 'brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300'
              : ''
          }`}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.src = LOCAL_LOGO_FALLBACK;
          }}
        />
      </div>
    );
  }

  // Height classes:
  // Header: exactly 44px in rounded white box with symmetric padding
  // Footer: 52px - 56px in rounded white box
  const containerClass = {
    xs: 'h-[28px] px-1.5 py-0.5',
    sm: 'h-[36px] px-2 py-0.5',
    md: 'h-[44px] px-2.5 py-1',
    lg: 'h-[48px] px-3 py-1',
    xl: 'h-[52px] sm:h-[56px] px-3.5 py-1.5',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      title="G-ROOSTER CO.,LTD"
    >
      {/* High-contrast rounded white box with neat padding and perfect optical centering */}
      <div
        className={`bg-white rounded-xl shadow-xs border border-stone-200/80 flex items-center justify-center shrink-0 ${containerClass} hover:scale-[1.02] transition-transform duration-200`}
      >
        <img
          src={OFFICIAL_LOGO_URL}
          alt="G-ROOSTER CO.,LTD - Hệ Thống Phân Phối Nông Sản & Đặc Sản Cao Cấp"
          referrerPolicy="no-referrer"
          width="160"
          height="44"
          style={{ aspectRatio: '160 / 44' }}
          className="h-full w-auto max-h-full object-contain block mx-auto"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          onError={(e) => {
            // High reliability fallback to local copy
            e.currentTarget.src = LOCAL_LOGO_FALLBACK;
          }}
        />
      </div>
    </div>
  );
};

// Cached logo image for HTML5 Canvas QR code rendering (uses authentic official URL)
let logoImagePromise: Promise<HTMLImageElement> | null = null;
let cachedLogoImage: HTMLImageElement | null = null;

if (typeof window !== 'undefined') {
  cachedLogoImage = new Image();
  cachedLogoImage.crossOrigin = 'anonymous';
  cachedLogoImage.src = OFFICIAL_LOGO_URL;
  cachedLogoImage.onerror = () => {
    if (cachedLogoImage) {
      cachedLogoImage.src = LOCAL_LOGO_FALLBACK;
    }
  };
}

export function getLogoImage(): Promise<HTMLImageElement> {
  if (cachedLogoImage && cachedLogoImage.complete && cachedLogoImage.naturalWidth > 0) {
    return Promise.resolve(cachedLogoImage);
  }
  if (!logoImagePromise) {
    logoImagePromise = new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        cachedLogoImage = img;
        resolve(img);
      };
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          cachedLogoImage = fallbackImg;
          resolve(fallbackImg);
        };
        fallbackImg.onerror = () => resolve(fallbackImg);
        fallbackImg.src = LOCAL_LOGO_FALLBACK;
      };
      img.src = OFFICIAL_LOGO_URL;
    });
  }
  return logoImagePromise;
}

/**
 * Stamps the exact official logo file onto an HTML5 Canvas center badge
 * (for SmartQRCode and RecipeQRCode).
 * Uses the exact authentic logo image from https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png
 * inside a clean circular white badge.
 * Size is calibrated to ~22% diameter to guarantee 100% QR scannability under Error Correction 'H'.
 */
export function drawChutChiuLogoToCanvas(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const drawImageToBadge = (img: HTMLImageElement) => {
    ctx.save();

    // 1. Crisp white circular background with padding
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // 2. Subtle clean border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 1.5, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();

    // 3. Clip perfectly circular area and draw exact authentic logo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    const boxSize = radius * 2;
    try {
      ctx.drawImage(
        img,
        centerX - boxSize / 2,
        centerY - boxSize / 2,
        boxSize,
        boxSize
      );
    } catch (e) {
      console.warn('Canvas drawImage notice:', e);
    }
    ctx.restore();
  };

  if (cachedLogoImage && cachedLogoImage.complete && cachedLogoImage.naturalWidth > 0) {
    drawImageToBadge(cachedLogoImage);
  } else {
    getLogoImage()
      .then((img) => {
        drawImageToBadge(img);
      })
      .catch((err) => {
        console.warn('Could not load logo image for QR code center stamp:', err);
      });
  }
}
