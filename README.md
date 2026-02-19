# GDI - Dummy PLP Task

A paginated Product Listing Page (PLP) built with React. It fetches products from the [DummyJSON API](https://dummyjson.com/products) and uses a client-side in-memory cache to avoid redundant network requests when navigating between pages.

### Setup

#### Prerequisites
- Node.js (v18+)
- npm

#### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Run unit tests**
   ```bash
   npm run test
   ```

### Architectural Decisions

The project follows a **separation of concerns** pattern, keeping data-fetching logic, UI components, and utility modules in distinct layers

**Key decisions:**

- **Custom hook (`useProductList`):** Encapsulates all data-fetching and caching logic so `App.jsx` stays clean and declarative. It exposes `{ products, total, loading, error, isCached }`.
- **Class-based utilities:** `CacheManager` and `FetchClient` are implemented as classes and exported as singletons (`cacheManager`, `fetchClient`). This makes them easy to mock in tests and reuse across the app without re-instantiation.
- **URL as cache key:** The full paginated API URL (e.g. `https://dummyjson.com/products?limit=16&skip=0`) is used as the cache key, making it naturally unique per page and limit combination.
- **AbortController:** Used to cancel the fetch request when the component unmounts or when the page changes, preventing race conditions and unnecessary network requests.
- **Vite + React:** Chosen for fast HMR during development and a minimal, modern project setup.

### State and Cache Management Explanation

#### State (`useProductList` hook)

State variable Purpose
- **data:** Holds `{ products, total }` for the current page
- **loading:** `true` while a http request is in process
- **error:** Stores an error message string if the request fails
- **isCached:** `true` when the current page is served from cache

On every `page` or `limit` change, the hook:
1. Sets `loading = true` and clears any previous error.
2. Checks the cache for the current URL key.
3. **If found in cache:** immediately populates state from cache, sets `isCached = true`, skips the http call.
4. **If not found in cache:** calls `fetchClient.get(url)`, stores the result in the cache, then updates state.

#### Cache (`CacheManager`)

- **Storage:** JavaScript `Map` keyed by URL string.
- **TTL**: Each entry stores its value alongside an `expiry` timestamp (`Date.now() + ttl`). The default TTL is **30 seconds**.
- **Lazy expiry**: Stale entries are only evicted when accessed (`get` / `has`), keeping the implementation simple with no background timers.
- **CacheManager Available Methods**: `set(key, value)`, `get(key)`, `has(key)`, `clear()`.
- **"Cached Page"** badge is shown in the header whenever `isCached` is `true`, giving the user a clear visual signal that no external request was made for the current page.

### Tradeoffs and Assumptions

- **Cache storage** In-memory `Map` Fast and zero-dependency, but cache is lost on page refresh. It can be improved by adding a `localStorage` cache would persist across sessions at the cost of added complexity.
- **Cache TTL** 30 seconds hardcoded. A config constant or environment variable could make this more flexible.
- **Lazy eviction** Expired entries removed on access No memory overhead from timers, but stale entries linger in the `Map` until they are next accessed. Acceptable for this scale.
- **Pagination style** Previous / Next only Simpler UX; no direct page-number jumping. Sufficient for a task scope but could be extended with numbered page buttons.
- **Page size** Fixed at 16 products Hardcoded in `App.jsx`. Could be made user-configurable (e.g. a dropdown) without changing the hook or cache logic.
- **Error handling** Error message rendered in place of the product grid Keeps the UI simple. A retry button would improve the experience in production.
