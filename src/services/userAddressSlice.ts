import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';

export interface ApiAddress {
  addressID?: string;
  name: string;
  addressLine1: string;
  addressLine2?: string | null;
  addressLine3?: string | null;
  city: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  tag?: string | null;
}

export interface ListedAddress {
  addressID: string;
  address: ApiAddress;
  isDefaultAddress?: boolean;
}

export interface AddAddressApiPayload {
  address: Omit<ApiAddress, 'addressID'>;
  isDefaultAddress: boolean;
}

export interface ThunkApiArgs {
  authData: string | undefined;
}

export interface AddAddressThunkArgs extends ThunkApiArgs {
  addressData: Omit<ApiAddress, 'addressID'>;
  isDefaultAddress: boolean;
}

export interface ListAddressesApiResponse {
  addresses: ListedAddress[];
}

export type AddAddressApiResponse = ListedAddress;

interface AddressState {
  addresses: ListedAddress[];
  defaultAddressId: string | null;
  loadingList: boolean;
  loadingAdd: boolean;
  error: string | null;
}

const initialState: AddressState = {
  addresses: [],
  defaultAddressId: null,
  loadingList: false,
  loadingAdd: false,
  error: null,
};

export const fetchUserAddresses = createAsyncThunk<
  ListedAddress[], // Expected return type on success
  ThunkApiArgs, // Type of the argument passed to the thunk
  {rejectValue: string} // Type for the payload when rejectWithValue is used
>('userAddresses/fetchUserAddresses', async ({authData}, {rejectWithValue}) => {
  if (!authData) {
    return rejectWithValue('Authentication key is missing.');
  }

  try {
    const response = await axios.get<ListAddressesApiResponse>(
      `${globalConfig.apiBaseUrl}/v2/getLocalAddress`,
      {
        headers: {
          SessionKey: authData,
        },
      },
    );

    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn(
        'Unexpected response structure for fetchUserAddresses:',
        response.data,
      );
      return rejectWithValue(
        'Invalid data format received from server when fetching addresses.',
      );
    }
  } catch (error: any) {
    console.error(
      'fetchUserAddresses Error:',
      error.response?.data || error.message,
    );
    const message =
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch user addresses.';
    return rejectWithValue(message);
  }
});

export const addUserAddress = createAsyncThunk<
  ListedAddress,
  AddAddressThunkArgs,
  {rejectValue: string}
>(
  'userAddresses/addUserAddress',
  async ({authData, addressData, isDefaultAddress}, {rejectWithValue}) => {
    if (!authData) {
      return rejectWithValue('Authentication key is missing.');
    }

    const payload: AddAddressApiPayload = {
      address: addressData,
      isDefaultAddress: isDefaultAddress,
    };

    try {
      const response = await axios.post<AddAddressApiResponse>(
        `${globalConfig.apiBaseUrl}/v2/addAddress`,
        payload,
        {
          headers: {
            SessionKey: authData,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(
        'addUserAddress Error:',
        error.response?.data || error.message,
      );
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to add user address.';
      return rejectWithValue(message);
    }
  },
);

const userAddressesSlice = createSlice({
  name: 'userAddresses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserAddresses.pending, state => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loadingList = false;
        state.addresses = action.payload || [];
        state.error = null;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload ?? 'Unknown error fetching addresses.';
        state.addresses = [];
      })
      .addCase(addUserAddress.pending, state => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loadingAdd = false;
        // action.payload is a single ListedAddress
        if (!Array.isArray(state.addresses)) {
          // Defensive check
          state.addresses = [];
        }
        state.addresses.push(action.payload);

        if (action.payload.isDefaultAddress) {
          state.defaultAddressId = action.payload.addressID;
        } else if (
          state.defaultAddressId === action.payload.addressID &&
          !action.payload.isDefaultAddress
        ) {
          state.defaultAddressId = null;
        }
        state.error = null;
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload ?? 'Unknown error adding address.';
      });
  },
});

export default userAddressesSlice.reducer;
