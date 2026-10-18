import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface QuickScrollButtonsProps {
  targetContainerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  footerElementId?: string;
}

/**
 * V174: Biểu tượng điều hướng nhanh (Floating Buttons) ở góc phải màn hình
 * Mũi tên lên (↑): Trượt mượt mà về đầu trang (Back to Top)
 * Mũi tên xuống (↓): Trượt nhanh xuống cuối trang (Bottom Footer)
 * Thiết kế icon nhỏ gọn, tinh tế, sử dụng màu xanh đặc trưng (#1a4d2e) của G-ROOSTER.
 */
export const QuickScrollButtons: React.FC<QuickScrollButtonsProps> = ({
  targetContainerRef,
  className = '',
  footerElementId = 'footer',
}) => {
  const handleScrollToTop = () => {
    if (targetContainerRef?.current) {
      try {
        targetContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        targetContainerRef.current.scrollTop = 0;
      }
    }
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (typeof document !== 'undefined') {
          document.documentElement?.scrollTo({ top: 0, behavior: 'smooth' });
          document.body?.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch {
        // fallback
      }
    }
  };

  const handleScrollToBottom = () => {
    if (targetContainerRef?.current) {
      try {
        targetContainerRef.current.scrollTo({
          top: targetContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      } catch {
        targetContainerRef.current.scrollTop = targetContainerRef.current.scrollHeight;
      }
    }
    if (typeof document !== 'undefined') {
      const footerEl = footerElementId ? document.getElementById(footerElementId) : null;
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (typeof window !== 'undefined') {
        const maxScroll = Math.max(
          document.body?.scrollHeight || 0,
          document.documentElement?.scrollHeight || 0,
          10000
        );
        try {
          window.scrollTo({
            top: maxScroll,
            behavior: 'smooth',
          });
          document.documentElement?.scrollTo({
            top: maxScroll,
            behavior: 'smooth',
          });
        } catch {
          // fallback
        }
      }
    }
  };

  return (
    <div
      /* V267: Đảm bảo khoảng cách dọc ít nhất 20px với nút Giỏ hàng trên desktop (bottom-6 (24px) + cart height (46px) + 28px gap = 98px ~ 100px) */
      className={`fixed right-2 sm:right-4 lg:right-6 bottom-16 lg:bottom-[100px] z-30 flex flex-col items-center gap-1.5 pointer-events-auto select-none ${className}`}
      aria-label="Điều hướng nhanh trang"
    >
      {/* Mũi tên lên (↑) */}
      <button
        type="button"
        onClick={handleScrollToTop}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a4d2e] hover:bg-[#143e25] text-amber-300 hover:text-white border border-emerald-500/40 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 hover:-translate-y-0.5"
        title="Trượt lên đầu trang (Back to Top)"
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
      </button>

      {/* Mũi tên xuống (↓) */}
      <button
        type="button"
        onClick={handleScrollToBottom}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a4d2e] hover:bg-[#143e25] text-amber-300 hover:text-white border border-emerald-500/40 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 hover:translate-y-0.5"
        title="Trượt xuống cuối trang (Bottom Footer)"
        aria-label="Xuống cuối trang"
      >
        <ArrowDown className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
      </button>
    </div>
  );
};
