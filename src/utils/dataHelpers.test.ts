import { describe, it, expect } from 'vitest';
import { filterProfiles } from './dataHelpers';
import type { UserProfileSummary } from '@/types';

describe('dataHelpers.ts', () => {
  describe('filterProfiles', () => {
    const mockProfiles: UserProfileSummary[] = [
      {
        user_id: '1',
        username: 'mrbeast',
        fullname: 'Jimmy Donaldson',
        picture: '',
        is_verified: true,
        followers: 1000,
      },
      {
        user_id: '2',
        username: 'tseries',
        fullname: 'T-Series',
        picture: '',
        is_verified: true,
        followers: 2000,
      }
    ];

    it('returns all profiles when query is empty', () => {
      expect(filterProfiles(mockProfiles, '')).toEqual(mockProfiles);
    });

    it('returns all profiles when query is whitespace only', () => {
      // The current implementation might actually fail this if it doesn't trim!
      // Let's test the expected behavior as requested by the user:
      // "whitespace-only query is treated as empty"
      expect(filterProfiles(mockProfiles, '   ')).toEqual(mockProfiles);
    });

    it('matches username case-insensitively', () => {
      const result = filterProfiles(mockProfiles, 'MrBeASt');
      expect(result.length).toBe(1);
      expect(result[0].username).toBe('mrbeast');
    });

    it('matches fullname case-insensitively', () => {
      const result = filterProfiles(mockProfiles, 'jimmY doNaldson');
      expect(result.length).toBe(1);
      expect(result[0].fullname).toBe('Jimmy Donaldson');
    });

    it('returns empty array when no matches found', () => {
      const result = filterProfiles(mockProfiles, 'pewdiepie');
      expect(result).toEqual([]);
    });
  });
});
