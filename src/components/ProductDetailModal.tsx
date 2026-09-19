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

const getConciseOrigin = (originStr?: string, partnerId?: string): string => {
  if (!originStr) return 'VIỆT NAM';
  if (partnerId === 'viet-thao-nhien') {
    if (originStr.toLowerCase().includes('nhật bản')) return 'NHẬT BẢN';
    if (originStr.toLowerCase().includes('đà lạt') || originStr.toLowerCase().includes('cầu đất')) return 'CẦU ĐẤT, ĐÀ LẠT';
    if (originStr.toLowerCase().includes('hòa bình')) return 'HÒA BÌNH';
    return 'LÂM ĐỒNG';
  }
  if (partnerId === 'vua-mia') return 'TÂY NINH';
  if (partnerId === 'thao-duoc-dato') return 'KON TUM';
  if (partnerId === 'non-la-aodai') {
    if (originStr.toLowerCase().includes('buôn ma thuột') || originStr.toLowerCase().includes('đắk lắk')) return 'ĐẮK LẮK';
    if (originStr.toLowerCase().includes('cầu đất')) return 'CẦU ĐẤT, ĐÀ LẠT';
    return 'LÂM ĐỒNG';
  }
  if (partnerId === 'phu-nha') return 'TP. HỒ CHÍ MINH';
  const clean = originStr.split('(')[0].split(',')[0].trim();
  return clean.toUpperCase();
};

