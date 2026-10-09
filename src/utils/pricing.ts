import { Product, PriceTierKey, Currency, PurchaseMode } from '../types';
import { FALLBACK_USD_RATE } from '../services/exchangeRate';

let currentExchangeRate: number = FALLBACK_USD_RATE;

/**
 * Update the global active exchange rate dynamically
 */
export function setGlobalExchangeRate(rate: number) {
  if (rate > 0) {
    currentExchangeRate = rate;
  }
}

/**
 * Retrieve the current active exchange rate
 */
export function getGlobalExchangeRate(): number {
  return currentExchangeRate;
}

export interface WholesaleTierMilestone {
  tier: 'wholesale1' | 'wholesale2' | 'wholesale3';
  minQty: number; // e.g. 10 (KG) for Matcha, 1 (Thùng) for Thùng, 3 (KG) for Sâm 1kg
  label: string;  // e.g. "Sỉ 1 (Từ 10 KG)", "Sỉ 1 (Từ 1 Thùng)"
  price: number;  // Giá sỉ / đơn vị lớn (THÙNG hoặc KG)
  equivalentPiecePrice: number; // Giá quy đổi tương đương theo đơn vị lẻ nhỏ nhất
}

export interface ProductWholesaleConfig {
  wholesaleUnit: 'THÙNG' | 'KG' | 'HỘP' | 'SET';
  wholesaleUnitLabel: string;
  minWholesaleQty: number; // Tối thiểu khi vào tab Mua Sỉ
  tiers: {
    wholesale1: WholesaleTierMilestone;
    wholesale2: WholesaleTierMilestone;
    wholesale3: WholesaleTierMilestone;
  };
}

/**
 * Lấy cấu hình 3 cấp độ sỉ (Sỉ 1, Sỉ 2, Sỉ 3) theo đơn vị lớn (THÙNG / KG / HỘP / SET)
 */
