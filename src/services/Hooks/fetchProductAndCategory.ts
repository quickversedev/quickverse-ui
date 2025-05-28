import {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProducts,
  selectProducts,
  selectProductLoading,
  selectProductError,
  selectProductComplete,
  productSlice,
} from '../productSlice';
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
  productsLoading: boolean;
  categoriesLoading: boolean;
  productsComplete: boolean;
  categoriesComplete: boolean;
  error: boolean;
  refetch: () => Promise<void>;
}

export const useFetchProductsAndCategories = (
  vendorId: string,
): UseFetchProductsAndCategoriesReturn => {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const productLoading = useSelector(selectProductLoading);
  const categoryLoading = useSelector(selectCategoryLoading);
  const productError = useSelector(selectProductError);
  const categoryError = useSelector(selectCategoryError);
  const productsComplete = useSelector(selectProductComplete);

  // Local state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    if (!vendorId) return;

    setLoading(true);
    setError(false);

    try {
      // Reset complete states
      dispatch(productSlice.actions.setComplete(false));

      // Start both requests in parallel
      await Promise.all([
        dispatch(fetchProducts({vendorId})),
        dispatch(fetchCategories({vendorId})),
      ]);
    } catch (err) {
      console.error('Error while fetching products or categories:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [dispatch, vendorId]);

  // Initial fetch
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Error handling
  useEffect(() => {
    if (productError || categoryError) {
      setError(true);
    }
  }, [productError, categoryError]);

  return {
    products,
    categories,
    loading,
    productsLoading: productLoading,
    categoriesLoading: categoryLoading,
    productsComplete,
    categoriesComplete: !categoryLoading, // Assuming no partial loading for categories
    error,
    refetch,
  };
};
