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
  Copy,
  Building2,
  ChevronDown,
  MessageCircle,
  Share2,
  Truck,
  Sparkles,
  ShoppingBag,
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
  const todayDateStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const [legalModalOpen, setLegalModalOpen] = useState<'terms' | 'privacy' | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopySTK = () => {
    navigator.clipboard.writeText('19039080129011');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  // Tablet & Mobile Accordion state for columns 2, 3 & 4
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    categories: false,
    support: false,
    contact: false,
  });

  const toggleAccordion = (section: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // V191b: Danh mục sản phẩm chính (Cột 2)
  const mainCategories = [
    { label: 'Trà Laka & Bột Matcha Nhật Bản', partnerId: 'matcha-tra-laka' as PartnerId },
    { label: 'Sâm Dây & Thảo Dược Ngọc Linh', partnerId: 'thao-duoc-sam' as PartnerId },
    { label: 'Nước Mía Tuyết & Tắc Tây Ninh', partnerId: 'nuoc-mia-iqf' as PartnerId },
    { label: 'Socola Thủ Công Bến Tre', partnerId: 'socola-qua-tang' as PartnerId },
    { label: 'Bò Khô & Chà Bông Thượng Hạng', partnerId: 'dac-san-snack' as PartnerId },
    { label: 'Cà Phê Mộc & Nông Sản Cầu Đất', partnerId: 'nong-san-say' as PartnerId },
  ];

  // V191b: Chính sách giao hàng, đổi trả, bảo mật (Cột 3)
  const policies = [
    { label: 'Chính sách giao hàng hỏa tốc 2H & Toàn quốc', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Chính sách đổi trả 100% trong 24h', action: () => setLegalModalOpen('terms') },
    { label: 'Chính sách bảo mật thông tin', action: () => setLegalModalOpen('privacy') },
    { label: 'Chính sách xuất hóa đơn điện tử VAT 100%', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Chính sách 4 mức giá sỉ (Thùng & KG)', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Góc công thức pha chế F&B độc quyền', action: () => onScrollToSection('goc-cong-thuc') },
  ];

  return (
    <footer id="main-app-footer" className="w-full relative font-body bg-[#0a140f] text-stone-400 border-t border-white/[0.06]">
      {/* =========================================================================
          MAIN FOOTER (V194: TỐI GIẢN HÓA FOOTER XA XỈ - SIÊU THANH THOÁT):
          1. LOGO G-ROOSTER (Thu nhỏ 70%, đơn sắc Trắng/Xám nhạt) + Slogan ngắn gọn
          2. DANH MỤC (Font-weight 500/600 cho tiêu đề, 300 cho đường link, giãn dòng thoáng)
          3. HỖ TRỢ (Xóa bỏ đường kẻ ngang không cần thiết, liền mạch nhẹ nhàng)
          4. Smooth Transitions 0.3s cho tất cả liên kết hover
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 items-start">
          
          {/* CỘT 1: LOGO G-ROOSTER ĐƠN SẮC (70%) + SLOGAN NGẮN GỌN */}
          <div className="text-left flex flex-col items-start w-full">
            <div className="flex items-center text-left mb-2.5">
              <ChutChiuLogo size="xs" monochrome={true} />
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm mt-1">
              Hệ thống phân phối Nông sản &amp; Đặc sản cao cấp chuẩn xuất khẩu. Kết nối trực tiếp vùng nguyên liệu độc quyền tới đối tác F&amp;B toàn quốc.
            </p>

            <div className="text-[11px] text-stone-500 font-light mt-3 space-y-1">
              <p>MST: <span className="font-mono text-stone-400 font-normal">0319153593</span> · G-ROOSTER CO.,LTD</p>
              <p>Tiêu chuẩn VSATTP · HACCP · ISO 22000</p>
            </div>
          </div>

          {/* CỘT 2: DANH MỤC */}
          <div className="pt-2 md:pt-0 w-full text-left">
            <h4 className="text-xs sm:text-[13px] font-heading font-medium uppercase tracking-wider text-stone-200 pb-3 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-stone-300 shrink-0" strokeWidth={1.5} />
              <span>DANH MỤC</span>
            </h4>

            <ul className="space-y-3 text-xs text-stone-400 font-light">
              {mainCategories.map((c, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPartner(c.partnerId);
                      const el = document.getElementById('catalog-product-grid') || document.getElementById('chinh-sach-si');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 text-left text-stone-400 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer group py-0.5"
                    aria-label={`Xem dòng sản phẩm ${c.label}`}
                  >
                    <span className="text-stone-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all duration-300 text-[11px] font-light">›</span>
                    <span className="group-hover:text-white transition-colors duration-300 font-light leading-relaxed">
                      {c.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: HỖ TRỢ */}
          <div className="pt-2 md:pt-0 w-full text-left">
            <h4 className="text-xs sm:text-[13px] font-heading font-medium uppercase tracking-wider text-stone-200 pb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-300 shrink-0" strokeWidth={1.5} />
              <span>HỖ TRỢ</span>
            </h4>

            <ul className="space-y-3 text-xs text-stone-400 font-light">
              {policies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="flex items-center gap-1.5 text-left text-stone-400 hover:text-white transition-colors duration-300 ease-in-out cursor-pointer group py-0.5"
                    aria-label={`Đi tới ${p.label}`}
                  >
                    <span className="text-stone-500 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all duration-300 text-[11px] font-light">›</span>
                    <span className="group-hover:text-white transition-colors duration-300 font-light leading-relaxed">
                      {p.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SUB FOOTER (V194):
          - Xóa bỏ mọi đường kẻ thô, thay bằng đường viền mờ siêu mỏng
          - Hotline mảnh mai, liên kết pháp lý nhẹ nhàng
          - Copyright bar cực kỳ nhỏ gọn (11px), canh giữa, màu chữ mờ
          - Đệm đáy an toàn pb-28 sm:pb-8 để không bị che khuất
         ========================================================================= */}
      <div className="border-t border-white/[0.04] px-4 sm:px-6 lg:px-8 text-[11px] sm:text-xs text-stone-500 font-light max-w-7xl mx-auto py-5 pb-28 sm:pb-8 flex flex-col items-center justify-center text-center gap-2.5">
        {/* Dòng Hotline & Links hỗ trợ mảnh mai */}
        <div className="text-stone-400 font-light flex items-center gap-2 flex-wrap justify-center leading-relaxed">
          <span>Hotline hỗ trợ:</span>
          <a
            href="tel:0961525450"
            className="text-stone-300 hover:text-white font-mono font-normal transition-colors duration-300"
          >
            0961 525 450
          </a>
          <span className="text-stone-600">·</span>
          <a
            href="tel:0938797904"
            className="text-stone-300 hover:text-white font-mono font-normal transition-colors duration-300"
          >
            0938 7979 04
          </a>
          <span className="text-stone-600 hidden sm:inline">·</span>
          <button
            type="button"
            onClick={() => setLegalModalOpen('terms')}
            className="hover:text-white transition-colors duration-300 cursor-pointer"
          >
            Điều khoản
          </button>
          <span className="text-stone-600">·</span>
          <button
            type="button"
            onClick={() => setLegalModalOpen('privacy')}
            className="hover:text-white transition-colors duration-300 cursor-pointer"
          >
            Bảo mật
          </button>
          {onOpenAdmin && (
            <>
              <span className="text-stone-600">·</span>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hover:text-white font-mono transition-colors duration-300 text-stone-500"
              >
                🔒 Admin
              </button>
            </>
          )}
        </div>

        {/* Copyright Bar: Nhỏ gọn (11px), canh giữa, màu chữ mờ */}
        <p className="text-[11px] text-stone-500/70 font-light tracking-wide text-center">
          © 2024 - 2026 G-ROOSTER CO.,LTD · MST: <span className="font-mono text-stone-500">0319153593</span> · All rights reserved.
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
