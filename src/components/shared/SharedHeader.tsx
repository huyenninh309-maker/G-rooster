import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  Phone,
  Globe,
  Sparkles,
  Building2,
  Tag,
  Check,
} from 'lucide-react';
import { Currency, PartnerId, ExchangeRateInfo } from '../../types';
import { ChutChiuLogo } from '../ChutChiuLogo';
import { SharedMobileMenu } from './SharedMobileMenu';
import { PRODUCTS } from '../../data/products';

export interface SharedHeaderProps {
  currency: Currency;
  onToggleCurrency: (newCurrency: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  selectedPartner: PartnerId | 'all';
  onSelectPartner: (partner: PartnerId | 'all') => void;
  onScrollToSection: (sectionId: string) => void;
  rateInfo?: ExchangeRateInfo;
  onRefreshRate?: () => void;
  isRefreshing?: boolean;
  onOpenAdmin?: () => void;
}

export const SharedHeader: React.FC<SharedHeaderProps> = ({
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  selectedPartner,
  onSelectPartner,
  onScrollToSection,
  rateInfo,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'categories' | 'partners' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for compact sticky mode (shrinks height ~30%)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: 'all' as const, name: 'Tất cả ngành hàng (133 SP)' },
    { id: 'matcha-tra-laka' as const, name: '1. Matcha & Trà' },
    { id: 'nuoc-mia-iqf' as const, name: '2. Nước Mía Tuyết' },
    { id: 'thao-duoc-sam' as const, name: '3. Thảo Dược Sâm' },
    { id: 'ca-phe-vien-say' as const, name: '4. Cà Phê' },
    { id: 'dac-san-snack' as const, name: '5. Đặc Sản & Snack' },
    { id: 'socola-qua-tang' as const, name: '6. Socola & Cacao' },
  ];

