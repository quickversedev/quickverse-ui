import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Promo} from '../utils/canonicalModel';
import axios from 'axios';
import {getCampus} from '../utils/Storage';
import globalConfig from '../utils/GlobalConfig';

export const fetchPromoItems = createAsyncThunk<Promo[]>(
  'promoItems/fetchPromoItems',
  async () => {
    try {
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/promotionItem/${getCampus()}`,
      );
      console.log('Promo:', response.data);
      return response.data.promotions.promotions;
    } catch (error) {
      throw new Error('Failed to fetch vendors');
    }
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
