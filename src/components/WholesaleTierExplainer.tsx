import React from 'react';
import {
  Layers,
  Sparkles,
  TrendingDown,
  ShieldAlert,
} from 'lucide-react';
import { Currency, ExchangeRateInfo } from '../types';

interface WholesaleTierExplainerProps {
  currency: Currency;
  onScrollToCatalog: () => void;
  rateInfo?: ExchangeRateInfo;
  onRefreshRate?: () => void;
  isRefreshing?: boolean;
}

export const WholesaleTierExplainer: React.FC<WholesaleTierExplainerProps> = ({
  rateInfo,
}) => {
  return (
    <section id="chinh-sach-si" className="py-6 sm:py-8 bg-stone-100/60 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37]/20 text-[#8e6b12] border border-[#d4af37]/40 uppercase tracking-wider mb-1.5">
            <Layers className="w-3 h-3 text-[#d4af37]" />
            HỆ THỐNG GIÁ SỈ MINH BẠCH & TỰ ĐỘNG
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-stone-950 tracking-tight">
            Chính Sách 4 Mức Giá Sỉ Minh Bạch & Tự Động Nhảy Giá
          </h2>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-1 max-w-2xl mx-auto">
            Hệ thống Chút Chíu tự động áp mức giá ưu đãi nhất theo số lượng đơn hàng, không cần thương lượng thủ công.
          </p>
        </div>

        {/* 4 Tiers Comparison: Thanh cuộn ngang trên Mobile, 1 hàng ngang duy nhất (4 cột) trên Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 sm:gap-2.5 pb-2 sm:pb-0 sm:grid sm:grid-cols-4 scrollbar-thin">
          {/* Tier 1: Lẻ */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-stone-50/80 rounded-xl p-2.5 sm:p-3 border border-stone-200/60 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[8.5px] font-bold text-stone-400 uppercase tracking-wider">
                Cấp Độ 01
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-stone-900 mt-0.5">
                Giá Bán Lẻ (B2C)
              </h3>
              <p className="text-[9.5px] text-stone-500 mt-0.5 line-clamp-1">
                Khách mua lẻ trải nghiệm.
              </p>

              <div className="mt-2 p-1.5 bg-white/80 rounded-lg border border-stone-200/50 text-[9.5px] text-stone-700 space-y-0.5">
                <div>• Mua từ: <strong>1 - 2 đơn vị / thùng</strong></div>
                <div>• Cam kết: <strong>100% chính hãng</strong></div>
                <div>• Giao nhanh toàn quốc</div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-stone-200/40 text-[9px] text-stone-400">
              Phù hợp gia đình &amp; cá nhân
            </div>
          </div>

          {/* Tier 2: Sỉ Cấp 1 */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-emerald-50/40 rounded-xl p-2.5 sm:p-3 border border-emerald-200/60 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[8.5px] font-bold text-emerald-800 uppercase tracking-wider">
                Cấp Độ 02
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-emerald-950 mt-0.5">
                Sỉ Cấp 1 (Quán F&amp;B Nhỏ)
              </h3>
              <p className="text-[9.5px] text-stone-500 mt-0.5 line-clamp-1">
                Quán cafe, tiệm bánh lên menu.
              </p>

              <div className="mt-2 p-1.5 bg-white/80 rounded-lg border border-emerald-200/50 text-[9.5px] text-emerald-950 space-y-0.5">
                <div>• Nước Mía Tuyết IQF: <strong>Từ 3 thùng</strong></div>
                <div>• Matcha / Cà phê: <strong>3 - 5 đơn vị</strong></div>
                <div>• Chiết khấu: <strong>Tiết kiệm ~ 15 - 20%</strong></div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-emerald-200/40 text-[9px] text-emerald-700 font-semibold">
              Tặng kèm Công Thức Pha Chế
            </div>
          </div>

          {/* Tier 3: Sỉ Cấp 2 */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-amber-50/40 rounded-xl p-2.5 sm:p-3 border border-amber-300/60 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-bold text-amber-700 uppercase tracking-wider">
                  Cấp Độ 03
                </span>
                <span className="px-1 py-0.2 rounded text-[7.5px] font-black bg-amber-100 text-amber-900">
                  PHỔ BIẾN
                </span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-stone-900 mt-0.5">
                Sỉ Cấp 2 (Chuỗi F&amp;B)
              </h3>
              <p className="text-[9.5px] text-stone-500 mt-0.5 line-clamp-1">
                Chuỗi cafe, tiệm trà lớn, xưởng.
              </p>

              <div className="mt-2 p-1.5 bg-white/80 rounded-lg border border-amber-200/50 text-[9.5px] text-amber-950 space-y-0.5">
                <div>• Nước Mía Tuyết IQF: <strong>Từ 10 thùng</strong></div>
                <div>• Matcha / Cà phê: <strong>10 - 20 đơn vị</strong></div>
                <div>• Chiết khấu: <strong>Tiết kiệm ~ 25 - 30%</strong></div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-amber-200/40 text-[9px] text-amber-800 font-bold">
              Xuất hóa đơn VAT &amp; Hỗ trợ bảo quản
            </div>
          </div>

          {/* Tier 4: Sỉ Cấp 3 */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-[#062616] text-white rounded-xl p-2.5 sm:p-3 border border-amber-400/40 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-bold text-amber-300 uppercase tracking-wider">
                  Cấp Độ 04
                </span>
                <span className="px-1 py-0.2 rounded text-[7.5px] font-black bg-[#d4af37] text-stone-950">
                  ĐỘC QUYỀN
                </span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-white mt-0.5">
                Sỉ Cấp 3 (Đại Lý / Xuất Khẩu)
              </h3>
              <p className="text-[9.5px] text-stone-300 mt-0.5 line-clamp-1">
                Tổng đại lý, Container, Xuất khẩu.
              </p>

              <div className="mt-2 p-1.5 bg-white/10 rounded-lg border border-white/10 text-[9.5px] text-stone-200 space-y-0.5">
                <div>• Số lượng: <strong>Từ 30 - 50 đơn vị trở lên</strong></div>
                <div>• Tỷ giá ngoại tệ: <strong>Tự động ({rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '26.125'}₫)</strong></div>
                <div>• Ưu tiên cung ứng độc quyền theo quý</div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-emerald-800/80 text-[9px] text-amber-300 font-bold">
              Ký kết hợp đồng Tổng Đại Lý
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
