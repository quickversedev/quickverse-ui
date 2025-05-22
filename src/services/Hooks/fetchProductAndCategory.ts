import {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProducts,
  selectProducts,
  selectProductLoading,
  selectProductError,
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
  loading: boolean; // Overall loading state
  productsLoading: boolean; // Products-specific loading
  categoriesLoading: boolean; // Categories-specific loading
  error: boolean;
  refetch: () => Promise<void>;
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
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const refetch = useCallback(async () => {
    if (!vendorId) return;

    setLoading(true);
    setError(false);
    setProductsLoading(true);
    setCategoriesLoading(true);

    try {
      // Start both requests
      const productsPromise = dispatch(fetchProducts({vendorId}));
      const categoriesPromise = dispatch(fetchCategories({vendorId}));

      // Wait for both to complete
      await Promise.all([productsPromise, categoriesPromise]);
    } catch (err) {
      console.error('Error while fetching products or categories:', err);
      setError(true);
    } finally {
      // The individual loading states will be updated by the Redux slices
      // We'll handle the overall loading state in the effect below
    }
  }, [dispatch, vendorId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Update loading states based on Redux state
  useEffect(() => {
    // Products have finished loading
    if (!productLoading) {
      setProductsLoading(false);
      console.log('Products loaded:', products.length);
    }

    // Categories have finished loading
    if (!categoryLoading) {
      setCategoriesLoading(false);
      console.log('Categories loaded:', categories.length);
    }

    // Overall loading is complete when both are done
    if (!productLoading && !categoryLoading) {
      setLoading(false);
      console.log('All data loaded');
    }
  }, [productLoading, categoryLoading, products.length, categories.length]);

  useEffect(() => {
    if (productError || categoryError) {
      setError(true);
      setLoading(false);
      setProductsLoading(false);
      setCategoriesLoading(false);
    }
  }, [productError, categoryError]);

  return {
    products,
    categories,
    loading,
    productsLoading,
    categoriesLoading,
    error,
    refetch,
  };
};
