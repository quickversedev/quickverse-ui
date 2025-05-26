import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {SubProduct} from '../utils/canonicalModel'; // Assuming types are here

// Expected API response for fetching sub-products
// IMPORTANT: Adjust this based on your actual API!
export interface FetchSubProductsApiResponse {
  subProducts: SubProduct[];
  // Or whatever structure your API returns
}

interface SubProductState {
  currentSubProducts: SubProduct[];
  loading: boolean;
  error: string | null;
  currentParentProductId: string | null; // To know which product's variants are loaded
}

const initialState: SubProductState = {
  currentSubProducts: [],
  loading: false,
  error: null,
  currentParentProductId: null,
};

// --- Thunk Args (assuming you need auth and product ID) ---
export interface FetchSubProductsArgs {
  authData: string | undefined;
  vendorId: string;
  parentProductId: string;
}

// --- Async Thunk for Fetching Sub-Products ---
export const fetchSubProducts = createAsyncThunk<
  SubProduct[], // Return type
  FetchSubProductsArgs,
  {rejectValue: string}
>(
  'subProducts/fetchSubProducts',
  async ({authData, vendorId, parentProductId}, {rejectWithValue}) => {
    if (!authData || !vendorId || !parentProductId) {
      return rejectWithValue(
        'Missing required parameters for fetching sub-products.',
      );
    }
    console.log(`Fetching sub-products for productId: ${parentProductId}`);
    try {
      // === IMPORTANT: Replace with your ACTUAL API endpoint for sub-products ===
      // This is a GUESS based on common patterns.
      const response = await axios.get<FetchSubProductsApiResponse>(
        `${globalConfig.apiBaseUrl}/v2/products/${parentProductId}/subProducts`, // EXAMPLE ENDPOINT
        {
          params: {vendorId},
          headers: {SessionKey: authData},
        },
      );

      if (response.data && Array.isArray(response.data.subProducts)) {
        return response.data.subProducts;
      } else {
        // --- MOCK IMPLEMENTATION (Remove when API is ready) ---
        console.warn(
          'MOCK: Sub-product API not implemented or returned unexpected data. Using mock sub-products.',
        );
        await new Promise(res => setTimeout(res, 700)); // Simulate delay
        const mockSubProducts: SubProduct[] = [
          {
            id: `${parentProductId}-s`,
            parentId: parentProductId,
            label: 'Small',
            price: 90,
            availability: true,
            image: 'https://via.placeholder.com/50/FF0000/FFFFFF?Text=S',
          },
          {
            id: `${parentProductId}-m`,
            parentId: parentProductId,
            label: 'Medium',
            price: 100,
            availability: true,
            image: 'https://via.placeholder.com/50/00FF00/FFFFFF?Text=M',
          },
          {
            id: `${parentProductId}-l`,
            parentId: parentProductId,
            label: 'Large',
            price: 110,
            availability: false,
            image: 'https://via.placeholder.com/50/0000FF/FFFFFF?Text=L',
          },
        ];
        return mockSubProducts;
        // --- END MOCK ---
        // return rejectWithValue('Invalid data format for sub-products.');
      }
    } catch (error: any) {
      console.error(
        'fetchSubProducts Error:',
        error.response?.data || error.message,
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
        state.currentParentProductId = action.meta.arg.parentProductId; // Store which product we are fetching for
        state.currentSubProducts = []; // Clear previous sub-products
      })
      .addCase(fetchSubProducts.fulfilled, (state, action) => {
        state.loading = false;
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
