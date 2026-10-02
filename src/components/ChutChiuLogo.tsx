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
  variant,
  frameless = true,
  monochrome = false,
}) => {
  // Height classes (V207):
  // Desktop header: 68px - 72px (chuẩn 65px - 75px)
  // Scrolled compact header: 52px - 55px
  // Mobile header: 46px - 50px (chuẩn 45px - 50px)
  const imgHeight = {
    xs: 'h-[28px] max-h-[28px]',
    sm: 'h-[46px] sm:h-[50px] max-h-[50px]', // Mobile requirement: 45px - 50px
    compact: 'h-[52px] lg:h-[55px] max-h-[55px]', // Scrolled desktop
    md: 'h-[68px] lg:h-[72px] max-h-[75px]', // Desktop header requirement: 65px - 75px
    lg: 'h-[75px]',
    xl: 'h-[80px]',
  }[size] || 'h-[68px] lg:h-[72px]';

  // If badge variant is explicitly requested (e.g. for dark backdrops requiring white card)
  if (variant === 'badge' && !frameless) {
    const containerClass = {
      xs: 'h-[32px] px-1.5 py-0.5',
      sm: 'h-[50px] px-2 py-0.5',
      compact: 'h-[56px] px-2.5 py-1',
      md: 'h-[72px] px-3 py-1',
      lg: 'h-[78px] px-3.5 py-1',
      xl: 'h-[84px] px-4 py-1.5',
    }[size] || 'h-[72px] px-3 py-1';

    return (
      <div
        className={`inline-flex items-center justify-center select-none ${className}`}
        title="G-ROOSTER CO.,LTD"
      >
        <div
          className={`bg-white rounded-xl shadow-xs border border-stone-200/80 flex items-center justify-center shrink-0 ${containerClass} hover:scale-[1.02] transition-transform duration-200`}
        >
          <img
            src={OFFICIAL_LOGO_URL}
            alt="G-ROOSTER CO.,LTD - Nông Sản & Đặc Sản Cao Cấp"
            referrerPolicy="no-referrer"
            style={{ objectFit: 'contain' }}
            className="h-full w-auto max-h-full object-contain block mx-auto"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.src = LOCAL_LOGO_FALLBACK;
            }}
          />
        </div>
      </div>
    );
  }

  // Standard natural frameless display (V207: Chiếm trọn diện tích, không viền, không padding thừa)
  return (
    <div
      className={`inline-flex items-center justify-center p-0 m-0 border-0 bg-transparent select-none shrink-0 ${className}`}
      title="G-ROOSTER CO.,LTD"
    >
      <img
        src={OFFICIAL_LOGO_URL}
        alt="G-ROOSTER CO.,LTD - Hệ Thống Phân Phối Nông Sản & Đặc Sản Cao Cấp"
        referrerPolicy="no-referrer"
        style={{ objectFit: 'contain' }}
        className={`${imgHeight} w-auto max-h-full object-contain block mx-auto transition-all duration-300 p-0 m-0 border-0 ${
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
