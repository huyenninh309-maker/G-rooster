import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Images,
  MapPin,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { Product, Currency, PurchaseMode, Language } from '../types';
import {
  getProductWholesaleConfig,
  calculateModePricing,
  formatPrice,
  getWholesaleInitialQuantity,
} from '../utils/pricing';
import { TRANSLATIONS, translateUnit } from '../utils/i18n';
import { HealthBenefitsSection } from './HealthBenefitsSection';
import { getProductHealthBenefits } from '../data/healthBenefits';
import { RECIPES } from '../data/recipes';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';
import { getProductImages, G_ROOSTER_FALLBACK_IMAGE, markProductImageBroken, isProductImageMissing } from '../utils/productImages';
import { ImageLightboxModal } from './ImageLightboxModal';
import { getTranslatedProductInfo, translateText } from '../utils/productTranslation';
import { cleanProductTitle } from '../data/products';
import { BrandedImagePlaceholder } from './BrandedImagePlaceholder';
import {
  hasColorVariants,
  MFOOD_COLOR_VARIANTS,
  getColorVariantStyle,
} from '../utils/productVariants';

const getConciseOrigin = (originStr?: string, partnerId?: string, lang: Language | string = 'VN'): string => {
  const isEn = lang === 'EN';
  if (!originStr) return isEn ? 'VIETNAM' : 'VIỆT NAM';
  if (partnerId === 'matcha-tra-laka' || partnerId === 'matcha-laka' || originStr.toLowerCase().includes('nhật bản') || originStr.toLowerCase().includes('japan')) return isEn ? 'JAPAN' : 'NHẬT BẢN';
  if (partnerId === 'nuoc-mia-iqf' || partnerId === 'nuoc-mia-tuyet' || partnerId === 'vua-mia') return isEn ? 'TAY NINH, VIETNAM' : 'TÂY NINH';
  if (partnerId === 'socola-qua-tang' || originStr.toLowerCase().includes('bến tre') || originStr.toLowerCase().includes('ben tre')) return isEn ? 'BEN TRE, VIETNAM' : 'BẾN TRE';
  if (partnerId === 'dac-san-snack' || partnerId === 'cha-bong-kho' || partnerId === 'phu-nha') return isEn ? 'HO CHI MINH CITY' : 'TP. HỒ CHÍ MINH';
  if (partnerId === 'thao-duoc-sam' || originStr.toLowerCase().includes('kon tum') || originStr.toLowerCase().includes('ngọc linh')) return isEn ? 'KON TUM, VIETNAM' : 'KON TUM';
  if (originStr.toLowerCase().includes('đà lạt') || originStr.toLowerCase().includes('cầu đất') || originStr.toLowerCase().includes('cau dat')) return isEn ? 'CAU DAT, DA LAT' : 'CẦU ĐẤT, ĐÀ LẠT';
  if (originStr.toLowerCase().includes('buôn ma thuột') || originStr.toLowerCase().includes('đắk lắk') || originStr.toLowerCase().includes('dak lak')) return isEn ? 'DAK LAK, VIETNAM' : 'ĐẮK LẮK';
  if (originStr.toLowerCase().includes('hòa bình') || originStr.toLowerCase().includes('hoa binh')) return isEn ? 'HOA BINH, VIETNAM' : 'HÒA BÌNH';
  const clean = originStr.split('(')[0].split(',')[0].trim();
  return isEn ? translateText(clean, 'EN').toUpperCase() : clean.toUpperCase();
};

