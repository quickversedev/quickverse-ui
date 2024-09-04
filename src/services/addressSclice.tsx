import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {MMKV} from 'react-native-mmkv';
import {saveAddress, getAddresses, deleteAddressMMKV} from '../utils/Storage';
import {Address} from '../utils/canonicalModel';

// Initialize MMKV
const storage = new MMKV();

// Define the AddressState interface
interface AddressState {
  addresses: Address[];
  loading: boolean;
}

// Define the initial state
const initialState: AddressState = {
  addresses: [],
  loading: false,
};

// // Function to get addresses from storage
// export const getAddresses = (): Address[] => {
//   const existingAddresses = storage.getString('addresses');
//   return existingAddresses ? JSON.parse(existingAddresses) : [];
// };

// Async thunk to load addresses from MMKV storage
export const loadAddresses = createAsyncThunk(
  'address/loadAddresses',
  async () => {
    const addresses: Address[] = getAddresses();
    return addresses;
  },
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      //   const {keyId, address} = action.payload;
      saveAddress(action.payload); // Assuming saveAddress updates MMKV storage
      state.addresses.push(action.payload);
    },
    deleteAddress: (state, action: PayloadAction<string>) => {
      const keyId = action.payload;
      deleteAddressMMKV(keyId);
      state.addresses = state.addresses.filter(addr => addr.keyId !== keyId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAddresses.pending, state => {
        state.loading = true;
      })
      .addCase(loadAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(loadAddresses.rejected, state => {
        state.loading = false;
      });
  },
});

export const {addAddress, deleteAddress} = addressSlice.actions;
export default addressSlice.reducer;
