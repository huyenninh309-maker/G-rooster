import React from 'react';
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
} from 'lucide-react';
import { PartnerId, ExchangeRateInfo } from '../types';
import { ChutChiuLogo } from './ChutChiuLogo';

interface FooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  rateInfo?: ExchangeRateInfo;
}

const PARTNER_ECOSYSTEM: { id: PartnerId; name: string; specialty: string }[] = [
  { id: 'viet-thao-nhien', name: 'Việt Thảo Nhiên', specialty: 'Trà Kombucha & Thảo mộc tự nhiên' },
  { id: 'vua-mia', name: 'Vua Mía', specialty: 'Mía sấy thăng hoa & Nước mía sạch' },
  { id: 'thao-duoc-dato', name: 'Thảo Dược DATO', specialty: 'Tam thất & Sâm dây Kon Tum' },
  { id: 'non-la-aodai', name: 'Nón Lá Coffee', specialty: 'Cà phê phin giấy & Cà phê Muối' },
  { id: 'phu-nha', name: 'Đặc Sản Phú Nhã', specialty: 'Hạt điều rang củi & Trái cây sấy' },
];

export const Footer: React.FC<FooterProps> = ({
  onSelectPartner,
  onScrollToSection,
  onOpenAdmin,
  rateInfo,
}) => {
  const formattedRate = rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964';

  return (
    <footer className="bg-gradient-to-b from-[#082a17] via-[#051c0f] to-[#03130a] text-white border-t-2 border-[#d4af37]/40 relative">
      {/* Brand Decorative Top Edge */}
      <div className="h-1 w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

      {/* Main Footer Container: 4 Cột Cân Đối Hoàn Hảo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
          
          {/* CỘT 1: THÔNG TIN PHÁP LÝ (MST, ĐỊA CHỈ, EMAIL) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <ChutChiuLogo size="sm" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                  Chút Chíu Co.,Ltd
                </div>
                <div className="text-[10px] text-stone-400 truncate">
                  Nông Sản Cao Cấp
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-[11.5px] text-stone-300 leading-relaxed pt-1">
              <p className="text-white font-bold text-[12px]">
                Công ty TNHH TMDV Chút Chíu
              </p>
              
              <div className="flex items-start gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>MST:</strong>{' '}
                  <span className="font-mono text-amber-300 font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Địa chỉ & Kho:</strong> 44 Trần Đình Xu, P. Cầu Ông Lãnh, Q.1, TP.HCM
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:chutchiucompany@gmail.com" className="text-stone-300 hover:text-amber-300 hover:underline">
                    chutchiucompany@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong>Hotline:</strong>{' '}
                  <a href="tel:0961525450" className="text-amber-300 font-bold hover:underline font-mono">
                    0961 525 450
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-1.5 text-stone-400 text-[10.5px] pt-1 border-t border-emerald-900/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Phân phối B2B/B2C chuẩn VSATTP &amp; Xuất khẩu.</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: CHÍNH SÁCH HỖ TRỢ KHÁCH HÀNG */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Chính Sách & Hỗ Trợ</span>
            </div>

            <ul className="space-y-2 text-[11.5px] text-stone-300">
              <li>
                <div className="flex items-start gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Giao hỏa tốc 2H nội thành & Toàn quốc</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Đổi trả 100% trong 24h nếu lỗi sản phẩm</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('chinh-sach-si')}
                  className="hover:text-amber-300 transition-colors flex items-start gap-1.5 text-left cursor-pointer"
                >
                  <Receipt className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Bảng giá sỉ 4 mức &amp; Hóa đơn VAT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('goc-cong-thuc')}
                  className="hover:text-amber-300 transition-colors flex items-start gap-1.5 text-left cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Tặng trọn bộ công thức pha chế F&amp;B</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CỘT 3: HỆ SINH THÁI 5 ĐỐI TÁC (DẠNG DANH SÁCH CHỮ NHỎ) */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <Handshake className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Hệ Sinh Thái 5 Đối Tác</span>
            </div>

            <ul className="space-y-2 text-[11px] text-stone-300">
              {PARTNER_ECOSYSTEM.map((partner) => (
                <li key={partner.id}>
                  <button
                    onClick={() => onSelectPartner(partner.id)}
                    className="group flex flex-col text-left hover:text-amber-300 transition-colors w-full cursor-pointer"
                  >
                    <span className="font-semibold text-stone-200 group-hover:text-amber-300 transition-colors">
                      • {partner.name}
                    </span>
                    <span className="text-[10px] text-stone-400 pl-2">
                      {partner.specialty}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-1 border-t border-emerald-900/60 text-[10px] text-stone-400">
              và hơn 50+ đơn vị cung ứng OCOP &amp; VietGAP.
            </div>
          </div>

          {/* CỘT 4: QR THANH TOÁN & TỶ GIÁ USD (NHỎ GỌN, HÒA HỢP) */}
          <div className="space-y-2.5">
            <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <CreditCard className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>QR Thanh Toán & Tỷ Giá</span>
            </div>

            {/* Dòng chữ Tỷ giá USD nhỏ, mờ, tinh tế (cỡ chữ 11px) đúng định dạng */}
            <div className="text-[11px] text-stone-400 font-medium leading-relaxed">
              🌍 Tỷ giá hôm nay: 1 USD ={' '}
              <span className="text-amber-300 font-semibold font-mono">
                {formattedRate}
              </span>{' '}
              VND (Nguồn: Vietcombank)
            </div>

            {/* Khối QR Thanh toán siêu nhỏ gọn và tinh tế */}
            <div className="p-2 bg-emerald-950/70 rounded-xl border border-emerald-800/80 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-lg shrink-0 border border-emerald-700 shadow-2xs">
                  <img
                    src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                    alt="Mã QR Chuyển Khoản Techcombank - NGUYEN DUC TRUNG"
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 object-contain rounded"
                  />
                </div>
                <div className="space-y-0.5 text-[10.5px] min-w-0">
                  <div className="text-stone-300 truncate">
                    <strong className="text-white">Techcombank</strong>
                  </div>
                  <div className="text-stone-300 truncate">
                    STK: <strong className="font-mono text-amber-300 font-bold">19039080129011</strong>
                  </div>
                  <div className="text-stone-300 truncate text-[10px]">
                    <strong className="text-white uppercase">NGUYEN DUC TRUNG</strong>
                  </div>
                </div>
              </div>
              <div className="text-[9px] text-emerald-300 flex items-center gap-1 pt-1 border-t border-emerald-900/80">
                <CreditCard className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span>Quét VietQR 24/7 • Xuất VAT chuỗi F&amp;B</span>
              </div>
            </div>

            {/* Mạng xã hội Zalo OA & Facebook */}
            <div className="pt-1 flex items-center gap-1.5">
              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-200 hover:text-white text-[10px] font-semibold transition-colors shadow-2xs border border-emerald-700/60"
              >
                <MessageCircle className="w-3 h-3 text-blue-300" />
                <span>Zalo OA</span>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-stone-200 hover:text-white text-[10px] font-semibold transition-colors shadow-2xs border border-emerald-700/60"
              >
                <Share2 className="w-3 h-3 text-amber-300" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar Nhỏ Gọn */}
      <div className="border-t border-emerald-950/80 py-2.5 px-4 text-center text-[10.5px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-1.5 max-w-7xl mx-auto">
        <p>
          © 2024 - 2026 <strong>Công ty TNHH TMDV Chút Chíu</strong> (MST: 0319153593). Nông sản cao cấp chuẩn xuất khẩu.
        </p>
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[10px] cursor-pointer"
          >
            <span>📦 Quản trị đơn hàng (/admin)</span>
          </button>
        )}
      </div>
    </footer>
  );
};
