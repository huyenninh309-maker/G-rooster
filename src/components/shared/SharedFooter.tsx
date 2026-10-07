import React, { useState } from 'react';
import { PartnerId, ExchangeRateInfo, Language } from '../../types';
import { TRANSLATIONS } from '../../utils/i18n';

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
  const [legalModalOpen, setLegalModalOpen] = useState<'terms' | 'privacy' | null>(null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.VN;

  // V205 & V240: 3 dòng chính sách hỗ trợ B2B đa ngôn ngữ
  const policies = [
    { label: t.policyDelivery, action: () => onScrollToSection('chinh-sach-si') },
    { label: t.policyReturn, action: () => setLegalModalOpen('terms') },
    { label: t.policyPrivacy, action: () => setLegalModalOpen('privacy') },
  ];

  return (
    <footer
      id="main-app-footer"
      className="w-full relative z-10 font-body bg-[#00332c] text-white border-none"
      style={{ backgroundColor: '#00332c' }}
    >
      {/* =========================================================================
          MAIN FOOTER CONTAINER (V232: ĐỒNG BỘ MÀU NỀN XANH ĐẬM #143A24 & LOGO TRONG SUỐT):
          1. COLOR SYNC: Màu nền xanh đậm #143A24 trùng khớp 100% với Header & Feature Bar.
          2. LOGO FOOTER:
             - Loại bỏ hoàn toàn khung viền trắng, nền trong suốt (transparent).
             - Kích thước chuẩn: Desktop 85px (lg:h-[85px]), Tablet/Mobile 70px (h-[70px]).
             - Bảo toàn nguyên vẹn chi tiết mào gà và logo G-ROOSTER.
          3. CHỮ VÀ ICON:
             - Chuyển toàn bộ sang màu TRẮNG (#FFFFFF / white/90) và VÀNG ĐỒNG (#D4AF37)
               nổi bật, sắc nét, sang trọng trên nền xanh đậm.
         ========================================================================= */}
      <div
        className="mx-auto px-5 sm:px-6 w-full pt-6 pb-0 lg:pt-[44px] lg:pb-[40px]"
        style={{ maxWidth: '1200px', margin: '0 auto', backgroundColor: 'transparent' }}
      >
        {/* DƯỚI 1024PX LÀ 1 CỘT CĂN GIỮA; TỪ 1024PX (LG) LÀ 2 CỘT CĂN ĐỈNH SÁT 2 MÉP (ALIGN TOP) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 sm:gap-5 lg:gap-12 w-full">
          
          {/* CỘT TRÁI: LOGO TRONG SUỐT (85PX DESKTOP / 70PX TABLET-MOBILE) + GIỚI THIỆU + MST */}
          <div className="w-full lg:max-w-lg flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 shrink-0 m-0 p-0">
            {/* Logo Footer hòa quyện vào nền xanh đậm #143A24 chuẩn V232 */}
            <div
              id="footer-logo-container"
              className="footer-logo-container inline-flex items-center justify-center !bg-transparent h-[70px] lg:h-[85px] w-auto select-none shrink-0 !shadow-none !border-none !outline-none p-0 m-0"
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                filter: 'none',
                border: 'none',
                outline: 'none',
                mixBlendMode: 'normal',
                opacity: 1,
                padding: 0,
                marginTop: 0,
                overflow: 'visible',
              }}
            >
              <img
                id="footer-logo-img"
                src="https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png"
                alt="G-ROOSTER CO.,LTD - Nông Sản & Đặc Sản Cao Cấp"
                className="footer-logo-img h-[70px] lg:h-[85px] w-auto object-contain block mx-auto !opacity-100 !shadow-none !border-none p-0 m-0"
                style={{
                  objectFit: 'contain',
                  backgroundColor: 'transparent',
                  opacity: 1,
                  filter: 'none',
                  boxShadow: 'none',
                  border: 'none',
                  mixBlendMode: 'normal',
                  transform: 'none',
                  padding: 0,
                  margin: 0,
                }}
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/logo-g-rooster-v5-3d.png';
                }}
              />
            </div>

            {/* Khối văn bản giới thiệu ngắn gọn */}
            <p className="text-[12.5px] lg:text-[13px] font-light text-white/90 leading-relaxed max-w-md pt-0.5 text-center lg:text-left">
              {t.footerIntro}
            </p>

            {/* Thông tin pháp lý doanh nghiệp minh bạch B2B (V239 & V240) */}
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
              <p className="text-white/80">
                <span className="text-[#D4AF37] font-semibold">{t.bankAccountLabel}</span>{' '}
                <span className="font-mono text-white font-semibold">7834588888</span>{' '}
                <span className="text-white/40">-</span>{' '}
                <span className="text-white/90">CONG TY TNHH THUONG MAI DICH VU G-ROOSTER</span>{' '}
                <span className="text-white/60">({language === 'EN' ? 'MB Bank' : 'MB Bank - Ngân hàng Quân Đội'})</span>
              </p>
              <p className="text-white/60 text-[11px] pt-0.5">
                {t.certificationsLabel}
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: KHỐI "HỖ TRỢ & PHÁP LÝ" & LOGO "ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG" (PLACEHOLDER V239) */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end text-center lg:text-right shrink-0 m-0 p-0">
            <h4
              className="text-[12px] font-heading font-bold uppercase tracking-[0.18em] text-[#D4AF37] pb-2 leading-none m-0 p-0 text-center lg:text-right"
              style={{ marginTop: 0, paddingTop: 0 }}
            >
              {t.supportAndLegal}
            </h4>

            <ul className="flex flex-col items-center lg:items-end space-y-1.5 text-xs font-light text-center lg:text-right">
              {policies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="text-white/90 hover:text-[#D4AF37] transition-colors duration-200 ease-in-out cursor-pointer font-light leading-snug block py-0.5 tracking-wide text-center lg:text-right"
                    aria-label={`Xem chính sách ${p.label}`}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* V239: Placeholder Logo "Đã đăng ký / Đã thông báo Bộ Công Thương" */}
            <div className="pt-3 flex items-center justify-center lg:justify-end">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-400/40 bg-blue-950/40 hover:bg-blue-900/50 transition-all select-none shadow-2xs"
                title="Website thương mại điện tử đã thông báo với Bộ Công Thương (Dạng chuẩn bị phát hành)"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 border border-blue-300 flex items-center justify-center text-[11px] font-black text-white shrink-0 shadow-2xs">
                  ✓
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9.5px] font-black text-white tracking-wider uppercase leading-none">
                    {t.moitAnnounced}
                  </span>
                  <span className="text-[8.5px] text-[#D4AF37] font-bold tracking-tight leading-tight mt-0.5">
                    {t.moitAgency}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            THÔNG TIN ĐÁY TRANG & COPYRIGHT (V232):
            - Hotline & Zalo: Nổi bật với màu Vàng đồng và Trắng
            - Copyright Bar: font 11.5px, màu Trắng mờ thanh lịch, MST Vàng đồng
           ========================================================================= */}
        <div className="mt-4 pt-3 lg:mt-6 lg:pt-4 flex flex-col items-center justify-center text-center gap-1.5 relative z-20 pb-[70px] lg:pb-0">
          {/* Dòng liên hệ Hotline & Zalo (12.5px, chữ Trắng và Vàng Đồng) */}
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

          {/* Dòng bản quyền và chính sách pháp lý */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11.5px] text-white/75 font-light tracking-wide text-center select-none mt-1">
            <span className="text-white/90">© 2024 - 2026 G-ROOSTER CO.,LTD</span>
            <span className="text-white/30">·</span>
            <span>
              {t.taxIdLabel} <span className="font-mono text-[#D4AF37] font-medium">0319153593</span>
            </span>
            <span className="text-white/30">·</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('terms')}
              className="hover:text-[#D4AF37] text-white/80 transition-colors cursor-pointer"
            >
              {t.terms}
            </button>
            <span className="text-white/30">·</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-[#D4AF37] text-white/80 transition-colors cursor-pointer"
            >
              {t.privacy}
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
            <span className="text-white/60">{t.rightsReserved}</span>
          </div>
        </div>
      </div>

      {/* Modal Pháp Lý */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white text-stone-900 rounded-2xl max-w-lg w-full p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-heading font-bold text-base text-[#143A24]">
                {legalModalOpen === 'terms'
                  ? (language === 'EN' ? 'Terms of Service - G-ROOSTER CO., LTD' : 'Điều Khoản Sử Dụng - G-ROOSTER CO.,LTD')
                  : (language === 'EN' ? 'Privacy Policy - G-ROOSTER CO., LTD' : 'Chính Sách Bảo Mật - G-ROOSTER CO.,LTD')}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModalOpen(null)}
                className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-stone-600 space-y-2.5 max-h-72 overflow-y-auto leading-relaxed pr-1">
              {legalModalOpen === 'terms' ? (
                language === 'EN' ? (
                  <>
                    <p>
                      1. <strong>Legal Entity:</strong> All products distributed on the platform are managed and operated by G-ROOSTER CO., LTD (Tax ID: 0319153593) in accordance with international & Vietnamese B2B/B2C standards.
                    </p>
                    <p>
                      2. <strong>Wholesale Pricing Policy:</strong> 4 tiered wholesale prices (Retail, Tier 1, Tier 2, Tier 3) are automatically calculated and applied based on actual carton or kilogram order volumes.
                    </p>
                    <p>
                      3. <strong>VAT E-Invoices:</strong> Electronic VAT invoices are issued according to enterprise legal tax information upon order transfer completion.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      1. <strong>Tư cách pháp nhân:</strong> Toàn bộ sản phẩm phân phối trên hệ thống do G-ROOSTER CO.,LTD (MST: 0319153593) quản lý và vận hành theo tiêu chuẩn B2B/B2C Việt Nam.
                    </p>
                    <p>
                      2. <strong>Chính sách giá sỉ:</strong> Bảng 4 mức giá sỉ (Lẻ, Sỉ 1, Sỉ 2, Sỉ 3) áp dụng theo số lượng đóng gói thùng hoặc kg thực tế được hệ thống tự động tính toán minh bạch.
                    </p>
                    <p>
                      3. <strong>Hóa đơn VAT:</strong> Hóa đơn điện tử được xuất theo thông tin doanh nghiệp cung cấp khi hoàn tất chuyển khoản đơn hàng.
                    </p>
                  </>
                )
              ) : (
                language === 'EN' ? (
                  <>
                    <p>
                      1. <strong>Information Confidentiality:</strong> G-ROOSTER CO., LTD is committed to protecting 100% of personal data and order information of our partners and customers.
                    </p>
                    <p>
                      2. <strong>Purpose of Collection:</strong> Phone numbers and delivery addresses are exclusively used for dispatch coordination, logistics, and after-sales support.
                    </p>
                    <p>
                      3. <strong>No Third-Party Sharing:</strong> We strictly never disclose customer data to any unauthorized third parties outside designated delivery partners.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      1. <strong>Bảo mật thông tin:</strong> G-ROOSTER CO.,LTD cam kết bảo vệ 100% dữ liệu thông tin cá nhân và thông tin đặt hàng của đối tác và khách hàng.
                    </p>
                    <p>
                      2. <strong>Mục đích thu thập:</strong> Chỉ sử dụng số điện thoại và địa chỉ giao nhận để điều phối vận chuyển đơn hàng hỏa tốc và hỗ trợ sau bán hàng.
                    </p>
                    <p>
                      3. <strong>Không chia sẻ bên thứ ba:</strong> Tuyệt đối không cung cấp dữ liệu khách hàng cho bất kỳ tổ chức hay cá nhân nào khác ngoài đơn vị vận chuyển được chỉ định.
                    </p>
                  </>
                )
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalOpen(null)}
                className="px-4 py-2 rounded-[5px] bg-[#143A24] text-white font-heading font-bold text-xs hover:bg-[#0d2718] transition-all cursor-pointer"
              >
                {language === 'EN' ? 'Understood' : 'Đã hiểu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
