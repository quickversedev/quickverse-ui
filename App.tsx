import React, {useEffect} from 'react';
import {Router} from './src/routes/Router';
import {AuthProvider} from './src/utils/AuthContext';
import {Provider} from 'react-redux';
import store from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestAllPermissions} from './src/utils/PermissionsManager'; // Adjust the path if needed

const App: React.FC = () => {
  useEffect(() => {
    const initializePermissions = async () => {
      try {
        // Check if the permissions have already been requested
        const hasAskedPermissions = await AsyncStorage.getItem(
          'permissionsRequested',
        );

        if (!hasAskedPermissions) {
          console.log('Requesting permissions...');

          // Request permissions if they haven't been asked yet
          const permissions = await requestAllPermissions();
          console.log('Permissions granted:', permissions);

          // Mark that the permissions have been requested
          await AsyncStorage.setItem('permissionsRequested', 'true');
        } else {
          console.log('Permissions have already been requested.');
        }
      } catch (error) {
        console.error('Error initializing permissions:', error);
      }
    };

    initializePermissions();
  }, []); // Run once when the component is mounted

  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  );
};

export default App;
