import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../utils/AuthContext';
import {Loading} from '../Components/util/Loading';
import ForceUpdateChecker from '../utils/ForceUpdateChecker';

export const Router = () => {
  const {authData, loading, skipLogin} = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <ForceUpdateChecker>
        {authData || skipLogin ? <AppStack /> : <AuthStack />}
      </ForceUpdateChecker>
    </NavigationContainer>
  );
};
