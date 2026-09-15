import React from 'react';

export interface ChutChiuLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon' | 'badge';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png';
export const LOCAL_LOGO_FALLBACK = '/image.png';

/**
 * Official CHUTCHIU CO.,LTD Brand Logo
 * Strict requirement: Uses <img> with exact URL https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png
 * Placed inside a rounded white box with neat padding so the swirl icon and
 * the black 'CHUTCHIU CO.,LTD' text underneath are 100% visible, sharp, and preserved.
 * Header logo height is fixed at exactly 45px.
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  // Height classes:
  // Header: exactly 45px (h-[45px])
  // Footer: 48px - 50px
  const containerClass = {
    sm: 'h-[38px] p-1',
    md: 'h-[45px] p-1', // EXACTLY 45px at Header
    lg: 'h-[45px] p-1',
    xl: 'h-[48px] sm:h-[50px] p-1 sm:p-1.5', // Footer logo
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      title="CHUTCHIU CO.,LTD"
    >
      {/* High-contrast rounded white box with neat padding */}
      <div
        className={`bg-white rounded-xl shadow-sm border border-stone-200/80 flex items-center justify-center shrink-0 ${containerClass} hover:scale-[1.02] transition-transform duration-200`}
      >
        <img
          src={OFFICIAL_LOGO_URL}
          alt="CHUTCHIU CO.,LTD"
          className="h-[45px] w-auto max-h-full object-contain aspect-square"
          loading="eager"
          decoding="sync"
          onError={(e) => {
            // High reliability fallback to local cached copy
            e.currentTarget.src = LOCAL_LOGO_FALLBACK;
          }}
        />
      </div>
    </div>
  );
};

// Cached logo image for HTML5 Canvas QR code rendering
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
        // Fallback to local image if remote CORS is blocked
        const localImg = new Image();
        localImg.onload = () => {
          cachedLogoImage = localImg;
          resolve(localImg);
        };
        localImg.onerror = () => resolve(localImg);
        localImg.src = LOCAL_LOGO_FALLBACK;
      };
      img.src = OFFICIAL_LOGO_URL;
    });
  }
  return logoImagePromise;
}

/**
 * Stamps the exact official logo file onto an HTML5 Canvas center badge
 * (for SmartQRCode and RecipeQRCode).
 * Uses the exact authentic logo image inside a clean circular white badge.
 */
export function drawChutChiuLogoToCanvas(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const drawImageToBadge = (img: HTMLImageElement) => {
    ctx.save();

    // 1. White circular background with soft shadow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 6;
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // 2. Dual-Tone Brand Border: Ocean Blue (#144385) & Emerald Green (#15803d)
    const borderGrad = ctx.createLinearGradient(
      centerX - radius,
      centerY - radius,
      centerX + radius,
      centerY + radius
    );
    borderGrad.addColorStop(0, '#144385');
    borderGrad.addColorStop(0.5, '#1a62c6');
    borderGrad.addColorStop(1, '#15803d');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = borderGrad;
    ctx.stroke();

    // 3. Stamp the exact logo image inside the circular badge
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
    ctx.clip();

    const boxSize = (radius - 1) * 2;
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
