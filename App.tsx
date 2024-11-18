import React, { useEffect } from 'react';
import {Router} from './src/routes/Router';
// import {AuthProvider} from './src/contexts/Auth';
import {AuthProvider} from './src/utils/AuthContext';
import {Provider} from 'react-redux';
import store from './src/store/store';
import { initializeNotificationService, setUpBackgroundMessageHandler, onForegroundMessage } from './src/services/NotificationService';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      await initializeNotificationService();
      const unsubscribe = messaging().onMessage(onForegroundMessage);
      setUpBackgroundMessageHandler();
      return () => unsubscribe();
    };
    setupNotifications();
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
