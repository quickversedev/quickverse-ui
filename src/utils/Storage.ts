// src/utils/storage.ts
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

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
