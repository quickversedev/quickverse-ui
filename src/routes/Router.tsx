import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../utils/AuthContext';
import {Loading} from '../Components/util/Loading';
import {saveToken} from '../utils/KeychainStore/keychainUtil';

export const Router = () => {
  const {authData, loading, skipLogin} = useAuth();

  useEffect(() => {
    saveToken();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {authData || skipLogin ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
