export type PartnerId =
  | 'matcha-tra-laka'
  | 'nuoc-mia-iqf'
  | 'thao-duoc-sam'
  | 'ca-phe-vien-say'
  | 'dac-san-snack'
  | 'socola-qua-tang'
  // Compatibility aliases during migration
  | 'matcha-laka'
  | 'tra-cascara-thao-moc'
  | 'nuoc-mia-tuyet'
  | 'ca-phe-vien-hat'
  | 'cha-bong-kho'
  | 'viet-thao-nhien'
  | 'vua-mia'
  | 'thao-duoc-dato'
  | 'non-la-aodai'
  | 'phu-nha';

export type Sector = 'nong-san' | 'dac-san';

export type PriceTierKey = 'retail' | 'wholesale1' | 'wholesale2' | 'wholesale3';

export interface PriceTierInfo {
  key: PriceTierKey;
  label: string;
  sublabel: string;
  minQty: number;
  maxQty?: number;
  badgeColor: string;
}

export interface ProductPriceTiers {
  retail: number;     // Giá Lẻ (1 - 2 đơn vị)
  wholesale1: number; // Giá Sỉ Cấp 1 (VD: từ 3 đơn vị hoặc 10 hộp/set)
  wholesale2: number; // Giá Sỉ Cấp 2 (VD: từ 10 đơn vị hoặc 30 hộp/set)
  wholesale3: number; // Giá Sỉ Cấp 3 (VD: từ 30 đơn vị hoặc 100 hộp/set)
}

export interface WholesaleTierPrices {
  wholesale1: number; // Giá quy đổi theo đơn vị lớn (THÙNG, KG, HỘP hoặc SET) ở Cấp 1
  wholesale2: number; // Giá quy đổi theo đơn vị lớn (THÙNG, KG, HỘP hoặc SET) ở Cấp 2
  wholesale3: number; // Giá quy đổi theo đơn vị lớn (THÙNG, KG, HỘP hoặc SET) ở Cấp 3
}

export interface Product {
  id: string;
  partnerId: PartnerId;
  partnerName: string;
  name: string;
  variant?: string;
  category: string;
  image: string;
  images?: string[]; // Danh sách hình ảnh thực tế (Bộ sưu tập Gallery)
  isCustomImage?: boolean; // Cờ đánh dấu ảnh đã được Admin tùy chỉnh/upload mới
  unit: string; // Đơn vị bán lẻ (gói 350ml, hộp 70g, viên, chai 700ml...)
  retailUnit: string; // Đơn vị nhỏ nhất: Túi 100g, Hộp lẻ, Chai, Gói 350ml, Viên cà phê
  wholesaleUnit: 'THÙNG' | 'KG' | 'HỘP' | 'SET'; // Quy tắc bán sỉ quy đổi sang đơn vị lớn
  wholesaleUnitLabel: string; // Mô tả quy đổi (VD: "Thùng 28 gói", "Thùng 24 hộp", "10+ Hộp", "10+ Set")
  unitsPerWholesale: number; // Số đơn vị lẻ trong 1 đơn vị sỉ lớn
  moq: number; // Minimum Order Quantity
  stock?: number; // V178: Quản lý tồn kho & cháy hàng (Số lượng sản phẩm trong kho)
  prices: ProductPriceTiers; // Giá theo đơn vị lẻ (quy đổi)
  wholesalePrices: WholesaleTierPrices; // Đơn giá theo đơn vị lớn (THÙNG hoặc KG)
  packaging?: string; // e.g., "Thùng 28 gói x 350ml", "Hũ thủy tinh 50g", v.v.
  tierRules?: {
    tier: PriceTierKey;
    minQty: number;
    label: string;
  }[];
  origin: string;
  specs: { [key: string]: string };
  highlights?: string[];
  certifications?: string[];
  description: string;
  shelfLife: string;
  storage?: string;
  ingredients?: string;
  featured?: boolean;
  barcode?: string;
  subCategory?: string;
  sector?: Sector;
  hideUsd?: boolean;
  exportPricing?: {
    fclNoOem: number;
    fclOem?: number;
    unitLabel: string;
    usdEstimate?: string;
  };
  healthBenefits?: ProductHealthBenefit;
}

