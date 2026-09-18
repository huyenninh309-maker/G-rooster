import React from 'react';
import {
  Building2,
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
      {/* Brand Decorative Top Edge */}
      <div className="h-1 w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

      {/* Strategic Partners Strip: Dòng đối tác tinh gọn duy nhất thay cho danh sách dài */}
      <div className="border-b border-emerald-900/60 bg-[#041a0e]/90 px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-stone-300">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-[#d4af37] flex items-center gap-1 text-[11.5px] uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Đối tác chiến lược:</span>
            </span>
            <div className="inline-flex items-center gap-1 flex-wrap">
              <button
                onClick={() => onSelectPartner('viet-thao-nhien')}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-stone-100 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Việt Thảo Nhiên
              </button>
              <span className="text-stone-500">•</span>
              <button
                onClick={() => onSelectPartner('vua-mia')}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-stone-100 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Vua Mía
              </button>
              <span className="text-stone-500">•</span>
              <button
                onClick={() => onSelectPartner('thao-duoc-dato')}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-stone-100 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Thảo Dược DATO
              </button>
              <span className="text-stone-500">•</span>
              <button
                onClick={() => onSelectPartner('non-la-aodai')}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-stone-100 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Nón Lá Coffee
              </button>
              <span className="text-stone-500">•</span>
              <button
                onClick={() => onSelectPartner('phu-nha')}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-stone-100 font-semibold text-[11px] transition-colors cursor-pointer"
              >
                Đặc Sản Phú Nhã
              </button>
            </div>
            <span className="text-amber-300 font-medium text-[11px]">
              và hơn 50+ đơn vị cung ứng hàng đầu.
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Container: 3 Cột Rõ Ràng (Thông Tin Pháp Lý | Chính Sách | Liên Hệ & Thanh Toán) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          
          {/* CỘT 1: THÔNG TIN PHÁP LÝ */}
          <div className="space-y-3">
            <ChutChiuLogo size="md" />

            <div className="space-y-2 text-[12px] text-stone-300 leading-relaxed pt-1">
              <div className="text-[12px] font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Thông Tin Pháp Lý Doanh Nghiệp</span>
              </div>
              <p className="text-white font-bold text-[13px]">
                Công ty TNHH TMDV Chút Chíu
              </p>
              
              <div className="flex items-start gap-2">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Mã Số Thuế (MST):</strong>{' '}
                  <span className="font-mono text-amber-300 font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Trụ sở &amp; Kho hàng:</strong> 44 Trần Đình Xu, P. Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh
                </span>
              </div>

              <div className="flex items-start gap-2 text-stone-400 text-[11px] pt-1 border-t border-emerald-900/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hệ thống phân phối B2B/B2C nông sản cao cấp kiểm định chuẩn VSATTP &amp; Xuất khẩu.</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: CHÍNH SÁCH */}
          <div className="space-y-3 border-t md:border-t-0 border-emerald-900/60 pt-4 md:pt-0">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Chính Sách &amp; Hỗ Trợ Khách Hàng</span>
            </div>

            <ul className="space-y-2 text-[12px] text-stone-300">
              <li>
                <button
                  onClick={() => onScrollToSection('chinh-sach-si')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <Receipt className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Chính sách giá sỉ 4 mức tự động &amp; Hóa đơn VAT</span>
                </button>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Giao hỏa tốc 2H nội thành &amp; Toàn quốc</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Đổi trả 100% trong 24h nếu lỗi do bảo quản/vận chuyển</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('goc-cong-thuc')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-2 text-left cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>Tặng trọn bộ công thức pha chế &amp; Tối ưu cost F&amp;B</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CỘT 3: LIÊN HỆ & THANH TOÁN */}
          <div className="space-y-3 border-t md:border-t-0 border-emerald-900/60 pt-4 md:pt-0">
            <div className="text-[12px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Liên Hệ &amp; Thanh Toán</span>
            </div>

            <div className="space-y-1.5 text-[12px] text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Hotline Tư Vấn Sỉ:</strong>{' '}
                  <a href="tel:0961525450" className="text-amber-300 font-bold hover:underline font-mono">
                    0961 525 450
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Hotline Xuất Khẩu:</strong>{' '}
                  <a href="tel:0938126189" className="text-amber-300 font-bold hover:underline font-mono">
                    0938 126 189
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:chutchiucompany@gmail.com" className="text-amber-300 hover:underline">
                    chutchiucompany@gmail.com
                  </a>
                </span>
              </div>
            </div>

            {/* Khối QR Thanh toán nhỏ gọn, tinh tế */}
            <div className="p-2.5 bg-emerald-950/70 rounded-xl border border-emerald-800/80 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="bg-white p-1 rounded-lg shrink-0 border border-emerald-700 shadow-2xs">
                  <img
                    src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                    alt="Mã QR Chuyển Khoản Techcombank - NGUYEN DUC TRUNG"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain rounded"
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
                <CreditCard className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Quét VietQR 24/7 • Xuất VAT chuỗi quán F&amp;B</span>
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
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[10.5px] cursor-pointer"
          >
            <span>📦 Quản trị đơn hàng (/admin)</span>
          </button>
        )}
      </div>
    </footer>
  );
};
