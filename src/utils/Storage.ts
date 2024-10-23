// src/utils/storage.ts
import {MMKV} from 'react-native-mmkv';
import {Address} from './canonicalModel';

export const storage = new MMKV();

export const setSkipLoginFlow = (skipLogin: boolean): void => {
  storage.set('@skipLogin', skipLogin);
};

export const getSkipLoginFlow = (): boolean | undefined => {
  return storage.getBoolean('@skipLogin');
};

export const setJWT = (token: string): void => {
  storage.set('@AuthData', token);
};

export const getJWT = (): string | undefined => {
  return storage.getString('@AuthData');
};

export const setCampus = (campusId: string): void => {
  storage.set('@CampusID', campusId);
};

export const getCampus = (): string | undefined => {
  return storage.getString('@CampusID');
};

export const saveAddress = (newAddress: Address) => {
  const storedAddresses = storage.getString('addresses');
  const addressArray: Address[] = storedAddresses
    ? JSON.parse(storedAddresses)
    : [];

  // Add the new address to the array
  addressArray.push(newAddress);

  // Save the updated array back to storage
  storage.set('addresses', JSON.stringify(addressArray));
};

export const getAddresses = (): Address[] => {
  const existingAddresses = storage.getString('addresses');
  return existingAddresses ? JSON.parse(existingAddresses) : [];
};
export const deleteAddressMMKV = (keyId: string) => {
  const storedAddresses = storage.getString('addresses');
  if (!storedAddresses) return;

  const addressArray: Address[] = JSON.parse(storedAddresses);

  // Filter out the address with the specified keyId
  const updatedAddressArray = addressArray.filter(
    address => address.keyId !== keyId,
  );

  // Save the updated array back to storage
  storage.set('addresses', JSON.stringify(updatedAddressArray));
};
