import React from 'react';
import {Router} from './src/routes/Router';
// import {AuthProvider} from './src/contexts/Auth';
import {AuthProvider} from './src/utils/AuthContext';
import {Provider} from 'react-redux';
import store from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  );
};

export default App;