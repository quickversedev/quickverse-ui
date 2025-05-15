// import {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   fetchProducts,
//   selectProducts,
//   selectProductLoading,
//   selectProductError,
// } from '../productSlice';
// import {
//   fetchCategories,
//   selectCategories,
//   selectCategoryLoading,
//   selectCategoryError,
// } from '../categorySlice';
// import {AppDispatch} from '../../store/store';
// import {Category, Product} from '../../utils/canonicalModel';

// interface UseFetchProductsAndCategoriesReturn {
//   products: Product[];
//   categories: Category[];
//   loading: boolean;
//   error: boolean;
// }

// export const useFetchProductsAndCategories = (
//   vendorId: string,
// ): UseFetchProductsAndCategoriesReturn => {
//   const dispatch = useDispatch<AppDispatch>();

//   const products = useSelector(selectProducts);
//   const categories = useSelector(selectCategories);
//   const productLoading = useSelector(selectProductLoading);
//   const categoryLoading = useSelector(selectCategoryLoading);
//   const productError = useSelector(selectProductError);
//   const categoryError = useSelector(selectCategoryError);

//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!vendorId) {
//         return;
//       }

//       setLoading(true);
//       setError(false);

//       try {
//         await Promise.all([
//           dispatch(fetchProducts({vendorId})),
//           dispatch(fetchCategories({vendorId})),
//         ]);
//       } catch (err) {
//         console.error('Error while fetching products or categories:', err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch, vendorId]);

//   useEffect(() => {
//     if (productError || categoryError) {
//       setError(true);
//     }
//   }, [productError, categoryError]);

//   return {
//     products,
//     categories,
//     loading: loading || productLoading || categoryLoading,
//     error,
//   };
// };
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
  loading: boolean;
  error: boolean;
  refetch: () => Promise<void>; // Add refetch function to return type
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
  const [error, setError] = useState<boolean>(false);

  // Create a refetch function that can be called manually
  const refetch = useCallback(async () => {
    if (!vendorId) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
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

  useEffect(() => {
    refetch(); // Initial fetch
  }, [refetch]);

  useEffect(() => {
    if (productError || categoryError) {
      setError(true);
    }
  }, [productError, categoryError]);

  return {
    products,
    categories,
    loading: loading || productLoading || categoryLoading,
    error,
    refetch, // Return the refetch function
  };
};
