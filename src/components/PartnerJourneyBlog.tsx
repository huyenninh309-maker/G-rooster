import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  Building,
  UserCheck,
  Award,
  ChevronRight,
  ShieldCheck,
  MapPin,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';
import { PARTNERS_DATA } from '../data/partners';
import { PartnerContractStory, PartnerId } from '../types';

interface PartnerJourneyBlogProps {
  onSelectPartnerFilter: (partnerId: PartnerId) => void;
}

export const PartnerJourneyBlog: React.FC<PartnerJourneyBlogProps> = ({
  onSelectPartnerFilter,
}) => {
  const [activeStory, setActiveStory] = useState<PartnerContractStory | null>(null);

  return (
    <section id="hanh-trinh-doi-tac" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wider mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-700" />
            Hồ Sơ Hợp Tác Chiến Lược & Ký Kết B2B
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight font-heading">
            Hành Trình Đối Tác & Những Lễ Ký Kết Lịch Sử
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            Chút Chíu tự hào đồng hành cùng các nhà sản xuất nông sản và đặc sản hàng đầu Việt Nam. Từng thỏa thuận hợp tác đều được ký kết minh bạch, bảo chứng về chất lượng OCOP, VietGAP, VSATTP và chuỗi cung ứng chuẩn quốc tế.
          </p>
        </div>

        {/* 4 Partners Grid in STRICT ORDER:
            1. VIỆT THẢO NHIÊN
            2. VUA MÍA
            3. THẢO DƯỢC DATO
            4. NÓN LÁ & AODAI COFFEE
        */}
        {/* 4 Partners Grid: 2-column on mobile (giống danh sách sản phẩm), 2-column on tablet/desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {PARTNERS_DATA.map((partner, index) => (
            <div
              key={partner.id}
              id={`partner-card-${partner.id}`}
              className="group bg-stone-50 rounded-2xl sm:rounded-3xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-emerald-700/40 transition-all duration-300 flex flex-col"
            >
              {/* Cover Image & Signing Ribbon: Thu nhỏ hình ảnh đại diện lại, chỉ để chiều cao khoảng 120px-150px trên mobile */}
              <div className="relative h-[120px] sm:h-[150px] md:h-52 overflow-hidden bg-stone-900">
                <img
                  src={partner.coverImage}
                  alt={partner.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-black/40 to-transparent" />

                {/* Partner Number Order Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex items-center gap-1.5 sm:gap-2">
                  <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-[#d4af37] text-stone-950 font-black text-[10px] sm:text-xs flex items-center justify-center shadow-md">
                    0{index + 1}
                  </span>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold bg-white/90 text-emerald-950 backdrop-blur-md shadow-xs">
                    {partner.signingDate}
                  </span>
                </div>

                {/* Contract Code */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                  <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg text-[8.5px] sm:text-[11px] font-mono font-bold bg-black/60 text-amber-300 backdrop-blur-md border border-amber-400/30">
                    {partner.contractCode}
                  </span>
                </div>

                {/* Bottom Overlay Info with Logo */}
                <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-3 sm:left-4 sm:right-4 text-white z-10 flex items-end justify-between gap-2 sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 truncate">
                      {partner.name}
                    </h3>
                    <p className="text-[9.5px] sm:text-xs text-amber-200/90 italic font-medium mt-0.5 line-clamp-1 hidden sm:block">
                      "{partner.slogan}"
                    </p>
                  </div>
                  {partner.avatar && (
                    <div className="w-7 h-7 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-white p-0.5 sm:p-1 shadow-md shrink-0 border border-white/80 flex items-center justify-center">
                      <img
                        src={partner.avatar}
                        alt={partner.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body: Tinh gọn, chỉ hiện Tên đối tác và đoạn trích dẫn 2 dòng trên mobile */}
              <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Detailed Representative & Address (Hiển thị từ màn hình sm/desktop) */}
                  <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600 mb-3 bg-white p-3 rounded-xl border border-stone-200/80">
                    <div className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="truncate">
                        Đại diện: <strong>{partner.legalRepresentative}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="truncate">{partner.factoryAddress.split(',').slice(-2).join(',')}</span>
                    </div>
                  </div>

                  {/* Đoạn trích dẫn cực ngắn tối đa 2 dòng */}
                  <p className="text-[10.5px] sm:text-xs text-stone-600 line-clamp-2 leading-relaxed mb-2 sm:mb-4">
                    {partner.summary}
                  </p>

                  {/* Certifications preview (Desktop only để giữ mobile gọn gàng) */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                    {partner.certifications.slice(0, 3).map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-md"
                      >
                        <ShieldCheck className="w-3 h-3 text-emerald-700" />
                        {cert.split('số')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Gọn gàng và vừa vặn trên 2 cột mobile */}
                <div className="pt-2 sm:pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => setActiveStory(partner)}
                    className="w-full sm:flex-1 py-1.5 sm:py-2.5 px-2 sm:px-3 rounded-lg sm:rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-bold text-[10.5px] sm:text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Biên bản ký kết</span>
                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  <button
                    onClick={() => onSelectPartnerFilter(partner.id)}
                    className="w-full sm:w-auto py-1.5 sm:py-2.5 px-2.5 sm:px-3.5 rounded-lg sm:rounded-xl bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-[10.5px] sm:text-xs transition-colors flex items-center justify-center gap-1 shadow-xs shrink-0"
                  >
                    <span>Sản phẩm</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Detail Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 bg-emerald-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeStory.avatar && (
                  <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md shrink-0 border border-amber-400/50 flex items-center justify-center">
                    <img
                      src={activeStory.avatar}
                      alt={activeStory.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                    HỒ SƠ ĐỐI TÁC CHIẾN LƯỢC • {activeStory.contractCode}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Lễ Ký Kết: {activeStory.name} & Chút Chíu
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-emerald-900"
              >
                ✕
              </button>
            </div>

            {/* Modal Banner Image */}
            <div className="relative h-44 w-full bg-stone-900 shrink-0 overflow-hidden">
              <img
                src={activeStory.coverImage}
                alt={activeStory.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-5 right-5 text-white">
                <span className="text-xs text-amber-200 italic font-medium">"{activeStory.slogan}"</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-stone-700 text-xs leading-relaxed">
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2">
                <div className="font-bold text-emerald-950 text-sm">{activeStory.englishName}</div>
                <div className="text-stone-600">
                  <strong>Đại diện pháp luật:</strong> {activeStory.legalRepresentative} ({activeStory.position})
                </div>
                <div className="text-stone-600">
                  <strong>Nhà máy sản xuất / Vùng nguyên liệu:</strong> {activeStory.factoryAddress}
                </div>
                <div className="text-stone-600">
                  <strong>Ngày ký kết chính thức:</strong> {activeStory.signingDate}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                  Chi Tiết Thỏa Thuận & Lễ Ký Kết
                </h4>
                <div className="space-y-3 whitespace-pre-line text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                  {activeStory.signingStory}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                  Hệ Thống Tiêu Chuẩn & Chứng Nhận Kiểm Định
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeStory.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-stone-200 font-semibold text-emerald-900 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950">
                <strong>Cam kết cung ứng & bảo chứng giá sỉ:</strong>
                <p className="mt-1">{activeStory.commitment}</p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => {
                    const id = activeStory.id;
                    setActiveStory(null);
                    onSelectPartnerFilter(id);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition-colors"
                >
                  Xem toàn bộ sản phẩm của đối tác
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
