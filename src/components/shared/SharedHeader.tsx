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
import { Currency, PartnerId, ExchangeRateInfo, Language } from '../../types';
import { ChutChiuLogo } from '../ChutChiuLogo';
import { SharedMobileMenu } from './SharedMobileMenu';
import { PRODUCTS } from '../../data/products';
import { TRANSLATIONS } from '../../utils/i18n';

export interface SharedHeaderProps {
  currency: Currency;
  onToggleCurrency: (newCurrency: Currency) => void;
  language?: Language;
  onToggleLanguage?: (newLang: Language) => void;
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
  language = 'VN',
  onToggleLanguage,
  cartCount,
  onOpenCart,
  selectedPartner,
  onSelectPartner,
  onScrollToSection,
  rateInfo,
  onOpenAdmin,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'categories' | 'partners' | null>(null);
  const [localLang, setLocalLang] = useState<Language>(language);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang = language || localLang;
  const t = TRANSLATIONS[activeLang] || TRANSLATIONS.VN;

  const handleLanguageSwitch = (newLang: Language) => {
    setLocalLang(newLang);
    onToggleLanguage?.(newLang);
  };

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

  const isEn = activeLang === 'EN';

  const categories = [
    { id: 'all' as const, name: isEn ? 'All Categories (248 Products)' : 'Tất cả ngành hàng (248 SP)' },
    { id: 'matcha-tra-laka' as const, name: isEn ? '1. Matcha & Tea' : '1. Matcha & Trà' },
    { id: 'nuoc-mia-iqf' as const, name: isEn ? '2. Frozen Sugarcane Juice' : '2. Nước Mía Tuyết' },
    { id: 'thao-duoc-sam' as const, name: isEn ? '3. Herbal & Ginseng' : '3. Thảo Dược Sâm' },
    { id: 'ca-phe-vien-say' as const, name: isEn ? '4. Premium Coffee' : '4. Cà Phê Mộc' },
    { id: 'dac-san-snack' as const, name: isEn ? '5. Specialties & Snacks' : '5. Đặc Sản & Snack' },
    { id: 'socola-qua-tang' as const, name: isEn ? '6. Chocolate & Gifts' : '6. Socola & Quà Tặng' },
    { id: 'hat-qua-kho' as const, name: isEn ? '7. Premium Nuts & Dried Fruits' : '7. Hạt & Quả Khô Dinh Dưỡng Tuyển Chọn' },
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
    <>
      {/* =========================================================================
          TẦNG 1: TOP BAR (THANH XANH ĐẬM #00332c - CUỘN ĐI TỰ NHIÊN THEO CSS THUẦN)
          - Background: #00332c
          - Cuộn đi tự nhiên khi kéo trang xuống
          - Chiều cao cố định chuẩn: 32px mobile / 36px desktop
         ========================================================================= */}
      <div
        id="top-bar-container"
        className="w-full bg-[#00332c] text-white/90 border-b border-white/10 h-[32px] sm:h-[36px] py-1 sm:py-1.5 px-2.5 sm:px-6 lg:px-8 whitespace-nowrap overflow-hidden select-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 font-body whitespace-nowrap flex-nowrap h-full">
          {/* V249: BÊN TRÁI:
              - Mobile: ẩn để nhường diện tích cho Hotline và nút chọn ngôn ngữ
              - Tablet / Desktop: "G-ROOSTER CO., LTD" kèm Slogan B2B
          */}
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 shrink min-w-0">
            <span className="font-heading font-bold text-white whitespace-nowrap tracking-[0.05em] text-[12px] sm:text-[13px] shrink-0">
              G-ROOSTER CO., LTD
            </span>
            <span className="text-white/40 hidden lg:inline">•</span>
            <span className="text-stone-300 truncate hidden lg:inline font-normal text-xs">
              {t.sloganTopBar}
            </span>
          </div>

          {/* V249: BÊN PHẢI:
              - Chỉ giữ lại DUY NHẤT cụm: "📞 Hotline: 0961 525 450 - 0938 7979 04" ở vị trí bên phải
              - Xóa bỏ hoàn toàn cụm 2 số điện thoại không có nhãn Hotline phía trước
              - Kèm bộ chọn ngôn ngữ [VN | EN]
          */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 shrink-0 font-normal whitespace-nowrap flex-nowrap">
            {/* Cụm Hotline duy nhất */}
            <div className="flex items-center gap-1 sm:gap-1.5 text-stone-200 whitespace-nowrap text-[11px] sm:text-[11.5px] lg:text-[12.5px] shrink-0 flex-nowrap">
              <Phone className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37] sm:text-amber-300 shrink-0 fill-[#D4AF37]/25" strokeWidth={2} />
              <span className="text-stone-300 font-semibold">{t.hotline}</span>
              <a
                href="tel:0961525450"
                aria-label="Hotline 1: 0961 525 450"
                className="text-white hover:text-amber-300 font-mono font-bold transition-colors cursor-pointer text-[11px] sm:text-[11.5px] lg:text-[12.5px] whitespace-nowrap"
              >
                0961 525 450
              </a>
              <span className="text-white/40 px-0.5 font-bold">-</span>
              <a
                href="tel:0938797904"
                aria-label="Hotline 2: 0938 7979 04"
                className="text-white hover:text-amber-300 font-mono font-bold transition-colors cursor-pointer text-[11px] sm:text-[11.5px] lg:text-[12.5px] whitespace-nowrap"
              >
                0938 7979 04
              </a>
            </div>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* V241: HỢP NHẤT NGÔN NGỮ & TIỀN TỆ (REPLACE VND TOGGLE) */}
            <div className="flex items-center rounded-md bg-black/30 border border-white/10 p-0.5 text-[9.5px] sm:text-[10px] lg:text-[11px] font-mono tracking-wider text-white shrink-0 select-none">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('VN')}
                className={`px-2 py-0.5 rounded transition-all duration-200 cursor-pointer ${
                  activeLang === 'VN'
                    ? 'bg-[#D4AF37] text-stone-950 font-extrabold shadow-xs scale-105'
                    : 'text-stone-300/80 hover:text-white hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
                title="Tiếng Việt (VNĐ)"
                aria-label="Chọn Tiếng Việt & VNĐ"
              >
                VN
              </button>
              <span className="text-white/20 px-0.5">|</span>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('EN')}
                className={`px-2 py-0.5 rounded transition-all duration-200 cursor-pointer ${
                  activeLang === 'EN'
                    ? 'bg-[#D4AF37] text-stone-950 font-extrabold shadow-xs scale-105'
                    : 'text-stone-300/80 hover:text-white hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
                title="English (USD Live Rate)"
                aria-label="Select English & USD"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TẦNG 2: MAIN HEADER (STICKY HEADER THEO CSS THUẦN - 100% NGUYÊN BẢN KHÔNG LỖI JS)
          - CSS: position: sticky; top: 0; z-index: 1000;
          - Khi Top-bar cuộn khỏi màn hình, Main Header tự động bám dính ở đỉnh top: 0
          - Màu nền: XANH ĐẬM đặc tuyệt đối (#00332c), opacity: 1, không nhìn xuyên thấu nội dung sản phẩm bên dưới
          - Box Shadow: 0 2px 10px rgba(0,0,0,0.1) theo yêu cầu V237
          - Chiều cao Header tự động giãn theo kích thước Logo: Desktop 105px, Tablet 94px, Mobile 78px
         ========================================================================= */}
      <header
        id="main-navigation-bar"
        className="w-full border-b border-white/10 h-[78px] sm:h-[82px] md:h-[94px] lg:h-[105px] sticky top-0 z-[1000] font-heading select-none grooster-sticky-header"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: '#00332c',
          opacity: 1,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8">
          
          {/* =====================================================================
              1. DESKTOP LAYOUT (lg+) - THEO HÌNH 1 & 2 V233 / V243
              - Logo bên trái (Super-size 90px), Menu giữa, Tìm kiếm / Giỏ hàng bên phải
              - Nền xanh đậm #143A24, Chữ Menu màu TRẮNG thanh lịch, Hover Gold
              - Tăng khoảng cách (gap) giữa Logo và Menu
              - Search & Cart màu Trắng kèm Badge vàng Gold
             ===================================================================== */}
          <div className="hidden lg:flex items-center justify-between h-full gap-8 xl:gap-14">
            
            {/* BÊN TRÁI: Logo G-ROOSTER (Nền trong suốt, hòa quyện tự nhiên trên nền xanh, click về Home) */}
            <div className="shrink-0 flex items-center h-full pr-6 xl:pr-10">
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
                  size="header"
                  className="transition-all duration-300"
                />
              </button>
            </div>

            {/* Ở GIỮA: Navigation (Căn giữa chiều dọc, chữ TRẮNG, viết hoa, hover underline gold, gap rộng thoáng) */}
            <nav className="flex items-center gap-6 xl:gap-8 shrink min-w-0" ref={dropdownRef}>
              
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
                <span>{t.menuProducts}</span>
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
                  <span>{t.menuCategories}</span>
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
                      <span>{isEn ? '6 Strategic Categories' : '6 Nhóm Ngành Hàng Chiến Lược'}</span>
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
                <span>{t.menuRecipes}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [CHÍNH SÁCH] */}
              <button
                type="button"
                onClick={() => onScrollToSection('chinh-sach-si')}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-white/90 hover:text-[#f6d884] transition-colors cursor-pointer group"
                aria-label="Chính sách sỉ và phân phối"
              >
                <span>{t.menuPolicies}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* [NĂNG LỰC CUNG ỨNG] */}
              <button
                type="button"
                onClick={() => onScrollToSection('nang-luc-cung-ung')}
                className="relative py-2 text-[13px] font-heading font-semibold uppercase tracking-wider text-white/90 hover:text-[#f6d884] transition-colors cursor-pointer group"
                aria-label="Năng lực cung ứng & cam kết chất lượng"
              >
                <span>{t.menuCapacity}</span>
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
                aria-label={activeLang === 'EN' ? 'Search products' : 'Tìm kiếm sản phẩm'}
                title={activeLang === 'EN' ? 'Quick search 248+ products' : 'Tìm kiếm nhanh 248+ sản phẩm'}
              >
                <Search className="w-4 h-4 text-white/80" strokeWidth={1.8} />
              </button>

              {/* Cart Icon với Badge màu Gold */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative h-9 px-3 flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-200 shadow-xs cursor-pointer group"
                aria-label={activeLang === 'EN' ? `Open cart (${cartCount} items)` : `Mở giỏ hàng (${cartCount} sản phẩm)`}
              >
                <ShoppingCart className="w-4 h-4 text-white group-hover:text-amber-300 transition-colors" strokeWidth={1.8} />
                <span className="text-xs font-heading font-semibold tracking-wide text-white group-hover:text-amber-200">
                  {t.cart}
                </span>
                
                {/* Vòng tròn số lượng màu Gold */}
                <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#D4AF37] text-stone-950 text-[10px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* =====================================================================
              2. MOBILE & TABLET LAYOUT (< lg) - THEO HÌNH 3 V235
              - 3 CỘT ĐỐI XỨNG CÂN BẰNG:
                + CỘT 1 (Trái): Nút Hamburger Menu (3 gạch trắng)
                + CỘT 2 (Giữa): Logo G-ROOSTER CĂN GIỮA HOÀN HẢO
                + CỘT 3 (Phải): Search & Giỏ hàng kèm badge số lượng
              - Cột 1 và Cột 3 có chiều rộng đối xứng (w-16 sm:w-20) giúp Logo ở giữa chuẩn xác 100%
              - Tất cả các Icon và Logo thẳng hàng ngang tuyệt đối (Vertical Align Center)
             ===================================================================== */}
          <div className="flex lg:hidden items-center justify-between h-full w-full">
            
            {/* CỘT 1: Menu Hamburger (3 gạch) MÀU TRẮNG, đặt gọn gàng bên trái */}
            <div className="w-14 sm:w-16 shrink-0 flex items-center justify-start h-full">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={activeLang === 'EN' ? 'Open navigation menu' : 'Mở menu điều hướng di động và máy tính bảng'}
              >
                <Menu className="w-6 h-6 text-white" strokeWidth={2} />
              </button>
            </div>

            {/* CỘT 2: Logo G-ROOSTER - Căn giữa cả chiều dọc và ngang trong flow Flexbox (Super-Size V243) */}
            <div className="flex-1 flex items-center justify-center min-w-0 px-1 sm:px-2 h-full">
              <button
                type="button"
                onClick={() => {
                  onSelectPartner('all');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer focus:outline-hidden p-0 m-0 border-0 flex items-center justify-center h-full"
                style={{ backgroundColor: 'transparent', boxShadow: 'none', filter: 'none', border: 'none', padding: 0 }}
                aria-label={activeLang === 'EN' ? 'G-ROOSTER Home - Scroll to top' : 'Trang chủ G-ROOSTER - Về đầu trang'}
              >
                <ChutChiuLogo
                  size="header"
                  className="transition-all duration-300"
                />
              </button>
            </div>

            {/* CỘT 3: Search & Cart Icons (Đối xứng với Cột 1) */}
            <div className="w-14 sm:w-16 shrink-0 flex items-center justify-end gap-1.5 sm:gap-2 h-full">
              {/* Search */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="w-8.5 h-8.5 flex items-center justify-center rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={activeLang === 'EN' ? 'Search products' : 'Tìm kiếm sản phẩm'}
              >
                <Search className="w-4 h-4 text-white/90" strokeWidth={1.8} />
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={onOpenCart}
                className="relative w-8.5 h-8.5 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
                aria-label={activeLang === 'EN' ? `Open cart (${cartCount} items)` : `Mở giỏ hàng (${cartCount} sản phẩm)`}
              >
                <ShoppingCart className="w-4 h-4 text-white" strokeWidth={1.8} />
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-0.5 rounded-full bg-[#D4AF37] text-stone-950 text-[9.5px] font-mono font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

        </div>
      </header>

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
        language={activeLang}
        onToggleLanguage={handleLanguageSwitch}
      />
    </>
  );
};