export function getProductWholesaleConfig(product: Product): ProductWholesaleConfig {
  if (!product) {
    return {
      wholesaleUnit: 'THÙNG',
      wholesaleUnitLabel: '1 Thùng',
      minWholesaleQty: 1,
      tiers: {
        wholesale1: { tier: 'wholesale1', minQty: 1, label: 'Sỉ 1 (Từ 1 Thùng)', price: 0, equivalentPiecePrice: 0 },
        wholesale2: { tier: 'wholesale2', minQty: 3, label: 'Sỉ 2 (Từ 3 Thùng)', price: 0, equivalentPiecePrice: 0 },
        wholesale3: { tier: 'wholesale3', minQty: 10, label: 'Sỉ 3 (Từ 10 Thùng)', price: 0, equivalentPiecePrice: 0 },
      },
    };
  }

  const isSocola =
    product.partnerId === 'socola-qua-tang' ||
    product.wholesaleUnit === 'HỘP' ||
    product.wholesaleUnit === 'SET' ||
    (product.id || '').startsWith('socola-') ||
    (product.id || '').startsWith('set-qua-tang-') ||
    (product.id || '').startsWith('keo-chocolate-') ||
    (product.id || '').startsWith('bot-cacao-') ||
    (product.id || '').startsWith('bot-socola-') ||
    (product.id || '').startsWith('bot-dau-') ||
    (product.id || '').startsWith('bot-yen-mach-') ||
    (product.id || '').startsWith('tra-la-sen-');

  const isMatcha =
    (product.id || '').startsWith('vtn-matcha-laka-') ||
    (product.id || '').startsWith('vtn-matcha-') ||
    product.partnerId === 'matcha-laka' ||
    (product.name || '').includes('Matcha') ||
    (product.name || '').includes('matcha');

  const isCascara =
    (product.id || '').startsWith('vtn-cascara-') ||
    (product.name || '').includes('Cascara') ||
    (product.name || '').includes('cascara');

  const isXaDen =
    product.id === 'vtn-tra-xa-den' ||
    (product.name || '').includes('Xạ Đen') ||
    (product.name || '').includes('xa den');

  const isSam1kg = product.id === 'dato-sam-day-kho-1kg';
  const isVuaMia = (product.id || '').startsWith('vua-mia') || product.partnerId === 'vua-mia' || product.partnerId === 'nuoc-mia-tuyet';
  const isPhuNha = product.partnerId === 'phu-nha' || product.partnerId === 'cha-bong-kho' || (product.id || '').startsWith('phu-nha-');
  const isKG = product.wholesaleUnit === 'KG';

  let minQty1 = 1;
  let minQty2 = 3;
  let minQty3 = 10;
  let unitText: string = product.wholesaleUnit === 'KG' ? 'KG' : 'Thùng';

  // V252 & V253 (115 NEW PRODUCTS): Ngưỡng sỉ theo THÙNG riêng: Sỉ 1: 2 thùng, Sỉ 2: 6 thùng, Sỉ 3: 20 thùng
  const is115NewGroup =
    (product.id || '').startsWith('gr-m') ||
    product.partnerId === 'hat-qua-kho' ||
    product.partnerId === 'hat-dinh-duong' ||
    product.partnerId === 'trai-cay-say' ||
    product.partnerId === 'hu-qua-tang';

  if (is115NewGroup) {
    minQty1 = 2;
    minQty2 = 6;
    minQty3 = 20;
    unitText = 'Thùng';
  } else if (isSocola) {
    // Dòng Socola Nghệ Thuật & Quà Tặng Đặc Sản:
    // Sỉ Cấp 1 (Nhỏ): 10 - 30 hộp/set
    // Sỉ Cấp 2 (Vừa): 30 - 100 hộp/set
    // Sỉ Cấp 3 (Lớn / NPP): >= 100 hộp/set
    minQty1 = 10;
    minQty2 = 30;
    minQty3 = 100;
    unitText = product.wholesaleUnit === 'SET' ? 'Set' : 'Hộp';
  } else if (isPhuNha) {
    // Đặc Sản Snack & Chà Bông: Sỉ 1 từ 10kg (10 - 20kg), Sỉ 2 từ 21kg (21 - 50kg), Sỉ 3 từ 51kg (≥51kg)
    minQty1 = 10;
    minQty2 = 21;
    minQty3 = 51;
    unitText = 'KG';
  } else if (isMatcha) {
    // Matcha: Sỉ 1 từ 10kg, Sỉ 2 từ 30kg, Sỉ 3 từ 100kg
    minQty1 = 10;
    minQty2 = 30;
    minQty3 = 100;
  } else if (isCascara || isXaDen) {
    // V222 (BOSS REQUEST): Trà Cascara & Trà Xạ Đen: Tối thiểu đạt giá sỉ 1 là 10 (Hộp/Thùng)
    minQty1 = 10;
    minQty2 = 30;
    minQty3 = 100;
  } else if (isSam1kg) {
    // Sâm 1kg: Sỉ 1 từ 3kg, Sỉ 2 từ 10kg, Sỉ 3 từ 30kg
    minQty1 = 3;
    minQty2 = 10;
    minQty3 = 30;
  } else if (isVuaMia) {
    // Nước Mía Tuyết IQF: Mức Sỉ 1 (Từ 3 thùng), Mức Sỉ 2 (Từ 10 thùng), Mức Sỉ 3 (Từ 30 thùng)
    minQty1 = 3;
    minQty2 = 10;
    minQty3 = 30;
  } else if (isKG) {
    // Sâm 500g, 100g, Mứt sâm: Sỉ 1 từ 1kg, Sỉ 2 từ 3kg, Sỉ 3 từ 10kg
    minQty1 = 1;
    minQty2 = 3;
    minQty3 = 10;
  } else {
    // THÙNG (Dược Liệu Ngọc Linh, Cà Phê Viên & Hạt):
    // Sỉ 1 từ 1 Thùng, Sỉ 2 từ 3 Thùng, Sỉ 3 từ 10 Thùng
    minQty1 = 1;
    minQty2 = 3;
    minQty3 = 10;
  }

  // V223 (DYNAMIC AUTO-MAPPING): Tự động truy xuất ngưỡng số lượng tối thiểu từ database nếu sản phẩm có cấu hình riêng
  if (product.tierRules && product.tierRules.length > 0) {
    const dbWs1 = product.tierRules.find((r) => r.tier === 'wholesale1');
    const dbWs2 = product.tierRules.find((r) => r.tier === 'wholesale2');
    const dbWs3 = product.tierRules.find((r) => r.tier === 'wholesale3');
    if (dbWs1 && dbWs1.minQty > 0) {
      if (product.wholesaleUnit === 'HỘP' || product.wholesaleUnit === 'SET' || isSocola) {
        minQty1 = dbWs1.minQty;
        if (dbWs2 && dbWs2.minQty > 0) minQty2 = dbWs2.minQty;
        if (dbWs3 && dbWs3.minQty > 0) minQty3 = dbWs3.minQty;
      }
    }
  }

  // Kiểm tra nếu nhãn quy định số lượng riêng (VD: "5+ Hộp", "5+ Set")
  if (product.wholesaleUnitLabel) {
    const labelMatch = product.wholesaleUnitLabel.match(/^(\d+)\+/);
    if (labelMatch) {
      const parsed = parseInt(labelMatch[1], 10);
      if (!isNaN(parsed) && parsed > 0) {
        minQty1 = parsed;
      }
    }
  }

  // V219: Logic chuẩn hóa tính giá sỉ theo THÙNG:
  // Với Sản phẩm số 8 (Trà Xạ Đen), khi khách chọn tab "MUA SỈ", giá hiển thị theo THÙNG phải tính theo công thức:
  // [Giá sỉ 1 hộp trong Admin] x 30 (VD: 105,400 x 30 = 3,162,000đ, không bao giờ hiện 2,529,600đ).
  // Tương tự Sỉ 2, Sỉ 3 (x 30). Đối với Trà Cascara nhân với 24.
  let upw = Math.max(1, product.unitsPerWholesale || 1);
  if (product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen'))) {
    upw = 30;
  } else if ((product.id && product.id.startsWith('vtn-cascara-')) || (product.name && product.name.includes('Cascara'))) {
    upw = 24;
  }

  const multiplier = isSocola ? 1 : isKG ? 1 : upw;
  const retailFallback = product.prices?.retail || 0;

  const finalWholesaleUnit: 'THÙNG' | 'KG' | 'HỘP' | 'SET' =
    product.wholesaleUnit || (isSocola ? 'HỘP' : isKG ? 'KG' : 'THÙNG');

  let wp1: number;
  let wp2: number;
  let wp3: number;

  if (product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen'))) {
    const pWs1 = product.prices?.wholesale1 ?? 105400;
    const pWs2 = product.prices?.wholesale2 ?? 98433;
    const pWs3 = product.prices?.wholesale3 ?? 91800;
    wp1 = Math.round(pWs1 * 30);
    wp2 = Math.round(pWs2 * 30);
    wp3 = Math.round(pWs3 * 30);
  } else if ((product.id && product.id.startsWith('vtn-cascara-')) || (product.name && product.name.includes('Cascara'))) {
    const pWs1 = product.prices?.wholesale1 ?? 63541;
    const pWs2 = product.prices?.wholesale2 ?? 59375;
    const pWs3 = product.prices?.wholesale3 ?? 55333;
    wp1 = Math.round(pWs1 * 24);
    wp2 = Math.round(pWs2 * 24);
    wp3 = Math.round(pWs3 * 24);
  } else if (finalWholesaleUnit === 'THÙNG' && product.prices) {
    wp1 = product.prices.wholesale1 != null ? Math.round(product.prices.wholesale1 * upw) : (product.wholesalePrices?.wholesale1 ?? retailFallback);
    wp2 = product.prices.wholesale2 != null ? Math.round(product.prices.wholesale2 * upw) : (product.wholesalePrices?.wholesale2 ?? wp1);
    wp3 = product.prices.wholesale3 != null ? Math.round(product.prices.wholesale3 * upw) : (product.wholesalePrices?.wholesale3 ?? wp2);
  } else {
    wp1 =
      product.wholesalePrices?.wholesale1 ??
      (product.prices?.wholesale1 != null ? Math.round(product.prices.wholesale1 * multiplier) : retailFallback);
    wp2 =
      product.wholesalePrices?.wholesale2 ??
      (product.prices?.wholesale2 != null ? Math.round(product.prices.wholesale2 * multiplier) : wp1);
    wp3 =
      product.wholesalePrices?.wholesale3 ??
      (product.prices?.wholesale3 != null ? Math.round(product.prices.wholesale3 * multiplier) : wp2);
  }

  return {
    wholesaleUnit: finalWholesaleUnit,
    wholesaleUnitLabel: product.wholesaleUnitLabel || (isSocola ? `1 ${unitText}` : isKG ? '1 KG' : '1 Thùng'),
    minWholesaleQty: minQty1,
    tiers: {
      wholesale1: {
        tier: 'wholesale1',
        minQty: minQty1,
        label: `Sỉ 1 (Từ ${minQty1} ${unitText})`,
        price: wp1,
        equivalentPiecePrice: Math.round(wp1 / upw),
      },
      wholesale2: {
        tier: 'wholesale2',
        minQty: minQty2,
        label: `Sỉ 2 (Từ ${minQty2} ${unitText})`,
        price: wp2,
        equivalentPiecePrice: Math.round(wp2 / upw),
      },
      wholesale3: {
        tier: 'wholesale3',
        minQty: minQty3,
        label: `Sỉ 3 (Từ ${minQty3} ${unitText})`,
        price: wp3,
        equivalentPiecePrice: Math.round(wp3 / upw),
      },
    },
  };
}

