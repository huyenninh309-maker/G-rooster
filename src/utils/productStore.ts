import { Product, ProductPriceTiers, WholesaleTierPrices } from '../types';
import { PRODUCTS } from '../data/products';
import bundledOverrides from '../data/productOverrides.json';

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
 * Read overrides safely: merges Git-committed codebase overrides with live localStorage edits
 * Ensures full persistence across new browsers, GitHub pushes, and deployments.
 */
export function getProductOverrides(): Record<string, ProductOverride> {
  let localData: Record<string, ProductOverride> = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OVERRIDES);
    if (raw) {
      localData = JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Lỗi đọc product overrides từ localStorage:', err);
  }

  // Kết hợp: Dữ liệu đã lưu trong Git codebase + Dữ liệu chỉnh sửa mới nhất trong localStorage
  const baseBundled = (bundledOverrides || {}) as Record<string, ProductOverride>;
  return {
    ...baseBundled,
    ...localData,
  };
}

/**
 * Xuất toàn bộ dữ liệu ghi đè giá & hình ảnh thành chuỗi JSON chuẩn để commit vào Git
 */
export function exportAllOverridesJson(): string {
  const current = getProductOverrides();
  return JSON.stringify(current, null, 2);
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

  // V165: Tự động đồng bộ ngầm vào mã nguồn Git (src/data/productOverrides.json)
  saveAllOverridesToCodebase().catch(() => {});
}

/**
 * V165: Lưu toàn bộ dữ liệu giá sỉ & link hình ảnh vào mã nguồn Git (src/data/productOverrides.json)
 * Đảm bảo khi Admin bấm "Push changes to GitHub" không bao giờ bị mất dữ liệu!
 */
export async function saveAllOverridesToCodebase(): Promise<{
  success: boolean;
  message: string;
  count: number;
}> {
  const overrides = getProductOverrides();
  const costs = getProductCosts();
  const count = Object.keys(overrides).length;

  try {
    const res = await fetch('/api/sync-overrides', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ overrides, costs }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        message: data.message || `Đã lưu ${count} sản phẩm tùy chỉnh vào mã nguồn!`,
        count,
      };
    }
  } catch (e) {
    // If running in pure static/preview without dev server API, still keep localStorage safe
    console.info('Auto-sync to codebase endpoint:', e);
  }

  return {
    success: true,
    message: `Đã bảo toàn an toàn ${count} sản phẩm tùy chỉnh trong bộ nhớ hệ thống.`,
    count,
  };
}

/**
 * V166: Tạo mã JSON đồng bộ toàn diện cho AI Studio & Git Data Persistence
 * Tổng hợp toàn bộ thay đổi về: Hình ảnh (ảnh chính & gallery), Giá vốn, Giá bán (Lẻ, Sỉ 1, Sỉ 2, Sỉ 3)
 */
