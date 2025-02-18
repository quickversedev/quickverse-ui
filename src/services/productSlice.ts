import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../store/store';
import {mockProductData, Product} from '../data/mockProductData';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';

// Define the state interface
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state with mock data
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products from an API with a 1-second delay
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (vendorId: string) => {
    return new Promise<Product[]>(resolve => {
      setTimeout(() => {
        console.log('vendorId to fetch Product mock:', vendorId);
        resolve(mockProductData);
      }, 1000);
    });
  },
);
// const API_BASE_URL = `${globalConfig.apiBaseUrl}/v2/campus`;

// Async thunk to fetch products using Axios with campusId as a path param
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async ({vendorId}: {vendorId: string}, {rejectWithValue}) => {
//     try {
//       const token = await fetchToken();
//       const response = await axios.post<Product[]>(
//         `${API_BASE_URL}/${vendorId}/products`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//       return rejectWithValue('Failed to fetch products');
//     }
//   },
// );

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductLoading = (state: RootState) =>
  state.products.loading;
export const selectProductError = (state: RootState) => state.products.error;

export const {setProducts} = productSlice.actions;
export default productSlice.reducer;
