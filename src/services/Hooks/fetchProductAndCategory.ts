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
import {Category} from '../../data/mockCategoriesData';
import {Product} from '../../data/mockProductData';
import {AppDispatch} from '../../store/store';

interface UseFetchProductsAndCategoriesReturn {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const useFetchProductsAndCategories =
  (): UseFetchProductsAndCategoriesReturn => {
    const dispatch = useDispatch<AppDispatch>();

    // Fetch selectors
    const products = useSelector(selectProducts);
    const categories = useSelector(selectCategories);
    const productLoading = useSelector(selectProductLoading);
    const categoryLoading = useSelector(selectCategoryLoading);
    const productError = useSelector(selectProductError);
    const categoryError = useSelector(selectCategoryError);

    // Combined loading and error states
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // console.log('products', products);
    useEffect(() => {
      // Dispatch both fetch actions
      const fetchData = async () => {
        setLoading(true);
        await Promise.all([
          dispatch(fetchProducts()),
          dispatch(fetchCategories()),
        ]);
        setLoading(false);
      };

      fetchData().catch(() => setError('Failed to fetch data.'));
    }, [dispatch]);

    useEffect(() => {
      // Check for errors from either API
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
// Remove these placeholder functions as the actual implementations are imported from the store
