import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Gift,
  Check,
  Copy,
  Globe,
  ShieldAlert,
  RotateCw,
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
  currency,
  onScrollToCatalog,
  rateInfo,
  onRefreshRate,
  isRefreshing,
}) => {
  const [copiedVoucher, setCopiedVoucher] = useState(false);

  const handleCopyVoucher = () => {
    navigator.clipboard.writeText('CHUTCHIU50K');
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

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
                <div>• Vua Mía: <strong>Từ 3 thùng</strong></div>
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
                <div>• Vua Mía: <strong>Từ 10 thùng</strong></div>
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
                <div>• Tỷ giá ngoại tệ: <strong>Tự động ({rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964'}₫)</strong></div>
                <div>• Ưu tiên cung ứng độc quyền theo quý</div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-emerald-800/80 text-[9px] text-amber-300 font-bold">
              Ký kết hợp đồng Tổng Đại Lý
            </div>
          </div>
        </div>

        {/* Voucher & USD rate Highlights: Nén mỏng 2 khối thành các thanh ngang tinh tế */}
        <div className="mt-2.5 sm:mt-3.5 grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Voucher 50k Promo */}
          <div className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-300/60 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 bg-amber-500 text-stone-950 rounded-lg shrink-0">
                <Gift className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-black text-stone-950 truncate flex items-center gap-1">
                  <span>Mã CHUTCHIU50K:</span>
                  <span className="text-amber-850 font-bold">Giảm 50k đơn sỉ đầu</span>
                </div>
                <div className="text-[10px] text-stone-500 truncate">
                  Nhập mã tại giỏ hàng để được trừ trực tiếp 50k
                </div>
              </div>
            </div>

            <button
              id="copy-voucher-code"
              onClick={handleCopyVoucher}
              className="px-2.5 py-1 rounded-lg bg-stone-950 hover:bg-black text-amber-300 font-mono font-bold text-[10.5px] flex items-center gap-1 shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              {copiedVoucher ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>ĐÃ CHÉP</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>CHÉP MÃ</span>
                </>
              )}
            </button>
          </div>

          {/* Dynamic Currency Rate Info */}
          <div className="px-3 py-2 rounded-xl bg-white border border-stone-200/80 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <div className="p-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg shrink-0">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-stone-900 truncate flex items-center gap-1.5">
                  <span>1 USD = {rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '25.964'} VND</span>
                  <span className="text-[8.5px] font-bold px-1 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    {rateInfo?.isLive ? 'Trực tiếp' : 'Dự phòng'}
                  </span>
                  {onRefreshRate && (
                    <button
                      onClick={onRefreshRate}
                      disabled={isRefreshing}
                      className="text-stone-400 hover:text-emerald-700 p-0.5 rounded transition-colors cursor-pointer"
                      title="Cập nhật tỷ giá mới nhất"
                    >
                      <RotateCw
                        className={`w-2.5 h-2.5 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`}
                      />
                    </button>
                  )}
                </div>
                <div className="text-[10px] text-stone-500 truncate">
                  Tự động cập nhật • Hợp đồng xuất khẩu &amp; B2B
                </div>
              </div>
            </div>

            <button
              onClick={onScrollToCatalog}
              className="px-2.5 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-[10.5px] flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
            >
              <span>Xem giá</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
