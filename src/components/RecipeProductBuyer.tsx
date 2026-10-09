import React, { useState, useMemo } from 'react';
import { ShoppingBag, Plus, Minus, Check, ExternalLink } from 'lucide-react';
import { Product, Currency, PurchaseMode } from '../types';
import { getProductWholesaleConfig, formatPrice } from '../utils/pricing';
import { handleProductImageError } from '../utils/productImages';

interface RecipeProductBuyerProps {
  product: Product;
  currency: Currency;
  exchangeRate?: number;
  onAddToCart: (product: Product, quantity: number, purchaseMode?: PurchaseMode) => void;
  onOpenDetail?: (product: Product) => void;
}

export const RecipeProductBuyer: React.FC<RecipeProductBuyerProps> = ({
  product,
  currency,
  exchangeRate,
  onAddToCart,
  onOpenDetail,
}) => {
  const wholesaleConfig = getProductWholesaleConfig(product);
  const retailPrice = product.prices?.retail || 0;
  const retailUnit = product.retailUnit || product.unit || 'đơn vị';

  // Mức giá sỉ tốt nhất (tính theo đơn vị lẻ nếu có equivalentPiecePrice, hoặc giá sỉ cấp 3)
  const bestWholesalePrice = useMemo(() => {
    return (
      wholesaleConfig.tiers.wholesale3?.equivalentPiecePrice ||
      product.prices?.wholesale3 ||
      wholesaleConfig.tiers.wholesale3?.price ||
      wholesaleConfig.tiers.wholesale1?.equivalentPiecePrice ||
      product.prices?.wholesale1 ||
      0
    );
  }, [wholesaleConfig, product]);

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Tạm tính tiền = Số lượng × Giá bán lẻ
  const totalPrice = quantity * retailPrice;

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    if (rawVal === '') {
      setQuantity(1);
      return;
    }
    const val = parseInt(rawVal, 10);
    setQuantity(isNaN(val) || val < 1 ? 1 : val);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, 'retail');
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200/90 shadow-2xs p-2 sm:p-2.5 transition-all hover:border-amber-300 hover:shadow-xs flex flex-col justify-between h-full group">
      {/* 1. Phần Thông Tin: Ảnh nhỏ bên trái (bo góc 8px), Tên & Đối tác bên phải */}
      <div className="flex items-start gap-2">
        <div
          className="relative shrink-0 cursor-pointer group/img"
          onClick={() => onOpenDetail?.(product)}
          title="Bấm để xem chi tiết sản phẩm & bảng sỉ"
        >
          <img
            src={product.image}
            alt={`${product.name} - ${product.partnerName} | G-ROOSTER`}
            referrerPolicy="no-referrer"
            className="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-[8px] object-contain p-0.5 border border-stone-200/80 shadow-2xs group-hover/img:scale-105 transition-transform bg-white"
            style={{ objectFit: 'contain', backgroundColor: '#ffffff' }}
            loading="lazy"
            decoding="async"
            onError={(e) => handleProductImageError(e, product.id)}
          />
          {onOpenDetail && (
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 rounded-[8px] flex items-center justify-center transition-opacity">
              <ExternalLink className="w-3 h-3 text-white drop-shadow" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-[8.5px] sm:text-[9px] font-bold text-emerald-800 uppercase tracking-wide truncate">
              {product.partnerName || 'G-ROOSTER B2B'}
            </div>
            {/* Tên sản phẩm hiển thị đầy đủ tối đa 2 dòng chữ nhỏ 11px, không bị cắt cụt */}
            <h4
              onClick={() => onOpenDetail?.(product)}
              className="text-[11px] font-bold text-stone-900 leading-snug line-clamp-2 hover:text-emerald-900 transition-colors cursor-pointer mt-0.5 min-h-[28px] sm:min-h-[30px]"
              title={product.name}
            >
              {product.name}
            </h4>
          </div>

          <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
            <span className="text-[11.5px] sm:text-[12.5px] font-black text-stone-950 font-sans tracking-tight">
              {formatPrice(retailPrice, currency, exchangeRate, product.hideUsd)}
            </span>
            {bestWholesalePrice > 0 && (
              <span className="inline-flex items-center text-[8.5px] sm:text-[9px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/80 rounded px-1 py-0.2 whitespace-nowrap">
                Sỉ từ: {formatPrice(bestWholesalePrice, currency, exchangeRate, product.hideUsd)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Phần Thao Tác: Số Lượng + Nút 'Thêm' gọn gàng & Dòng Tạm tính phong cách Hình 4 */}
      <div className="mt-2 pt-2 border-t border-stone-100">
        {/* Hàng Số lượng & Nút Thêm */}
        <div className="flex items-center justify-between gap-1.5">
          {/* Bộ điều khiển số lượng mini */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-medium text-stone-500">SL:</span>
            <div className="inline-flex items-center rounded-md border border-stone-300 bg-stone-50 p-0.5">
              <button
                type="button"
                onClick={handleDecrease}
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center rounded hover:bg-white text-stone-700 active:scale-95 cursor-pointer"
                title="Giảm số lượng"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={quantity}
                onChange={handleInputChange}
                className="w-5 sm:w-6 text-center font-bold text-[11px] text-stone-900 bg-transparent focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleIncrease}
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center rounded hover:bg-white text-stone-700 active:scale-95 cursor-pointer"
                title="Tăng số lượng"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

          {/* Nút 'Thêm' gọn gàng với icon giỏ hàng */}
          <button
            type="button"
            onClick={handleAddToCartClick}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-2xs active:scale-95 cursor-pointer shrink-0 ${
              isAdded
                ? 'bg-amber-400 text-stone-950 font-black'
                : 'bg-[#062415] hover:bg-[#0a3a23] text-white border border-[#d4af37]/40'
            }`}
            title={`Thêm ${quantity} ${retailUnit} vào giỏ hàng`}
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 text-stone-950 stroke-[3]" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 text-amber-300 shrink-0" />
                <span>Thêm</span>
              </>
            )}
          </button>
        </div>

        {/* Dòng Tạm tính phong cách Hình 4: Ẩn giải thích rườm rà, 'Tạm tính' xám nhỏ bên trái, Tiền đen đậm to rõ bên phải */}
        <div className="mt-1.5 pt-1.5 border-t border-stone-100 flex items-center justify-between gap-1.5">
          <span className="text-[10px] text-stone-400 font-medium tracking-tight">Tạm tính:</span>
          <span className="font-black text-stone-950 text-xs sm:text-[13px] tracking-tight font-sans whitespace-nowrap">
            {formatPrice(totalPrice, currency, exchangeRate, product.hideUsd)}
          </span>
        </div>
      </div>
    </div>
  );
};
