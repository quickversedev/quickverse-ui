import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';
import {useAuth} from '../utils/AuthContext';
import {Loading} from '../Components/util/Loading';
import ForceUpdateChecker from '../utils/ForceUpdateChecker';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../theme';

export const Router = () => {
  const {authData, loading, skipLogin} = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme.colors.primary}}
        edges={['right', 'left']}>
        <ForceUpdateChecker>
          {authData || skipLogin ? <AppStack /> : <AuthStack />}
        </ForceUpdateChecker>
      </SafeAreaView>
    </NavigationContainer>
  );
};
