import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Product, Currency, PurchaseMode, Language } from '../types';
import { translateText } from '../utils/productTranslation';
import { cleanProductTitle } from '../data/products';

export interface CartToastData {
  id: string;
  product: Product;
  quantity: number;
  unit: string;
  purchaseMode: PurchaseMode;
  totalPriceVND: number;
  tierLabel?: string;
  variant?: string; // V255/V256: Phân loại con
}

interface CartToastProps {
  toast: CartToastData | null;
  currency: Currency;
  language?: Language;
  exchangeRate?: number;
  onOpenCart: () => void;
  onClose: () => void;
}

/**
 * V256: TOAST NOTIFICATION SIÊU NHỎ GỌN (COMPACT & MINIMALIST)
 * - Tự động biến mất sau 2 giây (2000ms)
 * - Khung nhỏ tinh tế ở góc trên bên phải màn hình
 * - Nội dung ngắn gọn: "Đã thêm [Tên sản phẩm] vào giỏ hàng"
 * - Tuyệt đối không làm tối hay mờ màn hình
 */
export const CartToast: React.FC<CartToastProps> = ({
  toast,
  language = 'VN',
  onClose,
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // V256: 2 giây tự biến mất
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isEn = language === 'EN';
  const rawName = isEn ? translateText(toast.product.name, 'EN') : toast.product.name;
  const productName = cleanProductTitle(rawName);

  return (
    <aside
      id="cart-success-toast"
      role="status"
      aria-live="polite"
      className="fixed top-16 sm:top-20 right-3 sm:right-6 z-[9999] pointer-events-auto max-w-[340px] sm:max-w-[380px] w-auto animate-in fade-in slide-in-from-top-2 duration-200 select-none"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-2.5 sm:px-3 sm:py-2 flex items-center gap-2.5 transition-all">
        {/* Checkmark Icon */}
        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 stroke-[3]" />
        </div>

        {/* Nội dung ngắn gọn */}
        <div className="min-w-0 flex-1 text-xs text-stone-700 leading-snug">
          {isEn ? 'Added ' : 'Đã thêm '}
          <span className="font-bold text-stone-900 truncate">"{productName}"</span>
          {toast.variant && (
            <span className="ml-1 text-[10px] font-black uppercase px-1.5 py-0.2 rounded bg-stone-100 text-stone-800 border border-stone-300">
              [{toast.variant}]
            </span>
          )}
          {isEn ? ' to cart' : ' vào giỏ hàng'}
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors shrink-0 cursor-pointer"
          aria-label={isEn ? 'Close' : 'Đóng'}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
