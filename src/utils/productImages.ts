import type React from 'react';
import { Product } from '../types';

/**
 * HỆ THỐNG KIỂM SOÁT HÌNH ẢNH THÔNG MINH (V177)
 * G-ROOSTER CO.,LTD - CHẤT LƯỢNG NGUYÊN BẢN
 */

export const G_ROOSTER_LOGO_URL = 'https://i.postimg.cc/nVQYfXPT/logo-g-rooster-v5-3d.png';
export const G_ROOSTER_LOGO_V3_LOCAL = '/logo-grooster-v3.png';

/**
 * CƠ CHẾ ẢNH CHỜ THƯƠNG HIỆU SANG TRỌNG (BRANDED PLACEHOLDER - YÊU CẦU V254):
 * • Đối với sản phẩm chưa có ảnh: Tuyệt đối KHÔNG hiển thị icon "ảnh bị vỡ".
 * • Logo G-ROOSTER v3 (trong suốt) đặt trên một nền gradient xám nhạt sang trọng.
 * • Dòng chữ nhỏ tinh tế bên dưới: "Hình ảnh đang cập nhật..." & "Product image updating...".
 * • 1:1 Aspect ratio chuẩn (800x800).
 */
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <linearGradient id="luxGrayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="30%" stop-color="#F8F9FA"/>
      <stop offset="65%" stop-color="#EEF1F4"/>
      <stop offset="100%" stop-color="#E2E6EA"/>
    </linearGradient>
    <radialGradient id="centerHighlight" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#F1F3F5" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#E5E8EB" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="subtleBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5E7EB"/>
      <stop offset="50%" stop-color="#D1D5DB"/>
      <stop offset="100%" stop-color="#9CA3AF"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- Luxury Light Gray Gradient Background -->
  <rect width="800" height="800" fill="url(#luxGrayGrad)"/>
  <circle cx="400" cy="320" r="280" fill="url(#centerHighlight)"/>

  <!-- Elegant Architectural Double Borders -->
  <rect x="24" y="24" width="752" height="752" rx="32" fill="none" stroke="url(#subtleBorder)" stroke-width="2" stroke-opacity="0.8"/>
  <rect x="36" y="36" width="728" height="728" rx="24" fill="none" stroke="#E5E7EB" stroke-width="1" stroke-opacity="0.6"/>

  <!-- Corner refined dots -->
  <circle cx="36" cy="36" r="3.5" fill="#9CA3AF" opacity="0.6"/>
  <circle cx="764" cy="36" r="3.5" fill="#9CA3AF" opacity="0.6"/>
  <circle cx="36" cy="764" r="3.5" fill="#9CA3AF" opacity="0.6"/>
  <circle cx="764" cy="764" r="3.5" fill="#9CA3AF" opacity="0.6"/>

  <!-- Center subtle rooster crest silhouette -->
  <g transform="translate(400, 275) scale(0.9)" opacity="0.08">
    <path d="M-50,-80 C-30,-110 -10,-110 0,-95 C10,-110 30,-110 50,-80 C70,-45 60,-10 40,30 C20,70 0,85 0,85 C0,85 -20,70 -40,30 C-60,-10 -70,-45 -50,-80 Z" fill="#1E293B"/>
  </g>

  <!-- Official Transparent G-ROOSTER v3 Logo (with local & web resolution) -->
  <g filter="url(#softShadow)">
    <image href="/logo-grooster-v3.png" x="260" y="150" width="280" height="250" preserveAspectRatio="xMidYMid meet"/>
  </g>

  <!-- Brand Typography -->
  <text x="400" y="475" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#1E293B" letter-spacing="4">G-ROOSTER</text>
  
  <rect x="340" y="495" width="120" height="2" fill="#CBD5E1" rx="1"/>

  <!-- V254 Primary Required Label: "Hình ảnh đang cập nhật..." -->
  <text x="400" y="555" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#475569" letter-spacing="0.5">
    Hình ảnh đang cập nhật...
  </text>

  <!-- V254 Secondary Subtitle: "Product image updating..." -->
  <text x="400" y="595" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#94A3B8" letter-spacing="1">
    Product image updating...
  </text>

  <!-- Quality Assurance Tagline -->
  <text x="400" y="650" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#64748B" letter-spacing="1.5">
    CHẤT LƯỢNG NGUYÊN BẢN • AN TÂM NGUỒN GỐC
  </text>
