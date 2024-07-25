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
  loggedInDate: string;
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
  const [loggedInDate, setLoggedInDate] = useState<string>('');

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
      if (authDataSerialized && logindate) {
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
        setLoggedInDate(logindate);
      }
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
      value={{loggedInDate, authData, loading, signIn, signOut, signUp}}>
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
