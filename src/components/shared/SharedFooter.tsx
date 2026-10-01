import React, { useState } from 'react';
import { PartnerId, ExchangeRateInfo } from '../../types';

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
}) => {
  const [legalModalOpen, setLegalModalOpen] = useState<'terms' | 'privacy' | null>(null);

  // V203: Cột DANH MỤC: Duy nhất 2 dòng: "Nông sản" và "Đặc sản"
  const mainCategories = [
    {
      label: 'Nông sản',
      action: () => {
        onSelectPartner('matcha-tra-laka');
        const el = document.getElementById('san-pham') || document.getElementById('catalog-product-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'Đặc sản',
      action: () => {
        onSelectPartner('dac-san-snack');
        const el = document.getElementById('san-pham') || document.getElementById('catalog-product-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  // V203: Cột HỖ TRỢ: 3 dòng chính sách cốt lõi
  const policies = [
    { label: 'Chính sách giao hàng hỏa tốc 2H & Toàn quốc', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Chính sách đổi trả 100% trong 24h', action: () => setLegalModalOpen('terms') },
    { label: 'Chính sách bảo mật thông tin', action: () => setLegalModalOpen('privacy') },
  ];

  return (
    <footer
      id="main-app-footer"
      className="w-full relative z-10 font-body bg-[#0a140f] text-stone-400 border-t border-white/[0.04]"
    >
      {/* =========================================================================
          MAIN FOOTER CONTAINER (V203: TÁI CẤU TRÚC TỶ LỆ VÀNG & SAFE AREA 250PX):
          1. CĂN LỀ ĐỈNH TUYỆT ĐỐI (FLEXBOX ALIGN-ITEMS: FLEX-START):
             - Đỉnh Logo Cột 1 thẳng hàng ngang với chữ "DANH MỤC" Cột 2 và "HỖ TRỢ" Cột 3
             - Logo Footer: 70px (Desktop), 55px (Mobile)
          2. GOM CỤM NỘI DUNG:
             - max-width: 1200px căn giữa (margin: 0 auto)
          3. GIẢI CỨU ĐÁY TRANG MOBILE:
             - padding-bottom: 250px trên Mobile (<768px), dòng Copyright và Kết nối nằm hoàn toàn TRÊN thanh Xem Giỏ
          4. CÂN BẰNG THỊ GIÁC:
             - Cột 1 rút gọn tối đa 3 dòng giới thiệu, bỏ thông tin lặp
             - Cột 2 & 3: Typography súc tích, liên kết chặt chẽ
          5. DÒNG KẾT NỐI & COPYRIGHT: opacity: 0.5 thanh thoát
         ========================================================================= */}
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 w-full"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* 3 CỘT SỬ DỤNG FLEXBOX VỚI ALIGN-ITEMS: FLEX-START BẮT BUỘC ĐỂ ĐỈNH THẲNG HÀNG */}
        <div
          className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-10 lg:gap-14 w-full"
          style={{ alignItems: 'flex-start' }}
        >
          {/* CỘT 1: THÔNG TIN CÔNG TY (LOGO 70PX/55PX, ĐỈNH BẮT ĐẦU CÙNG DÒNG VỚI CÁC CỘT BÊN) */}
          <div className="w-full md:w-[42%] flex flex-col items-center md:items-start text-center md:text-left space-y-3 shrink-0 m-0 p-0">
            {/* Logo Footer chuẩn: link chính thức, 70px trên Desktop, 55px trên Mobile, sắc nét */}
            <div className="flex items-center justify-center md:justify-start m-0 p-0">
              <img
                src="https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png"
                alt="G-ROOSTER CO.,LTD - Nông Sản & Đặc Sản Cao Cấp"
                width="240"
                height="70"
                style={{ aspectRatio: '240 / 70' }}
                className="h-[55px] md:h-[70px] w-auto object-contain block mix-blend-screen invert contrast-125 brightness-105 opacity-95 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/logo-chut-chiu.png';
                }}
              />
            </div>

            {/* Đoạn giới thiệu súc tích tối đa 3 dòng, cân bằng thị giác hoàn hảo với 2 cột bên */}
            <p className="text-[13px] font-light text-stone-300 opacity-70 leading-relaxed max-w-sm line-clamp-3">
              Hệ thống phân phối Nông sản &amp; Đặc sản cao cấp chuẩn xuất khẩu. Kết nối trực tiếp vùng nguyên liệu độc quyền tới đối tác F&amp;B toàn quốc.
            </p>
          </div>

          {/* CỘT 2: DANH MỤC (ĐỈNH CHỮ DANH MỤC THẲNG HÀNG NGANG VỚI ĐỈNH LOGO) */}
          <div className="w-full md:w-[26%] flex flex-col items-center md:items-start text-center md:text-left shrink-0 m-0 p-0">
            <h4
              className="text-[12px] font-heading font-semibold uppercase tracking-[0.15em] text-stone-300 pb-3 leading-none m-0 p-0"
              style={{ marginTop: 0, paddingTop: 0 }}
            >
              DANH MỤC
            </h4>

            <ul className="space-y-2 text-xs font-light">
              {mainCategories.map((c, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={c.action}
                    className="text-stone-300 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer font-light leading-snug block py-0.5 tracking-wide mx-auto md:mx-0"
                    aria-label={`Xem danh mục ${c.label}`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: HỖ TRỢ (ĐỈNH CHỮ HỖ TRỢ THẲNG HÀNG NGANG VỚI ĐỈNH LOGO VÀ DANH MỤC) */}
          <div className="w-full md:w-[32%] flex flex-col items-center md:items-start text-center md:text-left shrink-0 m-0 p-0">
            <h4
              className="text-[12px] font-heading font-semibold uppercase tracking-[0.15em] text-stone-300 pb-3 leading-none m-0 p-0"
              style={{ marginTop: 0, paddingTop: 0 }}
            >
              HỖ TRỢ
            </h4>

            <ul className="space-y-2 text-xs font-light">
              {policies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="text-stone-300 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer font-light leading-snug block py-0.5 tracking-wide mx-auto md:mx-0"
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
            DÒNG KẾT NỐI & COPYRIGHT (V203):
            - VÙNG AN TOÀN MOBILE: pb-[250px] md:pb-8 để toàn bộ chữ nằm PHÍA TRÊN thanh Xem Giỏ
            - Opacity 0.5 sang trọng, tinh tế
           ========================================================================= */}
        <div className="mt-8 pt-6 sm:mt-10 sm:pt-8 border-t border-white/[0.04] flex flex-col items-center justify-center text-center gap-1.5 relative z-20 pb-[250px] md:pb-8">
          {/* DÒNG 1: KẾT NỐI HOTLINE & ZALO */}
          <p className="text-[11px] font-light text-[#9ca3af] opacity-50 tracking-wide text-center">
            Kết nối với G-ROOSTER qua Hotline &amp; Zalo:{' '}
            <a
              href="tel:0961525450"
              className="text-stone-300 hover:text-white transition-colors font-mono underline decoration-stone-600 underline-offset-2"
            >
              0961 525 450
            </a>
            {' - '}
            <a
              href="tel:0938797904"
              className="text-stone-300 hover:text-white transition-colors font-mono underline decoration-stone-600 underline-offset-2"
            >
              0938 7979 04
            </a>
          </p>

          {/* DÒNG 2: BẢN QUYỀN, ĐIỀU KHOẢN & ADMIN */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-[#9ca3af] opacity-50 font-light tracking-wide text-center select-none">
            <span>© 2024 - 2026 G-ROOSTER CO.,LTD</span>
            <span>·</span>
            <span>
              MST: <span className="font-mono">0319153593</span>
            </span>
            <span>·</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Điều khoản
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Bảo mật
            </button>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-white font-mono transition-colors cursor-pointer"
                >
                  🔒 Admin
                </button>
              </>
            )}
            <span>·</span>
            <span>All rights reserved.</span>
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
