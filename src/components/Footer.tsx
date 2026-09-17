import React from 'react';
import {
  Building2,
  MapPin,
  Mail,
  CreditCard,
  FileCheck,
  ShieldCheck,
  Zap,
  Award,
  ExternalLink,
} from 'lucide-react';
import { PartnerId } from '../types';
import { ChutChiuLogo } from './ChutChiuLogo';

interface FooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectPartner,
  onScrollToSection,
  onOpenAdmin,
}) => {
  return (
    <footer className="bg-gradient-to-b from-[#082a17] via-[#051c0f] to-[#03130a] text-white border-t-2 border-[#d4af37]/40 relative">
      {/* Brand Blue & Green Decorative Top Edge */}
      <div className="h-1 w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

      {/* Main Footer Container: Thứ tự chuẩn hóa theo yêu cầu:
          1. Logo công ty
          2. Thông tin pháp lý (12px)
          3. Hệ sinh thái đối tác dạng thu gọn
          4. QR Thanh toán làm thật nhỏ và tinh tế ở cuối cùng
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* PHẦN 1 & 2: LOGO CÔNG TY & THÔNG TIN PHÁP LÝ (CHỮ NHỎ 12PX) */}
          <div className="lg:col-span-5 space-y-3">
            {/* 1. Logo công ty */}
            <div className="flex items-center gap-3">
              <ChutChiuLogo size="lg" />
            </div>

            {/* 2. Thông tin pháp lý doanh nghiệp (Chữ nhỏ 12px) */}
            <div className="space-y-1.5 text-[12px] text-stone-300 leading-relaxed border-t border-emerald-900/60 pt-2.5">
              <div className="text-[12px] font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Building2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Thông Tin Pháp Lý Doanh Nghiệp</span>
              </div>
              <p className="text-white font-bold text-[13px]">
                Công ty TNHH TMDV Chút Chíu
              </p>
              
              <div className="flex items-start gap-2 pt-0.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Mã Số Thuế (MST):</strong>{' '}
                  <span className="font-mono text-amber-300 font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Địa chỉ trụ sở &amp; Kho:</strong> 44 Trần Đình Xu, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:chutchiucompany@gmail.com"
                    className="text-amber-300 hover:underline"
                  >
                    chutchiucompany@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* PHẦN 3: KHỐI HỆ SINH THÁI ĐỐI TÁC DẠNG DANH SÁCH THU GỌN */}
          <div className="lg:col-span-4 space-y-2.5 border-t lg:border-t-0 border-emerald-900/60 pt-4 lg:pt-0">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <Award className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Hệ Sinh Thái Đối Tác Chiến Lược</span>
            </div>

            <ul className="space-y-1.5 text-[11.5px] text-stone-300">
              <li>
                <button
                  onClick={() => onSelectPartner('viet-thao-nhien')}
                  className="hover:text-amber-300 transition-colors text-left flex items-start gap-1.5 group w-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform mt-1.5 shrink-0" />
                  <span className="line-clamp-1">
                    <strong className="text-white">1. VIỆT THẢO NHIÊN:</strong> Matcha Laka, Trà Cascara, Nước cốt quả cà phê
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPartner('vua-mia')}
                  className="hover:text-amber-300 transition-colors text-left flex items-start gap-1.5 group w-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform mt-1.5 shrink-0" />
                  <span className="line-clamp-1">
                    <strong className="text-white">2. VUA MÍA:</strong> Nước Mía Tuyết (Thùng 28 gói) - Cấp đông nhanh
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPartner('thao-duoc-dato')}
                  className="hover:text-amber-300 transition-colors text-left flex items-start gap-1.5 group w-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform mt-1.5 shrink-0" />
                  <span className="line-clamp-1">
                    <strong className="text-white">3. THẢO DƯỢC DATO:</strong> Sâm dây Ngọc Linh, Mật ong rừng, Trà thảo mộc
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPartner('non-la-aodai')}
                  className="hover:text-amber-300 transition-colors text-left flex items-start gap-1.5 group w-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform mt-1.5 shrink-0" />
                  <span className="line-clamp-1">
                    <strong className="text-white">4. NÓN LÁ &amp; AODAI:</strong> Cà phê sấy thăng hoa, Cà phê hạt/bột
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPartner('phu-nha')}
                  className="hover:text-amber-300 transition-colors text-left flex items-start gap-1.5 group w-full"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform mt-1.5 shrink-0" />
                  <span className="line-clamp-1">
                    <strong className="text-white">5. ĐẶC SẢN PHÚ NHÃ:</strong> Chà bông heo/gà, khô heo/bò xé cay
                  </span>
                </button>
              </li>
            </ul>

            {/* 3 Huy hiệu bảo đảm thu gọn mỏng nhẹ */}
            <div className="pt-2 flex items-center flex-wrap gap-2 text-[10px] text-stone-400">
              <span className="inline-flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <Zap className="w-2.5 h-2.5 text-amber-300 shrink-0" />
                Kho Q.1 xuất nhanh
              </span>
              <span className="inline-flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                Tặng công thức trọn đời
              </span>
              <span className="inline-flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                <ShieldCheck className="w-2.5 h-2.5 text-[#d4af37] shrink-0" />
                Đổi trả 100% an tâm
              </span>
            </div>
          </div>

          {/* PHẦN 4: KHỐI QR THANH TOÁN LÀM THẬT NHỎ VÀ TINH TẾ Ở CUỐI CÙNG */}
          <div className="lg:col-span-3 space-y-2 border-t lg:border-t-0 border-emerald-900/60 pt-4 lg:pt-0">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>QR Thanh Toán &amp; Ngân Hàng</span>
            </div>

            {/* Khối QR nhỏ gọn, tinh tế */}
            <div className="p-2.5 bg-emerald-950/70 rounded-xl border border-emerald-800/80 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="bg-white p-1 rounded-lg shrink-0 border border-emerald-700 shadow-2xs">
                  <img
                    src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                    alt="Mã QR Chuyển Khoản Techcombank - NGUYEN DUC TRUNG"
                    referrerPolicy="no-referrer"
                    className="w-13 h-13 object-contain rounded"
                  />
                </div>
                <div className="space-y-0.5 text-[11px] min-w-0">
                  <div className="text-stone-300 truncate">
                    Ngân hàng: <strong className="text-white">Techcombank</strong>
                  </div>
                  <div className="text-stone-300 truncate">
                    STK: <strong className="font-mono text-amber-300 font-bold">19039080129011</strong>
                  </div>
                  <div className="text-stone-300 truncate text-[10.5px]">
                    Chủ TK: <strong className="text-white uppercase">NGUYEN DUC TRUNG</strong>
                  </div>
                </div>
              </div>
              <div className="text-[9.5px] text-emerald-300 flex items-center gap-1 pt-1 border-t border-emerald-900/80">
                <span>✓ Quét VietQR 24/7 • Xuất VAT chuỗi quán F&amp;B</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar Nhỏ Gọn */}
      <div className="border-t border-emerald-950/80 py-3 px-4 text-center text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-1.5 max-w-7xl mx-auto">
        <p>
          © 2024 - 2026 <strong>Công ty TNHH TMDV Chút Chíu</strong> (MST: 0319153593). Nông sản cao cấp chuẩn xuất khẩu.
        </p>
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[10.5px]"
          >
            <span>📦 Quản trị đơn hàng (/admin)</span>
          </button>
        )}
      </div>
    </footer>
  );
};
