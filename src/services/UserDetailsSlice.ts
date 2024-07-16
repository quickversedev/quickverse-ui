import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '../utils/canonicalModel';
import axios from 'axios';
import {getCampus} from '../utils/Storage';
import globalConfig from '../utils/GlobalConfig';

export const fetchUserDetails = createAsyncThunk<User, string>(
  'userDetails/fetchUserDetails',
  async (token, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${globalConfig.apiBaseUrl}/v1/campus/${getCampus()}/user`,
        {token},
      );
      console.log('userDetails:', response.data.vendors);
      return response.data?.vendors.vendor;
    } catch (error) {
      return rejectWithValue('Failed to fetch vendors');
    }
  },
);
const UserDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {
    userDetails: {} as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch User details';
      });
  },
});

export default UserDetailsSlice.reducer;
