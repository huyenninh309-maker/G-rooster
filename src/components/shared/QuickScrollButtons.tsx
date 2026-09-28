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
      targetContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToBottom = () => {
    if (targetContainerRef?.current) {
      targetContainerRef.current.scrollTo({
        top: targetContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      const footerEl = footerElementId ? document.getElementById(footerElementId) : null;
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          top: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div
      className={`fixed right-3 sm:right-5 bottom-24 sm:bottom-28 z-45 flex flex-col items-center gap-1.5 pointer-events-auto select-none ${className}`}
      aria-label="Điều hướng nhanh trang"
    >
      {/* Mũi tên lên (↑) */}
      <button
        type="button"
        onClick={handleScrollToTop}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a4d2e] hover:bg-[#143e25] text-amber-300 hover:text-white border border-emerald-500/40 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 hover:-translate-y-0.5"
        title="Trượt lên đầu trang (Back to Top)"
        aria-label="Lên đầu trang"
      >
        <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
      </button>

      {/* Mũi tên xuống (↓) */}
      <button
        type="button"
        onClick={handleScrollToBottom}
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1a4d2e] hover:bg-[#143e25] text-amber-300 hover:text-white border border-emerald-500/40 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 hover:translate-y-0.5"
        title="Trượt xuống cuối trang (Bottom Footer)"
        aria-label="Xuống cuối trang"
      >
        <ArrowDown className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
      </button>
    </div>
  );
};
