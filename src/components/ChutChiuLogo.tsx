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

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/pTFzxzPN/hinh-anh-g-rooster-v2.jpg';
export const LOCAL_LOGO_FALLBACK = '/logo-grooster-v2.jpg';
export const REMOTE_LOGO_FALLBACK = 'https://i.postimg.cc/pTFzxzPN/hinh-anh-g-rooster-v2.jpg';

/**
 * Official G-ROOSTER CO.,LTD Brand Logo (V221 - Phóng đại tối đa Logo Header):
 * - Header Logo: Desktop 100px - 110px (lg:h-[105px]), Tablet 85px (md:h-[85px]), Mobile 70px (h-[70px]).
 * - Scrolled Header Logo: Desktop 85px (lg:h-[85px]), Tablet 72px (md:h-[72px]), Mobile 60px (h-[60px]).
 * - Footer Logo: Desktop (cao 85px), Tablet/Mobile (cao 70px).
 * - Khung trắng: Nền trắng tinh #FFFFFF, loại bỏ hoàn toàn padding và margin (0px !important).
 * - Hiển thị: object-fit: contain, transform: scale(1.2) lấp đầy khung chạm sát mép sắc nét.
 */
export const ChutChiuLogo: React.FC<ChutChiuLogoProps> = ({
  size = 'header',
  className = '',
  monochrome = false,
}) => {
  // Height classes chuẩn V221:
  // - Header: Desktop 100px - 110px (lg:h-[105px]), Tablet 85px (md:h-[85px]), Mobile 70px (h-[70px])
  // - Scrolled Header: Desktop 85px (lg:h-[85px]), Tablet 72px (md:h-[72px]), Mobile 60px (h-[60px])
  // - Footer: Desktop 85px (lg:h-[85px]), Tablet/Mobile 70px (h-[70px])
  const frameHeightClass = {
    xs: 'h-[32px]',
    sm: 'h-[70px] md:h-[85px]',
    header: 'h-[70px] md:h-[85px] lg:h-[105px]',
    compact: 'h-[60px] md:h-[72px] lg:h-[85px]',
    md: 'h-[70px] md:h-[85px] lg:h-[105px]',
    footer: 'h-[70px] lg:h-[85px]',
    lg: 'h-[70px] lg:h-[85px]',
    xl: 'h-[85px]',
  }[size] || 'h-[70px] md:h-[85px] lg:h-[105px]';

  const isHeaderLogo = size === 'header' || size === 'compact' || size === 'md' || size === 'sm';

  return (
    <div
      className={`grooster-logo-container inline-flex items-center justify-center p-0 m-0 !p-0 !m-0 rounded-2xl select-none shrink-0 !bg-[#FFFFFF] !shadow-none !border-none !outline-none overflow-hidden ${frameHeightClass} ${className}`}
      style={{
        backgroundColor: '#FFFFFF',
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
          backgroundColor: '#FFFFFF',
          opacity: 1,
          mixBlendMode: 'normal',
          transform: isHeaderLogo ? 'scale(1.2)' : 'none',
          transformOrigin: 'center center',
          padding: 0,
          margin: 0,
        }}
        className="grooster-logo-img h-full w-auto max-h-full object-contain block mx-auto rounded-xl p-0 m-0 border-0 !opacity-100"
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
