import React, { useState, lazy, Suspense } from 'react';
import { PhoneCall, MessageCircle, X, ShieldCheck } from 'lucide-react';
import { PartnerId, ExchangeRateInfo, Language } from '../../types';
import { TRANSLATIONS } from '../../utils/i18n';
import { PolicyKey } from '../../data/legalPoliciesData';

// V261: Code Splitting cho hệ thống chính sách pháp lý - chỉ tải khi người dùng click
const LegalPolicyModal = lazy(() => import('../policies/LegalPolicyModal'));

export interface SharedFooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  rateInfo?: ExchangeRateInfo;
  language?: Language;
}

export const SharedFooter: React.FC<SharedFooterProps> = ({
  onScrollToSection,
  onOpenAdmin,
  language = 'VN',
}) => {
  const [activePolicyKey, setActivePolicyKey] = useState<PolicyKey | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.VN;
  const isEn = language === 'EN';

  // V261: Quy hoạch Footer Chính sách - 4 đường link ngắn gọn chuẩn Bộ Công Thương
  const legalLinks: { label: string; key: PolicyKey }[] = [
    { label: t.policyPrivacy, key: 'privacy' },
    { label: t.policyTerms, key: 'terms' },
    { label: t.policyShipping, key: 'shipping' },
    { label: t.policyReturns, key: 'returns' },
  ];

  return (
    <footer
      id="main-app-footer"
      className="w-full relative z-10 font-body bg-[#00332c] text-white border-none"
      style={{ backgroundColor: '#00332c' }}
    >
      {/* =========================================================================
          MAIN FOOTER CONTAINER (V266 - COMPACT LUXURY FOOTER):
          - Safe cushion padding-bottom: pb-28 (Mobile) / pb-36 (Tablet) / pb-8 (Desktop)
          - Thêm 20px padding-bottom dưới cùng để Copyright không dính sát mép (Hình 5)
         ========================================================================= */}
      <div
        className="mx-auto px-4 sm:px-6 w-full pt-6 pb-28 sm:pb-36 lg:pt-8 lg:pb-8"
        style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'transparent' }}
      >
        {/* =======================================================================
            1. QUY HOẠCH LẠI LOGO & NIỀM TIN (HÌNH 1, HÌNH 2 & HÌNH 4):
            - Tablet: Căn giữa (Center Align) toàn bộ cụm Logo + Mộc Bộ Công Thương (Hình 2)
            - Desktop: Phóng đại Logo G-ROOSTER lên height: 85px uy nghi (Hình 4)
           ======================================================================= */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-3 pb-3 mb-3 border-b border-white/10 w-full">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center lg:justify-start">
            {/* Logo G-ROOSTER v5 3D: Tăng lên 85px trên Desktop theo yêu cầu Hình 4 */}
            <div
              id="footer-logo-container"
              className="inline-flex items-center justify-center !bg-transparent w-auto select-none shrink-0"
            >
              <img
                src="https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png"
                alt="G-ROOSTER CO., LTD"
                className="grooster-logo-img grooster-footer-logo"
                loading="lazy"
                decoding="async"
                style={{
                  height: '85px',
                  maxHeight: '85px',
                  width: 'auto',
                  maxWidth: '260px',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: 'transparent',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/logo-g-rooster-v5-3d.png';
                }}
              />
            </div>

            {/* Dấu mộc ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG - Nằm ngay cạnh Logo (Hình 1 & 2) */}
            <a
              href="https://online.gov.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#005baa]/60 bg-[#005baa]/25 hover:bg-[#005baa]/45 transition-all select-none shadow-xs group"
              title={
                isEn
                  ? 'Registered E-Commerce Website with Ministry of Industry and Trade (Click to verify)'
                  : 'Website thương mại điện tử đã thông báo với Bộ Công Thương (Bấm để tra cứu cổng trực tuyến)'
              }
              aria-label={isEn ? 'Ministry of Industry and Trade Registered Badge' : 'Dấu mộc Đã thông báo Bộ Công Thương'}
            >
              <div className="w-5 h-5 rounded-full bg-[#005baa] border border-blue-200 flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                ✓
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] font-black text-white tracking-wider uppercase">
                  {t.moitAnnounced}
                </span>
                <span className="text-[7.5px] text-[#D4AF37] font-bold tracking-tight mt-0.5">
                  {t.moitAgency}
                </span>
              </div>
            </a>
          </div>

          {/* V266: Cụm Hotline & Zalo Tương Tác Desktop (Hình 3) - Click mở Mini Modal Popup */}
          <button
            type="button"
            onClick={() => setIsContactModalOpen(true)}
            className="hidden lg:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.14] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-white transition-all shadow-xs cursor-pointer group active:scale-95"
            title={isEn ? 'Click to contact via Phone or Zalo' : 'Bấm để Gọi điện thoại hoặc Nhắn tin Zalo'}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[#D4AF37] font-semibold text-xs tracking-wide">
              Hotline &amp; Zalo:
            </span>
            <span className="font-mono font-bold text-xs text-white group-hover:text-[#f6d884] transition-colors">
              0961 525 450 - 0938 7979 04
            </span>
            <span className="text-[10px] bg-[#D4AF37]/20 text-[#f6d884] px-1.5 py-0.5 rounded border border-[#D4AF37]/40 font-semibold uppercase">
              {isEn ? 'Contact' : 'Liên hệ'}
            </span>
          </button>
        </div>

        {/* =======================================================================
            2. BỐ CỤC 2 CỘT (HÌNH 1, 2, 3, 4):
            - Cột trái: Thông tin công ty + STK MB Bank (Đã dọn dẹp Hotline trùng lặp trên Desktop)
            - Cột phải: HỖ TRỢ & PHÁP LÝ (Thẳng hàng ngang với dòng văn bản đầu tiên bên cột trái)
           ======================================================================= */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-5 lg:gap-10 w-full pt-1">
          {/* CỘT TRÁI: DOANH NGHIỆP & THANH TOÁN */}
          <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-1.5 shrink-0 m-0 p-0">
            {/* Khối văn bản giới thiệu: XÓA TRÊN MOBILE & TABLET, CHỈ GIỮ TRÊN DESKTOP */}
            <p className="hidden lg:block text-[12.5px] font-light text-white/80 leading-relaxed max-w-xl pb-1 text-left">
              {t.footerIntro}
            </p>

            {/* Thông tin pháp lý doanh nghiệp minh bạch B2B */}
            <div className="space-y-0.5 text-[11px] sm:text-xs font-light text-white/85 text-center lg:text-left w-full">
              <p className="font-semibold text-white tracking-wide text-xs sm:text-[13px]">
                {t.companyFullName}
              </p>
              <p>
                <span className="text-[#D4AF37] font-semibold">{t.taxIdLabel}</span>{' '}
                <span className="font-mono text-[#D4AF37] font-bold">0319153593</span>{' '}
                <span className="text-white/40">·</span>{' '}
                <span className="text-white/70">{t.taxIdAuthority}</span>
              </p>
              <p className="text-white/80">
                <span className="text-[#D4AF37] font-semibold">{t.headquarterLabel}</span>{' '}
                <span>{t.headquarterAddress}</span>
              </p>

              {/* TỐI ƯU KHỐI THANH TOÁN MB BANK:
                  - Dòng Chủ TK ép hiển thị trên DUY NHẤT 1 HÀNG
                  - Dòng Email & Hotline tách riêng biệt trên Mobile (Hình 1)
                  - Xóa Hotline trong ô này trên Desktop tránh trùng lặp (Hình 3) */}
              <div className="my-1.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.04] border border-white/10 w-full max-w-2xl text-white/95 shadow-2xs">
                {/* Dòng 1: Logo MB Bank + STK Doanh nghiệp */}
                <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                  <span className="px-1.5 py-0.5 rounded bg-[#D4AF37] text-[#00332c] text-[10px] font-black uppercase tracking-wider shadow-2xs">
                    MB BANK
                  </span>
                  <span className="text-[#D4AF37] font-semibold text-[11px]">
                    {isEn ? 'Official Corporate Account:' : 'Tài Khoản Doanh Nghiệp:'}
                  </span>
                  <span className="font-mono text-white font-extrabold text-xs sm:text-[13px] tracking-wider select-all bg-black/30 px-2 py-0.5 rounded border border-white/15">
                    7834588888
                  </span>
                </div>

                {/* Dòng 2: Chủ tài khoản (ÉP TRÊN DUY NHẤT 1 HÀNG) */}
                <div className="text-[11px] lg:text-[12px] text-white/90 mt-1 leading-normal whitespace-nowrap overflow-hidden text-ellipsis text-center lg:text-left">
                  <span className="text-[#D4AF37]/90 font-medium">{isEn ? 'Beneficiary:' : 'Chủ TK:'}</span>{' '}
                  <strong className="text-white font-semibold">CONG TY TNHH THUONG MAI DICH VU G-ROOSTER</strong>{' '}
                  <span className="text-white/70">({isEn ? 'Military Commercial Joint Stock Bank - MB' : 'Ngân hàng TMCP Quân Đội - MB Bank'})</span>
                </div>

                {/* Dòng 3: Email & Hotline (V266: Format riêng biệt theo Hình 1 & xóa Hotline trên Desktop theo Hình 3) */}
                <div className="text-[10.5px] sm:text-[11px] text-white/85 mt-1 pt-1 border-t border-white/10 flex flex-col items-center lg:items-start justify-center lg:justify-start gap-1">
                  <div>
                    <span className="text-[#D4AF37] font-medium">Email:</span>{' '}
                    <a
                      href="mailto:contact@g-rooster.com"
                      className="text-white hover:text-[#D4AF37] font-mono font-medium underline underline-offset-2 transition-colors"
                    >
                      contact@g-rooster.com
                    </a>
                  </div>

                  {/* V266: Ép Hotline xuống hàng riêng trên Mobile/Tablet (Hình 1). Ẩn trên Desktop để tránh trùng lặp (Hình 3) */}
                  <div className="lg:hidden text-[10.5px] sm:text-[11px] text-white/85 pt-0.5 flex items-center justify-center gap-1.5">
                    <span className="text-[#D4AF37] font-medium">{isEn ? 'Hotline:' : 'Hotline:'}</span>{' '}
                    <span className="text-white font-mono font-medium">0961 525 450 - 0938 7979 04</span>
                  </div>
                </div>
              </div>

              <p className="text-white/60 text-[10.5px] sm:text-[11px]">
                {t.certificationsLabel}
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: KHỐI "HỖ TRỢ & PHÁP LÝ" */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end text-center lg:text-right shrink-0 m-0 p-0">
            <h4
              className="text-[12px] font-heading font-bold uppercase tracking-[0.18em] text-[#D4AF37] pb-2 leading-none m-0 p-0 text-center lg:text-right"
              style={{ marginTop: 0, paddingTop: 0 }}
            >
              {t.supportAndLegal}
            </h4>

            {/* V261: Sắp xếp 4 đường link ngắn gọn */}
            <ul className="flex flex-col items-center lg:items-end space-y-1 text-xs font-light text-center lg:text-right">
              {legalLinks.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => setActivePolicyKey(item.key)}
                    className="text-white/70 hover:text-white hover:opacity-100 font-light leading-snug block py-0.5 tracking-wide text-center lg:text-right transition-all duration-200 cursor-pointer"
                    aria-label={`Xem ${item.label}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Link tắt xem bảng 4 mức giá sỉ B2B trên trang chủ */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onScrollToSection('chinh-sach-si')}
                className="text-[11px] text-[#D4AF37]/80 hover:text-[#D4AF37] hover:underline transition-colors cursor-pointer font-light"
              >
                {isEn ? '→ 4 Wholesale Tiers Explainer' : '→ Bảng giải thích 4 mức giá sỉ'}
              </button>
            </div>
          </div>
        </div>

        {/* =======================================================================
            3. THANH COPYRIGHT SIÊU SẠCH (HÌNH 2 & HÌNH 5):
            - Thêm 20px padding-bottom để dòng chữ không bị dính sát mép dưới (Hình 5)
            - Hotline & Zalo cho mobile mở Mini Modal tương tác
           ======================================================================= */}
        <div className="mt-4 pt-3 pb-5 lg:pb-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-center gap-2 text-[11px] sm:text-xs text-white/60 font-light tracking-wide">
          <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
            <span>© 2024 - 2026 G-ROOSTER CO., LTD. {t.rightsReserved}</span>
            {onOpenAdmin && (
              <>
                <span className="text-white/30">·</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-[#f6d884] text-[#D4AF37] font-mono font-semibold transition-colors cursor-pointer"
                >
                  🔒 Admin
                </button>
              </>
            )}
          </div>

          {/* Hotline & Zalo tương tác cho mobile/tablet tại đáy trang */}
          <div className="lg:hidden text-[10.5px] text-white/70 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-white transition-colors cursor-pointer"
            >
              <span className="font-medium">Hotline &amp; Zalo:</span>
              <span className="text-white font-mono font-medium underline">0961 525 450 - 0938 7979 04</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          V266: MINI MODAL POPUP LIÊN HỆ TRỰC TIẾP (HOTLINE HOẶC ZALO - THEO YÊU CẦU 4)
         ========================================================================= */}
      {isContactModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-choice-title"
          onClick={() => setIsContactModalOpen(false)}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#00332c] text-white rounded-3xl max-w-sm w-full p-5 sm:p-6 border border-[#D4AF37]/50 shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col gap-4 font-body"
          >
            {/* Header Mini Modal */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="contact-choice-title"
                    className="font-heading font-bold text-sm text-white tracking-wide uppercase"
                  >
                    {isEn ? 'DIRECT CONTACT' : 'LIÊN HỆ TRỰC TIẾP'}
                  </h3>
                  <p className="text-[11px] text-white/70 font-light mt-0.5">
                    {isEn ? '24/7 Wholesale & Customer Support' : 'Hỗ trợ tư vấn sỉ B2B & đặt hàng 24/7'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2 Lựa chọn: [GỌI ĐIỆN THOẠI] & [NHẮN TIN ZALO] */}
            <div className="space-y-2.5">
              {/* LỰA CHỌN 1: GỌI ĐIỆN THOẠI */}
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-amber-400/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-heading font-bold text-[#f6d884]">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{isEn ? '1. CALL DIRECT HOTLINE' : '1. GỌI ĐIỆN THOẠI TRỰC TIẾP'}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <a
                    href="tel:0961525450"
                    className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-gradient-to-tr from-[#0a2616] via-[#103821] to-[#184d2f] hover:from-[#103821] hover:to-[#22633f] text-white border border-[#D4AF37]/40 text-center transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="text-[10px] text-amber-300 font-semibold uppercase">{isEn ? 'Hotline 1' : 'Hotline 1'}</span>
                    <span className="font-mono text-xs font-bold text-white mt-0.5">0961 525 450</span>
                  </a>
                  <a
                    href="tel:0938797904"
                    className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-gradient-to-tr from-[#0a2616] via-[#103821] to-[#184d2f] hover:from-[#103821] hover:to-[#22633f] text-white border border-[#D4AF37]/40 text-center transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span className="text-[10px] text-amber-300 font-semibold uppercase">{isEn ? 'Hotline 2' : 'Hotline 2'}</span>
                    <span className="font-mono text-xs font-bold text-white mt-0.5">0938 7979 04</span>
                  </a>
                </div>
              </div>

              {/* LỰA CHỌN 2: NHẮN TIN ZALO */}
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-blue-400/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-heading font-bold text-blue-300">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isEn ? '2. CHAT ON OFFICIAL ZALO' : '2. NHẮN TIN QUA ZALO'}</span>
                </div>
                <div className="pt-0.5">
                  <a
                    href="https://zalo.me/0961525450"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#0068FF] hover:bg-[#0052cc] text-white font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer w-full"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>{isEn ? 'Chat Zalo B2B: 0961 525 450' : 'Mở Zalo: 0961 525 450'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Nút Đóng */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium transition-colors cursor-pointer mt-1"
            >
              {isEn ? 'Close Window' : 'Đóng cửa sổ'}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          V261: MODAL CHÍNH SÁCH PHÁP LÝ (CODE SPLITTING QUA REACT.LAZY + SUSPENSE)
         ========================================================================= */}
      {activePolicyKey && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 backdrop-blur-xs">
              <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#00332c] text-white border border-white/10 shadow-2xl">
                <div className="w-8 h-8 border-2 border-white/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
                <span className="text-xs font-mono text-white/80">
                  {isEn ? 'Loading legal policies...' : 'Đang tải chính sách pháp lý...'}
                </span>
              </div>
            </div>
          }
        >
          <LegalPolicyModal
            initialPolicyKey={activePolicyKey}
            language={language}
            onClose={() => setActivePolicyKey(null)}
          />
        </Suspense>
      )}
    </footer>
  );
};
