import { Currency, Language } from '../types';

export type { Language };

/**
 * Tỷ giá dự phòng B2B (Fallback Rate) khi mất mạng hoặc API gặp sự cố:
 * 1 USD = 25.500 VNĐ (V241)
 */
export const COMPANY_EXCHANGE_RATE = 25500;

export const TRANSLATIONS = {
  VN: {
    // Header & Topbar
    companyName: 'G-ROOSTER CO., LTD',
    sloganTopBar: 'Đối tác chuỗi cung ứng Nông sản & Thực phẩm',
    hotline: 'Hotline:',
    currency: 'VND',
    cart: 'Giỏ hàng',
    searchPlaceholder: 'Tìm kiếm sản phẩm...',

    // Navigation Menu
    menuProducts: 'SẢN PHẨM',
    menuCategories: 'DANH MỤC',
    menuRecipes: 'GÓC CÔNG THỨC',
    menuPolicies: 'CHÍNH SÁCH',
    menuCapacity: 'NĂNG LỰC CUNG ỨNG',

    // Hero Section
    heroTitle: 'Hệ Thống Cung Ứng Nông Sản & Đặc Sản Xuất Khẩu',
    heroSlogan: 'Bảng giá sỉ & lẻ trực tiếp từ đại diện phân phối độc quyền G-ROOSTER CO.,LTD · Năng lực cung ứng ổn định cho F&B, chuỗi siêu thị và đối tác xuất khẩu.',
    badgeISO: 'ISO 22000',
    badgeHACCP: 'HACCP',
    badgeVietGAP: 'VietGAP',
    badgeHalal: 'Halal Certified',

    // Feature bar & Promo bar
    featureDelivery: 'Giao hỏa tốc 2H',
    featureReturn: 'Đổi trả 100%',
    featureRecipe: 'Tặng công thức',
    promoTextShort: '🎉 Giảm 50.000đ cho đơn hàng sỉ đầu tiên!',
    promoTextFull: '🎉 Ưu đãi đặc quyền: Giảm ngay 50.000đ cho đơn hàng sỉ đầu tiên của bạn!',

    // Product Catalog & Filter
    allProducts: 'Tất cả',
    agriProducts: 'Nông Sản',
    specialties: 'Đặc Sản',
    searchCount: 'sản phẩm',

    // Buttons & Actions
    buyRetail: 'MUA LẺ',
    buyWholesale: 'MUA SỈ',
    getQuote: 'YÊU CẦU BÁO GIÁ',
    addToCart: 'Thêm vào giỏ',
    addedToCart: 'Đã thêm!',
    outOfStock: 'Hết hàng',
    zaloInquiry: 'Zalo B2B',
    openCart: 'Xem giỏ hàng',
    returnToRecipe: '← Trở về công thức',

    // Product Detail
    retailTab: 'MUA LẺ',
    wholesaleTab: 'MUA SỈ B2B',
    wholesaleLead: '👉 Chọn Mua Sỉ để nhận giá chiết khấu đại lý',
    tierRetail: 'Giá Lẻ',
    tier1: 'Sỉ 1',
    tier2: 'Sỉ 2',
    tier3: 'Sỉ 3',
    saveUpTo: 'Tiết kiệm',

    // Footer
    footerIntro: 'Hệ thống phân phối Nông sản & Đặc sản cao cấp chuẩn xuất khẩu. Kết nối trực tiếp vùng nguyên liệu độc quyền tới đối tác F&B toàn quốc.',
    companyFullName: 'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ G-ROOSTER',
    taxIdLabel: 'MST:',
    taxIdAuthority: 'Cấp bởi Sở KH&ĐT TP.HCM',
    headquarterLabel: 'Trụ sở & Tổng kho:',
    headquarterAddress: '44 Trần Đình Xu, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh',
    certificationsLabel: 'Chứng nhận chuỗi cung ứng: ISO 22000 · HACCP · VietGAP · Halal · VSATTP',
    supportAndLegal: 'HỖ TRỢ & PHÁP LÝ',
    policyDelivery: 'Chính sách giao hàng hỏa tốc 2H & Toàn quốc',
    policyReturn: 'Chính sách đổi trả 100% trong 24h',
    policyPrivacy: 'Chính sách bảo mật thông tin',
    moitAnnounced: 'ĐÃ THÔNG BÁO',
    moitAgency: 'BỘ CÔNG THƯƠNG',
    terms: 'Điều khoản',
    privacy: 'Bảo mật',
    rightsReserved: 'All rights reserved.',
  },
  EN: {
    // Header & Topbar
    companyName: 'G-ROOSTER CO., LTD',
    sloganTopBar: 'Agri-Product & Food Supply Chain Partner',
    hotline: 'Hotline:',
    currency: 'USD',
    cart: 'Cart',
    searchPlaceholder: 'Search products...',

    // Navigation Menu
    menuProducts: 'PRODUCTS',
    menuCategories: 'CATEGORIES',
    menuRecipes: 'RECIPES',
    menuPolicies: 'POLICIES',
    menuCapacity: 'SUPPLY CAPACITY',

    // Hero Section
    heroTitle: 'Export Agri-Product & Specialty Supply System',
    heroSlogan: 'Wholesale & retail prices from G-ROOSTER CO.,LTD - Stable supply capacity for F&B, supermarkets, and export partners.',
    badgeISO: 'ISO 22000 Certified',
    badgeHACCP: 'HACCP Standard',
    badgeVietGAP: 'VietGAP Quality',
    badgeHalal: 'Halal Certified',

    // Feature bar & Promo bar
    featureDelivery: '2H Fast Dispatch',
    featureReturn: '100% Replacement',
    featureRecipe: 'Free Recipe Book',
    promoTextShort: '🎉 Get 50,000 VND off your first wholesale order!',
    promoTextFull: '🎉 Get 50,000 VND off your first wholesale order!',

    // Product Catalog & Filter
    allProducts: 'All Products',
    agriProducts: 'Agri-Products',
    specialties: 'Specialties',
    searchCount: 'products',

    // Buttons & Actions
    buyRetail: 'BUY RETAIL',
    buyWholesale: 'BUY WHOLESALE',
    getQuote: 'GET A QUOTE',
    addToCart: 'ADD TO CART',
    addedToCart: 'Added!',
    outOfStock: 'Out of Stock',
    zaloInquiry: 'Zalo B2B',
    openCart: 'View Cart',
    returnToRecipe: '← Back to Recipe',

    // Product Detail
    retailTab: 'BUY RETAIL',
    wholesaleTab: 'BUY WHOLESALE B2B',
    wholesaleLead: '👉 Choose Wholesale to unlock volume discount pricing',
    tierRetail: 'Retail Price',
    tier1: 'Tier 1 Wholesale',
    tier2: 'Tier 2 Wholesale',
    tier3: 'Tier 3 (Distributor)',
    saveUpTo: 'Save',

    // Footer
    footerIntro: 'High-grade Export Agricultural & Specialty Distribution System. Direct connection from exclusive raw material regions to F&B partners worldwide.',
    companyFullName: 'G-ROOSTER TRADING SERVICE CO., LTD',
    taxIdLabel: 'Tax ID:',
    taxIdAuthority: 'Issued by Dept. of Planning & Investment of HCMC',
    headquarterLabel: 'Headquarters & Export Hub:',
    headquarterAddress: '44 Tran Dinh Xu St., Cau Ong Lanh Ward, Dist. 1, Ho Chi Minh City, Vietnam',
    certificationsLabel: 'Supply Chain Certifications: ISO 22000 · HACCP · VietGAP · Halal · Food Safety',
    supportAndLegal: 'SUPPORT & LEGAL',
    policyDelivery: '2H Express & Global Delivery Policy',
    policyReturn: '100% 24H Return & Refund Guarantee',
    policyPrivacy: 'Privacy & Data Security Policy',
    moitAnnounced: 'REGISTERED E-COMMERCE',
    moitAgency: 'MINISTRY OF INDUSTRY & TRADE',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    rightsReserved: 'All rights reserved.',
  },
};

