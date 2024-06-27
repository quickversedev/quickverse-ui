// src/utils/storage.ts
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const setJWT = (token: string): void => {
  storage.set('@AuthData', token);
};

export const getJWT = (): string | undefined => {
  return storage.getString('@AuthData');
};
