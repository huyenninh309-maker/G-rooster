import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Product, Language } from '../types';
import { translateText } from '../utils/productTranslation';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  product?: Product;
  language?: Language;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  product,
  language = 'VN',
}) => {
  const isEn = language === 'EN';
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hasDraggedRef = useRef(false);
  const dragDistanceRef = useRef(0);

  // Đồng bộ index ban đầu khi mở modal
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.max(0, Math.min(initialIndex, images.length - 1)));
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setHasImageError(false);
      // Check if image is already cached/complete
      if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsImageLoading(false);
      } else {
        setIsImageLoading(false); // Do not hide image with opacity-0
      }
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
    setHasImageError(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setHasImageError(false);
  }, [images.length]);

  const handleNext = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setHasImageError(false);
  }, [images.length]);

  // Điều khiển Zoom
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3.5));
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

  // Helper to clamp position within screen bounds based on scale
  const clampPosition = (newX: number, newY: number, currentScale: number) => {
    if (currentScale <= 1 || !containerRef.current) return { x: 0, y: 0 };
    const maxBoundX = (containerRef.current.clientWidth * (currentScale - 1)) / 2;
    const maxBoundY = (containerRef.current.clientHeight * (currentScale - 1)) / 2;
    return {
      x: Math.max(-maxBoundX, Math.min(maxBoundX, newX)),
      y: Math.max(-maxBoundY, Math.min(maxBoundY, newY)),
    };
  };

  // QUY TẮC V146: Click vào VÙNG ẢNH: Tuyệt đối KHÔNG ĐƯỢC ĐÓNG bảng Zoom.
  // Click để phóng to / thu nhỏ soi chi tiết tem nhãn và HSD.
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Ngăn chặn sự kiện lan ra nền
    if (hasDraggedRef.current) return;

    if (scale === 1) {
      const targetScale = 2.2;
      setScale(targetScale);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        const clamped = clampPosition(-offsetX * 1.1, -offsetY * 1.1, targetScale);
        setPosition(clamped);
      }
    } else {
      resetZoom();
    }
  };

  // Cuộn chuột để phóng to / thu nhỏ
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => {
        const next = Math.min(prev + 0.25, 3.5);
        return next;
      });
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
    dragDistanceRef.current = 0;
    hasDraggedRef.current = false;
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    const dx = Math.abs(e.clientX - dragStart.x - position.x);
    const dy = Math.abs(e.clientY - dragStart.y - position.y);
    dragDistanceRef.current += dx + dy;
    if (dragDistanceRef.current > 5) {
      hasDraggedRef.current = true;
    }
    const rawX = e.clientX - dragStart.x;
    const rawY = e.clientY - dragStart.y;
    const clamped = clampPosition(rawX, rawY, scale);
    setPosition(clamped);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Swipe & Drag trên Mobile
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
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
      setTouchSwipeStart(null);
    }
  };

  // QUY TẮC V143: Chỉ khi click vào VÙNG NỀN TRỐNG (Overlay) bên ngoài ảnh thì mới được đóng bảng Zoom.
  const handleOverlayBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Nếu vừa thực hiện thao tác kéo/pan ảnh, không đóng
    if (hasDraggedRef.current) return;

    // Nếu click vào chính vùng nền (hoặc containerRef) chứ không phải ảnh hay các nút bấm
    if (
      e.target === containerRef.current ||
      (e.target as HTMLElement).getAttribute('data-backdrop') === 'true'
    ) {
      onClose();
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

  if (!isOpen || images.length === 0 || typeof document === 'undefined') return null;

  const activeSrc = images[currentIndex] || images[0] || product?.image || '';

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? "View enlarged product image" : "Xem ảnh phóng to sản phẩm"}
      data-backdrop="true"
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex flex-col justify-between select-none"
      onClick={(e) => {
        // Ngăn chặn sự kiện click nổi bọt lên bất kỳ modal cha nào
        e.stopPropagation();
        handleOverlayBackdropClick(e);
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 1. TOP CONTROL BAR */}
      <header
        className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 bg-black/70 border-b border-white/10 z-20 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Product title & Counter */}
        <div className="flex items-center gap-2 sm:gap-3 text-white min-w-0 pr-2">
          {images.length > 1 ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/80 border border-emerald-500/50 text-[10px] sm:text-xs text-emerald-300 font-mono font-medium shrink-0">
              <Eye className="w-3 h-3 text-emerald-400" />
              <span>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-800 border border-white/20 text-[10px] sm:text-xs text-amber-300 font-mono font-semibold shrink-0">
              <span>{isEn ? 'Official Packaging' : 'Bao bì chính hãng'}</span>
            </div>
          )}

          {product && (
            <div className="truncate">
              <h3 className="text-xs sm:text-sm font-heading font-bold text-white truncate">
                {translateText(product.name, language)}
              </h3>
              <p className="text-[10px] sm:text-xs text-stone-400 truncate hidden sm:block">
                {product.packaging || product.unit} • {isEn ? 'Distributed by G-ROOSTER CO., LTD' : 'Phân phối bởi G-ROOSTER CO.,LTD'}
              </p>
            </div>
          )}
        </div>

        {/* Right: Zoom controls & Close button */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                zoomOut();
              }}
              disabled={scale <= 1}
              title={isEn ? "Zoom out (-)" : "Thu nhỏ (-)"}
              className="p-1 sm:p-1.5 text-stone-200 hover:text-white disabled:opacity-30 disabled:hover:text-stone-200 transition-colors rounded hover:bg-white/10 cursor-pointer"
            >
              <ZoomOut className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <span className="px-1.5 text-[10px] sm:text-xs font-mono font-bold text-amber-300 min-w-[36px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                zoomIn();
              }}
              disabled={scale >= 4}
              title={isEn ? "Zoom in (+)" : "Phóng to (+)"}
              className="p-1 sm:p-1.5 text-stone-200 hover:text-white disabled:opacity-30 disabled:hover:text-stone-200 transition-colors rounded hover:bg-white/10 cursor-pointer"
            >
              <ZoomIn className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              title={isEn ? "Reset size (0)" : "Về kích thước chuẩn (0)"}
              className="p-1 sm:p-1.5 text-stone-300 hover:text-white transition-colors rounded hover:bg-white/10 cursor-pointer border-l border-white/15 ml-0.5"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* QUY TẮC: Chỉ khi click vào NÚT [X] (Close) mới được đóng bảng Zoom */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            title={isEn ? "Close lightbox (Esc)" : "Đóng bảng phóng to (Esc)"}
            className="flex items-center gap-1 ml-1 sm:ml-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-medium text-xs transition-colors cursor-pointer border border-red-500/50 shadow-md active:scale-95"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">{isEn ? 'Close' : 'Đóng'}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN IMAGE DISPLAY CANVAS (SHOPEE STYLE ZOOM) */}
      {/* VÙNG NỀN TRỐNG (Overlay) - click vào đây sẽ đóng Zoom */}
      <main
        ref={containerRef}
        data-backdrop="true"
        className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6"
        onClick={handleOverlayBackdropClick}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
        }}
      >
        {/* Navigation Arrows: Mũi tên chuyển ảnh [Next/Prev] chỉ hiện khi có từ 2 ảnh trở lên */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              title={isEn ? "Previous image (Left arrow)" : "Ảnh trước (Mũi tên trái)"}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              title={isEn ? "Next image (Right arrow)" : "Ảnh tiếp theo (Mũi tên phải)"}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          </>
        )}

        {/* Scaled/Panned Image Container - VÙNG ẢNH: Tuyệt đối KHÔNG ĐƯỢC ĐÓNG bảng Zoom */}
        <div
          ref={imageWrapperRef}
          className="relative max-w-full max-h-full flex items-center justify-center transition-transform ease-out cursor-pointer"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
            transitionDuration: isDragging ? '0ms' : '200ms',
          }}
          onClick={handleImageClick}
        >
          {/* Pure-white Studio Frame with Drop Shadow */}
          <div className="relative bg-white rounded-2xl p-2 sm:p-4 shadow-2xl border border-white/20 flex items-center justify-center max-w-[92vw] max-h-[80vh] min-w-[260px] min-h-[260px] sm:min-w-[420px] sm:min-h-[420px]">
            {/* Loading Indicator */}
            {isImageLoading && !hasImageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-10 rounded-2xl">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2" />
                <span className="text-xs text-stone-600 font-medium">{isEn ? 'Loading actual product photo...' : 'Đang tải ảnh chụp thực tế...'}</span>
              </div>
            )}

            {/* Error Fallback */}
            {hasImageError ? (
              <div className="flex flex-col items-center justify-center p-6 text-center text-stone-700">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
                  <Eye className="w-6 h-6" />
                </div>
                <p className="font-bold text-sm mb-1">{translateText(product?.name, language) || (isEn ? 'Product' : 'Sản phẩm')}</p>
                <p className="text-xs text-stone-500 mb-3">{isEn ? 'Unable to load high-resolution image' : 'Không thể tải ảnh độ phân giải cao'}</p>
                <button
                  type="button"
                  onClick={() => {
                    setHasImageError(false);
                    setIsImageLoading(true);
                  }}
                  className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-colors"
                >
                  {isEn ? 'Reload image' : 'Tải lại ảnh'}
                </button>
              </div>
            ) : (
              <img
                ref={imgRef}
                src={activeSrc}
                alt={`${product?.name || 'Sản phẩm'} - G-ROOSTER`}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="sync"
                className="max-h-[76vh] max-w-[86vw] w-auto h-auto object-contain block mx-auto pointer-events-auto rounded-lg select-none"
                draggable={false}
                onLoad={(e) => {
                  const target = e.currentTarget;
                  if (target.naturalWidth === 320 && target.naturalHeight === 320) {
                    if (product?.id === 'vtn-matcha-laka-ceremonial') {
                      target.src = '/images/matcha-real/matcha-ceremonial-v150.jpg';
                    } else if (product?.id === 'vtn-matcha-laka-premium') {
                      target.src = '/images/matcha-real/matcha-premium-v150.jpg';
                    } else if (product?.id === 'vtn-matcha-laka-culinary') {
                      target.src = '/images/matcha-real/matcha-culinary-v150.jpg';
                    }
                  }
                  setIsImageLoading(false);
                  setHasImageError(false);
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (product?.id === 'vtn-matcha-laka-ceremonial') {
                    if (target.src !== '/images/matcha-real/matcha-ceremonial-v150.jpg' && target.src !== '/images/matcha-real/matcha-ceremonial-real.jpg') {
                      target.src = '/images/matcha-real/matcha-ceremonial-v150.jpg';
                      setIsImageLoading(false);
                      setHasImageError(false);
                      return;
                    }
                  } else if (product?.id === 'vtn-matcha-laka-premium') {
                    if (target.src !== '/images/matcha-real/matcha-premium-v150.jpg' && target.src !== '/images/matcha-real/matcha-premium-real.jpg') {
                      target.src = '/images/matcha-real/matcha-premium-v150.jpg';
                      setIsImageLoading(false);
                      setHasImageError(false);
                      return;
                    }
                  } else if (product?.id === 'vtn-matcha-laka-culinary') {
                    if (target.src !== '/images/matcha-real/matcha-culinary-v150.jpg' && target.src !== '/images/matcha-real/matcha-culinary-real.jpg') {
                      target.src = '/images/matcha-real/matcha-culinary-v150.jpg';
                      setIsImageLoading(false);
                      setHasImageError(false);
                      return;
                    }
                  } else if (product?.image && target.src !== product.image) {
                    target.src = product.image;
                    setIsImageLoading(false);
                    setHasImageError(false);
                    return;
                  }
                  setIsImageLoading(false);
                  setHasImageError(true);
                }}
              />
            )}
          </div>
        </div>
      </main>

      {/* 3. BOTTOM THUMBNAIL STRIP (ẢNH THU NHỎ) - Chỉ hiện khi có từ 2 ảnh trở lên */}
      {images.length > 1 && (
        <footer
          className="w-full bg-black/70 border-t border-white/10 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar z-20 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectImage(idx);
                }}
                className={`relative rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105 shadow-md'
                    : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                } w-12 h-12 sm:w-16 sm:h-16 bg-white`}
                title={isEn ? `View image ${idx + 1}` : `Xem ảnh ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`${translateText(product?.name, language) || (isEn ? 'Product' : 'Sản phẩm')} - G-Rooster`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-0.5"
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

  return createPortal(modalContent, document.body);
};
