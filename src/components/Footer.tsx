import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  CreditCard,
  FileCheck,
  ShieldCheck,
  Phone,
  Truck,
  RotateCcw,
  Receipt,
  BookOpen,
  Handshake,
  MessageCircle,
  Share2,
  Check,
  Globe,
  ArrowRight,
  Sparkles,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { PartnerId, ExchangeRateInfo } from '../types';
import { ChutChiuLogo } from './ChutChiuLogo';

interface FooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  rateInfo?: ExchangeRateInfo;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPartner,
  onScrollToSection,
  onOpenAdmin,
  rateInfo,
}) => {
  const formattedRate = rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964';
  const [legalModalOpen, setLegalModalOpen] = useState<'terms' | 'privacy' | null>(null);

  const productCategories: { name: string; partnerId?: PartnerId; note: string }[] = [
    { name: 'Matcha & Trà Cascara Cầu Đất', partnerId: 'viet-thao-nhien', note: 'Việt Thảo Nhiên' },
    { name: 'Nước Mía Tuyết IQF -40°C', partnerId: 'vua-mia', note: 'Vua Mía' },
    { name: 'Cà Phê Viên Sấy Thăng Hoa', partnerId: 'non-la-aodai', note: 'Nón Lá & AODAI' },
    { name: 'Chà Bông & Khô Bò Thượng Hạng', partnerId: 'phu-nha', note: 'Đặc Sản Phú Nhã' },
    { name: 'Sâm Dây & Tam Thất Ngọc Linh', partnerId: 'thao-duoc-dato', note: 'Thảo Dược DATO' },
    { name: 'Tất Cả 62+ Nông Đặc Sản Xuất Khẩu', note: 'Đạt chuẩn OCOP & HACCP' },
  ];

  const supportPolicies = [
    { label: 'Chính sách 4 mức giá sỉ (Thùng & KG)', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Giao hàng hỏa tốc 2H & Toàn quốc', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Xuất hóa đơn điện tử VAT 100%', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Chính sách đổi trả 100% trong 24h', action: () => onScrollToSection('chinh-sach-si') },
    { label: 'Góc công thức pha chế F&B độc quyền', action: () => onScrollToSection('goc-cong-thuc') },
    { label: 'Hành trình ký kết & Hợp tác chiến lược', action: () => onScrollToSection('hanh-trinh-doi-tac') },
  ];

  return (
    <footer
      id="main-app-footer"
      className="bg-gradient-to-b from-[#082a17] via-[#051c0f] to-[#03130a] text-white border-t-2 border-[#d4af37]/40 relative font-body"
    >
      {/* Brand Ribbon Mảnh Mai */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

      {/* =========================================================================
          SECTION CTA BUSINESS (TRÊN CÙNG FOOTER):
          - Khối màu nền nhẹ, chữ đậm: 'TÌM NGUỒN HÀNG NÔNG SẢN & ĐẶC SẢN ỔN ĐỊNH?'
          - Bên dưới là câu mời gọi hợp tác và nút [ LIÊN HỆ HỢP TÁC ] thiết kế sang trọng.
         ========================================================================= */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#062415] via-[#09351d] to-[#062415] py-7 sm:py-9 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          {/* Nội dung mời gọi hợp tác B2B */}
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-[#d4af37]/40 text-[#f9df90] text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Giải Pháp Cung Ứng B2B Toàn Diện</span>
            </div>
            
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white font-heading tracking-tight leading-snug">
              TÌM NGUỒN HÀNG NÔNG SẢN &amp; ĐẶC SẢN ỔN ĐỊNH?
            </h3>
            
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-2xl">
              CHÚT CHÍU CO.,LTD cam kết cung ứng nguồn hàng chuẩn hóa xuất khẩu, hóa đơn VAT đầy đủ, chính sách chiết khấu lũy tiến 4 mức giá sỉ ưu đãi nhất cho chuỗi F&amp;B và nhà phân phối toàn quốc.
            </p>
          </div>

          {/* Nút [ LIÊN HỆ HỢP TÁC ] Sang Trọng */}
          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://zalo.me/0961525450"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c69f2e] to-[#b89228] hover:brightness-110 text-stone-950 font-heading font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-[#d4af37]/20 transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>LIÊN HỆ HỢP TÁC</span>
              <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="tel:0961525450"
              className="px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-stone-200 hover:text-amber-300 font-heading font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#d4af37]" />
              <span className="font-mono">0961 525 450</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FOOTER MAIN (4 CỘT DOANH NGHIỆP):
          - Desktop: 4 Cột ngang cân đối 100%
          - Tablet: 2x2
          - Mobile: 1 Cột xếp chồng thông thoáng
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-8 items-start">
          
          {/* =====================================================================
              CỘT 1 (CHUTCHIU): Logo nhỏ + Mô tả ngắn gọn về doanh nghiệp
             ===================================================================== */}
          <div className="space-y-3.5">
            {/* Logo nhỏ & Tên */}
            <div className="flex items-center gap-3">
              <ChutChiuLogo size="sm" />
              <div>
                <h4 className="text-sm sm:text-[15px] font-extrabold text-[#D4AF37] uppercase tracking-wider font-heading leading-tight">
                  CHUTCHIU CO.,LTD
                </h4>
                <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5 font-light">
                  Nông Sản &amp; Đặc Sản Cao Cấp
                </p>
              </div>
            </div>

            {/* Mô tả ngắn gọn về doanh nghiệp */}
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Hệ thống phân phối chiến lược Nông sản &amp; Đặc sản tuyển chọn từ các vùng trồng danh tiếng (Lâm Đồng, Kon Tum, Tây Ninh, Chợ Mới). Kết nối trực tiếp chuỗi cung ứng chuẩn xuất khẩu tới người tiêu dùng và đối tác B2B.
            </p>

            {/* Pháp lý doanh nghiệp */}
            <div className="space-y-2 text-xs text-stone-300 pt-1 border-t border-white/10 font-light">
              <div className="flex items-start gap-2">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium text-stone-200">MST:</strong>{' '}
                  <span className="font-mono text-amber-300 font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-medium text-stone-200">Kho Quận 1:</strong> 44 Trần Đình Xu, P. Cô Giang, Q.1, TP.HCM
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Đạt chuẩn HACCP • ISO • VietGAP • OCOP</span>
              </div>
            </div>
          </div>

          {/* =====================================================================
              CỘT 2 (SẢN PHẨM): Liệt kê các danh mục chính (Matcha, Nước mía, Cà phê...)
             ===================================================================== */}
          <div className="space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 font-heading">
              <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Danh Mục Sản Phẩm</span>
            </h4>

            <ul className="space-y-2 text-xs text-stone-300 font-light">
              {productCategories.map((cat, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      if (cat.partnerId) {
                        onSelectPartner(cat.partnerId);
                      } else {
                        onSelectPartner('all');
                      }
                      onScrollToSection('san-pham');
                    }}
                    className="group flex items-start gap-2 text-left hover:text-amber-300 transition-colors w-full cursor-pointer py-0.5"
                  >
                    <span className="text-amber-400/80 group-hover:translate-x-0.5 transition-transform text-[11px] mt-0.5">›</span>
                    <div>
                      <span className="text-stone-200 group-hover:text-amber-300 font-medium transition-colors block">
                        {cat.name}
                      </span>
                      <span className="text-[10px] text-stone-400 group-hover:text-amber-200/70 transition-colors">
                        {cat.note}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================================
              CỘT 3 (HỖ TRỢ): Các chính sách đặt hàng, giao hàng, bảo hành...
             ===================================================================== */}
          <div className="space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 font-heading">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Chính Sách &amp; Hỗ Trợ</span>
            </h4>

            <ul className="space-y-2.5 text-xs text-stone-300 font-light">
              {supportPolicies.map((p, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={p.action}
                    className="flex items-center gap-2 text-left hover:text-amber-300 transition-colors cursor-pointer w-full group py-0.5"
                  >
                    <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform text-[11px]">›</span>
                    <span className="text-stone-300 group-hover:text-amber-300 transition-colors">
                      {p.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-white/10 text-[11px] text-stone-400 font-light">
              Cam kết đồng hành và hỗ trợ chiết khấu thanh toán linh hoạt cho khách hàng thân thiết.
            </div>
          </div>

          {/* =====================================================================
              CỘT 4 (LIÊN HỆ): Email, Hotline, Địa chỉ Quận 1, link Zalo/Facebook + QR
             ===================================================================== */}
          <div className="space-y-3.5">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 font-heading">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Thông Tin Liên Hệ</span>
            </h4>

            {/* Chi tiết liên hệ */}
            <div className="space-y-2 text-xs text-stone-300 font-light">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong className="text-stone-200 font-medium">Email:</strong>{' '}
                  <a href="mailto:chutchiucompany@gmail.com" className="hover:text-amber-300 hover:underline transition-colors font-mono">
                    chutchiucompany@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-stone-200 font-medium">Hotline B2B:</strong>{' '}
                  <a href="tel:0961525450" className="text-amber-300 font-bold hover:underline font-mono">
                    0961 525 450
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-stone-200 font-medium">Văn phòng / Kho:</strong> 44 Trần Đình Xu, P. Cô Giang, Q.1, TP.HCM
                </span>
              </div>
            </div>

            {/* Thẻ thanh toán QR & Tỷ giá USD Open Exchange API */}
            <div className="p-3 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/10 space-y-2 shadow-lg">
              <div className="flex items-center gap-2.5">
                {/* QR Code */}
                <div className="w-[68px] h-[68px] shrink-0 rounded-lg bg-white p-1 shadow-md border border-white/20 flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                    alt="Mã QR Techcombank Nguyễn Đức Trung"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Thông tin tài khoản */}
                <div className="min-w-0 space-y-0.5 text-xs text-stone-200">
                  <div className="text-[11.5px] font-bold text-white flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[#D4AF37]">Techcombank</span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-red-600/30 text-red-300 border border-red-500/30">24/7</span>
                  </div>

                  <div className="flex items-center gap-1 whitespace-nowrap text-[11px]">
                    <span className="text-stone-400">STK:</span>
                    <span className="font-mono text-amber-300 font-bold">19039080129011</span>
                  </div>

                  <div className="text-[10.5px] text-stone-300 uppercase font-semibold whitespace-nowrap">
                    NGUYEN DUC TRUNG
                  </div>

                  <div className="text-[9px] text-emerald-300 flex items-center gap-1 whitespace-nowrap">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Quét mã thanh toán tự động</span>
                  </div>
                </div>
              </div>

              {/* Tỷ giá USD Open Exchange API */}
              <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-1 text-[10.5px] text-stone-300 font-light">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Globe className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Tỷ giá USD:</span>
                  <span className="text-amber-300 font-mono font-bold">1$ ≈ {formattedRate}₫</span>
                </div>
                <span className="text-[8.5px] text-stone-400 font-mono italic whitespace-nowrap">
                  (Live API)
                </span>
              </div>
            </div>

            {/* Mạng xã hội Zalo OA & Facebook */}
            <div className="pt-1 flex items-center gap-2">
              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 flex-1 py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-amber-400 text-stone-200 hover:text-amber-300 text-[11px] font-semibold transition-all cursor-pointer"
                title="Chat Zalo Doanh Nghiệp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Zalo OA</span>
              </a>

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 flex-1 py-1.5 px-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 hover:border-amber-400 text-stone-200 hover:text-amber-300 text-[11px] font-semibold transition-all cursor-pointer"
                title="Facebook Chút Chíu"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          BOTTOM FOOTER:
          - Dòng Copyright bên trái
          - Các link pháp lý (Điều khoản, Bảo mật, Quản trị) bên phải
          - VÙNG ĐỆM AN TOÀN ĐÁY (PADDING-BOTTOM: 220PX) ĐỂ TRÁNH CHE NÚT NỔI
         ========================================================================= */}
      <div
        className="border-t border-white/10 px-4 sm:px-6 lg:px-8 text-[11px] text-stone-400 max-w-7xl mx-auto"
        style={{ paddingTop: '18px', paddingBottom: '220px' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Dòng Copyright bên trái */}
          <div className="font-light">
            © 2024 - 2026 <strong className="font-heading font-bold text-stone-200">CHUTCHIU CO.,LTD</strong>. All rights reserved. MST: <span className="font-mono text-amber-300/90 font-medium">0319153593</span>.
          </div>

          {/* Các link pháp lý bên phải */}
          <div className="flex items-center flex-wrap justify-center gap-4 text-stone-400 font-light">
            <button
              type="button"
              onClick={() => setLegalModalOpen('terms')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Điều khoản sử dụng
            </button>
            <span className="text-stone-700">•</span>
            <button
              type="button"
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Chính sách bảo mật
            </button>
            
            {onOpenAdmin && (
              <>
                <span className="text-stone-700">•</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-amber-300 text-stone-400 font-mono transition-colors flex items-center gap-1 cursor-pointer"
                  title="Truy cập trang Quản trị đơn hàng"
                >
                  <span>📦 Quản trị đơn hàng (/admin)</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal Pháp Lý: Điều khoản & Bảo mật (Đơn giản, sang trọng) */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#072617] text-white rounded-2xl max-w-lg w-full p-6 border border-[#d4af37]/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-[#d4af37]">
                {legalModalOpen === 'terms' ? 'Điều Khoản Sử Dụng - CHUTCHIU CO.,LTD' : 'Chính Sách Bảo Mật - CHUTCHIU CO.,LTD'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModalOpen(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-stone-300 space-y-2.5 max-h-72 overflow-y-auto leading-relaxed pr-1 font-light">
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

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalOpen(null)}
                className="px-4 py-2 rounded-xl bg-[#d4af37] text-stone-950 font-heading font-bold text-xs hover:brightness-110 transition-all cursor-pointer"
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
