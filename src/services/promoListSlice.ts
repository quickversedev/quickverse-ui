import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Promo} from '../utils/canonicalModel';
import axios from 'axios';
import {getCampus} from '../utils/Storage';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';
import {mockPromoData} from '../data/Promo';

export const fetchPromoItems = createAsyncThunk<Promo[], string>(
  'promoItems/fetchPromoItems',
  async (campus: string) => {
    const token = await fetchToken();
    try {
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/campus/${campus}/promotionItem`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      return response.data.promotions.promotions;
    } catch (error) {
      throw new Error('Failed to fetch vendors');
    }
  },
);
// export const fetchPromoItems = createAsyncThunk(
//   'promoItems/fetchPromoItems',
//   async () => {
//     return new Promise<Promo[]>(resolve => {
//       setTimeout(() => {
//         console.log('Promo to fetch promo mock:');
//         resolve(mockPromoData);
//       }, 1000);
//     });
//   },
// );
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
