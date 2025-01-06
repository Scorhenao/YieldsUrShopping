import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Animated} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useNavigation} from '@react-navigation/native'; // Importamos useNavigation

const Splash = () => {
  const navigation = useNavigation(); // Usamos useNavigation para navegar a la pantalla de Home
  const [logoPosition] = useState(new Animated.Value(-300));

  const [dot1Animation] = useState(new Animated.Value(0));
  const [dot2Animation] = useState(new Animated.Value(0));
  const [dot3Animation] = useState(new Animated.Value(0));

  useEffect(() => {
    SplashScreen.hide();

    Animated.timing(logoPosition, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Animación de los puntos de carga
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1Animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot1Animation, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(dot2Animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot2Animation, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(dot3Animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(dot3Animation, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => animateDots());
    };

    animateDots();

    // Después de la animación de los puntos, navegamos a Home
    setTimeout(() => {
      navigation.replace('Home'); // Cambia 'Home' por el nombre correcto de tu pantalla
    }, 3000); // 3000 ms, ajusta el tiempo si es necesario
  }, [dot1Animation, dot2Animation, dot3Animation, logoPosition, navigation]);

  const renderDots = () => {
    const dot1Style = {
      opacity: dot1Animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 1, 0.3],
      }),
    };
    const dot2Style = {
      opacity: dot2Animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 1, 0.3],
      }),
    };
    const dot3Style = {
      opacity: dot3Animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.3, 1, 0.3],
      }),
    };

    return (
      <View style={styles.dotsContainer}>
        <Animated.Text style={[styles.dot, dot1Style]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, dot2Style]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, dot3Style]}>.</Animated.Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {transform: [{translateX: logoPosition}]},
        ]}>
        <Image
          source={require('../assets/imgs/yieldsUrShoppingLogo.png')}
          style={styles.logo}
        />
      </Animated.View>

      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    position: 'absolute',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 120,
  },
  dot: {
    fontSize: 60,
    color: '#000',
  },
});

export default Splash;
