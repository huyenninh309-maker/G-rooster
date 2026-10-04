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
          TẦNG 1: TOP BAR (THANH XANH ĐẬM - TINH CHỈNH V227)
          - Background: #143A24
          - Góc trái: "G-ROOSTER CO., LTD" gọn gàng, không bị đẩy lùi hay cắt chữ
          - Góc phải: Chỉ giữ lại [Hotline] và [VND] (Xóa bỏ hoàn toàn Zalo)
          - Đảm bảo 1 hàng ngang duy nhất không bao giờ rớt dòng
         ========================================================================= */}
      <div
        className={`bg-[#143A24] text-white/90 border-b border-white/10 transition-all duration-300 whitespace-nowrap overflow-hidden ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'py-1 sm:py-1.5 md:py-2 px-2.5 sm:px-6 lg:px-8'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 font-body whitespace-nowrap flex-nowrap">
          {/* Bên trái: Tên công ty rút gọn "G-ROOSTER" trên màn hình nhỏ (<sm) để không bị cắt chữ */}
          <div className="flex items-center gap-1.5 sm:gap-2 truncate shrink min-w-0">
            <span className="font-heading font-bold text-white whitespace-nowrap tracking-[0.05em] text-[12px] sm:text-[13px] shrink-0">
              <span className="inline sm:hidden">G-ROOSTER</span>
              <span className="hidden sm:inline">G-ROOSTER CO., LTD</span>
            </span>
            <span className="text-white/40 hidden xl:inline">•</span>
            <span className="text-stone-300 truncate hidden xl:inline font-normal text-xs">
              Hệ thống phân phối Nông sản &amp; Đặc sản cao cấp
            </span>
          </div>

          {/* Bên phải: Chỉ giữ lại [Hotline] và [VND] (V227: Xóa bỏ hoàn toàn Zalo trên Top-bar) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 font-normal whitespace-nowrap flex-nowrap">
            {/* Hotlines */}
            <div className="flex items-center gap-1 text-stone-200 whitespace-nowrap text-[10.5px] sm:text-[11.5px] lg:text-[12.5px]">
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 shrink-0" strokeWidth={1.8} />
              <span className="text-stone-300 hidden sm:inline">Hotline:</span>
              <a
                href="tel:0961525450"
                aria-label="Gọi hotline 1: 0961 525 450"
                className="text-white hover:text-amber-300 font-mono font-bold transition-colors cursor-pointer text-[10.5px] sm:text-[11.5px] lg:text-[12.5px] whitespace-nowrap"
              >
                0961 525 450
              </a>
              <span className="text-white/40 px-0.5 font-bold">-</span>
              <a
                href="tel:0938797904"
                aria-label="Gọi hotline 2: 0938 7979 04"
                className="text-white hover:text-amber-300 font-mono font-bold transition-colors cursor-pointer text-[10.5px] sm:text-[11.5px] lg:text-[12.5px] whitespace-nowrap"
              >
                0938 7979 04
              </a>
            </div>

            <span className="text-white/20">|</span>

            {/* Currency toggle */}
            <button
              type="button"
              onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
              className="px-1.5 sm:px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[9.5px] sm:text-[10px] lg:text-[11.5px] font-mono tracking-wider transition-colors flex items-center gap-1 cursor-pointer shrink-0"
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
          TẦNG 2: MAIN HEADER (LUXURY DARK THEME - V224)
          - Background: Đồng bộ màu XANH ĐẬM #143A24 với thanh Top-bar
          - Invert Màu chữ/Icon: Menu, Search, Cart chuyển toàn bộ sang màu TRẮNG
          - Loại bỏ khung trắng: Logo hiển thị tự nhiên hòa quyện trên nền xanh
          - Mobile: Cấu trúc thuần FLEXBOX, chiều cao cố định 72px-80px, không đè Top-bar
         ========================================================================= */}
      <div
        className={`w-full bg-[#143A24] transition-all duration-300 border-b border-white/10 ${
          isScrolled
            ? 'h-[64px] sm:h-[68px] md:h-[72px] lg:h-[78px]'
            : 'h-[74px] sm:h-[78px] md:h-[80px] lg:h-[90px]'
        }`}
        style={{ backgroundColor: '#143A24', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8">
          
          {/* =====================================================================
              1. DESKTOP LAYOUT (lg+)
              - Nền xanh đậm #143A24, Chữ Menu màu TRẮNG thanh lịch, Hover Gold
              - Logo hiển thị tự nhiên không khung trắng, căn giữa trục dọc
              - Search & Cart màu Trắng kèm Badge vàng Gold
             ===================================================================== */}
          <div className="hidden lg:flex items-center justify-between h-full gap-6 xl:gap-10">
            
            {/* BÊN TRÁI: Logo G-ROOSTER (Nền trong suốt, hòa quyện tự nhiên trên nền xanh, click về Home) */}
            <div className="shrink-0 flex items-center h-full pr-4 xl:pr-8">
              <button
                type="button"
                onClick={() => {
                  onSelectPartner('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer focus:outline-hidden p-0 m-0 border-0 flex items-center justify-center h-full"
                style={{ backgroundColor: 'transparent', boxShadow: 'none', filter: 'none', border: 'none', padding: 0 }}
                aria-label="Trang chủ G-ROOSTER - Về đầu trang"
              >
                <ChutChiuLogo
                  size={isScrolled ? 'compact' : 'header'}
                  className="transition-all duration-300 max-h-full"
                />
              </button>
            </div>

            {/* Ở GIỮA: Navigation (Căn giữa chiều dọc, chữ TRẮNG, viết hoa, hover underline gold, gap rộng thoáng) */}
            <nav className="flex items-center gap-5 xl:gap-8 shrink min-w-0" ref={dropdownRef}>
              
              {/* [SẢN PHẨM] */}
              <button
                type="button"
                onClick={() => {
                  onSelectPartner('all');
                  onScrollToSection('san-pham');
                }}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-white/90 hover:text-[#f6d884] transition-colors cursor-pointer group"
                aria-label="Xem toàn bộ sản phẩm"
              >
                <span>SẢN PHẨM</span>
                {/* Underline Gold mảnh 1px, transition 0.3s */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [DANH MỤC NGÀNH HÀNG] with Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'partners' ? null : 'partners')
                  }
                  className={`relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer group ${
                    activeDropdown === 'partners' ? 'text-[#f6d884]' : 'text-white/90 hover:text-[#f6d884]'
                  }`}
                  aria-label="Danh mục ngành hàng phân phối"
                  aria-expanded={activeDropdown === 'partners'}
                >
                  <span>DANH MỤC NGÀNH HÀNG</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/70 transition-transform duration-300 ${
                      activeDropdown === 'partners' ? 'rotate-180 text-[#D4AF37]' : 'group-hover:text-[#f6d884]'
                    }`}
                    strokeWidth={1.8}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === 'partners' && (
                  <div className="absolute top-full left-0 mt-2 w-88 bg-[#0e2c1c] text-white rounded-xl shadow-2xl border border-white/15 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
                    <div className="px-3.5 pb-1.5 text-[10.5px] font-bold text-amber-300/80 uppercase tracking-wider font-heading border-b border-white/10 flex items-center justify-between">
                      <span>5 Nhóm Ngành Hàng Chiến Lược</span>
                      <span className="text-[#f6d884] font-mono text-[10px]">G-ROOSTER B2B</span>
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
                            ? 'bg-white/15 text-[#f6d884] font-bold'
                            : 'text-stone-200 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        {selectedPartner === p.id && (
                          <Check className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={2} />
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
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-white/90 hover:text-[#f6d884] transition-colors cursor-pointer group"
                aria-label="Góc công thức pha chế F&B"
              >
                <span>GÓC CÔNG THỨC</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [CHÍNH SÁCH] */}
              <button
                type="button"
                onClick={() => onScrollToSection('chinh-sach-si')}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-white/90 hover:text-[#f6d884] transition-colors cursor-pointer group"
                aria-label="Chính sách sỉ và phân phối"
              >
                <span>CHÍNH SÁCH</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [NĂNG LỰC CUNG ỨNG] */}
              <button
                type="button"
                onClick={() => onScrollToSection('nang-luc-cung-ung')}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-white/90 hover:text-[#f6d884] transition-colors cursor-pointer group"
                aria-label="Năng lực cung ứng & cam kết chất lượng"
              >
                <span>NĂNG LỰC CUNG ỨNG</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>
            </nav>

            {/* BÊN PHẢI: Search Icon TRẮNG & Giỏ Hàng kèm Badge màu Gold */}
            {/* BÊN PHẢI: Search Icon & Giỏ Hàng (Thu nhỏ nhẹ, màu TRẮNG MỜ opacity 0.8 để không lấn át Logo) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search Icon */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-8.5 h-8.5 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Tìm kiếm sản phẩm"
                title="Tìm kiếm nhanh 133+ sản phẩm"
              >
                <Search className="w-4 h-4 text-white/80" strokeWidth={1.8} />
              </button>

              {/* Cart Icon với Badge màu Gold */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative h-8.5 px-3 flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/15 transition-all duration-200 shadow-xs cursor-pointer group"
                aria-label={`Mở giỏ hàng (${cartCount} sản phẩm)`}
              >
                <ShoppingCart className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-heading font-medium hidden xl:inline tracking-wide text-white/80 group-hover:text-white">
                  Giỏ hàng
                </span>
                
                {/* Vòng tròn số lượng màu Gold */}
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF37] text-stone-950 text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              2. MOBILE & TABLET LAYOUT (< lg) - THUẦN FLEXBOX (FIX CRITICAL V224)
              - Giải pháp triệt để: Sử dụng Flexbox 3 cột (Trái - Giữa - Phải)
              - Tuyệt đối KHÔNG dùng position absolute để logo không bao giờ bị trôi đè lên Top-bar!
              - Menu Hamburger: Màu TRẮNG, đặt gọn gàng bên trái
              - Logo: Căn giữa hoàn hảo cả dọc lẫn ngang trong ô giữa
              - Chiều cao cố định chuẩn: 72px - 80px
             ===================================================================== */}
          <div className="flex lg:hidden items-center justify-between h-full w-full">
            
            {/* CỘT 1: Menu Hamburger (3 gạch) MÀU TRẮNG, đặt gọn gàng bên trái */}
            <div className="w-12 sm:w-14 shrink-0 flex items-center justify-start h-full">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Mở menu điều hướng di động và máy tính bảng"
              >
                <Menu className="w-6 h-6 text-white" strokeWidth={2} />
              </button>
            </div>

            {/* CỘT 2: Logo G-ROOSTER - Căn giữa cả chiều dọc và ngang trong flow Flexbox */}
            <div className="flex-1 flex items-center justify-center min-w-0 px-1 sm:px-2 h-full overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  onSelectPartner('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer focus:outline-hidden p-0 m-0 border-0 flex items-center justify-center h-full max-h-full"
                style={{ backgroundColor: 'transparent', boxShadow: 'none', filter: 'none', border: 'none', padding: 0 }}
                aria-label="Trang chủ G-ROOSTER - Về đầu trang"
              >
                <ChutChiuLogo
                  size={isScrolled ? 'compact' : 'header'}
                  className="transition-all duration-300 max-h-full"
                />
              </button>
            </div>

            {/* CỘT 3: Search & Cart Icons (Thu nhỏ nhẹ, màu TRẮNG MỜ opacity 0.8 để không lấn át Logo) */}
            <div className="w-12 sm:w-auto shrink-0 flex items-center justify-end gap-1 sm:gap-1.5 h-full">
              {/* Search */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Tìm kiếm sản phẩm"
              >
                <Search className="w-4 h-4 text-white/80" strokeWidth={1.8} />
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 transition-colors cursor-pointer"
                aria-label={`Mở giỏ hàng (${cartCount} sản phẩm)`}
              >
                <ShoppingCart className="w-4 h-4 text-white/80" strokeWidth={1.8} />
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 rounded-full bg-[#D4AF37] text-stone-950 text-[9.5px] font-mono font-bold flex items-center justify-center shadow-xs">
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
