import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Zap,
  CheckCircle2,
  Check,
  ChevronRight,
  Leaf,
} from 'lucide-react';
import { Product, Currency, PurchaseMode, CartItemState } from '../types';
import {
  calculateModePricing,
  formatPrice,
  getProductWholesaleConfig,
} from '../utils/pricing';
import { handleProductImageError } from '../utils/productImages';

export type { CartItemState };

export interface CheckoutSummary {
  items: CartItemState[];
  subtotalVND: number;
  discountVND: number;
  finalTotalVND: number;
  voucherCode: string | null;
  hasWholesaleTier: boolean;
}

interface SmartCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemState[];
  currency: Currency;
  exchangeRate?: number;
  onUpdateQuantity: (productId: string, purchaseMode: PurchaseMode, newQty: number) => void;
  onRemoveItem: (productId: string, purchaseMode: PurchaseMode) => void;
  onToggleSelectItem: (productId: string, purchaseMode: PurchaseMode) => void;
  onToggleSelectAll: (selectAll: boolean) => void;
  onDeleteSelected: () => void;
  onCheckout: (summary: CheckoutSummary) => void;
}

interface CartItemCardProps {
  product: Product;
  quantity: number;
  mode: PurchaseMode;
  isSelected: boolean;
  calc: ReturnType<typeof calculateModePricing>;
  wholesaleConfig: ReturnType<typeof getProductWholesaleConfig>;
  currency: Currency;
  exchangeRate?: number;
  onToggleSelect: (productId: string, purchaseMode: PurchaseMode) => void;
  onUpdateQuantity: (productId: string, purchaseMode: PurchaseMode, newQty: number) => void;
  onRemoveItem: (productId: string, purchaseMode: PurchaseMode) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  product,
  quantity,
  mode,
  isSelected,
  calc,
  wholesaleConfig,
  currency,
  exchangeRate,
  onToggleSelect,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const isWholesale = mode === 'wholesale';
  const minAllowed = isWholesale ? wholesaleConfig.minWholesaleQty : 1;
  const isAtMin = quantity <= minAllowed;

  const [rawInput, setRawInput] = useState<string | null>(null);
  const [minNotice, setMinNotice] = useState<string | null>(null);
  const noticeTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const showGentleNotice = (msg: string) => {
    setMinNotice(msg);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setMinNotice(null);
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    setRawInput(digitsOnly);
    if (minNotice) setMinNotice(null);

    if (digitsOnly !== '') {
      const num = parseInt(digitsOnly, 10);
      if (!isNaN(num) && num > 0) {
        onUpdateQuantity(product.id, mode, num);
      }
    }
  };

