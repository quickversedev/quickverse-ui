// src/redux/slices/productSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, mockProductData } from '../data/mockProductData'; // Import the Product type and mocked product data

// Simulating an API call with a delay
export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    return new Promise<Product[]>(resolve => {
      setTimeout(() => {
        resolve(mockProductData); // Resolve with mocked data
      }, 1000); // 1 second delay
    });
  }
);

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

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
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Populate products with fetched data
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
