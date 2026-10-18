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

export const LOCAL_LOGO_WEBP = '/logo-g-rooster-v5-3d.webp';
export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png';
export const LOCAL_LOGO_FALLBACK = '/logo-g-rooster-v5-3d.png';
export const REMOTE_LOGO_FALLBACK = 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png';
export const OFFICIAL_BRAND_QR_URL = 'https://i.postimg.cc/FKR51qWd/ma-qr-g-rooster.png';

/**
 * Brand Logo overlay for QR Code Centers (V246 / V272):
 * - Vòng đệm hình tròn màu XANH ĐẬM (#143A24) đè lên vị trí chữ 'V' ở chính giữa mã QR để xóa bỏ hoàn toàn.
 * - Đặt Logo G-ROOSTER v5 3D (https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png) lên trên hình tròn xanh.
 * - Vùng đệm xanh đủ rộng với viền vàng và trắng giúp máy ảnh bắt nét và quét mã thành công 100%.
 */
export const BrandLogoOnQRBadge: React.FC<{ sizeClass?: string; logoPadding?: string }> = () => null;

/**
 * Official G-ROOSTER CO.,LTD Brand Logo (V275 - Khôi phục kích thước chuẩn V5 3D):
 * - Link Logo: https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png
 * - Header: Desktop 95px, Tablet 80px, Mobile 65px
 * - Footer: Desktop 80px, Tablet & Mobile 65px
 * - Nền trong suốt sắc nét, bảo toàn 100% mào gà không bị cắt
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  className = '',
  monochrome = false,
  size = 'md',
}) => {
  const isHeader = size === 'header';
  const isFooter = size === 'footer';

  const defaultHeight = isHeader ? '95px' : isFooter ? '80px' : '65px';
  const maxWidth = isHeader ? '280px' : isFooter ? '240px' : '200px';

  return (
    <img
      src={OFFICIAL_LOGO_URL}
      alt="G-ROOSTER CO.,LTD"
      style={{
        height: defaultHeight,
        width: 'auto',
        maxWidth: maxWidth,
        objectFit: 'contain',
        display: 'block',
        backgroundColor: 'transparent',
        background: 'transparent',
        padding: '2px',
        filter: monochrome ? 'brightness-0 invert opacity-60' : 'none',
      }}
      className={`grooster-logo-img ${isHeader ? 'grooster-header-logo' : ''} ${isFooter ? 'grooster-footer-logo' : ''} ${className}`}
      loading="eager"
      decoding="sync"
      onError={(e) => {
        if (e.currentTarget.src !== LOCAL_LOGO_FALLBACK) {
          e.currentTarget.src = LOCAL_LOGO_FALLBACK;
        }
      }}
    />
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
