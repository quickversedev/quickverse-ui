import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import globalConfig from '../utils/GlobalConfig';

// --- Type Definitions ---
export interface ApiAddress {
  id?: string;
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
  id: string;
  isDefaultAddress?: boolean;
}

export interface AddAddressApiPayload {
  address: Omit<ApiAddress, 'id'>;
  isDefaultAddress: boolean;
}

export interface ThunkApiArgs {
  authData: string | undefined;
  vendorId: string;
}

export interface AddAddressThunkArgs extends ThunkApiArgs {
  addressData: Omit<ApiAddress, 'id'>;
  isDefaultAddress: boolean;
}

export interface ListAddressesApiResponse {
  addresses: ListedAddress[];
}

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

// --- MOCK DATA for fetchUserAddresses ---
const mockUserAddressesData: ListedAddress[] = [
  {
    id: 'mock_addr_001',
    name: 'John Doe',
    addressLine1: '123 Main Street',
    addressLine2: 'Apartment 4B',
    addressLine3: null,
    city: 'Anytown',
    state: 'CA',
    pincode: '90210',
    latitude: '34.052235',
    longitude: '-118.243683',
    tag: 'Home',
    isDefaultAddress: true,
  },
  {
    id: 'mock_addr_002',
    name: 'John Doe',
    addressLine1: '789 Business Rd',
    addressLine2: 'Suite 500',
    addressLine3: 'Office Park',
    city: 'Workville',
    state: 'CA',
    pincode: '90211',
    latitude: '34.059900',
    longitude: '-118.259000',
    tag: 'Work',
    isDefaultAddress: false,
  },
];
// --- END MOCK DATA ---

// --- Async Thunk for Fetching User Addresses (GET) ---
export const fetchUserAddresses = createAsyncThunk<
  ListedAddress[], // Expected return type on success
  ThunkApiArgs, // Type of the argument passed to the thunk
  {rejectValue: string} // Type for the payload when rejectWithValue is used
>(
  'userAddresses/fetchUserAddresses',
  async ({authData, vendorId}, {rejectWithValue}) => {
    // --- START MOCK IMPLEMENTATION ---
    // console.log('MOCK fetchUserAddresses called with:', {authData, vendorId});
    // return new Promise<ListedAddress[]>((resolve, reject) => {
    //   setTimeout(() => {
    //     if (!authData) {
    //       console.warn(
    //         'MOCK: Authentication key is missing for fetchUserAddresses.',
    //       );
    //       reject(rejectWithValue('Authentication key is missing.'));
    //       return;
    //     }
    //     if (!vendorId) {
    //       console.warn('MOCK: Vendor ID is missing for fetchUserAddresses.');
    //       reject(rejectWithValue('Vendor ID is missing.'));
    //       return;
    //     }
    //     // Simulate success
    //     console.log('MOCK: Successfully returning mock addresses.');
    //     resolve(mockUserAddressesData);
    //     // To simulate an error:
    //     // console.log('MOCK: Simulating fetch error for addresses.');
    //     // reject(rejectWithValue('Mocked: Failed to fetch user addresses.'));
    //   }, 1000); // 1-second delay
    // });
    // --- END MOCK IMPLEMENTATION ---
    // --- REAL API Call (Commented out for mocking) ---

    if (!authData) {
      return rejectWithValue('Authentication key is missing.');
    }
    if (!vendorId) {
      return rejectWithValue('Vendor ID is missing.');
    }

    try {
      const response = await axios.get<ListAddressesApiResponse>(
        `${globalConfig.apiBaseUrl}/v2/listAddresses`, // Added /quickVerse/ if needed
        {
          params: {
            vendorId: vendorId,
          },
          headers: {
            SessionKey: authData,
          },
        },
      );

      console.log('RESPONSE::', response.data.addresses);

      if (response.data && Array.isArray(response.data.addresses)) {
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
        'fetchUserAddresses Error:', // Corrected typo from Errorrr
        error.response?.data || error.message,
      );
      const message =
        error.response?.data?.message ||
        error.message ||
        'Failed to fetch user addresses.';
      return rejectWithValue(message);
    }

    // --- END REAL API Call ---
  },
);

// --- Async Thunk for Adding a User Address (POST) ---
export const addUserAddress = createAsyncThunk<
  ListedAddress,
  AddAddressThunkArgs,
  {rejectValue: string}
>(
  'userAddresses/addUserAddress',
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

    // --- MOCK ADD USER ADDRESS (Optional, but good for consistent testing) ---
    // console.log(
    //   'MOCK addUserAddress called with payload:',
    //   payload,
    //   'and vendorId:',
    //   vendorId,
    // );
    // return new Promise<ListedAddress>((resolve, reject) => {
    //   setTimeout(() => {
    //     const newMockAddress: ListedAddress = {
    //       ...addressData,
    //       id: `mock_id_${Date.now()}`, // Generate a unique mock ID
    //       isDefaultAddress: isDefaultAddress,
    //     };
    //     console.log(
    //       'MOCK: Successfully returning newly added mock address:',
    //       newMockAddress,
    //     );
    //     resolve(newMockAddress);

    //     // To simulate an error for adding:
    //     // console.log('MOCK: Simulating add error for address.');
    //     // reject(rejectWithValue('Mocked: Failed to add user address.'));
    //   }, 1000); // 1-second delay
    // });
    // --- END MOCK ADD USER ADDRESS ---

    // --- REAL API Call (Commented out for mocking) ---

    try {
      const response = await axios.post<AddAddressApiResponse>(
        `${globalConfig.apiBaseUrl}/v2/addAddress`, // Added /quickVerse/ if needed
        payload,
        {
          params: {
            vendorId: vendorId,
          },
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

    // --- END REAL API Call ---
  },
);

// --- Create the Slice ---
const userAddressesSlice = createSlice({
  name: 'userAddresses',
  initialState,
  reducers: {
    // clearAddressError: (state) => { state.error = null; }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserAddresses.pending, state => {
        state.loadingList = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loadingList = false;
        state.addresses = action.payload;
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
        state.addresses.push(action.payload);
        state.error = null;
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loadingAdd = false;
        state.error = action.payload ?? 'Unknown error adding address.';
      });
  },
});

export default userAddressesSlice.reducer;
