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
  Check,
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
          - Nén mỏng lề trên & dưới xuống mức tối thiểu (padding-top/bottom: 16px)
          - Toàn bộ thông tin ở Cột 1, 2, 3 sử dụng line-height: 1.2 để các khối lùn lại tối đa
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4 items-start">
          
          {/* CỘT 1: THÔNG TIN PHÁP LÝ (MST, ĐỊA CHỈ, EMAIL) - LINE-HEIGHT: 1.2 */}
          <div className="space-y-1 font-body">
            <div className="flex items-center gap-1.5" style={{ lineHeight: 1.2 }}>
              <ChutChiuLogo size="sm" />
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider font-heading" style={{ lineHeight: 1.2 }}>
                  Chút Chíu Co.,Ltd
                </div>
                <div className="text-[9px] text-stone-400 truncate font-body" style={{ lineHeight: 1.2 }}>
                  Nông Sản Cao Cấp
                </div>
              </div>
            </div>

            <div className="space-y-0.5 text-[11px] text-stone-300 font-body pt-0.5">
              <p className="text-white font-bold text-[11px] font-heading" style={{ lineHeight: 1.2 }}>
                Công ty TNHH TMDV Chút Chíu
              </p>
              
              <div className="flex items-start gap-1.5" style={{ lineHeight: 1.2 }}>
                <FileCheck className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                <span className="whitespace-nowrap">
                  <strong>MST:</strong>{' '}
                  <span className="font-mono text-amber-300 font-bold">0319153593</span>
                </span>
              </div>

              <div className="flex items-start gap-1.5" style={{ lineHeight: 1.2 }}>
                <MapPin className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Kho:</strong> 44 Trần Đình Xu, P. Cầu Ông Lãnh, Q.1, TP.HCM
                </span>
              </div>

              <div className="flex items-center gap-1.5" style={{ lineHeight: 1.2 }}>
                <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:chutchiucompany@gmail.com" className="text-stone-300 hover:text-amber-300 hover:underline">
                    chutchiucompany@gmail.com
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-1.5" style={{ lineHeight: 1.2 }}>
                <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                <span>
                  <strong>Hotline:</strong>{' '}
                  <a href="tel:0961525450" className="text-amber-300 font-bold hover:underline font-mono">
                    0961 525 450
                  </a>
                </span>
              </div>

              <div className="flex items-start gap-1 text-stone-400 text-[9.5px] pt-0.5 border-t border-emerald-900/60" style={{ lineHeight: 1.2 }}>
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Chuẩn VSATTP &amp; Xuất khẩu B2B/B2C.</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: CHÍNH SÁCH HỖ TRỢ KHÁCH HÀNG - LINE-HEIGHT: 1.2 */}
          <div className="space-y-1 font-body">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading" style={{ lineHeight: 1.2 }}>
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Chính Sách & Hỗ Trợ</span>
            </div>
            <ul className="space-y-0.5 text-[11px] text-stone-300 font-body">
              <li>
                <div className="flex items-start gap-1.5" style={{ lineHeight: 1.2 }}>
                  <Truck className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Giao hỏa tốc 2H &amp; Toàn quốc</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1.5" style={{ lineHeight: 1.2 }}>
                  <RotateCcw className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>Đổi trả 100% trong 24h nếu lỗi</span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('chinh-sach-si')}
                  className="hover:text-amber-300 transition-colors flex items-start gap-1.5 text-left cursor-pointer"
                  style={{ lineHeight: 1.2 }}
                >
                  <Receipt className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                  <span>Bảng giá sỉ 4 mức &amp; Hóa đơn VAT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('goc-cong-thuc')}
                  className="hover:text-amber-300 transition-colors flex items-start gap-1.5 text-left cursor-pointer"
                  style={{ lineHeight: 1.2 }}
                >
                  <BookOpen className="w-3 h-3 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Tặng bộ công thức pha chế F&amp;B</span>
                </button>
              </li>
            </ul>
          </div>

          {/* CỘT 3: HỆ SINH THÁI 5 ĐỐI TÁC - LINE-HEIGHT: 1.2 */}
          <div className="space-y-1 font-body">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading" style={{ lineHeight: 1.2 }}>
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
                  style={{ lineHeight: 1.2 }}
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
                  <span className="text-[9px] font-semibold text-stone-200 group-hover:text-amber-300 line-clamp-1" style={{ lineHeight: 1.2 }}>
                    {partner.shortName}
                  </span>
                </button>
              ))}
            </div>

            {/* Tablet & Desktop View: Danh sách 5 đối tác nén mỏng hàng */}
            <ul className="hidden sm:block space-y-0.5 text-[11px] text-stone-300 font-body">
              {PARTNER_ECOSYSTEM.map((partner) => (
                <li key={partner.id}>
                  <button
                    onClick={() => onSelectPartner(partner.id)}
                    className="group flex items-center gap-1.5 text-left hover:text-amber-300 transition-colors w-full cursor-pointer"
                    style={{ lineHeight: 1.2 }}
                  >
                    <div className="w-4 h-4 rounded bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-stone-200 group-hover:text-amber-300 transition-colors block truncate text-[11px]" style={{ lineHeight: 1.2 }}>
                        {partner.name}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="pt-0.5 border-t border-emerald-900/60 text-[9.5px] text-stone-400 font-body" style={{ lineHeight: 1.2 }}>
              và hơn 50+ đơn vị cung ứng OCOP &amp; VietGAP.
            </div>
          </div>

          {/* CỘT 4: PHƯƠNG THỨC THANH TOÁN & TỶ GIÁ (V89 - QR 80PX DÀN HÀNG NGANG VỚI THÔNG TIN NGÂN HÀNG) */}
          <div className="space-y-1 font-body">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5 font-heading" style={{ lineHeight: 1.2 }}>
              <CreditCard className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>Thanh Toán & Tỷ Giá</span>
            </div>

            {/* Thẻ Card mỏng Glassmorphism nén mỏng */}
            <div className="p-2 bg-white/[0.04] backdrop-blur-md rounded-lg border border-white/15 space-y-1.5 shadow-xs transition-all hover:border-[#d4af37]/40 hover:bg-white/[0.06]">
              {/* DÒNG TỶ GIÁ USD: Mỏng, cỡ chữ 11px, nguồn Open Exchange API */}
              <div
                className="text-stone-200 flex items-center justify-between gap-1 font-body"
                style={{ fontSize: '11px', whiteSpace: 'nowrap', lineHeight: 1.2 }}
              >
                <div className="flex items-center gap-1">
                  <span>🌍 Tỷ giá USD:</span>
                  <span className="text-amber-300 font-bold font-mono text-[11px]">
                    1 USD = {formattedRate} VND
                  </span>
                </div>
                <span className="text-[8.5px] text-stone-400 font-mono italic">
                  (Open Exchange API)
                </span>
              </div>

              {/* KHỐI MÃ QR 80PX DÀN HÀNG NGANG VỚI THÔNG TIN NGÂN HÀNG */}
              <div className="pt-1.5 border-t border-white/10 flex items-center gap-2.5">
                {/* Mã QR nhỏ 80px */}
                <div className="w-[80px] h-[80px] shrink-0 rounded-lg bg-white p-1 shadow-2xs border border-white/20 flex items-center justify-center">
                  <img
                    src="https://i.postimg.cc/BvD1NLMs/ma-qr-chuyen-khoan-nguyen-duc-trung.png"
                    alt="Mã QR Techcombank Nguyễn Đức Trung"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Thông tin tài khoản ngân hàng dàn hàng ngang gọn gàng */}
                <div className="min-w-0 space-y-0.5 text-[11px] text-stone-200 leading-snug">
                  <div className="text-[11px] font-bold text-white flex items-center gap-1 truncate">
                    <span className="text-[#d4af37]">Techcombank</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-amber-300 font-bold tracking-wide text-[11px] whitespace-nowrap">
                      19039080129011
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-300 uppercase font-semibold truncate">
                    NGUYEN DUC TRUNG
                  </div>
                  <div className="text-[9px] text-emerald-300 flex items-center gap-1 whitespace-nowrap">
                    <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span>Quét mã xác nhận tự động</span>
                  </div>
                </div>
              </div>

              {/* HÀNG BIỂU TƯỢNG THANH TOÁN (PAYMENT ICONS) CHUẨN QUỐC TẾ: Cao 18px */}
              <div
                className="pt-1 border-t border-white/10 flex items-center justify-between gap-1 flex-wrap"
                style={{ lineHeight: 1.2 }}
              >
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
            <div className="pt-0.5 flex items-center gap-1.5 font-body">
              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1 flex-1 py-1 px-2 rounded-lg bg-transparent border border-white/30 hover:border-amber-400 hover:bg-amber-400/10 text-stone-200 hover:text-amber-300 text-[9.5px] sm:text-[10.5px] font-semibold transition-all duration-200 shadow-2xs cursor-pointer"
                title="Chat Zalo OA B2B Chút Chíu"
                style={{ lineHeight: 1.2 }}
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
                style={{ lineHeight: 1.2 }}
              >
                <Share2 className="w-3 h-3 text-amber-300" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar Nhỏ Gọn - DUY TRÌ VÙNG AN TOÀN ĐÁY (PADDING-BOTTOM: 200PX) CHO TOÀN BỘ TRANG WEB */}
      <div
        className="border-t border-emerald-950/80 px-4 text-center text-[10px] sm:text-[10.5px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto"
        style={{ paddingTop: '10px', paddingBottom: '200px' }}
      >
        <p className="font-body" style={{ lineHeight: 1.2 }}>
          © 2024 - 2026 <strong className="font-heading text-stone-300">Công ty TNHH TMDV Chút Chíu</strong> (MST: 0319153593). Nông sản cao cấp chuẩn xuất khẩu.
        </p>
        {onOpenAdmin && (
          <button
            onClick={onOpenAdmin}
            className="text-stone-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono text-[10px] cursor-pointer"
            style={{ lineHeight: 1.2 }}
          >
            <span>📦 Quản trị đơn hàng (/admin)</span>
          </button>
        )}
      </div>
    </footer>
  );
};


