import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  Cursor,
  OrderMetadata,
  OrdersResponse,
} from '../../utils/canonicalModel';
import axios from 'axios';
import globalConfig from '../../utils/GlobalConfig';
import {fetchToken} from '../../utils/KeychainStore/keychainUtil';
import {mockOrdersResponse} from '../../data/orders';

// Define the initial state with cursor
interface OrdersState {
  orders: OrderMetadata[];
  loading: boolean;
  error: string | null;
  cursor: Cursor | null;
}

// // Define the fetchOrders thunk with cursor handling
export const fetchOrders = createAsyncThunk<
  OrdersResponse,
  {cursor: Cursor | null; authData: string | undefined}
>('orders/fetchOrders', async ({cursor, authData}, {rejectWithValue}) => {
  try {
    const response = await axios.post<OrdersResponse>(
      `${globalConfig.apiBaseUrl}/v2/getSMZBIZOrders?pageSize=1`,
      {
        cursor,
      },
      {
        headers: {
          SessionKey: authData,
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      ordersMetadata: response.data.ordersMetadata,
      cursor: response.data.cursor,
    };
  } catch (error) {
    console.log('error', error);
    return rejectWithValue('Failed to fetch Orders');
  }
});
// export const fetchOrders = createAsyncThunk<OrdersResponse, Cursor | null>(
//   'orders/fetchOrders',
//   async (_cursor: Cursor | null) => {
//     console.log('fetchOrders');
//     return new Promise<OrdersResponse>(resolve => {
//       setTimeout(() => {
//         resolve(mockOrdersResponse);
//       }, 1000);
//     });
//   },
// );
// Define the initial state
const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  cursor: null,
};

// Create the slice
const OrdersSLice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrders: state => {
      state.orders = [];
      state.cursor = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        // Append new orders to the existing list
        state.orders = [...state.orders, ...action.payload.ordersMetadata];
        // Update the cursor
        state.cursor = action.payload.cursor;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const {resetOrders} = OrdersSLice.actions;
export default OrdersSLice.reducer;
