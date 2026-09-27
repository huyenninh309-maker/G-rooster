import { Product, ProductPriceTiers, WholesaleTierPrices } from '../types';
import { PRODUCTS } from '../data/products';

export interface ProductOverride {
  prices?: ProductPriceTiers;
  wholesalePrices?: WholesaleTierPrices;
  image?: string;
  images?: string[]; // Bộ sưu tập hình ảnh gallery của sản phẩm
  name?: string;
  updatedAt?: string;
}

export interface AdminProductFinancialItem {
  id: string;
  name: string;
  partnerId: string;
  partnerName: string;
  category: string;
  unit: string;
  retailUnit: string;
  wholesaleUnit: string;
  wholesaleUnitLabel: string;
  unitsPerWholesale: number;
  image: string;
  images?: string[];
  isCustomImage: boolean;
  cost: number; // Giá Vốn (VND)
  prices: ProductPriceTiers; // Giá Bán theo đơn vị lẻ
  wholesalePrices: WholesaleTierPrices; // Giá Bán theo đơn vị lớn
  financials: {
    retail: {
      price: number;
      profit: number;
      marginPercent: number;
      isLoss: boolean;
    };
    wholesale1: {
      price: number;
      profit: number;
      marginPercent: number;
      isLoss: boolean;
    };
    wholesale2: {
      price: number;
      profit: number;
      marginPercent: number;
      isLoss: boolean;
    };
    wholesale3: {
      price: number;
      profit: number;
      marginPercent: number;
      isLoss: boolean;
    };
  };
  hasLoss: boolean;
  lossTiers: string[];
}

const STORAGE_KEY_OVERRIDES = 'grooster_product_overrides_v158';
const STORAGE_KEY_COSTS = 'grooster_product_costs_v158';
const UPDATE_EVENT_NAME = 'grooster_products_updated';

/**
 * Intelligent default cost estimator for products that don't have cost set yet.
 * Calibrated around 75% of wholesale3 (or 55-65% of retail price) so initial
 * margins are realistic and positive, allowing the admin to inspect and customize.
 */
export function estimateDefaultCost(product: Product): number {
  const ws3 = product.prices.wholesale3;
  const ws1 = product.prices.wholesale1;
  const retail = product.prices.retail;

  let baseCost = 0;
  if (ws3 && ws3 > 0) {
    baseCost = ws3 * 0.78;
  } else if (ws1 && ws1 > 0) {
    baseCost = ws1 * 0.75;
  } else {
    baseCost = retail * 0.6;
  }

  // Round to nearest 1,000 VND (or 500 VND for small items)
  if (baseCost > 10000) {
    return Math.round(baseCost / 1000) * 1000;
  }
  return Math.round(baseCost / 100) * 100;
}

/**
 * Read overrides from localStorage safely
 */
export function getProductOverrides(): Record<string, ProductOverride> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OVERRIDES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Lỗi đọc product overrides:', err);
  }
  return {};
}

/**
 * Read cost map from localStorage safely (Admin only)
 */
export function getProductCosts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COSTS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Lỗi đọc product costs:', err);
  }
  return {};
}

/**
 * Returns all 133 products merged with live admin overrides.
 * This public function NEVER exposes cost or profit margins.
 */
export function getLiveProducts(): Product[] {
  const overrides = getProductOverrides();

  return PRODUCTS.map((baseProduct) => {
    const override = overrides[baseProduct.id];
    if (!override) return baseProduct;

    const hasCustomImg = Boolean(
      override.image || (override.images && override.images.length > 0)
    );

    return {
      ...baseProduct,
      prices: override.prices ? { ...baseProduct.prices, ...override.prices } : baseProduct.prices,
      wholesalePrices: override.wholesalePrices
        ? { ...baseProduct.wholesalePrices, ...override.wholesalePrices }
        : baseProduct.wholesalePrices,
      image: override.image || baseProduct.image,
      images:
        override.images !== undefined
          ? override.images
          : override.image
          ? [override.image]
          : baseProduct.images,
      name: override.name || baseProduct.name,
      isCustomImage: hasCustomImg,
    };
  });
}

