import { useState, useEffect } from 'react';
import { fetchClient } from '../utils/fetchClient';
import { cacheManager } from '../utils/cache';

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
        setError('[Error] Failed to load products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return { ...data, loading, error, isCached };
};