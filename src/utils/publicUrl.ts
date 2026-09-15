import { Product, Recipe } from '../types';

const STORAGE_KEY = 'chutchiu_public_url';

/**
 * Returns the effective base URL for generating QR codes and deep links.
 * 
 * Logic:
 * 1. User manual override stored in localStorage (e.g. your custom Vercel / Netlify domain)
 * 2. Vite environment variable: VITE_PUBLIC_URL if configured
 * 3. Default: Strictly use window.location.origin (current website origin).
 *    Never forcibly replace with ais-pre- which returns 404 if not published.
 */
export function getPublicBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'https://chutchiu.vn';
  }

  // 1. Check custom user override in localStorage (e.g. Vercel, Netlify, custom domain)
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.trim().startsWith('http')) {
      return saved.trim().replace(/\/+$/, '');
    }
  } catch (e) {
    // localStorage may fail in restricted environments
  }

  // 2. Check environment variable if configured in Vercel/Netlify
  const envUrl = (import.meta as any).env?.VITE_PUBLIC_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().startsWith('http')) {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // 3. Current active origin (e.g. when opened in a new window tab or on deployed host)
  return window.location.origin.replace(/\/+$/, '');
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
 * Generates the standard URL for a product QR Code
 */
export function getProductQrUrl(product: { id: string; barcode?: string; partnerId?: string }): string {
  const base = getPublicBaseUrl();
  return `${base}/product/${encodeURIComponent(product.id)}`;
}

/**
 * Generates the standard URL for a recipe QR Code
 */
export function getRecipeQrUrl(recipe: { id: string }): string {
  const base = getPublicBaseUrl();
  return `${base}/recipe/${encodeURIComponent(recipe.id)}`;
}
