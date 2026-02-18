/**
 * Simple in-memory cache manager with TTL (Time To Live) functionality.
 * This can be used to cache API responses or any data that needs to be stored temporarily.
 */
class CacheManager {
    constructor(ttlSeconds = 30) {
        this.cache = new Map();
        this.ttl = ttlSeconds * 1000; // Convert to milliseconds
    }

    /**
     * Cache setter with TTL. Stores the value along with its expiry time.
     * @param {string} key - The key to identify the cached value.
     * @param {*} value - The value to be cached.
     */
    set(key, value) {
        const expiry = Date.now() + this.ttl;
        this.cache.set(key, { value, expiry });
    }

    /**
     * Retrieves a cached value if it exists and is not expired.
     * @param {string} key - The key to retrieve the cached value.
     * @returns {*} The cached value or null if not found or expired.
     */
    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        if (Date.now() > cached.expiry) {
            this.cache.delete(key);
            return null;
        }

        return cached.value;
    }

    /**
     * Checks if a key exists in the cache and is not expired.
     * @param {string} key - The key to check in the cache.
     * @returns {boolean} Whether the key exists in cache and is not expired.
     */
    has(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;

        if (Date.now() > cached.expiry) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }

    /**
     * Clears all entries from the cache. Useful for resetting the cache state.
     */
    clear() {
        this.cache.clear();
    }
}

// Export the CacheManager class for unit tests
export { CacheManager };

// Export a singleton instance for use in the app
export const cacheManager = new CacheManager(30);
