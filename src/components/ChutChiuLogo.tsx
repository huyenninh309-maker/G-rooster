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

export const OFFICIAL_LOGO_URL = '/logo-grooster-new.png';
export const LOCAL_LOGO_FALLBACK = '/logo-grooster-new.png';
export const REMOTE_LOGO_FALLBACK = 'https://i.postimg.cc/5y1LQRxR/Gemini-Generated-Image-bnvr0bnvr0bnvr0b.png';

/**
 * Official G-ROOSTER CO.,LTD Brand Logo (V215 - Desktop & Tablet Logo Enlargement):
 * - Desktop (>= 1024px): Chiều cao 85px - 95px (lg:h-[88px] xl:h-[92px])
 * - Tablet (768px - 1024px): Chiều cao 75px - 80px (md:h-[78px])
 * - Mobile (< 768px): Chiều cao 60px (TUYỆT ĐỐI GIỮ NGUYÊN TỶ LỆ CHUẨN)
 * - Khung trắng: padding 5px trên Desktop/Tablet để Logo nở cực đại, padding 0 trên Mobile
 * - Nền trắng phẳng tuyệt đối #FFFFFF !important, box-shadow: none !important, filter: none !important
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  size = 'md',
  className = '',
  monochrome = false,
}) => {
  // Height classes (V215):
  const frameHeightClass = {
    xs: 'h-[32px]',
    sm: 'h-[60px] md:h-[78px]', // Mobile: 60px (giữ nguyên) | Tablet: 78px (chuẩn V215: 75px-80px)
    compact: 'h-[50px] md:h-[68px] lg:h-[74px] xl:h-[78px]', // Scrolled
    md: 'h-[60px] md:h-[78px] lg:h-[88px] xl:h-[92px]', // Desktop requirement: 85px - 95px
    lg: 'h-[78px] lg:h-[92px]',
    xl: 'h-[85px] lg:h-[95px]',
  }[size] || 'h-[60px] md:h-[78px] lg:h-[88px] xl:h-[92px]';

  return (
    <div
      className={`grooster-logo-container inline-flex items-center justify-center p-0 md:p-[5px] lg:p-[5px] m-0 select-none shrink-0 !bg-[#FFFFFF] !shadow-none !border-none !outline-none ${frameHeightClass} ${className}`}
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        filter: 'none',
        border: 'none',
        outline: 'none',
        mixBlendMode: 'normal',
        opacity: 1,
      }}
      title="G-ROOSTER CO.,LTD"
    >
      <img
        src="/logo-grooster-new.png"
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
          opacity: 1,
          mixBlendMode: 'normal',
        }}
        className="grooster-logo-img h-full w-auto max-h-full object-contain block mx-auto p-0 m-0 border-0 !opacity-100"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        onError={(e) => {
          if (e.currentTarget.src !== REMOTE_LOGO_FALLBACK) {
            e.currentTarget.src = REMOTE_LOGO_FALLBACK;
          }
        }}
      />
    </div>
  );
};

// Cached logo image for HTML5 Canvas QR code rendering (uses high-res clean transparent logo)
let logoImagePromise: Promise<HTMLImageElement> | null = null;
let cachedLogoImage: HTMLImageElement | null = null;

if (typeof window !== 'undefined') {
  cachedLogoImage = new Image();
  cachedLogoImage.crossOrigin = 'anonymous';
  cachedLogoImage.src = '/logo-grooster-new.png';
  cachedLogoImage.onerror = () => {
    if (cachedLogoImage) {
      cachedLogoImage.src = REMOTE_LOGO_FALLBACK;
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
        fallbackImg.crossOrigin = 'anonymous';
        fallbackImg.onload = () => {
          cachedLogoImage = fallbackImg;
          resolve(fallbackImg);
        };
        fallbackImg.onerror = () => resolve(fallbackImg);
        fallbackImg.src = REMOTE_LOGO_FALLBACK;
      };
      img.src = '/logo-grooster-new.png';
    });
  }
  return logoImagePromise;
}

/**
 * Stamps the exact official G-ROOSTER logo onto an HTML5 Canvas center badge
 * (for SmartQRCode, QRCodeModal, and RecipeQRCode).
 * V214:
 * - Lớp nền phẳng trắng tinh (#FFFFFF) phía sau logo.
 * - Padding an toàn 5px (5px * scale) tạo khoảng cách bảo vệ với các điểm ảnh của mã QR.
 * - Tuyệt đối không dùng mix-blend-mode (chuẩn source-over), không đổ bóng, không ám xám.
 */
export function drawChutChiuLogoToCanvas(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  scale: number = 3
): void {
  const drawImageToBadge = (img: HTMLImageElement) => {
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.filter = 'none';
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // V214: Padding an toàn 5px chuyển đổi theo retina scale
    const paddingCanvasPx = 5 * (scale || 3);
    const outerRadius = radius + paddingCanvasPx;

    // 1. Lớp nền phẳng trắng tinh tuyệt đối (#FFFFFF), bảo vệ cách biệt mã QR
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // 2. Viền trắng phẳng sạch sẽ (border: none / #FFFFFF)
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    // 3. Khung logo trung tâm trên nền trắng tinh
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.clip();

    const boxSize = radius * 1.85;
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
