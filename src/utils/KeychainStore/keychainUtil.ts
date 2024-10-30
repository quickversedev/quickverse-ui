import {storeToken, getToken, deleteToken} from './KeychainStore';

export const saveToken = async () => {
  await storeToken('Basic cXZDYXN0bGVFbnRyeTpjYSR0bGVfUGVybWl0QDAx');
};

export const fetchToken = async () => {
  const token = await getToken();
  console.log('Retrieved Token:', token);
  return token;
};

export const removeToken = async () => {
  await deleteToken();
};
