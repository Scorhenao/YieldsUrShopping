import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen'; // Importa la librería

const Splash = () => {
  useEffect(() => {
    // Oculta el Splash Screen una vez que el componente esté cargado
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/imgs/yieldsUrShoppingLogo.jpg')} // Asegúrate de que la ruta sea correcta
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Establece el color de fondo si es necesario
  },
  logo: {
    width: 250, // Ajusta el tamaño del logo
    height: 250, // Ajusta el tamaño del logo
    resizeMode: 'contain',
  },
});

export default Splash;
