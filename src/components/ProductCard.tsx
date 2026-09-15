import React, { useState } from 'react';
import { QrCode, Plus, Minus, ShoppingBag, Award, Sparkles, Check, ChevronRight, Heart } from 'lucide-react';
import { Product, Currency, PurchaseMode } from '../types';
import {
  getProductWholesaleConfig,
  calculateModePricing,
  formatPrice,
} from '../utils/pricing';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  exchangeRate?: number;
  onAddToCart: (product: Product, quantity: number, purchaseMode: PurchaseMode) => void;
  onOpenDetail: (product: Product, initialMode?: PurchaseMode) => void;
  onOpenQR: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  exchangeRate,
  onAddToCart,
  onOpenDetail,
  onOpenQR,
}) => {
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>('retail');
  const [retailQty, setRetailQty] = useState<number>(1);
  const wholesaleConfig = getProductWholesaleConfig(product);
  const [wholesaleQty, setWholesaleQty] = useState<number>(wholesaleConfig.minWholesaleQty);
  const [rawInput, setRawInput] = useState<string | null>(null);
  const [minNotice, setMinNotice] = useState<string | null>(null);
  const noticeTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [addedAnimation, setAddedAnimation] = useState<'retail' | 'wholesale' | 'general' | null>(null);

  // Dynamic pricing calculation based on current tab & quantity typed
  const activeQty = purchaseMode === 'retail' ? retailQty : wholesaleQty;
  const pricing = calculateModePricing(product, purchaseMode, activeQty);

  const showGentleNotice = (message: string) => {
    setMinNotice(message);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setMinNotice(null);
    }, 3500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const digitsOnly = val.replace(/\D/g, '');
    setRawInput(digitsOnly);
    if (minNotice) setMinNotice(null);

    if (digitsOnly !== '') {
      const num = parseInt(digitsOnly, 10);
      if (!isNaN(num) && num > 0) {
        // Cập nhật số lượng ngay lập tức để Bảng giá (Sỉ 1, 2, 3) và Tổng tiền cập nhật tức thì theo con số vừa gõ
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
      // Ràng buộc: tự động đưa về mức tối thiểu và hiện thông báo nhẹ
      if (purchaseMode === 'retail') {
        setRetailQty(1);
      } else {
        setWholesaleQty(minAllowed);
      }
      setRawInput(null);

      const notice =
        purchaseMode === 'retail'
          ? `Số lượng lẻ tối thiểu là 1 ${product.retailUnit || product.unit}. Đã tự động đưa về 1.`
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

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRawInput(null);
    if (minNotice) setMinNotice(null);
    if (purchaseMode === 'retail') {
      setRetailQty((prev) => prev + 1);
    } else {
      setWholesaleQty((prev) => prev + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRawInput(null);
    if (minNotice) setMinNotice(null);
    if (purchaseMode === 'retail') {
      if (retailQty > 1) {
        setRetailQty((prev) => prev - 1);
      }
    } else {
      if (wholesaleQty > wholesaleConfig.minWholesaleQty) {
        setWholesaleQty((prev) => prev - 1);
      } else {
        showGentleNotice(`Số lượng sỉ tối thiểu là ${wholesaleConfig.minWholesaleQty} ${wholesaleConfig.wholesaleUnit}.`);
      }
    }
  };

  const handleBuyRetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchaseMode('retail');
    onAddToCart(product, retailQty, 'retail');
    setAddedAnimation('retail');
    setTimeout(() => setAddedAnimation(null), 1500);
  };

  const handleBuyWholesale = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchaseMode('wholesale');
    const qty = Math.max(wholesaleConfig.minWholesaleQty, wholesaleQty);
    onAddToCart(product, qty, 'wholesale');
    setAddedAnimation('wholesale');
    setTimeout(() => setAddedAnimation(null), 1500);
  };

  const handleTabChange = (newMode: PurchaseMode, e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchaseMode(newMode);
    setRawInput(null);
    setMinNotice(null);
    if (newMode === 'wholesale') {
      if (wholesaleQty < wholesaleConfig.minWholesaleQty) {
        setWholesaleQty(wholesaleConfig.minWholesaleQty);
      }
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (purchaseMode === 'wholesale') {
      const qty = Math.max(wholesaleConfig.minWholesaleQty, wholesaleQty);
      onAddToCart(product, qty, 'wholesale');
      setAddedAnimation('wholesale');
      setTimeout(() => setAddedAnimation(null), 1500);
    } else {
      onAddToCart(product, retailQty, 'retail');
      setAddedAnimation('retail');
      setTimeout(() => setAddedAnimation(null), 1500);
    }
  };

  const isMinQty =
    purchaseMode === 'retail'
      ? retailQty <= 1
      : wholesaleQty <= wholesaleConfig.minWholesaleQty;

  const displayQuantity =
    rawInput !== null ? rawInput : (purchaseMode === 'retail' ? retailQty : wholesaleQty);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-emerald-700/30 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Product Image & Top Badges - Proportional height for 2-column mobile and 4-5 column desktop */}
      <div
        className="relative h-28 sm:h-36 md:h-40 lg:h-40 xl:h-44 overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onOpenDetail(product, purchaseMode)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Partner Name Tag */}
        <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-10 max-w-[70%] sm:max-w-[75%]">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold tracking-wider bg-emerald-950/90 text-amber-300 border border-amber-400/40 backdrop-blur-md shadow-xs uppercase truncate">
            <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#d4af37] shrink-0" />
            <span className="truncate">{product.partnerName}</span>
          </span>
        </div>

        {/* QR Code Action Button */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10">
          <button
            id={`btn-qr-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onOpenQR(product);
            }}
            className="p-1 sm:p-1.5 rounded-lg bg-white/90 hover:bg-white text-emerald-950 hover:text-emerald-700 shadow-md backdrop-blur-md transition-all hover:scale-105"
            title="Xem mã QR công thức pha chế của sản phẩm này"
            aria-label="Xem mã QR công thức"
          >
            <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Bottom overlay: Unit & Origin */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1">
            <span
              className={`px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded text-[8px] sm:text-[10px] font-bold backdrop-blur-sm transition-colors ${
                purchaseMode === 'retail'
                  ? 'bg-white text-emerald-950 font-black shadow-xs'
                  : 'bg-black/60 text-stone-300'
              }`}
            >
              Lẻ: {product.retailUnit || product.unit}
            </span>
            <span
              className={`px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded text-[8px] sm:text-[10px] font-bold backdrop-blur-sm transition-colors ${
                purchaseMode === 'wholesale'
                  ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                  : 'bg-black/60 text-amber-300/80'
              }`}
            >
              Sỉ: {wholesaleConfig.wholesaleUnit}
            </span>
          </div>
          <span className="hidden sm:inline-block bg-emerald-900/80 backdrop-blur-sm px-1.5 py-0.2 rounded text-amber-200 font-medium text-[9px] sm:text-[10px] truncate max-w-[80px]">
            {product.origin.split(',')[0]}
          </span>
        </div>
      </div>

      {/* Body Content - Responsive compact padding & typography */}
      <div className="p-2 sm:p-2.5 lg:p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[9px] sm:text-[10px] font-semibold text-emerald-800 uppercase tracking-wider mb-0.5 truncate">
            {product.category}
          </div>
          <h4
            onClick={() => onOpenDetail(product, purchaseMode)}
            className="text-[12px] sm:text-[13.5px] lg:text-[14px] font-bold text-stone-900 hover:text-emerald-800 line-clamp-2 cursor-pointer transition-colors leading-snug min-h-[30px] sm:min-h-[36px]"
            title={product.name}
          >
            {product.name}
          </h4>

          {product.variant && (
            <div className="hidden sm:block text-[10px] text-stone-500 italic truncate mt-0.5">
              {product.variant}
            </div>
          )}

          {/* Quick link to Health & Wellness benefits */}
          <div className="hidden sm:flex mt-0.5 items-center">
            <button
              type="button"
              onClick={() => onOpenDetail(product, purchaseMode)}
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 hover:text-emerald-950 hover:underline transition-colors truncate"
              title="Xem chi tiết công dụng & giá trị sức khỏe"
            >
              <Heart className="w-2.5 h-2.5 text-rose-500 shrink-0" />
              <span className="truncate">Công dụng & Sức khỏe</span>
              <ChevronRight className="w-2.5 h-2.5 text-stone-400 shrink-0" />
            </button>
          </div>

          {/* MINI SEGMENTED TOGGLE: Flat, horizontal, space-saving */}
          <div className="mt-1.5 p-0.5 bg-stone-100 rounded-lg flex items-center border border-stone-200/60">
            <button
              type="button"
              id={`tab-retail-${product.id}`}
              onClick={(e) => handleTabChange('retail', e)}
              className={`flex-1 py-1 px-1 rounded-md text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                purchaseMode === 'retail'
                  ? 'bg-white text-emerald-950 shadow-2xs font-black'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <ShoppingBag className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${purchaseMode === 'retail' ? 'text-emerald-700' : 'text-stone-400'}`} />
              <span>Mua Lẻ</span>
            </button>

            <button
              type="button"
              id={`tab-wholesale-${product.id}`}
              onClick={(e) => handleTabChange('wholesale', e)}
              className={`flex-1 py-1 px-1 rounded-md text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 ${
                purchaseMode === 'wholesale'
                  ? 'bg-emerald-900 text-white shadow-2xs font-black'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sparkles className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${purchaseMode === 'wholesale' ? 'text-amber-300' : 'text-stone-400'}`} />
              <span>Mua Sỉ</span>
            </button>
          </div>

          {/* DYNAMIC PRICING VIEW */}
          {purchaseMode === 'retail' ? (
            /* TAB [ MUA LẺ ]: Đơn vị lẻ, thoáng sạch */
            <div className="mt-1.5 py-0.5 px-0.5">
              <div className="flex items-baseline justify-between">
                <div className="text-xs sm:text-sm lg:text-base font-black text-emerald-950 tracking-tight leading-tight">
                  {formatPrice(product.prices.retail, currency, exchangeRate)}
                  <span className="text-[9px] sm:text-[10px] font-normal text-stone-500 ml-0.5">
                    /{product.retailUnit || product.unit}
                  </span>
                </div>
                {product.unitsPerWholesale && product.wholesaleUnit === 'THÙNG' && (
                  <span className="text-[8.5px] sm:text-[9.5px] font-bold text-stone-600 truncate">
                    ({formatPrice(product.prices.retail * product.unitsPerWholesale, currency, exchangeRate)}/thùng)
                  </span>
                )}
              </div>
              <div className="flex mt-0.5 text-[9px] sm:text-[10px] text-stone-500 items-center justify-between gap-1 truncate">
                <span className="truncate">{product.packaging}</span>
                <span className="shrink-0 text-emerald-800 font-semibold">Giao 2H</span>
              </div>
            </div>
          ) : (
            /* TAB [ MUA SỈ ]: 3 cấp độ sỉ thanh lịch */
            <div className="mt-1.5 space-y-1">
              <div className="hidden sm:flex items-center justify-between text-[10px] text-stone-500 px-0.5">
                <span className="font-bold text-stone-700 truncate">
                  3 Mức Giá Sỉ ({wholesaleConfig.wholesaleUnit})
                </span>
                <span className="text-stone-400 text-[9px] truncate">
                  1 {wholesaleConfig.wholesaleUnit} = {product.packaging}
                </span>
              </div>

              {/* Mobile Wholesale Active Price header */}
              <div className="sm:hidden flex items-baseline justify-between px-0.5">
                <div className="text-xs font-black text-emerald-950 tracking-tight">
                  {formatPrice(pricing.unitPrice, currency, exchangeRate)}
                  <span className="text-[9px] font-normal text-stone-500 ml-0.5">
                    /{wholesaleConfig.wholesaleUnit}
                  </span>
                </div>
                <span className="text-[8px] font-bold text-amber-700 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                  Sỉ {wholesaleConfig.wholesaleUnit}
                </span>
              </div>

              {/* 3 Wholesale Tiers Grid */}
              <div className="grid grid-cols-3 gap-0.5 text-center">
                {([
                  wholesaleConfig.tiers.wholesale1,
                  wholesaleConfig.tiers.wholesale2,
                  wholesaleConfig.tiers.wholesale3,
                ] as const).map((t) => {
                  const isActive = pricing.activeTier === t.tier;
                  return (
                    <div
                      key={t.tier}
                      className={`py-0.5 px-0.5 rounded transition-all ${
                        isActive
                          ? 'bg-emerald-900 text-white font-bold shadow-2xs'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <div className={`text-[7.5px] sm:text-[8.5px] font-medium leading-tight truncate ${isActive ? 'text-amber-300' : 'text-stone-500'}`}>
                        {t.label.split('(')[0].replace('Wholesale', 'Sỉ').trim()}
                      </div>
                      <div className={`text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-black leading-tight truncate ${isActive ? 'text-white' : 'text-stone-900'}`}>
                        {formatPrice(t.price, currency, exchangeRate)}
                      </div>
                      {/* Hiển thị giá tương đương gói / đơn vị nhỏ */}
                      {t.equivalentPiecePrice > 0 && product.unitsPerWholesale && product.unitsPerWholesale > 1 && (
                        <div className={`text-[6.5px] sm:text-[7.5px] font-semibold leading-tight truncate ${isActive ? 'text-amber-200' : 'text-emerald-700'}`}>
                          ~{formatPrice(t.equivalentPiecePrice, currency, exchangeRate)}/{product.retailUnit?.split(' ')[0] || 'gói'}
                        </div>
                      )}
                      <div className={`text-[7px] sm:text-[7.5px] leading-tight truncate ${isActive ? 'text-emerald-200' : 'text-stone-400'}`}>
                        ≥{t.minQty} {wholesaleConfig.wholesaleUnit}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Incentive for next tier if applicable */}
              {pricing.nextTier && (
                <div className="hidden sm:flex text-[9px] text-amber-800 bg-amber-50/60 px-1.5 py-0.5 rounded items-center justify-between truncate">
                  <span className="truncate">
                    +{pricing.nextTier.neededQty} {wholesaleConfig.wholesaleUnit} lên {pricing.nextTier.label.split('(')[0].trim()}
                  </span>
                  <span className="font-bold text-emerald-800 shrink-0 ml-1">
                    -{formatPrice(pricing.nextTier.savePerUnit, currency, exchangeRate)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* COMPACT QUANTITY + ACTION BUTTON AREA */}
        <div className="mt-2 pt-1.5 border-t border-stone-100">
          {/* Row 1: Quantity Stepper (SL input + - button) */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold shrink-0">SL:</span>
              <div className="flex items-center border border-stone-300 rounded-md bg-stone-50 overflow-hidden shadow-2xs shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={isMinQty}
                  className={`w-6 h-6 sm:w-6.5 sm:h-6.5 flex items-center justify-center text-stone-700 transition-colors ${
                    isMinQty ? 'opacity-30 cursor-not-allowed bg-stone-100' : 'hover:bg-stone-200 active:bg-stone-300'
                  }`}
                  aria-label="Giảm số lượng"
                  title={isMinQty ? `Tối thiểu: ${pricing.minAllowedQty} ${pricing.unit}` : 'Giảm 1'}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input
                  id={`qty-input-${product.id}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={displayQuantity}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  onFocus={(e) => e.target.select()}
                  onClick={(e) => {
                    e.stopPropagation();
                    (e.target as HTMLInputElement).select();
                  }}
                  className="w-8 sm:w-9 h-6 sm:h-6.5 text-center text-[11px] sm:text-xs font-black text-stone-900 bg-white focus:bg-amber-50 focus:outline-none border-x border-stone-200 selection:bg-emerald-800 selection:text-white"
                  title="Nhấp để nhập số lượng trực tiếp (ví dụ 10)"
                  aria-label="Số lượng đặt mua"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-6 h-6 sm:w-6.5 sm:h-6.5 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:bg-stone-300 transition-colors"
                  aria-label="Tăng số lượng"
                  title="Tăng 1"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[9.5px] sm:text-[10px] text-stone-600 font-bold truncate max-w-[60px]" title={pricing.unit}>
                {pricing.unit}
              </span>
            </div>

            {/* In desktop, keep quick unit info or mini indicator */}
            <span className="hidden sm:inline text-[9px] text-stone-400 font-medium truncate">
              {purchaseMode === 'wholesale' ? 'Giá sỉ' : 'Giá lẻ'}
            </span>
          </div>

          {/* Row 2: TỔNG TIỀN (TẠM TÍNH) - NẰM TRÊN MỘT HÀNG RIÊNG BIỆT TRƯỚC NÚT THÊM GIỎ, TUYỆT ĐỐI KHÔNG ĐÈ LÊN (+/-) */}
          <div className="flex items-center justify-between py-1 px-1.5 mb-1.5 rounded-md bg-stone-50 border border-stone-200/80">
            <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Tạm tính:</span>
            <div className="text-[14px] sm:text-[15px] md:text-[16px] font-black text-emerald-950 tracking-tight leading-none truncate max-w-[150px] text-right">
              {formatPrice(pricing.totalPrice, currency, exchangeRate)}
            </div>
          </div>

          {/* Gentle Notice when quantity is auto-corrected to minimum */}
          {minNotice && (
            <div
              id={`min-notice-${product.id}`}
              className="mb-1.5 p-1 rounded bg-amber-50/90 border border-amber-200 text-[9px] font-medium text-amber-900 flex items-center gap-1"
            >
              <span className="text-amber-600 shrink-0 text-xs">⚠️</span>
              <span className="leading-tight truncate">{minNotice}</span>
            </div>
          )}

          {/* Sleek Action Button */}
          <button
            type="button"
            id={`btn-add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`w-full py-1.5 sm:py-2 px-2 rounded-lg font-bold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-[0.97] ${
              addedAnimation
                ? 'bg-amber-500 text-stone-950 shadow-amber-500/20'
                : 'bg-emerald-900 hover:bg-emerald-950 text-white shadow-emerald-950/10'
            }`}
            title={`Thêm ${displayQuantity} ${pricing.unit} vào giỏ hàng`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-stone-950 stroke-[3]" />
                <span className="text-[11px] font-black">Đã thêm!</span>
              </>
            ) : (
              <>
                {purchaseMode === 'retail' ? (
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                )}
                <span className="text-[11px] sm:text-xs font-bold truncate">
                  <span className="sm:hidden">Thêm giỏ</span>
                  <span className="hidden sm:inline">
                    {purchaseMode === 'retail' ? 'Thêm giỏ lẻ' : 'Thêm giỏ sỉ'}
                  </span>
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
