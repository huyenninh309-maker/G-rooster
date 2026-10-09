import React, { useState } from 'react';
import { G_ROOSTER_LOGO_URL, G_ROOSTER_LOGO_V3_LOCAL } from '../utils/productImages';

interface BrandedImagePlaceholderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  language?: 'VN' | 'EN';
  subtitle?: string;
}

/**
 * BRANDED PLACEHOLDER G-ROOSTER V254:
 * Hiển thị hình ảnh Logo G-ROOSTER v3 (trong suốt) đặt trên nền gradient xám nhạt sang trọng
 * Kèm dòng chữ nhỏ tinh tế: "Hình ảnh đang cập nhật..." / "Product image updating..."
 * Tuyệt đối KHÔNG hiển thị icon "ảnh bị vỡ"
 */
export const BrandedImagePlaceholder: React.FC<BrandedImagePlaceholderProps> = ({
  className = '',
  size = 'md',
  language = 'VN',
  subtitle,
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(G_ROOSTER_LOGO_V3_LOCAL);

  // Fallback to remote logo if local fails, or transparent logo
  const handleLogoError = () => {
    if (logoSrc === G_ROOSTER_LOGO_V3_LOCAL) {
      setLogoSrc(G_ROOSTER_LOGO_URL);
    } else if (logoSrc !== '/logo-grooster-transparent.png') {
      setLogoSrc('/logo-grooster-transparent.png');
    }
  };

  const isSmall = size === 'sm';
  const isLarge = size === 'lg' || size === 'xl';

  return (
    <div
      className={`relative w-full h-full aspect-square flex flex-col items-center justify-center p-3 select-none overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#f4f5f7] to-[#e2e6ea] border border-stone-200/90 rounded-inherit transition-all ${className}`}
      style={{
        aspectRatio: '1 / 1',
        background: 'linear-gradient(135deg, #ffffff 0%, #f4f5f7 45%, #eaedf0 75%, #dee2e6 100%)',
      }}
    >
      {/* Subtle luxury concentric highlight & hairline frame */}
      <div className="absolute inset-1.5 sm:inset-2 rounded-xl sm:rounded-2xl border border-stone-300/40 pointer-events-none" />
      <div className="absolute inset-2.5 sm:inset-3 rounded-lg sm:rounded-xl border border-white/60 pointer-events-none" />

      {/* Subtle center glow */}
      <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white/70 blur-xl pointer-events-none" />

      {/* Logo G-ROOSTER v3 (Trong suốt) */}
      <div className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <img
          src={logoSrc}
          alt="G-ROOSTER Official"
          onError={handleLogoError}
          className={`object-contain drop-shadow-sm filter contrast-[1.02] ${
            isSmall
              ? 'w-7 h-7 sm:w-8 sm:h-8'
              : isLarge
              ? 'w-24 h-24 sm:w-32 sm:h-32'
              : 'w-16 h-16 sm:w-20 sm:h-20'
          }`}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Brand & Status Text (Ẩn trên size sm cực nhỏ trong table nếu cần, hiện rõ trên card & modal) */}
      {!isSmall && (
        <div className="relative z-10 flex flex-col items-center text-center mt-2 px-1 max-w-[90%]">
          <span className="text-[10px] sm:text-[11px] font-bold text-stone-700 tracking-wider font-heading leading-tight line-clamp-1">
            G-ROOSTER
          </span>
          <span className="text-[9px] sm:text-[10.5px] font-semibold text-stone-500 tracking-tight mt-0.5 leading-snug line-clamp-1">
            {subtitle || (language === 'EN' ? 'Product image updating...' : 'Hình ảnh đang cập nhật...')}
          </span>
          <span className="text-[7.5px] sm:text-[8.5px] font-medium text-stone-400 tracking-wider uppercase mt-0.5 hidden sm:inline-block">
            {language === 'EN' ? 'Official Collection' : 'Đang cập nhật ảnh'}
          </span>
        </div>
      )}
    </div>
  );
};
