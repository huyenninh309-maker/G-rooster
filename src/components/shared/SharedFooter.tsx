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
    <footer id="main-app-footer" className="w-full relative font-body bg-[#0a140f] text-stone-400 border-t border-[#162e20]">
      {/* =========================================================================
          MAIN FOOTER (V192: 3 CỘT RÕ RỆT CHUẨN MINIMALIST LUXURY):
          1. VỀ G-ROOSTER (Các link chính sách ngắn gọn)
          2. DANH MỤC (Các dòng sản phẩm chính)
          3. LIÊN HỆ (Địa chỉ, Hotline, Email, VietQR - Icon mảnh tinh tế)
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-10 items-start">
          
          {/* CỘT 1: VỀ G-ROOSTER */}
          <div className="text-left flex flex-col items-start w-full">
            <div className="flex items-center text-left mb-2">
              <ChutChiuLogo size="md" />
            </div>

            <div className="space-y-1 text-xs text-stone-400 font-light mb-3">
              <p className="flex items-center gap-1.5 text-stone-300 font-medium">
                <Building2 className="w-3.5 h-3.5 text-amber-300 shrink-0" strokeWidth={1.5} />
                <span>G-ROOSTER CO.,LTD</span>
                <span className="text-stone-500">•</span>
                <span className="font-mono text-stone-400 text-[11px]">MST: 0319153593</span>
              </p>
              <p className="text-[11px] text-stone-400">
                Tiêu chuẩn VSATTP • HACCP • ISO 22000
              </p>
            </div>

            <h4 className="text-[11px] sm:text-xs font-heading font-bold uppercase tracking-wider text-amber-300/90 pb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" strokeWidth={1.5} />
              <span>Chính sách &amp; Hỗ trợ</span>
            </h4>

            {/* Danh sách link chính sách ngắn gọn */}
            <ul className="space-y-1 text-xs text-stone-300 font-light">
              {policies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="flex items-center gap-1.5 text-left text-stone-300 hover:text-amber-300 transition-colors cursor-pointer py-0.5 group"
                    aria-label={`Đi tới ${p.label}`}
                  >
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform text-[11px] font-bold">›</span>
                    <span className="text-stone-300 group-hover:text-amber-300 transition-colors">
                      {p.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 2: DANH MỤC */}
          <div className="pt-3 border-t border-stone-800/80 md:pt-0 md:border-t-0 w-full text-left">
            <h4 className="text-xs sm:text-[13px] font-heading font-bold uppercase tracking-wider text-amber-300/90 pb-2 flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-amber-300 shrink-0" strokeWidth={1.5} />
              <span>Danh Mục Sản Phẩm</span>
            </h4>

            <ul className="space-y-1.5 text-xs text-stone-300 font-light">
              {mainCategories.map((c, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPartner(c.partnerId);
                      const el = document.getElementById('catalog-product-grid') || document.getElementById('chinh-sach-si');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1.5 text-left text-stone-300 hover:text-amber-300 transition-colors cursor-pointer py-0.5 group"
                    aria-label={`Xem dòng sản phẩm ${c.label}`}
                  >
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform text-[11px] font-bold">›</span>
                    <span className="text-stone-300 group-hover:text-amber-300 transition-colors">
                      {c.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: LIÊN HỆ */}
          <div className="pt-3 border-t border-stone-800/80 md:pt-0 md:border-t-0 w-full text-left">
            <h4 className="text-xs sm:text-[13px] font-heading font-bold uppercase tracking-wider text-amber-300/90 pb-2 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" strokeWidth={1.5} />
              <span>Thông Tin Liên Hệ</span>
            </h4>

            <div className="space-y-2 text-xs text-stone-300 font-light">
              {/* Địa chỉ */}
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>
                  <strong className="text-stone-200 font-medium">Kho Q.1:</strong> 44 Trần Đình Xu, P. Cầu Ông Lãnh, TP.HCM
                </span>
              </div>

              {/* Hotline */}
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" strokeWidth={1.5} />
                <span className="flex items-center flex-wrap gap-1">
                  <strong className="text-stone-200 font-medium">Hotline:</strong>{' '}
                  <a href="tel:0961525450" className="text-amber-300 hover:underline font-mono font-medium" aria-label="Gọi 0961 525 450">
                    0961 525 450
                  </a>
                  <span className="text-stone-600">-</span>
                  <a href="tel:0938797904" className="text-amber-300 hover:underline font-mono font-medium" aria-label="Gọi 0938 7979 04">
                    0938 7979 04
                  </a>
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" strokeWidth={1.5} />
                <span>
                  <strong className="text-stone-200 font-medium">Email:</strong>{' '}
                  <a href="mailto:groostercompany@gmail.com" className="text-stone-300 hover:text-amber-300 font-mono hover:underline" aria-label="Gửi email cho G-ROOSTER">
                    groostercompany@gmail.com
                  </a>
                </span>
              </div>

              {/* VietQR Bank Info (Khung tối thanh lịch) */}
              <div className="mt-2.5 p-2 rounded-xl bg-[#14231b] border border-[#234230] font-heading">
                <div className="flex items-center gap-2">
                  <div className="w-[62px] h-[62px] shrink-0 bg-white p-0.5 rounded-lg border border-stone-700 flex items-center justify-center">
                    <img
                      src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                      alt="VietQR Techcombank Nguyễn Đức Trung"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0 text-left space-y-0.5">
                    <div className="flex items-center justify-between gap-1 whitespace-nowrap">
                      <span className="font-heading font-bold text-amber-300 text-[11px]">
                        Techcombank
                      </span>
                      <span className="text-[8px] font-semibold text-emerald-300 bg-emerald-950 px-1 py-0.2 rounded border border-emerald-800">
                        VietQR 24/7
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-1 text-[10px] whitespace-nowrap">
                      <span className="font-mono text-white font-bold text-[11px]">
                        19039080129011
                      </span>
                      <button
                        type="button"
                        onClick={handleCopySTK}
                        className="p-0.5 rounded text-stone-400 hover:text-amber-300 hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
                        title={copiedBank ? "Đã sao chép STK" : "Sao chép số tài khoản"}
                        aria-label="Sao chép số tài khoản Techcombank"
                      >
                        {copiedBank ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    <div className="text-[9px] text-stone-400 font-bold uppercase truncate">
                      NGUYỄN ĐỨC TRUNG
                    </div>

                    <div className="pt-0.5 border-t border-stone-800 flex items-center justify-between text-[8px] text-stone-400 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5 text-amber-300 shrink-0" strokeWidth={1.5} />
                        <span>1$ ≈ {formattedRate}₫</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social buttons */}
              <div className="flex items-center gap-1.5 pt-1">
                <a
                  href="https://zalo.me/0961525450"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nhắn tin Zalo OA G-ROOSTER"
                  className="flex-1 py-1 px-2 rounded-lg bg-[#14231b] hover:bg-emerald-900 border border-[#234230] text-stone-200 text-[10.5px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <MessageCircle className="w-3 h-3 text-blue-400" strokeWidth={1.5} />
                  <span>Zalo OA</span>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Truy cập Facebook G-ROOSTER"
                  className="flex-1 py-1 px-2 rounded-lg bg-[#14231b] hover:bg-emerald-900 border border-[#234230] text-stone-200 text-[10.5px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3 h-3 text-amber-400" strokeWidth={1.5} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          3. SUB FOOTER (MỎNG 20PX - TINH GỌN, CHUẨN ĐỒNG BỘ THẨM MỸ V121 & V136):
          - Dòng kẻ mảnh phân cách phía trên mt-2
          - Copyright bên trái
          - Link pháp lý và admin bên phải
          - Khoảng đệm an toàn đáy pb-[200px] trên mobile và pb-3 trên desktop tránh bị nút Hotline/Zalo nổi che chữ
         ========================================================================= */}
      <div
        className="border-t border-stone-800 px-4 sm:px-6 lg:px-8 text-[11px] text-stone-400 max-w-7xl mx-auto mt-1.5 py-3 min-h-[20px] pb-[120px] sm:pb-4"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          {/* Copyright bên trái */}
          <div className="leading-tight text-stone-400">
            © 2024 - 2026 <strong className="font-heading font-bold text-stone-200">G-ROOSTER CO.,LTD</strong>. MST: <span className="font-mono text-amber-300 font-medium">0319153593</span>.
          </div>

          {/* Các link pháp lý bên phải */}
          <div className="flex items-center flex-wrap justify-center gap-3 text-stone-400 leading-tight">
            <button
              type="button"
              onClick={() => setLegalModalOpen('terms')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
              aria-label="Xem điều khoản sử dụng"
            >
              Điều khoản sử dụng
            </button>
            <span className="text-stone-700">•</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
              aria-label="Xem chính sách bảo mật"
            >
              Chính sách bảo mật
            </button>

            {onOpenAdmin && (
              <>
                <span className="text-stone-700">•</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-amber-300 font-mono transition-colors flex items-center gap-1 cursor-pointer text-stone-400"
                  title="Phòng Quản Trị Tổng Lực G-ROOSTER"
                  aria-label="Mở Phòng Quản Trị Tổng Lực (/admin)"
                >
                  <span>🔒 Phòng Quản Trị (/admin)</span>
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
