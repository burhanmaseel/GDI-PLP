
class CacheManager {
    constructor(ttlSeconds = 30) {
        this.cache = new Map();
        this.ttl = ttlSeconds * 1000; // Convert to milliseconds
    }

    set(key, value) {
        const expiry = Date.now() + this.ttl;
        this.cache.set(key, { value, expiry });
    }

    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        if (Date.now() > cached.expiry) {
            this.cache.delete(key);
            return null;
        }

        return cached.value;
    }

    has(key) {
        const cached = this.cache.get(key);
        if (!cached) return false;

        if (Date.now() > cached.expiry) {
            this.cache.delete(key);
            return false;
        }

        return true;
    }

    clear() {
        this.cache.clear();
    }
}

export const cacheManager = new CacheManager(30);
