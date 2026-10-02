import React from 'react';

export interface ChutChiuLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon' | 'badge';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'compact';
  showSubtitle?: boolean;
  className?: string;
  frameless?: boolean;
  monochrome?: boolean;
}

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/5y1LQRxR/Gemini-Generated-Image-bnvr0bnvr0bnvr0b.png';
export const LOCAL_LOGO_FALLBACK = '/logo-grooster-new.png';

/**
 * Official G-ROOSTER CO.,LTD Brand Logo (V207):
 * - Nâng cấp kích thước Logo Header: 65px - 75px trên Desktop (size='md')
 * - Đồng bộ Logo Mobile: 45px - 50px (size='sm')
 * - Loại bỏ hoàn toàn lớp padding/margin dư thừa và "ô trắng nhỏ lạc lõng"
 * - Hiển thị tự nhiên, sắc nét, object-fit: contain
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  size = 'md',
  className = '',
  monochrome = false,
}) => {
  // Height classes (V208):
  // Desktop header: 65px - 70px (chuẩn V207/V208)
  // Scrolled compact header: 52px - 55px
  // Mobile header: 45px phẳng 100%
  const frameHeightClass = {
    xs: 'h-[30px]',
    sm: 'h-[45px]', // Mobile requirement: exactly 45px
    compact: 'h-[54px]', // Scrolled desktop
    md: 'h-[65px] lg:h-[70px]', // Desktop header requirement: 65px - 70px
    lg: 'h-[72px]',
    xl: 'h-[75px]',
  }[size] || 'h-[65px] lg:h-[70px]';

  return (
    <div
      className={`inline-flex items-center justify-center p-[5px] select-none shrink-0 ${frameHeightClass} ${className}`}
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        filter: 'none',
        border: 'none',
        outline: 'none',
      }}
      title="G-ROOSTER CO.,LTD"
    >
      <img
        src={LOCAL_LOGO_FALLBACK}
        alt="G-ROOSTER CO.,LTD - Nông Sản & Đặc Sản Cao Cấp"
        referrerPolicy="no-referrer"
        style={{
          objectFit: 'contain',
          boxShadow: 'none',
          filter: monochrome ? 'brightness-0 invert opacity-60' : 'none',
          backgroundColor: 'transparent',
        }}
        className="h-full w-auto max-h-full object-contain block mx-auto p-0 m-0 border-0"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        onError={(e) => {
          if (e.currentTarget.src !== OFFICIAL_LOGO_URL) {
            e.currentTarget.src = OFFICIAL_LOGO_URL;
          }
        }}
      />
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
 * Uses the exact authentic logo image from https://i.postimg.cc/5y1LQRxR/Gemini-Generated-Image-bnvr0bnvr0bnvr0b.png
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
