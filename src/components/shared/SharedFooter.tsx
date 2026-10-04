import React, { useState } from 'react';
import { PartnerId, ExchangeRateInfo } from '../../types';

export interface SharedFooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  rateInfo?: ExchangeRateInfo;
}

export const SharedFooter: React.FC<SharedFooterProps> = ({
  onScrollToSection,
  onOpenAdmin,
}) => {
  const [legalModalOpen, setLegalModalOpen] = useState<'terms' | 'privacy' | null>(null);

  // V205: 3 dòng chính sách cốt lõi của cột HỖ TRỢ
  const policies = [
    { label: 'Chính sách giao hàng hỏa tốc 2H & Toàn quốc', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Chính sách đổi trả 100% trong 24h', action: () => setLegalModalOpen('terms') },
    { label: 'Chính sách bảo mật thông tin', action: () => setLegalModalOpen('privacy') },
  ];

  return (
    <footer
      id="main-app-footer"
      className="w-full relative z-10 font-body bg-[#143A24] text-white border-none"
      style={{ backgroundColor: '#143A24' }}
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
                src="https://i.postimg.cc/pTFzxzPN/hinh-anh-g-rooster-v2.jpg"
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
                  e.currentTarget.src = '/logo-grooster-transparent.png';
                }}
              />
            </div>

            {/* Khối văn bản giới thiệu ngắn gọn */}
            <p className="text-[12.5px] lg:text-[13px] font-light text-white/90 leading-relaxed max-w-md pt-0.5 text-center lg:text-left">
              Hệ thống phân phối Nông sản &amp; Đặc sản cao cấp chuẩn xuất khẩu. Kết nối trực tiếp vùng nguyên liệu độc quyền tới đối tác F&amp;B toàn quốc.
            </p>

            {/* MST và Tiêu chuẩn chứng nhận */}
            <div className="space-y-0.5 text-[11.5px] font-light text-white/80 text-center lg:text-left">
              <p>
                <span className="text-[#D4AF37] font-semibold">MST:</span>{' '}
                <span className="font-mono text-[#D4AF37] font-bold">0319153593</span>{' '}
                <span className="text-white/40">·</span>{' '}
                <span className="text-white font-medium">G-ROOSTER CO.,LTD</span>
              </p>
              <p className="text-white/60 text-[11px]">
                Tiêu chuẩn VSATTP · HACCP · ISO 22000
              </p>
            </div>
          </div>

          {/* CỘT PHẢI: KHỐI "HỖ TRỢ" (CĂN SÁT MÉP PHẢI, ALIGN TOP THẲNG HÀNG VỚI KHUNG LOGO) */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 m-0 p-0">
            <h4
              className="text-[12px] font-heading font-bold uppercase tracking-[0.18em] text-[#D4AF37] pb-2 leading-none m-0 p-0 text-center lg:text-left"
              style={{ marginTop: 0, paddingTop: 0 }}
            >
              HỖ TRỢ
            </h4>

            <ul className="flex flex-col items-center lg:items-start space-y-1.5 text-xs font-light text-center lg:text-left">
              {policies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="text-white/90 hover:text-[#D4AF37] transition-colors duration-200 ease-in-out cursor-pointer font-light leading-snug block py-0.5 tracking-wide text-center lg:text-left"
                    aria-label={`Xem chính sách ${p.label}`}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
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
              MST: <span className="font-mono text-[#D4AF37] font-medium">0319153593</span>
            </span>
            <span className="text-white/30">·</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('terms')}
              className="hover:text-[#D4AF37] text-white/80 transition-colors cursor-pointer"
            >
              Điều khoản
            </button>
            <span className="text-white/30">·</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-[#D4AF37] text-white/80 transition-colors cursor-pointer"
            >
              Bảo mật
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
            <span className="text-white/60">All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* Modal Pháp Lý */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white text-stone-900 rounded-2xl max-w-lg w-full p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-heading font-bold text-base text-[#143A24]">
                {legalModalOpen === 'terms' ? 'Điều Khoản Sử Dụng - G-ROOSTER CO.,LTD' : 'Chính Sách Bảo Mật - G-ROOSTER CO.,LTD'}
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
