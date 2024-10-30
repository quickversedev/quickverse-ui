import * as Keychain from 'react-native-keychain';

// Store the Auth Token
export const storeToken = async (token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('authToken', token);
    console.log('Token stored successfully');
  } catch (error) {
    console.error('Error storing the token:', error);
  }
};

// Retrieve the Auth Token
export const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log('Token retrieved successfully');
      return credentials.password;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving the token:', error);
    if (error.message.includes('Could not decrypt data with alias')) {
      console.log('Data might be corrupted, resetting keychain.');
      await Keychain.resetGenericPassword();
    }
    return null;
  }
};

// Delete the Auth Token
export const deleteToken = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
    console.log('Token deleted successfully');
  } catch (error) {
    console.error('Error deleting the token:', error);
  }
};
