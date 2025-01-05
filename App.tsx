import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import NotificationManager from './src/components/NotificationManager';
import {RefreshProvider} from './src/context/RefreshContext';

const App = () => {
  return (
    <RefreshProvider>
      <AppNavigator />
      <NotificationManager />
    </RefreshProvider>
  );
};

export default App;