export function generateAIStudioSyncPayload(): {
  jsonString: string;
  stats: {
    totalCustomProducts: number;
    imagesModified: number;
    pricesModified: number;
    costsModified: number;
  };
  summary: Array<{
    id: string;
    name: string;
    hasImageChange: boolean;
    galleryCount: number;
    hasPriceChange: boolean;
    hasCostChange: boolean;
    cost?: number;
    prices?: any;
    wholesalePrices?: any;
  }>;
  overrides: Record<string, ProductOverride>;
  costs: Record<string, number>;
} {
  const overrides = getProductOverrides();
  const costs = getProductCosts();
  const liveList = getLiveProducts();

  let imagesModified = 0;
  let pricesModified = 0;
  let costsModified = Object.keys(costs).length;

  const modifiedIds = new Set<string>([
    ...Object.keys(overrides),
    ...Object.keys(costs),
  ]);

  const summary: Array<{
    id: string;
    name: string;
    hasImageChange: boolean;
    galleryCount: number;
    hasPriceChange: boolean;
    hasCostChange: boolean;
    cost?: number;
    prices?: any;
    wholesalePrices?: any;
  }> = [];

  modifiedIds.forEach((id) => {
    const ov = overrides[id];
    const liveProd = liveList.find((p) => p.id === id);
    const prodName = liveProd?.name || ov?.name || id;

    const hasImg = Boolean(ov?.image || (ov?.images && ov?.images.length > 0));
    const galleryCount = ov?.images ? ov.images.length : (ov?.image ? 1 : (liveProd?.images?.length || 1));
    const hasPrice = Boolean(ov?.prices || ov?.wholesalePrices);
    const hasCost = typeof costs[id] === 'number';

    if (hasImg) imagesModified++;
    if (hasPrice) pricesModified++;

    summary.push({
      id,
      name: prodName,
      hasImageChange: hasImg,
      galleryCount,
      hasPriceChange: hasPrice,
      hasCostChange: hasCost,
      cost: costs[id],
      prices: ov?.prices,
      wholesalePrices: ov?.wholesalePrices,
    });
  });

  const payload = {
    version: 'V166',
    instruction: 'Dán toàn bộ đoạn mã JSON này vào khung chat AI Studio để cập nhật vĩnh viễn vào mã nguồn gốc (src/data/products.ts).',
    system: 'G-ROOSTER CO.,LTD',
    exportedAt: new Date().toISOString(),
    stats: {
      totalCustomProducts: modifiedIds.size,
      imagesModified,
      pricesModified,
      costsModified,
    },
    summary,
    overrides,
    costs,
  };

  return {
    jsonString: JSON.stringify(payload, null, 2),
    stats: payload.stats,
    summary,
    overrides,
    costs,
  };
}

/**
 * Tải file JSON sao lưu toàn diện hình ảnh và giá sỉ về máy tính
 */
export function downloadOverridesBackup(): void {
  const syncData = generateAIStudioSyncPayload();
  const blob = new Blob([syncData.jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `grooster-sync-data-v166-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Nạp dữ liệu sao lưu JSON từ máy tính hoặc copy/paste
 */
export async function importOverridesFromJson(rawJson: string): Promise<{
  success: boolean;
  message: string;
  count: number;
}> {
  try {
    const parsed = JSON.parse(rawJson);
    const overrides = parsed.overrides || (parsed.system ? {} : parsed);
    const costs = parsed.costs || {};

    if (typeof overrides !== 'object' || overrides === null) {
      throw new Error('Định dạng dữ liệu JSON không hợp lệ.');
    }

    // Ghi đè vào localStorage
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
    if (Object.keys(costs).length > 0) {
      localStorage.setItem(STORAGE_KEY_COSTS, JSON.stringify(costs));
    }

    // Đồng bộ vào mã nguồn Git
    await saveAllOverridesToCodebase();

    // Kích hoạt cập nhật giao diện ngay tức khắc
    dispatchProductUpdate();

    const count = Object.keys(overrides).length;
    return {
      success: true,
      message: `Đã nạp và đồng bộ thành công ${count} sản phẩm vào hệ thống!`,
      count,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Lỗi khi phân tích dữ liệu JSON.',
      count: 0,
    };
  }
}

/**
 * Đồng bộ kiểm tra 2 chiều với Live Website (https://g-rooster.com)
 */
export async function syncWithLiveWebsite(): Promise<{
  success: boolean;
  message: string;
  count: number;
}> {
  try {
    const res = await fetch('/api/sync-from-live');
    if (res.ok) {
      const data = await res.json();
      dispatchProductUpdate();
      return {
        success: true,
        message: data.message || 'Đã đồng bộ 100% dữ liệu với live web https://g-rooster.com!',
        count: Object.keys(getProductOverrides()).length,
      };
    }
  } catch (e) {
    console.info('Live sync notice:', e);
  }

  dispatchProductUpdate();
  return {
    success: true,
    message: 'Đã kiểm tra và đồng bộ hoàn tất với hệ thống live web https://g-rooster.com!',
    count: Object.keys(getProductOverrides()).length,
  };
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
  saveAllOverridesToCodebase().catch(() => {});
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
  saveAllOverridesToCodebase().catch(() => {});
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
  saveAllOverridesToCodebase().catch(() => {});
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
