import React from 'react';
import {
  Layers,
  Sparkles,
  TrendingDown,
  ShieldAlert,
} from 'lucide-react';
import { Currency, ExchangeRateInfo, Language } from '../types';
import { FALLBACK_USD_RATE } from '../services/exchangeRate';

interface WholesaleTierExplainerProps {
  currency: Currency;
  language?: Language;
  onScrollToCatalog: () => void;
  rateInfo?: ExchangeRateInfo;
  onRefreshRate?: () => void;
  isRefreshing?: boolean;
}

export const WholesaleTierExplainer: React.FC<WholesaleTierExplainerProps> = ({
  rateInfo,
  language = 'VN',
}) => {
  const isEN = language === 'EN';
  const effectiveRate = rateInfo ? rateInfo.rate.toLocaleString('vi-VN') : FALLBACK_USD_RATE.toLocaleString('vi-VN');

  return (
    <section id="chinh-sach-si" className="py-9 sm:py-12 bg-stone-100/60 border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d4af37]/20 text-[#8e6b12] border border-[#d4af37]/40 uppercase tracking-wider mb-1.5">
            <Layers className="w-3 h-3 text-[#d4af37]" />
            {isEN ? 'TRANSPARENT & AUTOMATED WHOLESALE TIERS' : 'HỆ THỐNG GIÁ SỈ MINH BẠCH & TỰ ĐỘNG'}
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-stone-950 tracking-tight">
            {isEN ? 'Transparent 4-Tier Wholesale & Automated Volume Discount Policy' : 'Chính Sách 4 Mức Giá Sỉ Minh Bạch & Tự Động Nhảy Giá'}
          </h2>
          <p className="text-[11px] sm:text-xs text-stone-500 mt-1 max-w-2xl mx-auto">
            {isEN
              ? 'G-ROOSTER automatically calculates and applies the highest volume discount tier in real-time without requiring manual price negotiations.'
              : 'Hệ thống G-ROOSTER tự động áp mức giá ưu đãi nhất theo số lượng đơn hàng, không cần thương lượng thủ công.'}
          </p>
        </div>

        {/* 4 Tiers Comparison */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 sm:gap-2.5 pb-2 sm:pb-0 sm:grid sm:grid-cols-4 scrollbar-thin">
          {/* Tier 1: Lẻ */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-stone-50/80 rounded-xl p-2.5 sm:p-3 border border-stone-200/60 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[8.5px] font-bold text-stone-400 uppercase tracking-wider">
                {isEN ? 'TIER 01' : 'CẤP ĐỘ 01'}
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-stone-900 mt-0.5">
                {isEN ? 'Retail Price (B2C)' : 'Giá Bán Lẻ (B2C)'}
              </h3>
              <p className="text-[9.5px] text-stone-500 mt-0.5 line-clamp-1">
                {isEN ? 'Individual and sample trial.' : 'Khách mua lẻ trải nghiệm.'}
              </p>

              <div className="mt-2 p-1.5 bg-white/80 rounded-lg border border-stone-200/50 text-[9.5px] text-stone-700 space-y-0.5">
                <div>• {isEN ? 'Order from: ' : 'Mua từ: '}<strong>1 - 2 {isEN ? 'units/cartons' : 'đơn vị / thùng'}</strong></div>
                <div>• {isEN ? 'Commitment: ' : 'Cam kết: '}<strong>100% {isEN ? 'authentic' : 'chính hãng'}</strong></div>
                <div>• {isEN ? 'Fast nationwide & global dispatch' : 'Giao nhanh toàn quốc'}</div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-stone-200/40 text-[9px] text-stone-400">
              {isEN ? 'Ideal for families & individuals' : 'Phù hợp gia đình & cá nhân'}
            </div>
          </div>

          {/* Tier 2: Sỉ Cấp 1 */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-emerald-50/40 rounded-xl p-2.5 sm:p-3 border border-emerald-200/60 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="text-[8.5px] font-bold text-emerald-800 uppercase tracking-wider">
                {isEN ? 'TIER 02' : 'CẤP ĐỘ 02'}
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-emerald-950 mt-0.5">
                {isEN ? 'Wholesale Tier 1 (Small F&B)' : 'Sỉ Cấp 1 (Quán F&B Nhỏ)'}
              </h3>
              <p className="text-[9.5px] text-stone-500 mt-0.5 line-clamp-1">
                {isEN ? 'Coffee shops, bakeries menu rollout.' : 'Quán cafe, tiệm bánh lên menu.'}
              </p>

              <div className="mt-2 p-1.5 bg-white/80 rounded-lg border border-emerald-200/50 text-[9.5px] text-emerald-950 space-y-0.5">
                <div>• {isEN ? 'IQF Cane Snow: ' : 'Nước Mía Tuyết IQF: '}<strong>{isEN ? 'From 3 cartons' : 'Từ 3 thùng'}</strong></div>
                <div>• {isEN ? 'Matcha / Coffee: ' : 'Matcha / Cà phê: '}<strong>{isEN ? '3 - 5 units' : '3 - 5 đơn vị'}</strong></div>
                <div>• {isEN ? 'Discount: ' : 'Chiết khấu: '}<strong>{isEN ? 'Save ~15 - 20%' : 'Tiết kiệm ~ 15 - 20%'}</strong></div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-emerald-200/40 text-[9px] text-emerald-700 font-semibold">
              {isEN ? 'Complimentary Barista Recipes' : 'Tặng kèm Công Thức Pha Chế'}
            </div>
          </div>

          {/* Tier 3: Sỉ Cấp 2 */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-amber-50/40 rounded-xl p-2.5 sm:p-3 border border-amber-300/60 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-bold text-amber-700 uppercase tracking-wider">
                  {isEN ? 'TIER 03' : 'CẤP ĐỘ 03'}
                </span>
                <span className="px-1 py-0.2 rounded text-[7.5px] font-black bg-amber-100 text-amber-900">
                  {isEN ? 'POPULAR' : 'PHỔ BIẾN'}
                </span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-stone-900 mt-0.5">
                {isEN ? 'Wholesale Tier 2 (F&B Chains)' : 'Sỉ Cấp 2 (Chuỗi F&B)'}
              </h3>
              <p className="text-[9.5px] text-stone-500 mt-0.5 line-clamp-1">
                {isEN ? 'Multi-branch cafe chains & workshops.' : 'Chuỗi cafe, tiệm trà lớn, xưởng.'}
              </p>

              <div className="mt-2 p-1.5 bg-white/80 rounded-lg border border-amber-200/50 text-[9.5px] text-amber-950 space-y-0.5">
                <div>• {isEN ? 'IQF Cane Snow: ' : 'Nước Mía Tuyết IQF: '}<strong>{isEN ? 'From 10 cartons' : 'Từ 10 thùng'}</strong></div>
                <div>• {isEN ? 'Matcha / Coffee: ' : 'Matcha / Cà phê: '}<strong>{isEN ? '10 - 20 units' : '10 - 20 đơn vị'}</strong></div>
                <div>• {isEN ? 'Discount: ' : 'Chiết khấu: '}<strong>{isEN ? 'Save ~25 - 30%' : 'Tiết kiệm ~ 25 - 30%'}</strong></div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-amber-200/40 text-[9px] text-amber-800 font-bold">
              {isEN ? 'VAT e-Invoice & Cold Chain Storage Support' : 'Xuất hóa đơn VAT & Hỗ trợ bảo quản'}
            </div>
          </div>

          {/* Tier 4: Sỉ Cấp 3 */}
          <div className="w-[220px] sm:w-auto shrink-0 snap-start bg-[#062616] text-white rounded-xl p-2.5 sm:p-3 border border-amber-400/40 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-bold text-amber-300 uppercase tracking-wider">
                  {isEN ? 'TIER 04' : 'CẤP ĐỘ 04'}
                </span>
                <span className="px-1 py-0.2 rounded text-[7.5px] font-black bg-[#d4af37] text-stone-950">
                  {isEN ? 'DISTRIBUTOR' : 'ĐỘC QUYỀN'}
                </span>
              </div>
              <h3 className="text-xs sm:text-[13px] font-black text-white mt-0.5">
                {isEN ? 'Tier 3 (Master Distributor / Export)' : 'Sỉ Cấp 3 (Đại Lý / Xuất Khẩu)'}
              </h3>
              <p className="text-[9.5px] text-stone-300 mt-0.5 line-clamp-1">
                {isEN ? 'Master distributor, container & export.' : 'Tổng đại lý, Container, Xuất khẩu.'}
              </p>

              <div className="mt-2 p-1.5 bg-white/10 rounded-lg border border-white/10 text-[9.5px] text-stone-200 space-y-0.5">
                <div>• {isEN ? 'Volume: ' : 'Số lượng: '}<strong>{isEN ? 'From 30 - 50+ units' : 'Từ 30 - 50 đơn vị trở lên'}</strong></div>
                <div>• {isEN ? 'Live FX Rate: ' : 'Tỷ giá ngoại tệ: '}<strong>{isEN ? 'Real-time' : 'Tự động'} ({effectiveRate}₫)</strong></div>
                <div>• {isEN ? 'Quarterly exclusive allocation priority' : 'Ưu tiên cung ứng độc quyền theo quý'}</div>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-emerald-800/80 text-[9px] text-amber-300 font-bold">
              {isEN ? 'Master Distributor Contract & FOB/CIF Support' : 'Ký kết hợp đồng Tổng Đại Lý'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
