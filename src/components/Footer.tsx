import React from 'react';
import { PartnerId, ExchangeRateInfo, Language } from '../types';
import { SharedFooter } from './shared/SharedFooter';

export interface FooterProps {
  onSelectPartner: (partnerId: PartnerId) => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  rateInfo?: ExchangeRateInfo;
  language?: Language;
}

/**
 * Footer - Modern Premium B2B Footer
 * Re-exports and renders SharedFooter, ensuring unified architecture across themes.
 */
export const Footer: React.FC<FooterProps> = (props) => {
  return <SharedFooter {...props} />;
};

export { SharedFooter };
