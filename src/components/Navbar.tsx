import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  ShoppingBag,
  Menu,
  X,
  Globe,
  Search,
  ChevronDown,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Truck,
  BookOpen,
  FileCheck2,
  Receipt,
  Layers,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { Currency, PartnerId, ExchangeRateInfo } from '../types';
import { ChutChiuLogo } from './ChutChiuLogo';

interface NavbarProps {
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

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  selectedPartner,
  onSelectPartner,
  onScrollToSection,
  rateInfo,
  onRefreshRate,
  isRefreshing,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [partnerDropdownOpen, setPartnerDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const partnerMenuRef = useRef<HTMLDivElement>(null);
  const categoryMenuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position to transition header to compact sticky mode (20% thinner)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (partnerMenuRef.current && !partnerMenuRef.current.contains(e.target as Node)) {
        setPartnerDropdownOpen(false);
      }
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const partnersList: { id: PartnerId | 'all'; label: string; specialty: string; avatar?: string }[] = [
    {
      id: 'all',
      label: 'Tất Cả Đối Tác Cung Ứng',
      specialty: 'Hệ sinh thái nông đặc sản chuẩn xuất khẩu',
    },
    {
      id: 'viet-thao-nhien',
      label: 'Việt Thảo Nhiên',
      specialty: 'Matcha Laka & Cascara Cầu Đất',
      avatar: '/images/logos/logo-vietthaonhien.png',
    },
    {
      id: 'vua-mia',
      label: 'Vua Mía',
      specialty: 'Nước Mía Tuyết IQF -40°C',
      avatar: '/images/logos/logo-vuamia.png',
    },
    {
      id: 'thao-duoc-dato',
      label: 'Thảo Dược DATO',
      specialty: 'Sâm Dây & Tam Thất Ngọc Linh',
      avatar: '/images/logos/logo-dato.png',
    },
    {
      id: 'non-la-aodai',
      label: 'Nón Lá & AODAI',
      specialty: 'Cà Phê Viên Sấy Thăng Hoa',
      avatar: '/images/logos/logo-nonla.png',
    },
    {
      id: 'phu-nha',
      label: 'Đặc Sản Phú Nhã',
      specialty: 'Chà Bông & Khô Bò Thượng Hạng',
      avatar: '/images/phunha/logo-phunha.svg',
    },
  ];

  const categoriesList = [
    { name: 'Matcha & Trà Cascara Cầu Đất', partnerId: 'viet-thao-nhien' as PartnerId },
    { name: 'Nước Mía Tuyết IQF -40°C', partnerId: 'vua-mia' as PartnerId },
    { name: 'Sâm Dây & Thảo Dược Ngọc Linh', partnerId: 'thao-duoc-dato' as PartnerId },
    { name: 'Cà Phê Viên Nén Sấy Thăng Hoa', partnerId: 'non-la-aodai' as PartnerId },
    { name: 'Chà Bông & Khô Bò Thượng Hạng', partnerId: 'phu-nha' as PartnerId },
    { name: 'Tất Cả Danh Mục Nông Sản B2B', partnerId: 'all' as const },
  ];

  const handleSearchFocus = () => {
    onScrollToSection('san-pham');
    setTimeout(() => {
      const input = document.getElementById('catalog-search-input');
      if (input) {
        input.focus();
        input.classList.add('ring-2', 'ring-[#d4af37]');
        setTimeout(() => input.classList.remove('ring-2', 'ring-[#d4af37]'), 1500);
      }
    }, 450);
  };

  const formattedRate = rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964';

  return (
    <header
      id="main-app-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 font-body ${
        isScrolled
          ? 'bg-[#072617]/95 backdrop-blur-md shadow-md border-b border-[#d4af37]/30'
          : 'bg-[#0b3b24] shadow-sm border-b border-emerald-900/80'
      }`}
    >
      {/* Brand Ribbon: Mảnh mai, sang trọng */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

      {/* 1. TOP BAR DESKTOP & TABLET: Dải mỏng tinh tế, font 11px cực mảnh */}
      <div className="hidden sm:block bg-[#051c0f]/95 border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-1 text-[11px] font-normal tracking-wide text-stone-300 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Top Bar Bên Trái: Tên doanh nghiệp & Hệ thống */}
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 font-heading font-bold text-[#d4af37] tracking-wider text-[11px]">
              <Sparkles className="w-3 h-3 text-[#d4af37] shrink-0" strokeWidth={1.5} />
              <span>CHUTCHIU CO.,LTD</span>
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-300 truncate font-light">
              Hệ thống phân phối Nông sản &amp; Đặc sản cao cấp
            </span>
          </div>

          {/* Top Bar Bên Phải: Hỗ trợ đối tác | Liên hệ & Tỷ giá */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Quick Links: Hỗ trợ đối tác | Liên hệ */}
            <div className="flex items-center gap-2.5 text-stone-300 font-light">
              <button
                type="button"
                onClick={() => onScrollToSection('hanh-trinh-doi-tac')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Hỗ trợ đối tác
              </button>
              <span className="text-stone-600">|</span>
              <a
                href="tel:0961525450"
                className="hover:text-amber-300 transition-colors flex items-center gap-1"
                title="Gọi Hotline B2B"
              >
                <Phone className="w-3 h-3 text-[#d4af37]" strokeWidth={1.5} />
                <span className="font-mono text-stone-200">0961 525 450</span>
              </a>
            </div>

            {/* Currency Converter VND / USD */}
            <div className="flex items-center gap-1 pl-2 border-l border-white/10">
              <button
                id="header-currency-toggle"
                type="button"
                onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
                className="px-2 py-0.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-amber-300 font-bold text-[10px] sm:text-[11px] border border-[#d4af37]/30 transition-all flex items-center gap-1 cursor-pointer"
                title={`Đổi tiền tệ (Tỷ giá: 1 USD = ${formattedRate} VND)`}
              >
                <Globe className="w-3 h-3 text-amber-300 shrink-0" strokeWidth={1.5} />
                <span>{currency === 'VND' ? '🇻🇳 VND' : '🇺🇸 USD'}</span>
                <span className="text-[10px] text-amber-200/80 font-mono font-normal hidden xl:inline">
                  (1$ ≈ {formattedRate}₫)
                </span>
              </button>

              {onRefreshRate && (
                <button
                  type="button"
                  onClick={onRefreshRate}
                  disabled={isRefreshing}
                  className="p-1 text-stone-400 hover:text-amber-300 rounded transition-colors disabled:opacity-50"
                  title="Cập nhật tỷ giá Open Exchange API"
                >
                  <RotateCw
                    className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-amber-300' : ''}`}
                    strokeWidth={1.5}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER DESKTOP & MOBILE
          - Khi scroll: Header mỏng hơn bản gốc 20% (h-14 thay vì h-18)
          - Whitespace thoáng đãng, loại bỏ các đường viền đen dày
      */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-13 sm:h-15' : 'h-16 sm:h-20'
          }`}
        >
          {/* =======================
              DESKTOP VIEW (lg+)
             ======================= */}
          
          {/* DESKTOP LOGO (Bên Trái - Sắc nét, chiều cao vừa phải) */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => {
                onSelectPartner('all');
                onScrollToSection('san-pham');
              }}
              className="cursor-pointer select-none text-left focus:outline-hidden group"
              title="CHÚT CHÍU CO.,LTD - Nông Sản & Đặc Sản Cao Cấp"
            >
              <ChutChiuLogo
                size={isScrolled ? 'sm' : 'md'}
                className="transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </button>
          </div>

          {/* DESKTOP NAVIGATION MENU (Nằm ở GIỮA: [Sản phẩm, Danh mục, Nhà cung cấp, Chính sách, Tin tức]) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 1. Sản Phẩm */}
            <button
              type="button"
              onClick={() => {
                onSelectPartner('all');
                onScrollToSection('san-pham');
              }}
              className="px-3 py-2 rounded-xl text-[13px] font-heading font-semibold text-stone-100 hover:text-amber-300 hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              Sản Phẩm
            </button>

            {/* 2. Danh Mục (Dropdown) */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setCategoryDropdownOpen(!categoryDropdownOpen);
                  setPartnerDropdownOpen(false);
                }}
                className="px-3 py-2 rounded-xl text-[13px] font-heading font-semibold text-stone-100 hover:text-amber-300 hover:bg-white/[0.05] transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Danh Mục</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                    categoryDropdownOpen ? 'rotate-180 text-amber-300' : ''
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-64 p-2 bg-[#072617] rounded-2xl shadow-2xl border border-white/10 text-xs space-y-1 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10.5px] font-bold text-amber-400 uppercase tracking-wider border-b border-white/10 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Danh Mục Nông Đặc Sản</span>
                  </div>
                  {categoriesList.map((cat, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onSelectPartner(cat.partnerId);
                        setCategoryDropdownOpen(false);
                        onScrollToSection('san-pham');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs text-stone-200 hover:text-amber-300 hover:bg-white/[0.08] transition-colors cursor-pointer font-medium"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Nhà Cung Cấp (Dropdown) */}
            <div className="relative" ref={partnerMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setPartnerDropdownOpen(!partnerDropdownOpen);
                  setCategoryDropdownOpen(false);
                }}
                className="px-3 py-2 rounded-xl text-[13px] font-heading font-semibold text-stone-100 hover:text-amber-300 hover:bg-white/[0.05] transition-all flex items-center gap-1 cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-[#d4af37]" strokeWidth={1.5} />
                <span>Nhà Cung Cấp</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
                    partnerDropdownOpen ? 'rotate-180 text-amber-300' : ''
                  }`}
                  strokeWidth={1.5}
                />
              </button>

              {partnerDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-72 p-2 bg-[#072617] rounded-2xl shadow-2xl border border-white/10 text-xs space-y-1 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10.5px] font-bold text-amber-400 uppercase tracking-wider border-b border-white/10">
                    5 Đối Tác Chiến Lược &amp; Nguồn Cung
                  </div>
                  {partnersList.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        onSelectPartner(p.id);
                        setPartnerDropdownOpen(false);
                        onScrollToSection('san-pham');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer ${
                        selectedPartner === p.id
                          ? 'bg-[#d4af37] text-stone-950 font-bold'
                          : 'text-stone-200 hover:bg-white/[0.08] hover:text-amber-300 font-medium'
                      }`}
                    >
                      {p.avatar && (
                        <div className="w-5 h-5 rounded bg-white p-0.5 shrink-0 overflow-hidden">
                          <img
                            src={p.avatar}
                            alt={p.label}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1 truncate">
                        <div className="truncate">{p.label}</div>
                        <div className={`text-[10px] truncate ${selectedPartner === p.id ? 'text-stone-800' : 'text-stone-400'}`}>
                          {p.specialty}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Chính Sách */}
            <button
              type="button"
              onClick={() => onScrollToSection('chinh-sach-si')}
              className="px-3 py-2 rounded-xl text-[13px] font-heading font-semibold text-stone-100 hover:text-amber-300 hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              Chính Sách
            </button>

            {/* 5. Tin Tức */}
            <button
              type="button"
              onClick={() => onScrollToSection('hanh-trinh-doi-tac')}
              className="px-3 py-2 rounded-xl text-[13px] font-heading font-semibold text-stone-100 hover:text-amber-300 hover:bg-white/[0.05] transition-all cursor-pointer"
            >
              Tin Tức
            </button>
          </nav>

          {/* DESKTOP ICONS BÊN PHẢI: [Search, Cart] */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Search Button */}
            <button
              type="button"
              onClick={handleSearchFocus}
              className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-stone-200 hover:text-amber-300 border border-white/10 transition-all cursor-pointer"
              title="Tìm kiếm sản phẩm nông sản"
              aria-label="Tìm kiếm sản phẩm"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Cart Button */}
            <button
              id="desktop-header-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c69f2e] to-[#b89228] hover:brightness-110 text-stone-950 font-heading font-bold text-xs shadow-md transition-all cursor-pointer group"
              aria-label="Mở giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4 shrink-0 text-stone-950 group-hover:scale-105 transition-transform" strokeWidth={1.8} />
              <span>Giỏ Hàng</span>
              {cartCount > 0 && (
                <span className="min-w-[19px] h-[19px] px-1 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* =========================================================
              MOBILE & TABLET VIEW (< lg):
              Bố cục yêu cầu: [MENU] [LOGO] [SEARCH] [CART]
             ========================================================= */}
          <div className="flex lg:hidden items-center justify-between w-full gap-2 select-none">
            {/* [MENU] Vị trí 1: Nút mở Mobile Side Panel (Touch target >= 44px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/[0.06] text-amber-300 hover:text-white hover:bg-white/[0.12] border border-white/10 transition-colors"
              aria-label="Mở menu điều hướng"
            >
              <Menu className="w-5 h-5 text-amber-300" strokeWidth={1.5} />
            </button>

            {/* [LOGO] Vị trí 2: Logo căn giữa cân đối */}
            <div
              onClick={() => {
                onSelectPartner('all');
                onScrollToSection('san-pham');
              }}
              className="cursor-pointer shrink-0 flex items-center justify-center py-1"
              title="CHÚT CHÍU CO.,LTD"
            >
              <ChutChiuLogo size="sm" />
            </div>

            {/* Cụm bên phải: [SEARCH] + [CART] */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* [SEARCH] Vị trí 3: Biểu tượng tìm kiếm */}
              <button
                type="button"
                onClick={handleSearchFocus}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/[0.06] text-stone-200 hover:text-amber-300 border border-white/10 transition-colors"
                aria-label="Tìm kiếm sản phẩm"
                title="Tìm kiếm sản phẩm"
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
              </button>

              {/* [CART] Vị trí 4: Biểu tượng Giỏ hàng */}
              <button
                id="mobile-header-cart-btn"
                type="button"
                onClick={onOpenCart}
                className="relative min-w-[42px] min-h-[40px] px-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-stone-950 font-bold text-xs shadow-md active:scale-95 transition-all"
                aria-label="Mở giỏ hàng"
              >
                <ShoppingBag className="w-4 h-4 text-stone-950" strokeWidth={1.8} />
                {cartCount > 0 ? (
                  <span className="min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border border-white animate-pulse">
                    {cartCount}
                  </span>
                ) : (
                  <span className="hidden xs:inline text-[11px] font-heading font-bold text-stone-950">
                    Giỏ
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE MENU SLIDE PANEL (SIDE DRAWER)
          - Trượt từ cạnh màn hình sang
          - Phân nhóm navigation rõ ràng
          - Nút đóng (X) to dễ chạm (min-w-[44px] min-h-[44px])
         ========================================================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop mờ tối */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Side Drawer Panel */}
          <div className="relative w-80 max-w-[85vw] bg-[#072617] text-white h-full shadow-2xl border-r border-[#d4af37]/30 flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Top Header: Logo + Nút đóng (X) to dễ chạm */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#051c0f]">
              <div className="flex items-center gap-2">
                <ChutChiuLogo size="sm" />
                <div className="text-[11px] font-heading font-bold text-[#d4af37] tracking-wider uppercase">
                  B2B Navigation
                </div>
              </div>

              {/* Nút đóng (X) to dễ chạm */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-stone-200 hover:text-white transition-colors cursor-pointer"
                aria-label="Đóng menu"
              >
                <X className="w-5 h-5 text-amber-300" strokeWidth={2} />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
              {/* NHÓM 1: ĐIỀU HƯỚNG CHÍNH */}
              <div className="space-y-1">
                <div className="text-[11px] font-heading font-bold text-amber-400 uppercase tracking-wider px-2 pb-1">
                  Menu Chính
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelectPartner('all');
                    setMobileMenuOpen(false);
                    onScrollToSection('san-pham');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-heading font-semibold text-stone-100 hover:bg-white/[0.08] hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>📦 Tất Cả Sản Phẩm</span>
                  <span className="text-[10px] text-amber-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    62+ Mã
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection('san-pham');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-heading font-semibold text-stone-100 hover:bg-white/[0.08] hover:text-amber-300 transition-colors flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-[#d4af37]" />
                  <span>Danh Mục Nông Đặc Sản</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection('chinh-sach-si');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-heading font-semibold text-stone-100 hover:bg-white/[0.08] hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-[#d4af37]" />
                    <span>Chính Sách 4 Mức Giá Sỉ</span>
                  </span>
                  <span className="text-[10px] text-amber-300 font-mono">B2B</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection('goc-cong-thuc');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-heading font-semibold text-stone-100 hover:bg-white/[0.08] hover:text-amber-300 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Góc Công Thức Pha Chế (50+)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection('hanh-trinh-doi-tac');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-heading font-semibold text-stone-100 hover:bg-white/[0.08] hover:text-amber-300 transition-colors flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  <span>Tin Tức &amp; Lễ Ký Kết Đối Tác</span>
                </button>
              </div>

              {/* NHÓM 2: 5 ĐỐI TÁC CHIẾN LƯỢC */}
              <div className="space-y-1.5 pt-4 border-t border-white/10">
                <div className="text-[11px] font-heading font-bold text-amber-400 uppercase tracking-wider px-2 pb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Nhà Cung Cấp Chiến Lược</span>
                </div>

                <div className="space-y-1">
                  {partnersList.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        onSelectPartner(p.id);
                        setMobileMenuOpen(false);
                        onScrollToSection('san-pham');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center gap-2.5 ${
                        selectedPartner === p.id
                          ? 'bg-[#d4af37] text-stone-950 font-bold'
                          : 'text-stone-200 hover:bg-white/[0.08] hover:text-amber-300'
                      }`}
                    >
                      {p.avatar && (
                        <div className="w-5 h-5 rounded bg-white p-0.5 shrink-0 overflow-hidden">
                          <img
                            src={p.avatar}
                            alt={p.label}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1 truncate">
                        <div className="font-semibold truncate">{p.label}</div>
                        <div className={`text-[10px] truncate ${selectedPartner === p.id ? 'text-stone-800' : 'text-stone-400'}`}>
                          {p.specialty}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* NHÓM 3: TIỆN ÍCH & HỖ TRỢ */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="text-[11px] font-heading font-bold text-amber-400 uppercase tracking-wider px-2">
                  Tiện Ích &amp; Hỗ Trợ
                </div>

                {/* Chuyển đổi tiền tệ */}
                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-stone-300">Đơn vị tiền tệ:</span>
                  <button
                    type="button"
                    onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950 text-amber-300 font-bold text-xs border border-amber-400/40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-300" />
                    <span>{currency === 'VND' ? '🇻🇳 VND' : '🇺🇸 USD'}</span>
                  </button>
                </div>

                {/* Hotlines */}
                <div className="space-y-1.5 text-xs text-stone-300">
                  <a
                    href="tel:0961525450"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between transition-colors block"
                  >
                    <span className="text-stone-400">Hotline B2B 1:</span>
                    <span className="text-amber-300 font-bold font-mono">0961 525 450</span>
                  </a>
                  <a
                    href="tel:0938797904"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between transition-colors block"
                  >
                    <span className="text-stone-400">Hotline B2B 2:</span>
                    <span className="text-amber-300 font-bold font-mono">0938 7979 04</span>
                  </a>
                </div>

                {/* Admin Portal Link */}
                {onOpenAdmin && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full text-center py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-stone-400 hover:text-amber-300 text-xs font-mono border border-white/10 transition-colors"
                  >
                    🔒 Quản Trị Đơn Hàng (/admin)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
