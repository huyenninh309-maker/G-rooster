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
    <section id="nang-luc-cung-ung" className="pt-6 pb-4 sm:pt-8 sm:pb-6 bg-white">
      {/* Anchor alias for old links */}
      <div id="hanh-trinh-doi-tac" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-7">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 uppercase tracking-wider mb-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Quy Trình Kiểm Soát Đầu Vào & Chứng Từ Pháp Lý
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-stone-950 tracking-tight font-heading">
            NĂNG LỰC CUNG ỨNG & CAM KẾT CHẤT LƯỢNG
          </h2>
          <p className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-relaxed max-w-2xl mx-auto">
            CHUTCHIU CO.,LTD thiết lập tiêu chuẩn tuyển chọn khắt khe từ vùng nguyên liệu sạch, quy trình test mẫu định kỳ tại các trung tâm đo lường uy tín (Quatest, Viện Pasteur), hệ thống kho bãi đa nhiệt độ chuẩn lạnh -18°C và cam kết 100% hàng hóa đầy đủ hóa đơn VAT cùng hồ sơ công bố chất lượng minh bạch.
          </p>
        </div>

        {/* 5 Categories Grid: Lưới 2 cột thanh thoát, thẻ lẻ cuối cùng dàn đều thẩm mỹ */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {PARTNERS_DATA.map((partner, index) => {
            const isLastOdd = index === PARTNERS_DATA.length - 1 && PARTNERS_DATA.length % 2 !== 0;
            return (
            <div
              key={partner.id}
              id={`partner-card-${partner.id}`}
              className={`group bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-emerald-700/40 transition-all duration-300 flex flex-col ${isLastOdd ? 'col-span-2 md:col-span-1 max-w-md mx-auto w-full' : ''}`}
            >
              {/* Cover Image & Quality Ribbon */}
              <div className="relative h-[110px] sm:h-[135px] md:h-[155px] max-h-[160px] overflow-hidden bg-stone-900 shrink-0">
                <img
                  src={partner.coverImage}
                  alt={`Vùng nguyên liệu ${partner.name} - Chút Chíu Co.,Ltd`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-black/40 to-transparent" />

                {/* Pillar Number Badge */}
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1 sm:gap-1.5">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#d4af37] text-stone-950 font-black text-[9px] sm:text-[10px] flex items-center justify-center shadow-xs">
                    0{index + 1}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-white/90 text-emerald-950 backdrop-blur-md shadow-2xs">
                    Kiểm định đạt chuẩn
                  </span>
                </div>

                {/* Quality Code */}
                <div className="absolute top-2 right-2 z-10">
                  <span className="px-1.5 py-0.5 rounded-md text-[8px] sm:text-[9.5px] font-mono font-bold bg-black/60 text-amber-300 backdrop-blur-md border border-amber-400/30">
                    {partner.contractCode}
                  </span>
                </div>

                {/* Bottom Overlay Info with Logo */}
                <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2.5 sm:left-3 sm:right-3 text-white z-10 flex items-end justify-between gap-1.5 sm:gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[11.5px] sm:text-sm md:text-base font-bold tracking-tight text-white flex items-center gap-1 truncate">
                      {partner.name}
                    </h3>
                    <p className="text-[8.5px] sm:text-[10px] text-amber-200/90 italic font-medium mt-0.2 line-clamp-1 hidden sm:block">
                      "{partner.slogan}"
                    </p>
                  </div>
                  {partner.avatar && (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white p-0.5 shadow-xs shrink-0 border border-white/80 flex items-center justify-center">
                      <img
                        src={partner.avatar}
                        alt={`Chứng chỉ ${partner.name} - Chút Chíu`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body: Tinh gọn, thanh thoát */}
              <div className="p-2.5 sm:p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Quality Assurance Strip */}
                  <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10.5px] text-stone-600 mb-2 bg-white p-2 rounded-lg border border-stone-200/80">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="truncate">
                        Phân phối: <strong>CHUTCHIU CO.,LTD</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{partner.standardsBadge}</span>
                    </div>
                  </div>

                  {/* Đoạn trích dẫn cực ngắn tối đa 2 dòng */}
                  <p className="text-[10px] sm:text-[11px] text-stone-600 line-clamp-2 leading-relaxed mb-2">
                    {partner.summary}
                  </p>

                  {/* Certifications preview */}
                  <div className="hidden sm:flex flex-wrap gap-1 mb-2">
                    {partner.certifications.slice(0, 3).map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-0.5 text-[9px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 px-1.5 py-0.2 rounded"
                      >
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-700" />
                        {cert.split('số')[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Gọn gàng và vừa vặn */}
                <div className="pt-2 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-1.5">
                  <button
                    onClick={() => setActiveStory(partner)}
                    className="w-full sm:flex-1 py-1.5 px-2 rounded-lg bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 font-bold text-[10px] sm:text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Quy chuẩn & Pháp lý</span>
                    <ArrowUpRight className="w-3 h-3 text-stone-500" />
                  </button>

                  <button
                    onClick={() => onSelectPartnerFilter(partner.id)}
                    className="w-full sm:w-auto py-1.5 px-2.5 rounded-lg bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-[10px] sm:text-[11px] transition-colors flex items-center justify-center gap-1 shadow-xs shrink-0 cursor-pointer"
                  >
                    <span>Xem sản phẩm</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
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
                      alt={`Chứng chỉ ${activeStory.name} - Chút Chíu`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                    HỒ SƠ NĂNG LỰC & CHUẨN ĐẦU VÀO • {activeStory.contractCode}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    {activeStory.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-emerald-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Banner Image */}
            <div className="relative h-44 w-full bg-stone-900 shrink-0 overflow-hidden">
              <img
                src={activeStory.coverImage}
                alt={`Năng lực cung ứng ${activeStory.name} - CHÚT CHÍU CO.,LTD`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
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
                <div className="text-stone-700">
                  <strong>Đơn vị phân phối độc quyền:</strong> CÔNG TY TNHH CHÚT CHÍU (CHUTCHIU CO.,LTD)
                </div>
                <div className="text-stone-700">
                  <strong>Chuẩn bảo quản logistics:</strong> Hệ thống kho lạnh -18°C và kho khô thoáng khí đạt tiêu chuẩn VSATTP
                </div>
                <div className="text-stone-700">
                  <strong>Hồ sơ pháp lý:</strong> 100% hàng hóa đầy đủ kiểm định Quatest/Pasteur, tự công bố và hóa đơn điện tử VAT
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                  Quy Trình Kiểm Soát Đầu Vào & Tiêu Chuẩn Tuyển Chọn
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
                <strong>Cam kết cung ứng & bảo chứng giá sỉ B2B:</strong>
                <p className="mt-1">{activeStory.commitment}</p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => {
                    const id = activeStory.id;
                    setActiveStory(null);
                    onSelectPartnerFilter(id);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-950 transition-colors cursor-pointer"
                >
                  Xem toàn bộ sản phẩm ngành hàng này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
