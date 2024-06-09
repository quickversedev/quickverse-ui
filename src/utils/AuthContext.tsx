// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import {storage} from './Storage';
// import {AuthData, authService} from '../services/authService';
import {AuthData, authService} from '../services/AuthService';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(username: string, password: string): Promise<void>;
  signOut(): void;
  signUp(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    campusId: string,
    email: string,
    password: string,
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
        // If there is data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
      console.error('Failed to load auth data from storage', error);
    } finally {
      // loading finished
      setLoading(false);
    }
  }

  const signIn = async (username: string, password: string) => {
    // Call the service passing credentials (email and password).
    // In a real App, this data will be provided by the user from some InputText components.
    const _authData = await authService.signIn(username, password);

    // Set the data in the context, so the App can be notified
    // and send the user to the AuthStack
    setAuthData(_authData);

    // Persist the data in the MMKV storage
    // to be recovered in the next user session.
    storage.set('@AuthData', JSON.stringify(_authData));
  };

  const signUp = async (
    firstName: string,
    lastName: string,
    phoneNumber: string,
    campusId: string,
    email: string,
    password: string,
  ) => {
    const _authData = await authService.signUp(
      firstName,
      lastName,
      phoneNumber,
      campusId,
      email,
      password,
    );
    setAuthData(_authData);
    storage.set('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    // Remove data from context, so the App can be notified
    // and send the user to the AuthStack
    setAuthData(undefined);

    // Remove the data from MMKV storage
    // to NOT be recovered in the next session.
    storage.delete('@AuthData');
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
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
