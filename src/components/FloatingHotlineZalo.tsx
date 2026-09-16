import React from 'react';
import { PhoneCall, ShoppingBag } from 'lucide-react';

interface FloatingHotlineZaloProps {
  cartCount: number;
  onOpenCart: () => void;
}

/**
 * Floating Hotline & Zalo Contact Dock
 * Requirement:
 * Nút Zalo và 2 số Hotline (0961 525 450 - 0938 7979 04) phải LUÔN HIỂN THỊ NỔI ở góc dưới,
 * không đè lên nút Mua hàng.
 * Positioned on the bottom-left (left-2.5 sm:left-6) to ensure zero obstruction of
 * any buy/cart buttons on the right or center.
 */
export const FloatingHotlineZalo: React.FC<FloatingHotlineZaloProps> = ({
  cartCount,
  onOpenCart,
}) => {
  return (
    <>
      <div
        id="floating-contact-dock"
        className="fixed bottom-3 left-2.5 sm:bottom-5 sm:left-6 z-40 flex flex-col items-start gap-1.5 select-none pointer-events-auto"
      >
        {/* Zalo B2B Button */}
        <a
          id="btn-floating-zalo"
          href="https://zalo.me/0961525450"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg border border-blue-400/50 text-[11px] font-bold transition-all transform hover:scale-105 active:scale-95"
          title="Chat Zalo B2B Chút Chíu: 0961 525 450"
          aria-label="Chat Zalo B2B 0961 525 450"
        >
          <span className="w-4 h-4 rounded-full bg-white text-blue-700 font-black text-[10px] flex items-center justify-center shrink-0 shadow-2xs">
            Z
          </span>
          <span className="tracking-tight font-semibold">Zalo B2B</span>
        </a>

        {/* Hotline 1: 0961 525 450 */}
        <a
          id="btn-floating-hotline-1"
          href="tel:0961525450"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#0b3b24] to-[#04170d] hover:from-[#0f4d30] hover:to-[#082a17] text-white shadow-lg border border-[#d4af37]/60 text-[11px] font-bold transition-all transform hover:scale-105 active:scale-95"
          title="Gọi Hotline 1 (Tư vấn Sỉ & F&B): 0961 525 450"
          aria-label="Gọi Hotline 0961 525 450"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
          <span className="font-mono font-black text-amber-300 tracking-wider">
            0961 525 450
          </span>
        </a>

        {/* Hotline 2: 0938 7979 04 */}
        <a
          id="btn-floating-hotline-2"
          href="tel:0938797904"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-stone-900 to-black hover:from-stone-800 hover:to-stone-900 text-white shadow-lg border border-stone-600/80 text-[11px] font-bold transition-all transform hover:scale-105 active:scale-95"
          title="Gọi Hotline 2 (Hỗ trợ đặt sỉ): 0938 7979 04"
          aria-label="Gọi Hotline 0938 7979 04"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="font-mono font-black text-amber-300 tracking-wider">
            0938 7979 04
          </span>
        </a>
      </div>

      {/* Floating Cart Button (Desktop only on bottom-right) */}
      <div className="fixed bottom-5 right-6 z-40 hidden sm:block select-none pointer-events-auto">
        <button
          id="btn-floating-cart-desktop"
          onClick={onOpenCart}
          className="relative p-3.5 rounded-full bg-emerald-900 text-white shadow-2xl hover:bg-emerald-950 transition-all transform hover:scale-105 border-2 border-[#d4af37]"
          title="Xem giỏ hàng"
          aria-label="Mở giỏ hàng"
        >
          <ShoppingBag className="w-6 h-6 text-[#f6d884]" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 bg-red-600 text-white text-xs font-black rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};
