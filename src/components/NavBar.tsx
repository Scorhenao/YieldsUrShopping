import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Animated} from 'react-native';
import {HomeScreenStyles} from '../styles/css/HomeScreenStyle';
import {useTheme} from '../context/ThemeContext';

const MaterialCommunityIcons =
  require('react-native-vector-icons/MaterialCommunityIcons').default;

const Navbar: React.FC = () => {
  const [isSun, setIsSun] = useState(true);
  const {toggleDarkMode, darkMode} = useTheme();

  const [rotate] = useState(new Animated.Value(0));

  const toggleIcon = () => {
    Animated.timing(rotate, {
      toValue: isSun ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    toggleDarkMode();
    setIsSun(!isSun);
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={HomeScreenStyles.navbarContainer}>
      <Image
        source={require('../assets/imgs/yieldsUrShoppingLogo.png')}
        style={HomeScreenStyles.logo}
      />

      <TouchableOpacity onPress={toggleIcon}>
        <Animated.View
          style={{
            transform: [{rotate: rotateInterpolate}],
          }}>
          <MaterialCommunityIcons
            name={isSun ? 'weather-sunny' : 'weather-night'}
            size={30}
            color={darkMode ? 'black' : 'black'}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
