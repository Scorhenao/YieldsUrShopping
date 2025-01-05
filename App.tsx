import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
// import SplashScreen from 'react-native-splash-screen';

const App = () => {
  // useEffect(() => {
  //   SplashScreen.show();
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 3000);
  // }, []);
  return <AppNavigator />;
};

export default App;
