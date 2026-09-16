import { Product } from '../types';
import { PRODUCTS_VIET_THAO_NHIEN } from './products-vietthaonhien';
import { PRODUCTS_VUA_MIA } from './products-vuamia';
import { PRODUCTS_DATO } from './products-dato';
import { PRODUCTS_NONLA } from './products-nonla';
import { PRODUCTS_PHU_NHA } from './products-phunha';

// Fallback Vietcombank USD Rate (26,125 VND/USD) if network fetch fails
export const VCB_USD_RATE = 26125;

// Re-export partner catalogs for modular usage
export { PRODUCTS_VIET_THAO_NHIEN } from './products-vietthaonhien';
export { PRODUCTS_VUA_MIA } from './products-vuamia';
export { PRODUCTS_DATO } from './products-dato';
export { PRODUCTS_NONLA } from './products-nonla';
export { PRODUCTS_PHU_NHA } from './products-phunha';

// Full 62 SKU Enterprise Catalog according to Official Chút Chíu B2B Distribution Matrix 2026:
// - Việt Thảo Nhiên: 10 SKUs (Matcha Laka 3 cấp độ, Trà Cascara & Xạ Đen 5 vị, Nước cốt quả cà phê 2 dung tích)
// - Vua Mía: 01 SKU (Nước Mía Tuyết® túi 350ml - Thùng 28 gói)
// - Thảo Dược DATO: 16 SKUs (4 Trà túi lọc, 8 Tinh chất mật ong 200g & 400g, 4 Sâm dây Ngọc Linh nguyên chất)
// - Nón Lá & Aodai Coffee: 26 SKUs (7 Hộp 01 viên, 7 Hộp 08 viên, 2 Hộp Mix, 2 Hộp Quà Lớn, 2 Túi 200g, 6 Hộp Quà Aodai Vietnam)
// - Phú Nhã: 09 SKUs (Chà bông heo nước mắm, không đường, thượng hạng, nhuyễn, cao cấp, chà bông gà, gà hành phi, khô gà lá chanh, khô heo cháy tỏi)
export const PRODUCTS: Product[] = [
  ...PRODUCTS_VIET_THAO_NHIEN.map((p) => ({ ...p, sector: 'nong-san' as const })),
  ...PRODUCTS_VUA_MIA.map((p) => ({ ...p, sector: 'nong-san' as const })),
  ...PRODUCTS_DATO.map((p) => ({ ...p, sector: 'nong-san' as const })),
  ...PRODUCTS_NONLA.map((p) => ({ ...p, sector: 'nong-san' as const })),
  ...PRODUCTS_PHU_NHA.map((p) => ({ ...p, sector: 'dac-san' as const })),
];

