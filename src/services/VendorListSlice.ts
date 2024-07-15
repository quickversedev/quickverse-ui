// src/redux/slices/vendorListSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import {VenderList} from '../data/venderList';
import {VenderList} from '../utils/canonicalModel';
import venderList from '../data/venderList';
// import axios from 'axios';
// import {getCampus} from '../utils/Storage';
// import {VenderList} from '../../data/venderList';
// import venderList from '../data/venderList';

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
// export const fetchVendorList = createAsyncThunk<VenderList[]>(
//   'vendorList/fetchVendorList',
//   async () => {
//     try {
//       const response = await axios.get(
//         `http://192.168.31.144:8080/quickVerse/v1/campus/${getCampus()}/vendors`,
//       );
//       return response.data?.vendors;
//     } catch (error) {
//       throw new Error('Failed to fetch vendors');
//     }
//   },
// );
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