/**
 * Returns single live product by ID
 */
export function getLiveProductById(id: string): Product | undefined {
  const all = getLiveProducts();
  return all.find((p) => p.id === id);
}

/**
 * Returns comprehensive financial analytics for Admin Screen 2 & Screen 3.
 * Calculates Cost, Profits, Margins %, red-alert loss flags, and image gallery data.
 */
export function getAdminProductFinancials(): AdminProductFinancialItem[] {
  const liveList = getLiveProducts();
  const costMap = getProductCosts();
  const overrides = getProductOverrides();

  return liveList.map((product) => {
    // Determine cost: saved cost or realistic default
    const savedCost = costMap[product.id];
    const cost = typeof savedCost === 'number' && savedCost > 0
      ? savedCost
      : estimateDefaultCost(product);

    const calcTier = (sellingPrice: number) => {
      const profit = sellingPrice - cost;
      const marginPercent = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
      const isLoss = sellingPrice < cost;
      return {
        price: sellingPrice,
        profit,
        marginPercent: Math.round(marginPercent * 10) / 10,
        isLoss,
      };
    };

    const retailFinancial = calcTier(product.prices.retail);
    const ws1Financial = calcTier(product.prices.wholesale1);
    const ws2Financial = calcTier(product.prices.wholesale2);
    const ws3Financial = calcTier(product.prices.wholesale3);

    const lossTiers: string[] = [];
    if (retailFinancial.isLoss) lossTiers.push('Lẻ');
    if (ws1Financial.isLoss) lossTiers.push('Sỉ 1');
    if (ws2Financial.isLoss) lossTiers.push('Sỉ 2');
    if (ws3Financial.isLoss) lossTiers.push('Sỉ 3');

    const isCustomImage = Boolean(
      overrides[product.id]?.image ||
      (overrides[product.id]?.images && overrides[product.id]?.images!.length > 0)
    );

    return {
      id: product.id,
      name: product.name,
      partnerId: product.partnerId,
      partnerName: product.partnerName,
      category: product.category,
      unit: product.unit,
      retailUnit: product.retailUnit,
      wholesaleUnit: product.wholesaleUnit,
      wholesaleUnitLabel: product.wholesaleUnitLabel,
      unitsPerWholesale: product.unitsPerWholesale || 1,
      image: product.image,
      images: product.images,
      isCustomImage,
      cost,
      prices: product.prices,
      wholesalePrices: product.wholesalePrices,
      financials: {
        retail: retailFinancial,
        wholesale1: ws1Financial,
        wholesale2: ws2Financial,
        wholesale3: ws3Financial,
      },
      hasLoss: lossTiers.length > 0,
      lossTiers,
    };
  });
}

/**
 * Save single product update (Cost, Prices, Wholesale prices, Image, Images Gallery)
 */
export function saveSingleProductAdminData(
  productId: string,
  data: {
    cost?: number;
    prices?: Partial<ProductPriceTiers>;
    wholesalePrices?: Partial<WholesaleTierPrices>;
    image?: string;
    images?: string[];
  }
): void {
  // 1. Cost save
  if (typeof data.cost === 'number') {
    const costMap = getProductCosts();
    costMap[productId] = Math.max(0, Math.round(data.cost));
    try {
      localStorage.setItem(STORAGE_KEY_COSTS, JSON.stringify(costMap));
    } catch (err) {
      console.warn('Lỗi lưu product costs:', err);
    }
  }

  // 2. Overrides save (prices, wholesalePrices, image, images)
  const overrides = getProductOverrides();
  const existing = overrides[productId] || {};

  const updatedOverride: ProductOverride = {
    ...existing,
    updatedAt: new Date().toISOString(),
  };

  if (data.prices) {
    updatedOverride.prices = {
      ...(existing.prices || {}),
      ...data.prices,
    } as ProductPriceTiers;
  }

  if (data.wholesalePrices) {
    updatedOverride.wholesalePrices = {
      ...(existing.wholesalePrices || {}),
      ...data.wholesalePrices,
    } as WholesaleTierPrices;
  }

  if ('image' in data) {
    if (data.image === undefined) {
      delete updatedOverride.image;
    } else {
      updatedOverride.image = data.image;
    }
  }

  if ('images' in data) {
    if (data.images === undefined) {
      delete updatedOverride.images;
    } else {
      updatedOverride.images = data.images;
    }
  }

  overrides[productId] = updatedOverride;

  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
  } catch (err) {
    console.warn('Lỗi lưu product overrides:', err);
  }

  // Broadcast event to active React components
  dispatchProductUpdate();
}