</svg>`;

export const G_ROOSTER_FALLBACK_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(FALLBACK_SVG)}`;
export const BRANDED_PLACEHOLDER_DATA_URI = G_ROOSTER_FALLBACK_IMAGE;

/**
 * V254: Kiểm tra một sản phẩm có đang ở trạng thái CHƯA CÓ ẢNH thực tế hay không
 * Trả về true nếu là 115 sản phẩm mới chưa tải ảnh lên hoặc chưa có hình thực tế
 */
export function isProductImageMissing(product?: { image?: string; isCustomImage?: boolean } | null): boolean {
  if (!product) return true;
  if (product.isCustomImage) return false;
  if (!product.image || typeof product.image !== 'string') return true;
  const img = product.image.trim().toLowerCase();
  if (!img) return true;
  if (
    img.includes('logo-g-rooster') ||
    img.includes('logo-grooster') ||
    img.includes('fallback') ||
    img.includes('placeholder') ||
    img.startsWith('data:image/svg')
  ) {
    return true;
  }
  return false;
}

/**
 * V254: Kiểm tra một sản phẩm ĐÃ CÓ ảnh thực tế chất lượng cao
 */
export function hasRealProductImage(product?: { image?: string; isCustomImage?: boolean } | null): boolean {
  return !isProductImageMissing(product);
}

/**
 * V254: Trả về URL ảnh hiển thị chuẩn hoặc placeholder cho sản phẩm
 */
export function getProductDisplayImage(product: Product): string {
  if (isProductImageMissing(product)) {
    return G_ROOSTER_FALLBACK_IMAGE;
  }
  return product.image;
}

/**
 * Quản lý danh sách ID sản phẩm bị lỗi link ảnh (In-memory + LocalStorage)
 */
const STORAGE_KEY = 'grooster_broken_image_ids_v177';
let brokenImageSet = new Set<string>();

// Khởi tạo từ LocalStorage nếu có
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      brokenImageSet = new Set(parsed);
    }
  }
} catch {
  // Bỏ qua nếu môi trường không hỗ trợ localStorage
}

type HealthListener = (brokenIds: Set<string>) => void;
const listeners = new Set<HealthListener>();

function notifyListeners() {
  const clone = new Set(brokenImageSet);
  listeners.forEach((fn) => {
    try {
      fn(clone);
    } catch (err) {
      console.error('Error in broken image listener:', err);
    }
  });
}

function persistBrokenImages() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(brokenImageSet)));
  } catch {
    // Bỏ qua
  }
}

export function getBrokenImageIds(): Set<string> {
  return new Set(brokenImageSet);
}

export function isProductImageBroken(productId: string): boolean {
  return brokenImageSet.has(productId);
}

export function markProductImageBroken(productId: string, _reason?: string) {
  if (!productId) return;
  if (!brokenImageSet.has(productId)) {
    brokenImageSet.add(productId);
    persistBrokenImages();
    notifyListeners();
  }
}

export function markProductImageHealthy(productId: string) {
  if (!productId) return;
  if (brokenImageSet.has(productId)) {
    brokenImageSet.delete(productId);
    persistBrokenImages();
    notifyListeners();
  }
}

export function clearAllBrokenImages() {
  brokenImageSet.clear();
  persistBrokenImages();
  notifyListeners();
}

