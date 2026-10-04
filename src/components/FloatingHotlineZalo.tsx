import React from 'react';
import { PhoneCall, ShoppingBag, MessageCircle } from 'lucide-react';

interface FloatingHotlineZaloProps {
  cartCount: number;
  onOpenCart: () => void;
}

/**
 * Floating Hotline Contact Dock
 * Requirement V123:
 * - Hotline và Zalo nổi bật, sang trọng, thanh mảnh.
 * - Tuyệt đối không che khuất thông tin pháp lý ở Footer (nhờ safe cushion 120px).
 */
export const FloatingHotlineZalo: React.FC<FloatingHotlineZaloProps> = ({
  cartCount,
  onOpenCart,
}) => {
  return (
    <>
      {/* V237: Cụm Zalo/Hotline bên góc trái: Kích thước vừa phải, 100% CSS thuần không JS scroll listener */}
      <div
        id="floating-contact-dock"
        className="fixed bottom-16 sm:bottom-6 left-2 sm:left-6 z-30 flex items-center gap-1.5 sm:gap-2 select-none pointer-events-auto transition-all duration-300 opacity-90 hover:opacity-100 focus-within:opacity-100"
      >
        {/* Nút Zalo B2B tròn với kích thước vừa phải (w-9 h-9 trên mobile, w-10 h-10 trên desktop) */}
        <a
          id="btn-floating-zalo"
          href="https://zalo.me/0961525450"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0068FF] text-white shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          title="Chat Zalo B2B: 0961 525 450"
          aria-label="Chat Zalo hỗ trợ"
        >
          {/* Vòng lan tỏa (pulse) nhẹ nhàng */}
          <span className="absolute -inset-1 rounded-full bg-blue-500/20 animate-pulse pointer-events-none" />
          <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white relative z-10" strokeWidth={2} />
        </a>

        {/* Nút Hotline Call tròn với kích thước vừa phải */}
        <a
          id="btn-floating-hotline"
          href="tel:0961525450"
          className="relative group w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#0a2616] via-[#103821] to-[#184d2f] text-amber-300 border border-amber-400/50 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          title="Gọi Hotline tư vấn sỉ: 0961 525 450 · 0938 7979 04"
          aria-label="Gọi Hotline tư vấn"
        >
          {/* Vòng lan tỏa (pulse) nhẹ nhàng */}
          <span className="absolute -inset-1 rounded-full bg-amber-400/20 animate-pulse pointer-events-none" />
          <PhoneCall className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-300 relative z-10" strokeWidth={1.8} />
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