/**
 * Batch update prices by percentage for a specific category / partner
 */
export function bulkUpdateCategoryPrices(
  targetPartnerId: string, // 'all' or partnerId e.g. 'matcha-tra-laka'
  percentChange: number, // e.g. 5 for +5%, -10 for -10%
  targetTier: 'all' | 'retail' | 'wholesale1' | 'wholesale2' | 'wholesale3'
): { updatedCount: number } {
  const liveList = getLiveProducts();
  const overrides = getProductOverrides();
  const multiplier = 1 + percentChange / 100;
  let updatedCount = 0;

  liveList.forEach((product) => {
    if (targetPartnerId !== 'all' && product.partnerId !== targetPartnerId) {
      return;
    }

    const currentPrices = { ...product.prices };
    const currentWholesale = { ...product.wholesalePrices };

    const updatePriceValue = (val: number) => {
      const newVal = Math.round((val * multiplier) / 1000) * 1000;
      return Math.max(1000, newVal);
    };

    if (targetTier === 'all' || targetTier === 'retail') {
      currentPrices.retail = updatePriceValue(currentPrices.retail);
    }
    if (targetTier === 'all' || targetTier === 'wholesale1') {
      currentPrices.wholesale1 = updatePriceValue(currentPrices.wholesale1);
      if (currentWholesale.wholesale1) {
        currentWholesale.wholesale1 = updatePriceValue(currentWholesale.wholesale1);
      }
    }
    if (targetTier === 'all' || targetTier === 'wholesale2') {
      currentPrices.wholesale2 = updatePriceValue(currentPrices.wholesale2);
      if (currentWholesale.wholesale2) {
        currentWholesale.wholesale2 = updatePriceValue(currentWholesale.wholesale2);
      }
    }
    if (targetTier === 'all' || targetTier === 'wholesale3') {
      currentPrices.wholesale3 = updatePriceValue(currentPrices.wholesale3);
      if (currentWholesale.wholesale3) {
        currentWholesale.wholesale3 = updatePriceValue(currentWholesale.wholesale3);
      }
    }

    overrides[product.id] = {
      ...(overrides[product.id] || {}),
      prices: currentPrices,
      wholesalePrices: currentWholesale,
      updatedAt: new Date().toISOString(),
    };

    updatedCount += 1;
  });

  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
  } catch (err) {
    console.warn('Lỗi lưu bulk overrides:', err);
  }

  dispatchProductUpdate();
  return { updatedCount };
}

/**
 * Reset a single product back to base code definitions
 */
export function resetProductToDefault(productId: string): void {
  const overrides = getProductOverrides();
  delete overrides[productId];
  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
  } catch (err) {
    console.warn(err);
  }
  dispatchProductUpdate();
}

/**
 * Reset ALL products back to original code definitions (from Chat / files)
 */
export function resetAllProductsToDefault(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_OVERRIDES);
  } catch (err) {
    console.warn(err);
  }
  dispatchProductUpdate();
}

/**
 * Broadcast event to listeners
 */
export function dispatchProductUpdate(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME));
  }
}

/**
 * Subscribe to live product update events
 */
export function subscribeToProductUpdates(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => callback();
  window.addEventListener(UPDATE_EVENT_NAME, handler);
  return () => {
    window.removeEventListener(UPDATE_EVENT_NAME, handler);
  };
}
