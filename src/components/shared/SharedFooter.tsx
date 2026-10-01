import React, { useState } from 'react';
import { Phone } from 'lucide-react';
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

  // V197: Cột DANH MỤC: Duy nhất 3 đầu mục lớn, ngắn gọn: "NÔNG SẢN", "ĐẶC SẢN", "THẢO DƯỢC"
  const mainCategories = [
    {
      label: 'NÔNG SẢN',
      action: () => {
        onSelectPartner('matcha-tra-laka');
        const el = document.getElementById('san-pham') || document.getElementById('catalog-product-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'ĐẶC SẢN',
      action: () => {
        onSelectPartner('dac-san-snack');
        const el = document.getElementById('san-pham') || document.getElementById('catalog-product-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      label: 'THẢO DƯỢC',
      action: () => {
        onSelectPartner('thao-duoc-sam');
        const el = document.getElementById('san-pham') || document.getElementById('catalog-product-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  // V197: Cột HỖ TRỢ: Duy nhất 3 dòng chính sách cốt lõi quan trọng nhất: "Giao hàng", "Đổi trả", "Bảo mật"
  const policies = [
    { label: 'Giao hàng', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Đổi trả', action: () => setLegalModalOpen('terms') },
    { label: 'Bảo mật', action: () => setLegalModalOpen('privacy') },
  ];

  return (
    <footer id="main-app-footer" className="w-full relative font-body bg-[#0a140f] text-stone-400 border-t border-white/[0.04]">
      {/* =========================================================================
          MAIN FOOTER (V197: TÁI CẤU TRÚC SIÊU TINH GỌN - AIRY LUXURY):
          1. CỘT 1 (BÊN TRÁI): Logo chuẩn cao 45px + Duy nhất 2 Hotline với icon xanh mảnh
          2. CỘT 2 (DANH MỤC): Duy nhất 3 đầu mục lớn: NÔNG SẢN, ĐẶC SẢN, THẢO DƯỢC
          3. CỘT 3 (HỖ TRỢ): Duy nhất 3 chính sách: Giao hàng, Đổi trả, Bảo mật
          4. TYPOGRAPHY: Tiêu đề IN HOA 12px, letter-spacing: 0.15em, font-weight: 600
          5. SPACING: Giãn dòng cực thoáng, copyright mờ 0.4 đẩy sát đáy
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 sm:pt-16 sm:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-14 items-start">
          
          {/* CỘT 1: LOGO CHUẨN CAO 45PX + DUY NHẤT 2 SỐ HOTLINE LIÊN HỆ */}
          <div className="text-left flex flex-col items-start w-full">
            {/* Logo chuẩn chính thức: height 45px cố định */}
            <div className="flex items-center text-left mb-4">
              <img
                src="https://i.postimg.cc/mZwkVt5K/logo-chut-chiu.png"
                alt="G-ROOSTER CO.,LTD - Nông Sản & Đặc Sản Cao Cấp"
                width="160"
                height="45"
                style={{ aspectRatio: '160 / 45' }}
                className="h-[45px] w-auto object-contain block opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/logo-chut-chiu.png';
                }}
              />
            </div>

            {/* DUY NHẤT 2 SỐ HOTLINE LIÊN HỆ TINH TẾ VỚI ICON ĐIỆN THOẠI MẢNH MÀU XANH THƯƠNG HIỆU */}
            <div className="space-y-2.5 pt-1">
              <a
                href="tel:0961525450"
                className="flex items-center gap-2.5 text-stone-300 hover:text-white transition-colors group py-0.5"
                title="Gọi Hotline 1: 0961 525 450"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-xs font-mono font-light tracking-wide text-stone-300 group-hover:text-white">
                  0961 525 450
                </span>
              </a>
              <a
                href="tel:0938797904"
                className="flex items-center gap-2.5 text-stone-300 hover:text-white transition-colors group py-0.5"
                title="Gọi Hotline 2: 0938 7979 04"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="text-xs font-mono font-light tracking-wide text-stone-300 group-hover:text-white">
                  0938 7979 04
                </span>
              </a>
            </div>
          </div>

          {/* CỘT 2: DANH MỤC (DUY NHẤT 3 ĐẦU MỤC LỚN: NÔNG SẢN, ĐẶC SẢN, THẢO DƯỢC) */}
          <div className="pt-2 md:pt-0 w-full text-left">
            <h4 className="text-[12px] font-heading font-semibold uppercase tracking-[0.15em] text-stone-200 pb-4">
              DANH MỤC
            </h4>

            <ul className="space-y-4 text-xs font-light">
              {mainCategories.map((c, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={c.action}
                    className="text-left text-[#9ca3af] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer font-light leading-relaxed block py-0.5 tracking-wide"
                    aria-label={`Xem danh mục ${c.label}`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: HỖ TRỢ (DUY NHẤT 3 CHÍNH SÁCH: GIAO HÀNG, ĐỔI TRẢ, BẢO MẬT) */}
          <div className="pt-2 md:pt-0 w-full text-left">
            <h4 className="text-[12px] font-heading font-semibold uppercase tracking-[0.15em] text-stone-200 pb-4">
              HỖ TRỢ
            </h4>

            <ul className="space-y-4 text-xs font-light">
              {policies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="text-left text-[#9ca3af] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer font-light leading-relaxed block py-0.5 tracking-wide"
                    aria-label={`Xem chính sách ${p.label}`}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SUB FOOTER / COPYRIGHT BAR (V197):
          - Đẩy sát đáy trang, không có đường kẻ ngăn cách
          - Dòng chữ bản quyền mờ hơn (opacity: 0.4)
          - Khoảng đệm an toàn pb-28 sm:pb-12 đảm bảo 2 nút nổi Zalo & Hotline không che lấp
         ========================================================================= */}
      <div className="px-4 sm:px-6 lg:px-8 text-[11px] font-light max-w-7xl mx-auto pt-8 pb-28 sm:pb-12 flex flex-col items-center justify-center text-center gap-2">
        {onOpenAdmin && (
          <button
            type="button"
            onClick={onOpenAdmin}
            className="hover:text-white font-mono transition-colors duration-300 text-stone-600 text-[10px] cursor-pointer"
          >
            🔒 Admin
          </button>
        )}
        <p className="text-[11px] text-[#9ca3af] opacity-40 font-light tracking-wide text-center select-none">
          © 2024 - 2026 G-ROOSTER CO.,LTD · MST: <span className="font-mono">0319153593</span> · All rights reserved.
        </p>
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
                  <p>1. <strong>Tư cách pháp nhân:</strong> Toàn bộ sản phẩm phân phối trên hệ thống do G-ROOSTER CO.,LTD (MST: 0319153593) quản lý và vận hành theo tiêu chuẩn B2B/B2C Việt Nam.</p>
                  <p>2. <strong>Chính sách giá sỉ:</strong> Bảng 4 mức giá sỉ (Lẻ, Sỉ 1, Sỉ 2, Sỉ 3) áp dụng theo số lượng đóng gói thùng hoặc kg thực tế được hệ thống tự động tính toán minh bạch.</p>
                  <p>3. <strong>Hóa đơn VAT:</strong> Hóa đơn điện tử được xuất theo thông tin doanh nghiệp cung cấp khi hoàn tất chuyển khoản đơn hàng.</p>
                </>
              ) : (
                <>
                  <p>1. <strong>Bảo mật thông tin:</strong> G-ROOSTER CO.,LTD cam kết bảo vệ 100% dữ liệu thông tin cá nhân và thông tin đặt hàng của đối tác và khách hàng.</p>
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
