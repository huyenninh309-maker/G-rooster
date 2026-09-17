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
    <section id="chinh-sach-si" className="py-12 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold bg-[#d4af37]/20 text-[#8e6b12] border border-[#d4af37]/40 uppercase tracking-wider mb-2">
            <Layers className="w-3 h-3 text-[#d4af37]" />
            HỆ THỐNG GIÁ SỈ MINH BẠCH & TỰ ĐỘNG
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-950 tracking-tight">
            Chính Sách 4 Mức Giá Sỉ Minh Bạch & Tự Động Nhảy Giá
          </h2>
          <p className="text-[11px] sm:text-xs text-stone-600 mt-1.5 max-w-2xl mx-auto">
            Không cần thương lượng hay chờ đợi báo giá thủ công. Hệ thống Chút Chíu tự động áp mức giá ưu đãi nhất khi số lượng tăng lên theo từng cấp bậc đơn hàng.
          </p>
        </div>

        {/* 4 Tiers Comparison: Carousel/Slider on mobile (gạt ngang: Lẻ -> Sỉ 1 -> Sỉ 2 -> Sỉ 3), Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 scrollbar-thin">
          {/* Tier 1: Lẻ */}
          <div className="w-[78vw] max-w-[270px] sm:w-auto sm:max-w-none shrink-0 snap-start bg-white rounded-2xl p-4 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[9.5px] font-bold text-stone-500 uppercase tracking-wider">
                Cấp Độ 01
              </div>
              <h3 className="text-sm sm:text-base font-black text-stone-900 mt-0.5">
                Giá Bán Lẻ (B2C)
              </h3>
              <p className="text-[10.5px] text-stone-500 mt-0.5 leading-relaxed">
                Dành cho khách mua lẻ trải nghiệm sản phẩm nông sản cao cấp.
              </p>

              <div className="mt-3 p-2.5 bg-stone-50 rounded-xl border border-stone-200/80 text-[10.5px] text-stone-700 space-y-1">
                <div>• Số lượng: <strong>1 - 2 đơn vị / thùng</strong></div>
                <div>• Cam kết: <strong>100% chính hãng</strong></div>
                <div>• Hỗ trợ: Giao nhanh toàn quốc</div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-stone-100 text-[10px] text-stone-400">
              Phù hợp gia đình &amp; cá nhân
            </div>
          </div>

          {/* Tier 2: Sỉ Cấp 1 */}
          <div className="w-[78vw] max-w-[270px] sm:w-auto sm:max-w-none shrink-0 snap-start bg-white rounded-2xl p-4 border border-emerald-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-[9.5px] font-bold text-emerald-800 uppercase tracking-wider">
                Cấp Độ 02
              </div>
              <h3 className="text-sm sm:text-base font-black text-emerald-950 mt-0.5">
                Sỉ Cấp 1 (Quán F&amp;B Nhỏ)
              </h3>
              <p className="text-[10.5px] text-stone-500 mt-0.5 leading-relaxed">
                Dành cho quán cafe, tiệm bánh bắt đầu đưa món vào menu.
              </p>

              <div className="mt-3 p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-200/70 text-[10.5px] text-emerald-950 space-y-1">
                <div>• Vua Mía: <strong>Từ 3 thùng trở lên</strong></div>
                <div>• Matcha / Cà phê: <strong>Từ 3 - 5 đơn vị</strong></div>
                <div>• Chiết khấu: <strong>Tiết kiệm ~ 15 - 20%</strong></div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-emerald-100 text-[10px] text-emerald-700 font-semibold">
              Tặng kèm Công Thức Pha Chế
            </div>
          </div>

          {/* Tier 3: Sỉ Cấp 2 */}
          <div className="w-[78vw] max-w-[270px] sm:w-auto sm:max-w-none shrink-0 snap-start bg-white rounded-2xl p-4 border border-amber-300 shadow-md ring-1 ring-amber-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-bold text-amber-700 uppercase tracking-wider">
                  Cấp Độ 03
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-amber-100 text-amber-900">
                  PHỔ BIẾN
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-stone-900 mt-0.5">
                Sỉ Cấp 2 (Chuỗi F&amp;B)
              </h3>
              <p className="text-[10.5px] text-stone-500 mt-0.5 leading-relaxed">
                Dành cho chuỗi cửa hàng F&amp;B, tiệm trà lớn, xưởng bánh.
              </p>

              <div className="mt-3 p-2.5 bg-amber-50/70 rounded-xl border border-amber-200 text-[10.5px] text-amber-950 space-y-1">
                <div>• Vua Mía: <strong>Từ 10 thùng trở lên</strong></div>
                <div>• Matcha / Cà phê: <strong>Từ 10 - 20 đơn vị</strong></div>
                <div>• Chiết khấu: <strong>Tiết kiệm ~ 25 - 30%</strong></div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-amber-100 text-[10px] text-amber-800 font-bold">
              Xuất hóa đơn VAT &amp; Hỗ trợ bảo quản
            </div>
          </div>

          {/* Tier 4: Sỉ Cấp 3 */}
          <div className="w-[78vw] max-w-[270px] sm:w-auto sm:max-w-none shrink-0 snap-start bg-gradient-to-br from-emerald-950 to-[#082a17] text-white rounded-2xl p-4 border border-amber-400/50 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-bold text-amber-300 uppercase tracking-wider">
                  Cấp Độ 04
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-[#d4af37] text-stone-950">
                  ĐỘC QUYỀN
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-white mt-0.5">
                Sỉ Cấp 3 (Đại Lý / Xuất Khẩu)
              </h3>
              <p className="text-[10.5px] text-stone-300 mt-0.5 leading-relaxed">
                Mức giá sỉ tối ưu tuyệt đối cho Tổng đại lý, Container, Xuất khẩu.
              </p>

              <div className="mt-3 p-2.5 bg-white/10 rounded-xl border border-white/10 text-[10.5px] text-stone-200 space-y-1 backdrop-blur-sm">
                <div>• Số lượng: <strong>Từ 30 - 50 đơn vị trở lên</strong></div>
                <div>• Tỷ giá ngoại tệ: <strong>Tự động (Dự phòng 26.125₫)</strong></div>
                <div>• Đặc quyền: Ưu tiên cung ứng độc quyền theo quý</div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-emerald-800 text-[10px] text-amber-300 font-bold">
              Ký kết hợp đồng cung ứng Tổng Đại Lý
            </div>
          </div>
        </div>

        {/* Voucher & USD rate Highlights Bar - NÉN GỌN 30%+ CHO MOBILE */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Voucher 50k Promo */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shadow-md">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="p-2 bg-white rounded-xl shadow-xs text-amber-700 shrink-0">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider bg-black/15 px-1.5 py-0.2 rounded text-stone-950">
                  ƯU ĐÃI ĐẶC QUYỀN
                </span>
                <h4 className="text-xs sm:text-sm font-black tracking-tight mt-0.5 line-clamp-1">
                  Voucher Giảm 50.000₫ Cho Đơn Sỉ Đầu Tiên
                </h4>
                <p className="text-[10.5px] text-stone-900 line-clamp-1">
                  Nhập mã tại giỏ hàng để được trừ trực tiếp 50k vào đơn hàng.
                </p>
              </div>
            </div>

            <button
              id="copy-voucher-code"
              onClick={handleCopyVoucher}
              className="w-full sm:w-auto px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-stone-950 hover:bg-black text-amber-300 font-mono font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95 shrink-0 h-8 sm:h-auto"
            >
              {copiedVoucher ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ĐÃ CHÉP MÃ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>CHUTCHIU50K</span>
                </>
              )}
            </button>
          </div>

          {/* Dynamic Currency Rate Info */}
          <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <div className="p-2 bg-emerald-50 rounded-xl text-emerald-900 border border-emerald-200 relative shrink-0">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                {rateInfo?.isLive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white animate-ping" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                    XUẤT KHẨU &amp; ĐỐI TÁC NGOẠI TỆ
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      rateInfo?.isLive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {rateInfo?.isLive ? 'Trực tiếp' : 'Dự phòng'}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 flex items-center gap-1.5 line-clamp-1">
                  <span>
                    1 USD = {rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : '26.125'} VND
                  </span>
                  {onRefreshRate && (
                    <button
                      onClick={onRefreshRate}
                      disabled={isRefreshing}
                      className="text-stone-400 hover:text-emerald-700 p-0.5 rounded hover:bg-stone-100 transition-colors"
                      title="Cập nhật tỷ giá mới nhất"
                    >
                      <RotateCw
                        className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-700' : ''}`}
                      />
                    </button>
                  )}
                </h4>
                <p className="text-[10px] sm:text-[10.5px] text-stone-500 line-clamp-1">
                  {rateInfo
                    ? `${rateInfo.provider} • Cập nhật: ${rateInfo.lastUpdatedFormatted || 'Hôm nay'}`
                    : 'Tự động cập nhật từ Currency API'}
                </p>
              </div>
            </div>

            <button
              onClick={onScrollToCatalog}
              className="w-full sm:w-auto px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 h-8 sm:h-auto"
            >
              <span>Xem bảng giá</span>
              <ArrowRight className="w-3 h-3 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
