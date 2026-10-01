import React, { useState } from 'react';
import { QrCode, Plus, Minus, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { Product, Currency, PurchaseMode } from '../types';
import {
  getProductWholesaleConfig,
  calculateModePricing,
  formatPrice,
} from '../utils/pricing';
import { G_ROOSTER_FALLBACK_IMAGE, markProductImageBroken } from '../utils/productImages';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  exchangeRate?: number;
  isFirst?: boolean;
  onAddToCart: (product: Product, quantity: number, purchaseMode: PurchaseMode) => void;
  onOpenDetail: (product: Product, initialMode?: PurchaseMode) => void;
  onOpenQR: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  exchangeRate,
  isFirst = false,
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

  // V178: Quản lý tồn kho & cháy hàng
  const stock = typeof product.stock === 'number' ? product.stock : 50;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock < 5;

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
    if (isOutOfStock) return;
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

  const isMatcha =
    product.id === 'vtn-matcha-laka-ceremonial' ||
    product.id === 'vtn-matcha-laka-premium' ||
    product.id === 'vtn-matcha-laka-culinary' ||
    product.subCategory === 'Bột Matcha' ||
    (product.id || '').startsWith('vtn-matcha-');

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xl hover:border-emerald-700/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden w-full min-w-0"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '360px' }}
    >
      {/* Product Image & Top Badges - aspect-square 1:1 consistent ratio across 2-col mobile & 5-col desktop */}
      <div
        className={`relative w-full aspect-square overflow-hidden bg-white cursor-pointer flex items-center justify-center ${
          isMatcha ? 'p-0' : 'p-2 sm:p-2.5'
        }`}
        style={{ aspectRatio: '1 / 1' }}
        onClick={() => onOpenDetail(product, purchaseMode)}
      >
        <img
          src={product.image}
          alt={`${product.name} - G-ROOSTER`}
          referrerPolicy="no-referrer"
          className={`w-full h-full ${
            isMatcha ? 'object-cover object-center' : 'object-contain'
          } group-hover:scale-105 transition-transform duration-300 ease-out`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            markProductImageBroken(product.id, 'Lỗi tải ảnh');
            if (!product.isCustomImage && !product.image.startsWith('data:')) {
              if (product.id === 'vtn-matcha-laka-ceremonial') {
                if (target.src !== '/images/matcha-real/matcha-ceremonial-v150.jpg' && target.src !== '/images/matcha-real/matcha-ceremonial-real.jpg') {
                  target.src = '/images/matcha-real/matcha-ceremonial-v150.jpg';
                  return;
                }
              } else if (product.id === 'vtn-matcha-laka-premium') {
                if (target.src !== '/images/matcha-real/matcha-premium-v150.jpg' && target.src !== '/images/matcha-real/matcha-premium-real.jpg') {
                  target.src = '/images/matcha-real/matcha-premium-v150.jpg';
                  return;
                }
              } else if (product.id === 'vtn-matcha-laka-culinary') {
                if (target.src !== '/images/matcha-real/matcha-culinary-v150.jpg' && target.src !== '/images/matcha-real/matcha-culinary-real.jpg') {
                  target.src = '/images/matcha-real/matcha-culinary-v150.jpg';
                  return;
                }
              }
            }
            target.src = G_ROOSTER_FALLBACK_IMAGE;
          }}
          onLoad={(e) => {
            const target = e.currentTarget;
            if (!product.isCustomImage && !product.image.startsWith('data:')) {
              if (target.naturalWidth === 320 && target.naturalHeight === 320) {
                if (product.id === 'vtn-matcha-laka-ceremonial') {
                  target.src = '/images/matcha-real/matcha-ceremonial-v150.jpg';
                } else if (product.id === 'vtn-matcha-laka-premium') {
                  target.src = '/images/matcha-real/matcha-premium-v150.jpg';
                } else if (product.id === 'vtn-matcha-laka-culinary') {
                  target.src = '/images/matcha-real/matcha-culinary-v150.jpg';
                }
              }
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* V178: Lớp phủ Hết Hàng (0) */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-black text-[11px] uppercase tracking-wider shadow-lg border border-white/20">
              HẾT HÀNG
            </span>
          </div>
        )}

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

        {/* Bottom overlay: Unit */}
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
        </div>
      </div>

      {/* Body Content - Minimalist & High-Impact: Nhãn Dòng Sản Phẩm -> Tên -> Mua Lẻ/Sỉ -> Giá -> Thêm giỏ */}
      <div className="p-2 sm:p-2.5 lg:p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Nhãn mờ (Brand Label) phía trên tên sản phẩm: Dòng sản phẩm G-ROOSTER */}
          <div className="text-[9px] sm:text-[10px] font-bold text-emerald-800/90 uppercase tracking-wider mb-1 truncate flex items-center gap-1 font-heading">
            <span className="text-[#d4af37] text-[10px]">★</span>
            <span className="truncate">{product.partnerName || 'DÒNG SẢN PHẨM CAO CẤP'}</span>
          </div>

          {/* Tên sản phẩm (Chữ đậm) - V191: Chiều cao cố định chuẩn (min-h & h) để tất cả Bảng giá sỉ và Nút Thêm giỏ nằm cạnh nhau THẲNG HÀNG NGANG tuyệt đối */}
          <h4
            onClick={() => onOpenDetail(product, purchaseMode)}
            className="text-[12.5px] sm:text-[14px] font-bold text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors leading-snug min-h-[40px] sm:min-h-[44px] h-[40px] sm:h-[44px] flex items-start mb-1.5 font-heading overflow-hidden"
            title={product.name}
          >
            <span className="line-clamp-2">{product.name}</span>
          </h4>

          {/* Bảng chọn Mua Lẻ / Sỉ: Thanh gạt (Segmented Control) sang trọng - Cao 46px-48px */}
          <div className="p-1 bg-stone-100/90 rounded-xl flex items-center gap-1 border border-stone-200/90 shadow-inner h-[46px] sm:h-[48px]">
            <button
              type="button"
              id={`tab-retail-${product.id}`}
              onClick={(e) => handleTabChange('retail', e)}
              className={`flex-1 h-full rounded-lg text-[11px] sm:text-[12px] font-bold transition-all duration-300 ease-out flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer active:scale-[0.98] ${
                purchaseMode === 'retail'
                  ? 'bg-[#1a4d2e] text-white shadow-md shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                  : 'bg-stone-50/80 hover:bg-stone-100 text-stone-600 border border-stone-200/80'
              }`}
            >
              <ShoppingBag
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors duration-200 ${
                  purchaseMode === 'retail' ? 'text-[#d4af37]' : 'text-stone-400'
                }`}
              />
              <span className="whitespace-nowrap">Mua Lẻ</span>
            </button>

            <button
              type="button"
              id={`tab-wholesale-${product.id}`}
              onClick={(e) => handleTabChange('wholesale', e)}
              className={`flex-1 h-full rounded-lg text-[11px] sm:text-[12px] font-bold transition-all duration-300 ease-out flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer active:scale-[0.98] ${
                purchaseMode === 'wholesale'
                  ? 'bg-[#1a4d2e] text-white shadow-md shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                  : 'bg-stone-50/80 hover:bg-stone-100 text-stone-600 border border-stone-200/80'
              }`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors duration-200 ${
                  purchaseMode === 'wholesale' ? 'text-[#d4af37]' : 'text-stone-400'
                }`}
              />
              <span className="whitespace-nowrap">Mua Sỉ</span>
            </button>
          </div>

          {/* DYNAMIC PRICING VIEW - Đồng bộ chiều cao min-h để các nút phía dưới luôn thẳng tắp */}
          {purchaseMode === 'retail' ? (
            /* TAB [ MUA LẺ ]: Giá lớn, nổi bật */
            <div className="mt-2 py-0.5 px-0.5 min-h-[58px] sm:min-h-[64px] flex flex-col justify-center">
              <div className="flex items-baseline justify-between gap-1 flex-wrap">
                <div className="text-sm sm:text-base lg:text-[17px] font-black text-emerald-950 tracking-tight leading-tight">
                  {formatPrice(product.prices.retail, currency, exchangeRate, product.hideUsd)}
                  <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 ml-1">
                    /{product.retailUnit || product.unit}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* TAB [ MUA SỈ ]: 3 cấp độ sỉ thanh lịch */
            <div className="mt-1.5 space-y-1 min-h-[58px] sm:min-h-[64px] flex flex-col justify-center">
              <div className="sm:hidden flex items-baseline justify-between px-0.5 gap-1">
                <div className="text-xs font-black text-emerald-950 tracking-tight">
                  {formatPrice(pricing.unitPrice, currency, exchangeRate, product.hideUsd)}
                  <span className="text-[9px] font-normal text-stone-500 ml-0.5">
                    /{wholesaleConfig.wholesaleUnit}
                  </span>
                </div>
              </div>

              {/* 3 Wholesale Tiers Grid (Thanh mảnh, đồng bộ phông Plus Jakarta Sans, con số đơn giá giảm 1px để nằm gọn sắc nét) */}
              <div className="grid grid-cols-3 gap-0.5 sm:gap-1 text-center">
                {([
                  wholesaleConfig.tiers.wholesale1,
                  wholesaleConfig.tiers.wholesale2,
                  wholesaleConfig.tiers.wholesale3,
                ] as const).map((t) => {
                  const isActive = pricing.activeTier === t.tier;
                  const unitDisplay =
                    wholesaleConfig.wholesaleUnit === 'HỘP'
                      ? 'Hộp'
                      : wholesaleConfig.wholesaleUnit === 'SET'
                      ? 'Set'
                      : wholesaleConfig.wholesaleUnit;
                  const qtyLabel = `${t.minQty}+ ${unitDisplay}`;
                  const tierLabel = t.tier === 'wholesale1' ? 'Sỉ 1' : t.tier === 'wholesale2' ? 'Sỉ 2' : 'Sỉ 3';
                  const priceFormatted = formatPrice(t.price, currency, exchangeRate, product.hideUsd);

                  // Cỡ chữ con số đơn giá giảm xuống 1px (9px / 8px) để nằm gọn gàng, sắc nét trong ô vuông (như bản V88)
                  const priceFontSize =
                    priceFormatted.length >= 13
                      ? 'text-[7.5px] sm:text-[8px]'
                      : priceFormatted.length >= 11
                      ? 'text-[8px] sm:text-[8.5px]'
                      : 'text-[9px] sm:text-[9px]';

                  return (
                    <div
                      key={t.tier}
                      className={`py-1 px-0.5 sm:py-1.5 sm:px-1 rounded-md transition-all flex flex-col items-center justify-center text-center min-w-0 overflow-hidden ${
                        isActive
                          ? 'bg-[#1a4d2e] text-white shadow-xs ring-1 ring-[#1a4d2e]'
                          : 'bg-stone-50/90 text-stone-700 hover:bg-stone-100 border border-stone-200/90'
                      }`}
                    >
                      {/* Dòng 1: Tiêu đề Sỉ 1, Sỉ 2, Sỉ 3 */}
                      <div className={`text-[8.5px] sm:text-[9.5px] font-semibold leading-tight truncate w-full ${isActive ? 'text-white' : 'text-stone-500'}`}>
                        {tierLabel}
                      </div>

                      {/* Dòng 2: Con số đơn giá - font Jakarta Sans, weight 800 (font-extrabold), giảm 1px (9px), Vàng Gold khi active */}
                      <div
                        className={`w-full text-center font-heading font-extrabold font-[800] leading-tight tracking-tight mt-0.5 break-words px-0.2 ${priceFontSize} ${
                          isActive ? 'text-[#f6d884]' : 'text-stone-900'
                        }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                        title={priceFormatted}
                      >
                        {priceFormatted}
                      </div>

                      {/* Dòng 3: Nhãn số lượng - giữ đúng định dạng gọn 10+ KG, 3+ THÙNG */}
                      <div
                        className={`w-full text-center font-heading font-bold uppercase leading-tight truncate mt-0.5 tracking-tight text-[9px] sm:text-[9.5px] ${
                          isActive ? 'text-[#f6d884]' : 'text-stone-600'
                        }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      >
                        {qtyLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* COMPACT QUANTITY + ACTION BUTTON AREA */}
        <div className="mt-2 pt-1.5 border-t border-stone-100 min-w-0">
          {/* Row 1: Quantity Stepper (SL input + - button) */}
          <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold shrink-0">SL:</span>
              <div className="flex items-center border border-stone-300 rounded-md bg-stone-50 overflow-hidden shadow-2xs shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={isMinQty || isOutOfStock}
                  className={`w-5.5 h-6 sm:w-6.5 sm:h-6.5 flex items-center justify-center text-stone-700 transition-colors ${
                    isMinQty || isOutOfStock ? 'opacity-30 cursor-not-allowed bg-stone-100' : 'hover:bg-stone-200 active:bg-stone-300'
                  }`}
                  aria-label="Giảm số lượng"
                  title={isOutOfStock ? 'Hết hàng' : isMinQty ? `Tối thiểu: ${pricing.minAllowedQty} ${pricing.unit}` : 'Giảm 1'}
                >
                  <Minus className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                </button>
                <input
                  id={`qty-input-${product.id}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  disabled={isOutOfStock}
                  value={displayQuantity}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  onFocus={(e) => e.target.select()}
                  onClick={(e) => {
                    e.stopPropagation();
                    (e.target as HTMLInputElement).select();
                  }}
                  className={`w-7 sm:w-9 h-6 sm:h-6.5 text-center text-[10.5px] sm:text-xs font-black text-stone-900 bg-white focus:bg-amber-50 focus:outline-none border-x border-stone-200 selection:bg-emerald-800 selection:text-white ${
                    isOutOfStock ? 'opacity-50 cursor-not-allowed bg-stone-100' : ''
                  }`}
                  title={isOutOfStock ? 'Hết hàng' : 'Nhấp để nhập số lượng trực tiếp (ví dụ 10)'}
                  aria-label="Số lượng đặt mua"
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={isOutOfStock}
                  className={`w-5.5 h-6 sm:w-6.5 sm:h-6.5 flex items-center justify-center text-stone-700 transition-colors ${
                    isOutOfStock ? 'opacity-30 cursor-not-allowed bg-stone-100' : 'hover:bg-stone-200 active:bg-stone-300'
                  }`}
                  aria-label="Tăng số lượng"
                  title={isOutOfStock ? 'Hết hàng' : 'Tăng 1'}
                >
                  <Plus className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                </button>
              </div>
              <span className="text-[9px] sm:text-[10px] text-stone-600 font-bold truncate max-w-[50px] shrink-0" title={pricing.unit}>
                {pricing.unit}
              </span>
            </div>

            {/* In desktop, keep quick unit info or mini indicator */}
            <span className="hidden sm:inline text-[9px] text-stone-400 font-medium truncate">
              {purchaseMode === 'wholesale' ? 'Giá sỉ' : 'Giá lẻ'}
            </span>
          </div>

          {/* Row 2: TỔNG TIỀN (TẠM TÍNH) - NẰM TRÊN MỘT HÀNG RIÊNG BIỆT TRƯỚC NÚT THÊM GIỎ, TUYỆT ĐỐI KHÔNG ĐÈ LÊN (+/-) */}
          <div className="flex items-center justify-between py-1 px-1.5 mb-1.5 rounded-md bg-stone-50 border border-stone-200/80 min-w-0">
            <span className="text-[9.5px] sm:text-[11px] text-stone-500 font-medium shrink-0">Tạm tính:</span>
            <div className="text-[13px] sm:text-[15px] md:text-[16px] font-black text-emerald-950 tracking-tight leading-none truncate max-w-[140px] text-right">
              {formatPrice(pricing.totalPrice, currency, exchangeRate, product.hideUsd)}
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
            disabled={isOutOfStock}
            onClick={handleAdd}
            className={`w-full py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-lg font-bold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 shadow-2xs min-w-0 ${
              isOutOfStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300 shadow-none'
                : addedAnimation
                ? 'bg-amber-500 text-stone-950 shadow-amber-500/20 active:scale-[0.97]'
                : 'bg-emerald-900 hover:bg-emerald-950 text-white shadow-emerald-950/10 active:scale-[0.97]'
            }`}
            title={isOutOfStock ? 'Sản phẩm hiện đang hết hàng' : `Thêm ${displayQuantity} ${pricing.unit} vào giỏ hàng`}
          >
            {isOutOfStock ? (
              <span className="text-[11px] sm:text-xs font-bold text-stone-500">Hết hàng</span>
            ) : addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5 text-stone-950 stroke-[3] shrink-0" />
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