interface ProductDetailModalProps {
  product: Product | null;
  initialMode?: PurchaseMode;
  currency: Currency;
  language?: Language;
  exchangeRate?: number;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    purchaseMode: PurchaseMode,
    selectedVariant?: string
  ) => void;
  onOpenQR: (product: Product) => void;
  onSelectRecipe?: (recipe: any) => void;
  fromRecipeId?: string | null;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialMode = 'retail',
  currency,
  language = 'VN',
  exchangeRate,
  isOpen,
  onClose,
  onAddToCart,
  onSelectRecipe,
  fromRecipeId,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.VN;
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>(initialMode);
  const [retailQty, setRetailQty] = useState(1);
  const [wholesaleQty, setWholesaleQty] = useState(1);
  const [rawInput, setRawInput] = useState<string | null>(null);
  const [minNotice, setMinNotice] = useState<string | null>(null);
  const noticeTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>('NGẪU NHIÊN');

  // Gallery & Lightbox Shopee Zoom State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Sync mode and quantity whenever a new product opens or initialMode changes
  useEffect(() => {
    if (product) {
      setSelectedVariant('NGẪU NHIÊN');
      const wConfig = getProductWholesaleConfig(product);
      setPurchaseMode(initialMode || 'retail');
      setRetailQty(1);
      // V222: Tự động nhảy số lượng lên mức tối thiểu đạt giá sỉ 1 (10 Hộp/Thùng cho Cascara & Xạ Đen, 10 Túi/Kg cho Matcha)
      const initialWholesale = getWholesaleInitialQuantity(product, wConfig);
      setWholesaleQty(initialWholesale);
      setRawInput(null);
      setMinNotice(null);
      setActiveImageIndex(0);
    }
  }, [product, initialMode]);

  const galleryImages = useMemo(() => {
    return product ? getProductImages(product) : [];
  }, [product]);

  const currentGalleryImage = galleryImages[activeImageIndex] || product?.image || '';

  // V241: Hide/lower Header when Modal is open by setting 'has-modal-open' class on body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('has-modal-open');
    } else {
      document.body.classList.remove('has-modal-open');
    }
    return () => {
      document.body.classList.remove('has-modal-open');
    };
  }, [isOpen]);

  // Handle Escape key to cleanly return (to Recipe modal if opened from recipe)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const translatedInfo = useMemo(() => {
    return product ? getTranslatedProductInfo(product, language) : null;
  }, [product, language]);

  if (!isOpen || !product) return null;

  const wholesaleConfig = getProductWholesaleConfig(product);

  const wholesaleMultiplier =
    product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen'))
      ? 30
      : (product.id && product.id.startsWith('vtn-cascara-')) || (product.name && product.name.includes('Cascara'))
      ? 24
      : product.wholesaleUnit === 'KG'
      ? 1
      : (product.unitsPerWholesale || 1);
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
    const isEn = language === 'EN';
    if (currency === 'USD') {
      const rate = exchangeRate && exchangeRate > 0 ? exchangeRate : 26125;
      const usd = (amount / rate).toFixed(2);
      return isEn ? `Save $${usd}` : `Tiết kiệm $${usd}`;
    }
    return isEn ? `Save ${amount.toLocaleString('en-US')}₫` : `Tiết kiệm ${amount.toLocaleString('en-US')}đ`;
  };

  // Calculate pricing based on current active tab & quantity typed (instant calculation as user types)
  const typedNumber = rawInput !== null ? parseInt(rawInput, 10) : null;
  const effectiveQty = typedNumber !== null
    ? (isNaN(typedNumber) ? 0 : typedNumber)
    : (purchaseMode === 'retail' ? retailQty : wholesaleQty);

  const activeQtyForPricing = Math.max(1, effectiveQty || 1);
  const pricing = calculateModePricing(product, purchaseMode, activeQtyForPricing);
  const effectiveTotalPrice = effectiveQty > 0 ? effectiveQty * pricing.unitPrice : 0;

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

  const handleTabChange = (newMode: PurchaseMode) => {
    setPurchaseMode(newMode);
    setRawInput(null);
    setMinNotice(null);
    if (newMode === 'wholesale') {
      // V223: Ngay khi khách bấm "MUA SỈ", hệ thống TỰ ĐỘNG truy xuất ngưỡng số lượng tối thiểu Sỉ 1 cho sản phẩm
      const targetMin = getWholesaleInitialQuantity(product, wholesaleConfig);
      setWholesaleQty(targetMin);
    }
  };

  // V223 (DYNAMIC AUTO-JUMP): Click chọn mức SỈ CẤP 1, SỈ CẤP 2 hoặc SỈ CẤP 3
  // Ô Số lượng tự động nhảy về đúng số lượng bắt đầu của khung sỉ đó theo database sản phẩm
  const handleSelectWholesaleTier = (tierKey: 'wholesale1' | 'wholesale2' | 'wholesale3') => {
    if (purchaseMode !== 'wholesale') {
      setPurchaseMode('wholesale');
    }
    const targetQty = wholesaleConfig.tiers[tierKey]?.minQty || 1;
    setRawInput(null);
    setMinNotice(null);
    setWholesaleQty(targetQty);
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
        showGentleNotice(
          language === 'EN'
            ? `Minimum wholesale quantity is ${wholesaleConfig.minWholesaleQty} ${translateUnit(wholesaleConfig.wholesaleUnit, language)}.`
            : `Số lượng sỉ tối thiểu là ${wholesaleConfig.minWholesaleQty} ${wholesaleConfig.wholesaleUnit}.`
        );
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
          ? (language === 'EN'
              ? `Minimum retail quantity is 1 ${translateUnit(product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen')) ? 'Hộp' : (product.retailUnit || product.unit), language)}. Adjusted to 1.`
              : `Số lượng mua lẻ tối thiểu là 1 ${product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen')) ? 'Hộp' : (product.retailUnit || product.unit)}. Đã tự động đưa về 1.`)
          : (language === 'EN'
              ? `Minimum wholesale quantity is ${minAllowed} ${translateUnit(wholesaleConfig.wholesaleUnit, language)}. Adjusted to minimum!`
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

  const handleBuyRetail = () => {
    setPurchaseMode('retail');
    onAddToCart(product, retailQty, 'retail', hasColorVariants(product) ? selectedVariant : undefined);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyWholesale = () => {
    setPurchaseMode('wholesale');
    const qty = Math.max(wholesaleConfig.minWholesaleQty, wholesaleQty);
    onAddToCart(product, qty, 'wholesale', hasColorVariants(product) ? selectedVariant : undefined);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleAdd = () => {
    if (isOutOfStock) return;
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

  // Filter recipes strictly relevant to this product
  const relatedRecipes = RECIPES.filter((r) => {
    // 1. Direct match on productIds list
    if (r.productIds && r.productIds.includes(product.id)) return true;
    // 2. Direct match on ingredients list
    if (r.ingredients && r.ingredients.some((ing) => ing.productId === product.id)) return true;
    // 3. Match within same partner if title or ingredient matches product name
    if (r.partnerId === product.partnerId) {
      const pId = product.id.toLowerCase();
      const pName = product.name.toLowerCase();
      if (pId.includes('ceremonial') && r.productIds?.some((id) => id.includes('ceremonial'))) return true;
      if (pId.includes('matcha') && !pId.includes('ceremonial') && (r.title.toLowerCase().includes('matcha') || r.productName.toLowerCase().includes('matcha'))) return true;
      if (pId.includes('cascara') && (r.title.toLowerCase().includes('cascara') || r.productName.toLowerCase().includes('cascara'))) return true;
      if (pId.includes('mia') && (r.title.toLowerCase().includes('mía') || r.productName.toLowerCase().includes('mía'))) return true;
      if (pId.includes('sam-day') && (r.title.toLowerCase().includes('sâm dây') || r.productName.toLowerCase().includes('sâm dây'))) return true;
      if (pId.includes('tam-that') && (r.title.toLowerCase().includes('tam thất') || r.productName.toLowerCase().includes('tam thất'))) return true;
      if ((pId.includes('vien-say') || pId.includes('coffee') || pId.includes('cafe')) && (r.title.toLowerCase().includes('cà phê') || r.productName.toLowerCase().includes('cà phê') || r.title.toLowerCase().includes('cold brew'))) return true;
      if ((pId.includes('cha-bong') || pId.includes('kho-bo')) && (r.title.toLowerCase().includes('bò') || r.title.toLowerCase().includes('chà bông'))) return true;
    }
    return false;
  }).slice(0, 4);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-stone-100 overflow-hidden my-auto max-h-[88dvh] sm:max-h-[92vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Accent Ribbon */}
        <div className="h-1 w-full bg-gradient-to-r from-[#144385] via-[#16a34a] to-[#d4af37]" />

        {/* Modal Header Bar - Minimalist Luxury with Back to Recipe capability */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-stone-100 bg-white">
          <div className="flex items-center gap-2.5">
            {fromRecipeId && (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-all border border-emerald-200 cursor-pointer shadow-2xs"
                title={language === 'EN' ? 'Return to recipe' : 'Quay lại công thức pha chế'}
              >
                <span>{language === 'EN' ? '← Back to Recipe' : '← Quay lại công thức'}</span>
              </button>
            )}
            <span className="text-[11px] font-heading text-stone-400 font-medium tracking-wide">
              {language === 'EN' ? 'SKU: ' : 'MÃ: '}{product.barcode}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-all duration-200 cursor-pointer"
            aria-label={fromRecipeId ? (language === 'EN' ? "Back to recipe" : "Quay lại công thức") : (language === 'EN' ? "Close modal" : "Đóng cửa sổ")}
            title={fromRecipeId ? (language === 'EN' ? "Back to recipe" : "Quay lại công thức") : (language === 'EN' ? "Close modal" : "Đóng cửa sổ")}
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Scrollable Body: 40/60 Split on Desktop/Tablet (md:grid-cols-5: 2 cols left = 40%, 3 cols right = 60%) */}
        {/* pb-[140px] ensures full clearance and smooth visibility of all content above sticky bar on mobile */}
        <div className="overflow-y-auto p-3.5 sm:p-6 pb-[140px] sm:pb-8 flex-1 grid grid-cols-1 md:grid-cols-5 gap-3.5 sm:gap-6">
          {/* Left Column (40%): Image Gallery & Trust Badges */}
          <div className="md:col-span-2 flex flex-col gap-2.5">
            {/* Ảnh chính to kèm hiệu ứng Phóng to kiểu Shopee */}
            {(() => {
              const isMatcha =
                product.id === 'vtn-matcha-laka-ceremonial' ||
                product.id === 'vtn-matcha-laka-premium' ||
                product.id === 'vtn-matcha-laka-culinary' ||
                product.subCategory === 'Bột Matcha' ||
                (product.id || '').startsWith('vtn-matcha-');

              return (
                <div
                  className="relative group rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] cursor-pointer flex items-center justify-center p-3 sm:p-4 aspect-square w-full"
                  style={{ aspectRatio: '1 / 1', backgroundColor: '#ffffff' }}
                  onClick={() => setIsLightboxOpen(true)}
                  title={language === 'EN' ? "Click to enlarge" : "Click để phóng to"}
                >
                  {isProductImageMissing(product) ? (
                    <BrandedImagePlaceholder language={language} size="lg" />
                  ) : (
                    <img
                      src={currentGalleryImage}
                      alt={`${cleanProductTitle(product.name)} - G-ROOSTER`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      style={{ objectFit: 'contain', backgroundColor: '#ffffff' }}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget;
                        markProductImageBroken(product.id, 'Lỗi tải ảnh');
                        if (!product.isCustomImage && !currentGalleryImage.startsWith('data:')) {
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
                        if (!product.isCustomImage && !currentGalleryImage.startsWith('data:')) {
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

                  {/* V180/V191b: Hai nút mũi tên điều hướng (Trái/Phải) icon mảnh, màu trắng trên nền tối mờ, đổi màu xanh khi hover */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
                        }}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-emerald-700 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-md hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 z-10 border border-white/25 hover:border-emerald-500"
                        title={language === 'EN' ? 'Previous image' : 'Ảnh trước'}
                        aria-label={language === 'EN' ? 'Previous image' : 'Ảnh trước'}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-emerald-700 text-white backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 shadow-md hover:shadow-lg cursor-pointer hover:scale-105 active:scale-95 z-10 border border-white/25 hover:border-emerald-500"
                        title={language === 'EN' ? 'Next image' : 'Ảnh tiếp theo'}
                        aria-label={language === 'EN' ? 'Next image' : 'Ảnh tiếp theo'}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                      </button>
                    </>
                  )}

                  {/* V178: Lớp phủ Hết Hàng (0) */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg border border-white/20">
                        {language === 'EN' ? 'OUT OF STOCK' : 'HẾT HÀNG'}
                      </span>
                    </div>
                  )}

                  {/* Góc dưới bên trái: Quy cách đóng gói */}
                  <div className="absolute bottom-2.5 left-2.5 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-white font-medium shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                    {language === 'EN' ? 'Packaging: ' : 'Quy cách: '}{translatedInfo?.packaging || product.packaging}
                  </div>

                  {/* Chỉ số ảnh trong bộ sưu tập (Ví dụ: 1/2) */}
                  {galleryImages.length > 1 && (
                    <div className="absolute bottom-2.5 right-2.5 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10.5px] text-amber-300 font-mono font-bold flex items-center gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                      <Images className="w-3 h-3 text-amber-300" />
                      <span>
                        {activeImageIndex + 1}/{galleryImages.length}
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Chỉ dẫn phóng to rút gọn: 11px xám nhạt, tinh tế dưới ảnh chính */}
            <div className="text-[11px] text-stone-400 font-normal text-center select-none py-0.5">
              {language === 'EN' ? 'Click to zoom' : 'Click để phóng to'}
            </div>

            {/* Bộ sưu tập các ảnh phụ nhỏ (Thumbnails) bên dưới ảnh chính - Ẩn hoàn toàn nếu chỉ có 1 ảnh */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {galleryImages.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all shrink-0 cursor-pointer ${
                        isActive
                          ? 'border-2 border-[#1a4d2e] ring-2 ring-emerald-500/40 scale-105 shadow-md'
                          : 'border border-stone-200/80 opacity-70 hover:opacity-100 hover:border-emerald-400 shadow-2xs'
                      }`}
                      title={language === 'EN' ? `View image ${idx + 1}` : `Xem ảnh ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - G-ROOSTER`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain p-1 bg-white"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-0.5 right-0.5 bg-[#1a4d2e]/90 text-[8px] sm:text-[9px] text-white px-1 rounded font-mono font-bold">
                        {idx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Khối Chứng nhận (Capsule / Nhãn thuốc): Dạng viên nang nằm ngang tinh tế dưới ảnh */}
            <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {(product.certifications && product.certifications.length > 0
                ? product.certifications
                : ['Chuẩn VSATTP', 'HACCP']
              ).map((cert, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-medium text-emerald-950 bg-emerald-50/80 border border-emerald-200/60 shrink-0 whitespace-nowrap shadow-[0_2px_8px_rgba(16,185,129,0.06)]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{translateText(cert, language)}</span>
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-medium text-amber-950 bg-amber-50/80 border border-amber-200/60 shrink-0 whitespace-nowrap shadow-[0_2px_8px_rgba(245,158,11,0.06)]">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{language === 'EN' ? 'Grade 1 Produce' : 'Nông Sản Loại 1'}</span>
              </span>
            </div>
          </div>

          {/* Right Column (60%): Giá và Mua hàng (Title, Immediate Price Hero, Details) */}
          <div className="md:col-span-3 flex flex-col">
            <div>
              {/* V166: HỆ THỐNG NHÃN CAO CẤP TĂM TẮP, SANG TRỌNG, BÓNG ĐỔ CỰC NHẸ */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                {/* 1. Nhãn: Sản phẩm đạt chuẩn kiểm định & Nguồn gốc minh bạch */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 shadow-[0_2px_8px_rgba(16,185,129,0.06)] text-[10.5px] sm:text-[11.5px] font-bold tracking-tight">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{language === 'EN' ? 'Certified Quality & Traceable Origin' : 'Sản phẩm đạt chuẩn kiểm định & Nguồn gốc minh bạch'}</span>
                </div>

                {/* 2. Nhãn: Thảo Dược Sâm / Ngành hàng chiến lược */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/70 shadow-[0_2px_8px_rgba(245,158,11,0.06)] text-[10.5px] sm:text-[11.5px] font-bold tracking-wide">
                  <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>{translateText(product.partnerName || 'Thảo Dược Sâm', language)}</span>
                </div>

                {/* 3. Nhãn: G-ROOSTER Nhà phân phối chính hãng */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a4d2e] text-[#f6d884] shadow-[0_2px_10px_rgba(26,77,46,0.12)] text-[10.5px] sm:text-[11.5px] font-extrabold tracking-wider uppercase font-heading">
                  <span>★</span>
                  <span>G-ROOSTER</span>
                </div>

                {/* 4. Nhãn: Xuất xứ */}
                <div className="inline-flex items-center gap-1 text-[10.5px] sm:text-[11px] font-medium text-stone-500 py-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{language === 'EN' ? 'Origin:' : 'Xuất xứ:'} <strong className="text-stone-700 font-semibold">{getConciseOrigin(translatedInfo?.origin || product.origin, product.partnerId, language)}</strong></span>
                </div>
              </div>

              {/* Tiêu đề sản phẩm chính (H2 trong modal để H1 trang chủ là duy nhất): 20px (Mobile) - 24px (Desktop), Plus Jakarta Sans, màu đen tuyền, đậm và sắc nét - Clean Title */}
              <h2 className="text-[20px] sm:text-[24px] font-bold text-black tracking-tight leading-snug font-heading">
                {cleanProductTitle(translatedInfo?.name || product.name)}
              </h2>
              {(translatedInfo?.variant || product.variant) && (
                <div className="text-xs sm:text-sm text-stone-500 mt-0.5 font-medium italic">
                  {translatedInfo?.variant || product.variant}
                </div>
              )}

              {/* IMMEDIATE PRICE HERO: Khách thấy ngay "món hàng này giá bao nhiêu" */}
              <div className="mt-2.5 p-3.5 rounded-2xl bg-gradient-to-br from-stone-50/70 to-white border border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {purchaseMode === 'retail' ? (language === 'EN' ? 'Standard Retail Price' : 'Giá Bán Lẻ Tiêu Chuẩn') : (language === 'EN' ? 'Current B2B Wholesale Price' : 'Giá Sỉ B2B Hiện Tại')}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-baseline gap-1.5 mt-0.5 font-heading flex-wrap">
                    <span>{formatPrice(pricing.unitPrice, currency, exchangeRate, product.hideUsd)}</span>
                    <span className="text-xs sm:text-sm font-semibold text-stone-500">
                      /{translateUnit(pricing.unit, language)}
                    </span>
                    {stock > 0 && stock < 5 && (
                      <span className="text-[11px] sm:text-xs font-normal text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300/80 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse shrink-0" />
                        {language === 'EN' ? `Only ${stock} items left` : `Chỉ còn ${stock} sản phẩm cuối cùng`}
                      </span>
                    )}
                    {purchaseMode === 'retail' && product.unitsPerWholesale && product.wholesaleUnit === 'THÙNG' && (
                      <span className="text-[11px] font-normal text-stone-400 ml-1">
                        (~{formatPrice(product.prices.retail * product.unitsPerWholesale, currency, exchangeRate, product.hideUsd)}/{translateUnit('Thùng', language)})
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0 pl-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 whitespace-nowrap tracking-tight shadow-2xs">
                    {pricing.activeTierLabel}
                  </span>
                  <div className="text-[10px] text-stone-400 mt-0.5 whitespace-nowrap tracking-tighter">
                    {purchaseMode === 'wholesale'
                      ? (language === 'EN' ? `Min ${wholesaleConfig.minWholesaleQty} ${translateUnit(wholesaleConfig.wholesaleUnit, language)}` : `Tối thiểu ${wholesaleConfig.minWholesaleQty} ${wholesaleConfig.wholesaleUnit}`)
                      : (language === 'EN' ? 'Min 1 item' : 'Mua từ 1 đơn vị')}
                  </div>
                </div>
              </div>

              {/* V180: Logic cảnh báo kho hàng tinh tế (Chỉ hiện trong Chi tiết modal), font chữ mảnh phía dưới giá tiền */}
              {isLowStock && (
                <div className="mt-2 text-xs text-stone-500 font-light flex items-center gap-1.5 select-none animate-in fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 animate-pulse" />
                  <span>{language === 'EN' ? `Low stock: ${stock} ${translateUnit(product.packaging || product.unit || 'hộp', language)} left` : `Sắp hết hàng: Còn ${stock} ${product.packaging || product.unit || 'hộp'} cuối cùng`}</span>
                </div>
              )}
              {isOutOfStock && (
                <div className="mt-1.5 px-3 py-1 rounded-xl bg-rose-50/80 border border-rose-200/60 text-[11.5px] sm:text-xs text-rose-800 font-normal flex items-center gap-1.5 animate-in fade-in">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                  <span>{language === 'EN' ? `Out of stock: 0 ${translateUnit(product.packaging || product.unit || 'hộp', language)} left` : `Tạm hết hàng: Còn 0 ${product.packaging || product.unit || 'hộp'}`}</span>
                </div>
              )}

              {/* V258: PHÂN LOẠI CON MẪU MÃ (XANH | ĐỎ | VÀNG | NGẪU NHIÊN) CHO MFOOD - MINI CHIPS 1 HÀNG NGANG SIÊU GỌN */}
              {hasColorVariants(product) && (
                <div className="mt-2.5 p-2 sm:p-2.5 rounded-xl bg-stone-50/90 border border-stone-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-stone-700 flex items-center gap-1 font-heading">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{language === 'EN' ? 'SELECT COLOR' : 'CHỌN MÀU'}</span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-white px-2 py-0.2 rounded-full border border-emerald-200/80 shadow-2xs">
                      Đã chọn: <strong className="font-mono uppercase text-emerald-950">[{selectedVariant}]</strong>
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'nowrap',
                      gap: '8px',
                      overflowX: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      whiteSpace: 'nowrap',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                    className="flex flex-nowrap items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar scrollbar-none py-1 px-0.5"
                  >
                    {MFOOD_COLOR_VARIANTS.map((v) => {
                      const isSelected = selectedVariant === v;
                      const style = getColorVariantStyle(v);
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`shrink-0 flex-shrink-0 py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-xl border text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap active:scale-95 ${
                            isSelected ? style.activeClass : style.inactiveClass
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 border border-black/10 ${style.dotClass}`} />
                          <span className="uppercase tracking-tight text-[10px] sm:text-[11.5px]">[{v}]</span>
                          {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3] shrink-0 text-emerald-900" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* THANH GẠT TAB SEGMENT [ MUA LẺ ] / [ MUA SỈ B2B ] */}
              <div className="mt-3">
                {/* Dòng chữ dẫn dắt màu vàng Gold */}
                <div className="text-xs sm:text-[13px] text-[#b8860b] font-semibold italic flex items-center gap-1.5 mb-1.5 select-none">
                  {t.wholesaleLead}
                </div>

                <div className="p-1 bg-stone-100/80 rounded-2xl flex items-center gap-1.5 max-w-md border border-stone-200/50 shadow-inner h-[46px] sm:h-[48px]">
                  <button
                    type="button"
                    id="modal-tab-retail"
                    onClick={() => handleTabChange('retail')}
                    className={`flex-1 h-full rounded-xl text-xs sm:text-[13px] font-heading font-bold transition-all duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                      purchaseMode === 'retail'
                        ? 'bg-[#1a4d2e] text-white shadow-md shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                        : 'bg-white hover:bg-stone-50 text-stone-600 shadow-[0_2px_6px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    <ShoppingBag
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        purchaseMode === 'retail' ? 'text-[#d4af37]' : 'text-stone-400'
                      }`}
                    />
                    <span className="whitespace-nowrap">{t.retailTab} ({translateUnit(product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen')) ? 'Hộp' : (product.retailUnit || product.unit), language)})</span>
                  </button>

                  <button
                    type="button"
                    id="modal-tab-wholesale"
                    onClick={() => handleTabChange('wholesale')}
                    className={`flex-1 h-full rounded-xl text-xs sm:text-[13px] font-heading font-bold transition-all duration-300 ease-out flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] ${
                      purchaseMode === 'wholesale'
                        ? 'bg-[#1a4d2e] text-white shadow-md shadow-[#1a4d2e]/30 ring-1 ring-[#1a4d2e]/40'
                        : 'bg-white hover:bg-stone-50 text-stone-600 shadow-[0_2px_6px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    <Sparkles
                      className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        purchaseMode === 'wholesale' ? 'text-[#d4af37]' : 'text-stone-400'
                      }`}
                    />
                    <span className="whitespace-nowrap">{t.wholesaleTab} ({translateUnit(wholesaleConfig.wholesaleUnit, language)})</span>
                  </button>
                </div>
              </div>

              {/* DYNAMIC PRICING VIEW */}
              {purchaseMode === 'retail' ? (
                /* KHI CHỌN TAB [ MUA LẺ ]: Nhẹ nhàng, tinh gọn */
                <div className="mt-2.5 py-2 px-1 text-xs text-stone-500">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-700">{language === 'EN' ? 'Standard Packaging:' : 'Đóng gói chuẩn thương hiệu:'}</span>
                    <span className="text-stone-900 font-medium">{translatedInfo?.packaging || product.packaging}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-500 leading-relaxed">
                    {language === 'EN' ? 'Ideal for trial tasting, family enjoyment or corporate gifts. Supermarket & F&B partners please select BUY WHOLESALE B2B tab for tier volume discounts.' : 'Thích hợp dùng thử, thưởng thức gia đình hoặc làm quà tặng. Khách quán & đại lý chọn tab MUA SỈ B2B để nhận chiết khấu sỉ theo số lượng.'}
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
                        title: language === 'EN' ? 'Tier 1' : 'Sỉ 1',
                        tier: wholesaleConfig.tiers.wholesale1,
                        saveBadge: formatSaveBadge(saveTier1),
                      },
                      {
                        key: 'wholesale2' as const,
                        title: language === 'EN' ? 'Tier 2' : 'Sỉ 2',
                        tier: wholesaleConfig.tiers.wholesale2,
                        saveBadge: formatSaveBadge(saveTier2),
                      },
                      {
                        key: 'wholesale3' as const,
                        title: language === 'EN' ? 'Tier 3' : 'Sỉ 3',
                        tier: wholesaleConfig.tiers.wholesale3,
                        saveBadge: formatSaveBadge(saveTier3),
                      },
                    ]).map(({ key, title, tier, saveBadge }) => {
                      const isActive = purchaseMode === 'wholesale' && pricing.activeTier === key;
                      const rawUnit = wholesaleConfig.wholesaleUnit === 'HỘP' ? 'Hộp' : wholesaleConfig.wholesaleUnit === 'SET' ? 'Set' : wholesaleConfig.wholesaleUnit;
                      const unitName = translateUnit(rawUnit, language);
                      return (
                        <button
                          type="button"
                          id={`modal-tier-btn-${key}`}
                          key={key}
                          onClick={() => handleSelectWholesaleTier(key)}
                          aria-pressed={isActive}
                          aria-label={language === 'EN' ? `Select ${title}: Sets quantity to ${tier.minQty} ${unitName}` : `Chọn mức ${title}: Tự động nhảy số lượng về ${tier.minQty} ${unitName}`}
                          title={language === 'EN' ? `Click to select ${title}: Quantity auto-sets to ${tier.minQty} ${unitName}` : `Click để chọn ${title}: Số lượng tự động nhảy về ${tier.minQty} ${unitName}`}
                          className={`relative p-2 sm:p-3 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 min-w-0 overflow-hidden cursor-pointer select-none text-center ${
                            isActive
                              ? 'bg-[#1a4d2e] text-white font-bold shadow-md shadow-[#1a4d2e]/30 ring-2 ring-[#d4af37] scale-[1.02]'
                              : 'bg-stone-100/80 hover:bg-emerald-50/70 hover:border-emerald-300 text-stone-700 border border-stone-200/80 active:scale-95'
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

                          {/* Nhãn số lượng: font Jakarta Sans, định dạng chuẩn 10+ Hộp, 10+ Set, 10+ KG, 3+ Thùng */}
                          <div 
                            className={`font-heading text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase truncate tracking-tight w-full text-center mt-0.5 ${isActive ? 'text-[#f6d884]' : 'text-stone-600'}`}
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          >
                            {tier.minQty}+ {unitName}
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
                        </button>
                      );
                    })}
                  </div>

                  {/* Gợi ý tương tác & Dòng thông báo thông minh ngay dưới bảng giá sỉ */}
                  <div className="mt-2 pt-1.5 border-t border-stone-100 flex flex-col items-center justify-center gap-1 text-center">
                    <p className="text-[10px] sm:text-[11px] text-amber-800 bg-amber-50/90 px-2.5 py-0.5 rounded-full border border-amber-200/70 font-medium inline-flex items-center gap-1">
                      <span>💡</span>
                      <span>
                        {language === 'EN' ? (
                          <>Tap on <strong>Tier 1, Tier 2, or Tier 3</strong> to auto-set standard quantity</>
                        ) : (
                          <>Chạm vào ô <strong>Sỉ 1, Sỉ 2 hoặc Sỉ 3</strong> để tự động đặt số lượng chuẩn</>
                        )}
                      </span>
                    </p>
                    {pricing.nextTier ? (
                      <p className="text-[11px] sm:text-xs text-stone-500 font-normal">
                        {language === 'EN' ? (
                          <>Add <strong className="font-semibold text-stone-800">{pricing.nextTier.neededQty} {translateUnit(wholesaleConfig.wholesaleUnit, language)}</strong> to reach <strong className="font-semibold text-stone-900">{pricing.nextTier.tier === 'wholesale2' ? 'Tier 2' : 'Tier 3'}</strong></>
                        ) : (
                          <>Thêm <strong className="font-semibold text-stone-800">{pricing.nextTier.neededQty} {wholesaleConfig.wholesaleUnit}</strong> để lên mức <strong className="font-semibold text-stone-900">{pricing.nextTier.tier === 'wholesale2' ? 'Sỉ 2' : 'Sỉ 3'}</strong></>
                        )}
                      </p>
                    ) : (
                      <p className="text-[11px] sm:text-xs text-emerald-700 font-medium">
                        {language === 'EN' ? '✨ Maximum Tier 3 wholesale discount achieved!' : '✨ Đã đạt mức chiết khấu Sỉ 3 tối đa!'}
                      </p>
                    )}
                  </div>

                  {/* Alibaba B2B Container Export Pricing (FCL & OEM) if applicable */}
                  {product.exportPricing && (
                    <div className="mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10.5px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-stone-500" />
                          {language === 'EN' ? 'FCL Export & OEM Services' : 'Xuất Khẩu FCL & OEM'}
                        </span>
                        {product.exportPricing.usdEstimate && !product.hideUsd && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                            FOB: {product.exportPricing.usdEstimate}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
                          <div className="text-[9.5px] text-stone-500 font-medium">
                            {language === 'EN' ? 'FCL Original' : 'FCL Nguyên Bản'}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 font-heading">
                            {formatPrice(product.exportPricing.fclNoOem, currency, exchangeRate, product.hideUsd)}
                          </div>
                          <div className="text-[9px] text-stone-400 mt-0.5">
                            {language === 'EN' ? 'Unit:' : 'Đơn vị:'} {translateUnit(product.exportPricing.unitLabel, language)}
                          </div>
                        </div>

                        <div className="bg-stone-50/80 p-2 rounded-xl border border-stone-200/60">
                          <div className="text-[9.5px] text-stone-500 font-medium">
                            {language === 'EN' ? 'FCL Private Label OEM' : 'FCL Gia Công OEM'}
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 font-heading">
                            {formatPrice(product.exportPricing.fclOem, currency, exchangeRate, product.hideUsd)}
                          </div>
                          <div className="text-[9px] text-stone-400 mt-0.5">
                            {language === 'EN' ? 'Custom packaging' : 'Bao bì nhãn riêng'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PHẦN CÔNG DỤNG & GIÁ TRỊ SỨC KHỎE: Chỉ hiển thị khi và chỉ khi sản phẩm có dữ liệu công dụng chính xác */}
              {(() => {
                const healthData = getProductHealthBenefits(product, language);
                if (!healthData || !healthData.points || healthData.points.length === 0) return null;
                return (
                  <div className="mt-4">
                    <HealthBenefitsSection
                      healthData={healthData}
                      partnerName={translateText(product.partnerName, language)}
                      language={language}
                    />
                  </div>
                );
              })()}

              {/* Mô Tả Sản Phẩm: Thoáng đãng, tinh tế */}
              <div className="mt-4 p-3.5 rounded-2xl bg-stone-50/70 border border-stone-200/70">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                  {language === 'EN' ? 'Product Description' : 'Mô Tả Sản Phẩm'}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {translatedInfo?.description || product.description}
                </p>
              </div>

              {/* Thông số kỹ thuật & Xuất xứ */}
              <div className="mt-3.5">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                  {language === 'EN' ? 'Technical Specifications & Origin' : 'Thông Số Kỹ Thuật & Xuất Xứ'}
                </h4>
                <div className="rounded-xl border border-stone-200 overflow-hidden text-xs bg-white">
                  <div className="flex border-b border-stone-200 bg-stone-50/80 px-3 py-2">
                    <span className="w-32 font-semibold text-stone-600">{language === 'EN' ? 'Raw Origin:' : 'Vùng nguyên liệu:'}</span>
                    <span className="flex-1 text-stone-900 font-medium">{translatedInfo?.origin || product.origin}</span>
                  </div>
                  <div className="flex border-b border-stone-200 bg-white px-3 py-2">
                    <span className="w-32 font-semibold text-stone-600">{language === 'EN' ? 'Shelf Life:' : 'Hạn sử dụng:'}</span>
                    <span className="flex-1 text-stone-900 font-medium">{translatedInfo?.shelfLife || product.shelfLife}</span>
                  </div>
                  {(translatedInfo?.ingredients || product.ingredients) && (
                    <div className="flex border-b border-stone-200 bg-stone-50/80 px-3 py-2">
                      <span className="w-32 font-semibold text-stone-600">{language === 'EN' ? 'Ingredients:' : 'Thành phần:'}</span>
                      <span className="flex-1 text-stone-900">{translatedInfo?.ingredients || product.ingredients}</span>
                    </div>
                  )}
                  {(translatedInfo?.packaging || product.packaging) && (
                    <div className="flex border-b border-stone-200 bg-white px-3 py-2">
                      <span className="w-32 font-semibold text-stone-600">{language === 'EN' ? 'Packaging:' : 'Quy cách:'}</span>
                      <span className="flex-1 text-stone-900">{translatedInfo?.packaging || product.packaging}</span>
                    </div>
                  )}
                  {(translatedInfo?.storage || product.storage) && (
                    <div className="flex border-b border-stone-200 bg-stone-50/80 px-3 py-2">
                      <span className="w-32 font-semibold text-stone-600">{language === 'EN' ? 'Storage:' : 'Bảo quản:'}</span>
                      <span className="flex-1 text-stone-900">{translatedInfo?.storage || product.storage}</span>
                    </div>
                  )}
                  {Object.entries(translatedInfo?.specs || product.specs || {}).map(([key, value], idx) => (
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
                  <div className="flex items-center justify-between gap-2.5 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <BookOpen className="w-4 h-4 text-emerald-800 shrink-0" />
                      <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider leading-snug truncate line-clamp-1">
                        {language === 'EN' ? `Recipes with ${translatedInfo?.name || product.name}` : `Công Thức Pha Chế Với ${product.name}`}
                      </h4>
                    </div>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 font-bold font-mono border border-emerald-200 shrink-0 whitespace-nowrap inline-flex items-center justify-center leading-none gap-0.5">
                      <span className="whitespace-nowrap">{relatedRecipes.length}</span>
                      <span className="whitespace-nowrap">{language === 'EN' ? 'recipes' : 'món'}</span>
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
                          title={language === 'EN' ? `Click to view recipe: ${translateText(r.title, 'EN')}` : `Click xem chi tiết công thức pha chế: ${r.title}`}
                        >
                          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-200 mb-1.5">
                            <img
                              src={r.image}
                              alt={language === 'EN' ? `Recipe ${translateText(r.title, 'EN')} - G-ROOSTER` : `Công thức pha chế ${r.title} - Nguyên liệu nông sản G-ROOSTER`}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute top-1 right-1 px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-bold bg-black/70 text-white backdrop-blur-xs flex items-center gap-0.5">
                              <Clock className="w-2 h-2 text-amber-400" />
                              {r.prepTime}
                            </div>
                            <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/15 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-full bg-emerald-950/90 text-amber-300 text-[9px] font-bold shadow-sm">
                                {language === 'EN' ? 'View recipe ➔' : 'Xem công thức ➔'}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-[11px] sm:text-xs font-bold text-stone-900 group-hover:text-emerald-950 line-clamp-1 leading-snug">
                              {translateText(r.title, language)}
                            </div>
                            <div className="text-[9.5px] sm:text-[10px] text-emerald-800 font-bold mt-1 flex items-center justify-between">
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-100/90 text-emerald-900 text-[9px] font-extrabold">
                                {language === 'EN' ? `Margin ${margin}%` : `Lãi ${margin}%`}
                              </span>
                              <span className="text-[9.5px] text-emerald-800 bg-emerald-100/80 group-hover:bg-emerald-200/90 px-1.5 py-0.5 rounded font-bold transition-colors">
                                {language === 'EN' ? 'Details ➔' : 'Chi tiết ➔'}
                              </span>
                            </div>
                          </div>

                          {/* Bảng tính Vốn - Bán - Lời 3 Cột Sắc Nét */}
                          <div className="mt-2 pt-1.5 border-t border-stone-200/80 bg-stone-100/70 rounded-lg p-1.5 grid grid-cols-3 gap-1 text-center font-body shadow-2xs">
                            <div className="flex flex-col">
                              <span className="text-[8px] sm:text-[8.5px] uppercase font-semibold text-stone-500">
                                {language === 'EN' ? 'Cost' : 'Vốn'}
                              </span>
                              <span className="text-[9.5px] sm:text-[10.5px] font-bold font-mono text-stone-700 truncate">
                                {formatPrice(r.costPerServing, currency, exchangeRate)}
                              </span>
                            </div>
                            <div className="flex flex-col border-x border-stone-200/90 px-0.5">
                              <span className="text-[8px] sm:text-[8.5px] uppercase font-semibold text-stone-500">
                                {language === 'EN' ? 'Menu' : 'Bán'}
                              </span>
                              <span className="text-[9.5px] sm:text-[10.5px] font-bold font-mono text-stone-900 truncate">
                                {formatPrice(r.recommendedMenuPrice, currency, exchangeRate)}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] sm:text-[8.5px] uppercase font-semibold text-emerald-800">
                                {language === 'EN' ? 'Profit' : 'Lời'}
                              </span>
                              <span className="text-[9.5px] sm:text-[10.5px] font-extrabold font-mono text-emerald-700 truncate">
                                +{formatPrice(profit, currency, exchangeRate)}
                              </span>
                            </div>
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

        {/* STICKY BOTTOM ACTION BAR: V191 Cố định dính chắc ở đáy Modal trên Mobile (không cần cuộn để mua) */}
        <div className="sticky bottom-0 shrink-0 bg-white/98 backdrop-blur-md px-3.5 sm:px-6 pt-2.5 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-3.5 border-t border-stone-200/90 shadow-[0_-6px_25px_rgba(0,0,0,0.1)] z-30">
          {/* Thanh Tạm tính: Cực mỏng, phân tách rõ ràng */}
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-100 text-xs">
            <div className="flex items-center gap-1 text-stone-500 font-medium truncate">
              <span className="font-semibold text-stone-700 shrink-0">
                {language === 'EN' ? 'Subtotal:' : 'Tạm tính:'}
              </span>
              <span className="text-stone-400 font-mono text-[11px] sm:text-xs truncate">
                ({effectiveQty} {translateUnit(pricing.unit, language)} × {formatPrice(pricing.unitPrice, currency, exchangeRate, product.hideUsd)})
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
                  title={isMinQty ? (language === 'EN' ? `Reached minimum quantity (${pricing.minAllowedQty})` : `Đã đạt số lượng tối thiểu (${pricing.minAllowedQty})`) : (language === 'EN' ? 'Decrease 1' : 'Giảm 1')}
                  aria-label={language === 'EN' ? 'Decrease quantity' : 'Giảm số lượng'}
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
                  aria-label={language === 'EN' ? 'Quantity' : 'Số lượng đặt mua'}
                />
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-8 h-9 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:scale-90 transition-colors"
                  aria-label={language === 'EN' ? 'Increase quantity' : 'Tăng số lượng'}
                  title={language === 'EN' ? 'Increase 1' : 'Tăng 1'}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Nút 'MUA SỈ / Thêm vào giỏ', 'YÊU CẦU BÁO GIÁ' (B2B Quote) và 'Tư vấn Zalo' NẰM TRÊN 1 HÀNG NGANG */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-1 md:justify-end flex-wrap sm:flex-nowrap">
              <button
                type="button"
                id="modal-btn-add-to-cart"
                disabled={isOutOfStock}
                onClick={handleAdd}
                className={`flex-1 md:flex-none md:min-w-[150px] py-2 sm:py-2.5 px-2.5 sm:px-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 ease-in-out h-9 font-heading shadow-xs cursor-pointer ${
                  isOutOfStock
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300 shadow-none'
                    : addedSuccess
                    ? 'bg-amber-500 text-stone-950 active:scale-[0.98]'
                    : 'bg-[#00332c] hover:bg-[#002621] hover:brightness-105 text-white shadow-[0_4px_14px_rgba(0,51,44,0.25)] active:scale-[0.98]'
                }`}
                title={isOutOfStock ? (language === 'EN' ? 'Out of stock' : 'Sản phẩm hiện đang hết hàng') : purchaseMode === 'wholesale' ? `${t.buyWholesale} ${effectiveQty} ${translateUnit(pricing.unit, language)}` : `${t.addToCart} ${effectiveQty} ${translateUnit(pricing.unit, language)}`}
              >
                {isOutOfStock ? (
                  <span className="whitespace-nowrap uppercase tracking-wider text-stone-500 font-bold">{t.outOfStock}</span>
                ) : addedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 stroke-[3]" />
                    <span className="whitespace-nowrap">{t.addedToCart}</span>
                  </>
                ) : (
                  <>
                    {purchaseMode === 'retail' ? (
                      <ShoppingBag className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    )}
                    <span className="whitespace-nowrap truncate text-[11px] sm:text-xs uppercase tracking-wider">
                      {purchaseMode === 'wholesale' ? t.buyWholesale : t.addToCart}
                    </span>
                  </>
                )}
              </button>

              {/* V239: Nút "YÊU CẦU BÁO GIÁ" (Get a Quote) màu outline trắng tinh tế dẫn thẳng sang Zalo B2B */}
              <a
                id="modal-btn-get-quote"
                href={`https://zalo.me/0961525450?text=${encodeURIComponent(
                  language === 'EN'
                    ? `Dear G-ROOSTER CO.,LTD, I am interested in "${product.name}" (${product.packaging || product.unit}) and would like to request Wholesale Quotation & B2B Supply Contract.`
                    : `Kính gửi G-ROOSTER CO.,LTD, tôi quan tâm sản phẩm "${product.name}" (${product.packaging || product.unit}) và muốn nhận Báo Giá Sỉ & Hợp Đồng Cung Ứng B2B.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-xl border border-stone-300 hover:border-[#00332c] bg-white hover:bg-emerald-50/50 text-[#00332c] font-bold text-[11px] sm:text-xs transition-all flex items-center justify-center gap-1 shrink-0 h-9 whitespace-nowrap font-heading shadow-2xs hover:shadow-xs cursor-pointer"
                title={language === 'EN' ? 'Request B2B Quote & Contract via Zalo Hotline' : 'Yêu cầu Báo Giá Sỉ & Hợp Đồng B2B trực tiếp qua Zalo Hotline'}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="truncate">{t.getQuote}</span>
              </a>

              {fromRecipeId && (
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 sm:py-2.5 px-3 rounded-xl sm:rounded-2xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs transition-colors flex items-center justify-center gap-1 shrink-0 h-9 whitespace-nowrap font-heading cursor-pointer shadow-2xs"
                  title={language === 'EN' ? 'Return to barista recipe' : 'Quay lại công thức pha chế'}
                >
                  <span>{language === 'EN' ? '← Back to Recipe' : '← Trở về công thức'}</span>
                </button>
              )}

              <a
                href="https://zalo.me/0961525450"
                target="_blank"
                rel="noreferrer"
                className="py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl border border-amber-300/80 bg-amber-50/70 hover:bg-amber-100 text-stone-900 font-medium text-xs transition-colors flex items-center justify-center gap-1 shrink-0 h-9 whitespace-nowrap font-heading"
                title={language === 'EN' ? 'Direct Wholesale Advisory via Zalo' : 'Tư vấn sỉ qua Zalo'}
              >
                <span className="truncate">Zalo B2B</span>
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

      {/* Shopee-style Fullscreen Image Lightbox & Zoom Mode */}
      <ImageLightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryImages}
        initialIndex={activeImageIndex}
        product={product}
        language={language}
      />
    </div>
  );
};
