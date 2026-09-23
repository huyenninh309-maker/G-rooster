import { Product, PartnerId } from '../types';
import { PRODUCTS_VIET_THAO_NHIEN } from './products-vietthaonhien';
import { PRODUCTS_VUA_MIA } from './products-vuamia';
import { PRODUCTS_DATO } from './products-dato';
import { PRODUCTS_NONLA } from './products-nonla';
import { PRODUCTS_PHU_NHA } from './products-phunha';

// Fallback Vietcombank USD Rate (26,125 VND/USD) if network fetch fails
export const VCB_USD_RATE = 26125;

// Re-export catalogs for modular usage
export { PRODUCTS_VIET_THAO_NHIEN } from './products-vietthaonhien';
export { PRODUCTS_VUA_MIA } from './products-vuamia';
export { PRODUCTS_DATO } from './products-dato';
export { PRODUCTS_NONLA } from './products-nonla';
export { PRODUCTS_PHU_NHA } from './products-phunha';

/**
 * 62 Sản Phẩm (SP) Tuyển Chọn - CHUTCHIU CO.,LTD (5 Dòng Sản Phẩm Chiến Lược):
 * 1. [Matcha & Trà] (08 SP: Ceremonial, Premium, Culinary, Cascara 4 vị, Nước cốt quả cà phê)
 * 2. [Nước Mía Tuyết] (01 SP: Nước Mía Tuyết đóng thùng 28 gói x 350ml)
 * 3. [Thảo Dược Sâm] (18 SP: Sâm dây Ngọc Linh, Mật ong hoa rừng, Trà thảo mộc túi lọc)
 * 4. [Cà Phê] (26 SP: Cà phê viên sấy thăng hoa 01 viên, 08 viên, hộp quà, cà phê hạt)
 * 5. [Đặc Sản & Snack] (09 SP: Chà bông heo các loại, chà bông gà, khô gà lá chanh, khô heo cháy tỏi)
 */
export const PRODUCTS: Product[] = [
  ...PRODUCTS_VIET_THAO_NHIEN.map((p) => ({
    ...p,
    partnerName: 'Matcha & Trà',
    partnerId: 'matcha-tra-laka' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_VUA_MIA.map((p) => ({
    ...p,
    partnerName: 'Nước Mía Tuyết',
    partnerId: 'nuoc-mia-iqf' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_DATO.map((p) => ({
    ...p,
    partnerName: 'Thảo Dược Sâm',
    partnerId: 'thao-duoc-sam' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_NONLA.map((p) => ({
    ...p,
    partnerName: 'Cà Phê',
    partnerId: 'ca-phe-vien-say' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_PHU_NHA.map((p) => ({
    ...p,
    partnerName: 'Đặc Sản & Snack',
    partnerId: 'dac-san-snack' as PartnerId,
    sector: 'dac-san' as const,
  })),
];
