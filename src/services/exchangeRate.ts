import { ExchangeRateInfo } from '../types';

export const FALLBACK_USD_RATE = 26125;
const STORAGE_KEY = 'chutchiu_usd_exchange_rate';
const CACHE_MAX_AGE_MS = 6 * 60 * 60 * 1000; // 6 hours

// Format date to local Vietnamese string
export function formatRateTimestamp(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'Vừa cập nhật';
    return d.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return 'Vừa cập nhật';
  }
}

// Read cached exchange rate if available and not expired
export function getCachedExchangeRate(): ExchangeRateInfo {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed: ExchangeRateInfo = JSON.parse(cached);
      if (parsed && typeof parsed.rate === 'number' && parsed.rate > 15000 && parsed.rate < 40000) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading cached exchange rate:', e);
  }

  return {
    rate: FALLBACK_USD_RATE,
    provider: 'Dự phòng Offline (26.125 VND)',
    timestamp: new Date().toISOString(),
    isLive: false,
    lastUpdatedFormatted: formatRateTimestamp(new Date().toISOString()),
  };
}

// Fetch exchange rate with timeout
async function fetchWithTimeout(url: string, timeoutMs = 6000): Promise<any> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} from ${url}`);
    }
    return await response.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

/**
 * Fetch live USD/VND exchange rate from reliable Currency APIs:
 * 1. Primary: open.er-api.com (open, CORS-enabled, real-time rates)
 * 2. Secondary backup: api.exchangerate-api.com
 * 3. Fallback: 26,125 VND when offline or error occurs
 */
export async function fetchLiveExchangeRate(): Promise<ExchangeRateInfo> {
  // Check offline first
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.log('Browser is offline, using fallback rate:', FALLBACK_USD_RATE);
    const fallback = getCachedExchangeRate();
    return {
      ...fallback,
      provider: 'Ngoại tuyến (Dự phòng 26.125 VND)',
      isLive: false,
    };
  }

  // 1. Try Primary Open Currency API
  try {
    const data = await fetchWithTimeout('https://open.er-api.com/v6/latest/USD', 5000);
    const vndRate = data?.rates?.VND;
    if (typeof vndRate === 'number' && vndRate > 15000 && vndRate < 40000) {
      const rateInfo: ExchangeRateInfo = {
        rate: Math.round(vndRate),
        provider: 'Open Exchange API (Trực tiếp)',
        timestamp: data.time_last_update_utc || new Date().toISOString(),
        isLive: true,
        lastUpdatedFormatted: formatRateTimestamp(new Date().toISOString()),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rateInfo));
      } catch (e) {
        console.warn('Cannot persist rate to localStorage:', e);
      }
      return rateInfo;
    }
  } catch (primaryErr) {
    console.warn('Primary exchange rate API failed, attempting secondary API:', primaryErr);
  }

  // 2. Try Secondary Backup Currency API
  try {
    const data = await fetchWithTimeout('https://api.exchangerate-api.com/v4/latest/USD', 5000);
    const vndRate = data?.rates?.VND;
    if (typeof vndRate === 'number' && vndRate > 15000 && vndRate < 40000) {
      const rateInfo: ExchangeRateInfo = {
        rate: Math.round(vndRate),
        provider: 'ExchangeRate API v4 (Dự phòng trực tiếp)',
        timestamp: new Date().toISOString(),
        isLive: true,
        lastUpdatedFormatted: formatRateTimestamp(new Date().toISOString()),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rateInfo));
      } catch (e) {
        console.warn('Cannot persist rate to localStorage:', e);
      }
      return rateInfo;
    }
  } catch (secondaryErr) {
    console.warn('Secondary exchange rate API failed:', secondaryErr);
  }

  // 3. Fallback to cached rate or default fallback rate 26,125
  const fallback = getCachedExchangeRate();
  return {
    ...fallback,
    provider: 'Dự phòng Hệ Thống (26.125 VND)',
    isLive: false,
  };
}
