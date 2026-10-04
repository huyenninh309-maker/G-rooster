import React from 'react';

export interface ChutChiuLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon' | 'badge';
  theme?: 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'compact' | 'header' | 'footer';
  showSubtitle?: boolean;
  className?: string;
  frameless?: boolean;
  monochrome?: boolean;
}

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/1Rwn8Q2j/hinh-anh-g-rooster-v3.png';
export const LOCAL_LOGO_FALLBACK = '/logo-grooster-v3.png';
export const REMOTE_LOGO_FALLBACK = 'https://i.postimg.cc/1Rwn8Q2j/hinh-anh-g-rooster-v3.png';

/**
 * Official G-ROOSTER CO.,LTD Brand Logo (V233 - Luxury Transparent Theme):
 * - Logo v3: https://i.postimg.cc/1Rwn8Q2j/hinh-anh-g-rooster-v3.png
 * - Hoàn toàn trong suốt (Transparent) hòa quyện trên nền xanh đậm Header & Footer.
 * - Hiển thị: object-fit: contain !important, sắc nét, bảo toàn chi tiết mào gà.
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  size = 'header',
  className = '',
  monochrome = false,
}) => {
  // Height classes chuẩn V225 (To rõ, bảo toàn nguyên vẹn mào gà, nền trong suốt):
  // - Header: Desktop 75px - 80px (lg:h-[78px]), Tablet 68px - 72px (md:h-[72px]), Mobile 58px - 62px (h-[60px])
  // - Scrolled Header: Desktop 64px - 66px, Tablet 58px - 60px, Mobile 50px - 52px
  // - Footer: Desktop 85px, Tablet/Mobile 70px (chuẩn V232)
  const frameHeightClass = {
    xs: 'h-[32px]',
    sm: 'h-[48px] md:h-[56px]',
    header: 'h-[58px] sm:h-[64px] md:h-[72px] lg:h-[78px]',
    compact: 'h-[50px] sm:h-[54px] md:h-[60px] lg:h-[66px]',
    md: 'h-[58px] sm:h-[64px] md:h-[72px] lg:h-[78px]',
    footer: 'h-[70px] md:h-[70px] lg:h-[85px]',
    lg: 'h-[60px] lg:h-[72px]',
    xl: 'h-[75px]',
  }[size] || 'h-[58px] sm:h-[64px] md:h-[72px] lg:h-[78px]';

  return (
    <div
      className={`grooster-logo-container inline-flex items-center justify-center p-0 m-0 !p-0 !m-0 rounded-none select-none shrink-0 !bg-transparent !shadow-none !border-none !outline-none ${frameHeightClass} ${className}`}
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        filter: 'none',
        border: 'none',
        outline: 'none',
        mixBlendMode: 'normal',
        opacity: 1,
        padding: 0,
        margin: 0,
      }}
      title="G-ROOSTER CO.,LTD"
    >
      <img
        src={OFFICIAL_LOGO_URL}
        alt="G-ROOSTER CO.,LTD - Nông Sản & Đặc Sản Cao Cấp"
        referrerPolicy="no-referrer"
        style={{
          objectFit: 'contain',
          boxShadow: 'none',
          filter: monochrome ? 'brightness-0 invert opacity-60' : 'none',
          backgroundColor: 'transparent',
          opacity: 1,
          mixBlendMode: 'normal',
          transform: 'none',
          padding: 0,
          margin: 0,
        }}
        className="grooster-logo-img h-full w-auto max-h-full object-contain block mx-auto p-0 m-0 border-0 !opacity-100"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        onError={(e) => {
          if (e.currentTarget.src !== LOCAL_LOGO_FALLBACK) {
            e.currentTarget.src = LOCAL_LOGO_FALLBACK;
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
        fallbackImg.crossOrigin = 'anonymous';
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
 * Stamps the exact official G-ROOSTER logo onto an HTML5 Canvas center badge
 * (for SmartQRCode, QRCodeModal, and RecipeQRCode).
 * V233:
 * - Vùng đệm hình tròn màu XANH ĐẬM (#143A24 - trùng màu Header) làm nền phía sau Logo.
 * - Viền trắng an toàn bên ngoài tách biệt khỏi các module điểm ảnh của mã QR giúp máy ảnh quét cực nhạy.
 * - Logo G-ROOSTER v3 trong suốt đè lên hình tròn màu xanh này sắc nét, sang trọng.
 */
export function drawChutChiuLogoToCanvas(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  scale: number = 3
): void {
  try {
    if (!ctx) return;
    const drawImageToBadge = (img: HTMLImageElement) => {
      try {
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.filter = 'none';
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // V233: Vùng đệm hình tròn màu XANH ĐẬM (#143A24) tại tâm TẤT CẢ các mã QR
        const paddingCanvasPx = 5 * (scale || 3);
        const outerRadius = radius + paddingCanvasPx;
        const whiteBorderPx = 2.5 * (scale || 3);

        // 1. Vòng đệm trắng viền ngoài (tách biệt hoàn toàn khỏi các điểm ảnh của mã QR, giúp máy ảnh dễ quét)
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius + whiteBorderPx, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // 2. Hình tròn màu XANH ĐẬM (#143A24 - trùng mã màu Header) làm vùng đệm chính
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#143A24';
        ctx.fill();

        // 3. Viền chỉ vàng hoàng gia siêu mảnh (#D4AF37) quanh hình tròn xanh
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
        ctx.lineWidth = 1 * (scale || 3);
        ctx.strokeStyle = '#D4AF37';
        ctx.stroke();

        // 4. Khung logo trung tâm trên nền xanh đậm #143A24
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 2 * (scale || 3), 0, Math.PI * 2);
        ctx.clip();

        const boxSize = radius * 1.95;
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
      } catch (err) {
        console.warn('drawImageToBadge error:', err);
      }
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
  } catch (globalErr) {
    console.warn('drawChutChiuLogoToCanvas safely prevented crash:', globalErr);
  }
}
