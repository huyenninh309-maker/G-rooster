import { useState, useEffect, useCallback } from 'react';
import { ExchangeRateInfo } from '../types';
import {
  getCachedExchangeRate,
  fetchLiveExchangeRate,
  FALLBACK_USD_RATE,
} from '../services/exchangeRate';
import { setGlobalExchangeRate } from '../utils/pricing';

export function useLiveExchangeRate() {
  const [rateInfo, setRateInfo] = useState<ExchangeRateInfo>(() => {
    const initial = getCachedExchangeRate();
    setGlobalExchangeRate(initial.rate);
    return initial;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadExchangeRate = useCallback(async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const live = await fetchLiveExchangeRate();
      setRateInfo(live);
      setGlobalExchangeRate(live.rate);
    } catch (e) {
      console.warn('Failed to load exchange rate, using fallback:', e);
      // Ensure fallback rate is active
      const fallback = getCachedExchangeRate();
      setRateInfo(fallback);
      setGlobalExchangeRate(fallback.rate);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch on mount
    loadExchangeRate(false);

    // Auto-refresh when user reconnects to internet
    const handleOnline = () => {
      console.log('Network is back online, refreshing exchange rate...');
      loadExchangeRate(false);
    };

    window.addEventListener('online', handleOnline);

    // Periodic refresh every 30 minutes
    const interval = setInterval(() => {
      loadExchangeRate(false);
    }, 30 * 60 * 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      clearInterval(interval);
    };
  }, [loadExchangeRate]);

  return {
    exchangeRate: rateInfo.rate,
    rateInfo,
    isLoading,
    isRefreshing,
    refreshRate: () => loadExchangeRate(true),
    fallbackRate: FALLBACK_USD_RATE,
  };
}
