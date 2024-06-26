// src/redux/slices/vendorListSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
import {VenderList} from '../data/venderList';
import venderList from '../data/venderList';
// import {VenderList} from '../../data/venderList';
// import venderList from '../data/venderList';

// export const fetchVendorList = createAsyncThunk(
//   'vendorList/fetchVendorList',
//   async () => {
//     const response = await axios.get('https://api.example.com/vendors');
//     return response.data as VenderList[];
//   },
// );
export const fetchVendorList = createAsyncThunk(
  'vendorList/fetchVendorList',
  async () => {
    return new Promise<VenderList[]>(resolve => {
      setTimeout(() => {
        resolve(venderList);
      }, 1000);
    });
  },
);
const vendorListSlice = createSlice({
  name: 'vendorList',
  initialState: {
    vendors: [] as VenderList[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchVendorList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorList.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vendors';
      });
  },
});

export default vendorListSlice.reducer;
