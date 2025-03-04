import React from 'react';
import {Router} from './src/routes/Router';
// import {AuthProvider} from './src/contexts/Auth';
import {AuthProvider} from './src/utils/AuthContext';
import {Provider} from 'react-redux';
import store from './src/store/store';
import ForceUpdateChecker from './src/utils/ForceUpdateChecker';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ForceUpdateChecker>
          <Router />
        </ForceUpdateChecker>
      </AuthProvider>
    </Provider>
  );
};

export default App;
