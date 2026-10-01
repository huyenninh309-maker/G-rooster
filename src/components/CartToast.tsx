import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product, Currency, PurchaseMode } from '../types';
import { formatPrice } from '../utils/pricing';
import { handleProductImageError } from '../utils/productImages';

export interface CartToastData {
  id: string;
  product: Product;
  quantity: number;
  unit: string;
  purchaseMode: PurchaseMode;
  totalPriceVND: number;
  tierLabel?: string;
}

interface CartToastProps {
  toast: CartToastData | null;
  currency: Currency;
  exchangeRate?: number;
  onOpenCart: () => void;
  onClose: () => void;
}

export const CartToast: React.FC<CartToastProps> = ({
  toast,
  currency,
  exchangeRate,
  onOpenCart,
  onClose,
}) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isWholesale = toast.purchaseMode === 'wholesale';

  return (
    <div
      id="cart-success-toast"
      role="alert"
      aria-live="assertive"
      className="fixed top-20 right-4 z-50 max-w-sm sm:max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 border-emerald-600/60 p-4 animate-in fade-in slide-in-from-top-4 duration-200 select-none backdrop-blur-md"
    >
      <div className="flex items-start gap-3">
        {/* Success Icon */}
        <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 shadow-xs">
          <CheckCircle2 className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 leading-snug truncate">
              <span>Đã thêm <strong className="font-extrabold text-emerald-950">"{toast.product.name}"</strong> vào giỏ hàng!</span>
            </h4>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Đóng thông báo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-2 flex items-center gap-3 bg-stone-50 p-2 rounded-xl border border-stone-200/80">
            <img
              src={toast.product.image}
              alt={`${toast.product.name} - ${toast.product.partnerName} (${toast.product.packaging || toast.product.unit}) | Giỏ hàng G-ROOSTER`}
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              onError={(e) => handleProductImageError(e, toast.product.id)}
              className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0 bg-white"
            />
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-stone-900 truncate">
                {toast.product.name}
              </h5>
              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                <span
                  className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    isWholesale
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}
                >
                  {isWholesale ? 'Mua Sỉ' : 'Mua Lẻ'}
                  {toast.tierLabel ? ` • ${toast.tierLabel}` : ''}
                </span>
                <span className="text-[11px] font-semibold text-stone-600">
                  SL: <strong>{toast.quantity}</strong> {toast.unit}
                </span>
              </div>
              <div className="text-xs font-black text-emerald-950 mt-0.5">
                {formatPrice(toast.totalPriceVND, currency, exchangeRate)}
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-[11px] text-stone-500 font-medium">
              Đã cập nhật vào giỏ hàng
            </span>
            <button
              id="toast-btn-open-cart"
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-bold shadow-sm hover:shadow transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              <span>Xem giỏ hàng</span>
              <ArrowRight className="w-3 h-3 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
