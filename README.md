
# Lista de Compras Inteligente

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

## Descripción del Proyecto
"Lista de Compras Inteligente" es una aplicación móvil desarrollada en React Native que permite gestionar listas de compras. Los usuarios pueden crear, actualizar y eliminar listas de compras y sus ítems, así como marcar ítems como comprados. La aplicación soporta modo oscuro y cuenta con un splash screen al inicio.

## Instrucciones de Instalación y Ejecución

>**Nota**: Asegúrate de haber completado las instrucciones de [Configuración del Entorno de React Native](https://reactnative.dev/docs/environment-setup) hasta el paso "Creación de una nueva aplicación" antes de continuar.

### Paso 1: Iniciar el Servidor Metro

Primero, necesitarás iniciar **Metro**, el _bundler_ de JavaScript que se incluye con React Native.

Para iniciar Metro, ejecuta el siguiente comando desde la raíz de tu proyecto React Native:

```bash
# Usando npm
npm start

# O usando Yarn
yarn start
```

### Paso 2: Iniciar tu Aplicación

Deja que Metro Bundler se ejecute en su propia terminal. Abre una nueva terminal desde la raíz de tu proyecto React Native. Ejecuta el siguiente comando para iniciar tu aplicación en **Android** o **iOS**:

#### Para Android

```bash
# Usando npm
npm run android

# O usando Yarn
yarn android
```

#### Para iOS

```bash
# Usando npm
npm run ios

# O usando Yarn
yarn ios
```

Si todo está configurado correctamente, deberías ver tu nueva aplicación ejecutándose en tu _Emulador de Android_ o _Simulador de iOS_.

### Paso 3: Modificar tu Aplicación

Ahora que has ejecutado la aplicación correctamente, puedes modificarla.

1. Abre `App.tsx` en tu editor de texto favorito y edita algunas líneas.
2. Para **Android**: Presiona la tecla <kbd>R</kbd> dos veces o selecciona **"Reload"** desde el **Menú de Desarrollador** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (en Windows y Linux) o <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (en macOS)) para ver los cambios.

   Para **iOS**: Pulsa <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> en tu Simulador de iOS para recargar la app y ver los cambios.

## Características Principales Implementadas

- 📋 **Gestión de Listas de Compras**: Los usuarios pueden crear, actualizar y eliminar listas de compras.
- 🔽 **Dropdown de Ítems**: Al seleccionar una lista, los ítems de la lista se muestran en un dropdown.
- 📝 **Gestión de Ítems**: Los ítems tienen las siguientes propiedades:
  - `id`: Identificador único del ítem
  - `name`: Nombre del ítem
  - `quantity`: Cantidad del ítem
  - `category`: Categoría del ítem
  - `purchased`: Estado de compra (toggle para marcar si se compró o no)
- 🌙 **Modo Oscuro**: Soporte para modo oscuro que cambia la apariencia de la aplicación.
- 🖼 **Splash Screen**: Pantalla de carga personalizada con animaciones.

## Tutorial de la app

[Ver el video](./docs/videos/tutorialApp.mp4)


## ¡Felicidades! :tada:

Has ejecutado y modificado la aplicación correctamente. :partying_face:

### ¿Qué sigue ahora?

- Si deseas agregar este código React Native a una aplicación existente, consulta la [guía de integración](https://reactnative.dev/docs/integration-with-existing-apps).
- Si tienes curiosidad por aprender más sobre React Native, consulta la [Introducción a React Native](https://reactnative.dev/docs/getting-started).

# Solución de Problemas

Si no puedes hacer que esto funcione, consulta la página de [Solución de Problemas](https://reactnative.dev/docs/troubleshooting).

# Aprende Más

Para aprender más sobre React Native, consulta los siguientes recursos:

- [Sitio web de React Native](https://reactnative.dev) - Aprende más sobre React Native.
- [Comenzando](https://reactnative.dev/docs/environment-setup) - Una **visión general** de React Native y cómo configurar tu entorno.
- [Aprende lo Básico](https://reactnative.dev/docs/getting-started) - Un **recorrido guiado** de los **conceptos básicos** de React Native.
- [Blog](https://reactnative.dev/blog) - Lee los últimos posts oficiales del **Blog** de React Native.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - El repositorio de **código abierto** de React Native en GitHub.

