import { Product } from '../types';

/**
 * V255 & V256: THIẾT LẬP PHÂN LOẠI CON (VARIANTS) CHO MFOOD:
 * - Nhóm sản phẩm áp dụng:
 *   + STT 108: gr-m108 (Táo đỏ sấy khô)
 *   + Nhóm STT từ 89 đến 93:
 *     - gr-m089: Quả macca nứt vỏ hũ tròn
 *     - gr-m090: Hạt hạnh nhân rang bơ hũ tròn
 *     - gr-m091: Hạt dẻ cười rang muối hũ tròn
 *     - gr-m092: Hạt điều rang muối xếp hoa hũ tròn
 *     - gr-m093: Nho khô đen Chile (hũ tròn)
 * - 4 Lựa chọn phân loại: [XANH] | [ĐỎ] | [VÀNG] | [NGẪU NHIÊN]
 */

export const MFOOD_COLOR_VARIANTS = ['XANH', 'ĐỎ', 'VÀNG', 'NGẪU NHIÊN'] as const;
export type MfoodColorVariant = typeof MFOOD_COLOR_VARIANTS[number];

export const MFOOD_VARIANT_PRODUCT_IDS = new Set<string>([
  'gr-m089',
  'gr-m090',
  'gr-m091',
  'gr-m092',
  'gr-m093',
  'gr-m108',
]);

/**
 * Kiểm tra xem một sản phẩm có áp dụng phân loại màu sắc MFOOD hay không
 */
export function hasColorVariants(
  product: { id?: string; name?: string; availableVariants?: string[] } | null | undefined
): boolean {
  if (!product) return false;
  if (product.availableVariants && product.availableVariants.length > 0) return true;
  if (product.id && MFOOD_VARIANT_PRODUCT_IDS.has(product.id)) return true;
  return false;
}

/**
 * Lấy danh sách các phân loại khả dụng của sản phẩm
 */
export function getProductVariants(
  product: { id?: string; availableVariants?: string[] } | null | undefined
): readonly string[] {
  if (product?.availableVariants && product.availableVariants.length > 0) {
    return product.availableVariants;
  }
  if (product?.id && MFOOD_VARIANT_PRODUCT_IDS.has(product.id)) {
    return MFOOD_COLOR_VARIANTS;
  }
  return [];
}

/**
 * V256: Style hiển thị Mini Chips / Small Tags siêu gọn nhẹ (Font 12px, chấm tròn màu nhỏ)
 */
export function getColorVariantStyle(variant: string | undefined): {
  badgeClass: string;
  dotClass: string;
  activeClass: string;
  inactiveClass: string;
  label: string;
  shortLabel: string;
  description: string;
} {
  const norm = (variant || '').toUpperCase().trim();
  switch (norm) {
    case 'XANH':
      return {
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        dotClass: 'bg-emerald-500 shadow-2xs',
        activeClass: 'bg-emerald-800 text-white border-emerald-900 shadow-xs ring-1 ring-emerald-600/40',
        inactiveClass: 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/90',
        label: 'Mẫu Xanh',
        shortLabel: 'Xanh',
        description: 'Bao bì / Tem sắc xanh thiên nhiên',
      };
    case 'ĐỎ':
      return {
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
        dotClass: 'bg-rose-500 shadow-2xs',
        activeClass: 'bg-rose-800 text-white border-rose-900 shadow-xs ring-1 ring-rose-600/40',
        inactiveClass: 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/90',
        label: 'Mẫu Đỏ',
        shortLabel: 'Đỏ',
        description: 'Bao bì / Tem sắc đỏ lễ hội',
      };
    case 'VÀNG':
      return {
        badgeClass: 'bg-amber-50 text-amber-900 border-amber-300',
        dotClass: 'bg-amber-500 shadow-2xs',
        activeClass: 'bg-amber-500 text-stone-950 font-black border-amber-600 shadow-xs ring-1 ring-amber-400/40',
        inactiveClass: 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/90',
        label: 'Mẫu Vàng',
        shortLabel: 'Vàng',
        description: 'Bao bì / Tem sắc vàng kim',
      };
    case 'NGẪU NHIÊN':
    default:
      return {
        badgeClass: 'bg-stone-100 text-stone-800 border-stone-300',
        dotClass: 'bg-stone-500 shadow-2xs',
        activeClass: 'bg-stone-900 text-white border-black shadow-xs ring-1 ring-stone-600/40',
        inactiveClass: 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200/90',
        label: 'Ngẫu Nhiên',
        shortLabel: 'Ngẫu nhiên',
        description: 'Đóng gói ngẫu nhiên các mẫu màu',
      };
  }
}
