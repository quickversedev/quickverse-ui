import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import globalConfig from '../../utils/GlobalConfig';
import {Product} from '../../utils/canonicalModel';

interface UseProductsProps {
  vendorId: string;
  productId: string;
}

export const useProducts = ({vendorId, productId}: UseProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log('useProducts hook initialized with vendorId:', vendorId);
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v2/subproducts`,
        {
          params: {
            vendorId,
            productId,
          },
          headers: {
            Authorization: 'Basic cXZDYXN0bGVFbnRyeTpjYSR0bGVfUGVybWl0QDAx',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(
        'Fetched products::::::::::::::::::::::::::::',
        response.data,
      );
      setProducts(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [vendorId, productId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {products, loading, error, refetch: fetchProducts};
};
