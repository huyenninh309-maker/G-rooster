import React from 'react';
import {
  Building2,
  MapPin,
  Phone,
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

      {/* Top Footer Banner */}
      <div className="border-b border-emerald-900/60 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ChutChiuLogo
              size="xl"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-stone-300 font-medium">Đặt sỉ trực tiếp nhanh chóng:</span>
            <a
              href="tel:0961525450"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#144385] to-[#1a62c6] hover:brightness-110 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-md border border-blue-400/30"
            >
              <Phone className="w-3.5 h-3.5 text-blue-200" />
              0961 525 450
            </a>
            <a
              href="tel:0938797904"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#15803d] to-[#16a34a] hover:brightness-110 text-white font-black text-xs transition-all flex items-center gap-1.5 shadow-md border border-emerald-400/30"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-200" />
              0938 7979 04
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Legal Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-stone-300">
        {/* Column 1: Company Legal & Address */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#d4af37]" />
            Thông Tin Pháp Lý Doanh Nghiệp
          </div>
          <div>
            <p className="text-white font-bold text-sm">
              Công ty TNHH TMDV Chút Chíu
            </p>
          </div>
          <div className="space-y-2 text-stone-300">
            <div className="flex items-start gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Mã Số Thuế (MST):</strong>{' '}
                <span className="font-mono text-amber-300 font-bold">0319153593</span>
              </span>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Địa chỉ trụ sở & Kho:</strong> 44 Trần Đình Xu, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh
              </span>
            </div>

            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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

        {/* Column 2: 5 Official Strategic Partners */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
            <Award className="w-4 h-4 text-[#d4af37]" />
            Hệ Sinh Thái Đối Tác Chiến Lược Chút Chíu
          </div>
          <ul className="space-y-2.5">
            <li>
              <button
                onClick={() => onSelectPartner('viet-thao-nhien')}
                className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <span>
                  <strong>1. VIỆT THẢO NHIÊN:</strong> Matcha Laka (3 cấp độ), Trà Cascara (4 vị), Nước cốt quả cà phê
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPartner('vua-mia')}
                className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <span>
                  <strong>2. VUA MÍA:</strong> Nước Mía Tuyết (Thùng 28 gói) - Cấp đông siêu tốc
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPartner('thao-duoc-dato')}
                className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <span>
                  <strong>3. THẢO DƯỢC DATO:</strong> Sâm dây Ngọc Linh, Mật ong rừng, Trà thảo mộc
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPartner('non-la-aodai')}
                className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <span>
                  <strong>4. NÓN LÁ & AODAI COFFEE:</strong> Cà phê viên sấy thăng hoa, Cà phê hạt/bột
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectPartner('phu-nha')}
                className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                <span>
                  <strong>5. ĐẶC SẢN PHÚ NHÃ:</strong> Chà bông heo/gà, khô heo/bò xé cay thượng hạng
                </span>
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Bank Account & Payment Verification */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-[#d4af37]" />
            Tài Khoản Thanh Toán Chính Thức
          </div>
          <div className="p-3.5 bg-emerald-950/80 rounded-2xl border border-emerald-800 space-y-1.5">
            <div className="text-stone-400 text-[11px]">Ngân hàng thương mại:</div>
            <div className="font-bold text-white text-sm">Techcombank</div>
            <div className="text-stone-400 text-[11px]">Số tài khoản (STK):</div>
            <div className="font-mono text-base font-black text-amber-300 tracking-wider">
              19039080129011
            </div>
            <div className="text-stone-400 text-[11px]">Chủ tài khoản:</div>
            <div className="font-bold text-white uppercase text-xs">
              NGUYEN DUC TRUNG
            </div>
          </div>
          <p className="text-[11px] text-stone-400">
            Hỗ trợ xuất hóa đơn điện tử VAT đầy đủ cho khách hàng doanh nghiệp và chuỗi quán F&B.
          </p>
        </div>

        {/* Column 4: 3 Trust Badges & B2B Alibaba Policy */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            3 Huy Chương Niềm Tin Chút Chíu
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>Giao hàng nhanh toàn quốc</strong> (Kho Quận 1 xuất nhanh)
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>
                <strong>Tặng công thức pha chế trọn đời</strong> cho đối tác sỉ
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Đổi trả 100%</strong> bảo vệ quyền lợi tuyệt đối
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-emerald-950 py-4 px-4 text-center text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p>
          © 2024 - 2026 <strong>Công ty TNHH TMDV Chút Chíu</strong> (MST: 0319153593). Tuyệt đối chuyên biệt về nông sản cao cấp Việt Nam.
        </p>
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[11px]"
          >
            <span>📦 Quản trị đơn hàng (/admin)</span>
          </button>
        )}
      </div>
    </footer>
  );
};
