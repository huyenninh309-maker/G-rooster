import { Product, Recipe } from '../types';
import { RECIPES } from '../data/recipes';

const STORAGE_KEY = 'chutchiu_public_url';

/**
 * Returns the dynamic active base URL for QR codes and deep links.
 * 
 * DIRECT USER MANDATE:
 * Never hardcode 'chutchiu.vn' or any static domain.
 * Dynamically extract from the current active browser location (window.location.origin / window.location.href).
 * - When opened on Vercel (https://xyz.vercel.app), QR codes point to Vercel.
 * - When changed to custom domain (https://chutchiu.vn), QR codes point to chutchiu.vn.
 * - In local / dev sandbox / preview new tab, QR codes point to that exact active origin.
 */
export function getPublicBaseUrl(): string {
  if (typeof window === 'undefined' || !window.location) {
    return '';
  }

  // Purge any stale legacy 'chutchiu_public_url' in localStorage that forced chutchiu.vn in the past
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      if (saved.includes('chutchiu.vn') && !window.location.hostname.includes('chutchiu.vn')) {
        // Automatically purge stale chutchiu.vn so it doesn't break Vercel / dev links
        localStorage.removeItem(STORAGE_KEY);
      } else if (saved.trim().startsWith('http')) {
        return saved.trim().replace(/\/+$/, '');
      }
    }
  } catch (e) {
    // ignore
  }

  // Dynamic extraction from active browser location (window.location.origin / host)
  const currentOrigin =
    window.location.origin ||
    `${window.location.protocol}//${window.location.host}`;

  if (currentOrigin && !currentOrigin.includes('undefined') && !currentOrigin.includes('null')) {
    return currentOrigin.replace(/\/+$/, '');
  }

  return '';
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

