import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {FoodItem} from '../utils/canonicalModel';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';

export const fetchFoodItems = createAsyncThunk<FoodItem[], string>(
  'foodItems/fetchFoodItems',
  async (campus: string) => {
    try {
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/featuredItem/${campus}`,
      );
      // console.log(
      //   'featured Items: ',
      //   response.data.featuredItems.featuredItems,
      // );
      return response.data.featuredItems.featuredItems;
    } catch (error) {
      throw new Error('Failed to fetch vendors');
    }
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
        state.error = action.error.message || 'Failed to fetch featuredItems';
      });
  },
});

export default FoodItemsSlice.reducer;
