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
 * 62 SKU Danh Mục Phân Phối Độc Quyền - CHUTCHIU CO.,LTD (5 Nhóm Dòng Sản Phẩm Chiến Lược):
 * 1. [Matcha & Trà Laka Chuẩn Nhật] (08 SKUs: Ceremonial, Premium, Culinary, Cascara 4 vị, Nước cốt quả cà phê)
 * 2. [Giải Pháp Nước Mía Tuyết IQF] (01 SKU: Nước Mía Tuyết đóng thùng 28 gói x 350ml)
 * 3. [Dòng Thảo Dược Sâm Ngọc Linh] (18 SKUs: Sâm dây Ngọc Linh, Mật ong hoa rừng, Trà thảo mộc túi lọc)
 * 4. [Cà Phê Viên Sấy & Cà Phê Hạt] (26 SKUs: Cà phê viên sấy thăng hoa 01 viên, 08 viên, hộp quà, cà phê hạt)
 * 5. [Đặc Sản Thực Phẩm & Snack Cao Cấp] (09 SKUs: Chà bông heo các loại, chà bông gà, khô gà lá chanh, khô heo cháy tỏi)
 */
export const PRODUCTS: Product[] = [
  ...PRODUCTS_VIET_THAO_NHIEN.map((p) => ({
    ...p,
    partnerName: 'Matcha & Trà Laka Chuẩn Nhật',
    partnerId: 'matcha-tra-laka' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_VUA_MIA.map((p) => ({
    ...p,
    partnerName: 'Giải Pháp Nước Mía Tuyết IQF',
    partnerId: 'nuoc-mia-iqf' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_DATO.map((p) => ({
    ...p,
    partnerName: 'Dòng Thảo Dược Sâm Ngọc Linh',
    partnerId: 'thao-duoc-sam' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_NONLA.map((p) => ({
    ...p,
    partnerName: 'Cà Phê Viên Sấy & Cà Phê Hạt',
    partnerId: 'ca-phe-vien-say' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_PHU_NHA.map((p) => ({
    ...p,
    partnerName: 'Đặc Sản Thực Phẩm & Snack Cao Cấp',
    partnerId: 'dac-san-snack' as PartnerId,
    sector: 'dac-san' as const,
  })),
];
