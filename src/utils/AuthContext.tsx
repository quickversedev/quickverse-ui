import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {storage} from './Storage';
import {AuthData, authService} from '../services/AuthService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(phoneNumber: string, pin: string, campusId: string): Promise<void>;
  signOut(): void;
  signUp(
    fullName: string,
    phoneNumber: string,
    campusId: string,
    email: string,
    pin: string,
  ): Promise<void>;
};

// Create the Auth Context with the data type specified
// and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [authData, setAuthData] = useState<AuthData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Every time the App is opened, this provider is rendered
    // and calls the loadStorageData function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      // Try to get the data from MMKV storage
      const authDataSerialized = storage.getString('@AuthData');
      if (authDataSerialized) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.error('Failed to load auth data from storage', error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (
    _phoneNumber: string,
    pin: string,
    campusId: string,
  ) => {
    console.log('insode signin', campusId);
    try {
      const _authData = await authService.signIn(_phoneNumber, pin, campusId);
      if (_authData) {
        setAuthData(_authData);
        storage.set('@AuthData', JSON.stringify(_authData));
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  };

  const signUp = async (
    fullName: string,
    phoneNumber: string,
    campusId: string,
    email: string,
    pin: string,
  ) => {
    const _authData = await authService.signUp(
      fullName,
      phoneNumber,
      campusId,
      email,
      pin,
    );
    setAuthData(_authData);
    storage.set('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    setAuthData(undefined);
    storage.delete('@AuthData');
  };

  
  return (
    <AuthContext.Provider value={{authData, loading, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  );
};

// A simple hook to facilitate access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};

// const API_URL = 'https://yourapi.com'; // Replace with your actual API URL

// const signIn = async (email: string, password: string): Promise<AuthData> => {
//   try {
//     const response = await axios.post(`${API_URL}/signin`, { email, password });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to sign in');
//   }
// };

// const signUp = async (
//   firstName: string,
//   lastName: string,
//   phoneNumber: string,
//   campusId: string,
//   email: string,
//   password: string
// ): Promise<AuthData> => {
//   try {
//     const response = await axios.post(`${API_URL}/signup`, {
//       firstName,
//       lastName,
//       phoneNumber,
//       campusId,
//       email,
//       password
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to sign up');
//   }
// };
