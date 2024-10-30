// src/redux/slices/vendorListSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// import campusBuzzItems from '../data/campusBuss';
// import {CampusBuzz} from '../data/campusBuss';
import {CampusBuzz} from '../utils/canonicalModel';
import {getCampus} from '../utils/Storage';
import globalConfig from '../utils/GlobalConfig';
import {fetchToken} from '../utils/KeychainStore/keychainUtil';
// export const fetchBampusBuzzList = createAsyncThunk(
//   'campusBuzz/fetchBampusBuzzList',
//   async () => {
//     return new Promise<CampusBuzz>(resolve => {
//       setTimeout(() => {
//         resolve(campusBuzzItems);
//       }, 1000);
//     });
//   },
// );
export const fetchBampusBuzzList = createAsyncThunk<CampusBuzz[], string>(
  'campusBuzz/fetchVendorList',
  async (campus: string) => {
    try {
      const token = await fetchToken();
      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/campus/${campus}/campusBuzz`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      console.log('campusBUzz', response.data);
      return response.data.campusBuzzes;
    } catch (error) {
      throw new Error('Failed to fetch vendors');
    }
  },
);
const campusBuzzListSlice = createSlice({
  name: 'campusBuzz',
  initialState: {
    campusBuzz: [] as CampusBuzz[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBampusBuzzList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBampusBuzzList.fulfilled, (state, action) => {
        state.loading = false;
        state.campusBuzz = action.payload;
      })
      .addCase(fetchBampusBuzzList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch campus buzz';
      });
  },
});

export default campusBuzzListSlice.reducer;
