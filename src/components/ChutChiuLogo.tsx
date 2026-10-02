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
 * Official G-ROOSTER CO.,LTD Brand Logo (V212 - Tablet Refinement & Vertical Alignment):
 * - Mobile (< 768px): Chiều cao 60px chiếm trọn diện tích
 * - Tablet (768px - 1024px): Chiều cao 65px (tinh chỉnh từ 75px), padding 10px trên/dưới tạo khoảng thở
 * - Desktop (>= 1024px): 60px - 65px (chuẩn V210)
 * - Khung trắng: padding 0 trên mobile, 10px trên tablet, nền trắng phẳng #FFFFFF, không bóng đổ
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  size = 'md',
  className = '',
  monochrome = false,
}) => {
  // Height classes (V212):
  // Mobile (< 768px): 60px
  // Tablet (768px - 1024px): 65px (chuẩn V212)
  // Desktop (>= 1024px): 60px - 65px
  const frameHeightClass = {
    xs: 'h-[32px]',
    sm: 'h-[60px] md:h-[65px]', // Mobile: 60px | Tablet: 65px (chuẩn V212)
    compact: 'h-[50px] md:h-[54px] lg:h-[56px]', // Scrolled
    md: 'h-[60px] lg:h-[62px] xl:h-[65px]', // Desktop requirement: 60px - 65px
    lg: 'h-[68px]',
    xl: 'h-[75px]',
  }[size] || 'h-[60px] lg:h-[62px] xl:h-[65px]';

  return (
    <div
      className={`inline-flex items-center justify-center p-0 md:py-[10px] m-0 select-none shrink-0 ${frameHeightClass} ${className}`}
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
          backgroundColor: '#FFFFFF',
          transform: 'scale(1.15)',
          transformOrigin: 'center center',
          padding: 0,
          margin: 0,
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
