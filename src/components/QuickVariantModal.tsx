import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Plus, Minus, Sparkles } from 'lucide-react';
import { Product, PurchaseMode, Language } from '../types';
import { cleanProductTitle } from '../data/products';
import { isProductImageMissing, G_ROOSTER_FALLBACK_IMAGE } from '../utils/productImages';
import { BrandedImagePlaceholder } from './BrandedImagePlaceholder';
import {
  MFOOD_COLOR_VARIANTS,
  getColorVariantStyle,
  MfoodColorVariant,
} from '../utils/productVariants';
import { calculateModePricing, getProductWholesaleConfig } from '../utils/pricing';

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-5 py-4 border-b border-stone-100 bg-gradient-to-r from-stone-50 via-white to-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight text-stone-900 font-heading">
              {language === 'EN' ? 'Select Product Variant' : 'Chọn Mẫu Phân Loại'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Container */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Thông tin sản phẩm vắn tắt */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50/90 border border-stone-200/80">
            <div className="w-14 h-14 aspect-square rounded-lg bg-white border border-stone-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
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
              <p className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                {cleanName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono font-bold text-emerald-800">
                  {pricing?.unitPrice ? `${pricing.unitPrice.toLocaleString('vi-VN')}₫` : ''}
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  / {unitLabel}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-stone-200/80 text-stone-700 uppercase">
                  {purchaseMode === 'wholesale' ? 'Giá Sỉ' : 'Giá Lẻ'}
                </span>
              </div>
            </div>
          </div>

          {/* Hàng chọn 4 phân loại màu: [XANH] | [ĐỎ] | [VÀNG] | [NGẪU NHIÊN] */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'EN' ? 'Packaging Variant' : 'Mẫu Mã / Tem Màu'}</span>
                <span className="text-[10px] text-red-500 font-normal">*(Bắt buộc)</span>
              </label>
              <span className="text-[11px] font-bold text-emerald-800">
                Đã chọn: <strong className="font-mono uppercase">{selectedVariant}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              {MFOOD_COLOR_VARIANTS.map((variant) => {
                const isSelected = selectedVariant === variant;
                const style = getColorVariantStyle(variant);

                return (
                  <button
                    key={variant}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected ? style.activeClass : style.inactiveClass
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full shrink-0 shadow-2xs ${style.dotClass}`} />
                        <span className="font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                          [{variant}]
                        </span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-white text-emerald-800 border-white'
                            : 'border-stone-300 bg-white/60'
                        }`}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <p
                      className={`text-[10px] mt-2 line-clamp-1 ${
                        isSelected ? 'text-white/90' : 'text-stone-500'
                      }`}
                    >
                      {style.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chọn số lượng */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              {language === 'EN' ? 'Quantity' : 'Số lượng đặt'}:
            </span>
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white shadow-2xs">
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center font-mono font-bold text-xs text-stone-900">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
                className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 py-2.5 px-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
          >
            {language === 'EN' ? 'Cancel' : 'Hủy bỏ'}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {language === 'EN' ? 'Add to Cart' : 'Thêm Vào Giỏ'} [{selectedVariant}]
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