interface ProductDetailModalProps {
  product: Product | null;
  initialMode?: PurchaseMode;
  currency: Currency;
  exchangeRate?: number;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, purchaseMode: PurchaseMode) => void;
  onOpenQR: (product: Product) => void;
  onSelectRecipe?: (recipe: any) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialMode = 'retail',
  currency,
  exchangeRate,
  isOpen,
  onClose,
  onAddToCart,
  onSelectRecipe,
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

  const wholesaleMultiplier = product.wholesaleUnit === 'KG' ? 1 : (product.unitsPerWholesale || 1);
  const retailBaseForWholesale = (product.prices?.retail || 0) * wholesaleMultiplier;
  const saveTier1 = retailBaseForWholesale > wholesaleConfig.tiers.wholesale1.price
    ? retailBaseForWholesale - wholesaleConfig.tiers.wholesale1.price
    : 0;
  const saveTier2 = retailBaseForWholesale > wholesaleConfig.tiers.wholesale2.price
    ? retailBaseForWholesale - wholesaleConfig.tiers.wholesale2.price
    : 0;
  const saveTier3 = retailBaseForWholesale > wholesaleConfig.tiers.wholesale3.price
    ? retailBaseForWholesale - wholesaleConfig.tiers.wholesale3.price
    : 0;

  const formatSaveBadge = (amount: number) => {
    if (amount <= 0) return null;
    if (currency === 'USD') {
      const rate = exchangeRate && exchangeRate > 0 ? exchangeRate : 26125;
      const usd = (amount / rate).toFixed(2);
      return `Tiết kiệm $${usd}`;
    }
    if (amount >= 1000) {
      const k = Math.round(amount / 1000);
      return `Tiết kiệm ${k}k`;
    }
    return `Tiết kiệm ${amount}₫`;
  };

  // Calculate pricing based on current active tab & quantity typed (instant calculation as user types)
  const typedNumber = rawInput !== null ? parseInt(rawInput, 10) : null;
  const effectiveQty = typedNumber !== null
    ? (isNaN(typedNumber) ? 0 : typedNumber)
    : (purchaseMode === 'retail' ? retailQty : wholesaleQty);

  const activeQtyForPricing = Math.max(1, effectiveQty || 1);
  const pricing = calculateModePricing(product, purchaseMode, activeQtyForPricing);
  const effectiveTotalPrice = effectiveQty > 0 ? effectiveQty * pricing.unitPrice : 0;

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
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-stone-100 overflow-hidden my-auto max-h-[88dvh] sm:max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Accent Ribbon */}
        <div className="h-1 w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

        {/* Modal Header Bar - Minimalist Luxury */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-stone-100 bg-white">
          <span className="text-[11px] font-heading text-stone-400 font-medium tracking-wide">
            MÃ: {product.barcode}
          </span>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-800 hover:bg-stone-100 rounded-full transition-colors"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body: 40/60 Split on Desktop/Tablet (md:grid-cols-5: 2 cols left = 40%, 3 cols right = 60%) */}
        {/* pb-[140px] ensures full clearance and smooth visibility of all content above sticky bar on mobile */}
        <div className="overflow-y-auto p-3.5 sm:p-6 pb-[140px] sm:pb-8 flex-1 grid grid-cols-1 md:grid-cols-5 gap-3.5 sm:gap-6">
          {/* Left Column (40%): Image & Trust Badges */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            <div className="relative rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
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

            {/* Khối Chứng nhận (Trust Badges Capsule): Hàng ngang thanh thoát, icon nhỏ, viền cực mảnh, bo góc tròn 20px */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {product.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[20px] text-[10px] sm:text-[11px] font-medium text-stone-600 bg-stone-50/90 border border-stone-200/60 shrink-0 whitespace-nowrap shadow-2xs"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-700/80 shrink-0" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (60%): Giá và Mua hàng (Title, Immediate Price Hero, Details) */}
          <div className="md:col-span-3 flex flex-col">
            <div>
              {/* Metadata Strip: THƯƠNG HIỆU: [TÊN HÃNG] | XUẤT XỨ: [TỈNH/QUỐC GIA] */}
              <div className="text-[10px] sm:text-[11px] font-heading font-semibold text-stone-500 uppercase tracking-[0.08em] mb-1">
                {product.partnerName} | {getConciseOrigin(product.origin, product.partnerId)}
              </div>

              {/* Tiêu đề sản phẩm chính (H1): 20px (Mobile) - 24px (Desktop), Plus Jakarta Sans, màu đen tuyền, đậm và sắc nét */}
              <h1 className="text-[20px] sm:text-[24px] font-bold text-black tracking-tight leading-snug font-heading">
                {product.name}
              </h1>
              {product.variant && (
                <div className="text-xs sm:text-sm text-stone-500 mt-0.5 font-medium italic">
                  {product.variant}
                </div>
              )}

              {/* IMMEDIATE PRICE HERO: Khách thấy ngay "món hàng này giá bao nhiêu" */}
              <div className="mt-2.5 p-3 rounded-2xl bg-white border border-stone-100 flex items-center justify-between shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {purchaseMode === 'retail' ? 'Giá Bán Lẻ Tiêu Chuẩn' : 'Giá Sỉ B2B Hiện Tại'}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-baseline gap-1 mt-0.5 font-heading flex-wrap">
                    <span>{formatPrice(pricing.unitPrice, currency, exchangeRate, product.hideUsd)}</span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-500">
                      /{pricing.unit}
                    </span>
                    {purchaseMode === 'retail' && product.unitsPerWholesale && product.wholesaleUnit === 'THÙNG' && (
                      <span className="text-[11px] font-normal text-stone-400 ml-1">
                        (~{formatPrice(product.prices.retail * product.unitsPerWholesale, currency, exchangeRate, product.hideUsd)}/thùng)
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0 pl-1.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 whitespace-nowrap tracking-tight">
                    {pricing.activeTierLabel}
                  </span>
                  <div className="text-[10px] text-stone-400 mt-0.5 whitespace-nowrap tracking-tighter">
                    {purchaseMode === 'wholesale'
                      ? `Tối thiểu ${wholesaleConfig.minWholesaleQty} ${wholesaleConfig.wholesaleUnit}`
                      : 'Mua từ 1 đơn vị'}
                  </div>
                </div>
              </div>

              {/* THANH GẠT TAB SEGMENT [ MUA LẺ ] / [ MUA SỈ B2B ] */}
              <div className="mt-3">
                {/* Dòng chữ dẫn dắt màu vàng Gold */}
                <div className="text-xs sm:text-[13px] text-[#b8860b] font-semibold italic flex items-center gap-1.5 mb-1.5 select-none">
                  👉 Chọn Mua Sỉ để nhận giá chiết khấu đại lý
                </div>

                <div className="p-1 bg-stone-100/90 rounded-2xl flex items-center gap-1.5 max-w-md border border-stone-200/90 shadow-inner h-[46px] sm:h-[48px]">
                  <button
                    type="button"
                    id="modal-tab-retail"
                    onClick={() => handleTabChange('retail')}
                    className={`flex-1 h-full rounded-xl text-xs sm:text-[13px] font-heading font-bold transition-all duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                      purchaseMode === 'retail'
                        ? 'bg-[#1a4d2e] text-white shadow-md shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                        : 'bg-stone-50/80 hover:bg-stone-100 text-stone-600 border border-stone-200/80'
                    }`}
                  >
                    <ShoppingBag
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        purchaseMode === 'retail' ? 'text-[#d4af37]' : 'text-stone-400'
                      }`}
                    />
                    <span className="whitespace-nowrap">MUA LẺ ({product.retailUnit || product.unit})</span>
                  </button>

                  <button
                    type="button"
                    id="modal-tab-wholesale"
                    onClick={() => handleTabChange('wholesale')}
                    className={`flex-1 h-full rounded-xl text-xs sm:text-[13px] font-heading font-bold transition-all duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                      purchaseMode === 'wholesale'
                        ? 'bg-[#1a4d2e] text-white shadow-md shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                        : 'bg-stone-50/80 hover:bg-stone-100 text-stone-600 border border-stone-200/80'
                    }`}
                  >
                    <Sparkles
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        purchaseMode === 'wholesale' ? 'text-[#d4af37]' : 'text-stone-400'
                      }`}
                    />
                    <span className="whitespace-nowrap">MUA SỈ B2B ({wholesaleConfig.wholesaleUnit})</span>
                  </button>
                </div>
              </div>

              {/* DYNAMIC PRICING VIEW */}
              {purchaseMode === 'retail' ? (
                /* KHI CHỌN TAB [ MUA LẺ ]: Nhẹ nhàng, tinh gọn */
                <div className="mt-2.5 py-2 px-1 text-xs text-stone-500">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-700">Đóng gói chuẩn thương hiệu:</span>
                    <span className="text-stone-900 font-medium">{product.packaging}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                    Thích hợp dùng thử, thưởng thức gia đình hoặc làm quà tặng. Khách quán & đại lý chọn tab <strong>MUA SỈ B2B</strong> để nhận chiết khấu sỉ theo số lượng.
                  </p>
                </div>
              ) : (
                /* KHI CHỌN TAB [ MUA SỈ ]: BẢNG GIÁ SỈ ĐỒNG BỘ THEO PHONG CÁCH CHUẨN V28 */
                <div className="mt-2.5 py-2.5 border-y border-stone-200/70">
                  {/* 3 Mức sỉ trên 1 hàng ngang, đồng bộ phong cách với trang chủ */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5 text-center items-stretch">
                    {([
                      {
                        key: 'wholesale1' as const,
                        title: 'Sỉ 1',
                        tier: wholesaleConfig.tiers.wholesale1,
                        saveBadge: formatSaveBadge(saveTier1),
                      },
                      {
                        key: 'wholesale2' as const,
                        title: 'Sỉ 2',
                        tier: wholesaleConfig.tiers.wholesale2,
                        saveBadge: formatSaveBadge(saveTier2),
                      },
                      {
                        key: 'wholesale3' as const,
                        title: 'Sỉ 3',
                        tier: wholesaleConfig.tiers.wholesale3,
                        saveBadge: formatSaveBadge(saveTier3),
                      },
                    ]).map(({ key, title, tier, saveBadge }) => {
                      const isActive = purchaseMode === 'wholesale' && pricing.activeTier === key;
                      return (
                        <div
                          key={key}
                          className={`relative p-2 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 min-w-0 overflow-hidden ${
                            isActive
                              ? 'bg-[#1a4d2e] text-white font-bold shadow-md shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]'
                              : 'bg-stone-100/80 hover:bg-stone-200/60 text-stone-700 border border-stone-200/80'
                          }`}
                        >
                          {/* Tiêu đề mức sỉ thanh mảnh */}
                          <div className="flex items-center justify-center w-full">
                            <span className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide truncate ${isActive ? 'text-white' : 'text-stone-500'}`}>
                              {title}
                            </span>
                          </div>

                          {/* Con số giá sỉ: font Jakarta Sans, weight 800 (font-extrabold), sắc nét, Vàng Gold khi active */}
                          <div className="mt-1 flex items-center justify-center w-full">
                            <span 
                              className={`font-heading text-[10px] sm:text-[12px] md:text-[13.5px] font-extrabold font-[800] tracking-tight text-center break-words ${isActive ? 'text-[#f6d884]' : 'text-stone-900'}`}
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                            >
                              {formatPrice(tier.price, currency, exchangeRate, product.hideUsd)}
                            </span>
                          </div>

                          {/* Nhãn số lượng: font Jakarta Sans, định dạng chuẩn 10+ KG, 3+ THÙNG */}
                          <div 
                            className={`font-heading text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase truncate tracking-tight w-full text-center mt-0.5 ${isActive ? 'text-[#f6d884]' : 'text-stone-600'}`}
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {tier.minQty}+ {wholesaleConfig.wholesaleUnit.toUpperCase()}
                          </div>

                          {/* Huy hiệu tiết kiệm nếu có */}
                          {saveBadge && (
                            <div className="mt-1">
                              <span className={`inline-block px-1.5 py-0.2 rounded-full text-[8.5px] sm:text-[9px] font-bold whitespace-nowrap ${
                                isActive
                                  ? 'bg-white/20 text-[#f6d884]'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              }`}>
                                {saveBadge}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Dòng thông báo nhỏ, thanh mảnh ngay dưới bảng giá sỉ */}
                  <div className="mt-2 pt-1.5 border-t border-stone-100 text-center">
                    {pricing.nextTier ? (
                      <p className="text-[11px] sm:text-xs text-stone-500 font-normal">
                        💡 Thêm <strong className="font-semibold text-stone-800">{pricing.nextTier.neededQty} {wholesaleConfig.wholesaleUnit}</strong> để lên mức <strong className="font-semibold text-stone-900">{pricing.nextTier.tier === 'wholesale2' ? 'Sỉ 2' : 'Sỉ 3'}</strong>
                      </p>
                    ) : (
                      <p className="text-[11px] sm:text-xs text-emerald-700 font-medium">
                        ✨ Đã đạt mức chiết khấu Sỉ 3 tối đa!
                      </p>
                    )}
                  </div>

                  {/* Alibaba B2B Container Export Pricing (FCL & OEM) if applicable */}
                  {product.exportPricing && (
                    <div className="mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10.5px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-stone-500" />
                          Xuất Khẩu FCL & OEM
                        </span>
                        {product.exportPricing.usdEstimate && !product.hideUsd && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                            FOB: {product.exportPricing.usdEstimate}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
                          <div className="text-[9.5px] text-stone-500 font-medium">FCL Nguyên Bản</div>
                          <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 font-heading">
                            {formatPrice(product.exportPricing.fclNoOem, currency, exchangeRate, product.hideUsd)}
                          </div>
                          <div className="text-[9px] text-stone-400 mt-0.5">Đơn vị: {product.exportPricing.unitLabel}</div>
                        </div>

                        <div className="bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
                          <div className="text-[9.5px] text-stone-500 font-medium">FCL Gia Công OEM</div>
                          <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 font-heading">
                            {formatPrice(product.exportPricing.fclOem, currency, exchangeRate, product.hideUsd)}
                          </div>
                          <div className="text-[9px] text-stone-400 mt-0.5">Bao bì nhãn riêng</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PHẦN CÔNG DỤNG & GIÁ TRỊ SỨC KHỎE: Chỉ hiển thị khi và chỉ khi sản phẩm có dữ liệu công dụng chính xác */}
              {(() => {
                const healthData = getProductHealthBenefits(product);
                if (!healthData || !healthData.points || healthData.points.length === 0) return null;
                return (
                  <div className="mt-4">
                    <HealthBenefitsSection
                      healthData={healthData}
                      partnerName={product.partnerName}
                    />
                  </div>
                );
              })()}

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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onSelectRecipe?.(r);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              onSelectRecipe?.(r);
                            }
                          }}
                          className="bg-stone-50/70 hover:bg-white rounded-xl border border-stone-200/80 hover:border-emerald-700/60 p-2 sm:p-2.5 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer group active:scale-[0.98]"
                          title={`Click xem chi tiết công thức pha chế: ${r.title}`}
                        >
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-200 mb-1.5">
                            <img
                              src={r.image}
                              alt={r.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-1 right-1 px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold bg-black/70 text-white backdrop-blur-xs flex items-center gap-0.5">
                              <Clock className="w-2 h-2 text-amber-400" />
                              {r.prepTime}
                            </div>
                            <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/15 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-full bg-emerald-950/90 text-amber-300 text-[9px] font-bold shadow-sm">
                                Xem công thức ➔
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-[11px] sm:text-xs font-bold text-stone-900 group-hover:text-emerald-950 line-clamp-1 leading-snug">
                              {r.title}
                            </div>
                            <div className="text-[9.5px] sm:text-[10px] text-emerald-800 font-bold mt-1 flex items-center justify-between">
                              <span>Biên lời ~{margin}%</span>
                              <span className="text-[9.5px] text-emerald-800 bg-emerald-100/80 group-hover:bg-emerald-200/90 px-1.5 py-0.5 rounded font-bold transition-colors">
                                Xem công thức ➔
                              </span>
                            </div>
                          </div>

                          <div className="mt-1.5 pt-1 border-t border-stone-200/70 text-[9px] sm:text-[10px] text-stone-600 flex items-center justify-between">
                            <span>Vốn: <strong className="font-mono text-stone-800">{formatPrice(r.costPerServing, currency, exchangeRate)}</strong></span>
                            <span>Lời: <strong className="font-mono text-emerald-700">+{formatPrice(profit, currency, exchangeRate)}</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Bottom Spacer for Mobile: 100% clearance above sticky bottom bar */}
              <div className="h-6 sm:h-4" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* STICKY BOTTOM ACTION BAR: Cố định dưới cùng màn hình (Thanh lịch, nổi bật, an toàn trên mobile) */}
        <div className="shrink-0 bg-white px-3.5 sm:px-6 pt-2.5 pb-4 sm:pb-3.5 border-t border-stone-200 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] z-20">
          {/* Thanh Tạm tính: Cực mỏng, phân tách rõ ràng */}
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-100 text-xs">
            <div className="flex items-center gap-1 text-stone-500 font-medium truncate">
              <span className="font-semibold text-stone-700 shrink-0">Tạm tính:</span>
              <span className="text-stone-400 font-mono text-[11px] sm:text-xs truncate">
                ({effectiveQty} {pricing.unit} × {formatPrice(pricing.unitPrice, currency, exchangeRate, product.hideUsd)})
              </span>
            </div>
            <div className="text-right font-bold text-stone-950 text-sm sm:text-base tracking-tight font-heading shrink-0 ml-2 whitespace-nowrap">
              {formatPrice(effectiveTotalPrice, currency, exchangeRate, product.hideUsd)}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full">
            {/* Left: Stepper - Tách biệt hoàn toàn, không đè lên số tiền */}
            <div className="flex items-center shrink-0">
              <div className="flex items-center border border-stone-200/80 rounded-xl bg-stone-50 shadow-2xs overflow-hidden h-9">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={isMinQty}
                  className={`w-8 h-9 flex items-center justify-center text-stone-700 transition-colors ${
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
                  className="w-11 h-9 text-center font-bold text-xs sm:text-sm text-stone-900 bg-white focus:bg-amber-50/50 focus:outline-none border-x border-stone-200"
                  aria-label="Số lượng đặt mua"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-8 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-90 transition-colors"
                  aria-label="Tăng số lượng"
                  title="Tăng 1"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Nút 'Thêm vào giỏ' (~25% trên Desktop/Tablet) và 'Tư vấn Zalo' NẰM TRÊN 1 HÀNG NGANG */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 md:justify-end">
              <button
                type="button"
                id="modal-btn-add-to-cart"
                onClick={handleAdd}
                className={`flex-[7] md:flex-none md:w-1/4 md:min-w-[160px] py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] h-9 font-heading shadow-xs ${
                  addedSuccess
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-950 hover:bg-black text-white'
                }`}
                title={`Thêm ${effectiveQty} ${pricing.unit} vào giỏ hàng`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 stroke-[3]" />
                    <span className="whitespace-nowrap">Đã thêm!</span>
                  </>
                ) : (
                  <>
                    {purchaseMode === 'retail' ? (
                      <ShoppingBag className="w-3.5 h-3.5 text-stone-300 shrink-0" />
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
                className="flex-[3] md:flex-none md:w-auto py-2 sm:py-2.5 px-2.5 sm:px-4 rounded-xl sm:rounded-2xl border border-amber-300/80 bg-amber-50/70 hover:bg-amber-100 text-stone-900 font-medium text-xs transition-colors flex items-center justify-center gap-1 shrink-0 h-9 whitespace-nowrap font-heading"
                title="Tư vấn sỉ qua Zalo"
              >
                <span className="truncate">Tư vấn Zalo</span>
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
