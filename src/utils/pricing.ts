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
  wholesaleUnit: 'THÙNG' | 'KG';
  wholesaleUnitLabel: string;
  minWholesaleQty: number; // Tối thiểu khi vào tab Mua Sỉ
  tiers: {
    wholesale1: WholesaleTierMilestone;
    wholesale2: WholesaleTierMilestone;
    wholesale3: WholesaleTierMilestone;
  };
}

/**
 * Lấy cấu hình 3 cấp độ sỉ (Sỉ 1, Sỉ 2, Sỉ 3) theo đơn vị lớn (THÙNG / KG) cho 53 sản phẩm
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

  const isMatcha = (product.id || '').startsWith('vtn-matcha-laka-');
  const isSam1kg = product.id === 'dato-sam-day-kho-1kg';
  const isVuaMia = (product.id || '').startsWith('vua-mia') || product.partnerId === 'vua-mia';
  const isPhuNha = product.partnerId === 'phu-nha' || (product.id || '').startsWith('phu-nha-');
  const isKG = product.wholesaleUnit === 'KG';

  let minQty1 = 1;
  let minQty2 = 3;
  let minQty3 = 10;
  let unitText = product.wholesaleUnit === 'KG' ? 'KG' : 'Thùng';

  if (isPhuNha) {
    // Phú Nhã: Sỉ 1 từ 10kg (10 - 20kg), Sỉ 2 từ 21kg (21 - 50kg), Sỉ 3 từ 51kg (≥51kg)
    minQty1 = 10;
    minQty2 = 21;
    minQty3 = 51;
    unitText = 'KG';
  } else if (isMatcha) {
    // Matcha: Sỉ 1 từ 10kg, Sỉ 2 từ 30kg, Sỉ 3 từ 100kg
    minQty1 = 10;
    minQty2 = 30;
    minQty3 = 100;
  } else if (isSam1kg) {
    // Sâm 1kg: Sỉ 1 từ 3kg, Sỉ 2 từ 10kg, Sỉ 3 từ 30kg
    minQty1 = 3;
    minQty2 = 10;
    minQty3 = 30;
  } else if (isVuaMia) {
    // Vua Mía: Mức Sỉ 1 (Từ 3 thùng), Mức Sỉ 2 (Từ 10 thùng), Mức Sỉ 3 (Từ 30 thùng)
    minQty1 = 3;
    minQty2 = 10;
    minQty3 = 30;
  } else if (isKG) {
    // Sâm 500g, 100g, Mứt sâm: Sỉ 1 từ 1kg, Sỉ 2 từ 3kg, Sỉ 3 từ 10kg
    minQty1 = 1;
    minQty2 = 3;
    minQty3 = 10;
  } else {
    // THÙNG (Cascara, Dato trà & mật ong, Nón Lá, Aodai):
    // Sỉ 1 từ 1 Thùng, Sỉ 2 từ 3 Thùng, Sỉ 3 từ 10 Thùng
    minQty1 = 1;
    minQty2 = 3;
    minQty3 = 10;
  }

  const upw = Math.max(1, product.unitsPerWholesale || 1);
  const multiplier = isKG ? 1 : upw;
  const retailFallback = product.prices?.retail || 0;

  // Defensive wholesalePrices lookup with legacy fallback
  const wp1 =
    product.wholesalePrices?.wholesale1 ??
    (product.prices?.wholesale1 != null ? product.prices.wholesale1 * multiplier : retailFallback);
  const wp2 =
    product.wholesalePrices?.wholesale2 ??
    (product.prices?.wholesale2 != null ? product.prices.wholesale2 * multiplier : wp1);
  const wp3 =
    product.wholesalePrices?.wholesale3 ??
    (product.prices?.wholesale3 != null ? product.prices.wholesale3 * multiplier : wp2);

  return {
    wholesaleUnit: product.wholesaleUnit || (isKG ? 'KG' : 'THÙNG'),
    wholesaleUnitLabel: product.wholesaleUnitLabel || (isKG ? '1 KG' : '1 Thùng'),
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
    return {
      mode: 'retail',
      quantity: qty,
      minAllowedQty: 1,
      unit: product.retailUnit || product.unit || 'đv',
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

  for (let i = product.tierRules.length - 1; i >= 0; i--) {
    const rule = product.tierRules[i];
    if (qty >= rule.minQty) {
      activeTier = rule.tier;
      unitPrice = product.prices[rule.tier];
      break;
    }
  }

  let nextTierInfo = undefined;
  const currentRuleIdx = product.tierRules.findIndex((r) => r.tier === activeTier);
  if (currentRuleIdx !== -1 && currentRuleIdx < product.tierRules.length - 1) {
    const nextRule = product.tierRules[currentRuleIdx + 1];
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

  const currentTierRule = product.tierRules.find((r) => r.tier === activeTier);

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
  return `${amountVND.toLocaleString('vi-VN')} ₫`;
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