/**
 * Dịch thuật đơn vị định lượng sang tiếng Anh B2B chuẩn:
 * Hộp -> Box, Thùng -> Carton, Túi -> Bag, Kg -> Kg, v.v.
 */
export function translateUnit(unitName: string | undefined | null, lang: Language | string = 'VN'): string {
  if (!unitName) return '';
  if (lang !== 'EN') return unitName;

  const trimmed = unitName.trim();
  const lower = trimmed.toLowerCase();

  // Unit mapping
  if (lower === 'hộp' || lower.includes('hộp')) return 'Box';
  if (lower === 'thùng' || lower.includes('thùng')) return 'Carton';
  if (lower === 'túi' || lower.includes('túi')) return 'Bag';
  if (lower === 'kg' || lower === 'kilogram') return 'Kg';
  if (lower === 'set' || lower.includes('set')) return 'Set';
  if (lower === 'lon' || lower.includes('lon')) return 'Can';
  if (lower === 'chai' || lower.includes('chai')) return 'Bottle';
  if (lower === 'gói' || lower.includes('gói')) return 'Pack';
  if (lower === 'viên' || lower.includes('viên')) return 'Piece';
  if (lower === 'hũ' || lower.includes('hũ')) return 'Jar';

  return trimmed;
}

/**
 * Định dạng tiền tệ theo tiêu chuẩn V240:
 * - Tỷ giá tham chiếu: 1 USD = 26.125 VNĐ
 * - Khi ở chế độ EN (hoặc Currency === 'USD'): Tự động chia cho 26.125
 *   và hiển thị: $ [Số tiền] (VD: 300.000đ -> $11.48)
 * - Khi ở chế độ VN: Định dạng chuẩn 300,000 ₫
 */
export function formatCurrencyV240(
  amountVND: number,
  currency: Currency,
  lang: Language = 'VN'
): string {
  // If user is in EN mode or currency is USD, render in $ USD
  if (currency === 'USD' || lang === 'EN') {
    const inUSD = amountVND / COMPANY_EXCHANGE_RATE;
    return `$${inUSD.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  // Standard Vietnamese Dong
  return `${Math.round(amountVND).toLocaleString('en-US')} ₫`;
}
