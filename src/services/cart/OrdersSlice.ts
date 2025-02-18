// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {OrderMetadata} from '../../utils/canonicalModel';
// import axios from 'axios';
// import globalConfig from '../../utils/GlobalConfig';
// import {fetchToken} from '../../utils/KeychainStore/keychainUtil';
// // import mockOrdersResponse from '../data/orders';

// export const fetchOrders = createAsyncThunk<OrderMetadata[]>(
//   'orders/fetchOrders',
//   async () => {
//     try {
//       const token = await fetchToken();
//       const response = await axios.get(
//         `${globalConfig.apiBaseUrl}/v2/getOrders`,
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       );

//       return response.data.orders;
//     } catch (error) {
//       console.log('error', error);
//       throw new Error('Failed to fetch Orders');
//     }
//   },
// );
// // export const fetchOrders = createAsyncThunk<OrderMetadata[]>(
// //   'orders/fetchOrders',
// //   async () => {
// //     console.log('fetchOrders');
// //     return new Promise<OrderMetadata[]>(resolve => {
// //       setTimeout(() => {
// //         resolve(mockOrdersResponse.ordersMetadata);
// //       }, 1000);
// //     });
// //   },
// // );
// const OrdersSLice = createSlice({
//   name: 'orders',
//   initialState: {
//     orders: [] as OrderMetadata[],
//     loading: false,
//     error: null as string | null,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchOrders.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch Orders';
//       });
//   },
// });

// export default OrdersSLice.reducer;
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
// export const fetchOrders = createAsyncThunk<FetchOrdersPayload, Cursor | null>(
//   'orders/fetchOrders',
//   async (cursor, {rejectWithValue}) => {
//     try {
//       const token = await fetchToken();
//       const response = await axios.post<OrdersResponse>(
//         `${globalConfig.apiBaseUrl}/v2/getSMZBIZOrders?pageSize=1`,
//         {
//           cursor,
//         },
//         {
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         },
//       );

//       return {
//         orders: response.data.ordersMetadata,
//         cursor: response.data.cursor,
//       };
//     } catch (error) {
//       console.log('error', error);
//       return rejectWithValue('Failed to fetch Orders');
//     }
//   },
// );
export const fetchOrders = createAsyncThunk<OrdersResponse, Cursor | null>(
  'orders/fetchOrders',
  async (_cursor: Cursor | null) => {
    console.log('fetchOrders');
    return new Promise<OrdersResponse>(resolve => {
      setTimeout(() => {
        resolve(mockOrdersResponse);
      }, 1000);
    });
  },
);
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
  reducers: {},
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

export default OrdersSLice.reducer;
