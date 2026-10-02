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
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // fallback
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
    const footerEl = footerElementId ? document.getElementById(footerElementId) : null;
    if (footerEl) {
      footerEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      const maxScroll = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      );
      try {
        window.scrollTo({
          top: maxScroll,
          behavior: 'smooth',
        });
        document.documentElement.scrollTo({
          top: maxScroll,
          behavior: 'smooth',
        });
      } catch {
        // fallback
      }
    }
  };

  return (
    <div
      className={`fixed right-1 sm:right-4 bottom-16 sm:bottom-24 z-30 flex flex-col items-center gap-1.5 pointer-events-auto select-none ${className}`}
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
