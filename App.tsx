import React from 'react';
import {Router} from './src/routes/Router';
// import {AuthProvider} from './src/contexts/Auth';
import {AuthProvider} from './src/utils/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
