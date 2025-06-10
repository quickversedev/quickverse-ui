import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';
import {Product} from '../utils/canonicalModel';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  isComplete: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  isComplete: false,
};

const API_BASE_URL = `${globalConfig.apiBaseUrl}/v2/campus`;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({vendorId}: {vendorId: string}, {rejectWithValue, dispatch}) => {
    try {
      const token = await fetchToken();
      let allProducts: Product[] = [];
      let offset = 0;
      const limit = 50;
      let hasMore = true;
      const MAX_ITERATIONS = 30;
      let iteration = 0;
      console.log('Fetching products for vendor:', vendorId);
      // Clear existing products before new fetch
      dispatch(productSlice.actions.clearProducts());
      dispatch(productSlice.actions.setComplete(false));

      while (hasMore && iteration < MAX_ITERATIONS) {
        iteration++;

        const response = await axios.post<any>(
          `${API_BASE_URL}/${vendorId}/products`,
          {offset},
          {headers: {Authorization: token}},
        );

        const productsBatch = response.data?.products?.product || [];

        // Dispatch incremental update
        dispatch(productSlice.actions.appendProducts(productsBatch));

        allProducts = [...allProducts, ...productsBatch];
        console.log(
          `Fetched ${productsBatch.length} products, total: ${allProducts.length}`,
        );
        if (productsBatch.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }

      return allProducts;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return rejectWithValue('Failed to fetch products');
    }
  },
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    appendProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [...state.products, ...action.payload];
    },
    clearProducts: state => {
      state.products = [];
    },
    setComplete: (state, action: PayloadAction<boolean>) => {
      state.isComplete = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
        state.isComplete = false;
      })
      .addCase(fetchProducts.fulfilled, state => {
        state.loading = false;
        state.isComplete = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isComplete = false;
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductLoading = (state: RootState) =>
  state.products.loading;
export const selectProductError = (state: RootState) => state.products.error;
export const selectProductComplete = (state: RootState) =>
  state.products.isComplete;

export const {setProducts, appendProducts, clearProducts, setComplete} =
  productSlice.actions;
export default productSlice.reducer;
