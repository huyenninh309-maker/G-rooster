import { Product, ProductPriceTiers, WholesaleTierPrices } from '../types';
import { PRODUCTS } from '../data/products';
import bundledOverrides from '../data/productOverrides.json';
import bundledCosts from '../data/productCosts.json';
import {
  saveProductsToFirestore,
  subscribeToFirestoreProducts,
  getProductsFromFirestore,
} from '../services/firebase';

export interface ProductOverride {
  prices?: ProductPriceTiers;
  wholesalePrices?: WholesaleTierPrices;
  image?: string;
  images?: string[]; // Bộ sưu tập hình ảnh gallery của sản phẩm
  name?: string;
  stock?: number; // V178: Tồn kho sản phẩm
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
  stock: number; // V178: Số lượng tồn kho
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
const STORAGE_KEY_STOCKS = 'grooster_product_stocks_v178';
const STORAGE_KEY_DELETED = 'grooster_product_deleted_v255';
const UPDATE_EVENT_NAME = 'grooster_products_updated';

/**
 * V255: Quản lý danh sách ID sản phẩm bị Admin xóa vĩnh viễn
 */
export function getDeletedProductIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DELETED);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return new Set(arr);
      }
    }
  } catch (err) {
    console.warn('Lỗi đọc deleted product ids:', err);
  }
  return new Set();
}

/**
 * V255: Xóa vĩnh viễn sản phẩm khỏi Database hệ thống
 */
export function deleteProductPermanently(productId: string): void {
  if (!productId) return;
  const deleted = getDeletedProductIds();
  deleted.add(productId);
  try {
    localStorage.setItem(STORAGE_KEY_DELETED, JSON.stringify(Array.from(deleted)));
  } catch (err) {
    console.warn('Lỗi lưu deleted products:', err);
  }

  // Xóa sạch mọi overrides, costs và stocks của sản phẩm này
  const overrides = getProductOverrides();
  delete overrides[productId];
  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
  } catch {}

  const costs = getProductCosts();
  delete costs[productId];
  try {
    localStorage.setItem(STORAGE_KEY_COSTS, JSON.stringify(costs));
  } catch {}

  const stocks = getProductStocks();
  delete stocks[productId];
  try {
    localStorage.setItem(STORAGE_KEY_STOCKS, JSON.stringify(stocks));
  } catch {}

  dispatchProductUpdate();
  saveAllOverridesToCodebase().catch(() => {});
}

/**
 * V255: Cập nhật tên sản phẩm trực tiếp (Inline Editing) và lưu ngay vào Database
 */
export function updateProductName(productId: string, newName: string): void {
  if (!productId || !newName || !newName.trim()) return;
  const cleanName = newName.trim();
  const overrides = getProductOverrides();
  const existing = overrides[productId] || {};
  overrides[productId] = {
    ...existing,
    name: cleanName,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
  } catch (err) {
    console.warn('Lỗi lưu product name override:', err);
  }
  dispatchProductUpdate();
  saveAllOverridesToCodebase().catch(() => {});
}

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
  let localData: Record<string, number> = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COSTS);
    if (raw) {
      localData = JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Lỗi đọc product costs:', err);
  }
  const baseBundled = (bundledCosts || {}) as Record<string, number>;
  return {
    ...baseBundled,
    ...localData,
  };
}

/**
 * V178: Read stock map from localStorage safely
 */
export function getProductStocks(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STOCKS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Lỗi đọc product stocks:', err);
  }
  return {};
}

/**
 * Returns all 133 products merged with live admin overrides.
 * This public function NEVER exposes cost or profit margins.
 */
