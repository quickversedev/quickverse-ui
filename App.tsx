import React, {useEffect} from 'react';
import {Router} from './src/routes/Router';
// import {AuthProvider} from './src/contexts/Auth';
import {AuthProvider} from './src/utils/AuthContext';
import {Provider} from 'react-redux';
import store from './src/store/store';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './src/utils/firebaseConfig.ts';

const App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    } else {
      console.log('Firebase already initialized');
    }
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
