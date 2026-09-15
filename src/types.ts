export type PartnerId = 'viet-thao-nhien' | 'vua-mia' | 'thao-duoc-dato' | 'non-la-aodai';

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
  wholesale1: number; // Giá Sỉ Cấp 1 (VD: từ 3 đơn vị)
  wholesale2: number; // Giá Sỉ Cấp 2 (VD: từ 10 đơn vị)
  wholesale3: number; // Giá Sỉ Cấp 3 (VD: từ 30 đơn vị)
}

export interface WholesaleTierPrices {
  wholesale1: number; // Giá quy đổi theo đơn vị lớn (THÙNG hoặc KG) ở Cấp 1
  wholesale2: number; // Giá quy đổi theo đơn vị lớn (THÙNG hoặc KG) ở Cấp 2
  wholesale3: number; // Giá quy đổi theo đơn vị lớn (THÙNG hoặc KG) ở Cấp 3
}

export interface Product {
  id: string;
  partnerId: PartnerId;
  partnerName: string;
  name: string;
  variant?: string;
  category: string;
  image: string;
  unit: string; // Đơn vị bán lẻ (gói 350ml, hộp 70g, viên, chai 700ml...)
  retailUnit: string; // Đơn vị nhỏ nhất: Túi 100g, Hộp lẻ, Chai, Gói 350ml, Viên cà phê
  wholesaleUnit: 'THÙNG' | 'KG'; // Quy tắc bán sỉ quy đổi sang đơn vị lớn
  wholesaleUnitLabel: string; // Mô tả quy đổi (VD: "Thùng 28 gói", "Thùng 24 hộp", "1 KG (10 túi)")
  unitsPerWholesale: number; // Số đơn vị lẻ trong 1 đơn vị sỉ lớn
  moq: number; // Minimum Order Quantity
  prices: ProductPriceTiers; // Giá theo đơn vị lẻ (quy đổi)
  wholesalePrices: WholesaleTierPrices; // Đơn giá theo đơn vị lớn (THÙNG hoặc KG)
  packaging: string; // e.g., "Thùng 28 gói x 350ml", "Hũ thủy tinh 50g", v.v.
  tierRules: {
    tier: PriceTierKey;
    minQty: number;
    label: string;
  }[];
  origin: string;
  specs: { [key: string]: string };
  highlights: string[];
  certifications: string[];
  description: string;
  shelfLife: string;
  barcode: string;
  subCategory?: string;
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

export interface Recipe {
  id: string;
  title: string;
  partnerId: PartnerId;
  productName: string;
  productIds?: string[]; // IDs of Chut Chiu products included in this recipe
  category: 'Trà & Giải khát' | 'Cà phê đặc sản' | 'Đồ uống bồi bổ' | 'Cocktail & Mocktail';
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
  ingredients: { name: string; amount: string; note?: string; productId?: string }[];
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
  legalRepresentative: string;
  position: string;
  factoryAddress: string;
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
