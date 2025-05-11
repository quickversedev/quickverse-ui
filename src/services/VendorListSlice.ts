import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import axios from 'axios';
import {Vendor} from '../utils/canonicalModel';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';
import {RootState} from '../store/store';

export const fetchVendorList = createAsyncThunk<Vendor[], string>(
  'vendorList/fetchVendorList',
  async (campus: string) => {
    try {
      const token = await fetchToken();
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/campus/${campus}/vendors`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      return response.data?.vendors.vendor;
    } catch (error) {
      throw new Error('Failed to fetch vendors');
    }
  },
);
const vendorListSlice = createSlice({
  name: 'vendorList',
  initialState: {
    vendors: [] as Vendor[],
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

const selectVendorList = (state: RootState) => state.vendorList.vendors;

export const selectVendorEndpointById = createSelector(
  [selectVendorList, (state: RootState, vendorId: string) => vendorId],
  (vendors, vendorId) => {
    const vendor = vendors.find(v => v.vendorId === vendorId);
    return vendor ? vendor.vendorEndPoint : null;
  },
);
export const selectVendorDetailsByShopId = createSelector(
  [selectVendorList, (state: RootState, vendorId: string) => vendorId],
  (vendors, vendorId) => {
    return vendors.find(v => v.vendorId === vendorId);
  },
);
export default vendorListSlice.reducer;
