import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'; // Ensure these hooks are set up for your Redux store
import {
  fetchProducts,
  selectProducts,
  selectProductLoading,
  selectProductError,
} from '../productSlice'; // Update paths as necessary
import {
  fetchCategories,
  selectCategories,
  selectCategoryLoading,
  selectCategoryError,
} from '../categorySlice';
import {AppDispatch} from '../../store/store';
import {Category, Product} from '../../utils/canonicalModel';

interface UseFetchProductsAndCategoriesReturn {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useFetchProductsAndCategories = (
  vendorId: string,
): UseFetchProductsAndCategoriesReturn => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const productLoading = useSelector(selectProductLoading);
  const categoryLoading = useSelector(selectCategoryLoading);
  const productError = useSelector(selectProductError);
  const categoryError = useSelector(selectCategoryError);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!vendorId) {
        return;
      }
      setLoading(true);
      await Promise.all([
        dispatch(fetchProducts(vendorId)),
        dispatch(fetchCategories(vendorId)),
      ]);
      setLoading(false);
    };

    fetchData().catch(() => setError('Failed to fetch data.'));
  }, [dispatch, vendorId]);

  useEffect(() => {
    if (productError || categoryError) {
      setError(productError || categoryError);
    }
  }, [productError, categoryError]);

  return {
    products,
    categories,
    loading: loading || productLoading || categoryLoading,
    error,
  };
};
