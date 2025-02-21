import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {AuthProvider} from './src/utils/AuthContext';
import {Router} from './src/routes/Router';
import ForceUpdateChecker from './src/utils/ForceUpdateChecker';
// import ForceUpdateChecker from './src/components/ForceUpdateChecker';

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
