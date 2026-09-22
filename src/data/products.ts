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
 * 62 SKU Danh Mục Phân Phối Độc Quyền - CHUTCHIU CO.,LTD (5 Nhóm Ngành Hàng Chiến Lược):
 * 1. Dòng Matcha Laka Nhật Bản (03 SKUs: Ceremonial, Premium, Culinary)
 * 2. Dòng Trà Cascara & Trà Thảo Mộc (23 SKUs: Cascara 4 vị, Nước cốt quả cà phê, Trà thảo mộc, Mật ong hoa rừng, Sâm dây Ngọc Linh)
 * 3. Giải Pháp Nước Mía Tuyết IQF (01 SKU: Nước Mía Tuyết đóng thùng 28 gói x 350ml)
 * 4. Dòng Cà Phê Viên & Cà Phê Hạt (26 SKUs: Cà phê thăng hoa 01 viên, 08 viên, hộp quà, cà phê hạt rang mộc)
 * 5. Đặc Sản Chà Bông & Khô Thượng Hạng (09 SKUs: Chà bông heo các loại, chà bông gà, khô gà lá chanh, khô heo cháy tỏi)
 */
export const PRODUCTS: Product[] = [
  ...PRODUCTS_VIET_THAO_NHIEN.map((p) => ({
    ...p,
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi CHUTCHIU CO.,LTD',
    partnerId: (p.id.startsWith('vtn-matcha-laka-') ? 'matcha-laka' : 'tra-cascara-thao-moc') as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_VUA_MIA.map((p) => ({
    ...p,
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi CHUTCHIU CO.,LTD',
    partnerId: 'nuoc-mia-tuyet' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_DATO.map((p) => ({
    ...p,
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi CHUTCHIU CO.,LTD',
    partnerId: 'tra-cascara-thao-moc' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_NONLA.map((p) => ({
    ...p,
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi CHUTCHIU CO.,LTD',
    partnerId: 'ca-phe-vien-hat' as PartnerId,
    sector: 'nong-san' as const,
  })),
  ...PRODUCTS_PHU_NHA.map((p) => ({
    ...p,
    partnerName: 'Được tuyển chọn và phân phối độc quyền bởi CHUTCHIU CO.,LTD',
    partnerId: 'cha-bong-kho' as PartnerId,
    sector: 'dac-san' as const,
  })),
];
