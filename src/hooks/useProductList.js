import { useState, useEffect } from 'react';
import { fetchClient } from '../utils/fetchClient';
import { cacheManager } from '../utils/cache';

/**
 * Hook to fetch and manage the product list with caching support
 * @param {number} page - The current page number
 * @param {number} limit - The number of products to fetch per page
 * @returns {Object} An object containing products, total count, loading state, error state, and cached status
 */
export const useProductList = (page, limit) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    const url = 'https://dummyjson.com/products?limit=' + limit + '&skip=' + (page - 1) * limit;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setIsCached(false);

      const cachedData = cacheManager.get(url);
      if (cachedData) {
        setData(cachedData);
        setIsCached(true);
        setLoading(false);

        return;
      }

      try {
        const result = await fetchClient.get(url);

        if (!result || !result.products) {
          setError('[Error] Invalid response from server');
          throw new Error('Invalid response from server');
        }

        setData({
          products: result.products,
          total: result.total
        });

        cacheManager.set(url, {
          products: result.products,
          total: result.total
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return { ...data, loading, error, isCached };
};