import React, { useState } from 'react';
import { QrCode, Plus, Minus, ShoppingBag, Award, Sparkles, Check } from 'lucide-react';
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
      className="group bg-white rounded-xl sm:rounded-2xl border border-[#F0F0F0] shadow-xs hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* 1. HIERARCHY: Ảnh sản phẩm to nhất - Proportional height with 1.04x scale in 200ms */}
      <div
        className="relative h-36 sm:h-44 md:h-48 lg:h-52 overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onOpenDetail(product, purchaseMode)}
      >
        <img
          src={product.image}
          alt={`${product.name} - ${product.partnerName} | CHUTCHIU CO.,LTD`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

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
            className="p-1 sm:p-1.5 rounded-lg bg-white/90 hover:bg-white text-emerald-950 hover:text-emerald-700 shadow-md backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
            title="Xem mã QR công thức pha chế của sản phẩm này"
            aria-label="Xem mã QR công thức"
          >
            <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Bottom overlay: Quy cách đóng gói & Xuất xứ */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1">
            <span
              className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[9.5px] font-bold backdrop-blur-sm transition-colors ${
                purchaseMode === 'retail'
                  ? 'bg-white text-emerald-950 font-black shadow-xs'
                  : 'bg-black/60 text-stone-300'
              }`}
            >
              Lẻ: {product.retailUnit || product.unit}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[9.5px] font-bold backdrop-blur-sm transition-colors ${
                purchaseMode === 'wholesale'
                  ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                  : 'bg-black/60 text-amber-300/90'
              }`}
            >
              Sỉ: {wholesaleConfig.wholesaleUnit}
            </span>
          </div>
          <span className="hidden sm:inline-block bg-emerald-900/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-amber-200 font-medium text-[9px] sm:text-[10px] truncate max-w-[90px]">
            {product.origin.split(',')[0]}
          </span>
        </div>
      </div>

      {/* Body Content - Hierarchy: Brand Label -> Tên SP -> Giá lẻ nổi bật -> Bảng giá sỉ */}
      <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* 4. BRAND LABEL: Dòng chữ 'THƯƠNG HIỆU | XUẤT XỨ' trên đầu tên sản phẩm làm mờ hơn một chút, chữ viết hoa, độ giãn chữ thoáng để nhìn giống các trang web quốc tế */}
          <div className="text-[9px] sm:text-[9.5px] font-semibold text-stone-400/90 uppercase tracking-[0.15em] mb-1 truncate select-none">
            {product.partnerName} | {product.origin.split(',')[0]}
          </div>

          {/* 2. HIERARCHY: Tên SP */}
          <h4
            onClick={() => onOpenDetail(product, purchaseMode)}
            className="text-[13px] sm:text-[14px] font-bold text-stone-900 hover:text-emerald-800 line-clamp-2 cursor-pointer transition-colors leading-snug min-h-[36px] sm:min-h-[40px] mb-1.5 font-heading"
            title={product.name}
          >
            {product.name}
          </h4>

          {/* 3. HIERARCHY: Giá lẻ nổi bật ngay dưới tên SP */}
          <div className="flex items-baseline justify-between gap-1 mb-2">
            <div className="flex items-baseline gap-1">
              <span className="text-[15px] sm:text-[17px] font-black text-emerald-950 tracking-tight leading-none">
                {formatPrice(product.prices.retail, currency, exchangeRate, product.hideUsd)}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-stone-500">
                /{product.retailUnit || product.unit}
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 font-medium border border-[#F0F0F0]">
              Giá lẻ
            </span>
          </div>

          {/* Thanh gạt chuyển đổi Mua Lẻ / Mua Sỉ (Sleek & Thin) */}
          <div className="p-0.5 bg-stone-100/90 rounded-lg flex items-center gap-0.5 border border-[#F0F0F0] mb-1.5 h-8">
            <button
              type="button"
              id={`tab-retail-${product.id}`}
              onClick={(e) => handleTabChange('retail', e)}
              className={`flex-1 h-full rounded text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-[0.98] ${
                purchaseMode === 'retail'
                  ? 'bg-[#0b3b24] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShoppingBag
                className={`w-3 h-3 ${
                  purchaseMode === 'retail' ? 'text-[#d4af37]' : 'text-stone-400'
                }`}
              />
              <span>Mua Lẻ</span>
            </button>

            <button
              type="button"
              id={`tab-wholesale-${product.id}`}
              onClick={(e) => handleTabChange('wholesale', e)}
              className={`flex-1 h-full rounded text-[10px] sm:text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-[0.98] ${
                purchaseMode === 'wholesale'
                  ? 'bg-[#0b3b24] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles
                className={`w-3 h-3 ${
                  purchaseMode === 'wholesale' ? 'text-[#d4af37]' : 'text-stone-400'
                }`}
              />
              <span>Mua Sỉ</span>
            </button>
          </div>

          {/* 4. HIERARCHY: Bảng giá sỉ gọn gàng phía dưới:
              - Thu nhỏ cỡ chữ nhãn (Sỉ 1, Sỉ 2...) và con số giá sỉ thêm 10%
              - Mức giá đang chọn (Active) tô màu Xanh lá sẫm (#0b3b24) và chữ Vàng Gold (#f6d884) nhưng viền phải mảnh
          */}
          <div className="grid grid-cols-3 gap-1 text-center">
            {([
              wholesaleConfig.tiers.wholesale1,
              wholesaleConfig.tiers.wholesale2,
              wholesaleConfig.tiers.wholesale3,
            ] as const).map((t) => {
              const isActive = purchaseMode === 'wholesale' && pricing.activeTier === t.tier;
              const unitUpper = wholesaleConfig.wholesaleUnit.toUpperCase();
              const qtyLabel = `${t.minQty}+ ${unitUpper}`;
              const tierLabel = t.tier === 'wholesale1' ? 'Sỉ 1' : t.tier === 'wholesale2' ? 'Sỉ 2' : 'Sỉ 3';
              const priceFormatted = formatPrice(t.price, currency, exchangeRate, product.hideUsd);

              return (
                <div
                  key={t.tier}
                  onClick={(e) => {
                    handleTabChange('wholesale', e);
                    setWholesaleQty(t.minQty);
                  }}
                  className={`py-1 px-1 rounded-md transition-all flex flex-col items-center justify-center text-center min-w-0 overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-[#0b3b24] text-white border border-[#0b3b24] shadow-2xs'
                      : 'bg-stone-50/70 text-stone-700 hover:bg-stone-100/80 border border-[#F0F0F0]'
                  }`}
                  title={`Mức ${tierLabel}: từ ${t.minQty} ${wholesaleConfig.wholesaleUnit} - Click để chọn mua sỉ mức này`}
                >
                  {/* Dòng 1: Tiêu đề Sỉ 1, Sỉ 2, Sỉ 3 - thu nhỏ thêm 10% */}
                  <div
                    className={`text-[7.5px] sm:text-[8px] font-medium leading-tight truncate w-full ${
                      isActive ? 'text-stone-200' : 'text-stone-500'
                    }`}
                  >
                    {tierLabel}
                  </div>

                  {/* Dòng 2: Con số đơn giá - thu nhỏ thêm 10%, chữ Vàng Gold rõ ràng nhưng thanh mảnh khi active */}
                  <div
                    className={`w-full text-center font-medium leading-tight tracking-tight mt-0.5 break-words text-[8px] sm:text-[8.5px] ${
                      isActive ? 'text-[#f6d884]' : 'text-stone-900'
                    }`}
                    title={priceFormatted}
                  >
                    {priceFormatted}
                  </div>

                  {/* Dòng 3: Nhãn số lượng - thu nhỏ thêm 10% */}
                  <div
                    className={`w-full text-center font-normal uppercase leading-tight truncate mt-0.5 tracking-tight text-[7px] sm:text-[7.5px] ${
                      isActive ? 'text-[#f6d884]/90' : 'text-stone-500'
                    }`}
                  >
                    {qtyLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* THAO TÁC ĐẶT HÀNG: SỐ LƯỢNG + TẠM TÍNH + THÊM GIỎ HÀNG */}
        <div className="mt-2.5 pt-2 border-t border-[#F0F0F0]">
          {/* Hàng 1: Bộ đếm số lượng (Stepper) */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold shrink-0">SL:</span>
              <div className="flex items-center border border-[#F0F0F0] rounded-md bg-stone-50 overflow-hidden shadow-2xs shrink-0">
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
                  className="w-8 sm:w-9 h-6 sm:h-6.5 text-center text-[11px] sm:text-xs font-black text-stone-900 bg-white focus:bg-amber-50 focus:outline-none border-x border-[#F0F0F0] selection:bg-emerald-800 selection:text-white"
                  title="Nhập số lượng trực tiếp"
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

            <span className="text-[9px] text-stone-400 font-medium truncate">
              {purchaseMode === 'wholesale' ? 'Đang chọn sỉ' : 'Đang chọn lẻ'}
            </span>
          </div>

          {/* Hàng 2: TỔNG TIỀN (TẠM TÍNH) */}
          <div className="flex items-center justify-between py-1 px-1.5 mb-1.5 rounded-md bg-stone-50 border border-[#F0F0F0]">
            <span className="text-[10px] text-stone-500 font-medium">Tạm tính:</span>
            <div className="text-[13px] sm:text-[14.5px] font-black text-emerald-950 tracking-tight leading-none truncate max-w-[150px] text-right">
              {formatPrice(pricing.totalPrice, currency, exchangeRate, product.hideUsd)}
            </div>
          </div>

          {/* Thông báo số lượng tối thiểu nhẹ nhàng nếu có */}
          {minNotice && (
            <div
              id={`min-notice-${product.id}`}
              className="mb-1.5 p-1 rounded bg-amber-50/90 border border-amber-200 text-[9px] font-medium text-amber-900 flex items-center gap-1"
            >
              <span className="text-amber-600 shrink-0 text-xs">⚠️</span>
              <span className="leading-tight truncate">{minNotice}</span>
            </div>
          )}

          {/* Nút Thêm Vào Giỏ Hàng */}
          <button
            type="button"
            id={`btn-add-to-cart-${product.id}`}
            onClick={handleAdd}
            className={`w-full py-1.5 sm:py-2 px-2 rounded-lg font-bold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-[0.97] cursor-pointer ${
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
                  {purchaseMode === 'retail' ? 'Thêm giỏ lẻ' : 'Thêm giỏ sỉ'}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
