import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import globalConfig from '../utils/GlobalConfig';

import {SubProduct, Product} from '../utils/canonicalModel'; // Adjust path

// The API response is an array of Product-like objects, which we'll treat as SubProducts
// Let's adjust SubProduct to better match the response if needed, or ensure Product type covers it.
// For now, assuming the response items can be mapped to your existing SubProduct type or Product type.
// If `SubProduct` is significantly different from `Product`, you might need a mapping function.

// Let's define what a sub-product means in the context of the API response.
// It seems the API returns full Product objects as variants.
export type ApiVariant = Product; // The API returns Product-like objects as variants

interface SubProductState {
  currentSubProducts: ApiVariant[]; // Store the variants as received
  loading: boolean;
  error: string | null;
  currentParentProductId: string | null;
}

const initialState: SubProductState = {
  currentSubProducts: [],
  loading: false,
  error: null,
  currentParentProductId: null,
};

export interface FetchSubProductsArgs {
  basicAuthToken: string; // e.g., "Basic cXZDYXN0bGVFbnRyeTpjYSR0bGVfUGVybWl0QDAx"
  vendorId: string;
  parentProductId: string;
}

export const fetchSubProducts = createAsyncThunk<
  ApiVariant[], // Return type is an array of these variant/product objects
  FetchSubProductsArgs,
  {rejectValue: string}
>(
  'subProducts/fetchSubProducts',
  async ({basicAuthToken, vendorId, parentProductId}, {rejectWithValue}) => {
    if (!basicAuthToken || !vendorId || !parentProductId) {
      return rejectWithValue(
        'Missing required parameters for fetching sub-products.',
      );
    }
    console.log(
      `Fetching sub-products for parentProductId: ${parentProductId} under vendorId: ${vendorId}`,
    );

    const endpoint = '/quickVerse/v2/subproducts';
    const url = `${globalConfig}${endpoint}`; // Use your configured API_BASE_URL

    try {
      const response = await axios.get<ApiVariant[]>(url, {
        // Expect an array of ApiVariant
        params: {
          vendorId: vendorId,
          productId: parentProductId, // API uses 'productId' for the parent here
        },
        headers: {
          Authorization: basicAuthToken, // Use Basic Auth
          // 'Content-Type': 'application/json' // Not strictly needed for GET
        },
      });

      // The response itself is expected to be the array of sub-products/variants
      if (response.data && Array.isArray(response.data)) {
        console.log(`Fetched ${response.data.length} sub-products/variants.`);
        // We need to ensure each variant has a distinguishable 'label' or 'id' for the modal
        // and a 'price'. The current response items have 'productId' as their unique ID
        // and 'title' (which might be same for all variants) and 'productSalePrice'.
        // We'll map them slightly to fit the SubProduct idea better, if SubProduct type requires it.
        // Or, if ApiVariant (which is Product) is directly usable, just return it.

        return response.data.map(variant => ({
          ...variant,
          id: variant.productId, // Use productId as the unique ID for the variant
          parentId: parentProductId, // Add parentId for reference
          label: variant.description || variant.title, // Try to find a distinguishing label
          // You might need more specific logic here
          // e.g., if description contains "Half" or "Full"
          price:
            parseFloat(variant.productSalePrice as any) ||
            parseFloat(variant.productPrice as any) ||
            0, // Ensure price is a number
          // discountedPrice: variant.productSalePrice !== variant.productPrice ? parseFloat(variant.productSalePrice as any) : undefined,
          // availability: variant.availability,
          // image: variant.productImageLink
        })) as SubProduct[]; // Cast to SubProduct[] if your SubProduct type is different
        // but for now, we'll assume ApiVariant[] is fine and SubProductModal can adapt
      } else {
        console.warn(
          'Sub-product API returned unexpected data structure:',
          response.data,
        );
        return rejectWithValue('Invalid data format for sub-products.');
      }
    } catch (error: any) {
      console.error(
        'fetchSubProducts Error:',
        error.response?.data || error.message || error,
      );
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch sub-products.';
      return rejectWithValue(message);
    }
  },
);

const subProductSlice = createSlice({
  name: 'subProducts',
  initialState,
  reducers: {
    clearSubProducts: state => {
      state.currentSubProducts = [];
      state.currentParentProductId = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSubProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentParentProductId = action.meta.arg.parentProductId;
        state.currentSubProducts = [];
      })
      .addCase(fetchSubProducts.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is now ApiVariant[] (or SubProduct[] after mapping)
        state.currentSubProducts = action.payload;
      })
      .addCase(fetchSubProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load variants.';
      });
  },
});

export const {clearSubProducts} = subProductSlice.actions;
export default subProductSlice.reducer;