export interface HealthBenefitPoint {
  iconType: 'heart' | 'zap' | 'shield' | 'sparkles' | 'smile' | 'leaf' | 'sun' | 'moon' | 'droplet';
  title: string;
  description: string;
}

export interface TargetAudienceBenefit {
  audience: string;
  icon: string;
  benefit: string;
}

export interface ProductHealthBenefit {
  headline: string;
  quote: string;
  points: HealthBenefitPoint[];
  audiences: TargetAudienceBenefit[];
  nutritionNote?: string;
}

export type PurchaseMode = 'retail' | 'wholesale';

export interface CartItemState {
  product: Product;
  quantity: number;
  purchaseMode: PurchaseMode;
  selected?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  purchaseMode: PurchaseMode;
  appliedTier: PriceTierKey;
  unitPriceVND: number;
  totalPriceVND: number;
  selected?: boolean;
}

export interface RecipeKeyIngredient {
  name: string;
  partnerName: string;
  image: string;
  productId?: string;
  amount?: string;
}

export interface Recipe {
  id: string;
  title: string;
  partnerId: PartnerId;
  productName: string;
  productIds?: string[]; // IDs of G-ROOSTER products included in this recipe
  category:
    | 'Trà & Giải khát'
    | 'Cà phê đặc sản'
    | 'Đồ uống bồi bổ'
    | 'Cocktail & Mocktail'
    | 'Món Ăn Nhẹ & Topping';
  prepTime: string;
  yields: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Chuyên nghiệp';
  image: string;
  description: string;
  costPerServing: number; // VND (Giá Vốn)
  recommendedMenuPrice: number; // VND (Giá Bán quán đề xuất)
  profitPerServing?: number; // VND (Lợi Nhuận ròng trên mỗi ly)
  profitMarginPercent?: number; // % Tỷ suất lợi nhuận
  shopOwnerBenefits?: string; // Phân tích lợi thế kinh doanh & thu hút khách cho chủ quán
  monthlyProfit30?: number; // Dự toán lời/tháng (30 phần/ngày)
  monthlyProfit50?: number; // Dự toán lời/tháng (50 phần/ngày)
  ingredients: { name: string; amount: string; note?: string; productId?: string }[];
  keyIngredients?: RecipeKeyIngredient[];
  steps: string[];
  baristaNotes: string[];
}

export interface PartnerContractStory {
  id: PartnerId;
  name: string;
  englishName: string;
  slogan: string;
  avatar: string;
  coverImage: string;
  signingDate: string;
  contractCode: string;
  legalRepresentative?: string;
  position?: string;
  factoryAddress?: string;
  standardsBadge?: string;
  certifications: string[];
  coreValues: string[];
  summary: string;
  signingStory: string;
  commitment: string;
}

export type Currency = 'VND' | 'USD';

export interface ExchangeRateInfo {
  rate: number;
  provider: string;
  timestamp: string;
  isLive: boolean;
  lastUpdatedFormatted?: string;
}

export type OrderStatus = 'Chờ xử lý' | 'Đã xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy';

export interface OrderItem {
  productId: string;
  productName: string;
  partnerName: string;
  purchaseMode: PurchaseMode;
  quantity: number;
  unit: string;
  unitPriceVND: number;
  totalPriceVND: number;
  image?: string;
}

export interface Order {
  id: string; // #CC-2026-XXXX
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  totalVND: number;
  createdAt: string;
  status: OrderStatus;
  isVATRequested?: boolean;
  companyName?: string;
  taxId?: string;
}

export type Language = 'VN' | 'EN';
