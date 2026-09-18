import React, { useState } from 'react';
import {
  Phone,
  ShoppingBag,
  Menu,
  X,
  Globe,
  Award,
  BookOpen,
  FileCheck2,
  Zap,
  Sparkles,
  ChevronDown,
  RotateCw,
  Search,
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

  const partnersList = [
    { id: 'all', label: 'Tất cả đối tác' },
    { id: 'viet-thao-nhien', label: '1. Việt Thảo Nhiên (Matcha & Cascara)' },
    { id: 'vua-mia', label: '2. Vua Mía (Nước Mía Tuyết IQF)' },
    { id: 'thao-duoc-dato', label: '3. Thảo Dược DATO (Sâm Ngọc Linh)' },
    { id: 'non-la-aodai', label: '4. Nón Lá & AODAI (Cà Phê Sấy Thăng Hoa)' },
    { id: 'phu-nha', label: '5. Đặc Sản Phú Nhã (Khô Bò & Chà Bông)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0b3b24] text-white border-b border-[#d4af37]/40 shadow-xl backdrop-blur-md">
      {/* Brand Blue & Green Decorative Top Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

      {/* Top Banner: B2B Alibaba Model & 2 Hotlines & Legal - Clean single line on Desktop/Tablet only */}
      <div className="hidden sm:block bg-[#072617] border-b border-emerald-900/60 px-3 sm:px-4 py-1 text-xs text-stone-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Mobile: Compact hotline; Desktop: Full title & address */}
          <div className="flex items-center gap-2 text-[11px] truncate">
            <span className="inline-flex items-center gap-1 font-bold text-amber-300 shrink-0">
              <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Hệ thống B2B & B2C Nông Sản Cao Cấp</span>
              <span className="sm:hidden">Chút Chíu B2B</span>
            </span>
            <span className="hidden md:inline text-stone-400">|</span>
            <span className="hidden md:inline text-stone-400 truncate">
              MST: 0319153593 • 44 Trần Đình Xu, Q.1, TP.HCM
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[11px] shrink-0">
            {/* Hotlines */}
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-stone-400 hidden xs:inline">Hotline:</span>
              <a
                href="tel:0961525450"
                className="text-amber-300 font-bold hover:underline"
              >
                0961 525 450
              </a>
              <span className="text-stone-500 hidden sm:inline">•</span>
              <a
                href="tel:0938797904"
                className="text-amber-300 font-bold hover:underline hidden sm:inline"
              >
                0938 7979 04
              </a>
            </div>

            {/* Currency Converter VND / USD with Dynamic Live Exchange Rate */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-emerald-800">
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-amber-300 shrink-0" />
                <button
                  id="currency-toggle-btn"
                  onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
                  className="px-1.5 sm:px-2 py-0.5 rounded bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-black text-[10px] sm:text-[11px] border border-amber-400/40 transition-colors flex items-center gap-1 shadow-2xs"
                  title={`Tỷ giá quy đổi: 1 USD = ${rateInfo?.rate.toLocaleString('vi-VN') || '26.125'} VND • Click để đổi tiền tệ`}
                >
                  <span>{currency === 'VND' ? '🇻🇳 VND' : '🇺🇸 USD'}</span>
                  <span className="text-[10px] text-amber-200/90 font-mono font-bold hidden lg:inline">
                    (1$ = {rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '26.125'}₫)
                  </span>
                </button>
              </div>

              {/* Live Rate Status Indicator */}
              {rateInfo && (
                <div className="hidden sm:flex items-center gap-1">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                      rateInfo.isLive
                        ? 'bg-emerald-800/80 text-emerald-300 border border-emerald-600/50'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        rateInfo.isLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span className="hidden md:inline">
                      {rateInfo.isLive ? 'Trực tiếp' : 'Dự phòng'}
                    </span>
                  </span>

                  {onRefreshRate && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRefreshRate();
                      }}
                      disabled={isRefreshing}
                      className="p-1 text-emerald-300 hover:text-amber-300 hover:bg-emerald-800 rounded transition-colors disabled:opacity-50"
                      title="Cập nhật tỷ giá mới nhất"
                    >
                      <RotateCw
                        className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-amber-300' : ''}`}
                      />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar: Exactly 1 row on mobile (Logo & Cart side-by-side) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18">
          {/* Official Brand Logo - Crisp, vibrant and responsive */}
          <div
            onClick={() => onScrollToSection('san-pham')}
            className="cursor-pointer select-none shrink-0"
            title="CHUTCHIU CO.,LTD"
          >
            <ChutChiuLogo
              size="md"
              className="py-0.5"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => {
                onSelectPartner('all');
                onScrollToSection('san-pham');
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold text-white hover:text-amber-300 hover:bg-emerald-900/50 transition-colors"
            >
              Tất Cả Sản Phẩm
            </button>

            {/* Partner Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPartnerDropdownOpen(!partnerDropdownOpen)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-amber-300 hover:bg-emerald-900/50 transition-colors flex items-center gap-1"
              >
                <span>Hệ Sinh Thái Đối Tác</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {partnerDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 p-2 bg-[#082a17] rounded-2xl shadow-2xl border border-emerald-800 text-xs space-y-1 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setPartnerDropdownOpen(false)}
                >
                  {partnersList.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectPartner(p.id as PartnerId | 'all');
                        setPartnerDropdownOpen(false);
                        onScrollToSection('san-pham');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        selectedPartner === p.id
                          ? 'bg-amber-400 text-stone-950'
                          : 'text-stone-200 hover:bg-emerald-900 hover:text-amber-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => onScrollToSection('goc-cong-thuc')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-white hover:text-amber-300 hover:bg-emerald-900/50 transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Góc Công Thức</span>
            </button>

            <button
              onClick={() => onScrollToSection('hanh-trinh-doi-tac')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-white hover:text-amber-300 hover:bg-emerald-900/50 transition-colors flex items-center gap-1"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Hành Trình Đối Tác & Lễ Ký Kết</span>
            </button>

            <button
              onClick={() => onScrollToSection('chinh-sach-si')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-white hover:text-amber-300 hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              Chính Sách 4 Mức Giá Sỉ
            </button>
          </nav>

          {/* Right Action: Cart & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile Currency Toggle */}
            <button
              id="mobile-currency-toggle-btn"
              onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
              className="sm:hidden px-2 py-1.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-amber-300 font-black text-[10px] border border-amber-400/40 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              title="Chuyển đổi VND / USD"
            >
              <span>{currency === 'VND' ? '🇻🇳 VND' : '🇺🇸 USD'}</span>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => {
                onScrollToSection('san-pham');
                setTimeout(() => {
                  const input = document.getElementById('catalog-search-input');
                  if (input) input.focus();
                }, 400);
              }}
              className="sm:hidden p-2 rounded-xl bg-emerald-900/60 text-amber-300 hover:text-white border border-emerald-800/80 transition-colors"
              aria-label="Tìm kiếm sản phẩm"
              title="Tìm kiếm sản phẩm"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cart Trigger */}
            <button
              id="navbar-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-stone-950 font-black text-xs shadow-md hover:brightness-110 transition-all"
              aria-label="Mở giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Giỏ Hàng</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-red-600 text-white rounded-full font-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-emerald-900 text-stone-200 hover:text-white"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-amber-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#082a17] border-t border-emerald-800 space-y-2 text-xs">
          <div className="font-bold text-amber-300 uppercase tracking-wider py-1 text-[11px]">
            Hệ Sinh Thái Đối Tác Chiến Lược:
          </div>
          <div className="grid grid-cols-1 gap-1">
            {partnersList.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  onSelectPartner(p.id as PartnerId | 'all');
                  setMobileMenuOpen(false);
                  onScrollToSection('san-pham');
                }}
                className={`text-left px-3 py-2 rounded-xl font-bold ${
                  selectedPartner === p.id
                    ? 'bg-amber-400 text-stone-950'
                    : 'bg-emerald-900/60 text-stone-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-emerald-800 flex items-center justify-between">
            <span className="text-stone-300 font-medium text-[11px]">Đơn vị tiền tệ:</span>
            <button
              onClick={() => onToggleCurrency(currency === 'VND' ? 'USD' : 'VND')}
              className="px-3 py-1.5 rounded-xl bg-emerald-900 text-amber-300 font-bold border border-amber-400/40 flex items-center gap-1.5 text-xs shadow-2xs cursor-pointer active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{currency === 'VND' ? '🇻🇳 VND (Đồng)' : '🇺🇸 USD (Đô la)'}</span>
              <span className="text-[10px] text-amber-200/90 font-mono">
                (1$ = {rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '26.125'}₫)
              </span>
            </button>
          </div>

          <div className="pt-2 border-t border-emerald-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection('goc-cong-thuc');
              }}
              className="p-2.5 rounded-xl bg-emerald-900 text-stone-200 font-bold text-center"
            >
              📖 Góc Công Thức
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection('hanh-trinh-doi-tac');
              }}
              className="p-2.5 rounded-xl bg-emerald-900 text-stone-200 font-bold text-center"
            >
              🤝 Hành Trình Đối Tác & Lễ Ký Kết
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
