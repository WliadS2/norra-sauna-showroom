import { describe, it, expect } from 'vitest';
import {
  calculateConfigPrice,
  formatCHF,
  DEFAULT_CONFIG,
  SaunaConfig,
} from '@/types/configurator';

describe('NØRRA Configurator Pricing & Formatting', () => {
  it('calculates default configuration base price correctly', () => {
    const price = calculateConfigPrice(DEFAULT_CONFIG);
    // Standard size base = 10490, all default options are 0 delta
    expect(price).toBe(10490);
  });

  it('calculates grand size with custom finishes correctly', () => {
    const customConfig: SaunaConfig = {
      size: 'grand', // 14990
      exterior: 'natural-thermowood', // +450
      interior: 'cedar-natural', // +1200
      glazing: 'corner-panorama', // +1850
      heater: 'wood-burning', // +2400
      lighting: 'interior-warm',
    };

    const price = calculateConfigPrice(customConfig);
    expect(price).toBe(14990 + 450 + 1200 + 1850 + 2400); // 20890
  });

  it('formats Swiss currency according to de-CH standard', () => {
    const formatted = formatCHF(10490);
    expect(formatted).toMatch(/CHF\s+10['\s.]490/);
  });
});
