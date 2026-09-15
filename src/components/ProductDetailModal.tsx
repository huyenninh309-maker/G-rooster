import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Sparkles,
  Info,
} from 'lucide-react';
import { Product, Currency, PurchaseMode } from '../types';
import {
  getProductWholesaleConfig,
  calculateModePricing,
  formatPrice,
} from '../utils/pricing';
import { HealthBenefitsSection } from './HealthBenefitsSection';
import { getProductHealthBenefits } from '../data/healthBenefits';
import { RECIPES } from '../data/recipes';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  initialMode?: PurchaseMode;
  currency: Currency;
  exchangeRate?: number;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, purchaseMode: PurchaseMode) => void;
  onOpenQR: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialMode = 'retail',
  currency,
  exchangeRate,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>(initialMode);
  const [retailQty, setRetailQty] = useState(1);
  const [wholesaleQty, setWholesaleQty] = useState(1);
  const [rawInput, setRawInput] = useState<string | null>(null);
  const [minNotice, setMinNotice] = useState<string | null>(null);
  const noticeTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Sync mode and quantity whenever a new product opens or initialMode changes
  useEffect(() => {
    if (product) {
      const wConfig = getProductWholesaleConfig(product);
      setPurchaseMode(initialMode || 'retail');
      setRetailQty(1);
      setWholesaleQty(wConfig.minWholesaleQty);
      setRawInput(null);
      setMinNotice(null);
    }
  }, [product, initialMode]);

  if (!isOpen || !product) return null;

  const wholesaleConfig = getProductWholesaleConfig(product);

  // Calculate pricing based on current active tab & quantity typed
  const activeQty = purchaseMode === 'retail' ? retailQty : wholesaleQty;
  const pricing = calculateModePricing(product, purchaseMode, activeQty);

  const showGentleNotice = (message: string) => {
    setMinNotice(message);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setMinNotice(null);
    }, 3500);
  };

  const handleTabChange = (newMode: PurchaseMode) => {
    setPurchaseMode(newMode);
    setRawInput(null);
    setMinNotice(null);
    if (newMode === 'wholesale') {
      setWholesaleQty((prev) => Math.max(wholesaleConfig.minWholesaleQty, prev));
    }
  };

  const handleIncrement = () => {
    setRawInput(null);
    if (minNotice) setMinNotice(null);
    if (purchaseMode === 'retail') {
      setRetailQty((q) => q + 1);
    } else {
      setWholesaleQty((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    setRawInput(null);
    if (minNotice) setMinNotice(null);
    if (purchaseMode === 'retail') {
      if (retailQty > 1) {
        setRetailQty((q) => q - 1);
      }
    } else {
      if (wholesaleQty > wholesaleConfig.minWholesaleQty) {
        setWholesaleQty((q) => q - 1);
      } else {
        showGentleNotice(`Số lượng sỉ tối thiểu là ${wholesaleConfig.minWholesaleQty} ${wholesaleConfig.wholesaleUnit}.`);
      }
    }
  };

  const handleQuantityInputChange = (valStr: string) => {
    const digitsOnly = valStr.replace(/\D/g, '');
    setRawInput(digitsOnly);
    if (minNotice) setMinNotice(null);

    if (digitsOnly !== '') {
      const num = parseInt(digitsOnly, 10);
      if (!isNaN(num) && num > 0) {
        // Cập nhật giá sỉ (Sỉ 1, 2, 3) và Tổng tiền ngay lập tức khi khách gõ
        if (purchaseMode === 'retail') {
          setRetailQty(num);
        } else {
          setWholesaleQty(num);
        }
      }
    }
  };

  const handleInputBlur = () => {
    const minAllowed = purchaseMode === 'retail' ? 1 : wholesaleConfig.minWholesaleQty;
    let finalQty = purchaseMode === 'retail' ? retailQty : wholesaleQty;

    if (rawInput !== null) {
      const parsed = parseInt(rawInput, 10);
      finalQty = isNaN(parsed) || parsed < 1 ? 0 : parsed;
    }

    if (finalQty < minAllowed) {
      if (purchaseMode === 'retail') {
        setRetailQty(1);
      } else {
        setWholesaleQty(minAllowed);
      }
      setRawInput(null);

      const notice =
        purchaseMode === 'retail'
          ? `Số lượng mua lẻ tối thiểu là 1 ${product.retailUnit || product.unit}. Đã tự động đưa về 1.`
          : `Số lượng sỉ tối thiểu là ${minAllowed} ${wholesaleConfig.wholesaleUnit}. Đã tự động đưa về mức tối thiểu!`;
      showGentleNotice(notice);
    } else {
      if (purchaseMode === 'retail') {
        setRetailQty(finalQty);
      } else {
        setWholesaleQty(finalQty);
      }
      setRawInput(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleBuyRetail = () => {
    setPurchaseMode('retail');
    onAddToCart(product, retailQty, 'retail');
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyWholesale = () => {
    setPurchaseMode('wholesale');
    const qty = Math.max(wholesaleConfig.minWholesaleQty, wholesaleQty);
    onAddToCart(product, qty, 'wholesale');
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleAdd = () => {
    if (purchaseMode === 'wholesale') {
      handleBuyWholesale();
    } else {
      handleBuyRetail();
    }
  };

  const isMinQty =
    purchaseMode === 'retail'
      ? retailQty <= 1
      : wholesaleQty <= wholesaleConfig.minWholesaleQty;

  const displayQuantity =
    rawInput !== null ? rawInput : (purchaseMode === 'retail' ? retailQty : wholesaleQty);

  // Filter recipes relevant specifically to this product
  const relatedRecipes = RECIPES.filter((r) => {
    if (r.productIds && r.productIds.includes(product.id)) return true;
    if (r.partnerId === product.partnerId) {
      // Keyword overlap
      const pNameLower = product.name.toLowerCase();
      const rTitleLower = r.title.toLowerCase();
      const rProductLower = r.productName.toLowerCase();
      if (pNameLower.includes('mía') && (rTitleLower.includes('mía') || rProductLower.includes('mía'))) return true;
      if (pNameLower.includes('matcha') && (rTitleLower.includes('matcha') || rProductLower.includes('matcha'))) return true;
      if (pNameLower.includes('cascara') && (rTitleLower.includes('cascara') || rProductLower.includes('cascara'))) return true;
      if (pNameLower.includes('sâm') && (rTitleLower.includes('sâm') || rProductLower.includes('sâm'))) return true;
      if (pNameLower.includes('cà phê') && (rTitleLower.includes('cà phê') || rProductLower.includes('cà phê') || rTitleLower.includes('cold brew'))) return true;
      return true;
    }
    return false;
  }).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Accent Ribbon */}
        <div className="h-1 w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-emerald-950 text-amber-300 uppercase">
              <Award className="w-3.5 h-3.5 text-[#d4af37]" />
              {product.partnerName}
            </span>
            <span className="text-xs text-stone-500 hidden sm:inline">
              • Mã SP: {product.barcode}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-full transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-3 sm:p-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-6">
          {/* Left Column: Image & Compact Certifications Badge Only (No QR Code) */}
          <div className="md:col-span-5 flex flex-col gap-2.5">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-white font-medium">
                Quy cách: {product.packaging}
              </div>
            </div>

            {/* Khối Chứng nhận chất lượng: Nhỏ gọn, tinh tế ngay dưới ảnh cho mọi thiết bị */}
            <div className="w-full bg-white rounded-[12px] border border-gray-200/80 p-2.5 sm:p-3 shadow-2xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-950 uppercase tracking-wider shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Chứng nhận:</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                {product.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-[10px] sm:text-[10.5px] font-semibold bg-stone-50 border border-emerald-300/70 text-emerald-950 shadow-2xs"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Title, Immediate Price Hero, Buy Actions, Then Health Benefits & Details */}
          <div className="md:col-span-7 flex flex-col">
            <div>
              {/* Category & Partner Header */}
              <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span className="text-[11px] font-medium text-stone-400">
                  {product.origin ? `Xuất xứ: ${product.origin}` : 'Nông sản tuyển chọn'}
                </span>
              </div>

              {/* Product Name (17px on mobile, scaling to 22px on desktop) */}
              <h2 className="text-[17px] sm:text-xl md:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug">
                {product.name}
              </h2>
              {product.variant && (
                <div className="text-xs sm:text-sm text-stone-500 mt-0.5 font-medium italic">
                  {product.variant}
                </div>
              )}

              {/* IMMEDIATE PRICE HERO: Khách thấy ngay "món hàng này giá bao nhiêu" */}
              <div className="mt-2.5 p-3 rounded-2xl bg-stone-50/90 border border-stone-200/80 flex items-center justify-between shadow-2xs">
                <div>
                  <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    {purchaseMode === 'retail' ? 'Giá Bán Lẻ Tiêu Chuẩn' : 'Giá Sỉ B2B Hiện Tại'}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight flex items-baseline gap-1 mt-0.5">
                    <span>{formatPrice(pricing.unitPrice, currency, exchangeRate)}</span>
                    <span className="text-sm font-bold text-emerald-800">
                      /{pricing.unit}
                    </span>
                    {purchaseMode === 'retail' && product.unitsPerWholesale && product.wholesaleUnit === 'THÙNG' && (
                      <span className="text-xs font-medium text-stone-500 ml-1">
                        (~{formatPrice(product.prices.retail * product.unitsPerWholesale, currency, exchangeRate)}/thùng)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-200">
                    {pricing.activeTierLabel}
                  </span>
                  <div className="text-[10px] text-stone-500 mt-1 font-medium">
                    {purchaseMode === 'wholesale'
                      ? `Tối thiểu ${wholesaleConfig.minWholesaleQty} ${wholesaleConfig.wholesaleUnit}`
                      : 'Mua từ 1 đơn vị'}
                  </div>
                </div>
              </div>

              {/* TỐI GIẢN: THANH GẠT TAB SEGMENT [ MUA LẺ ] / [ MUA SỈ B2B ] */}
              <div className="mt-2.5">
                <div className="p-1 bg-stone-100/90 rounded-full flex items-center max-w-md mx-auto relative border border-stone-200/60 shadow-inner">
                  <button
                    type="button"
                    id="modal-tab-retail"
                    onClick={() => handleTabChange('retail')}
                    className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      purchaseMode === 'retail'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>MUA LẺ ({product.retailUnit || product.unit})</span>
                  </button>

                  <button
                    type="button"
                    id="modal-tab-wholesale"
                    onClick={() => handleTabChange('wholesale')}
                    className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      purchaseMode === 'wholesale'
                        ? 'bg-emerald-950 text-amber-300 shadow-xs'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>MUA SỈ B2B ({wholesaleConfig.wholesaleUnit})</span>
                  </button>
                </div>
              </div>

              {/* DYNAMIC PRICING VIEW */}
              {purchaseMode === 'retail' ? (
                /* KHI CHỌN TAB [ MUA LẺ ]: Nhẹ nhàng, ít đường kẻ */
                <div className="mt-2.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-200/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-700">Đóng gói chuẩn thương hiệu:</span>
                    <span className="font-semibold text-emerald-900">{product.packaging}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Thích hợp dùng thử, thưởng thức gia đình hoặc làm quà tặng. Khách quán & đại lý chọn tab <strong>MUA SỈ (B2B)</strong> để nhận giá chiết khấu theo số lượng.
                  </div>
                </div>
              ) : (
                /* KHI CHỌN TAB [ MUA SỈ ]: SMART GRID 3 CỘT NGANG + VÀNG GOLD CHO MỨC HỜI NHẤT */
                <div className="mt-2.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-200/60">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="text-[11px] font-bold text-stone-800 uppercase tracking-wider">
                      Bảng Giá Sỉ 3 Mức ({wholesaleConfig.wholesaleUnit})
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-200">
                      Tối thiểu {wholesaleConfig.minWholesaleQty} {wholesaleConfig.wholesaleUnit}
                    </span>
                  </div>

                  {/* 3 Wholesale Tiers Grid - 3 CỘT TRÊN 1 HÀNG */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                    {([
                      wholesaleConfig.tiers.wholesale1,
                      wholesaleConfig.tiers.wholesale2,
                      wholesaleConfig.tiers.wholesale3,
                    ] as const).map((t, idx) => {
                      const isBest = idx === 2; // Sỉ 3 (Hời nhất)
                      const isActive = pricing.activeTier === t.tier;
                      return (
                        <div
                          key={t.tier}
                          className={`relative p-2 sm:p-2.5 rounded-xl transition-all flex flex-col justify-between ${
                            isBest
                              ? isActive
                                ? 'bg-gradient-to-b from-amber-500 via-amber-600 to-[#d4af37] text-stone-950 shadow-md ring-2 ring-amber-400 font-bold border-2 border-amber-300'
                                : 'bg-gradient-to-b from-amber-50 to-amber-100/60 border-2 border-[#d4af37] text-stone-900 shadow-2xs'
                              : isActive
                              ? 'bg-emerald-950 text-white shadow-md ring-2 ring-emerald-500 font-bold border border-emerald-900'
                              : 'bg-white border border-stone-200 text-stone-800 hover:border-stone-300'
                          }`}
                        >
                          {isBest && (
                            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-1.5 sm:px-2 py-0.2 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-wider bg-[#d4af37] text-stone-950 shadow-2xs whitespace-nowrap border border-amber-300">
                              ⭐ HỜI NHẤT
                            </span>
                          )}
                          <div>
                            <div className={`text-[10px] sm:text-[11px] uppercase font-bold tracking-wider ${
                              isBest && !isActive ? 'text-amber-800' : isActive ? 'text-amber-300' : 'text-stone-500'
                            }`}>
                              {t.label}
                            </div>
                            <div className={`text-xs sm:text-base font-black mt-1 ${
                              isBest && !isActive ? 'text-stone-900' : isActive ? 'text-white' : 'text-stone-900'
                            }`}>
                              {formatPrice(t.price, currency, exchangeRate)}
                            </div>
                            <div className={`text-[9.5px] font-semibold ${
                              isBest && !isActive ? 'text-amber-800' : isActive ? 'text-amber-200' : 'text-emerald-800'
                            }`}>
                              /{wholesaleConfig.wholesaleUnit}
                            </div>
                          </div>
                          <div className={`text-[8.5px] sm:text-[9.5px] mt-1 pt-1 border-t ${
                            isBest ? 'border-amber-300/40 text-amber-900 font-semibold' : 'border-stone-200/60 text-stone-500'
                          }`}>
                            ~{formatPrice(t.equivalentPiecePrice, currency, exchangeRate)}/{product.retailUnit?.split(' ')[0] || 'đv'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Incentive Banner for Next Wholesale Tier */}
                  <div className="mt-2 pt-2 border-t border-stone-200/80">
                    {pricing.nextTier ? (
                      <div className="flex items-center justify-between text-[11px] text-amber-900 bg-amber-50/90 p-2 rounded-xl border border-amber-200/80">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          Thêm <strong>{pricing.nextTier.neededQty} {wholesaleConfig.wholesaleUnit}</strong> để lên <strong>{pricing.nextTier.label}</strong>
                        </span>
                        <span className="font-bold text-emerald-800 shrink-0">
                          Tiết kiệm {formatPrice(pricing.nextTier.savePerUnit, currency, exchangeRate)}/{wholesaleConfig.wholesaleUnit}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 p-2 rounded-xl border border-emerald-200">
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        Chúc mừng! Bạn đã nhận mức chiết khấu Đại Lý (Sỉ Cấp 3) tối đa!
                      </div>
                    )}
                  </div>

                  {/* Alibaba B2B Container Export Pricing (FCL & OEM) if applicable */}
                  {product.exportPricing && (
                    <div className="mt-2 pt-2 border-t border-stone-200/80">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10.5px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          Xuất Khẩu FCL (Container) & OEM
                        </span>
                        {product.exportPricing.usdEstimate && (
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                            USD FOB: {product.exportPricing.usdEstimate}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-2xs">
                          <div className="text-[9.5px] text-stone-500 font-medium">FCL Nguyên Bản</div>
                          <div className="text-xs sm:text-sm font-bold text-emerald-950 mt-0.5">
                            {formatPrice(product.exportPricing.fclNoOem, currency, exchangeRate)}
                          </div>
                          <div className="text-[9px] text-stone-400 mt-0.5">Đơn vị: {product.exportPricing.unitLabel}</div>
                        </div>

                        <div className="bg-white p-2 rounded-xl border border-amber-200/80 shadow-2xs">
                          <div className="text-[9.5px] text-amber-800 font-medium">FCL Gia Công OEM</div>
                          <div className="text-xs sm:text-sm font-bold text-amber-950 mt-0.5">
                            {formatPrice(product.exportPricing.fclOem, currency, exchangeRate)}
                          </div>
                          <div className="text-[9px] text-stone-400 mt-0.5">Bao bì nhãn riêng</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* NÚT MUA NHANH TRÊN DESKTOP: Giúp khách ra quyết định mua hàng trong 3 giây */}
              <div className="hidden md:flex items-center justify-between gap-3 mt-3.5 p-3 rounded-2xl bg-white border border-stone-200 shadow-2xs">
                {/* Stepper + Total Price */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      disabled={isMinQty}
                      className={`w-8 h-8 flex items-center justify-center text-stone-700 transition-colors ${
                        isMinQty ? 'opacity-30 cursor-not-allowed' : 'hover:bg-stone-200 active:scale-90'
                      }`}
                      title="Giảm"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="text"
                      value={displayQuantity}
                      onChange={(e) => handleQuantityInputChange(e.target.value)}
                      onBlur={handleInputBlur}
                      className="w-10 h-8 text-center font-black text-xs text-stone-900 border-x border-stone-200 bg-transparent"
                    />
                    <button
                      onClick={handleIncrement}
                      className="w-8 h-8 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-90"
                      title="Tăng"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <div className="text-[9px] text-stone-400 uppercase font-semibold">Tổng ({pricing.unit})</div>
                    <div className="text-sm font-black text-emerald-950">
                      {formatPrice(pricing.totalPrice, currency, exchangeRate)}
                    </div>
                  </div>
                </div>

                {/* Desktop Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98] ${
                      addedSuccess
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-emerald-950 hover:bg-emerald-900 text-white'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                        <span>Đã thêm!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                        <span>Thêm vào giỏ</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://zalo.me/0961525450"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3.5 rounded-xl border border-amber-500/40 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs transition-colors flex items-center gap-1"
                  >
                    Tư vấn Zalo
                  </a>
                </div>
              </div>

              {/* PHẦN CÔNG DỤNG & GIÁ TRỊ SỨC KHỎE: Trình bày theo dạng thẻ sạch sẽ ngay sau giá & nút mua */}
              <div className="mt-4">
                <HealthBenefitsSection
                  healthData={getProductHealthBenefits(product)}
                  partnerName={product.partnerName}
                />
              </div>

              {/* Mô Tả Sản Phẩm: Thoáng đãng, tinh tế */}
              <div className="mt-4 p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/70">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                  Mô Tả Sản Phẩm
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Thông số kỹ thuật & Xuất xứ */}
              <div className="mt-3.5">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                  Thông Số Kỹ Thuật & Xuất Xứ
                </h4>
                <div className="rounded-xl border border-stone-200 overflow-hidden text-xs bg-white">
                  <div className="flex border-b border-stone-200 bg-stone-50/80 px-3 py-2">
                    <span className="w-32 font-semibold text-stone-600">Vùng nguyên liệu:</span>
                    <span className="flex-1 text-stone-900 font-medium">{product.origin}</span>
                  </div>
                  <div className="flex border-b border-stone-200 bg-white px-3 py-2">
                    <span className="w-32 font-semibold text-stone-600">Hạn sử dụng:</span>
                    <span className="flex-1 text-stone-900 font-medium">{product.shelfLife}</span>
                  </div>
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <div
                      key={key}
                      className={`flex border-b last:border-0 border-stone-200 px-3 py-2 ${
                        idx % 2 === 0 ? 'bg-stone-50/80' : 'bg-white'
                      }`}
                    >
                      <span className="w-32 font-semibold text-stone-600">{key}:</span>
                      <span className="flex-1 text-stone-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gợi Ý Công Thức Pha Chế: 2 cột đều nhau trên Mobile & Card thanh thoát */}
              {relatedRecipes.length > 0 && (
                <div className="mt-4 p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-800" />
                      <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                        Công Thức Pha Chế Với {product.name}
                      </h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-bold font-mono border border-emerald-200">
                      {relatedRecipes.length} món
                    </span>
                  </div>

                  {/* Hiển thị chuẩn 2 cột đều nhau trên Mobile & Tablet & Desktop */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {relatedRecipes.map((r) => {
                      const profit =
                        r.profitPerServing ?? r.recommendedMenuPrice - r.costPerServing;
                      const margin =
                        r.profitMarginPercent ??
                        Math.round((profit / r.recommendedMenuPrice) * 100);

                      return (
                        <div
                          key={r.id}
                          className="bg-stone-50/70 rounded-xl border border-stone-200/80 p-2 sm:p-2.5 flex flex-col justify-between hover:bg-white hover:border-emerald-700/40 hover:shadow-2xs transition-all"
                        >
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-200 mb-1.5">
                            <img
                              src={r.image}
                              alt={r.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 right-1 px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold bg-black/70 text-white backdrop-blur-xs flex items-center gap-0.5">
                              <Clock className="w-2 h-2 text-amber-400" />
                              {r.prepTime}
                            </div>
                          </div>

                          <div>
                            <div className="text-[11px] sm:text-xs font-bold text-stone-900 line-clamp-1 leading-snug">
                              {r.title}
                            </div>
                            <div className="text-[9.5px] sm:text-[10px] text-emerald-800 font-bold mt-0.5">
                              Biên lời ~{margin}%
                            </div>
                          </div>

                          <div className="mt-1 pt-1 border-t border-stone-200/70 text-[9px] sm:text-[10px] text-stone-600 flex items-center justify-between">
                            <span>Vốn: <strong className="font-mono text-stone-800">{formatPrice(r.costPerServing, currency, exchangeRate)}</strong></span>
                            <span>Lời: <strong className="font-mono text-emerald-700">+{formatPrice(profit, currency, exchangeRate)}</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STICKY BOTTOM ACTION BAR: Cố định dưới cùng màn hình (Không có dòng 15 đại lý) */}
        <div className="shrink-0 bg-white/95 backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 border-t border-stone-200/80 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] z-20">
          <div className="flex items-center gap-2 sm:gap-3 w-full">
            {/* Left: Stepper + Total Price */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 shadow-2xs overflow-hidden">
                <button
                  onClick={handleDecrement}
                  disabled={isMinQty}
                  className={`w-7 sm:w-8 h-8 sm:h-9 flex items-center justify-center text-stone-700 transition-colors ${
                    isMinQty
                      ? 'opacity-30 cursor-not-allowed bg-stone-100'
                      : 'hover:bg-stone-200 active:scale-90'
                  }`}
                  title={isMinQty ? `Đã đạt số lượng tối thiểu (${pricing.minAllowedQty})` : 'Giảm 1'}
                  aria-label="Giảm số lượng"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  id={`modal-qty-input-${product.id}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={displayQuantity}
                  onChange={(e) => handleQuantityInputChange(e.target.value)}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  onFocus={(e) => e.target.select()}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="w-9 sm:w-11 h-8 sm:h-9 text-center font-black text-xs sm:text-sm text-stone-900 bg-transparent focus:bg-amber-50 focus:outline-none border-x border-stone-200"
                  aria-label="Số lượng đặt mua"
                />
                <button
                  onClick={handleIncrement}
                  className="w-7 sm:w-8 h-8 sm:h-9 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-90 transition-colors"
                  aria-label="Tăng số lượng"
                  title="Tăng 1"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Total Price */}
              <div className="hidden sm:flex flex-col justify-center">
                <div className="text-[9px] text-stone-400 uppercase tracking-wider font-semibold leading-none">
                  Tổng ({pricing.unit})
                </div>
                <div className="text-sm sm:text-base font-black text-emerald-950 tracking-tight leading-tight mt-0.5 whitespace-nowrap">
                  {formatPrice(pricing.totalPrice, currency, exchangeRate)}
                </div>
              </div>
            </div>

            {/* Right: Nút 'Thêm vào giỏ' và 'Tư vấn Zalo' NẰM TRÊN 1 HÀNG NGANG DUY NHẤT */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1">
              <button
                type="button"
                id="modal-btn-add-to-cart"
                onClick={handleAdd}
                className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98] h-8 sm:h-9 ${
                  addedSuccess
                    ? 'bg-amber-500 text-stone-950 shadow-amber-500/25'
                    : 'bg-emerald-950 hover:bg-emerald-900 text-white shadow-emerald-950/20'
                }`}
                title={`Thêm ${displayQuantity} ${pricing.unit} vào giỏ hàng`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 stroke-[3]" />
                    <span className="whitespace-nowrap">Đã thêm!</span>
                  </>
                ) : (
                  <>
                    {purchaseMode === 'retail' ? (
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    )}
                    <span className="whitespace-nowrap truncate text-[11px] sm:text-xs uppercase tracking-wider">
                      Thêm vào giỏ
                    </span>
                  </>
                )}
              </button>

              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noreferrer"
                className="py-2 sm:py-2.5 px-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl border border-amber-500/40 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs transition-colors flex items-center justify-center gap-1 shrink-0 h-8 sm:h-9 whitespace-nowrap"
                title="Tư vấn sỉ qua Zalo"
              >
                <span>Tư vấn Zalo</span>
              </a>
            </div>
          </div>

          {/* Gentle Notice when quantity is auto-corrected to minimum */}
          {minNotice && (
            <div
              id={`modal-min-notice-${product.id}`}
              className="mt-1.5 p-1.5 rounded-lg bg-amber-50 border border-amber-300/80 text-[11px] font-medium text-amber-900 flex items-center gap-1.5 shadow-2xs"
            >
              <span className="text-amber-600 shrink-0 text-xs">⚠️</span>
              <span className="leading-tight">{minNotice}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