export interface ModeCalculation {
  mode: PurchaseMode;
  quantity: number;
  minAllowedQty: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  activeTier: PriceTierKey;
  activeTierLabel: string;
  nextTier?: {
    tier: 'wholesale2' | 'wholesale3';
    label: string;
    minQty: number;
    neededQty: number;
    unitPrice: number;
    savePerUnit: number;
  };
}

/**
 * Tính toán giá tiền và cấp độ tương ứng theo Tab Selector (Mua Lẻ vs Mua Sỉ)
 */
export function calculateModePricing(
  product: Product,
  mode: PurchaseMode,
  quantityInput: number
): ModeCalculation {
  if (!product) {
    return {
      mode: 'retail',
      quantity: 1,
      minAllowedQty: 1,
      unit: 'đv',
      unitPrice: 0,
      totalPrice: 0,
      activeTier: 'retail',
      activeTierLabel: 'Giá Bán Lẻ',
    };
  }

  if (mode === 'retail') {
    const qty = Math.max(1, quantityInput || 1);
    const unitPrice = product.prices?.retail ?? 0;
    const retailUnit = (product.id === 'vtn-tra-xa-den' || (product.name && product.name.includes('Xạ Đen')))
      ? 'Hộp'
      : (product.retailUnit || product.unit || 'đv');
    return {
      mode: 'retail',
      quantity: qty,
      minAllowedQty: 1,
      unit: retailUnit,
      unitPrice,
      totalPrice: qty * unitPrice,
      activeTier: 'retail',
      activeTierLabel: 'Giá Bán Lẻ',
    };
  }

  // Chế độ Mua Sỉ (KG hoặc THÙNG)
  const wholesaleConfig = getProductWholesaleConfig(product);
  const minQty = wholesaleConfig.minWholesaleQty;
  // Dùng trực tiếp số lượng nhập (tối thiểu 1) để bảng giá và tổng tiền cập nhật tức thì khi khách gõ
  const qty = Math.max(1, quantityInput || minQty);

  let activeTier: 'wholesale1' | 'wholesale2' | 'wholesale3' = 'wholesale1';
  let unitPrice = wholesaleConfig.tiers.wholesale1.price;
  let activeTierLabel = wholesaleConfig.tiers.wholesale1.label;
  let nextTier = undefined;

  if (qty >= wholesaleConfig.tiers.wholesale3.minQty) {
    activeTier = 'wholesale3';
    unitPrice = wholesaleConfig.tiers.wholesale3.price;
    activeTierLabel = wholesaleConfig.tiers.wholesale3.label;
  } else if (qty >= wholesaleConfig.tiers.wholesale2.minQty) {
    activeTier = 'wholesale2';
    unitPrice = wholesaleConfig.tiers.wholesale2.price;
    activeTierLabel = wholesaleConfig.tiers.wholesale2.label;
    nextTier = {
      tier: 'wholesale3' as const,
      label: wholesaleConfig.tiers.wholesale3.label,
      minQty: wholesaleConfig.tiers.wholesale3.minQty,
      neededQty: wholesaleConfig.tiers.wholesale3.minQty - qty,
      unitPrice: wholesaleConfig.tiers.wholesale3.price,
      savePerUnit: wholesaleConfig.tiers.wholesale2.price - wholesaleConfig.tiers.wholesale3.price,
    };
  } else {
    activeTier = 'wholesale1';
    unitPrice = wholesaleConfig.tiers.wholesale1.price;
    activeTierLabel = wholesaleConfig.tiers.wholesale1.label;
    nextTier = {
      tier: 'wholesale2' as const,
      label: wholesaleConfig.tiers.wholesale2.label,
      minQty: wholesaleConfig.tiers.wholesale2.minQty,
      neededQty: wholesaleConfig.tiers.wholesale2.minQty - qty,
      unitPrice: wholesaleConfig.tiers.wholesale2.price,
      savePerUnit: wholesaleConfig.tiers.wholesale1.price - wholesaleConfig.tiers.wholesale2.price,
    };
  }

  return {
    mode: 'wholesale',
    quantity: qty,
    minAllowedQty: minQty,
    unit: wholesaleConfig.wholesaleUnit,
    unitPrice,
    totalPrice: qty * unitPrice,
    activeTier,
    activeTierLabel,
    nextTier,
  };
}

