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
import { SmartQRCode } from './SmartQRCode';
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
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8">
          {/* Left Column: Image, Certifications & Compact Supplementary QR Code */}
          <div className="md:col-span-5 flex flex-col gap-2.5 sm:gap-3">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-44 sm:h-64 object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-white font-medium">
                Quy cách: {product.packaging}
              </div>
            </div>

            {/* Khối Chứng nhận chất lượng & Mã QR Công thức nằm cạnh nhau gọn gàng, thanh thoát */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5">
              {/* Certifications Badges - Khung thanh thoát đồng bộ */}
              <div className="bg-stone-50/90 rounded-2xl border border-stone-200/90 p-3 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="text-[10px] sm:text-[10.5px] font-bold text-emerald-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Chứng nhận chất lượng</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] sm:text-[11px] font-semibold bg-white border border-emerald-300/70 text-emerald-950 shadow-2xs"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] text-stone-500 mt-2.5 pt-2 border-t border-stone-200/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 inline-block" />
                  <span>Tiêu chuẩn xuất khẩu & kiểm nghiệm</span>
                </div>
              </div>

              {/* Khối Mã QR Công Thức Thu Nhỏ - Tiện ích bổ sung sang trọng, logo Chút Chíu ở giữa */}
              <SmartQRCode product={product} size={76} compact={true} />
            </div>
          </div>

          {/* Right Column: Pricing Matrix, Quantity Selector, Description, Specs */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                {product.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight leading-snug">
                {product.name}
              </h2>
              {product.variant && (
                <div className="text-xs sm:text-sm text-stone-500 mt-0.5 font-medium italic">
                  {product.variant}
                </div>
              )}

              {/* TAB SELECTOR: [ MUA LẺ ] VÀ [ MUA SỈ ] */}
              <div className="mt-3 sm:mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-stone-600">
                    Chọn hình thức mua hàng:
                  </span>
                  <span className="text-[11px] sm:text-xs text-amber-700 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Đồng bộ đơn vị & giá tức thì
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/90 shadow-2xs">
                  <button
                    type="button"
                    id="modal-tab-retail"
                    onClick={() => handleTabChange('retail')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      purchaseMode === 'retail'
                        ? 'bg-white text-emerald-950 shadow-2xs border border-stone-200 font-black'
                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div className="text-left">
                      <div className="leading-tight">MUA LẺ</div>
                      <div className="text-[10px] font-medium text-stone-500 leading-tight">
                        Đơn vị: {product.retailUnit || product.unit}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    id="modal-tab-wholesale"
                    onClick={() => handleTabChange('wholesale')}
                    className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      purchaseMode === 'wholesale'
                        ? 'bg-emerald-950 text-amber-300 shadow-2xs border border-amber-400/40 font-black'
                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="text-left">
                      <div className="leading-tight">MUA SỈ (B2B)</div>
                      <div className="text-[10px] font-medium text-amber-200/90 leading-tight">
                        Đơn vị: {wholesaleConfig.wholesaleUnit}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* DYNAMIC PRICING VIEW */}
              {purchaseMode === 'retail' ? (
                /* KHI CHỌN TAB [ MUA LẺ ]: Đơn vị nhỏ, 1 mức giá bán lẻ duy nhất */
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/40 to-stone-50 border border-emerald-200/70 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        Giá Bán Lẻ Niêm Yết Tiêu Chuẩn
                      </span>
                      <p className="text-xs text-stone-500">
                        Áp dụng đơn vị nhỏ ({product.retailUnit || product.unit}) • Không bắt buộc số lượng tối thiểu
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                      Từ 1 {product.retailUnit?.split(' ')[0] || 'đơn vị'}
                    </span>
                  </div>

                  <div className="mt-2 p-3 bg-white rounded-xl border border-emerald-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight flex flex-wrap items-baseline gap-1.5">
                        <span>{formatPrice(product.prices.retail, currency, exchangeRate)}</span>
                        <span className="text-sm font-bold text-emerald-800">
                          /{product.retailUnit || product.unit}
                        </span>
                        {product.unitsPerWholesale && product.wholesaleUnit === 'THÙNG' && (
                          <span className="text-base sm:text-lg font-bold text-stone-600 ml-1">
                            ({formatPrice(product.prices.retail * product.unitsPerWholesale, currency, exchangeRate)}/thùng)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-stone-400" />
                        Đóng gói chuẩn quy cách: {product.packaging}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* KHI CHỌN TAB [ MUA SỈ ]: Đơn vị lớn (KG/Thùng), Bảng giá 3 cấp độ (Sỉ 1, Sỉ 2, Sỉ 3) */
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-amber-50/30 via-stone-50 to-emerald-50/30 border border-amber-200/70 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div>
                      <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                        Bảng Giá Sỉ 3 Cấp Độ ({wholesaleConfig.wholesaleUnit})
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Quy cách: 1 {wholesaleConfig.wholesaleUnit} = {product.packaging}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#d4af37]/20 text-[#916e15] border border-[#d4af37]/40">
                      Tối thiểu từ {wholesaleConfig.minWholesaleQty} {wholesaleConfig.wholesaleUnit}
                    </span>
                  </div>

                  {/* 3 Wholesale Tiers Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {([
                      wholesaleConfig.tiers.wholesale1,
                      wholesaleConfig.tiers.wholesale2,
                      wholesaleConfig.tiers.wholesale3,
                    ] as const).map((t) => {
                      const isActive = pricing.activeTier === t.tier;
                      return (
                        <div
                          key={t.tier}
                          className={`p-3 rounded-xl border transition-all ${
                            isActive
                              ? 'bg-emerald-900 border-emerald-900 text-white shadow-md ring-2 ring-amber-400 font-bold scale-[1.02]'
                              : 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                          }`}
                        >
                          <div className={`text-[11px] uppercase font-bold ${isActive ? 'text-amber-300' : 'text-stone-500'}`}>
                            {t.label}
                          </div>
                          <div className={`text-base sm:text-lg font-black mt-1 ${isActive ? 'text-white' : 'text-stone-900'}`}>
                            {formatPrice(t.price, currency, exchangeRate)}
                          </div>
                          <div className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-amber-300' : 'text-emerald-800'}`}>
                            /{wholesaleConfig.wholesaleUnit}
                          </div>
                          <div className={`text-[9.5px] mt-1 font-medium ${isActive ? 'text-emerald-200' : 'text-stone-500'}`}>
                            ~{formatPrice(t.equivalentPiecePrice, currency, exchangeRate)}/{product.retailUnit?.split(' ')[0] || 'đv'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Incentive Banner for Next Wholesale Tier */}
                  <div className="mt-3 pt-2.5 border-t border-stone-200">
                    {pricing.nextTier ? (
                      <div className="flex items-center justify-between text-xs text-amber-900 bg-amber-50/90 p-2.5 rounded-xl border border-amber-200">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                          Chỉ cần thêm <strong>{pricing.nextTier.neededQty} {wholesaleConfig.wholesaleUnit}</strong> để lên <strong>{pricing.nextTier.label}</strong>
                        </span>
                        <span className="font-bold text-emerald-800 shrink-0">
                          Tiết kiệm {formatPrice(pricing.nextTier.savePerUnit, currency, exchangeRate)}/{wholesaleConfig.wholesaleUnit}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-200">
                        <Check className="w-4 h-4 text-emerald-700" />
                        Chúc mừng! Bạn đã đạt mức chiết khấu Đại Lý (Sỉ Cấp 3) tối đa!
                      </div>
                    )}
                  </div>

                  {/* Alibaba B2B Container Export Pricing (FCL & OEM) if applicable */}
                  {product.exportPricing && (
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          Giá Xuất Khẩu FCL (Container) & Gia Công OEM
                        </span>
                        {product.exportPricing.usdEstimate && (
                          <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                            USD FOB: {product.exportPricing.usdEstimate}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs">
                          <div className="text-[10px] text-stone-500 font-medium">FCL Nguyên Bản (Không OEM)</div>
                          <div className="text-sm font-bold text-emerald-950 mt-0.5">
                            {formatPrice(product.exportPricing.fclNoOem, currency, exchangeRate)}
                          </div>
                          <div className="text-[10px] text-stone-400 mt-0.5">Đơn vị: {product.exportPricing.unitLabel}</div>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
                          <div className="text-[10px] text-amber-800 font-medium">FCL Có Gia Công OEM Riêng</div>
                          <div className="text-sm font-bold text-amber-950 mt-0.5">
                            {formatPrice(product.exportPricing.fclOem, currency, exchangeRate)}
                          </div>
                          <div className="text-[10px] text-stone-400 mt-0.5">Bao bì & Nhãn riêng đối tác</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Unit Price & Minimum Notice */}
              <div className="mt-3 p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500 font-medium">Đơn giá hiện tại: </span>
                  <span className="font-black text-emerald-950">
                    {formatPrice(pricing.unitPrice, currency, exchangeRate)}/{pricing.unit}
                  </span>
                  {purchaseMode === 'wholesale' && (
                    <span className="text-amber-800 font-semibold ml-1.5 block sm:inline">
                      • Tối thiểu {wholesaleConfig.minWholesaleQty} {wholesaleConfig.wholesaleUnit}
                    </span>
                  )}
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                  {pricing.activeTierLabel}
                </span>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                  Mô Tả Sản Phẩm
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Health Benefits & Wellness Value Section */}
              <HealthBenefitsSection
                healthData={getProductHealthBenefits(product)}
                partnerName={product.partnerName}
              />

              {/* Specifications table */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                  Thông Số Kỹ Thuật & Xuất Xứ
                </h4>
                <div className="rounded-xl border border-stone-200 overflow-hidden text-xs">
                  <div className="flex border-b border-stone-200 bg-stone-50 px-3 py-2">
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
                        idx % 2 === 0 ? 'bg-stone-50' : 'bg-white'
                      }`}
                    >
                      <span className="w-32 font-semibold text-stone-600">{key}:</span>
                      <span className="flex-1 text-stone-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gợi Ý Công Thức Pha Chế Dành Riêng Cho Sản Phẩm Này */}
              {relatedRecipes.length > 0 && (
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 via-stone-50 to-amber-50/40 border border-emerald-800/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-800" />
                      <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                        Công Thức Ứng Dụng Với {product.name}
                      </h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold font-mono">
                      {relatedRecipes.length} công thức
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {relatedRecipes.map((r) => {
                      const profit =
                        r.profitPerServing ?? r.recommendedMenuPrice - r.costPerServing;
                      const margin =
                        r.profitMarginPercent ??
                        Math.round((profit / r.recommendedMenuPrice) * 100);

                      return (
                        <div
                          key={r.id}
                          className="bg-white rounded-xl border border-stone-200/90 p-2.5 shadow-2xs hover:shadow-sm hover:border-emerald-700/50 transition-all flex gap-2.5 items-center"
                        >
                          <img
                            src={r.image}
                            alt={r.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-bold text-stone-900 line-clamp-1">
                              {r.title}
                            </div>
                            <div className="flex items-center gap-1.5 text-[9.5px] text-stone-500 mt-0.5">
                              <span className="inline-flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5 text-amber-500" />
                                {r.prepTime}
                              </span>
                              <span>•</span>
                              <span className="text-emerald-800 font-bold">Lời ~{margin}%</span>
                            </div>
                            <div className="text-[10px] text-stone-600 mt-0.5">
                              Vốn: <strong className="font-mono text-stone-800">{formatPrice(r.costPerServing, currency, exchangeRate)}</strong> | Lời: <strong className="font-mono text-emerald-700">+{formatPrice(profit, currency, exchangeRate)}</strong>
                            </div>
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

        {/* STICKY BOTTOM ACTION BAR: Always accessible on mobile & desktop */}
        <div className="shrink-0 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-6 sm:py-3.5 border-t border-stone-200 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] z-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            {/* Left: Compact Stepper + Total Price */}
            <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-stone-500 font-medium">SL:</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs overflow-hidden">
                  <button
                    onClick={handleDecrement}
                    disabled={isMinQty}
                    className={`w-8 h-8 flex items-center justify-center text-stone-600 transition-colors ${
                      isMinQty
                        ? 'opacity-40 cursor-not-allowed bg-stone-100'
                        : 'hover:bg-stone-100 active:bg-stone-200'
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
                    className="w-12 h-8 text-center font-black text-xs sm:text-sm text-stone-900 bg-white focus:bg-amber-50/80 focus:outline-none selection:bg-emerald-800 selection:text-white border-x border-stone-200"
                    title="Nhấp để gõ trực tiếp số lượng"
                    aria-label="Số lượng đặt mua"
                  />
                  <button
                    onClick={handleIncrement}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 active:bg-stone-200 transition-colors"
                    aria-label="Tăng số lượng"
                    title="Tăng 1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-xs font-semibold text-stone-700">
                  {pricing.unit}
                </span>
              </div>

              {/* Total Price */}
              <div className="text-right sm:text-left">
                <div className="text-[10px] text-stone-400 font-medium">
                  Tạm tính:
                </div>
                <div className="text-sm sm:text-lg font-black text-emerald-950 tracking-tight leading-tight">
                  {formatPrice(pricing.totalPrice, currency, exchangeRate)}
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="modal-btn-add-to-cart"
                onClick={handleAdd}
                className={`flex-1 sm:flex-initial sm:min-w-[210px] py-2.5 sm:py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
                  addedSuccess
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-emerald-900 hover:bg-emerald-950 text-white'
                }`}
                title={`Thêm ${displayQuantity} ${pricing.unit} vào giỏ hàng`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-stone-950 stroke-[3]" />
                    <span>Đã thêm vào giỏ hàng!</span>
                  </>
                ) : (
                  <>
                    {purchaseMode === 'retail' ? (
                      <ShoppingBag className="w-4 h-4 text-amber-300 shrink-0" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                    )}
                    <span>
                      {purchaseMode === 'retail' ? 'Thêm vào giỏ (Lẻ)' : 'Thêm vào giỏ (Sỉ)'}
                    </span>
                  </>
                )}
              </button>

              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 sm:py-3 px-3 rounded-xl border border-amber-500/50 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1 shrink-0"
              >
                <span className="hidden sm:inline">Tư Vấn</span> Sỉ Zalo
              </a>
            </div>
          </div>

          {/* Gentle Notice when quantity is auto-corrected to minimum */}
          {minNotice && (
            <div
              id={`modal-min-notice-${product.id}`}
              className="mt-1.5 p-1.5 rounded-lg bg-amber-50/90 border border-amber-300/80 text-[11px] font-medium text-amber-900 flex items-center gap-1.5 shadow-2xs"
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
