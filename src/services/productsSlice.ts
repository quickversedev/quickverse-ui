import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface BuyingOptions {
    singlePurchase: {
        availability: {
            inStock: boolean;
            buyable: boolean;
            limitedStock: boolean;
            isBuyable: boolean;
        };
    };
}

export interface Product {
    sku: string;
    barcodeID: string | null;
    name: string;
    mrp: number;
    sellingPrice: number;
    deactivated: boolean;
    gst: number | null;
    hsn: string | null;
    category: string;
    division: string;
    subDivision: string | null;
    brand: string | null;
    productAttributes: string[];
    asin: string | null;
    productDescription: string;
    productImageUrl: string;
    uom: string | null;
    additionalAttributes: string;
    buyingOptions: BuyingOptions;
    secondaryImageUrl: string | null;
    secondaryImagesUrlToDelete: string | null;
    imagesUrlToDeleteFromS3: string | null;
    discount: number;
    numberOfVariants: number;
    currentStock: number | null;
    primaryProductId: string;
    variantsDimensions: string[];
}

// Initial state
interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Products slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default productsSlice.reducer;