export interface TierCalculation {
  currentTier: PriceTierKey;
  currentTierLabel: string;
  unitPrice: number;
  totalPrice: number;
  nextTier?: {
    tier: PriceTierKey;
    label: string;
    minQty: number;
    neededQty: number;
    unitPrice: number;
    savePerUnit: number;
  };
}

export function getTierCalculation(product: Product, quantity: number): TierCalculation {
  const qty = Math.max(1, quantity);

  let activeTier: PriceTierKey = 'retail';
  let unitPrice = product.prices.retail;

  const wholesaleConfig = getProductWholesaleConfig(product);
  const rules = (product.tierRules && product.tierRules.length > 0)
    ? product.tierRules
    : [
        { tier: 'retail' as PriceTierKey, minQty: 1, label: 'Giá Lẻ' },
        { tier: 'wholesale1' as PriceTierKey, minQty: wholesaleConfig.tiers.wholesale1.minQty, label: wholesaleConfig.tiers.wholesale1.label },
        { tier: 'wholesale2' as PriceTierKey, minQty: wholesaleConfig.tiers.wholesale2.minQty, label: wholesaleConfig.tiers.wholesale2.label },
        { tier: 'wholesale3' as PriceTierKey, minQty: wholesaleConfig.tiers.wholesale3.minQty, label: wholesaleConfig.tiers.wholesale3.label },
      ];

  for (let i = rules.length - 1; i >= 0; i--) {
    const rule = rules[i];
    if (qty >= rule.minQty) {
      activeTier = rule.tier;
      unitPrice = product.prices[rule.tier];
      break;
    }
  }

  let nextTierInfo = undefined;
  const currentRuleIdx = rules.findIndex((r) => r.tier === activeTier);
  if (currentRuleIdx !== -1 && currentRuleIdx < rules.length - 1) {
    const nextRule = rules[currentRuleIdx + 1];
    const nextTierPrice = product.prices[nextRule.tier];
    nextTierInfo = {
      tier: nextRule.tier,
      label: nextRule.label,
      minQty: nextRule.minQty,
      neededQty: nextRule.minQty - qty,
      unitPrice: nextTierPrice,
      savePerUnit: unitPrice - nextTierPrice,
    };
  }

  const currentTierRule = rules.find((r) => r.tier === activeTier);

  return {
    currentTier: activeTier,
    currentTierLabel: currentTierRule ? currentTierRule.label : 'Giá Lẻ',
    unitPrice,
    totalPrice: unitPrice * qty,
    nextTier: nextTierInfo,
  };
}

