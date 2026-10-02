import type React from 'react';
import { Product } from '../types';

/**
 * HỆ THỐNG KIỂM SOÁT HÌNH ẢNH THÔNG MINH (V177)
 * G-ROOSTER CO.,LTD - CHẤT LƯỢNG NGUYÊN BẢN
 */

export const G_ROOSTER_LOGO_URL = 'https://i.postimg.cc/5y1LQRxR/Gemini-Generated-Image-bnvr0bnvr0bnvr0b.png';

/**
 * CƠ CHẾ HÌNH ẢNH DỰ PHÒNG (FALLBACK LUXURY G-ROOSTER - YÊU CẦU V177):
 * • Tuyệt đối không để hiện biểu tượng ảnh vỡ.
 * • Tự động thay thế bằng tấm ảnh placeholder sang trọng có Logo G-ROOSTER
 *   kèm dòng chữ: 'G-ROOSTER: Sản phẩm đang cập nhật hình ảnh'.
 * • Sử dụng SVG Data URI nguyên bản 100% không phụ thuộc mạng bên ngoài,
 *   kết hợp nền xanh ngọc lục bảo sang trọng, viền chỉ vàng hoàng gia và tem logo G-ROOSTER.
 */
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="100%" height="100%">
  <defs>
    <radialGradient id="luxBg" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#142c1e"/>
      <stop offset="60%" stop-color="#09170f"/>
      <stop offset="100%" stop-color="#040b07"/>
    </radialGradient>
    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCE79F"/>
      <stop offset="45%" stop-color="#E2B755"/>
      <stop offset="75%" stop-color="#C59632"/>
      <stop offset="100%" stop-color="#8F6418"/>
    </linearGradient>
    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFF4B8"/>
      <stop offset="50%" stop-color="#F0CE68"/>
      <stop offset="100%" stop-color="#D9A83E"/>
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Deep luxury emerald dark background -->
  <rect width="800" height="800" fill="url(#luxBg)"/>

  <!-- Subtle radial glow behind emblem -->
  <circle cx="400" cy="270" r="140" fill="#E2B755" opacity="0.10" filter="url(#softGlow)"/>

  <!-- Luxury double gold ornamental border -->
  <rect x="28" y="28" width="744" height="744" rx="28" fill="none" stroke="url(#goldBorder)" stroke-width="2.5" stroke-opacity="0.45"/>
  <rect x="42" y="42" width="716" height="716" rx="20" fill="none" stroke="url(#goldBorder)" stroke-width="1" stroke-opacity="0.25"/>

  <!-- Corner jewel accents -->
  <circle cx="42" cy="42" r="4" fill="#F0CE68" opacity="0.8"/>
  <circle cx="758" cy="42" r="4" fill="#F0CE68" opacity="0.8"/>
  <circle cx="42" cy="758" r="4" fill="#F0CE68" opacity="0.8"/>
  <circle cx="758" cy="758" r="4" fill="#F0CE68" opacity="0.8"/>

  <!-- Built-in Golden Rooster Crest Silhouette (Renders instantly even offline) -->
  <g transform="translate(400, 260) scale(0.9)" opacity="0.22">
    <path d="M-45,-70 C-30,-95 -10,-95 0,-85 C10,-95 30,-95 45,-70 C60,-40 55,-10 35,25 C15,60 0,75 0,75 C0,75 -15,60 -35,25 C-55,-10 -60,-40 -45,-70 Z" fill="url(#goldBorder)"/>
  </g>

  <!-- Official Brand Logo Image -->
  <image href="https://i.postimg.cc/5y1LQRxR/Gemini-Generated-Image-bnvr0bnvr0bnvr0b.png" x="270" y="150" width="260" height="230" preserveAspectRatio="xMidYMid meet"/>

  <!-- Brand Title -->
  <text x="400" y="450" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="34" font-weight="900" fill="url(#goldText)" letter-spacing="4">G-ROOSTER</text>
  
  <rect x="330" y="475" width="140" height="2.5" fill="url(#goldBorder)" rx="1.5" opacity="0.85"/>

  <!-- Exact Required Fallback Banner (V177) -->
  <text x="400" y="535" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="23" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">
    G-ROOSTER: Sản phẩm đang cập nhật hình ảnh
  </text>

  <!-- Subtitle Tagline & Trust -->
  <text x="400" y="580" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#A8C4B3" letter-spacing="1.5">
    ĐẶC SẢN NGUYÊN BẢN • AN TÂM CHẤT LƯỢNG
  </text>

  <!-- Service note -->
  <text x="400" y="625" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#71917E">
    Hệ thống đang đồng bộ kho ảnh • Hotline/Zalo: 098.338.8139
  </text>
</svg>`;

export const G_ROOSTER_FALLBACK_IMAGE = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(FALLBACK_SVG)}`;

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
