import React from 'react';
import { Currency, PartnerId, ExchangeRateInfo, Language } from '../types';
import { SharedHeader } from './shared/SharedHeader';

export interface NavbarProps {
  currency: Currency;
  onToggleCurrency: (newCurrency: Currency) => void;
  language?: Language;
  onToggleLanguage?: (newLang: Language) => void;
  cartCount: number;
  onOpenCart: () => void;
  selectedPartner: PartnerId | 'all';
  onSelectPartner: (partner: PartnerId | 'all') => void;
  onScrollToSection: (sectionId: string) => void;
  rateInfo?: ExchangeRateInfo;
  onRefreshRate?: () => void;
  isRefreshing?: boolean;
  onOpenAdmin?: () => void;
}

/**
 * Navbar - Modern Premium B2B Header
 * Re-exports and renders SharedHeader, ensuring unified architecture across themes.
 */
export const Navbar: React.FC<NavbarProps> = (props) => {
  return <SharedHeader {...props} />;
};

export { SharedHeader };