export function formatPrice(
  amountVND: number,
  currency: Currency,
  exchangeRate?: number,
  _hideUsd?: boolean
): string {
  if (currency === 'USD') {
    const rate = exchangeRate && exchangeRate > 0 ? exchangeRate : currentExchangeRate;
    const inUSD = amountVND / rate;
    return `$${inUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  // Standardize thousand separators with comma (,): e.g. 2,325,000 ₫
  return `${Math.round(amountVND).toLocaleString('en-US')} ₫`;
}

export function getTierBadgeName(tier: PriceTierKey): string {
  switch (tier) {
    case 'retail':
      return 'Giá Lẻ';
    case 'wholesale1':
      return 'Sỉ Cấp 1';
    case 'wholesale2':
      return 'Sỉ Cấp 2';
    case 'wholesale3':
      return 'Sỉ Cấp 3 (Đại Lý)';
  }
}

/**
 * V223 (DYNAMIC AUTO-JUMP):
 * Tự động xác định số lượng tối thiểu để đạt Giá Sỉ 1 khi khách hàng chọn "MUA SỈ":
 * - Truy xuất chính xác ngưỡng số lượng bắt đầu của Sỉ 1 từ database config của sản phẩm.
 * - Ví dụ: Trà Cascara & Xạ Đen từ 10 thùng -> 10, Matcha từ 10 kg -> 10, Đặc sản từ 5 hộp -> 5, Nước mía từ 3 thùng -> 3.
 */
export function getWholesaleInitialQuantity(product: Product, config?: ProductWholesaleConfig): number {
  if (!product) return 10;
  const wConfig = config || getProductWholesaleConfig(product);
  return wConfig.tiers?.wholesale1?.minQty || 1;
}
