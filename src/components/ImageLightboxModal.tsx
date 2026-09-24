import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Eye, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  product?: Product;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  product,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Đồng bộ index ban đầu khi mở modal
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
      setScale(1);
      setPosition({ x: 0, y: 0 });
      // Ngăn cuộn trang phía sau khi mở modal
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex, images.length]);

  // Reset vị trí và độ phóng to khi đổi ảnh
  const handleSelectImage = useCallback((index: number) => {
    setCurrentIndex(index);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  // Điều khiển Zoom
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4));
  };

  const zoomOut = () => {
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Click-to-zoom kiểu Shopee: Click đúp hoặc click một lần để chuyển 1x <-> 2.2x
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    if (scale === 1) {
      setScale(2.2);
      // Di chuyển tâm về vị trí click
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        setPosition({ x: -offsetX * 1.2, y: -offsetY * 1.2 });
      }
    } else {
      resetZoom();
    }
  };

  // Cuộn chuột để phóng to / thu nhỏ
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.25, 4));
    } else {
      setScale((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Kéo di chuyển khi đang phóng to (Pan/Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Hỗ trợ Touch Drag & Swipe trên Mobile
  const [touchSwipeStart, setTouchSwipeStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    } else {
      setTouchSwipeStart({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    if (scale > 1 && isDragging) {
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (scale > 1) {
      setIsDragging(false);
    } else if (touchSwipeStart && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchSwipeStart.x;
      const deltaY = touch.clientY - touchSwipeStart.y;
      // Vuốt ngang tối thiểu 40px và góc nghiêng nhỏ hơn góc ngang để chuyển ảnh
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          handleNext(); // Vuốt sang trái -> Ảnh tiếp theo
        } else {
          handlePrev(); // Vuốt sang phải -> Ảnh trước đó
        }
      }
      setTouchSwipeStart(null);
    }
  };

  // Phím tắt bàn phím
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '+' || e.key === '=') {
        zoomIn();
      } else if (e.key === '-') {
        zoomOut();
      } else if (e.key === '0') {
        resetZoom();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh phóng to sản phẩm"
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between select-none animate-fadeIn"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 1. TOP CONTROL BAR */}
      <header className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-black/60 border-b border-white/10 z-20">
        {/* Left: Product title & Counter */}
        <div className="flex items-center gap-2 sm:gap-3 text-white min-w-0 pr-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/80 border border-emerald-500/50 text-[10px] sm:text-xs text-emerald-300 font-mono font-medium shrink-0">
            <Eye className="w-3 h-3 text-emerald-400" />
            <span>
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          {product && (
            <div className="truncate">
              <h3 className="text-xs sm:text-sm font-heading font-bold text-white truncate">
                {product.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-stone-400 truncate hidden sm:block">
                {product.packaging || product.unit} • Phân phối bởi CHUTCHIU CO.,LTD
              </p>
            </div>
          )}
        </div>

        {/* Right: Zoom controls & Close button */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15">
            <button
              onClick={zoomOut}
              disabled={scale <= 1}
              title="Thu nhỏ (-)"
              className="p-1 sm:p-1.5 text-stone-200 hover:text-white disabled:opacity-30 disabled:hover:text-stone-200 transition-colors rounded hover:bg-white/10 cursor-pointer"
            >
              <ZoomOut className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <span className="px-1.5 text-[10px] sm:text-xs font-mono font-bold text-amber-300 min-w-[36px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              disabled={scale >= 4}
              title="Phóng to (+)"
              className="p-1 sm:p-1.5 text-stone-200 hover:text-white disabled:opacity-30 disabled:hover:text-stone-200 transition-colors rounded hover:bg-white/10 cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <button
              onClick={resetZoom}
              title="Về kích thước chuẩn (0)"
              className="p-1 sm:p-1.5 text-stone-300 hover:text-white transition-colors rounded hover:bg-white/10 cursor-pointer border-l border-white/15 ml-0.5"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Close Button [X] */}
          <button
            onClick={onClose}
            title="Đóng (Esc)"
            className="flex items-center gap-1 ml-1 sm:ml-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-medium text-xs transition-colors cursor-pointer border border-red-500/50 shadow-md"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Đóng</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN IMAGE DISPLAY CANVAS (SHOPEE STYLE ZOOM) */}
      <main
        ref={containerRef}
        className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
        }}
      >
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              title="Ảnh trước (Mũi tên trái)"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              title="Ảnh tiếp theo (Mũi tên phải)"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          </>
        )}

        {/* Scaled/Panned Image Container */}
        <div
          className="relative max-w-full max-h-full flex items-center justify-center transition-transform ease-out"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
            transitionDuration: isDragging ? '0ms' : '200ms',
          }}
          onClick={handleImageClick}
        >
          <img
            src={currentImage}
            alt={product?.name || 'Ảnh sản phẩm phóng to'}
            referrerPolicy="no-referrer"
            className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-full object-contain rounded-lg shadow-2xl pointer-events-auto"
            draggable={false}
          />
        </div>

        {/* Shopee-style Helper Tooltip */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs text-stone-200 flex items-center gap-1.5 shadow-lg whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {scale === 1
                ? '💡 Click đúp hoặc cuộn chuột để soi tem nhãn, HSD & chứng nhận'
                : '💡 Kéo rê chuột để di chuyển • Click đúp để thu nhỏ'}
            </span>
          </div>
        </div>
      </main>

      {/* 3. BOTTOM THUMBNAIL STRIP (BỘ SƯU TẬP ẢNH NHỎ) - Chỉ hiện khi có từ 2 ảnh trở lên */}
      {images.length > 1 && (
        <footer className="w-full bg-black/70 border-t border-white/10 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar z-20">
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => handleSelectImage(idx)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105 shadow-md'
                    : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                } w-12 h-12 sm:w-16 sm:h-16 bg-stone-900`}
              >
                <img
                  src={img}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />
                <span className="absolute bottom-0.5 right-0.5 bg-black/80 px-1 py-0.2 rounded text-[8px] sm:text-[9px] text-white font-mono">
                  {idx + 1}
                </span>
              </button>
            );
          })}
        </footer>
      )}
    </div>
  );
};
