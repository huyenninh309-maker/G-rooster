import React, { useState, lazy, Suspense } from 'react';
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
          MAIN FOOTER CONTAINER (V265 - COMPACT LUXURY FOOTER):
          - Safe cushion padding-bottom: pb-28 (Mobile) / pb-36 (Tablet) / pb-8 (Desktop)
            để thanh giỏ hàng và các nút điều hướng floating KHÔNG BAO GIỜ đè lên footer (Hình 7)
          - Màu nền xanh đậm #00332c đồng nhất sang trọng
         ========================================================================= */}
      <div
        className="mx-auto px-4 sm:px-6 w-full pt-6 pb-28 sm:pb-36 lg:pt-8 lg:pb-8"
        style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'transparent' }}
      >
        {/* =======================================================================
            1. QUY HOẠCH LẠI LOGO & NIỀM TIN (HÌNH 1):
            - Cụm nhận diện duy nhất: Logo G-ROOSTER v5 3D + Biểu tượng BỘ CÔNG THƯƠNG
            - Nằm cùng nhau ngay đầu Footer, giải phóng diện tích đáy trang
           ======================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 mb-3 border-b border-white/10 w-full">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center sm:justify-start">
            {/* Logo G-ROOSTER v5 3D */}
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
                  height: '65px',
                  width: 'auto',
                  maxWidth: '220px',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: 'transparent',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/logo-g-rooster-v5-3d.png';
                }}
              />
            </div>

            {/* Dấu mộc ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG - Nằm ngay cạnh Logo ở đầu Footer (Hình 1) */}
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

          {/* Hotline & Zalo nhanh ở thanh nhận diện đầu Footer (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-light text-white/80">
            <span className="text-[#D4AF37] font-semibold">Hotline &amp; Zalo:</span>
            <a href="tel:0961525450" className="text-white hover:text-[#D4AF37] font-mono font-bold transition-colors">0961 525 450</a>
            <span className="text-white/40">-</span>
            <a href="tel:0938797904" className="text-white hover:text-[#D4AF37] font-mono font-bold transition-colors">0938 7979 04</a>
          </div>
        </div>

        {/* =======================================================================
            2. CÂN CHỈNH BỐ CỤC (HÌNH 3 & 4):
            - Cột trái: Thông tin công ty + STK MB Bank (Xóa bỏ văn bản giới thiệu dài dòng trên Mobile/Tablet)
            - Cột phải: HỖ TRỢ & PHÁP LÝ (Thẳng hàng ngang với dòng văn bản đầu tiên bên cột trái - Hình 3)
           ======================================================================= */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-5 lg:gap-10 w-full pt-1">
          {/* CỘT TRÁI: DOANH NGHIỆP & THANH TOÁN */}
          <div className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-1.5 shrink-0 m-0 p-0">
            {/* Khối văn bản giới thiệu: XÓA TRÊN MOBILE & TABLET (HÌNH 4), CHỈ GIỮ TRÊN DESKTOP */}
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

              {/* TỐI ƯU KHỐI THANH TOÁN (HÌNH 5 & HÌNH 6):
                  - Thu nhỏ padding, giảm font-size các nhãn (Label) xuống 11px
                  - Viền mỏng thanh thoát, bỏ khoảng trắng thừa
                  - Dòng Chủ TK ép hiển thị trên DUY NHẤT 1 HÀNG (Hình 6) */}
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

                {/* Dòng 2: Chủ tài khoản (ÉP TRÊN DUY NHẤT 1 HÀNG - HÌNH 6) */}
                <div className="text-[11px] lg:text-[12px] text-white/90 mt-1 leading-normal whitespace-nowrap overflow-hidden text-ellipsis text-center lg:text-left">
                  <span className="text-[#D4AF37]/90 font-medium">{isEn ? 'Beneficiary:' : 'Chủ TK:'}</span>{' '}
                  <strong className="text-white font-semibold">CONG TY TNHH THUONG MAI DICH VU G-ROOSTER</strong>{' '}
                  <span className="text-white/70">({isEn ? 'Military Commercial Joint Stock Bank - MB' : 'Ngân hàng TMCP Quân Đội - MB Bank'})</span>
                </div>

                {/* Dòng 3: Email & 2 Hotline */}
                <div className="text-[10.5px] sm:text-[11px] text-white/85 mt-1 pt-1 border-t border-white/10 flex items-center justify-center lg:justify-start gap-1.5 flex-wrap">
                  <span className="text-[#D4AF37] font-medium">Email:</span>{' '}
                  <a href="mailto:contact@g-rooster.com" className="text-white hover:text-[#D4AF37] font-mono font-medium underline underline-offset-2">
                    contact@g-rooster.com
                  </a>
                  <span className="text-white/40">·</span>
                  <span className="text-[#D4AF37] font-medium">{isEn ? 'Hotlines:' : 'Hotline:'}</span>{' '}
                  <span className="text-white font-mono font-medium">0961 525 450 - 0938 7979 04</span>
                </div>
              </div>

              <p className="text-white/60 text-[10.5px] sm:text-[11px]">
                {t.certificationsLabel}
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: KHỐI "HỖ TRỢ & PHÁP LÝ" (THẲNG HÀNG NGANG VỚI DÒNG ĐẦU BÊN TRÁI - HÌNH 3) */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end text-center lg:text-right shrink-0 m-0 p-0">
            <h4
              className="text-[12px] font-heading font-bold uppercase tracking-[0.18em] text-[#D4AF37] pb-2 leading-none m-0 p-0 text-center lg:text-right"
              style={{ marginTop: 0, paddingTop: 0 }}
            >
              {t.supportAndLegal}
            </h4>

            {/* V261: Sắp xếp 4 đường link ngắn gọn - Chữ mảnh, màu xám nhạt opacity 0.7, chỉ nổi rõ khi hover */}
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
            3. THANH COPYRIGHT SIÊU SẠCH (HÌNH 2):
            - XÓA BỎ các thông tin trùng lặp (Tên công ty, MST, Chính sách...)
            - Chỉ chứa duy nhất Copyright và năm hoạt động + nút Admin bảo mật
           ======================================================================= */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-center gap-2 text-[11px] sm:text-xs text-white/60 font-light tracking-wide">
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

          {/* Hotline & Zalo nhanh cho mobile/tablet tại đáy trang */}
          <div className="lg:hidden text-[10.5px] text-white/70 flex items-center justify-center gap-1.5">
            <span className="text-[#D4AF37] font-medium">Hotline &amp; Zalo:</span>
            <a href="tel:0961525450" className="text-white font-mono font-medium underline">0961 525 450</a>
            <span>-</span>
            <a href="tel:0938797904" className="text-white font-mono font-medium underline">0938 7979 04</a>
          </div>
        </div>
      </div>

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
