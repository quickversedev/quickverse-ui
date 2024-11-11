import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {LaundryProduct} from '../utils/canonicalModel';
import {mockProducts} from '../data/laundry';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';

export const fetchLaundryProductsList = createAsyncThunk<LaundryProduct[]>(
  'laundryProductList/fetchLaundryProductList',
  async () => {
    const token = fetchToken();
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockProducts;
    } catch (error) {
      throw new Error('Failed to fetch LaundryProducts');
    }
  },
);

const LaundryProductsListSlice = createSlice({
  name: 'laundryProductList',
  initialState: {
    LaundryProducts: [] as LaundryProduct[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLaundryProductsList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLaundryProductsList.fulfilled, (state, action) => {
        state.loading = false;
        state.LaundryProducts = action.payload;
      })
      .addCase(fetchLaundryProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch LaundryProducts';
      });
  },
});

export default LaundryProductsListSlice.reducer;
