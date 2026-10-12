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
          MAIN FOOTER CONTAINER:
          - Màu nền xanh đậm #00332c trùng khớp Header
          - Logo Footer trong suốt, kích thước chuẩn V275 (80px desktop / 65px mobile)
          - Chữ mảnh, thanh lịch, sang trọng
         ========================================================================= */}
      <div
        className="mx-auto px-5 sm:px-6 w-full pt-6 pb-0 lg:pt-[44px] lg:pb-[40px]"
        style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'transparent' }}
      >
        {/* DƯỚI 1024PX LÀ 1 CỘT CĂN GIỮA; TỪ 1024PX (LG) LÀ 2 CỘT CĂN ĐỈNH SÁT 2 MÉP */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 sm:gap-5 lg:gap-12 w-full">
          
          {/* CỘT TRÁI: LOGO ĐỒ HỌA V5 3D + GIỚI THIỆU + MST + MB BANK */}
          <div className="w-full lg:max-w-lg flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 shrink-0 m-0 p-0">
            {/* V275: LOGO ĐỒ HỌA TẠI FOOTER (Nền trong suốt, 80px Desktop / 65px Mobile) */}
            <div
              id="footer-logo-container"
              className="footer-logo-container inline-flex items-center justify-center lg:justify-start !bg-transparent w-auto select-none shrink-0 !shadow-none !border-none !outline-hidden pb-1"
              style={{
                backgroundColor: 'transparent',
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
                outline: 'none',
              }}
            >
              <img
                src="https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png"
                alt="G-ROOSTER CO., LTD"
                className="grooster-logo-img grooster-footer-logo"
                loading="lazy"
                decoding="async"
                style={{
                  height: '80px',
                  width: 'auto',
                  maxWidth: '240px',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: 'transparent',
                  background: 'transparent',
                  padding: '2px',
                }}
                onError={(e) => {
                  e.currentTarget.src = '/logo-g-rooster-v5-3d.png';
                }}
              />
            </div>

            {/* Khối văn bản giới thiệu ngắn gọn */}
            <p className="text-[12.5px] lg:text-[13px] font-light text-white/90 leading-relaxed max-w-md pt-0.5 text-center lg:text-left">
              {t.footerIntro}
            </p>

            {/* Thông tin pháp lý doanh nghiệp minh bạch B2B */}
            <div className="space-y-1 text-[11.5px] lg:text-xs font-light text-white/85 text-center lg:text-left">
              <p className="font-semibold text-white tracking-wide">
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

              {/* Thông tin Thanh toán & STK Công ty MB Bank - 7834588888 */}
              <div className="my-1.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.06] border border-[#D4AF37]/40 max-w-xl text-white/95 shadow-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#00332c] text-[10.5px] font-black uppercase tracking-wider shadow-xs">
                    MB BANK
                  </span>
                  <span className="text-[#D4AF37] font-semibold text-xs">
                    {isEn ? 'Official Corporate Account:' : 'Tài Khoản Doanh Nghiệp:'}
                  </span>
                  <span className="font-mono text-white font-extrabold text-[13.5px] tracking-wider select-all bg-black/30 px-2 py-0.5 rounded-md border border-white/20">
                    7834588888
                  </span>
                </div>
                <div className="text-[11px] text-white/80 mt-1 leading-snug">
                  <span className="text-[#D4AF37]/90 font-medium">{isEn ? 'Beneficiary:' : 'Chủ TK:'}</span>{' '}
                  <strong className="text-white font-semibold">CONG TY TNHH THUONG MAI DICH VU G-ROOSTER</strong>{' '}
                  <span className="text-white/60">({isEn ? 'Military Commercial Joint Stock Bank - MB' : 'Ngân hàng TMCP Quân Đội - MB Bank'})</span>
                </div>
                <div className="text-[11px] text-white/85 mt-1 pt-1 border-t border-white/10 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[#D4AF37] font-medium">Email:</span>{' '}
                  <a href="mailto:contact@g-rooster.com" className="text-white hover:text-[#D4AF37] font-mono font-medium underline underline-offset-2">
                    contact@g-rooster.com
                  </a>
                  <span className="text-white/40">·</span>
                  <span className="text-[#D4AF37] font-medium">{isEn ? 'Hotlines:' : 'Hotline:'}</span>{' '}
                  <span className="text-white font-mono font-medium">0961 525 450 - 0938 7979 04</span>
                </div>
              </div>

              <p className="text-white/60 text-[11px] pt-0.5">
                {t.certificationsLabel}
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: KHỐI "HỖ TRỢ & PHÁP LÝ" (QUY HOẠCH 4 LINK NGẮN GỌN V261) */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end text-center lg:text-right shrink-0 m-0 p-0">
            <h4
              className="text-[12px] font-heading font-bold uppercase tracking-[0.18em] text-[#D4AF37] pb-2 leading-none m-0 p-0 text-center lg:text-right"
              style={{ marginTop: 0, paddingTop: 0 }}
            >
              {t.supportAndLegal}
            </h4>

            {/* V261: Sắp xếp 4 đường link ngắn gọn - Chữ mảnh, màu xám nhạt opacity 0.7, chỉ nổi rõ khi hover */}
            <ul className="flex flex-col items-center lg:items-end space-y-1.5 text-xs font-light text-center lg:text-right">
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

        {/* =========================================================================
            THÔNG TIN ĐÁY TRANG & COPYRIGHT (V261):
            - Hotline & Zalo
            - Copyright Bar kèm link pháp lý
            - Góc phải: Dấu mộc "ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG" chuẩn màu xanh blue
           ========================================================================= */}
        <div className="mt-5 pt-3.5 lg:mt-6 lg:pt-4 border-t border-white/10 flex flex-col items-center justify-center text-center gap-2 relative z-20 pb-[75px] lg:pb-0">
          {/* Dòng liên hệ Hotline & Zalo */}
          <p className="text-[12.5px] font-light text-white/90 tracking-wide text-center flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-[#D4AF37] font-semibold">Hotline &amp; Zalo:</span>{' '}
            <a
              href="tel:0961525450"
              className="text-white hover:text-[#D4AF37] transition-colors font-mono font-bold underline decoration-white/30 hover:decoration-[#D4AF37] underline-offset-2"
            >
              0961 525 450
            </a>
            <span className="text-white/40">-</span>
            <a
              href="tel:0938797904"
              className="text-white hover:text-[#D4AF37] transition-colors font-mono font-bold underline decoration-white/30 hover:decoration-[#D4AF37] underline-offset-2"
            >
              0938 7979 04
            </a>
          </p>

          {/* Dòng bản quyền và dấu mộc Bộ Công Thương góc phải */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-3 text-[11.5px] text-white/70 font-light tracking-wide pt-1">
            {/* Vùng trái / giữa: Copyright & các liên kết pháp lý */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1">
              <span className="text-white/90">© 2024 - 2026 G-ROOSTER CO., LTD</span>
              <span className="text-white/30">·</span>
              <span>
                {t.taxIdLabel} <span className="font-mono text-[#D4AF37] font-medium">0319153593</span>
              </span>
              <span className="text-white/30">·</span>
              <button
                type="button"
                onClick={() => setActivePolicyKey('privacy')}
                className="hover:text-[#D4AF37] text-white/75 transition-colors cursor-pointer"
              >
                {t.policyPrivacy}
              </button>
              <span className="text-white/30">·</span>
              <button
                type="button"
                onClick={() => setActivePolicyKey('terms')}
                className="hover:text-[#D4AF37] text-white/75 transition-colors cursor-pointer"
              >
                {t.policyTerms}
              </button>
              <span className="text-white/30">·</span>
              <button
                type="button"
                onClick={() => setActivePolicyKey('shipping')}
                className="hover:text-[#D4AF37] text-white/75 transition-colors cursor-pointer"
              >
                {t.policyShipping}
              </button>
              <span className="text-white/30">·</span>
              <button
                type="button"
                onClick={() => setActivePolicyKey('returns')}
                className="hover:text-[#D4AF37] text-white/75 transition-colors cursor-pointer"
              >
                {t.policyReturns}
              </button>
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
              <span className="text-white/30">·</span>
              <span className="text-white/50">{t.rightsReserved}</span>
            </div>

            {/* V261: TÍCH HỢP DẤU MỘC BỘ CÔNG THƯƠNG TẠI GÓC PHẢI DƯỚI CÙNG (CẠNH COPYRIGHT) */}
            <div className="shrink-0 flex items-center justify-center lg:justify-end">
              <a
                href="https://online.gov.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#005baa]/60 bg-[#005baa]/20 hover:bg-[#005baa]/40 hover:border-blue-400 transition-all select-none shadow-2xs group"
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
                  <span className="text-[9.5px] font-black text-white tracking-wider uppercase">
                    {t.moitAnnounced}
                  </span>
                  <span className="text-[8px] text-[#D4AF37] font-bold tracking-tight mt-0.5">
                    {t.moitAgency}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          V261: MODAL CHÍNH SÁCH PHÁP LÝ (CODE SPLITTING QUA REACT.LAZY + SUSPENSE)
          - Chỉ tải dữ liệu và component khi người dùng bấm vào liên kết
          - Bảo vệ 100% hiệu năng và tốc độ load trang chủ
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
