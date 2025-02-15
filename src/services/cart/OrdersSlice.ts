import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {OrderMetadata} from '../../utils/canonicalModel';
import axios from 'axios';
import globalConfig from '../../utils/GlobalConfig';
import {fetchToken} from '../../utils/KeychainStore/keychainUtil';
// import mockOrdersResponse from '../data/orders';

export const fetchOrders = createAsyncThunk<OrderMetadata[]>(
  'orders/fetchOrders',
  async () => {
    try {
      const token = await fetchToken();
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v2/getOrders`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      return response.data.orders;
    } catch (error) {
      console.log('error', error);
      throw new Error('Failed to fetch Orders');
    }
  },
);
// export const fetchOrders = createAsyncThunk<OrderMetadata[]>(
//   'orders/fetchOrders',
//   async () => {
//     console.log('fetchOrders');
//     return new Promise<OrderMetadata[]>(resolve => {
//       setTimeout(() => {
//         resolve(mockOrdersResponse.ordersMetadata);
//       }, 1000);
//     });
//   },
// );
const OrdersSLice = createSlice({
  name: 'orders',
  initialState: {
    orders: [] as OrderMetadata[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Orders';
      });
  },
});

export default OrdersSLice.reducer;
