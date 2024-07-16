import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {VenderList} from '../utils/canonicalModel';
import {getCampus} from '../utils/Storage';
import globalConfig from '../utils/GlobalConfig';

export const fetchVendorList = createAsyncThunk<VenderList[]>(
  'vendorList/fetchVendorList',
  async () => {
    try {
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/campus/${getCampus()}/vendors`,
      );
      console.log('vendors:', response.data.vendors);
      return response.data?.vendors.vendor;
    } catch (error) {
      throw new Error('Failed to fetch vendors');
    }
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
