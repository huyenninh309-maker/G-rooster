import React, { useEffect } from 'react';
import {
  X,
  ChevronRight,
  Phone,
  Globe,
  ShoppingBag,
  Building2,
  FileCheck2,
  Receipt,
  BookOpen,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { Currency, PartnerId, ExchangeRateInfo } from '../../types';
import { ChutChiuLogo } from '../ChutChiuLogo';
import { PRODUCTS } from '../../data/products';

export interface SharedMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPartner: PartnerId | 'all';
  onSelectPartner: (partner: PartnerId | 'all') => void;
  onScrollToSection: (sectionId: string) => void;
  currency: Currency;
  onToggleCurrency: (newCurrency: Currency) => void;
  rateInfo?: ExchangeRateInfo;
  onOpenAdmin?: () => void;
}

export const SharedMobileMenu: React.FC<SharedMobileMenuProps> = ({
  isOpen,
  onClose,
  selectedPartner,
  onSelectPartner,
  onScrollToSection,
  currency,
  onToggleCurrency,
  rateInfo,
  onOpenAdmin,
}) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const partners = [
    { id: 'all' as const, name: 'Tất cả 5 đối tác cung ứng' },
    { id: 'viet-thao-nhien' as const, name: 'Việt Thảo Nhiên (Matcha & Cascara)' },
    { id: 'vua-mia' as const, name: 'Vua Mía (Nước Mía Tuyết IQF)' },
    { id: 'thao-duoc-dato' as const, name: 'Thảo Dược DATO (Sâm Ngọc Linh)' },
    { id: 'non-la-aodai' as const, name: 'Nón Lá Coffee (Cà phê sấy)' },
    { id: 'phu-nha' as const, name: 'Đặc Sản Phú Nhã (Chà bông, Khô bò)' },
  ];

  // Dynamic categories from database
  const dynamicCategories = Array.from(new Set(PRODUCTS.map((p) => p.category).filter(Boolean)));

  const formattedRate = rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964';

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex" role="dialog" aria-modal="true" aria-label="Menu điều hướng">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide Panel */}
      <div className="relative w-84 max-w-[85vw] bg-white text-stone-900 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <ChutChiuLogo size="sm" frameless />
          </div>

          {/* Close button with large touch target (>= 44px) */}
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-stone-200/70 hover:bg-stone-300 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
            aria-label="Đóng menu"
          >
            <X className="w-5 h-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
          {/* Nhóm 1: Navigation chính (Plus Jakarta Sans, lớn, sạch sẽ) */}
          <div className="space-y-1">
            <div className="text-[11px] font-heading font-bold text-stone-400 uppercase tracking-wider px-2 pb-1.5">
              Điều Hướng B2B
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectPartner('all');
                onClose();
                onScrollToSection('san-pham');
              }}
              className="w-full text-left px-3.5 py-3 rounded-xl font-heading font-bold text-stone-900 hover:bg-[#143a24]/5 hover:text-[#143a24] text-[15px] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>SẢN PHẨM</span>
              <span className="text-xs text-[#143a24] bg-emerald-50 font-mono px-2 py-0.5 rounded-full border border-emerald-200">
                62+ SKU
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onScrollToSection('san-pham');
              }}
              className="w-full text-left px-3.5 py-3 rounded-xl font-heading font-bold text-stone-900 hover:bg-[#143a24]/5 hover:text-[#143a24] text-[15px] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>DANH MỤC</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onScrollToSection('chinh-sach-si');
              }}
              className="w-full text-left px-3.5 py-3 rounded-xl font-heading font-bold text-stone-900 hover:bg-[#143a24]/5 hover:text-[#143a24] text-[15px] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>CHÍNH SÁCH 4 MỨC GIÁ SỈ</span>
              <span className="text-[10px] text-amber-700 bg-amber-50 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                B2B
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onScrollToSection('goc-cong-thuc');
              }}
              className="w-full text-left px-3.5 py-3 rounded-xl font-heading font-bold text-stone-900 hover:bg-[#143a24]/5 hover:text-[#143a24] text-[15px] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>GÓC CÔNG THỨC PHA CHẾ</span>
              <span className="text-xs text-stone-500 font-mono">50+</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onScrollToSection('hanh-trinh-doi-tac');
              }}
              className="w-full text-left px-3.5 py-3 rounded-xl font-heading font-bold text-stone-900 hover:bg-[#143a24]/5 hover:text-[#143a24] text-[15px] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span>TIN TỨC &amp; LỄ KÝ KẾT</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {/* Nhóm 2: Đối tác chiến lược */}
          <div className="space-y-1.5 pt-4 border-t border-stone-100">
            <div className="text-[11px] font-heading font-bold text-stone-400 uppercase tracking-wider px-2 pb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#143a24]" />
              <span>Nhà Cung Cấp Đối Tác</span>
            </div>

            <div className="space-y-1">
              {partners.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onSelectPartner(p.id);
                    onClose();
                    onScrollToSection('san-pham');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedPartner === p.id
                      ? 'bg-[#143a24] text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  {selectedPartner === p.id && <span className="text-[#d4af37]">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Nhóm 3: Thông tin liên hệ & Tiền tệ */}
          <div className="space-y-3 pt-4 border-t border-stone-100 text-xs">
            <div className="text-[11px] font-heading font-bold text-stone-400 uppercase tracking-wider px-2">
              Liên Hệ &amp; Tỷ Giá
            </div>

            {/* Currency toggle */}
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 flex items-center justify-between">
              <span className="text-stone-600">Đơn vị tiền tệ:</span>
              <button
                type="button"
                onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
                className="px-2.5 py-1 rounded-lg bg-white text-[#143a24] font-bold border border-stone-200 shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#143a24]" />
                <span>{currency === 'VND' ? '🇻🇳 VND' : '🇺🇸 USD'}</span>
                <span className="text-[10px] text-stone-500 font-mono">
                  (1$ ≈ {formattedRate}₫)
                </span>
              </button>
            </div>

            {/* Hotlines */}
            <div className="space-y-1.5 text-stone-700">
              <a
                href="tel:0961525450"
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 flex items-center justify-between transition-colors block"
              >
                <span className="text-stone-500">Hotline 1:</span>
                <span className="text-[#143a24] font-bold font-mono">0961 525 450</span>
              </a>
              <a
                href="tel:0938797904"
                className="p-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200/60 flex items-center justify-between transition-colors block"
              >
                <span className="text-stone-500">Hotline 2:</span>
                <span className="text-[#143a24] font-bold font-mono">0938 7979 04</span>
              </a>
            </div>

            {/* Admin link */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="w-full text-center py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 text-xs font-mono transition-colors cursor-pointer"
              >
                🔒 Quản trị đơn hàng (/admin)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
