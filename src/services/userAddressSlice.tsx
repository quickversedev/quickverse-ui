import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';

// --- Type Definitions ---
export interface ApiAddress {
  // The core address object structure
  id?: string; // Optional for adding, required for listing
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

export interface ListedAddress extends Omit<ApiAddress, 'id'> {
  id: string; // ID from the backend is required
  isDefaultAddress?: boolean;
}

export interface AddAddressApiPayload {
  address: Omit<ApiAddress, 'id'>; // When adding, ID is not sent
  isDefaultAddress: boolean;
}

// Type for the common arguments passed to the thunks
export interface ThunkApiArgs {
  authData: string | undefined; // SessionKey
  vendorId: string;
}

// Type for specific arguments for the addAddress thunk
export interface AddAddressThunkArgs extends ThunkApiArgs {
  addressData: Omit<ApiAddress, 'id'>;
  isDefaultAddress: boolean;
}

// Expected API response for listing addresses
// IMPORTANT: Adjust this based on your actual API response structure!
export interface ListAddressesApiResponse {
  addresses: ListedAddress[];
  // Add other potential fields like pagination cursors if applicable
}

// Expected API response when adding an address (e.g., the newly created address)
export type AddAddressApiResponse = ListedAddress;
// --- End Type Definitions ---

// --- Define State Structure ---
interface AddressState {
  addresses: ListedAddress[];
  loadingList: boolean;
  loadingAdd: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: AddressState = {
  addresses: [],
  loadingList: false,
  loadingAdd: false,
  error: null,
};

// --- Async Thunk for Fetching User Addresses (GET) ---
export const fetchUserAddresses = createAsyncThunk<
  ListedAddress[], // Expected return type on success
  ThunkApiArgs, // Type of the argument passed to the thunk
  {rejectValue: string} // Type for the payload when rejectWithValue is used
>(
  'addresses/fetchUserAddresses',
  async ({authData, vendorId}, {rejectWithValue}) => {
    if (!authData) {
      return rejectWithValue('Authentication key is missing.');
    }
    if (!vendorId) {
      return rejectWithValue('Vendor ID is missing.');
    }

    try {
      const response = await axios.get<ListAddressesApiResponse>(
        `${globalConfig.apiBaseUrl}/v2/listAddresses`,
        {
          params: {
            vendorId: vendorId,
          },
          headers: {
            SessionKey: authData,
            // 'Content-Type': 'application/json' // Generally not needed for GET
          },
        },
      );

      // Assuming the actual list of addresses is nested under an 'addresses' key
      // Adjust if your API returns the array directly or differently
      if (response.data && Array.isArray(response.data.addresses)) {
        return response.data.addresses;
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
        'fetchUserAddresses Errorrr:',
        error.response?.data || error.message,
      );
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch user addresses.';
      return rejectWithValue(message);
    }
  },
);

// --- Async Thunk for Adding a User Address (POST) ---
export const addUserAddress = createAsyncThunk<
  ListedAddress, // Expected return type on success (e.g., the newly created address)
  AddAddressThunkArgs, // Type of the argument passed to the thunk
  {rejectValue: string} // Type for the payload when rejectWithValue is used
>(
  'addresses/addUserAddress',
  async (
    {authData, vendorId, addressData, isDefaultAddress},
    {rejectWithValue},
  ) => {
    if (!authData) {
      return rejectWithValue('Authentication key is missing.');
    }
    if (!vendorId) {
      return rejectWithValue('Vendor ID is missing.');
    }

    const payload: AddAddressApiPayload = {
      address: addressData,
      isDefaultAddress: isDefaultAddress,
    };

    try {
      const response = await axios.post<AddAddressApiResponse>(
        `${globalConfig.apiBaseUrl}/v2/addAddress`,
        payload, // Request body
        {
          params: {
            vendorId: vendorId,
          },
          headers: {
            SessionKey: authData,
            'Content-Type': 'application/json', // Important for POST with JSON body
          },
        },
      );
      // Assuming the API returns the newly created address object directly
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

// --- Create the Slice ---
const userAddressesSlice = createSlice({
  name: 'userAddresses',
  initialState,
  reducers: {
    // Synchronous reducers can be added here if needed
    // e.g., to clear an error manually:
    // clearAddressError: (state) => {
    //   state.error = null;
    // }
  },
  extraReducers: builder => {
    builder
      // Cases for fetchUserAddresses
      .addCase(fetchUserAddresses.pending, state => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loadingList = false;
        state.addresses = action.payload; // Replace existing addresses
        state.error = null;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload ?? 'Unknown error fetching addresses.';
        state.addresses = []; // Clear addresses on error
      })

      // Cases for addUserAddress
      .addCase(addUserAddress.pending, state => {
        state.loadingAdd = true;
        state.error = null;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.addresses.push(action.payload);
        state.error = null;
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload ?? 'Unknown error adding address.';
      });
  },
});

// Export actions if you add synchronous reducers
// export const { clearAddressError } = userAddressesSlice.actions;

export default userAddressesSlice.reducer;
