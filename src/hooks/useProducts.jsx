
import { useState, useEffect } from 'react';
import { getProducts } from '../api/product';

export function useProducts(params = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts(params);
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [JSON.stringify(params)]); // Re-fetch when params change

  return { products, loading, error };
}
