import { CacheManager } from '../utils/cache.js';

describe('CacheManager', () => {
    let cache;

    beforeEach(() => {
        cache = new CacheManager(30);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('stores a value and retrieves it', () => {
        cache.set('dummyURL1', { id: 1, name: 'Widget' });
        expect(cache.get('dummyURL1')).toEqual({ id: 1, name: 'Widget' });
    });

    it('returns null for a key that was never set', () => {
        expect(cache.get('dummyURL2')).toBeNull();
    });

    it('returns null after the TTL has expired', () => {
        cache.set('dummyURL3', 'some data');

        jest.advanceTimersByTime(31_000);

        expect(cache.get('dummyURL3')).toBeNull();
    });

    it('still returns data when the TTL has NOT yet expired', () => {
        cache.set('dummyURL4', 'non-expired data');

        jest.advanceTimersByTime(29_000);

        expect(cache.get('dummyURL4')).toBe('non-expired data');
    });

    it('has() returns true for a valid, unexpired entry', () => {
        cache.set('dummyURL5', 42);
        expect(cache.has('dummyURL5')).toBe(true);
    });

    it('has() returns false for an expired entry', () => {
        cache.set('dummyURL6', 42);
        jest.advanceTimersByTime(31_000);
        expect(cache.has('dummyURL6')).toBe(false);
    });

    it('has() returns false for a key that does not exist', () => {
        expect(cache.has('dummyURL7')).toBe(false);
    });

    it('clear() removes all entries', () => {
        cache.set('dummyURL8', 1);
        cache.set('dummyURL9', 2);
        cache.clear();

        expect(cache.get('dummyURL8')).toBeNull();
        expect(cache.get('dummyURL9')).toBeNull();
    });

    it('overwrites an existing entry with a fresh timestamp', () => {
        cache.set('dummyURL10', 'old value');

        jest.advanceTimersByTime(28_000);
        cache.set('dummyURL10', 'new value');

        jest.advanceTimersByTime(28_000);

        expect(cache.get('dummyURL10')).toBe('new value');
    });

    it('respects a custom TTL passed to the constructor', () => {
        const shortCache = new CacheManager(5);
        shortCache.set('dummyURL11', 'data');

        jest.advanceTimersByTime(6_000);

        expect(shortCache.get('dummyURL11')).toBeNull();
    });
});
