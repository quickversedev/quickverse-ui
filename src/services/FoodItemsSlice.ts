import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {FoodItem} from '../utils/canonicalModel';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';
import {mockProductData, Product} from '../data/mockProductData';

// export const fetchFoodItems = createAsyncThunk<Product[], string>(
//   'foodItems/fetchFoodItems',
//   async (campus: string) => {
//     try {
//       const token = await fetchToken();
//       const response = await axios.get(
//         `${globalConfig.apiBaseUrl}/v1/campus/${campus}/featuredItem`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       );

//       return response.data.featuredItems.featuredItems;
//     } catch (error) {
//       console.log('error', error);
//       throw new Error('Failed to fetch vendors');
//     }
//   },
// );

export const fetchFoodItems = createAsyncThunk(
  'foodItems/fetchFoodItems',
  async (vendorId: string) => {
    return new Promise<Product[]>(resolve => {
      setTimeout(() => {
        console.log('vendorId to fetch Product mock:', vendorId);
        resolve(mockProductData);
      }, 1000);
    });
  },
);
const FoodItemsSlice = createSlice({
  name: 'foodItems',
  initialState: {
    foodItemsList: [] as Product[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFoodItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFoodItems.fulfilled, (state, action) => {
        state.loading = false;
        state.foodItemsList = action.payload;
      })
      .addCase(fetchFoodItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch featuredItems';
      });
  },
});

export default FoodItemsSlice.reducer;
