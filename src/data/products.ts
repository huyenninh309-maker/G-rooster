import { Product, PartnerId } from '../types';
import { PRODUCTS_VIET_THAO_NHIEN } from './products-vietthaonhien';
import { PRODUCTS_VUA_MIA } from './products-vuamia';
import { PRODUCTS_DATO } from './products-dato';
import { PRODUCTS_NONLA } from './products-nonla';
import { PRODUCTS_PHU_NHA } from './products-phunha';
import { PRODUCTS_SOCOLA } from './products-socola';
import { PRODUCTS_PREMIUM_NUTS } from './products-premium-nuts';
import { PRODUCTS_SNACK_DINH_DUONG } from './products-snack-dinh-duong';

// Fallback USD Rate (25,500 VND/USD) if network fetch fails (V241)
export const VCB_USD_RATE = 25500;

// Re-export catalogs for modular usage
export { PRODUCTS_VIET_THAO_NHIEN } from './products-vietthaonhien';
export { PRODUCTS_VUA_MIA } from './products-vuamia';
export { PRODUCTS_DATO } from './products-dato';
export { PRODUCTS_NONLA } from './products-nonla';
export { PRODUCTS_PHU_NHA } from './products-phunha';
export { PRODUCTS_SOCOLA } from './products-socola';
export { PRODUCTS_PREMIUM_NUTS } from './products-premium-nuts';
export { PRODUCTS_SNACK_DINH_DUONG } from './products-snack-dinh-duong';

/**
 * V253 & V262: Clean product titles - Loại bỏ thương hiệu G-ROOSTER, Chút Chíu, ICHOOSE khỏi tên sản phẩm
 */
export const cleanProductTitle = (name: string): string => {
  if (!name) return '';
  return name
    .replace(/\b(G-ROOSTER|G-Rooster|Chút Chíu|Chut Chiu|MFOOD|Mfood|ICHOOSE|Ichoose|ichoose)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

/**
 * 264 Sản Phẩm (SP) Tuyển Chọn - G-ROOSTER CO.,LTD (8 Ngành Hàng Chiến Lược - V262):
 * 1. [Matcha & Trà] (10 SP: Ceremonial, Premium, Culinary, Cascara 4 vị, Nước cốt quả cà phê) - NÔNG SẢN
 * 2. [Nước Mía Tuyết] (01 SP: Nước Mía Tuyết đóng thùng 28 gói x 350ml) - NÔNG SẢN
 * 3. [Thảo Dược Sâm] (16 SP: Sâm dây Ngọc Linh, Mật ong hoa rừng, Trà thảo mộc túi lọc) - NÔNG SẢN
 * 4. [Cà Phê] (26 SP: Cà phê viên sấy thăng hoa 01 viên, 08 viên, hộp quà, cà phê hạt) - NÔNG SẢN
 * 5. [Chà bông] (09 SP: Chà bông heo các loại, chà bông gà, khô gà lá chanh, khô heo cháy tỏi) - ĐẶC SẢN
 * 6. [Socola & Quà Tặng] (75 SP: Socola đen nguyên chất, Trái cây phủ socola, Set quà nón lá, Bột Mộc An) - ĐẶC SẢN
 * 7. [Hạt & Quả Khô Dinh Dưỡng] (112 SP: Hạt dinh dưỡng Macca, Hạnh nhân, Điều, Dẻ cười, Nho khô, Granola) - ĐẶC SẢN
 * 8. [Snack & Thực Phẩm Dinh Dưỡng] (15 SP: Nấm sấy mềm vị, Hạt điều tẩm vị, Trái cây sấy muối ớt) - ĐẶC SẢN
 */
export const PRODUCTS: Product[] = [
  ...PRODUCTS_VIET_THAO_NHIEN.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerName: 'Matcha & Trà',
    partnerId: 'matcha-tra-laka' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_VUA_MIA.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerName: 'Nước Mía Tuyết',
    partnerId: 'nuoc-mia-iqf' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_DATO.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerName: 'Thảo Dược Sâm',
    partnerId: 'thao-duoc-sam' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_NONLA.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerName: 'Cà Phê',
    partnerId: 'ca-phe-vien-say' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_PHU_NHA.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerName: 'Chà bông',
    partnerId: 'dac-san-snack' as PartnerId,
    sector: 'dac-san' as const,
  })),
  ...PRODUCTS_SOCOLA.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerName: 'Socola & Quà Tặng',
    partnerId: 'socola-qua-tang' as PartnerId,
    sector: 'dac-san' as const,
  })),
  ...PRODUCTS_PREMIUM_NUTS.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerId: (p.partnerId || 'hat-qua-kho') as PartnerId,
    partnerName: 'Hạt & Quả Khô Dinh Dưỡng',
    category: 'Hạt & Quả Khô Dinh Dưỡng',
    sector: 'dac-san' as const,
  })),
  ...PRODUCTS_SNACK_DINH_DUONG.map((p) => ({
    ...p,
    name: cleanProductTitle(p.name),
    partnerId: 'snack-dinh-duong' as PartnerId,
    partnerName: 'Snack & Thực Phẩm Dinh Dưỡng',
    category: 'Đặc Sản',
    sector: 'dac-san' as const,
  })),
];
