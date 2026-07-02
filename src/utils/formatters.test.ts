import { describe, it, expect } from 'vitest';
import { formatFollowers, formatEngagementRate } from './formatters';

describe('formatters.ts', () => {
  describe('formatFollowers', () => {
    it('returns exact string for numbers under 1000', () => {
      expect(formatFollowers(0)).toBe('0');
      expect(formatFollowers(500)).toBe('500');
      expect(formatFollowers(999)).toBe('999');
    });

    it('formats thousands with K', () => {
      expect(formatFollowers(1000)).toBe('1.0K');
      expect(formatFollowers(1500)).toBe('1.5K');
      expect(formatFollowers(999000)).toBe('999.0K');
    });

    it('formats millions with M', () => {
      expect(formatFollowers(1000000)).toBe('1.0M');
      expect(formatFollowers(2500000)).toBe('2.5M');
      expect(formatFollowers(10500000)).toBe('10.5M');
    });
  });

  describe('formatEngagementRate', () => {
    it('returns N/A if undefined', () => {
      expect(formatEngagementRate(undefined)).toBe('N/A');
    });

    it('calculates the correct percentage', () => {
      // 0.05 is 5%
      expect(formatEngagementRate(0.05)).toBe('5.00%');
      // 0.125 is 12.5%
      expect(formatEngagementRate(0.125)).toBe('12.50%');
      // 1 is 100%
      expect(formatEngagementRate(1)).toBe('100.00%');
    });
  });
});
