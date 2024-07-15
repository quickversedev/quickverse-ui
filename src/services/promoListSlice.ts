import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {FoodItem} from '../data/foodItems';
// import foodItems from '../data/foodItems';
import {Promo} from '../data/Promo';
import promo from '../data/Promo';

export const fetchPromoItems = createAsyncThunk(
  'promoItems/fetchPromoItems',
  async () => {
    return new Promise<Promo[]>(resolve => {
      setTimeout(() => {
        resolve(promo);
      }, 5000); // Mock a delay for fetching data
    });
  },
);
const PromoItemsSlice = createSlice({
  name: 'promoItems',
  initialState: {
    promoItemsList: [] as Promo[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPromoItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromoItems.fulfilled, (state, action) => {
        state.loading = false;
        state.promoItemsList = action.payload;
      })
      .addCase(fetchPromoItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch promo';
      });
  },
});

export default PromoItemsSlice.reducer;
