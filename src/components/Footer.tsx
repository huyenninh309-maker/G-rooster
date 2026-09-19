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
  Building2,
} from 'lucide-react';
import { PartnerId, ExchangeRateInfo } from '../types';
import { ChutChiuLogo } from './ChutChiuLogo';

interface FooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  rateInfo?: ExchangeRateInfo;
}

const PARTNER_ECOSYSTEM: {
  id: PartnerId;
  name: string;
  shortName: string;
  specialty: string;
  avatar: string;
}[] = [
  {
    id: 'viet-thao-nhien',
    name: 'Việt Thảo Nhiên',
    shortName: 'Việt Thảo Nhiên',
    specialty: 'Matcha Laka & Cascara Cầu Đất',
    avatar: '/images/logos/logo-vietthaonhien.png',
  },
  {
    id: 'vua-mia',
    name: 'Vua Mía',
    shortName: 'Vua Mía',
    specialty: 'Nước Mía Tuyết IQF -40°C',
    avatar: '/images/logos/logo-vuamia.png',
  },
  {
    id: 'thao-duoc-dato',
    name: 'Thảo Dược DATO',
    shortName: 'Thảo Dược DATO',
    specialty: 'Sâm Dây & Tam Thất Ngọc Linh',
    avatar: '/images/logos/logo-dato.png',
  },
  {
    id: 'non-la-aodai',
    name: 'Nón Lá & AODAI',
    shortName: 'Nón Lá Coffee',
    specialty: 'Cà Phê Viên Sấy Thăng Hoa',
    avatar: '/images/logos/logo-nonla.png',
  },
  {
    id: 'phu-nha',
    name: 'Đặc Sản Phú Nhã',
    shortName: 'Phú Nhã',
    specialty: 'Chà Bông & Khô Bò Thượng Hạng',
    avatar: '/images/phunha/logo-phunha.svg',
  },
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

      {/* Main Footer Container: 
          - Nén mỏng lề trên & dưới (khoảng 30px - 40px)
          - Desktop: 4 cột dàn ngang siêu mỏng
          - Tablet: Lưới 2x2 các hàng sát nhau
          - Mobile: Các khối nén chiều cao tối đa, chữ 11px
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 items-start">
          
          {/* CỘT 1: THÔNG TIN PHÁP LÝ (MST, ĐỊA CHỈ, EMAIL) - SIÊU GỌN GÀNG, LINE-HEIGHT THẤP */}
          <div className="space-y-1.5 font-body">
            <div className="flex items-center gap-2">
              <ChutChiuLogo size="sm" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider font-heading leading-tight">
                  Chút Chíu Co.,Ltd
                </div>
                <div className="text-[9.5px] text-stone-400 truncate font-body leading-none">
                  Nông Sản Cao Cấp
                </div>
              </div>
            </div>

            <div className="space-y-1 text-[11px] text-stone-300 leading-tight font-body pt-0.5">
              <p className="text-white font-bold text-[11.5px] leading-tight font-heading">
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

              <div className="flex items-start gap-1.5 text-stone-400 text-[10px] pt-1 border-t border-emerald-900/60">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                <span>Phân phối B2B/B2C chuẩn VSATTP &amp; Xuất khẩu.</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: CHÍNH SÁCH HỖ TRỢ KHÁCH HÀNG */}
          <div className="space-y-1.5 font-body">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Chính Sách & Hỗ Trợ</span>
            </div>

            <ul className="space-y-1 text-[11px] text-stone-300 font-body leading-tight">
              <li>
                <div className="flex items-start gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Giao hỏa tốc 2H nội thành &amp; Toàn quốc</span>
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

          {/* CỘT 3: HỆ SINH THÁI 5 ĐỐI TÁC (TINH GỌN TRÊN MOBILE / THANH LỊCH TRÊN TABLET & DESKTOP) */}
          <div className="space-y-1.5 font-body">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <Handshake className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Hệ Sinh Thái 5 Đối Tác</span>
            </div>

            {/* Mobile View: Lưới 3 cột nhỏ gọn kèm Logo & Tên ngắn gọn */}
            <div className="grid grid-cols-3 sm:hidden gap-1">
              {PARTNER_ECOSYSTEM.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => onSelectPartner(partner.id)}
                  className="p-1 rounded bg-white/[0.05] border border-white/10 hover:border-amber-400/50 hover:bg-white/[0.08] transition-all flex flex-col items-center justify-center text-center group cursor-pointer"
                  title={`Xem sản phẩm ${partner.name}`}
                >
                  <div className="w-5 h-5 rounded bg-white p-0.5 flex items-center justify-center shrink-0 mb-0.5 group-hover:scale-105 transition-transform overflow-hidden">
                    <img
                      src={partner.avatar}
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-semibold text-stone-200 group-hover:text-amber-300 leading-tight line-clamp-1">
                    {partner.shortName}
                  </span>
                </button>
              ))}
            </div>

            {/* Tablet & Desktop View: Danh sách 5 đối tác nén mỏng hàng */}
            <ul className="hidden sm:block space-y-1 text-[11px] text-stone-300 font-body leading-tight">
              {PARTNER_ECOSYSTEM.map((partner) => (
                <li key={partner.id}>
                  <button
                    onClick={() => onSelectPartner(partner.id)}
                    className="group flex items-center gap-1.5 text-left hover:text-amber-300 transition-colors w-full cursor-pointer"
                  >
                    <div className="w-4.5 h-4.5 rounded bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-stone-200 group-hover:text-amber-300 transition-colors block truncate text-[11px]">
                        {partner.name}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-0.5 border-t border-emerald-900/60 text-[9.5px] text-stone-400 font-body leading-tight">
              và hơn 50+ đơn vị cung ứng OCOP &amp; VietGAP.
            </div>
          </div>

          {/* CỘT 4: THIẾT KẾ LẠI THEO DẠNG HÀNG NGANG (FLEX-ROW) - QR BÊN TRÁI 80X100PX, THÔNG TIN BÊN PHẢI TRÊN CÙNG 1 DÒNG */}
          <div className="space-y-1.5 font-body">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading">
              <CreditCard className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>QR Thanh Toán & Tỷ Giá</span>
            </div>

            {/* Thẻ Card mỏng Glassmorphism nén mỏng */}
            <div className="p-2 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/15 space-y-1.5 shadow-xs transition-all hover:border-[#d4af37]/40 hover:bg-white/[0.06]">
              {/* DẠNG HÀNG NGANG (FLEX-ROW): QR BÊN TRÁI VÀ THÔNG TIN BÊN PHẢI TRÊN CÙNG 1 HÀNG */}
              <div className="flex items-center gap-2.5">
                {/* Mã QR thu nhỏ tối đa 80px x 100px */}
                <div className="bg-white p-1 rounded-md border border-white/60 shadow-xs shrink-0 flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                    alt="Mã QR Chuyển Khoản Techcombank - NGUYEN DUC TRUNG"
                    referrerPolicy="no-referrer"
                    className="w-[80px] h-[100px] object-contain rounded"
                  />
                </div>

                {/* Thông tin bên cạnh: 'Techcombank', '19039080129011', 'NGUYEN DUC TRUNG' cỡ chữ 11px, viết sát nhau bên phải mã QR, KHÔNG để xuống dòng dưới mã QR */}
                <div className="flex-1 min-w-0 flex flex-col justify-center space-y-0.5 text-[11px] font-body leading-tight">
                  <div className="flex items-center gap-1 text-white font-semibold">
                    <Building2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">Techcombank</span>
                  </div>
                  <div className="text-stone-300">
                    <span className="text-[10px] text-stone-400 mr-1">STK:</span>
                    <strong className="font-mono text-amber-300 font-bold text-[11px] tracking-tight">19039080129011</strong>
                  </div>
                  <div className="font-heading font-bold text-white uppercase text-[11px] tracking-tight truncate">
                    NGUYEN DUC TRUNG
                  </div>
                  <div className="text-[9.5px] text-stone-400 font-mono pt-0.5">
                    Quét VietQR 24/7
                  </div>
                </div>
              </div>

              {/* Dòng Tỷ giá (11px) nằm gọn gàng ngay dưới khối QR ngang này */}
              <div className="pt-1 border-t border-white/10 text-[10.5px] sm:text-[11px] text-stone-200 flex items-center justify-between gap-1 font-body leading-tight">
                <span>🌍 Tỷ giá USD:</span>
                <span className="text-amber-300 font-bold font-mono text-[11px]">
                  1 USD = {formattedRate} VND
                </span>
              </div>

              {/* Dòng bảo chứng VAT */}
              <div className="text-[8.5px] text-emerald-300/90 flex items-center justify-center gap-1 pt-0.5 border-t border-white/10 font-body">
                <CreditCard className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span>Xuất hóa đơn VAT chuỗi F&amp;B</span>
              </div>
            </div>

            {/* Mạng xã hội Zalo OA & Facebook - Nút Outline mỏng nhẹ, nền trong suốt */}
            <div className="pt-0.5 flex items-center gap-1.5 font-body">
              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 flex-1 py-1 px-2 rounded-lg bg-transparent border border-white/30 hover:border-amber-400 hover:bg-amber-400/10 text-stone-200 hover:text-amber-300 text-[9.5px] sm:text-[10.5px] font-semibold transition-all duration-200 shadow-2xs cursor-pointer"
                title="Chat Zalo OA B2B Chút Chíu"
              >
                <MessageCircle className="w-3 h-3 text-blue-300" />
                <span>Zalo OA</span>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 flex-1 py-1 px-2 rounded-lg bg-transparent border border-white/30 hover:border-amber-400 hover:bg-amber-400/10 text-stone-200 hover:text-amber-300 text-[9.5px] sm:text-[10.5px] font-semibold transition-all duration-200 shadow-2xs cursor-pointer"
                title="Trang Facebook chính thức"
              >
                <Share2 className="w-3 h-3 text-amber-300" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar Nhỏ Gọn - DUY TRÌ VÙNG AN TOÀN ĐÁY (PB-[180PX]) ĐỂ NÚT NỔI ZALO/HOTLINE HOÀN TOÀN KHÔNG ĐÈ LÊN CHỮ */}
      <div className="border-t border-emerald-950/80 py-2.5 px-4 text-center text-[10px] sm:text-[10.5px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto pb-[180px]">
        <p className="font-body">
          © 2024 - 2026 <strong className="font-heading text-stone-300">Công ty TNHH TMDV Chút Chíu</strong> (MST: 0319153593). Nông sản cao cấp chuẩn xuất khẩu.
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


