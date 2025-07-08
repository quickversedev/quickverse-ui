import React, {useEffect} from 'react';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/utils/AuthContext';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {saveToken} from './src/utils/KeychainStore/keychainUtil';
import 'react-native-get-random-values';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    saveToken();
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Provider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
