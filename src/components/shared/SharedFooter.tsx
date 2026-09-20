import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  FileCheck,
  ShieldCheck,
  Globe,
  ArrowRight,
  Check,
  Building2,
  ChevronDown,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { PartnerId, ExchangeRateInfo } from '../../types';
import { ChutChiuLogo } from '../ChutChiuLogo';
import { PRODUCTS } from '../../data/products';

export interface SharedFooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  rateInfo?: ExchangeRateInfo;
}

export const SharedFooter: React.FC<SharedFooterProps> = ({
  onSelectPartner,
  onScrollToSection,
  onOpenAdmin,
  rateInfo,
}) => {
  const formattedRate = rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964';
  const [legalModalOpen, setLegalModalOpen] = useState<'terms' | 'privacy' | null>(null);

  // Mobile Accordion state for columns 2, 3, 4
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    products: false,
    support: false,
    contact: false,
  });

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Dynamic distinct categories from actual products database
  const dynamicCategories: { name: string; partnerId?: PartnerId; note: string }[] = [
    { name: 'Matcha & Trà Cascara Cầu Đất', partnerId: 'viet-thao-nhien', note: 'Việt Thảo Nhiên' },
    { name: 'Nước Mía Tuyết IQF -40°C', partnerId: 'vua-mia', note: 'Vua Mía' },
    { name: 'Cà Phê Viên Sấy Thăng Hoa', partnerId: 'non-la-aodai', note: 'Nón Lá & AODAI' },
    { name: 'Sâm Dây & Tam Thất Ngọc Linh', partnerId: 'thao-duoc-dato', note: 'Thảo Dược DATO' },
    { name: 'Chà Bông & Khô Bò Thượng Hạng', partnerId: 'phu-nha', note: 'Đặc Sản Phú Nhã' },
    { name: 'Tất Cả 62+ Nông Đặc Sản Xuất Khẩu', note: 'Đạt chuẩn OCOP & HACCP' },
  ];

  // Existing real policies and links
  const supportPolicies = [
    { label: 'Chính sách 4 mức giá sỉ (Thùng & KG)', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Giao hàng hỏa tốc 2H & Toàn quốc', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Xuất hóa đơn điện tử VAT 100%', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Chính sách đổi trả 100% trong 24h', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Góc công thức pha chế F&B độc quyền', action: () => onScrollToSection('goc-cong-thuc') },
    { label: 'Hành trình ký kết & Hợp tác chiến lược', action: () => onScrollToSection('hanh-trinh-doi-tac') },
  ];

  return (
    <footer id="main-app-footer" className="w-full relative font-body bg-white border-t border-stone-200/80">
      
      {/* =========================================================================
          1. KHỐI CTA BUSINESS (CHỐT SALE SỈ):
          - Nằm ngay trên Footer
          - Nền màu kem nhạt hoặc xanh cực nhạt (#F4F7F4)
          - Tiêu đề: 'TÌM NGUỒN HÀNG NÔNG SẢN & ĐẶC SẢN ỔN ĐỊNH?'
          - Câu dẫn: 'Kết nối cùng CHUTCHIU để nhận chính sách phân phối tốt nhất'
          - Nút [ LIÊN HỆ HỢP TÁC ] màu Xanh đậm, chữ Gold, bo góc nhẹ 4px
         ========================================================================= */}
      <section className="bg-[#F4F7F4] border-b border-stone-200/70 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Nội dung mời hợp tác */}
          <div className="space-y-1.5 max-w-2xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-black text-[#143A24] tracking-tight leading-snug">
              TÌM NGUỒN HÀNG NÔNG SẢN &amp; ĐẶC SẢN ỔN ĐỊNH?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
              Kết nối cùng CHUTCHIU để nhận chính sách phân phối tốt nhất. Cung ứng ổn định nguồn hàng chuẩn hóa xuất khẩu, hóa đơn VAT đầy đủ và chiết khấu lũy tiến 4 mức giá sỉ cho các chuỗi F&amp;B và nhà phân phối toàn quốc.
            </p>
          </div>

          {/* Nút [ LIÊN HỆ HỢP TÁC ] (Dark Green, chữ Gold, bo góc nhẹ 4-6px) */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://zalo.me/0961525450"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-[5px] bg-[#143A24] hover:bg-[#0d2718] text-[#D4AF37] font-heading font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xs transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>LIÊN HỆ HỢP TÁC</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="tel:0961525450"
              className="px-4 py-3 rounded-[5px] bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-heading font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#143A24]" />
              <span className="font-mono">0961 525 450</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN FOOTER (DÀN HÀNG 4 CỘT TRÊN DESKTOP, ACCORDION TRÊN MOBILE):
          - Desktop (md+): 4 cột dàn ngang cân đối
          - Mobile (< md): Cột 1 giữ nguyên, Cột 2, 3, 4 là Accordion mượt mà
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 items-start">
          
          {/* =====================================================================
              CỘT 1: Logo nhỏ + Đoạn giới thiệu ngắn về tầm nhìn Chút Chíu
             ===================================================================== */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <ChutChiuLogo frameless size="md" />
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Công ty TNHH TMDV Chút Chíu là hệ thống phân phối chiến lược Nông sản &amp; Đặc sản tuyển chọn từ các vùng nguyên liệu danh tiếng. Kết nối trực tiếp chuỗi cung ứng chuẩn xuất khẩu tới khách hàng B2B và người tiêu dùng.
            </p>

            <div className="space-y-1.5 text-xs text-stone-600 pt-1 font-normal">
              <div className="flex items-start gap-2">
                <FileCheck className="w-3.5 h-3.5 text-[#143A24] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-800 font-semibold">MST:</strong>{' '}
                  <span className="font-mono text-[#143A24] font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#143A24] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-800 font-semibold">Kho Q.1:</strong> 44 Trần Đình Xu, P. Cô Giang, Q.1, TP.HCM
                </span>
              </div>

              <div className="flex items-center gap-2 text-emerald-800 font-medium pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Tiêu chuẩn HACCP • ISO 22000 • VietGAP</span>
              </div>
            </div>
          </div>

          {/* =====================================================================
              CỘT 2: DANH MỤC SẢN PHẨM (Dữ liệu động từ Database PRODUCTS)
              - Mobile: Accordion
              - Desktop: Dàn cột tĩnh
             ===================================================================== */}
          <div className="border-t md:border-t-0 border-stone-200/80 pt-3 md:pt-0">
            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => toggleAccordion('products')}
              className="w-full flex md:hidden items-center justify-between py-2 text-xs font-heading font-bold uppercase tracking-wider text-[#143A24] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#143A24]" />
                <span>Danh Mục Sản Phẩm</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openAccordions.products ? 'rotate-180 text-[#D4AF37]' : 'text-stone-400'
                }`}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden md:flex items-center gap-2 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#143A24] pb-3.5">
              <Building2 className="w-4 h-4 text-[#143A24] shrink-0" />
              <span>Danh Mục Sản Phẩm</span>
            </h4>

            {/* Content list */}
            <div
              className={`space-y-2 text-xs text-stone-600 transition-all duration-200 ${
                openAccordions.products ? 'block pt-2 pb-3' : 'hidden md:block'
              }`}
            >
              {dynamicCategories.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (cat.partnerId) {
                      onSelectPartner(cat.partnerId);
                    } else {
                      onSelectPartner('all');
                    }
                    onScrollToSection('san-pham');
                  }}
                  className="w-full text-left py-1 group flex items-start gap-2 hover:text-[#143A24] transition-colors cursor-pointer"
                >
                  <span className="text-[#D4AF37] font-bold text-[11px] mt-0.5">›</span>
                  <div>
                    <span className="text-stone-800 group-hover:text-[#143A24] font-medium transition-colors block">
                      {cat.name}
                    </span>
                    <span className="text-[10px] text-stone-500 font-normal">
                      {cat.note}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* =====================================================================
              CỘT 3: HỖ TRỢ (Chính sách sỉ, Giao hàng, Đổi trả hiện có)
              - Mobile: Accordion
              - Desktop: Dàn cột tĩnh
             ===================================================================== */}
          <div className="border-t md:border-t-0 border-stone-200/80 pt-3 md:pt-0">
            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => toggleAccordion('support')}
              className="w-full flex md:hidden items-center justify-between py-2 text-xs font-heading font-bold uppercase tracking-wider text-[#143A24] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#143A24]" />
                <span>Chính Sách &amp; Hỗ Trợ</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openAccordions.support ? 'rotate-180 text-[#D4AF37]' : 'text-stone-400'
                }`}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden md:flex items-center gap-2 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#143A24] pb-3.5">
              <ShieldCheck className="w-4 h-4 text-[#143A24] shrink-0" />
              <span>Chính Sách &amp; Hỗ Trợ</span>
            </h4>

            {/* Content list */}
            <ul
              className={`space-y-2 text-xs text-stone-600 transition-all duration-200 ${
                openAccordions.support ? 'block pt-2 pb-3' : 'hidden md:block'
              }`}
            >
              {supportPolicies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="flex items-center gap-2 text-left hover:text-[#143A24] transition-colors cursor-pointer w-full group py-0.5"
                  >
                    <span className="text-emerald-700 group-hover:translate-x-0.5 transition-transform text-[11px]">›</span>
                    <span className="text-stone-700 group-hover:text-[#143A24] font-normal transition-colors">
                      {p.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================================
              CỘT 4: LIÊN HỆ & THANH TOÁN (Hotline, Email, Kho Q.1, VietQR)
              - Mobile: Accordion
              - Desktop: Dàn cột tĩnh
             ===================================================================== */}
          <div className="border-t md:border-t-0 border-stone-200/80 pt-3 md:pt-0">
            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => toggleAccordion('contact')}
              className="w-full flex md:hidden items-center justify-between py-2 text-xs font-heading font-bold uppercase tracking-wider text-[#143A24] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#143A24]" />
                <span>Liên Hệ &amp; Thanh Toán</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openAccordions.contact ? 'rotate-180 text-[#D4AF37]' : 'text-stone-400'
                }`}
              />
            </button>

            {/* Desktop Header */}
            <h4 className="hidden md:flex items-center gap-2 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#143A24] pb-3.5">
              <Phone className="w-4 h-4 text-[#143A24] shrink-0" />
              <span>Liên Hệ &amp; Thanh Toán</span>
            </h4>

            {/* Content */}
            <div
              className={`space-y-3 text-xs text-stone-600 transition-all duration-200 ${
                openAccordions.contact ? 'block pt-2 pb-3' : 'hidden md:block'
              }`}
            >
              {/* Contact items */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#143A24] shrink-0" />
                  <span>
                    <strong className="text-stone-800 font-medium">Hotline B2B:</strong>{' '}
                    <a href="tel:0961525450" className="text-[#143A24] font-bold font-mono hover:underline">
                      0961 525 450
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#143A24] shrink-0" />
                  <span>
                    <strong className="text-stone-800 font-medium">Email:</strong>{' '}
                    <a href="mailto:chutchiucompany@gmail.com" className="text-stone-700 hover:text-[#143A24] font-mono hover:underline">
                      chutchiucompany@gmail.com
                    </a>
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#143A24] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-800 font-medium">Địa chỉ:</strong> 44 Trần Đình Xu, P. Cô Giang, Q.1, TP.HCM
                  </span>
                </div>
              </div>

              {/* VietQR Payment Card (Nguyễn Đức Trung - Techcombank) */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-16 h-16 shrink-0 bg-white p-1 rounded-lg border border-stone-200 flex items-center justify-center">
                    <img
                      src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                      alt="VietQR Techcombank Nguyễn Đức Trung"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 space-y-0.5 text-xs">
                    <div className="font-bold text-[#143A24] flex items-center gap-1.5 whitespace-nowrap">
                      <span>Techcombank</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-100 text-emerald-800 font-medium">24/7</span>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap text-[11px]">
                      <span className="text-stone-500">STK:</span>
                      <span className="font-mono text-[#143A24] font-bold">19039080129011</span>
                    </div>
                    <div className="text-[10px] text-stone-700 uppercase font-semibold whitespace-nowrap">
                      NGUYEN DUC TRUNG
                    </div>
                  </div>
                </div>

                {/* Live USD Rate */}
                <div className="pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[10.5px] text-stone-600">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#143A24]" />
                    <span>Tỷ giá USD:</span>
                    <span className="font-mono font-bold text-[#143A24]">1$ ≈ {formattedRate}₫</span>
                  </div>
                  <span className="text-[9px] text-stone-400 font-mono">(Live API)</span>
                </div>
              </div>

              {/* Zalo / FB buttons */}
              <div className="flex items-center gap-2 pt-0.5">
                <a
                  href="https://zalo.me/0961525450"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-[#143A24] hover:text-white text-stone-700 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Zalo OA</span>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 rounded-lg bg-stone-100 hover:bg-[#143A24] hover:text-white text-stone-700 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. SUB FOOTER:
          - Dòng kẻ mảnh phía trên
          - Bên trái: Copyright hiện có
          - Bên phải: Điều khoản bảo mật & Quản trị đơn hàng nằm trên một hàng ngang mảnh dưới cùng
          - VÙNG ĐỆM AN TOÀN ĐÁY (PADDING-BOTTOM: 220PX)
         ========================================================================= */}
      <div
        className="border-t border-stone-200/80 px-4 sm:px-6 lg:px-8 text-[11px] text-stone-500 max-w-7xl mx-auto"
        style={{ paddingTop: '16px', paddingBottom: '220px' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Copyright bên trái */}
          <div>
            © 2024 - 2026 <strong className="font-heading font-bold text-stone-800">CHUTCHIU CO.,LTD</strong>. MST: <span className="font-mono text-[#143A24] font-medium">0319153593</span>.
          </div>

          {/* Các link pháp lý bên phải */}
          <div className="flex items-center flex-wrap justify-center gap-4 text-stone-600">
            <button
              type="button"
              onClick={() => setLegalModalOpen('terms')}
              className="hover:text-[#143A24] transition-colors cursor-pointer"
            >
              Điều khoản sử dụng
            </button>
            <span className="text-stone-300">•</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-[#143A24] transition-colors cursor-pointer"
            >
              Chính sách bảo mật
            </button>

            {onOpenAdmin && (
              <>
                <span className="text-stone-300">•</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-[#143A24] font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  title="Cổng quản trị đơn hàng"
                >
                  <span>🔒 Quản trị đơn hàng (/admin)</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal Pháp Lý */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white text-stone-900 rounded-2xl max-w-lg w-full p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-heading font-bold text-base text-[#143A24]">
                {legalModalOpen === 'terms' ? 'Điều Khoản Sử Dụng - CHUTCHIU CO.,LTD' : 'Chính Sách Bảo Mật - CHUTCHIU CO.,LTD'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModalOpen(null)}
                className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-stone-600 space-y-2.5 max-h-72 overflow-y-auto leading-relaxed pr-1">
              {legalModalOpen === 'terms' ? (
                <>
                  <p>1. <strong>Tư cách pháp nhân:</strong> Toàn bộ sản phẩm phân phối trên hệ thống do Công ty TNHH TMDV Chút Chíu (MST: 0319153593) quản lý và vận hành theo tiêu chuẩn B2B/B2C Việt Nam.</p>
                  <p>2. <strong>Chính sách giá sỉ:</strong> Bảng 4 mức giá sỉ (Lẻ, Sỉ 1, Sỉ 2, Sỉ 3) áp dụng theo số lượng đóng gói thùng hoặc kg thực tế được hệ thống tự động tính toán minh bạch.</p>
                  <p>3. <strong>Hóa đơn VAT:</strong> Hóa đơn điện tử được xuất theo thông tin doanh nghiệp cung cấp khi hoàn tất chuyển khoản đơn hàng.</p>
                </>
              ) : (
                <>
                  <p>1. <strong>Bảo mật thông tin:</strong> CHUTCHIU CO.,LTD cam kết bảo vệ 100% dữ liệu thông tin cá nhân và thông tin đặt hàng của đối tác và khách hàng.</p>
                  <p>2. <strong>Mục đích thu thập:</strong> Chỉ sử dụng số điện thoại và địa chỉ giao nhận để điều phối vận chuyển đơn hàng hỏa tốc và hỗ trợ sau bán hàng.</p>
                  <p>3. <strong>Không chia sẻ bên thứ ba:</strong> Tuyệt đối không cung cấp dữ liệu khách hàng cho bất kỳ tổ chức hay cá nhân nào khác ngoài đơn vị vận chuyển được chỉ định.</p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalOpen(null)}
                className="px-4 py-2 rounded-[5px] bg-[#143A24] text-white font-heading font-bold text-xs hover:bg-[#0d2718] transition-all cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
