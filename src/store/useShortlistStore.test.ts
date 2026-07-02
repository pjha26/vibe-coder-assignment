import { describe, it, expect, beforeEach } from 'vitest';
import { useShortlistStore } from './useShortlistStore';
import type { UserProfileSummary } from '@/types';

describe('useShortlistStore', () => {
  const mockProfile1: UserProfileSummary = {
    user_id: '1',
    username: 'user1',
    fullname: 'User One',
    picture: '',
    is_verified: false,
    followers: 100,
  };

  const mockProfile2: UserProfileSummary = {
    user_id: '2',
    username: 'user2',
    fullname: 'User Two',
    picture: '',
    is_verified: true,
    followers: 200,
  };

  beforeEach(() => {
    // Clear store before each test
    useShortlistStore.getState().clear();
  });

  it('adding a profile adds it to the list', () => {
    useShortlistStore.getState().addProfile(mockProfile1);
    const shortlisted = useShortlistStore.getState().shortlisted;
    expect(shortlisted.length).toBe(1);
    expect(shortlisted[0].user_id).toBe('1');
    expect(useShortlistStore.getState().isShortlisted('1')).toBe(true);
  });

  it('adding the same profile twice does not create a duplicate', () => {
    useShortlistStore.getState().addProfile(mockProfile1);
    useShortlistStore.getState().addProfile(mockProfile1);
    const shortlisted = useShortlistStore.getState().shortlisted;
    expect(shortlisted.length).toBe(1);
  });

  it('removing a profile removes only that one', () => {
    useShortlistStore.getState().addProfile(mockProfile1);
    useShortlistStore.getState().addProfile(mockProfile2);
    
    useShortlistStore.getState().removeProfile('1');
    const shortlisted = useShortlistStore.getState().shortlisted;
    
    expect(shortlisted.length).toBe(1);
    expect(shortlisted[0].user_id).toBe('2');
  });

  it('toggleProfile correctly adds when absent and removes when present', () => {
    useShortlistStore.getState().toggleProfile(mockProfile1);
    expect(useShortlistStore.getState().isShortlisted('1')).toBe(true);
    
    useShortlistStore.getState().toggleProfile(mockProfile1);
    expect(useShortlistStore.getState().isShortlisted('1')).toBe(false);
    expect(useShortlistStore.getState().shortlisted.length).toBe(0);
  });

  it('clear empties the list', () => {
    useShortlistStore.getState().addProfile(mockProfile1);
    useShortlistStore.getState().addProfile(mockProfile2);
    expect(useShortlistStore.getState().shortlisted.length).toBe(2);
    
    useShortlistStore.getState().clear();
    expect(useShortlistStore.getState().shortlisted.length).toBe(0);
  });
});