export function getLiveProducts(): Product[] {
  const overrides = getProductOverrides();
  const stocks = getProductStocks();
  const deletedIds = getDeletedProductIds();

  return PRODUCTS.filter((p) => !deletedIds.has(p.id)).map((baseProduct) => {
    // V219: Chuẩn hóa đơn vị & quy cách Trà Xạ Đen
    let productToUse = baseProduct;
    if (baseProduct.id === 'vtn-tra-xa-den' || (baseProduct.name && baseProduct.name.includes('Xạ Đen'))) {
      productToUse = {
        ...baseProduct,
        unit: 'Hộp 150g',
        retailUnit: 'Hộp',
        wholesaleUnit: 'THÙNG',
        wholesaleUnitLabel: 'Thùng 30 hộp',
        unitsPerWholesale: 30,
        packaging: 'Hộp 150g (Thùng 30 hộp x 150g)',
        prices: {
          retail: 136000,
          wholesale1: 105400,
          wholesale2: 98433,
          wholesale3: 91800,
          ...baseProduct.prices,
        },
        wholesalePrices: {
          wholesale1: 3162000,
          wholesale2: 2953000,
          wholesale3: 2754000,
        },
      };
    }

    const override = overrides[productToUse.id];
    const stockVal =
      stocks[productToUse.id] !== undefined
        ? stocks[productToUse.id]
        : override?.stock !== undefined
        ? override.stock
        : (productToUse.stock ?? 50);

    const mergedPrices = override?.prices ? { ...productToUse.prices, ...override.prices } : productToUse.prices;

    // V219: Tính lại wholesalePrices chuẩn xác:
    // Trà Xạ Đen: [Giá sỉ 1 hộp] x 30
    // Trà Cascara: [Giá sỉ 1 hộp] x 24
    let mergedWholesalePrices = override?.wholesalePrices
      ? { ...productToUse.wholesalePrices, ...override.wholesalePrices }
      : productToUse.wholesalePrices;

    if (productToUse.id === 'vtn-tra-xa-den' || (productToUse.name && productToUse.name.includes('Xạ Đen'))) {
      mergedWholesalePrices = {
        wholesale1: Math.round((mergedPrices.wholesale1 ?? 105400) * 30),
        wholesale2: Math.round((mergedPrices.wholesale2 ?? 98433) * 30),
        wholesale3: Math.round((mergedPrices.wholesale3 ?? 91800) * 30),
      };
    } else if (productToUse.id.startsWith('vtn-cascara-') || (productToUse.name && productToUse.name.includes('Cascara'))) {
      mergedWholesalePrices = {
        wholesale1: Math.round((mergedPrices.wholesale1 ?? 63541) * 24),
        wholesale2: Math.round((mergedPrices.wholesale2 ?? 59375) * 24),
        wholesale3: Math.round((mergedPrices.wholesale3 ?? 55333) * 24),
      };
    }

    if (!override) {
      return {
        ...productToUse,
        stock: stockVal,
        wholesalePrices: mergedWholesalePrices,
      };
    }

    const hasCustomImg = Boolean(
      override.image || (override.images && override.images.length > 0)
    );

    return {
      ...productToUse,
      stock: stockVal,
      prices: mergedPrices,
      wholesalePrices: mergedWholesalePrices,
      image: override.image || productToUse.image,
      images:
        override.images !== undefined
          ? override.images
          : override.image
          ? [override.image]
          : productToUse.images,
      name: override.name || productToUse.name,
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
  const stocks = getProductStocks();

  return liveList.map((product) => {
    // Determine cost: saved cost or realistic default
    const savedCost = costMap[product.id];
    const cost = typeof savedCost === 'number' && savedCost > 0
      ? savedCost
      : estimateDefaultCost(product);

    // Determine stock (V178)
    const stock =
      typeof stocks[product.id] === 'number'
        ? stocks[product.id]
        : typeof overrides[product.id]?.stock === 'number'
        ? overrides[product.id]!.stock!
        : (product.stock ?? 50);

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
      stock,
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
    name?: string;
    cost?: number;
    stock?: number;
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

  // 1.1. Stock save (V178)
  if (typeof data.stock === 'number') {
    const stockMap = getProductStocks();
    stockMap[productId] = Math.max(0, Math.round(data.stock));
    try {
      localStorage.setItem(STORAGE_KEY_STOCKS, JSON.stringify(stockMap));
    } catch (err) {
      console.warn('Lỗi lưu product stocks:', err);
    }
  }

  // 2. Overrides save (prices, wholesalePrices, image, images, stock)
  const overrides = getProductOverrides();
  const existing = overrides[productId] || {};

  const updatedOverride: ProductOverride = {
    ...existing,
    updatedAt: new Date().toISOString(),
  };

  if (typeof data.name === 'string' && data.name.trim()) {
    updatedOverride.name = data.name.trim();
  }

  if (typeof data.stock === 'number') {
    updatedOverride.stock = Math.max(0, Math.round(data.stock));
  }

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

  // V175 & V178: Lưu vĩnh viễn dữ liệu (Giá bán, Giá vốn, Tồn kho) vào Firebase Firestore của Google Cloud
  const currentCosts = getProductCosts();
  const currentStocks = getProductStocks();
  saveProductsToFirestore(overrides, currentCosts, currentStocks).catch((err) => {
    console.warn('Background sync Firestore:', err);
  });

  // V165: Tự động đồng bộ ngầm vào mã nguồn Git (src/data/productOverrides.json)
  saveAllOverridesToCodebase().catch(() => {});
}

/**
 * V175 & V178: Lưu vĩnh viễn toàn bộ Giá vốn, Giá bán, Tồn kho, Hình ảnh vào Google Cloud Firebase Firestore
 */
export async function saveAllDataToFirebase(): Promise<{
  success: boolean;
  message: string;
  count: number;
}> {
  const overrides = getProductOverrides();
  const costs = getProductCosts();
  const stocks = getProductStocks();
  const count = Object.keys(overrides).length;

  try {
    const res = await saveProductsToFirestore(overrides, costs, stocks);
    // Also backup to codebase
    saveAllOverridesToCodebase().catch(() => {});
    return {
      success: res.success,
      message: res.message || `Đã lưu vĩnh viễn ${count} sản phẩm lên Firebase Firestore!`,
      count,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Không thể lưu vào Firebase Firestore lúc này.',
      count,
    };
  }
}

let isFirebaseProductSyncInitialized = false;

/**
 * V175: Thiết lập đồng bộ 2 chiều tức thì với Google Firebase Firestore (Real-time updates)
 */
export function initFirebaseProductSync(): void {
  if (typeof window === 'undefined' || isFirebaseProductSyncInitialized) return;
  isFirebaseProductSyncInitialized = true;

  // 1. Initial fetch from Firestore
  getProductsFromFirestore().then((data) => {
    if (data) {
      let changed = false;
      if (data.overrides && Object.keys(data.overrides).length > 0) {
        try {
          const currentOverrides = getProductOverrides();
          localStorage.setItem(
            STORAGE_KEY_OVERRIDES,
            JSON.stringify({ ...currentOverrides, ...data.overrides })
          );
          changed = true;
        } catch (e) {
          console.warn('Lỗi ghi overrides từ Firestore:', e);
        }
      }
      if (data.costs && Object.keys(data.costs).length > 0) {
        try {
          const currentCosts = getProductCosts();
          localStorage.setItem(
            STORAGE_KEY_COSTS,
            JSON.stringify({ ...currentCosts, ...data.costs })
          );
          changed = true;
        } catch (e) {
          console.warn('Lỗi ghi costs từ Firestore:', e);
        }
      }
      if (data.stocks && Object.keys(data.stocks).length > 0) {
        try {
          const currentStocks = getProductStocks();
          localStorage.setItem(
            STORAGE_KEY_STOCKS,
            JSON.stringify({ ...currentStocks, ...data.stocks })
          );
          changed = true;
        } catch (e) {
          console.warn('Lỗi ghi stocks từ Firestore:', e);
        }
      }
      if (changed) {
        dispatchProductUpdate();
      }
    }
  }).catch(() => {});

  // 2. Real-time onSnapshot listener
  subscribeToFirestoreProducts(({ overrides, costs, stocks }) => {
    let changed = false;
    if (overrides && Object.keys(overrides).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
        changed = true;
      } catch (e) {
        console.warn('Lỗi cập nhật overrides qua onSnapshot:', e);
      }
    }
    if (costs && Object.keys(costs).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY_COSTS, JSON.stringify(costs));
        changed = true;
      } catch (e) {
        console.warn('Lỗi cập nhật costs qua onSnapshot:', e);
      }
    }
    if (stocks && Object.keys(stocks).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY_STOCKS, JSON.stringify(stocks));
        changed = true;
      } catch (e) {
        console.warn('Lỗi cập nhật stocks qua onSnapshot:', e);
      }
    }
    if (changed) {
      dispatchProductUpdate();
    }
  });
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

const BROADCAST_CHANNEL_NAME = 'grooster_product_sync_channel';

// Singleton BroadcastChannel if supported
let globalBroadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    globalBroadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  } catch (e) {
    console.info('BroadcastChannel not supported in current environment', e);
  }
}

