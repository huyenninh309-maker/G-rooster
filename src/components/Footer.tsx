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
  Check,
  Globe,
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
          - Desktop: Dàn hàng ngang 4 cột cân đối 100% chiều ngang (lg:grid-cols-4)
          - Tablet: Bố cục 2x2 (md:grid-cols-2)
          - Mobile: Xếp chồng 1 cột với khoảng cách thoáng đãng (gap-8 md:gap-6 lg:gap-8)
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8 items-start">
          
          {/* CỘT 1: THÔNG TIN PHÁP LÝ CORPORATE LUXURY */}
          <div className="space-y-3 font-body">
            {/* Header Thương hiệu */}
            <div className="flex items-center gap-2.5">
              <ChutChiuLogo size="sm" />
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-extrabold text-[#D4AF37] uppercase tracking-wider font-heading leading-tight">
                  CHUTCHIU CO.,LTD
                </h3>
                <p className="text-[10px] text-stone-400 font-body uppercase tracking-widest mt-0.5">
                  Nông Sản &amp; Đặc Sản Cao Cấp
                </p>
              </div>
            </div>

            {/* Chi tiết pháp lý - Font Quicksand, màu xám nhạt, line-height thoáng đãng */}
            <div className="space-y-2 text-xs sm:text-[12.5px] text-stone-300 font-body leading-relaxed pt-1">
              <p className="text-white font-semibold font-heading text-xs sm:text-[13px]">
                Công ty TNHH Thương Mại Dịch Vụ Chút Chíu
              </p>
              
              <div className="flex items-start gap-2">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-stone-300">
                  <strong className="text-stone-200">MST:</strong>{' '}
                  <span className="font-mono text-amber-300 font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-stone-300">
                  <strong className="text-stone-200">Kho trung tâm:</strong> 44 Trần Đình Xu, P. Cầu Ông Lãnh, Quận 1, TP.HCM
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate text-stone-300">
                  <strong className="text-stone-200">Email:</strong>{' '}
                  <a href="mailto:chutchiucompany@gmail.com" className="hover:text-amber-300 hover:underline transition-colors">
                    chutchiucompany@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-stone-300">
                  <strong className="text-stone-200">Hotline B2B:</strong>{' '}
                  <a href="tel:0961525450" className="text-amber-300 font-bold hover:underline font-mono">
                    0961 525 450
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-stone-400 text-[10.5px] pt-1 border-t border-emerald-900/50">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Tiêu chuẩn VSATTP &amp; Xuất khẩu B2B / B2C</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: CHÍNH SÁCH VÀ HỖ TRỢ - SẮP XẾP TĂM TẮP, BỎ CHẤM ĐẦU DÒNG */}
          <div className="space-y-3 font-body">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 font-heading">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Chính Sách &amp; Hỗ Trợ</span>
            </h4>
            
            <ul className="space-y-2.5 text-xs sm:text-[12.5px] text-stone-300 font-body leading-normal">
              <li>
                <div className="flex items-center gap-2.5 py-0.5 hover:text-amber-300 transition-colors">
                  <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Giao hàng hỏa tốc 2H &amp; Toàn quốc</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2.5 py-0.5 hover:text-amber-300 transition-colors">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Đổi trả 100% trong 24h nếu lỗi</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('chinh-sach-si')}
                  className="flex items-center gap-2.5 py-0.5 text-left hover:text-amber-300 transition-colors cursor-pointer w-full group"
                >
                  <Receipt className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Bảng giá sỉ 4 mức &amp; Hóa đơn VAT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('goc-cong-thuc')}
                  className="flex items-center gap-2.5 py-0.5 text-left hover:text-amber-300 transition-colors cursor-pointer w-full group"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Tặng bộ 50+ công thức pha chế F&amp;B</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CỘT 3: HỆ SINH THÁI ĐỐI TÁC - SẮP XẾP TĂM TẮP, BỎ CHẤM ĐẦU DÒNG */}
          <div className="space-y-3 font-body">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 font-heading">
              <Handshake className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Hệ Sinh Thái 5 Đối Tác</span>
            </h4>

            <ul className="space-y-2 text-xs sm:text-[12.5px] text-stone-300 font-body">
              {PARTNER_ECOSYSTEM.map((partner) => (
                <li key={partner.id}>
                  <button
                    onClick={() => onSelectPartner(partner.id)}
                    className="group flex items-center gap-2.5 text-left hover:text-amber-300 transition-colors w-full cursor-pointer py-0.5"
                  >
                    <div className="w-5 h-5 rounded bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs border border-white/20 group-hover:border-amber-400 transition-colors overflow-hidden">
                      <img
                        src={partner.avatar}
                        alt={`Logo đối tác ${partner.name} - Chút Chíu`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-stone-200 group-hover:text-amber-300 transition-colors block truncate text-xs sm:text-[12.5px]">
                        {partner.name}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-1.5 border-t border-emerald-900/50 text-[10.5px] text-stone-400 font-body">
              Cùng hơn 50+ đơn vị cung ứng OCOP &amp; VietGAP chuẩn hóa.
            </div>
          </div>

          {/* CỘT 4: THANH TOÁN & TỶ GIÁ - CARD GLASSMORPHISM VIỀN 1PX SIÊU MẢNH */}
          <div className="space-y-3 font-body">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2 font-heading">
              <CreditCard className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Thanh Toán &amp; Tỷ Giá</span>
            </h4>

            {/* Thẻ Card Glassmorphism viền 1px mờ */}
            <div className="p-3 bg-white/[0.04] backdrop-blur-md rounded-xl border border-white/10 space-y-2.5 shadow-lg transition-all hover:border-[#D4AF37]/40 hover:bg-white/[0.06]">
              {/* KHỐI NẰM NGANG: MÃ QR (80px desktop, 70px mobile) + THÔNG TIN TK BÊN PHẢI (whitespace-nowrap) */}
              <div className="flex items-center gap-3">
                {/* Mã QR Techcombank */}
                <div className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] shrink-0 rounded-lg bg-white p-1 shadow-md border border-white/20 flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                    alt="Mã QR Techcombank Nguyễn Đức Trung"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Thông tin STK & Tên chủ TK dàn hàng ngang trên cùng một hàng / khối bên phải whitespace-nowrap */}
                <div className="min-w-0 space-y-1 text-xs text-stone-200">
                  <div className="text-xs sm:text-[12.5px] font-bold text-white flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[#D4AF37]">Techcombank</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-600/30 text-red-300 font-normal border border-red-500/30">24/7</span>
                  </div>
                  
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="text-stone-400 text-[11px]">STK:</span>
                    <span className="font-mono text-amber-300 font-bold tracking-wide text-xs sm:text-[12.5px]">
                      19039080129011
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-300 uppercase font-semibold whitespace-nowrap">
                    NGUYEN DUC TRUNG
                  </div>

                  <div className="text-[9.5px] text-emerald-300 flex items-center gap-1 whitespace-nowrap">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Quét mã xác nhận tự động</span>
                  </div>
                </div>
              </div>

              {/* DÒNG TỶ GIÁ USD: Nhỏ nhắn ngay dưới mã QR lấy từ Open Exchange API */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1 text-[11px] text-stone-300 font-body">
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Globe className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Tỷ giá USD:</span>
                  <span className="text-amber-300 font-bold font-mono">
                    1 USD = {formattedRate} VND
                  </span>
                </div>
                <span className="text-[9px] text-stone-400 font-mono italic whitespace-nowrap">
                  (Open Exchange API)
                </span>
              </div>

              {/* Hàng biểu tượng thanh toán chuẩn quốc tế */}
              <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-1 flex-wrap">
                {/* Logo Techcombank */}
                <div
                  className="h-[18px] px-1.5 rounded bg-white/[0.85] hover:bg-white flex items-center gap-1 shadow-2xs grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-200 cursor-default"
                  title="Thanh toán Techcombank"
                >
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 shrink-0" fill="none">
                    <path d="M4 18L10 6L16 18H4Z" fill="#E01A22" />
                    <path d="M14 6L8 18L20 18L14 6Z" fill="#111" fillOpacity="0.8" />
                  </svg>
                  <span className="text-[8.5px] font-bold text-stone-800 tracking-tighter">TCB</span>
                </div>

                {/* Logo Visa */}
                <div
                  className="h-[18px] px-1.5 rounded bg-white/[0.85] hover:bg-white flex items-center gap-1 shadow-2xs grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-200 cursor-default"
                  title="Thẻ Quốc tế Visa & Mastercard"
                >
                  <svg viewBox="0 0 26 16" className="h-2 w-auto shrink-0">
                    <circle cx="8" cy="8" r="7" fill="#EB001B" />
                    <circle cx="18" cy="8" r="7" fill="#F79E1B" fillOpacity="0.85" />
                  </svg>
                  <span className="text-[8.5px] font-black text-blue-900 tracking-wider">VISA</span>
                </div>

                {/* Logo MoMo */}
                <div
                  className="h-[18px] px-1.5 rounded bg-white/[0.85] hover:bg-white flex items-center gap-1 shadow-2xs grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-200 cursor-default"
                  title="Ví MoMo"
                >
                  <div className="w-2 h-2 rounded-[2px] bg-[#A50064] flex items-center justify-center text-[5.5px] font-bold text-white leading-none">
                    M
                  </div>
                  <span className="text-[8.5px] font-bold text-[#A50064]">MoMo</span>
                </div>

                {/* Logo ZaloPay */}
                <div
                  className="h-[18px] px-1.5 rounded bg-white/[0.85] hover:bg-white flex items-center gap-1 shadow-2xs grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-200 cursor-default"
                  title="Ví ZaloPay"
                >
                  <div className="w-2 h-2 rounded-[2px] bg-[#0068FF] flex items-center justify-center text-[5.5px] font-bold text-white leading-none">
                    Z
                  </div>
                  <span className="text-[8.5px] font-bold text-[#0068FF]">ZaloPay</span>
                </div>
              </div>
            </div>

            {/* Mạng xã hội Zalo OA & Facebook - Nút Outline mỏng nhẹ, nền trong suốt */}
            <div className="pt-1 flex items-center gap-2 font-body">
              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 flex-1 py-1.5 px-2 rounded-lg bg-transparent border border-white/20 hover:border-amber-400 hover:bg-amber-400/10 text-stone-200 hover:text-amber-300 text-[11px] font-semibold transition-all duration-200 shadow-2xs cursor-pointer"
                title="Chat Zalo OA B2B Chút Chíu"
              >
                <MessageCircle className="w-3.5 h-3.5 text-blue-300" />
                <span>Zalo OA</span>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 flex-1 py-1.5 px-2 rounded-lg bg-transparent border border-white/20 hover:border-amber-400 hover:bg-amber-400/10 text-stone-200 hover:text-amber-300 text-[11px] font-semibold transition-all duration-200 shadow-2xs cursor-pointer"
                title="Trang Facebook chính thức"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar & VÙNG ĐỆM AN TOÀN ĐÁY (PADDING-BOTTOM: 220PX)
          Yêu cầu: Đảm bảo khi cuộn đến cuối cùng, các nút Zalo B2B và 2 số Hotline PHẢI NẰM TRONG KHOẢNG TRẮNG TRỐNG 220px,
          không che bất kỳ chữ nào của Footer.
      */}
      <div
        className="border-t border-emerald-950/80 px-4 text-center text-[10.5px] sm:text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto"
        style={{ paddingTop: '16px', paddingBottom: '220px' }}
      >
        <p className="font-body leading-relaxed">
          © 2024 - 2026 <strong className="font-heading text-stone-200">Công ty TNHH TMDV Chút Chíu</strong> (MST: 0319153593). Nông sản cao cấp chuẩn xuất khẩu.
        </p>
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 font-mono text-[11px] cursor-pointer"
          >
            <span>📦 Quản trị đơn hàng (/admin)</span>
          </button>
        )}
      </div>
    </footer>
  );
};



