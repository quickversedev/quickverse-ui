import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {FoodItem} from '../data/foodItems';
import foodItems from '../data/foodItems';

export const fetchFoodItems = createAsyncThunk(
  'vendorList/fetchVendorList',
  async () => {
    return new Promise<FoodItem[]>(resolve => {
      setTimeout(() => {
        resolve(foodItems);
      }, 5000); // Mock a delay for fetching data
    });
  },
);
const FoodItemsSlice = createSlice({
  name: 'foodItems',
  initialState: {
    foodItemsList: [] as FoodItem[],
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
        state.error = action.error.message || 'Failed to fetch vendors';
      });
  },
});

export default FoodItemsSlice.reducer;
