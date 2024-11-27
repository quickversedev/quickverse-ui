import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../data/mockProductData';
import { mockProductData } from '../data/mockProductData';
import { RootState } from '../store/store';

// Define the state interface
interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

// Initial state with mock data
const initialState: ProductState = {
    products: mockProductData,
    loading: false,
    error: null,
};

// Helper function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Async thunk to fetch products from an API with a 1-second delay
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            // Add a 1-second delay
            await delay(1000);

            const response = await fetch('https://api.example.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: Product[] = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch products');
        }
    }
);

// Product slice
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Selectors
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductLoading = (state: RootState) => state.products.loading;
export const selectProductError = (state: RootState) => state.products.error;

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
