import React, {useEffect} from 'react';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/utils/AuthContext';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {saveToken} from './src/utils/KeychainStore/keychainUtil';
import 'react-native-get-random-values';

const App = () => {
  useEffect(() => {
    saveToken();
  }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  );
};

export default App;
