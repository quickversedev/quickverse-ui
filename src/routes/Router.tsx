import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../utils/AuthContext';
import {Loading} from '../Components/util/Loading';

export const Router = () => {
  const {authData, loading, skipLogin} = useAuth();
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {authData || skipLogin ? <AppStack /> : <AuthStack />}

      {/* <AppStack /> */}
    </NavigationContainer>
  );
};
