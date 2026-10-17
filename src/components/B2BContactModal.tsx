import React, { useEffect, useState } from 'react';
import { Phone, MessageCircle, X, Sparkles, Building2 } from 'lucide-react';
import { Language } from '../types';

interface B2BContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  productName?: string;
  language?: Language;
}

export const openB2BContactModal = (productName?: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('grooster-open-b2b-contact', {
        detail: { productName },
      })
    );
  }
};

export const B2BContactModal: React.FC<B2BContactModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  productName: propsProductName,
  language = 'VN',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalProductName, setInternalProductName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ productName?: string }>;
      setInternalProductName(customEvent.detail?.productName);
      setInternalOpen(true);
    };

    window.addEventListener('grooster-open-b2b-contact', handleCustomEvent);
    return () => {
      window.removeEventListener('grooster-open-b2b-contact', handleCustomEvent);
    };
  }, []);

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : internalOpen;
  const currentProductName = propsProductName || internalProductName;

  const handleClose = () => {
    if (propsOnClose) {
      propsOnClose();
    }
    setInternalOpen(false);
  };

  if (!isOpen) return null;

  const isEn = language === 'EN';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-gradient-to-b from-[#062415] via-[#09351f] to-[#041a0f] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#d4af37]/60 transform animate-in zoom-in-95 duration-200 overflow-hidden"
      >
        {/* Decorative corner glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#d4af37]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label={isEn ? 'Close' : 'Đóng'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f6d884] text-[11px] font-bold tracking-wider uppercase w-fit mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#f6d884]" />
          <span>{isEn ? 'B2B Wholesale Inquiries' : 'Chính Sách Bán Sỉ & Đại Lý'}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight flex items-center gap-2">
          <span>{isEn ? 'B2B WHOLESALE PRICING' : 'GIÁ SỈ B2B: LIÊN HỆ TƯ VẤN'}</span>
        </h3>

        {currentProductName ? (
          <p className="mt-1.5 text-xs sm:text-sm text-stone-300 line-clamp-2">
            <span className="text-[#f6d884] font-bold">{isEn ? 'Product: ' : 'Sản phẩm: '}</span>
            <span className="font-semibold text-white">{currentProductName}</span>
          </p>
        ) : (
          <p className="mt-1.5 text-xs sm:text-sm text-stone-300">
            {isEn
              ? 'Connect directly with our dedicated B2B sales team for tiered pricing, sample packages, and contract terms.'
              : 'Kết nối trực tiếp với bộ phận kinh doanh & phân phối để nhận bảng chiết khấu sỉ, hợp đồng và mẫu thử.'}
          </p>
        )}

        <div className="my-5 border-t border-emerald-800/60" />

        {/* Action Buttons: Hotline & Zalo */}
        <div className="space-y-3">
          {/* OPTION 1: GỌI HOTLINE */}
          <a
            href="tel:0938797904"
            className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold border border-emerald-400/40 shadow-lg hover:shadow-emerald-900/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6 fill-stone-950" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-amber-300 font-extrabold flex items-center gap-1.5">
                <span>{isEn ? 'DIRECT HOTLINE' : 'GỌI HOTLINE TRỰC TIẾP'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-lg sm:text-xl font-black font-mono tracking-tight text-white mt-0.5">
                0938 7979 04
              </div>
              <div className="text-[11px] text-emerald-200/90 font-medium">
                {isEn ? 'Instant support 24/7' : 'Hỗ trợ tư vấn báo giá ngay'}
              </div>
            </div>
          </a>

          {/* OPTION 2: CHAT ZALO */}
          <a
            href="https://zalo.me/0938797904"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0068ff] via-[#0055d4] to-[#0042a8] hover:from-[#0072ff] hover:to-[#0055d4] text-white font-bold border border-blue-300/40 shadow-lg hover:shadow-blue-900/40 transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-white text-[#0068ff] flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform font-black text-sm">
              <MessageCircle className="w-6 h-6 text-[#0068ff]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-blue-200 font-extrabold">
                {isEn ? 'OFFICIAL ZALO CHAT' : 'CHAT QUA ZALO B2B'}
              </div>
              <div className="text-lg sm:text-xl font-black font-mono tracking-tight text-white mt-0.5">
                0938 7979 04
              </div>
              <div className="text-[11px] text-blue-100/90 font-medium">
                {isEn ? 'Send official quotes & catalogs' : 'Gửi bảng giá chi tiết & chính sách chiết khấu'}
              </div>
            </div>
          </a>
        </div>

        {/* Company Footer Note */}
        <div className="mt-5 pt-3 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-stone-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>G-ROOSTER CO., LTD</span>
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="text-stone-300 hover:text-white underline font-semibold cursor-pointer"
          >
            {isEn ? 'Dismiss' : 'Đóng lại'}
          </button>
        </div>
      </div>
    </div>
  );
};
