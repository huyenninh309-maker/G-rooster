import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Plus, Minus, Sparkles } from 'lucide-react';
import { Product, PurchaseMode, Language } from '../types';
import { cleanProductTitle } from '../data/products';
import { isProductImageMissing, G_ROOSTER_FALLBACK_IMAGE } from '../utils/productImages';
import { BrandedImagePlaceholder } from './BrandedImagePlaceholder';
import {
  MFOOD_COLOR_VARIANTS,
  getColorVariantStyle,
} from '../utils/productVariants';
import { calculateModePricing, getProductWholesaleConfig, formatPrice } from '../utils/pricing';

interface QuickVariantModalProps {
  product: Product | null;
  initialMode: PurchaseMode;
  initialQty: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    product: Product,
    quantity: number,
    purchaseMode: PurchaseMode,
    selectedVariant: string
  ) => void;
  language?: Language;
}

/**
 * V257: TỐI ƯU QUICK-ADD MODAL (MINI MODAL SIÊU GỌN - COMPACT & MINIMALIST)
 * - Khung nhỏ tinh tế giữa màn hình
 * - Đổi chữ "MẪU MÃ / TEM MÀU" thành "CHỌN MÀU"
 * - 4 phân loại [XANH] [ĐỎ] [VÀNG] [NGẪU NHIÊN] ép trên 1 hàng ngang duy nhất (white-space: nowrap)
 * - 'display: flex; flex-wrap: nowrap; gap: 10px; overflow-x: auto;'
 * - Mini Chips ô tròn màu kèm chữ nhỏ, font 12px, siêu tiết kiệm diện tích
 */
export const QuickVariantModal: React.FC<QuickVariantModalProps> = ({
  product,
  initialMode,
  initialQty,
  isOpen,
  onClose,
  onConfirm,
  language = 'VN',
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>('NGẪU NHIÊN');
  const [qty, setQty] = useState<number>(initialQty || 1);
  const [purchaseMode, setPurchaseMode] = useState<PurchaseMode>(initialMode || 'retail');

  useEffect(() => {
    if (isOpen) {
      setSelectedVariant('NGẪU NHIÊN');
      setQty(Math.max(1, initialQty || 1));
      setPurchaseMode(initialMode || 'retail');
    }
  }, [isOpen, initialQty, initialMode, product]);

  if (!isOpen || !product) return null;

  const wConfig = getProductWholesaleConfig(product);
  const pricing = calculateModePricing(product, purchaseMode, qty);
  const unitLabel =
    purchaseMode === 'wholesale'
      ? wConfig.wholesaleUnit
      : product.retailUnit || product.unit || 'đơn vị';

  const handleConfirm = () => {
    onConfirm(product, qty, purchaseMode, selectedVariant);
    onClose();
  };

  const cleanName = cleanProductTitle(product.name);
  const isEn = language === 'EN';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        style={{ maxWidth: '480px' }}
        className="relative w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Siêu Gọn */}
        <div className="px-4 py-2.5 sm:py-3 border-b border-stone-100 bg-stone-50/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <h3 className="text-xs sm:text-[13px] font-black uppercase tracking-tight text-stone-900 font-heading">
              {isEn ? 'SELECT COLOR' : 'CHỌN MÀU'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Body Container */}
        <div className="p-3.5 sm:p-4 space-y-3">
          {/* Thông tin sản phẩm vắn tắt (1 dòng) */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50 border border-stone-200/80">
            <div className="w-10 h-10 aspect-square rounded-lg bg-white border border-stone-200 p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
              {isProductImageMissing(product) ? (
                <BrandedImagePlaceholder size="sm" />
              ) : (
                <img
                  src={product.image || G_ROOSTER_FALLBACK_IMAGE}
                  alt={cleanName}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-stone-900 text-xs sm:text-[13px] truncate">
                {cleanName}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                <span className="font-mono font-bold text-emerald-800">
                  {formatPrice(pricing?.unitPrice || 0, 'VND')}
                </span>
                <span className="text-stone-400 font-mono text-[10px]">/{unitLabel}</span>
                <span className="text-[9.5px] px-1 py-0.2 rounded font-bold bg-stone-200/80 text-stone-700 uppercase">
                  {purchaseMode === 'wholesale' ? 'Sỉ' : 'Lẻ'}
                </span>
              </div>
            </div>
          </div>

          {/* Chọn phân loại màu: CHỌN MÀU - 1 hàng ngang duy nhất (Mini Chips) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-black uppercase tracking-wider text-stone-700 flex items-center gap-1 font-heading">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{isEn ? 'SELECT COLOR' : 'CHỌN MÀU'}</span>
              </label>
              <span className="text-[11px] font-bold text-emerald-800">
                Đã chọn: <strong className="font-mono uppercase text-emerald-950">[{selectedVariant}]</strong>
              </span>
            </div>

            {/* V258: 4 Phân loại [XANH] [ĐỎ] [VÀNG] [NGẪU NHIÊN] Ép hiển thị trên 1 hàng ngang duy nhất, cuộn mượt không đè chữ */}
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
              {MFOOD_COLOR_VARIANTS.map((variant) => {
                const isSelected = selectedVariant === variant;
                const style = getColorVariantStyle(variant);

                return (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`shrink-0 flex-shrink-0 py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-xl border text-[10px] sm:text-xs font-bold transition-all duration-200 cursor-pointer inline-flex items-center gap-1 sm:gap-1.5 whitespace-nowrap active:scale-95 ${
                      isSelected ? style.activeClass : style.inactiveClass
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 border border-black/10 ${style.dotClass}`} />
                    <span className="uppercase tracking-tight text-[10px] sm:text-[11.5px]">
                      [{variant}]
                    </span>
                    {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3] shrink-0 text-emerald-900" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chọn số lượng */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
              {isEn ? 'Qty' : 'Số lượng'}:
            </span>
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white shadow-2xs">
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Giảm"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-10 text-center font-mono font-bold text-xs text-stone-900">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
                className="w-7 h-7 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Tăng"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-3 border-t border-stone-100 bg-stone-50/60 flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 py-2 px-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
          >
            {isEn ? 'Cancel' : 'Hủy'}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2 px-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
            <span className="truncate">
              {isEn ? 'Confirm' : 'Xác nhận'} [{selectedVariant}]
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
