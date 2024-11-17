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

type AuthContextData = {
  loggedInDate: string;
  authData?: AuthData;
  skipLogin?: boolean;
  loading: boolean;
  configs: config | undefined;
  sendOtp(phoneNumber: string): Promise<void>;
  verifyOtp(phoneNumber: string, otp: string): Promise<void>;
  signOut(): void;
  signUp(
    fullName: string,
    phoneNumber: string,
    campusId: string,
    email: string,
    pin: string,
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

  const sendOtp = async (_phoneNumber: string) => {
    try {
      await authService.sendOtp(_phoneNumber);
    } catch (error) {
      throw error; // Rethrow the error to propagate it to the caller
    }
  };
  const verifyOtp = async (_phoneNumber: string, otp: string) => {
    try {
      const _authData = await authService.VerifyOtp(_phoneNumber, otp);
      if (_authData) {
        setAuthData(_authData);
        storage.set('@AuthData', JSON.stringify(_authData));

        const date = new Date();
        storage.set('@loginDate', date.toISOString());
      }
    } catch (error) {
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
    return await authService.signUp(
      fullName,
      phoneNumber,
      campusId,
      email,
      pin,
    );
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
        sendOtp,
        verifyOtp,
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
