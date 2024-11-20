import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '../utils/canonicalModel';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';

export const fetchUserDetails = createAsyncThunk<User, string>(
  'userDetails/fetchUserDetails',
  async (token, {rejectWithValue}) => {
    try {
      console.log('user details token', token);

      const response = await axios.get(
        `${globalConfig.apiBaseUrl}/v1/campus/user`,
        {
          headers: {
            SessionKey: token,
          },
        },
      );
      // console.log('userResponse:', response);
      return response.data;
    } catch (error) {
      console.log('error while ferching the user data:', error);
      return rejectWithValue('Failed to fetch userdetails');
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