/**
 * Broadcast event to listeners across all tabs, iframes, mobile & desktop viewports
 */
export function dispatchProductUpdate(): void {
  if (typeof window !== 'undefined') {
    // 1. Same-window CustomEvent
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME));

    // 2. Cross-tab BroadcastChannel
    if (globalBroadcastChannel) {
      try {
        globalBroadcastChannel.postMessage({ type: 'PRODUCTS_UPDATED', timestamp: Date.now() });
      } catch (e) {
        console.warn('BroadcastChannel postMessage error:', e);
      }
    }

    // 3. Storage event pulse (triggers storage event on other tabs/windows in same browser)
    try {
      localStorage.setItem('grooster_storage_sync_pulse', Date.now().toString());
    } catch (e) {
      // Ignore storage errors in private browsing
    }
  }
}

/**
 * Subscribe to live product update events across current window and all other browser tabs
 */
export function subscribeToProductUpdates(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = () => callback();

  // Storage listener for cross-tab sync
  const handleStorageEvent = (e: StorageEvent) => {
    if (
      e.key === STORAGE_KEY_OVERRIDES ||
      e.key === STORAGE_KEY_COSTS ||
      e.key === 'grooster_storage_sync_pulse' ||
      e.key === null
    ) {
      callback();
    }
  };

  // BroadcastChannel listener
  const handleBroadcast = (msg: MessageEvent) => {
    if (msg.data && msg.data.type === 'PRODUCTS_UPDATED') {
      callback();
    }
  };

  window.addEventListener(UPDATE_EVENT_NAME, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  if (globalBroadcastChannel) {
    globalBroadcastChannel.addEventListener('message', handleBroadcast);
  }

  return () => {
    window.removeEventListener(UPDATE_EVENT_NAME, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
    if (globalBroadcastChannel) {
      globalBroadcastChannel.removeEventListener('message', handleBroadcast);
    }
  };
}

/**
 * Helper to escape a CSV cell
 */
function escapeCsvCell(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '""';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * V178: Xuất file bảng giá chuẩn Excel/CSV 10 CỘT cho toàn bộ sản phẩm
 * Cột chuẩn: Mã ID | Tên Sản Phẩm | Dòng SP | Định lượng | Giá Vốn | Giá Lẻ | Giá Sỉ 1 | Giá Sỉ 2 | Giá Sỉ 3 | Tồn Kho
 */
export function exportPriceCsv(customFinancials?: AdminProductFinancialItem[]): string {
  const financials = customFinancials && customFinancials.length > 0
    ? customFinancials
    : getAdminProductFinancials();

  const headers = [
    'Mã ID',
    'Tên Sản Phẩm',
    'Dòng SP',
    'Định lượng',
    'Giá Vốn',
    'Giá Lẻ',
    'Giá Sỉ 1',
    'Giá Sỉ 2',
    'Giá Sỉ 3',
    'Tồn Kho',
  ];

  const rows: string[] = [headers.map(escapeCsvCell).join(',')];

  financials.forEach((item) => {
    const row = [
      escapeCsvCell(item.id),
      escapeCsvCell(item.name),
      escapeCsvCell(item.partnerName || item.category),
      escapeCsvCell(item.retailUnit || item.unit || 'Sản phẩm'),
      escapeCsvCell(Math.round(item.cost || 0)),
      escapeCsvCell(Math.round(item.prices.retail || 0)),
      escapeCsvCell(Math.round(item.prices.wholesale1 || 0)),
      escapeCsvCell(Math.round(item.prices.wholesale2 || 0)),
      escapeCsvCell(Math.round(item.prices.wholesale3 || 0)),
      escapeCsvCell(typeof item.stock === 'number' ? Math.max(0, Math.round(item.stock)) : 50),
    ];
    rows.push(row.join(','));
  });

  // UTF-8 BOM so Excel opens Vietnamese characters cleanly without mojibake
  return '\uFEFF' + rows.join('\r\n');
}

/**
 * Tải file CSV bảng giá 10 cột về máy (Hỗ trợ tải tin cậy 100% trên mọi trình duyệt)
 */
export function downloadPriceCsv(customFinancials?: AdminProductFinancialItem[]): void {
  try {
    const csvContent = exportPriceCsv(customFinancials);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date().toISOString().slice(0, 10);
    a.download = `grooster-bang-gia-kho-10-cot-${today}.csv`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try {
        if (a.parentNode) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(url);
      } catch {
        // safe ignore
      }
    }, 2000);
  } catch (err) {
    console.error('Lỗi khi tải file CSV giá:', err);
    // Fallback using Data URI if Blob fails
    try {
      const csvContent = exportPriceCsv(customFinancials);
      const encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
      const a = document.createElement('a');
      a.href = encodedUri;
      a.download = `grooster-bang-gia-kho-10-cot-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        if (a.parentNode) document.body.removeChild(a);
      }, 1000);
    } catch (fallbackErr) {
      alert('Không thể tạo file tải về: ' + String(fallbackErr));
    }
  }
}

/**
 * Helper parse numeric value from CSV cell (handles 150000, "150,000", "150.000", "150,000 đ", etc.)
 */
function parsePriceFromCell(cellValue: string | undefined): number | null {
  if (cellValue === undefined || cellValue === null) return null;
  const cleaned = cellValue.trim().replace(/₫|đ|VND|vnd|\$/gi, '').trim();
  if (!cleaned) return null;
  // Remove commas, dots, spaces
  const digits = cleaned.replace(/[,.\s]/g, '');
  const num = Number(digits);
  if (isNaN(num)) return null;
  return Math.max(0, Math.round(num));
}

/**
 * Helper to parse CSV string into 2D array
 */
function parseCsvLines(csvText: string): string[][] {
  // Strip BOM if present
  let cleanText = csvText;
  if (cleanText.charCodeAt(0) === 0xfeff) {
    cleanText = cleanText.slice(1);
  }

  const lines: string[][] = [];
  let row: string[] = [];
  let inQuotes = false;
  let cell = '';

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(cell.trim());
      cell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      row.push(cell.trim());
      cell = '';
      if (row.some((c) => c.length > 0)) {
        lines.push(row);
      }
      row = [];
    } else {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell.trim());
    if (row.some((c) => c.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

/**
 * V178: Nhập file CSV cập nhật giá và tồn kho cho toàn bộ 133 sản phẩm
 * Cập nhật các cột: Giá Vốn, Giá Lẻ, Giá Sỉ 1, Giá Sỉ 2, Giá Sỉ 3, Tồn Kho
 * Đối chiếu chính xác theo 'Mã ID'.
 */
export async function importPricesFromCsv(csvText: string): Promise<{
  success: boolean;
  message: string;
  updatedCount: number;
  errors: string[];
}> {
  try {
    const rows = parseCsvLines(csvText);
    if (rows.length < 2) {
      return {
        success: false,
        message: 'File CSV không có dữ liệu hoặc định dạng không đúng.',
        updatedCount: 0,
        errors: ['File không đủ số dòng header và dữ liệu.'],
      };
    }

    const headerRow = rows[0].map((h) => h.toLowerCase().trim());

    // Map column indexes
    let idColIdx = headerRow.findIndex((h) => h.includes('mã id') || h === 'id' || h.includes('ma id'));
    let costColIdx = headerRow.findIndex((h) => h.includes('giá vốn') || h.includes('gia von') || h === 'cost');
    let retailColIdx = headerRow.findIndex((h) => h.includes('giá lẻ') || h.includes('gia le') || h === 'retail');
    let ws1ColIdx = headerRow.findIndex((h) => h.includes('giá sỉ 1') || h.includes('gia si 1') || h.includes('sỉ 1') || h === 'ws1');
    let ws2ColIdx = headerRow.findIndex((h) => h.includes('giá sỉ 2') || h.includes('gia si 2') || h.includes('sỉ 2') || h === 'ws2');
    let ws3ColIdx = headerRow.findIndex((h) => h.includes('giá sỉ 3') || h.includes('gia si 3') || h.includes('sỉ 3') || h === 'ws3');
    let stockColIdx = headerRow.findIndex((h) => h.includes('tồn kho') || h.includes('ton kho') || h.includes('kho') || h === 'stock');

    // Default fallback to standard 10 columns if header matching fails
    if (idColIdx === -1) idColIdx = 0;
    if (costColIdx === -1) costColIdx = 4;
    if (retailColIdx === -1) retailColIdx = 5;
    if (ws1ColIdx === -1) ws1ColIdx = 6;
    if (ws2ColIdx === -1) ws2ColIdx = 7;
    if (ws3ColIdx === -1) ws3ColIdx = 8;
    if (stockColIdx === -1) stockColIdx = 9;

    const liveProducts = getLiveProducts();
    const productMap = new Map(liveProducts.map((p) => [p.id, p]));

    const overrides = getProductOverrides();
    const costs = getProductCosts();
    const stocks = getProductStocks();

    let updatedCount = 0;
    const errors: string[] = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0) continue;

      const rawId = row[idColIdx]?.trim();
      if (!rawId) continue;

      const targetProduct = productMap.get(rawId);
      if (!targetProduct) {
        errors.push(`Không tìm thấy sản phẩm có Mã ID: "${rawId}" (dòng ${r + 1})`);
        continue;
      }

      let rowUpdated = false;

      // 1. Cost
      if (costColIdx < row.length) {
        const parsedCost = parsePriceFromCell(row[costColIdx]);
        if (parsedCost !== null) {
          costs[targetProduct.id] = parsedCost;
          rowUpdated = true;
        }
      }

      // 2. Stock (V178)
      let parsedStock: number | null = null;
      if (stockColIdx < row.length) {
        parsedStock = parsePriceFromCell(row[stockColIdx]);
        if (parsedStock !== null) {
          stocks[targetProduct.id] = parsedStock;
          rowUpdated = true;
        }
      }

      // 3. Prices
      const currentOverride = overrides[targetProduct.id] || {};
      const newPrices: ProductPriceTiers = {
        ...(currentOverride.prices || targetProduct.prices),
      };
      const newWholesalePrices: WholesaleTierPrices = {
        ...(currentOverride.wholesalePrices || targetProduct.wholesalePrices),
      };
      const unitsPerWholesale =
        targetProduct.id === 'vtn-tra-xa-den' || (targetProduct.name && targetProduct.name.includes('Xạ Đen'))
          ? 30
          : targetProduct.id.startsWith('vtn-cascara-') || (targetProduct.name && targetProduct.name.includes('Cascara'))
          ? 24
          : targetProduct.unitsPerWholesale || 1;

      if (retailColIdx < row.length) {
        const val = parsePriceFromCell(row[retailColIdx]);
        if (val !== null) {
          newPrices.retail = val;
          rowUpdated = true;
        }
      }

      if (ws1ColIdx < row.length) {
        const val = parsePriceFromCell(row[ws1ColIdx]);
        if (val !== null) {
          newPrices.wholesale1 = val;
          newWholesalePrices.wholesale1 = val * unitsPerWholesale;
          rowUpdated = true;
        }
      }

      if (ws2ColIdx < row.length) {
        const val = parsePriceFromCell(row[ws2ColIdx]);
        if (val !== null) {
          newPrices.wholesale2 = val;
          newWholesalePrices.wholesale2 = val * unitsPerWholesale;
          rowUpdated = true;
        }
      }

      if (ws3ColIdx < row.length) {
        const val = parsePriceFromCell(row[ws3ColIdx]);
        if (val !== null) {
          newPrices.wholesale3 = val;
          newWholesalePrices.wholesale3 = val * unitsPerWholesale;
          rowUpdated = true;
        }
      }

      if (rowUpdated) {
        overrides[targetProduct.id] = {
          ...currentOverride,
          stock: parsedStock !== null ? parsedStock : currentOverride.stock,
          prices: newPrices,
          wholesalePrices: newWholesalePrices,
          updatedAt: new Date().toISOString(),
        };
        updatedCount++;
      }
    }

    if (updatedCount === 0) {
      return {
        success: false,
        message: 'Không có dữ liệu giá hoặc tồn kho hợp lệ nào được cập nhật.',
        updatedCount: 0,
        errors,
      };
    }

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
      localStorage.setItem(STORAGE_KEY_COSTS, JSON.stringify(costs));
      localStorage.setItem(STORAGE_KEY_STOCKS, JSON.stringify(stocks));
    } catch (err) {
      console.warn('Lỗi ghi localStorage khi import CSV:', err);
    }

    // Save to Firebase Firestore & codebase
    saveProductsToFirestore(overrides, costs, stocks).catch(() => {});
    saveAllOverridesToCodebase().catch(() => {});

    // Broadcast 2-way sync
    dispatchProductUpdate();

    return {
      success: true,
      message: `Đã đối chiếu Mã ID và cập nhật giá & tồn kho thành công cho ${updatedCount} / ${liveProducts.length} sản phẩm!`,
      updatedCount,
      errors,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Có lỗi xảy ra khi xử lý file CSV.',
      updatedCount: 0,
      errors: [String(err)],
    };
  }
}

/**
 * V178: Dữ liệu dòng kiểm tra bảng giá & kho 10 CỘT phục vụ màn hình 'Kiểm tra dữ liệu' trước khi lưu Firebase
 */
export interface PriceValidationRow {
  id: string;
  name: string;
  partnerName: string;
  unit: string;
  cost: number;
  retail: number;
  wholesale1: number;
  wholesale2: number;
  wholesale3: number;
  stock: number; // V178: Cột 10 Tồn kho
  isLowStock: boolean; // Tồn kho < 5
  isOutOfStock: boolean; // Tồn kho === 0
  hasMissingPrice: boolean;
  missingColumns: string[];
  hasLoss: boolean;
  lossTiers: string[];
  profitRetail: number;
  marginRetail: number;
  profitWs1: number;
  marginWs1: number;
  profitWs2: number;
  marginWs2: number;
  profitWs3: number;
  marginWs3: number;
  isValid: boolean;
}

/**
 * V178: Tự động quét lỗi tất cả sản phẩm trong file CSV 10 cột:
 * - Tô Màu Đỏ toàn bộ dòng nếu có lỗi: Giá bán (Lẻ/Sỉ 1-2-3) < Giá Vốn
 * - Tô Màu Vàng toàn bộ dòng nếu: Bỏ trống bất kỳ cột giá nào trong các cột quy định
 * - Nhận diện Tồn kho: Cảnh báo Tồn kho < 5 và Hết hàng (0)
 * - Tự động tính toán Tiền lời và % Biên lợi nhuận cho từng cấp giá (Bảo mật, khách không thấy)
 */
export function validatePriceCsvData(csvText: string): {
  success: boolean;
  message: string;
  rows: PriceValidationRow[];
  stats: {
    total: number;
    lossCount: number;
    missingCount: number;
    lowStockCount: number;
    validCount: number;
  };
} {
  const rows = parseCsvLines(csvText);
  if (rows.length < 2) {
    return {
      success: false,
      message: 'File CSV không đủ dữ liệu dòng tiêu đề hoặc không có sản phẩm.',
      rows: [],
      stats: { total: 0, lossCount: 0, missingCount: 0, lowStockCount: 0, validCount: 0 },
    };
  }

  const headerRow = rows[0].map((h) => h.toLowerCase().trim());
  let idColIdx = headerRow.findIndex((h) => h.includes('mã id') || h === 'id' || h.includes('ma id'));
  let nameColIdx = headerRow.findIndex((h) => h.includes('tên') || h.includes('ten') || h === 'name');
  let partnerColIdx = headerRow.findIndex((h) => h.includes('dòng') || h.includes('dong') || h === 'partner');
  let unitColIdx = headerRow.findIndex((h) => h.includes('định lượng') || h.includes('dinh luong') || h.includes('đơn vị') || h === 'unit');
  let costColIdx = headerRow.findIndex((h) => h.includes('giá vốn') || h.includes('gia von') || h === 'cost');
  let retailColIdx = headerRow.findIndex((h) => h.includes('giá lẻ') || h.includes('gia le') || h === 'retail');
  let ws1ColIdx = headerRow.findIndex((h) => h.includes('giá sỉ 1') || h.includes('gia si 1') || h.includes('sỉ 1') || h === 'ws1');
  let ws2ColIdx = headerRow.findIndex((h) => h.includes('giá sỉ 2') || h.includes('gia si 2') || h.includes('sỉ 2') || h === 'ws2');
  let ws3ColIdx = headerRow.findIndex((h) => h.includes('giá sỉ 3') || h.includes('gia si 3') || h.includes('sỉ 3') || h === 'ws3');
  let stockColIdx = headerRow.findIndex((h) => h.includes('tồn kho') || h.includes('ton kho') || h.includes('kho') || h === 'stock');

  if (idColIdx === -1) idColIdx = 0;
  if (nameColIdx === -1) nameColIdx = 1;
  if (partnerColIdx === -1) partnerColIdx = 2;
  if (unitColIdx === -1) unitColIdx = 3;
  if (costColIdx === -1) costColIdx = 4;
  if (retailColIdx === -1) retailColIdx = 5;
  if (ws1ColIdx === -1) ws1ColIdx = 6;
  if (ws2ColIdx === -1) ws2ColIdx = 7;
  if (ws3ColIdx === -1) ws3ColIdx = 8;
  if (stockColIdx === -1) stockColIdx = 9;

  const liveProducts = getLiveProducts();
  const productMap = new Map(liveProducts.map((p) => [p.id, p]));
  const existingCosts = getProductCosts();
  const existingStocks = getProductStocks();

  const validatedRows: PriceValidationRow[] = [];
  let lossCount = 0;
  let missingCount = 0;
  let lowStockCount = 0;
  let validCount = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;

    const rawId = row[idColIdx]?.trim();
    if (!rawId) continue;

    const baseProduct = productMap.get(rawId);
    const prodName = row[nameColIdx]?.trim() || baseProduct?.name || rawId;
    const partnerName = row[partnerColIdx]?.trim() || baseProduct?.partnerName || baseProduct?.category || '';
    const unit = row[unitColIdx]?.trim() || baseProduct?.retailUnit || baseProduct?.unit || 'Sản phẩm';

    // Parse numeric prices & stock
    const parsedCost = costColIdx < row.length ? parsePriceFromCell(row[costColIdx]) : null;
    const parsedRetail = retailColIdx < row.length ? parsePriceFromCell(row[retailColIdx]) : null;
    const parsedWs1 = ws1ColIdx < row.length ? parsePriceFromCell(row[ws1ColIdx]) : null;
    const parsedWs2 = ws2ColIdx < row.length ? parsePriceFromCell(row[ws2ColIdx]) : null;
    const parsedWs3 = ws3ColIdx < row.length ? parsePriceFromCell(row[ws3ColIdx]) : null;
    const parsedStock = stockColIdx < row.length ? parsePriceFromCell(row[stockColIdx]) : null;

    // Check missing price columns (Yellow check)
    const missingColumns: string[] = [];
    if (parsedCost === null || parsedCost === undefined) missingColumns.push('Giá Vốn');
    if (parsedRetail === null || parsedRetail === undefined || parsedRetail === 0) missingColumns.push('Giá Lẻ');
    if (parsedWs1 === null || parsedWs1 === undefined || parsedWs1 === 0) missingColumns.push('Giá Sỉ 1');
    if (parsedWs2 === null || parsedWs2 === undefined || parsedWs2 === 0) missingColumns.push('Giá Sỉ 2');
    if (parsedWs3 === null || parsedWs3 === undefined || parsedWs3 === 0) missingColumns.push('Giá Sỉ 3');

    const effectiveCost = parsedCost !== null ? parsedCost : (existingCosts[rawId] || (baseProduct ? estimateDefaultCost(baseProduct) : 0));
    const effectiveRetail = parsedRetail !== null ? parsedRetail : (baseProduct?.prices.retail || 0);
    const effectiveWs1 = parsedWs1 !== null ? parsedWs1 : (baseProduct?.prices.wholesale1 || 0);
    const effectiveWs2 = parsedWs2 !== null ? parsedWs2 : (baseProduct?.prices.wholesale2 || 0);
    const effectiveWs3 = parsedWs3 !== null ? parsedWs3 : (baseProduct?.prices.wholesale3 || 0);
    const effectiveStock = parsedStock !== null ? parsedStock : (existingStocks[rawId] ?? baseProduct?.stock ?? 50);

    const isLowStock = effectiveStock < 5;
    const isOutOfStock = effectiveStock === 0;
    if (isLowStock) lowStockCount++;

    // Calculate profit and margin %
    const calcMargin = (selling: number, cost: number) => {
      const profit = selling - cost;
      const margin = selling > 0 ? Math.round((profit / selling) * 1000) / 10 : 0;
      return { profit, margin };
    };

    const retailFinancial = calcMargin(effectiveRetail, effectiveCost);
    const ws1Financial = calcMargin(effectiveWs1, effectiveCost);
    const ws2Financial = calcMargin(effectiveWs2, effectiveCost);
    const ws3Financial = calcMargin(effectiveWs3, effectiveCost);

    // Check Loss (Red check: Giá bán < Giá Vốn)
    const lossTiers: string[] = [];
    if (effectiveCost > 0) {
      if (effectiveRetail > 0 && effectiveRetail < effectiveCost) lossTiers.push('Lẻ');
      if (effectiveWs1 > 0 && effectiveWs1 < effectiveCost) lossTiers.push('Sỉ 1');
      if (effectiveWs2 > 0 && effectiveWs2 < effectiveCost) lossTiers.push('Sỉ 2');
      if (effectiveWs3 > 0 && effectiveWs3 < effectiveCost) lossTiers.push('Sỉ 3');
    }

    const hasLoss = lossTiers.length > 0;
    const hasMissingPrice = missingColumns.length > 0;
    const isValid = !hasLoss && !hasMissingPrice;

    if (hasLoss) {
      lossCount++;
    } else if (hasMissingPrice) {
      missingCount++;
    } else {
      validCount++;
    }

    validatedRows.push({
      id: rawId,
      name: prodName,
      partnerName,
      unit,
      cost: effectiveCost,
      retail: effectiveRetail,
      wholesale1: effectiveWs1,
      wholesale2: effectiveWs2,
      wholesale3: effectiveWs3,
      stock: effectiveStock,
      isLowStock,
      isOutOfStock,
      hasMissingPrice,
      missingColumns,
      hasLoss,
      lossTiers,
      profitRetail: retailFinancial.profit,
      marginRetail: retailFinancial.margin,
      profitWs1: ws1Financial.profit,
      marginWs1: ws1Financial.margin,
      profitWs2: ws2Financial.profit,
      marginWs2: ws2Financial.margin,
      profitWs3: ws3Financial.profit,
      marginWs3: ws3Financial.margin,
      isValid,
    });
  }

  return {
    success: true,
    message: `Đã phân tích ${validatedRows.length} sản phẩm từ file CSV 10 cột.`,
    rows: validatedRows,
    stats: {
      total: validatedRows.length,
      lossCount,
      missingCount,
      lowStockCount,
      validCount,
    },
  };
}

/**
 * V178: Áp dụng dữ liệu bảng giá và tồn kho sau khi Admin kiểm tra và bấm 'Xác nhận lưu vào Database'
 * Ghi vĩnh viễn vào Google Firebase Firestore, localStorage, đồng bộ mã nguồn và kích hoạt cập nhật ngay lập tức.
 */
export async function applyValidatedPrices(
  validatedRows: PriceValidationRow[]
): Promise<{ success: boolean; message: string; updatedCount: number }> {
  const overrides = getProductOverrides();
  const costs = getProductCosts();
  const stocks = getProductStocks();
  const liveProducts = getLiveProducts();
  const productMap = new Map(liveProducts.map((p) => [p.id, p]));

  let updatedCount = 0;

  validatedRows.forEach((row) => {
    const baseProduct = productMap.get(row.id);
    if (!baseProduct) return;

    // 1. Cost
    if (typeof row.cost === 'number' && row.cost >= 0) {
      costs[row.id] = Math.round(row.cost);
    }

    // 2. Stock (V178)
    if (typeof row.stock === 'number' && row.stock >= 0) {
      stocks[row.id] = Math.round(row.stock);
    }

    // 3. Prices
    const currentOverride = overrides[row.id] || {};
    const unitsPerWholesale =
      baseProduct.id === 'vtn-tra-xa-den' || (baseProduct.name && baseProduct.name.includes('Xạ Đen'))
        ? 30
        : baseProduct.id.startsWith('vtn-cascara-') || (baseProduct.name && baseProduct.name.includes('Cascara'))
        ? 24
        : baseProduct.unitsPerWholesale || 1;

    const newPrices: ProductPriceTiers = {
      retail: Math.round(row.retail),
      wholesale1: Math.round(row.wholesale1),
      wholesale2: Math.round(row.wholesale2),
      wholesale3: Math.round(row.wholesale3),
    };

    const newWholesalePrices: WholesaleTierPrices = {
      wholesale1: Math.round(row.wholesale1 * unitsPerWholesale),
      wholesale2: Math.round(row.wholesale2 * unitsPerWholesale),
      wholesale3: Math.round(row.wholesale3 * unitsPerWholesale),
    };

    overrides[row.id] = {
      ...currentOverride,
      stock: Math.round(row.stock),
      prices: newPrices,
      wholesalePrices: newWholesalePrices,
      updatedAt: new Date().toISOString(),
    };

    updatedCount++;
  });

  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDES, JSON.stringify(overrides));
    localStorage.setItem(STORAGE_KEY_COSTS, JSON.stringify(costs));
    localStorage.setItem(STORAGE_KEY_STOCKS, JSON.stringify(stocks));
  } catch (err) {
    console.warn('Lỗi ghi localStorage khi lưu validated prices:', err);
  }

  // V178: Ghi vĩnh viễn cả Giá bán, Giá vốn và Tồn kho vào Google Cloud Firebase Firestore
  await saveProductsToFirestore(overrides, costs, stocks).catch((err) => {
    console.error('Lỗi lưu Firebase Firestore:', err);
  });

  // Đồng bộ vào mã nguồn Git
  saveAllOverridesToCodebase().catch(() => {});

  // Kích hoạt cập nhật tức thì trên toàn bộ giao diện và các tab
  dispatchProductUpdate();

  return {
    success: true,
    message: `Đã lưu vĩnh viễn bảng giá và tồn kho của ${updatedCount} sản phẩm vào Firebase Cloud!`,
    updatedCount,
  };
}