export function subscribeToImageHealth(listener: HealthListener): () => void {
  listeners.add(listener);
  // Gọi ngay lập tức với trạng thái hiện tại
  listener(new Set(brokenImageSet));
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Xử lý sự kiện lỗi ảnh (onError) cho tất cả các thẻ <img> trên website:
 * 1. Tự động thay thế bằng ảnh placeholder sang trọng G-ROOSTER.
 * 2. Tuyệt đối không hiện icon ảnh vỡ.
 * 3. Tự động đánh dấu sản phẩm bị lỗi để trang Admin hiển thị cảnh báo.
 */
export function handleProductImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  productId?: string
) {
  const target = e.currentTarget;
  if (target.src !== G_ROOSTER_FALLBACK_IMAGE) {
    target.src = G_ROOSTER_FALLBACK_IMAGE;
  }
  if (productId) {
    markProductImageBroken(productId, 'Ảnh kích hoạt onError');
  }
}

/**
 * Kiểm tra tính khả dụng của một đường link ảnh đơn lẻ (Image URL validation)
 * Trả về true nếu ảnh tải thành công, false nếu 404 hoặc không hiển thị được
 */
export function validateImageUrl(url: string, timeoutMs = 7000): Promise<boolean> {
  return new Promise((resolve) => {
    if (!url || typeof url !== 'string' || !url.trim()) {
      resolve(false);
      return;
    }

    const trimmed = url.trim();

    // Data URI hoặc ảnh nội bộ luôn hợp lệ
    if (trimmed.startsWith('data:image/') || trimmed.startsWith('/')) {
      resolve(true);
      return;
    }

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      resolve(false);
      return;
    }

    const img = new Image();
    let isFinished = false;

    const timer = setTimeout(() => {
      if (!isFinished) {
        isFinished = true;
        img.onload = null;
        img.onerror = null;
        resolve(false);
      }
    }, timeoutMs);

    img.onload = () => {
      if (!isFinished) {
        isFinished = true;
        clearTimeout(timer);
        // Kiểm tra kích thước tự nhiên để loại trừ các trang 404 trả về HTML rỗng
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    };

    img.onerror = () => {
      if (!isFinished) {
        isFinished = true;
        clearTimeout(timer);
        resolve(false);
      }
    };

    img.src = trimmed;
  });
}

/**
 * TÍNH NĂNG TỰ ĐỘNG QUÉT LỖI TOÀN BỘ LINK ẢNH (AUTO-CHECK - YÊU CẦU V177)
 * Quét toàn bộ danh sách sản phẩm theo lô (concurrency pool) để không làm lag giao diện
 */
export async function runAutoCheckAllImages(
  products: Product[],
  onProgress?: (current: number, total: number, brokenCount: number) => void
): Promise<Set<string>> {
  if (!products || products.length === 0) {
    return new Set(brokenImageSet);
  }

  const total = products.length;
  let scanned = 0;
  const newlyBroken = new Set<string>();

  // Kích thước lô kiểm tra đồng thời (concurrency)
  const CONCURRENCY = 6;
  const queue = [...products];

  const worker = async () => {
    while (queue.length > 0) {
      const product = queue.shift();
      if (!product) break;

      const isValid = await validateImageUrl(product.image, 6000);
      if (!isValid) {
        newlyBroken.add(product.id);
        markProductImageBroken(product.id, 'Auto-Check phát hiện link 404/lỗi');
      } else {
        markProductImageHealthy(product.id);
      }

      scanned++;
      if (onProgress) {
        onProgress(scanned, total, brokenImageSet.size);
      }
    }
  };

  const workers = Array.from({ length: Math.min(CONCURRENCY, total) }, () => worker());
  await Promise.all(workers);

  return new Set(brokenImageSet);
}

/**
 * ĐỐI SOÁT HÌNH ẢNH CHÍNH XÁC & BẢO TOÀN TÍNH TOÀN VẸN (V144):
 * Mặc định: Sản phẩm chỉ có 01 ảnh bao bì thực tế chính hãng
 */
export function getProductImages(product: Product): string[] {
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const list = product.images.filter((img) => img && typeof img === 'string' && img.trim() !== '');
    const unique = Array.from(new Set(list));
    if (unique.length > 0) {
      return unique;
    }
  }

  return [product.image];
}
