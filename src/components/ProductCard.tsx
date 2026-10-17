import React, { useState } from 'react';
import { QrCode, Plus, Minus, ShoppingBag, Sparkles, Check, Phone, Building2 } from 'lucide-react';
import { Product, Currency, PurchaseMode, Language } from '../types';
import {
  getProductWholesaleConfig,
  calculateModePricing,
  formatPrice,
  getWholesaleInitialQuantity,
} from '../utils/pricing';
import {
  G_ROOSTER_FALLBACK_IMAGE,
  markProductImageBroken,
  isProductImageMissing,
  getOptimizedProductImageUrl,
} from '../utils/productImages';
import { cleanProductTitle } from '../data/products';
import { translateUnit, TRANSLATIONS } from '../utils/i18n';
import { translateText, getTranslatedProductName, getTranslatedPartnerName } from '../utils/productTranslation';
import { BrandedImagePlaceholder } from './BrandedImagePlaceholder';
import { hasColorVariants } from '../utils/productVariants';
import { getPackagingUnitNoun, getProductDynamicSpecText } from '../utils/productStore';
import { openB2BContactModal } from './B2BContactModal';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  language?: Language;
  exchangeRate?: number;
  isFirst?: boolean;
  onAddToCart: (product: Product, quantity: number, purchaseMode: PurchaseMode, selectedVariant?: string) => void;
  onRequestSelectVariant?: (product: Product, quantity: number, purchaseMode: PurchaseMode) => void;
  onOpenDetail: (product: Product, initialMode?: PurchaseMode) => void;
  onOpenQR: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  language = 'VN',
  exchangeRate,
  isFirst = false,
  onAddToCart,
  onRequestSelectVariant,
  onOpenDetail,
  onOpenQR,
}) => {
  const isThaoDuocSam =
    product.partnerId === 'thao-duoc-sam' ||
    (product.id || '').startsWith('dato-');
  const isSocola =
    product.partnerId === 'socola-qua-tang' ||
    (product.id || '').startsWith('socola-');

  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>('retail');
  const [retailQty, setRetailQty] = useState<number>(1);
  const wholesaleConfig = getProductWholesaleConfig(product);
  const [wholesaleQty, setWholesaleQty] = useState<number>(() => getWholesaleInitialQuantity(product, wholesaleConfig));
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
          ? (language === 'EN'
              ? `Minimum retail quantity is 1 ${translateUnit(product.retailUnit || product.unit, language)}. Reset to 1.`
              : `Số lượng lẻ tối thiểu là 1 ${product.retailUnit || product.unit}. Đã tự động đưa về 1.`)
          : (language === 'EN'
              ? `Minimum wholesale quantity is ${minAllowed} ${translateUnit(wholesaleConfig.wholesaleUnit, language)}. Reset to minimum!`
              : `Số lượng sỉ tối thiểu là ${minAllowed} ${wholesaleConfig.wholesaleUnit}. Đã tự động đưa về mức tối thiểu!`);
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
        showGentleNotice(
          language === 'EN'
            ? `Minimum wholesale quantity is ${wholesaleConfig.minWholesaleQty} ${translateUnit(wholesaleConfig.wholesaleUnit, language)}.`
            : `Số lượng sỉ tối thiểu là ${wholesaleConfig.minWholesaleQty} ${wholesaleConfig.wholesaleUnit}.`
        );
      }
    }
  };

  const handleBuyRetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchaseMode('retail');
    if (hasColorVariants(product)) {
      if (onRequestSelectVariant) {
        onRequestSelectVariant(product, retailQty, 'retail');
      } else {
        onOpenDetail(product, 'retail');
      }
      return;
    }
    onAddToCart(product, retailQty, 'retail');
    setAddedAnimation('retail');
    setTimeout(() => setAddedAnimation(null), 1500);
  };

  const handleBuyWholesale = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchaseMode('wholesale');
    const qty = Math.max(wholesaleConfig.minWholesaleQty, wholesaleQty);
    if (hasColorVariants(product)) {
      if (onRequestSelectVariant) {
        onRequestSelectVariant(product, qty, 'wholesale');
      } else {
        onOpenDetail(product, 'wholesale');
      }
      return;
    }
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
      const targetMin = getWholesaleInitialQuantity(product, wholesaleConfig);
      setWholesaleQty(targetMin);
    }
  };

  const handleSelectWholesaleTier = (tierKey: 'wholesale1' | 'wholesale2' | 'wholesale3', e: React.MouseEvent) => {
    e.stopPropagation();
    if (purchaseMode !== 'wholesale') {
      setPurchaseMode('wholesale');
    }
    const targetQty = wholesaleConfig.tiers[tierKey]?.minQty || 1;
    setRawInput(null);
    setMinNotice(null);
    setWholesaleQty(targetQty);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    const qty =
      purchaseMode === 'wholesale'
        ? Math.max(wholesaleConfig.minWholesaleQty, wholesaleQty)
        : retailQty;

    // V255: Yêu cầu mở popup chọn phân loại [XANH] | [ĐỎ] | [VÀNG] | [NGẪU NHIÊN]
    if (hasColorVariants(product)) {
      if (onRequestSelectVariant) {
        onRequestSelectVariant(product, qty, purchaseMode);
      } else {
        onOpenDetail(product, purchaseMode);
      }
      return;
    }

    if (purchaseMode === 'wholesale') {
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
      className="group bg-white rounded-xl sm:rounded-2xl border border-stone-200/90 shadow-none sm:shadow-2xs hover:shadow-none sm:hover:shadow-lg hover:border-emerald-600/50 transition-colors sm:transition-all duration-200 sm:duration-300 sm:hover:-translate-y-1 flex flex-col overflow-hidden w-full min-w-0"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '360px' }}
    >
      {/* Product Image & Top Badges - aspect-square 1:1 consistent ratio across 2-col mobile & 5-col desktop */}
      <div
        className="relative w-full aspect-square overflow-hidden bg-white cursor-pointer flex items-center justify-center p-2.5 sm:p-3 select-none"
        style={{ aspectRatio: '1 / 1', backgroundColor: '#ffffff' }}
        onClick={() => onOpenDetail(product, purchaseMode)}
      >
        {isProductImageMissing(product) ? (
          <BrandedImagePlaceholder language={language} size="md" />
        ) : (
          <img
            src={getOptimizedProductImageUrl(product.image)}
            alt={`${cleanProductTitle(product.name)} - G-ROOSTER`}
            referrerPolicy="no-referrer"
            width={500}
            height={500}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
            style={{ objectFit: 'contain', backgroundColor: '#ffffff' }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('.webp')) {
                // Fallback từ webp về jpg gốc
                target.src = target.src.replace(/\.webp$/i, '.jpg');
                return;
              }
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
        )}
        {/* Bottom subtle gradient for badges readability without dimming white container */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* V178: Lớp phủ Hết Hàng (0) */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-2 text-center pointer-events-none">
            <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-black text-[11px] uppercase tracking-wider shadow-lg border border-white/20">
              {language === 'EN' ? 'OUT OF STOCK' : 'HẾT HÀNG'}
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
            className="p-1 sm:p-1.5 rounded-lg bg-white/90 hover:bg-white text-emerald-950 hover:text-emerald-700 shadow-md backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
            title={language === 'EN' ? 'View recipe QR code for this product' : 'Xem mã QR công thức pha chế của sản phẩm này'}
            aria-label={language === 'EN' ? 'View recipe QR code' : 'Xem mã QR công thức'}
          >
            <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

        {/* Bottom overlay: Dynamic Specification V270 */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 flex items-center justify-between text-white text-xs z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openB2BContactModal(product.name);
            }}
            className="px-2 py-0.5 rounded-md bg-stone-900/85 hover:bg-[#1a4d2e] text-white text-[8.5px] sm:text-[9.5px] font-semibold backdrop-blur-md shadow-xs transition-colors flex items-center gap-1 cursor-pointer border border-white/20 hover:border-amber-400"
            title={language === 'EN' ? 'Click to contact B2B' : 'Nhấp để liên hệ tư vấn B2B'}
          >
            <span>{getProductDynamicSpecText(product, language === 'EN' ? 'EN' : 'VN')}</span>
          </button>
        </div>
      </div>

      {/* Body Content - Minimalist & High-Impact: Nhãn Dòng Sản Phẩm -> Tên -> Mua Lẻ/Sỉ -> Giá -> Thêm giỏ */}
      <div className="p-2 sm:p-2.5 lg:p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Nhãn mờ (Brand Label) phía trên tên sản phẩm: Dòng sản phẩm G-ROOSTER */}
          <div className="text-[9px] sm:text-[10px] font-bold text-emerald-800/90 uppercase tracking-wider mb-1 truncate flex items-center gap-1 font-heading">
            <span className="text-[#d4af37] text-[10px]">★</span>
            <span className="truncate">{getTranslatedPartnerName(product.partnerName, language) || (language === 'EN' ? 'PREMIUM PRODUCT LINE' : 'DÒNG SẢN PHẨM CAO CẤP')}</span>
          </div>

          {/* Tên sản phẩm (Chữ đậm) - V254 & V264: Chuẩn hóa Clean Title và 100% English translation */}
          <h4
            onClick={() => onOpenDetail(product, purchaseMode)}
            className="text-[12.5px] sm:text-[14px] font-bold text-stone-900 hover:text-emerald-800 cursor-pointer transition-colors leading-snug min-h-[40px] sm:min-h-[44px] h-[40px] sm:h-[44px] flex items-start mb-1.5 font-heading overflow-hidden"
            title={cleanProductTitle(product.name)}
          >
            <span className="line-clamp-2">{cleanProductTitle(getTranslatedProductName(product, language))}</span>
          </h4>

          {/* Bảng chọn Mua Lẻ / Sỉ: Thanh gạt (Segmented Control) sang trọng - Cao 46px-48px */}
          <div className="p-1 bg-stone-100/90 rounded-xl flex items-center gap-1 border border-stone-200/90 shadow-none sm:shadow-inner h-[46px] sm:h-[48px]">
            <button
              type="button"
              id={`tab-retail-${product.id}`}
              onClick={(e) => handleTabChange('retail', e)}
              className={`flex-1 h-full rounded-lg text-[11px] sm:text-[12px] font-bold transition-all duration-300 ease-out flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer active:scale-[0.98] ${
                purchaseMode === 'retail'
                  ? 'bg-[#1a4d2e] text-white shadow-none sm:shadow-md sm:shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                  : 'bg-stone-50/80 hover:bg-stone-100 text-stone-600 border border-stone-200/80'
              }`}
            >
              <ShoppingBag
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors duration-200 ${
                  purchaseMode === 'retail' ? 'text-[#d4af37]' : 'text-stone-400'
                }`}
              />
              <span className="whitespace-nowrap">{language === 'EN' ? 'Buy Retail' : 'Mua Lẻ'}</span>
            </button>

            <button
              type="button"
              id={`tab-wholesale-${product.id}`}
              onClick={(e) => handleTabChange('wholesale', e)}
              className={`flex-1 h-full rounded-lg text-[11px] sm:text-[12px] font-bold transition-all duration-300 ease-out flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer active:scale-[0.98] ${
                purchaseMode === 'wholesale'
                  ? 'bg-[#1a4d2e] text-white shadow-none sm:shadow-md sm:shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                  : 'bg-stone-50/80 hover:bg-stone-100 text-stone-600 border border-stone-200/80'
              }`}
            >
              <Sparkles
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-colors duration-200 ${
                  purchaseMode === 'wholesale' ? 'text-[#d4af37]' : 'text-stone-400'
                }`}
              />
              <span className="whitespace-nowrap">{language === 'EN' ? 'Buy Wholesale' : 'Mua Sỉ'}</span>
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
                    /{translateUnit(product.retailUnit || product.unit, language)}
                  </span>
                  {!isThaoDuocSam && !isSocola && product.unitsPerWholesale && product.unitsPerWholesale > 1 && (
                    <span className="text-[10px] sm:text-[11px] font-normal text-stone-500 ml-1">
                      (~{formatPrice(product.prices.retail * product.unitsPerWholesale, currency, exchangeRate, product.hideUsd)}/{translateUnit('Thùng', language)})
                    </span>
                  )}
                </div>
                {typeof product.stock === 'number' && product.stock > 0 && product.stock < 5 && (
                  <span className="text-[9.5px] sm:text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-300/80 inline-flex items-center gap-1 shrink-0">
                    <span className="w-1 h-1 rounded-full bg-amber-600 animate-pulse" />
                    {language === 'EN' ? `Only ${product.stock} left` : `Chỉ còn ${product.stock} sp`}
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* TAB [ MUA SỈ ]: V271 - Tinh giản banner thoáng đãng & nút LIÊN HỆ gọn gàng */
            <div className="mt-1.5 min-h-[58px] sm:min-h-[64px] flex flex-col justify-center">
              <div
                onClick={() => openB2BContactModal(product.name)}
                className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-[#143A24] via-[#1a4d2e] to-[#0d2a1a] text-white border border-[#d4af37]/60 shadow-xs text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-amber-400 hover:scale-[1.01] transition-all group"
              >
                <div className="flex items-center gap-1.5 text-[#f6d884] group-hover:text-amber-300 text-[11px] sm:text-[11.5px] font-medium tracking-normal">
                  <Building2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{language === 'EN' ? 'B2B Wholesale: Inquire Now' : 'Giá sỉ B2B: Liên hệ tư vấn'}</span>
                </div>
                <div className="flex items-center gap-1 text-[9.5px] sm:text-[10px] text-amber-200/90 font-light">
                  <Phone className="w-2.5 h-2.5 text-[#d4af37]" />
                  <span>{language === 'EN' ? 'Hotline & Zalo: 0938 7979 04' : 'Hotline & Zalo: 0938 7979 04'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* COMPACT QUANTITY + ACTION BUTTON AREA */}
        {purchaseMode === 'wholesale' ? (
          /* V271: Chế độ mua sỉ - Nút duy nhất [LIÊN HỆ] */
          <div className="mt-2 pt-1.5 border-t border-stone-100 min-w-0">
            <button
              type="button"
              onClick={() => openB2BContactModal(product.name)}
              className="w-full py-2.5 px-3 rounded-xl font-heading font-bold text-[11px] sm:text-xs bg-gradient-to-r from-amber-500 via-[#d4af37] to-amber-500 hover:brightness-110 text-stone-950 shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-stone-950" />
              <span>{language === 'EN' ? 'CONTACT' : 'LIÊN HỆ'}</span>
            </button>
          </div>
        ) : (
          /* Chế độ mua lẻ: Stepper số lượng + Tạm tính + Thêm giỏ lẻ */
          <div className="mt-2 pt-1.5 border-t border-stone-100 min-w-0">
            {/* Row 1: Quantity Stepper (SL input + - button) */}
            <div className="flex items-center justify-between gap-1 mb-1 min-w-0">
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span className="text-[9px] sm:text-[10px] text-stone-500 font-bold shrink-0">
                  {language === 'EN' ? 'Qty:' : 'SL:'}
                </span>
                <div className="flex items-center border border-stone-300 rounded-md bg-stone-50 overflow-hidden shadow-2xs shrink-0">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={isMinQty || isOutOfStock}
                    className={`w-5.5 h-6 sm:w-6.5 sm:h-6.5 flex items-center justify-center text-stone-700 transition-colors ${
                      isMinQty || isOutOfStock ? 'opacity-30 cursor-not-allowed bg-stone-100' : 'hover:bg-stone-200 active:bg-stone-300'
                    }`}
                    aria-label={language === 'EN' ? 'Decrease quantity' : 'Giảm số lượng'}
                    title={isOutOfStock ? (language === 'EN' ? 'Out of stock' : 'Hết hàng') : isMinQty ? `${language === 'EN' ? 'Min' : 'Tối thiểu'}: ${pricing.minAllowedQty} ${translateUnit(pricing.unit, language)}` : '-1'}
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
                    title={isOutOfStock ? (language === 'EN' ? 'Out of stock' : 'Hết hàng') : (language === 'EN' ? 'Enter quantity' : 'Nhấp để nhập số lượng trực tiếp')}
                    aria-label={language === 'EN' ? 'Order quantity' : 'Số lượng đặt mua'}
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={isOutOfStock}
                    className={`w-5.5 h-6 sm:w-6.5 sm:h-6.5 flex items-center justify-center text-stone-700 transition-colors ${
                      isOutOfStock ? 'opacity-30 cursor-not-allowed bg-stone-100' : 'hover:bg-stone-200 active:bg-stone-300'
                    }`}
                    aria-label={language === 'EN' ? 'Increase quantity' : 'Tăng số lượng'}
                    title={isOutOfStock ? (language === 'EN' ? 'Out of stock' : 'Hết hàng') : '+1'}
                  >
                    <Plus className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  </button>
                </div>
                <span className="text-[9px] sm:text-[10px] text-stone-600 font-bold truncate max-w-[50px] shrink-0" title={translateUnit(pricing.unit, language)}>
                  {translateUnit(pricing.unit, language)}
                </span>
              </div>

              {/* In desktop, keep quick unit info or mini indicator */}
              <span className="hidden sm:inline text-[9px] text-stone-400 font-medium truncate">
                {language === 'EN' ? 'Retail' : 'Giá lẻ'}
              </span>
            </div>

            {/* Row 2: TỔNG TIỀN (TẠM TÍNH) */}
            <div className="flex items-center justify-between py-1 px-1.5 mb-1.5 rounded-md bg-stone-50 border border-stone-200/80 min-w-0">
              <span className="text-[9.5px] sm:text-[11px] text-stone-500 font-medium shrink-0">
                {language === 'EN' ? 'Subtotal:' : 'Tạm tính:'}
              </span>
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
              className={`w-full py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl font-bold text-[11px] sm:text-xs transition-colors sm:transition-all duration-200 sm:duration-300 ease-in-out flex items-center justify-center gap-1.5 shadow-none sm:shadow-2xs min-w-0 ${
                isOutOfStock
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300 shadow-none'
                  : addedAnimation
                  ? 'bg-amber-500 text-stone-950 sm:shadow-amber-500/20 active:scale-[0.97]'
                  : 'bg-emerald-900 hover:bg-emerald-950 hover:brightness-110 text-white sm:shadow-emerald-950/10 active:scale-[0.97]'
              }`}
              title={isOutOfStock ? (language === 'EN' ? 'Out of stock' : 'Sản phẩm hiện đang hết hàng') : (language === 'EN' ? `Add ${displayQuantity} ${translateUnit(pricing.unit, language)} to cart` : `Thêm ${displayQuantity} ${pricing.unit} vào giỏ hàng`)}
            >
              {isOutOfStock ? (
                <span className="text-[11px] sm:text-xs font-bold text-stone-500">{language === 'EN' ? 'Out of stock' : 'Hết hàng'}</span>
              ) : addedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-stone-950 stroke-[3] shrink-0" />
                  <span className="text-[11px] font-black">{language === 'EN' ? 'Added!' : 'Đã thêm!'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold truncate">
                    <span className="sm:hidden">{language === 'EN' ? 'Add' : 'Thêm giỏ'}</span>
                    <span className="hidden sm:inline">
                      {language === 'EN' ? 'Add Retail' : 'Thêm giỏ lẻ'}
                    </span>
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
