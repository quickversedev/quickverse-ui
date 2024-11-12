import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {getSkipLoginFlow, storage} from './Storage';
import {AuthData, authService} from '../services/AuthService';
import {fetchConfigs} from '../services/configService';
import {config} from './canonicalModel';
import { Alert } from 'react-native';

type AuthContextData = {
  loggedInDate: string;
  authData?: AuthData;
  skipLogin?: boolean;
  loading: boolean;
  configs: config | undefined;
  signIn(phoneNumber: string, pin: string, campusId: string): Promise<void>;
  signOut(): void;
  signUp(
    fullName: string,
    campusId: string,
    email: string,
    dob: string,
  ): Promise<void>;
  setSkipLogin(shouldSkipLogin: boolean): void;
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
  const [skipLogin, setSkipLogin] = useState<boolean | undefined>(false);
  const [loggedInDate, setLoggedInDate] = useState<string>('');
  const [configs, setConfigs] = useState<config | undefined>();

  useEffect(() => {
    // Every time the App is opened, this provider is rendered
    // and calls the loadStorageData function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      // Try to get the data from MMKV storage
      const authDataSerialized = storage.getString('@AuthData');
      const logindate = storage.getString('@loginDate');
      const skipLoginFlow = getSkipLoginFlow();
      if (authDataSerialized && logindate) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
        setLoggedInDate(logindate);
        const configData = await fetchConfigs();
        if (configData) {
          setConfigs(configData);
        }
      }
      setSkipLogin(skipLoginFlow);
    } catch (error) {
      console.log('Failed to load auth data from storage', error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (
    _phoneNumber: string,
    pin: string,
    campusId: string,
  ) => {
    try {
      const _authData = await authService.signIn(_phoneNumber, pin, campusId);
      if (_authData) {
        setAuthData(_authData);
        storage.set('@AuthData', JSON.stringify(_authData));
        if (pin === '7779') {
          storage.set('@resetPass', true);
        }
        const date = new Date();
        storage.set('@loginDate', date.toISOString());
      }
    } catch (error) {
      throw error; // Rethrow the error to propagate it to the caller
    }
  };

  const signUp = async (
    fullName: string,
    campusId: string,
    email: string,
    dob: string,
  ) => {
    try {
      const response = await authService.signUp(fullName, campusId, email, dob);

      if (response && response.data) {
        setAuthData(response.data);
        storage.set('@AuthData', JSON.stringify(response.data));
        const date = new Date();
        storage.set('@loginDate', date.toISOString());
      } else {
        throw new Error('No data received from the sign-up response');
      }
    } catch (error: any) {
      console.error('Sign-up error in AuthProvider:', error);

      // Handle known error codes with custom messages
      if (error.code === 1021) {
        Alert.alert(
          'Sign-up Error',
          'The email is already in use. Please use a different email.',
        );
      } else {
        Alert.alert(
          'Sign-up Error',
          'An unexpected error occurred. Please try again.',
        );
      }

      throw error; // Optionally rethrow the error to propagate to the caller
    }
  };
  const signOut = async () => {
    setAuthData(undefined);
    storage.delete('@AuthData');
    storage.delete('@CampusID');
    storage.delete('@loginDate');
  };

  return (
    <AuthContext.Provider
      value={{
        loggedInDate,
        configs,
        authData,
        skipLogin,
        loading,
        signIn,
        signOut,
        signUp,
        setSkipLogin,
      }}>
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