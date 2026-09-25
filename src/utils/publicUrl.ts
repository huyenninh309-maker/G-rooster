import { Product, Recipe } from '../types';
import { RECIPES } from '../data/recipes';

export const OFFICIAL_BASE_URL = 'https://g-rooster.com';
const STORAGE_KEY = 'grooster_public_url';

/**
 * Returns the official base URL for QR codes and deep links.
 * 
 * V151 USER MANDATE:
 * Thiết lập địa chỉ gốc (Base URL) của toàn bộ website là: https://g-rooster.com.
 * Cập nhật toàn bộ hệ thống Mã QR: Khi khách quét mã trên bất kỳ sản phẩm nào,
 * hệ thống phải dẫn trực tiếp về link chính chủ: https://g-rooster.com/...
 */
export function getPublicBaseUrl(): string {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim().startsWith('http') && !saved.includes('chutchiu')) {
        return saved.trim().replace(/\/+$/, '');
      }
    } catch {
      // ignore
    }
  }

  // Official production domain for all QR codes and deep links
  return OFFICIAL_BASE_URL;
}

/**
 * Save user custom domain or deployment URL
 */
export function setPublicBaseUrl(url: string): void {
  if (typeof window === 'undefined') return;
  try {
    const cleanUrl = url.trim().replace(/\/+$/, '');
    if (cleanUrl) {
      localStorage.setItem(STORAGE_KEY, cleanUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    // Notify all listening components
    window.dispatchEvent(new Event('chutchiu_public_url_changed'));
  } catch (e) {
    console.warn('Could not save public base URL:', e);
  }
}

/**
 * Reset public base URL to default current window.location.origin
 */
export function resetToCurrentOrigin(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('chutchiu_public_url_changed'));
  } catch (e) {
    console.warn('Could not reset public base URL:', e);
  }
}

/**
 * Check if the user has configured a custom override URL
 */
export function isCustomDomainConfigured(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return Boolean(saved && saved.trim().startsWith('http'));
  } catch {
    return false;
  }
}

/**
 * Check if the site is currently running on an internal dev / sandbox environment
 */
export function isRunningInDevSandbox(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return hostname.includes('ais-dev-') || hostname === 'localhost' || hostname === '127.0.0.1';
}

/**
 * Finds the official Barista Recipe ("Công thức pha chế") associated with a product.
 * Used to ensure 100% of products map directly to a step-by-step beverage or culinary recipe.
 */
export function findRecipeForProduct(product: {
  id: string;
  name?: string;
  partnerId?: string;
}): Recipe {
  // 1. Direct match in recipe.productIds
  const direct = RECIPES.find((r) => r.productIds && r.productIds.includes(product.id));
  if (direct) return direct;

  // 2. Direct match in recipe.ingredients
  const byIngredient = RECIPES.find((r) =>
    r.ingredients && r.ingredients.some((ing) => ing.productId === product.id)
  );
  if (byIngredient) return byIngredient;

  // 3. Keyword matching based on product name
  const pName = (product.name || '').toLowerCase();
  const partnerRecipes = RECIPES.filter((r) => r.partnerId === product.partnerId);
  const searchPool = partnerRecipes.length > 0 ? partnerRecipes : RECIPES;

  if (pName.includes('xạ đen')) {
    const r = RECIPES.find((item) => item.title.toLowerCase().includes('xạ đen'));
    if (r) return r;
  }
  if (pName.includes('nước cốt') || pName.includes('cốt quả')) {
    const r = RECIPES.find(
      (item) => item.title.toLowerCase().includes('cốt quả') || item.id === 'recipe-nuoc-cot-ca-phe-coldbrew'
    );
    if (r) return r;
  }
  if (pName.includes('mía')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('mía'));
    if (r) return r;
  }
  if (pName.includes('matcha')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('matcha'));
    if (r) return r;
  }
  if (pName.includes('cascara')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('cascara'));
    if (r) return r;
  }
  if (pName.includes('sâm dây') || pName.includes('sâm')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('sâm'));
    if (r) return r;
  }
  if (pName.includes('mật ong')) {
    const r = searchPool.find(
      (item) =>
        item.title.toLowerCase().includes('mật ong') ||
        item.ingredients?.some((i) => i.name.toLowerCase().includes('mật ong'))
    );
    if (r) return r;
  }
  if (pName.includes('hoa cúc')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('hoa cúc'));
    if (r) return r;
  }
  if (pName.includes('khổ qua')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('khổ qua'));
    if (r) return r;
  }
  if (pName.includes('giảo cổ lam')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('giảo cổ lam'));
    if (r) return r;
  }
  if (pName.includes('robusta')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('robusta'));
    if (r) return r;
  }
  if (pName.includes('arabica')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('arabica'));
    if (r) return r;
  }
  if (pName.includes('vanilla') || pName.includes('vani')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('vanilla'));
    if (r) return r;
  }
  if (pName.includes('coconut') || pName.includes('dừa')) {
    const r = searchPool.find(
      (item) =>
        item.title.toLowerCase().includes('coconut') || item.title.toLowerCase().includes('dừa')
    );
    if (r) return r;
  }
  if (pName.includes('caramel')) {
    const r = searchPool.find((item) => item.title.toLowerCase().includes('caramel'));
    if (r) return r;
  }
  if (pName.includes('socola') || pName.includes('cacao') || product.partnerId === 'socola-qua-tang') {
    const r = RECIPES.find((item) => item.partnerId === 'socola-qua-tang') || searchPool[0];
    if (r) return r;
  }

  return partnerRecipes[0] || RECIPES[0];
}

/**
 * Returns the matching recipe for a product, used by UI components to display
 * the targeted recipe name directly in the QR modal.
 */
export function getProductTargetRecipe(product: {
  id: string;
  name?: string;
  partnerId?: string;
  barcode?: string;
}): Recipe {
  return findRecipeForProduct(product);
}

/**
 * Generates the standard URL for a product QR Code.
 * 
 * DIRECT USER MANDATE:
 * "Đảm bảo khi quét mã QR trên sản phẩm nào thì phải dẫn đúng về trang 'Công thức pha chế' của sản phẩm đó."
 * Scanning the product's QR code leads directly to the Barista Recipe ("Công thức pha chế")
 * of that specific product!
 */
export function getProductQrUrl(product: {
  id: string;
  name?: string;
  partnerId?: string;
  barcode?: string;
}): string {
  const base = getPublicBaseUrl();
  const recipe = findRecipeForProduct(product);
  return `${base}/recipe/${encodeURIComponent(recipe.id)}`;
}

/**
 * Generates the standard URL for a recipe QR Code
 */
export function getRecipeQrUrl(recipe: { id: string }): string {
  const base = getPublicBaseUrl();
  return `${base}/recipe/${encodeURIComponent(recipe.id)}`;
}

