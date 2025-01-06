import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import NotificationManager from './src/components/NotificationManager';
import {RefreshProvider} from './src/context/RefreshContext';
import {ThemeProvider} from './src/context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <RefreshProvider>
        <AppNavigator />
        <NotificationManager />
      </RefreshProvider>
    </ThemeProvider>
  );
};

export default App;
