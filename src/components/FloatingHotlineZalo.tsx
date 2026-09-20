import React from 'react';
import { PhoneCall, ShoppingBag } from 'lucide-react';

interface FloatingHotlineZaloProps {
  cartCount: number;
  onOpenCart: () => void;
}

/**
 * Floating Hotline Contact Dock
 * Requirement V114:
 * - XÓA BỎ HOÀN TOÀN nút tròn màu xanh 'Zalo B2B' ở góc trái màn hình.
 * - GIỮ LẠI: 2 nút Hotline màu đen vàng (0961 525 450 và 0938 7979 04).
 * - Thiết kế nhỏ gọn, tinh tế, không che lấp sản phẩm hay thanh giỏ hàng.
 */
export const FloatingHotlineZalo: React.FC<FloatingHotlineZaloProps> = ({
  cartCount,
  onOpenCart,
}) => {
  return (
    <>
      <div
        id="floating-contact-dock"
        className={`fixed ${
          cartCount > 0 ? 'bottom-16 sm:bottom-5' : 'bottom-3 sm:bottom-5'
        } left-2.5 sm:left-5 z-40 flex flex-col items-start gap-1 select-none pointer-events-auto transition-all duration-300`}
      >
        {/* Hotline 1: 0961 525 450 (Đen vàng sang trọng, siêu gọn) */}
        <a
          id="btn-floating-hotline-1"
          href="tel:0961525450"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#143A24]/95 hover:bg-[#0d2718] text-white shadow-md border border-[#D4AF37]/70 text-[10px] sm:text-[11px] font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          title="Gọi Hotline 1: 0961 525 450 (Tư vấn Sỉ & F&B)"
          aria-label="Gọi Hotline 0961 525 450"
        >
          <PhoneCall className="w-3 h-3 text-[#D4AF37] animate-pulse shrink-0" strokeWidth={1.8} />
          <span className="font-mono font-bold text-[#D4AF37] tracking-wider">
            0961 525 450
          </span>
        </a>

        {/* Hotline 2: 0938 7979 04 (Đen vàng sang trọng, siêu gọn) */}
        <a
          id="btn-floating-hotline-2"
          href="tel:0938797904"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/95 hover:bg-black text-white shadow-md border border-stone-700/80 text-[10px] sm:text-[11px] font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
          title="Gọi Hotline 2: 0938 7979 04 (Hỗ trợ đặt sỉ)"
          aria-label="Gọi Hotline 0938 7979 04"
        >
          <PhoneCall className="w-3 h-3 text-amber-300 shrink-0" strokeWidth={1.8} />
          <span className="font-mono font-bold text-amber-300 tracking-wider">
            0938 7979 04
          </span>
        </a>
      </div>

      {/* Floating Cart Button (Desktop only on bottom-right) */}
      <div className="fixed bottom-5 right-6 z-40 hidden sm:block select-none pointer-events-auto">
        <button
          id="btn-floating-cart-desktop"
          onClick={onOpenCart}
          className="relative p-3 rounded-full bg-[#143A24] text-white shadow-xl hover:bg-[#0d2718] transition-all transform hover:scale-105 border border-[#D4AF37]/80 cursor-pointer"
          title="Xem giỏ hàng"
          aria-label="Mở giỏ hàng"
        >
          <ShoppingBag className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.6} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-red-600 text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