  const handleInputBlur = () => {
    let finalQty = quantity;
    if (rawInput !== null) {
      const parsed = parseInt(rawInput, 10);
      finalQty = isNaN(parsed) || parsed < 1 ? 0 : parsed;
    }

    if (finalQty < minAllowed) {
      onUpdateQuantity(product.id, mode, minAllowed);
      setRawInput(null);
      const notice = isWholesale
        ? `Số lượng sỉ tối thiểu là ${minAllowed} ${wholesaleConfig.wholesaleUnit}. Đã đưa về tối thiểu!`
        : `Số lượng tối thiểu là 1.`;
      showGentleNotice(notice);
    } else {
      onUpdateQuantity(product.id, mode, finalQty);
      setRawInput(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleDecrement = () => {
    setRawInput(null);
    if (minNotice) setMinNotice(null);
    if (quantity > minAllowed) {
      onUpdateQuantity(product.id, mode, quantity - 1);
    } else {
      showGentleNotice(`Số lượng tối thiểu là ${minAllowed} ${calc.unit}.`);
    }
  };

  const handleIncrement = () => {
    setRawInput(null);
    if (minNotice) setMinNotice(null);
    onUpdateQuantity(product.id, mode, quantity + 1);
  };

  const displayQuantity = rawInput !== null ? rawInput : quantity;

  return (
    <div
      key={`${product.id}-${mode}`}
      className={`p-3.5 rounded-2xl border transition-all flex flex-col gap-2.5 ${
        isSelected
          ? 'border-emerald-700/40 bg-white shadow-sm ring-1 ring-emerald-600/20'
          : 'border-stone-200 bg-stone-100/60 opacity-70 hover:opacity-90'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Shopee Style Checkbox - To rõ, cực kỳ dễ bấm trên Mobile */}
        <div className="pt-0.5 shrink-0">
          <button
            type="button"
            onClick={() => onToggleSelect(product.id, mode)}
            className={`w-6 h-6 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer touch-manipulation active:scale-95 ${
              isSelected
                ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                : 'border-stone-400 bg-white hover:border-emerald-700'
            }`}
            aria-label={isSelected ? 'Bỏ chọn món này' : 'Chọn món này'}
            title={isSelected ? 'Đã tick chọn để thanh toán' : 'Tick để chọn thanh toán món này'}
          >
            {isSelected && <Check className="w-4 h-4 stroke-[3.5]" />}
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={`${product.name} - ${product.partnerName} (${product.packaging || product.unit}) | Giỏ hàng G-ROOSTER`}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          onError={(e) => handleProductImageError(e, product.id)}
          className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-50"
        />

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded-md">
              {product.partnerName}
            </span>

            {/* Purchase Mode Tag */}
            {isWholesale ? (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 shadow-xs">
                MUA SỈ • {calc.activeTierLabel}
              </span>
            ) : (
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-stone-200 text-stone-700">
                MUA LẺ
              </span>
            )}
          </div>

          <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
            {product.name}
          </h4>
          <p className="text-[11px] text-stone-500">
            {isWholesale
              ? `1 ${calc.unit} = ${product.packaging}`
              : `Quy cách: ${product.packaging}`}
          </p>

          <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
            <span className="text-xs font-black text-emerald-900">
              {formatPrice(calc.unitPrice, currency, exchangeRate)}
            </span>
            <span className="text-[10px] text-stone-500 font-medium">
              /{calc.unit}
            </span>
            {isWholesale && wholesaleConfig?.tiers && (
              <span className="text-[10px] text-amber-800 font-semibold">
                (~{formatPrice(
                  (calc.activeTier in wholesaleConfig.tiers
                    ? wholesaleConfig.tiers[calc.activeTier as 'wholesale1' | 'wholesale2' | 'wholesale3']?.equivalentPiecePrice
                    : wholesaleConfig.tiers.wholesale1?.equivalentPiecePrice) || 0,
                  currency,
                  exchangeRate
                )}/{product.retailUnit?.split(' ')[0] || 'đv'})
              </span>
            )}
          </div>
        </div>

        {/* Remove item button */}
        <button
          onClick={() => onRemoveItem(product.id, mode)}
          className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-200 transition-colors shrink-0"
          title="Xóa sản phẩm khỏi giỏ"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Quantity Stepper with Keyboard Input & Line Total */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-200/80 pl-8">
        <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-2xs">
          <button
            onClick={handleDecrement}
            disabled={isAtMin}
            className={`p-1.5 transition-colors ${
              isAtMin
                ? 'opacity-40 cursor-not-allowed bg-stone-100 text-stone-400'
                : 'text-stone-600 hover:bg-stone-100 active:bg-stone-200'
            }`}
            title={isAtMin ? 'Đã đạt mức tối thiểu của hình thức này' : 'Giảm 1 đơn vị'}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={displayQuantity}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            onFocus={(e) => e.target.select()}
            onClick={(e) => (e.target as HTMLInputElement).select()}
            className="w-12 py-1 text-center text-xs font-black text-stone-900 bg-white focus:bg-amber-50/80 focus:outline-none selection:bg-emerald-800 selection:text-white border-x border-stone-200"
            title="Nhập số lượng trực tiếp bằng bàn phím"
            aria-label="Số lượng"
          />
          <button
            onClick={handleIncrement}
            className="p-1.5 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
            aria-label="Tăng số lượng"
            title="Tăng 1 đơn vị"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-right">
          <div className="text-[10px] text-stone-500">
            Thành tiền ({calc.unit}):
          </div>
          <div className="text-sm font-black text-emerald-950">
            {formatPrice(calc.totalPrice, currency, exchangeRate)}
          </div>
        </div>
      </div>

      {/* Gentle Notice when quantity is auto-corrected to minimum */}
      {minNotice && (
        <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-300 text-[11px] font-semibold text-amber-900 flex items-center gap-1 shadow-xs animate-in fade-in duration-200">
          <span className="text-amber-600 shrink-0 text-xs">⚠️</span>
          <span>{minNotice}</span>
        </div>
      )}

      {/* Upgrade Incentive for Wholesale */}
      {isWholesale && calc.nextTier && (
        <div className="p-2 rounded-xl bg-amber-50/90 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            Thêm <strong>{calc.nextTier.neededQty} {calc.unit}</strong> để lên <strong>{calc.nextTier.label}</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              const targetQty =
                wholesaleConfig?.tiers?.[calc.nextTier!.tier]?.minQty ??
                (quantity + calc.nextTier!.neededQty);
              onUpdateQuantity(product.id, mode, targetQty);
            }}
            className="text-[10px] font-bold text-emerald-800 underline hover:text-emerald-950 shrink-0 ml-1 cursor-pointer"
          >
            + Lấy ngay
          </button>
        </div>
      )}
      {isWholesale && !calc.nextTier && (
        <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 font-semibold flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Đã đạt mức giá sỉ Đại Lý Cấp 3 tối đa!
        </div>
      )}
    </div>
  );
};

export const SmartCartDrawer: React.FC<SmartCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  exchangeRate,
  onUpdateQuantity,
  onRemoveItem,
  onToggleSelectItem,
  onToggleSelectAll,
  onDeleteSelected,
  onCheckout,
}) => {
  if (!isOpen) return null;

  // Enrich all items with calculated pricing
  const enrichedItems = cartItems
    .filter((item) => item && item.product)
    .map((item) => {
      const mode = item.purchaseMode || 'retail';
      const isSelected = item.selected !== false; // Default is checked
      const calc = calculateModePricing(item.product, mode, item.quantity);
      const wholesaleConfig = getProductWholesaleConfig(item.product);

      return {
        ...item,
        mode,
        isSelected,
        calc,
        wholesaleConfig,
      };
    });

  // Checkbox selection state
  const totalItemsCount = enrichedItems.length;
  const selectedItems = enrichedItems.filter((item) => item.isSelected);
  const selectedCount = selectedItems.length;
  const isAllSelected = totalItemsCount > 0 && selectedCount === totalItemsCount;
  const someSelected = selectedCount > 0 && selectedCount < totalItemsCount;

  // SHOPEE SMART PRICING LOGIC: Calculations are strictly over CHECKED items only!
  let rawRetailTotal = 0;
  let subtotalVND = 0;
  let hasAnyWholesaleInSelected = false;

  selectedItems.forEach((item) => {
    const retailPrice = item.product?.prices?.retail || 0;
    if (item.mode === 'wholesale') {
      hasAnyWholesaleInSelected = true;
      const upw = Math.max(1, item.product?.unitsPerWholesale || 1);
      const equivalentRetailPrice = retailPrice * upw * item.quantity;
      rawRetailTotal += equivalentRetailPrice;
    } else {
      rawRetailTotal += retailPrice * item.quantity;
    }

    subtotalVND += item.calc.totalPrice;
  });

  // Wholesale discount savings achieved on selected items
  const tierSavingsVND = Math.max(0, rawRetailTotal - subtotalVND);

  // Voucher 50k is in pending status (0đ in cart, automatically checked and applied via phone number at order modal)
  const voucherDiscountVND = 0;
  const finalTotalVND = subtotalVND;

  const handleProceedCheckout = () => {
    if (selectedCount === 0 || selectedItems.length === 0 || subtotalVND <= 0) {
      return;
    }

    onCheckout({
      items: selectedItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        purchaseMode: item.mode,
        selected: true,
        unitPrice: item.calc.unitPrice,
        subtotal: item.calc.totalPrice,
        pricing: item.calc,
        wholesaleConfig: item.wholesaleConfig,
      })),
      subtotalVND,
      discountVND: 0,
      finalTotalVND,
      voucherCode: null,
      hasWholesaleTier: hasAnyWholesaleInSelected,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-emerald-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFFFFF] rounded-xl p-[5px] shrink-0 h-10 flex items-center justify-center border-0 shadow-none grooster-logo-container !bg-[#FFFFFF] !shadow-none !border-none" style={{ backgroundColor: '#FFFFFF', boxShadow: 'none', filter: 'none', border: 'none', outline: 'none', mixBlendMode: 'normal', opacity: 1, padding: '5px' }}>
              <img
                src="https://i.postimg.cc/pTFzxzPN/hinh-anh-g-rooster-v2.jpg"
                alt="G-ROOSTER CO.,LTD"
                className="h-full w-auto object-contain rounded-lg grooster-logo-img !opacity-100"
                style={{ objectFit: 'contain', backgroundColor: '#FFFFFF', opacity: 1, filter: 'none', boxShadow: 'none', border: 'none', mixBlendMode: 'normal' }}
                fetchPriority="high"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = '/logo-grooster-v2.jpg';
                }}
              />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold tracking-tight leading-tight">
                Giỏ Hàng ({totalItemsCount})
              </h2>
              <p className="text-[11px] text-emerald-300">
                Tick chọn sản phẩm thanh toán sỉ & lẻ linh hoạt
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-emerald-900 transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shopee-style "Chọn tất cả" top bar */}
        {totalItemsCount > 0 && (
          <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between shrink-0 select-none">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-stone-800">
              <button
                type="button"
                onClick={() => onToggleSelectAll(!isAllSelected)}
                className={`w-6 h-6 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer touch-manipulation active:scale-95 ${
                  isAllSelected
                    ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                    : someSelected
                    ? 'bg-emerald-100 border-emerald-700 text-emerald-900'
                    : 'border-stone-400 bg-white hover:border-emerald-700'
                }`}
                title={isAllSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả sản phẩm'}
              >
                {isAllSelected ? (
                  <Check className="w-4 h-4 stroke-[3.5]" />
                ) : someSelected ? (
                  <span className="w-3 h-0.5 bg-emerald-900 rounded-full" />
                ) : null}
              </button>
              <span className="cursor-pointer select-none">
                Chọn tất cả ({totalItemsCount} món)
              </span>
            </label>

            {selectedCount > 0 && (
              <button
                type="button"
                onClick={onDeleteSelected}
                className="text-stone-500 hover:text-red-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Xóa các sản phẩm đang được tick chọn"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa đã chọn ({selectedCount})</span>
              </button>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="overflow-y-auto p-4 flex-1 space-y-3">
          {totalItemsCount === 0 ? (
            <div className="text-center py-12 sm:py-16 px-4 flex flex-col items-center justify-center my-auto">
              {/* Minh họa nhỏ xinh giỏ hàng G-ROOSTER */}
              <div className="relative mb-5">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50/60 border border-emerald-100 flex items-center justify-center text-emerald-800 shadow-sm">
                  <div className="relative flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-[#1a4d2e] stroke-[1.5]" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                  </div>
                </div>
                {/* Huy hiệu thương hiệu thiện cảm */}
                <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-[#1a4d2e] text-[#f9df90] text-[10px] font-bold shadow-xs flex items-center gap-1 border border-amber-400/30">
                  <span>G-ROOSTER</span>
                  <Leaf className="w-2.5 h-2.5 text-emerald-300" />
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-heading tracking-tight">
                Giỏ hàng của bạn đang trống
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xs mx-auto leading-relaxed font-normal">
                Giỏ hàng của bạn đang trống. Hãy chọn những sản phẩm nông sản tuyệt vời nhất từ G-ROOSTER nhé!
              </p>

              <button
                id="btn-cart-empty-back"
                onClick={onClose}
                className="mt-6 px-6 py-3 rounded-xl bg-[#1a4d2e] hover:bg-[#143d24] active:scale-[0.98] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Quay lại mua sắm</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            enrichedItems.map((item) => (
              <CartItemCard
                key={`${item.product.id}-${item.mode}`}
                product={item.product}
                quantity={item.quantity}
                mode={item.mode}
                isSelected={item.isSelected}
                calc={item.calc}
                wholesaleConfig={item.wholesaleConfig}
                currency={currency}
                exchangeRate={exchangeRate}
                onToggleSelect={onToggleSelectItem}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))
          )}
        </div>

        {/* Cart Bottom Summary & Shopee Checkout */}
        {totalItemsCount > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50/95 space-y-3 shrink-0">
            {/* Automatic Voucher Pending Notice (Xóa bỏ hoàn toàn ô nhập mã và nút Áp dụng) */}
            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/80 flex items-center gap-2.5 text-xs shadow-2xs">
              <span className="text-xl shrink-0">🎁</span>
              <div className="min-w-0">
                <div className="font-bold text-amber-950 text-[12px]">
                  Ưu đãi 50k đơn sỉ đầu:
                </div>
                <div className="text-amber-900 text-[11px] leading-snug">
                  Tự động áp dụng khi nhập SĐT tại bước đặt hàng!
                </div>
              </div>
            </div>

            {/* Shopee Selected Items Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>
                  Tạm tính ({selectedCount} món đã chọn):
                </span>
                <span className="font-semibold text-stone-900">
                  {formatPrice(subtotalVND, currency, exchangeRate)}
                </span>
              </div>

              {tierSavingsVND > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Tiết kiệm mua sỉ:</span>
                  <span>- {formatPrice(tierSavingsVND, currency, exchangeRate)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-500 text-[11.5px]">
                <span>Ưu đãi đơn sỉ đầu:</span>
                <span className="font-medium text-amber-800">
                  Tự động kiểm tra theo SĐT ở bước sau
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-extrabold text-stone-900">
                    Tổng thanh toán:
                  </span>
                  <div className="text-[10px] text-stone-500">
                    {selectedCount > 0
                      ? `Áp dụng cho ${selectedCount} món đã tick`
                      : 'Chưa tick chọn món nào'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-950">
                    {formatPrice(finalTotalVND, currency, exchangeRate)}
                  </div>
                  {currency === 'USD' && (
                    <div className="text-[10px] text-stone-500 font-medium">
                      (~ {finalTotalVND.toLocaleString('en-US')} ₫)
                    </div>
                  )}
                  <div className="text-[10px] font-medium text-emerald-800 mt-0.5">
                    * Giá đã bao gồm thuế GTGT / VAT 8%
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Delivery Note */}
            <div className="flex items-center gap-1.5 p-2 rounded-xl bg-emerald-900/10 text-emerald-950 text-[11px] font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Giao hàng nhanh toàn quốc từ kho 44 Trần Đình Xu, P. Cầu Ông Lãnh, TP.HCM</span>
            </div>

            {/* Shopee Checkout Button */}
            <div className="space-y-1.5">
              <button
                id="btn-checkout-drawer"
                onClick={handleProceedCheckout}
                disabled={selectedCount === 0}
                className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedCount === 0
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none opacity-50 pointer-events-none'
                    : 'bg-emerald-900 hover:bg-emerald-950 active:scale-[0.99] text-white hover:shadow-xl'
                }`}
                title={
                  selectedCount === 0
                    ? 'Vui lòng tick chọn ít nhất 1 sản phẩm'
                    : 'Tiến hành đặt hàng'
                }
              >
                <span>
                  {selectedCount === 0
                    ? 'Chưa tick chọn sản phẩm nào'
                    : `Thanh Toán (${selectedCount} món đã chọn) • ${formatPrice(finalTotalVND, currency, exchangeRate)}`}
                </span>
                {selectedCount > 0 && <ArrowRight className="w-4 h-4 text-amber-400" />}
              </button>

              {selectedCount === 0 && (
                <p className="text-[11px] text-center text-amber-800 font-medium">
                  ⚠️ Vui lòng tick chọn ít nhất 1 sản phẩm để thanh toán
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
