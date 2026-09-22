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

  // Tablet & Mobile Accordion state for columns 2 & 3
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    support: false,
    contact: false,
  });

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Existing real policies and links
  const supportPolicies = [
    { label: 'Chính sách 4 mức giá sỉ (Thùng & KG)', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Giao hàng hỏa tốc 2H & Toàn quốc', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Xuất hóa đơn điện tử VAT 100%', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Chính sách đổi trả 100% trong 24h', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Góc công thức pha chế F&B độc quyền', action: () => onScrollToSection('goc-cong-thuc') },
    { label: 'Năng lực cung ứng & Cam kết chất lượng', action: () => onScrollToSection('nang-luc-cung-ung') },
  ];

  return (
    <footer id="main-app-footer" className="w-full relative font-body bg-white border-t border-stone-200/80">
      
      {/* =========================================================================
          1. BUSINESS CTA SECTION (V118: CĂN GIỮA, NÉN GỌN, XẾP CHỒNG NÚT TRÊN MOBILE):
          - Giảm 50% khoảng trống padding-top, ôm sát nội dung
          - Căn giữa toàn bộ Tiêu đề, Mô tả và Nút bấm trên Mobile
          - Nút [ LIÊN HỆ HỢP TÁC ] full-width, to bản, xanh đậm chữ Gold
          - Nút Số điện thoại xếp dọc phía dưới, viền mảnh tối giản
         ========================================================================= */}
      <section className="bg-[#F4F7F4] border-b border-stone-200/70 pt-2 pb-2.5 sm:py-4 px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4 text-center md:text-left">
          
          {/* Nội dung mời hợp tác - Căn giữa trên Mobile, căn trái trên Desktop */}
          <div className="space-y-1 max-w-2xl text-center md:text-left mx-auto md:mx-0 w-full md:w-auto">
            <h3 className="text-xs sm:text-base md:text-xl font-heading font-black text-[#143A24] tracking-tight leading-snug text-center md:text-left">
              TÌM NGUỒN HÀNG NÔNG SẢN &amp; ĐẶC SẢN ỔN ĐỊNH?
            </h3>
            <p className="text-[11px] sm:text-xs text-stone-600 font-normal leading-snug sm:leading-relaxed text-center md:text-left">
              Kết nối cùng CHUTCHIU để nhận chính sách phân phối tốt nhất. Cung ứng ổn định nguồn hàng chuẩn hóa xuất khẩu, hóa đơn VAT đầy đủ và chiết khấu lũy tiến 4 mức giá sỉ cho đối tác F&amp;B toàn quốc.
            </p>
          </div>

          {/* Nút bấm (V118: Xếp chồng dọc trên Mobile, nút chính Full-width, nút điện thoại viền mảnh tinh giản) */}
          <div className="shrink-0 flex flex-col items-center gap-2 w-full md:w-auto mt-1 sm:mt-0">
            <a
              href="https://zalo.me/0961525450"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Liên hệ hợp tác sỉ qua Zalo"
              className="w-full md:w-auto px-5 py-2.5 sm:py-2.5 rounded-xl bg-[#143A24] hover:bg-[#0d2718] text-[#D4AF37] font-heading font-black text-xs sm:text-[13px] tracking-wider uppercase shadow-sm transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
            >
              <span>LIÊN HỆ HỢP TÁC</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </a>

            <a
              href="tel:0961525450"
              aria-label="Gọi hotline đối tác 0961 525 450"
              className="w-full md:w-auto py-1.5 px-3 rounded-lg border border-stone-300/80 bg-white/80 hover:bg-white text-stone-700 hover:text-[#143A24] font-heading text-[11px] sm:text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
            >
              <Phone className="w-3 h-3 text-[#143A24]" strokeWidth={1.5} />
              <span>Hotline đối tác:</span>
              <span className="font-mono font-bold text-stone-800">0961 525 450</span>
            </a>
          </div>
        </div>
      </section>

      {/* DÒNG CAM KẾT CHỨNG TỪ & PHÁP LÝ TẠI CHÂN TRANG */}
      <div className="bg-emerald-50/70 border-b border-emerald-200/60 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-[11px] sm:text-xs text-emerald-950 font-medium leading-relaxed">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" strokeWidth={2} />
          <span>
            <strong className="text-emerald-900 font-bold uppercase">CAM KẾT PHÁP LÝ &amp; CHẤT LƯỢNG:</strong> Mọi sản phẩm đều được CHUTCHIU CO.,LTD cam kết đầy đủ chứng từ, hóa đơn VAT và truy xuất nguồn gốc minh bạch.
          </span>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN FOOTER (3 NHÓM - CĂN LỀ TRÁI THẲNG HÀNG TĂM TẮP TRÊN MOBILE/TABLET):
          - Desktop (lg+): 3 cột dàn ngang cân đối [1. CHUTCHIU] [2. HỖ TRỢ] [3. LIÊN HỆ]
          - Tablet & Mobile (< lg): Toàn bộ Logo, mô tả và 2 khối accordion căn lề trái thẳng hàng
          - Đồng bộ nhịp khoảng cách mt-3 pt-3 liền mạch, chuyên nghiệp
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-10 items-start">
          
          {/* =====================================================================
              NHÓM 1: CHUTCHIU (Logo + Mô tả, MST, Kho Q.1, Tiêu chuẩn)
              Căn lề trái thẳng tắp với các khối Accordion bên dưới
             ===================================================================== */}
          <div className="text-left flex flex-col items-start w-full">
            <div className="flex items-center text-left">
              <ChutChiuLogo frameless size="sm" />
            </div>

            <p className="text-xs text-stone-600 leading-snug sm:leading-relaxed font-normal text-left mt-2 max-w-xl">
              Công ty TNHH TMDV Chút Chíu là hệ thống phân phối chiến lược Nông sản &amp; Đặc sản tuyển chọn, kết nối trực tiếp chuỗi cung ứng chuẩn xuất khẩu tới khách hàng B2B và người tiêu dùng.
            </p>

            {/* Thông tin doanh nghiệp đanh gọn - icon w-4 h-4 căn chuẩn cùng cột với accordion icon */}
            <div className="space-y-1.5 text-xs text-stone-600 font-normal leading-[1.25] text-left mt-2.5 w-full">
              <div className="flex items-center gap-2.5 leading-[1.25] text-left">
                <FileCheck className="w-4 h-4 text-[#143A24] shrink-0" strokeWidth={1.5} />
                <span className="leading-[1.25]">
                  <strong className="text-stone-800 font-semibold">MST:</strong>{' '}
                  <span className="font-mono text-[#143A24] font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-2.5 leading-[1.25] text-left">
                <MapPin className="w-4 h-4 text-[#143A24] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="leading-[1.25]">
                  <strong className="text-stone-800 font-semibold">Kho Q.1:</strong> 44 Trần Đình Xu, P. Cô Giang, Q.1, TP.HCM
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-emerald-800 font-medium text-[11px] sm:text-[11.5px] leading-[1.25] text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" strokeWidth={1.5} />
                <span className="leading-[1.25]">Tiêu chuẩn HACCP • ISO 22000 • VietGAP</span>
              </div>
            </div>
          </div>

          {/* =====================================================================
              NHÓM 2: HỖ TRỢ (Chính sách sỉ, giao hàng, đổi trả, VAT, công thức)
              - Desktop (lg+): Cột tĩnh
              - Tablet & Mobile (< lg): Accordion xổ xuống, căn lề trái thẳng hàng tăm tắp
             ===================================================================== */}
          <div className="mt-3 pt-3 border-t border-stone-200/70 lg:mt-0 lg:pt-0 lg:border-t-0 w-full text-left">
            {/* Tablet & Mobile Accordion Header (< lg) */}
            <button
              type="button"
              onClick={() => toggleAccordion('support')}
              className="w-full flex lg:hidden items-center justify-between py-1 text-xs font-heading font-bold uppercase tracking-wider text-[#143A24] cursor-pointer text-left"
              aria-label="Mở rộng mục Chính Sách & Hỗ Trợ"
              aria-expanded={openAccordions.support}
            >
              <span className="flex items-center gap-2.5 text-left">
                <ShieldCheck className="w-4 h-4 text-[#143A24] shrink-0" strokeWidth={1.5} />
                <span>Chính Sách &amp; Hỗ Trợ</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openAccordions.support ? 'rotate-180 text-[#D4AF37]' : 'text-stone-400'
                }`}
                strokeWidth={1.5}
              />
            </button>

            {/* Desktop Header (lg+) */}
            <h4 className="hidden lg:flex items-center gap-2.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#143A24] pb-2 text-left">
              <ShieldCheck className="w-4 h-4 text-[#143A24] shrink-0" strokeWidth={1.5} />
              <span>Chính Sách &amp; Hỗ Trợ</span>
            </h4>

            {/* Content list */}
            <ul
              className={`space-y-1 sm:space-y-1.5 text-xs text-stone-600 transition-all duration-200 text-left ${
                openAccordions.support ? 'block pt-2 pb-1 pl-6.5' : 'hidden lg:block'
              }`}
            >
              {supportPolicies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="flex items-center gap-2 text-left hover:text-[#143A24] transition-colors cursor-pointer w-full group py-0.5"
                    aria-label={`Đi tới ${p.label}`}
                  >
                    <span className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform text-[11px] font-bold">›</span>
                    <span className="text-stone-700 group-hover:text-[#143A24] font-normal transition-colors">
                      {p.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================================
              NHÓM 3: LIÊN HỆ & THANH TOÁN (Hotline, Email, VietQR, Tỷ giá USD)
              - Desktop (lg+): Cột tĩnh
              - Tablet & Mobile (< lg): Accordion xổ xuống, căn lề trái thẳng hàng tăm tắp
             ===================================================================== */}
          <div className="mt-3 pt-3 border-t border-stone-200/70 lg:mt-0 lg:pt-0 lg:border-t-0 w-full text-left">
            {/* Tablet & Mobile Accordion Header (< lg) */}
            <button
              type="button"
              onClick={() => toggleAccordion('contact')}
              className="w-full flex lg:hidden items-center justify-between py-1 text-xs font-heading font-bold uppercase tracking-wider text-[#143A24] cursor-pointer text-left"
              aria-label="Mở rộng mục Liên Hệ & Thanh Toán"
              aria-expanded={openAccordions.contact}
            >
              <span className="flex items-center gap-2.5 text-left">
                <Phone className="w-4 h-4 text-[#143A24] shrink-0" strokeWidth={1.5} />
                <span>Liên Hệ &amp; Thanh Toán</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  openAccordions.contact ? 'rotate-180 text-[#D4AF37]' : 'text-stone-400'
                }`}
                strokeWidth={1.5}
              />
            </button>

            {/* Desktop Header (lg+) */}
            <h4 className="hidden lg:flex items-center gap-2.5 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-[#143A24] pb-2 text-left">
              <Phone className="w-4 h-4 text-[#143A24] shrink-0" strokeWidth={1.5} />
              <span>Liên Hệ &amp; Thanh Toán</span>
            </h4>

            {/* Content */}
            <div
              className={`space-y-2 sm:space-y-2.5 text-xs text-stone-600 transition-all duration-200 text-left ${
                openAccordions.contact ? 'block pt-2 pb-1' : 'hidden lg:block'
              }`}
            >
              {/* Contact items - line-height: 1.2, icons w-4 h-4 căn thẳng tắp */}
              <div className="space-y-1.5 text-xs text-stone-600 leading-[1.25] text-left">
                <div className="flex items-center gap-2.5 leading-[1.25] text-left">
                  <Phone className="w-4 h-4 text-[#143A24] shrink-0" strokeWidth={1.5} />
                  <span className="leading-[1.25]">
                    <strong className="text-stone-800 font-medium">Hotline B2B:</strong>{' '}
                    <a href="tel:0961525450" className="text-[#143A24] font-bold font-mono hover:underline" aria-label="Gọi 0961 525 450">
                      0961 525 450
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2.5 leading-[1.25] text-left">
                  <Mail className="w-4 h-4 text-[#143A24] shrink-0" strokeWidth={1.5} />
                  <span className="leading-[1.25]">
                    <strong className="text-stone-800 font-medium">Email:</strong>{' '}
                    <a href="mailto:chutchiucompany@gmail.com" className="text-stone-700 hover:text-[#143A24] font-mono hover:underline" aria-label="Gửi email cho Chút Chíu">
                      chutchiucompany@gmail.com
                    </a>
                  </span>
                </div>

                <div className="flex items-start gap-2.5 leading-[1.25] text-left">
                  <MapPin className="w-4 h-4 text-[#143A24] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="leading-[1.25]">
                    <strong className="text-stone-800 font-medium">Địa chỉ:</strong> 44 Trần Đình Xu, P. Cô Giang, Q.1, TP.HCM
                  </span>
                </div>
              </div>

              {/* VietQR Payment Card (Nguyễn Đức Trung - Techcombank) */}
              <div className="p-2 sm:p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1 sm:space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 shrink-0 bg-white p-1 rounded-lg border border-stone-200 flex items-center justify-center">
                    <img
                      src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                      alt="VietQR Techcombank Nguyễn Đức Trung"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 space-y-0.5 text-xs text-left">
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
                <div className="pt-1 border-t border-stone-200/60 flex items-center justify-between text-[10.5px] text-stone-600">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#143A24]" strokeWidth={1.5} />
                    <span>Tỷ giá USD:</span>
                    <span className="font-mono font-bold text-[#143A24]">1$ ≈ {formattedRate}₫</span>
                  </div>
                  <span className="text-[9px] text-stone-400 font-mono">(Live API)</span>
                </div>
              </div>

              {/* Zalo / FB buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://zalo.me/0961525450"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nhắn tin Zalo OA Chút Chíu"
                  className="flex-1 py-1 px-2 rounded-lg bg-stone-100 hover:bg-[#143A24] hover:text-white text-stone-700 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-blue-600" strokeWidth={1.5} />
                  <span>Zalo OA</span>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Truy cập Facebook Chút Chíu"
                  className="flex-1 py-1 px-2 rounded-lg bg-stone-100 hover:bg-[#143A24] hover:text-white text-stone-700 text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. SUB FOOTER:
          - Dòng kẻ mảnh phân cách phía trên mt-3
          - Copyright bên trái
          - Link pháp lý và admin bên phải
          - VÙNG ĐỆM AN TOÀN ĐÁY: 60px Desktop (sm+) và 100px Mobile (< sm)
         ========================================================================= */}
      <div
        className="border-t border-stone-200/80 px-4 sm:px-6 lg:px-8 text-[11px] text-stone-500 max-w-7xl mx-auto mt-3 pt-3.5 pb-[100px] sm:pb-[60px]"
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
              aria-label="Xem điều khoản sử dụng"
            >
              Điều khoản sử dụng
            </button>
            <span className="text-stone-300">•</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-[#143A24] transition-colors cursor-pointer"
              aria-label="Xem chính sách bảo mật"
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
                  aria-label="Mở cổng quản trị đơn hàng"
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