  const handleSearchClick = () => {
    // Focus search input or scroll to products catalog
    onScrollToSection('san-pham');
    setTimeout(() => {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 200);
  };

  const formattedRate = rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964';

  return (
    <header className="sticky top-0 z-40 w-full font-heading transition-all duration-300">
      {/* =========================================================================
          TẦNG 1: TOP BAR (SIÊU MẢNH - #143A24)
          - Background: #143A24
          - Chữ: Trắng mờ thanh lịch (11px desktop, 9.5px - 10px mobile)
          - Bên trái: Tên công ty + Slogan thực tế
          - Bên phải: Đầy đủ 2 Hotline 0961 525 450 - 0938 7979 04 trên 1 hàng ngang (nowrap)
         ========================================================================= */}
      <div
        className={`bg-[#143A24] text-white/85 text-[9px] sm:text-[11px] border-b border-white/5 transition-all duration-300 whitespace-nowrap overflow-hidden ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'py-1 sm:py-1.5 px-2.5 sm:px-6 lg:px-8'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 font-body whitespace-nowrap">
          {/* Bên trái: Tên công ty + Slogan */}
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="font-heading font-bold text-white tracking-wide whitespace-nowrap text-[10px] sm:text-xs">
              CHUTCHIU CO.,LTD
            </span>
            <span className="text-white/40 hidden md:inline">•</span>
            <span className="text-stone-300 truncate hidden md:inline font-light text-[11px]">
              Hệ thống phân phối Nông sản &amp; Đặc sản cao cấp
            </span>
          </div>

          {/* Bên phải: Hotline và liên hệ đối tác (ÉP 1 HÀNG DUY NHẤT VỚI whitespace-nowrap) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 font-normal whitespace-nowrap">
            {/* 2 Hotlines trên 1 hàng ngang duy nhất */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-stone-300 whitespace-nowrap">
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 shrink-0" strokeWidth={1.8} />
              <span className="text-stone-300 hidden md:inline">Hỗ trợ đối tác:</span>
              <a
                href="tel:0961525450"
                aria-label="Gọi hotline 1: 0961 525 450"
                className="text-white hover:text-amber-300 font-mono font-medium transition-colors cursor-pointer text-[9px] sm:text-[11px] whitespace-nowrap"
              >
                0961 525 450
              </a>
              <span className="text-white/40 px-0.5">-</span>
              <a
                href="tel:0938797904"
                aria-label="Gọi hotline 2: 0938 7979 04"
                className="text-white hover:text-amber-300 font-mono font-medium transition-colors cursor-pointer text-[9px] sm:text-[11px] whitespace-nowrap"
              >
                0938 7979 04
              </a>
            </div>

            <span className="text-white/20 hidden md:inline">|</span>

            <a
              href="https://zalo.me/0961525450"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Liên hệ hợp tác B2B qua Zalo"
              className="text-stone-300 hover:text-amber-300 transition-colors hidden xl:inline cursor-pointer text-[10.5px]"
            >
              Liên hệ hợp tác B2B
            </a>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* Currency toggle */}
            <button
              type="button"
              onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
              className="px-1.5 sm:px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[9.5px] sm:text-[10px] font-mono tracking-wider transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              aria-label="Chuyển đổi tiền tệ hiển thị VND hoặc USD"
              title="Chuyển đổi tiền tệ hiển thị"
            >
              <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37]" strokeWidth={1.5} />
              <span>{currency === 'VND' ? 'VND' : 'USD'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TẦNG 2: MAIN HEADER (TRẮNG TINH KHÔI, LESS BORDER, COMPACT KHI SCROLL)
          - Desktop: Logo 40-45px (frameless), Menu chữ mảnh uppercase + hover gold 1px (0.3s)
          - Sửa Menu: Loại bỏ 'DANH MỤC'. Thêm 'GÓC CÔNG THỨC' sau 'ĐỐI TÁC CHIẾN LƯỢC'
          - Đổi tiêu đề: 'ĐỐI TÁC CHIẾN LƯỢC' (tuyệt đối không ghi số lượng cố định)
          - Right Icons: stroke mảnh 1.5px, Cart badge Gold
          - Sticky Mode: Thu nhỏ chiều cao ~30%, shadow cực nhẹ (shadow-xs)
         ========================================================================= */}
      <div
        className={`w-full bg-white/98 backdrop-blur-md transition-all duration-300 border-b border-stone-200/60 ${
          isScrolled
            ? 'h-14 sm:h-15 shadow-xs'
            : 'h-18 sm:h-20 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
          
          {/* =====================================================================
              1. DESKTOP LAYOUT (lg+)
             ===================================================================== */}
          <div className="hidden lg:flex items-center justify-between h-full gap-6">
            
            {/* BÊN TRÁI: Logo Chút Chíu (Bỏ khung trắng thô, tự nhiên, chiều cao 40-45px) */}
            <div className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer focus:outline-hidden"
                aria-label="Trang chủ Chút Chíu - Về đầu trang"
              >
                <ChutChiuLogo
                  size={isScrolled ? 'sm' : 'md'}
                  className="transition-all duration-300"
                />
              </button>
            </div>

            {/* Ở GIỮA: Navigation (Chữ mảnh, viết hoa, Plus Jakarta Sans, hover underline gold 1px mượt mà 0.3s) */}
            <nav className="flex items-center gap-6 xl:gap-8" ref={dropdownRef}>
              
              {/* [SẢN PHẨM] */}
              <button
                type="button"
                onClick={() => {
                  onSelectPartner('all');
                  onScrollToSection('san-pham');
                }}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-stone-700 hover:text-[#143A24] transition-colors cursor-pointer group"
                aria-label="Xem toàn bộ sản phẩm"
              >
                <span>SẢN PHẨM</span>
                {/* Underline Gold mảnh 1px, transition 0.3s */}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [DANH MỤC NGÀNH HÀNG] with Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'partners' ? null : 'partners')
                  }
                  className={`relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer group ${
                    activeDropdown === 'partners' ? 'text-[#143A24]' : 'text-stone-700 hover:text-[#143A24]'
                  }`}
                  aria-label="Danh mục ngành hàng phân phối"
                  aria-expanded={activeDropdown === 'partners'}
                >
                  <span>DANH MỤC NGÀNH HÀNG</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-300 ${
                      activeDropdown === 'partners' ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                    strokeWidth={1.5}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === 'partners' && (
                  <div className="absolute top-full left-0 mt-2 w-88 bg-white rounded-xl shadow-xl border border-stone-200/80 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 pb-1.5 text-[10.5px] font-bold text-stone-400 uppercase tracking-wider font-heading border-b border-stone-100 flex items-center justify-between">
                      <span>5 Nhóm Ngành Hàng Chiến Lược</span>
                      <span className="text-emerald-700 font-mono">Chút Chíu B2B</span>
                    </div>
                    {categories.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          onSelectPartner(p.id);
                          setActiveDropdown(null);
                          onScrollToSection('san-pham');
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-body transition-colors flex items-center justify-between cursor-pointer ${
                          selectedPartner === p.id
                            ? 'bg-[#143A24] text-white font-bold'
                            : 'text-stone-700 hover:bg-[#143A24]/5 hover:text-[#143A24]'
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        {selectedPartner === p.id && (
                          <Check className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* [GÓC CÔNG THỨC] */}
              <button
                type="button"
                onClick={() => onScrollToSection('goc-cong-thuc')}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-stone-700 hover:text-[#143A24] transition-colors cursor-pointer group"
                aria-label="Góc công thức pha chế F&B"
              >
                <span>GÓC CÔNG THỨC</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [CHÍNH SÁCH] */}
              <button
                type="button"
                onClick={() => onScrollToSection('chinh-sach-si')}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-stone-700 hover:text-[#143A24] transition-colors cursor-pointer group"
                aria-label="Chính sách sỉ và phân phối"
              >
                <span>CHÍNH SÁCH</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [NĂNG LỰC CUNG ỨNG] */}
              <button
                type="button"
                onClick={() => onScrollToSection('nang-luc-cung-ung')}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-stone-700 hover:text-[#143A24] transition-colors cursor-pointer group"
                aria-label="Năng lực cung ứng & cam kết chất lượng"
              >
                <span>NĂNG LỰC CUNG ỨNG</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>
            </nav>

            {/* BÊN PHẢI: Search Icon mỏng & Giỏ Hàng kèm Badge màu Gold (stroke 1.5px) */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Search Icon */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-stone-700 hover:text-[#143A24] hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Tìm kiếm sản phẩm"
                title="Tìm kiếm nhanh 62+ sản phẩm"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Cart Icon với Badge màu Gold */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative h-10 px-3.5 flex items-center gap-2 rounded-xl bg-[#143A24] hover:bg-[#0d2718] text-white transition-all duration-200 shadow-xs cursor-pointer group"
                aria-label={`Mở giỏ hàng (${cartCount} sản phẩm)`}
              >
                <ShoppingCart className="w-4.5 h-4.5 text-stone-200 group-hover:text-white" strokeWidth={1.5} />
                <span className="text-xs font-heading font-bold hidden xl:inline tracking-wide">
                  Giỏ hàng
                </span>
                
                {/* Vòng tròn số lượng màu Gold */}
                <span className="min-w-[20px] h-5 px-1 rounded-full bg-[#D4AF37] text-stone-950 text-[11px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              2. MOBILE & TABLET LAYOUT (< lg)
              ĐỒNG BỘ:
              - Bố cục: [MENU] [LOGO] [SEARCH] [CART]
              - Logo Mobile & Tablet: CĂN GIỮA TUYỆT ĐỐI theo toàn bộ chiều ngang màn hình (Viewport)
              - Không bị lệch bởi các icon xung quanh
              - Stroke mảnh 1.5px
             ===================================================================== */}
          <div className="relative flex lg:hidden items-center justify-between h-full">
            
            {/* BÊN TRÁI: Menu 3 gạch */}
            <div className="z-10 flex items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-stone-800 hover:text-[#143A24] hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Mở menu điều hướng di động và máy tính bảng"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>

            {/* TRUNG TÂM: Logo căn giữa theo TOÀN BỘ viewport (absolute center tuyệt đối) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 flex items-center justify-center pointer-events-auto">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer focus:outline-hidden"
                aria-label="Trang chủ Chút Chíu - Về đầu trang"
              >
                <ChutChiuLogo size="sm" />
              </button>
            </div>

            {/* BÊN PHẢI: Search & Cart Icons (stroke 1.5px) */}
            <div className="z-10 flex items-center gap-1 sm:gap-1.5">
              {/* Search */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-stone-700 hover:text-[#143A24] transition-colors cursor-pointer"
                aria-label="Tìm kiếm sản phẩm"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#143A24] text-white transition-colors cursor-pointer"
                aria-label={`Mở giỏ hàng (${cartCount} sản phẩm)`}
              >
                <ShoppingCart className="w-4.5 h-4.5" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF37] text-stone-950 text-[10px] font-mono font-bold flex items-center justify-center shadow-xs border border-white">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Shared Mobile Menu Drawer */}
      <SharedMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        selectedPartner={selectedPartner}
        onSelectPartner={onSelectPartner}
        onScrollToSection={onScrollToSection}
        currency={currency}
        onToggleCurrency={onToggleCurrency}
        rateInfo={rateInfo}
        onOpenAdmin={onOpenAdmin}
      />
    </header>
  );
};
