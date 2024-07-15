// src/redux/slices/vendorListSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
import {User} from '../utils/canonicalModel';
import user from '../data/user';
// import axios from 'axios';
// import {getCampus} from '../utils/Storage';
// import {VenderList} from '../../data/venderList';
// import venderList from '../data/venderList';

export const fetchUserDetails = createAsyncThunk(
  'userDetails/fetchUserDetails',
  async () => {
    return new Promise<User>(resolve => {
      setTimeout(() => {
        resolve(user);
      }, 1000);
    });
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
