/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AddShoppingListScreen from '../screens/AddShoppingListScreen';
import AddItemScreen from '../screens/AddShoppingItemScreen';
import EditShoppingItemScreen from '../screens/EditShoppingItemScreen';
import EditShoppingListScreen from '../screens/EditShoppingListScreen';
import Splash from '../screens/SplashScreen';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="AddShoppingList"
          options={{headerShown: false}}
          component={AddShoppingListScreen}
        />
        <Stack.Screen
          name="EditShoppingList"
          options={{headerShown: false}}
          component={EditShoppingListScreen}
        />
        <Stack.Screen
          name="AddShoppingItem"
          options={{headerShown: false}}
          component={AddItemScreen}
        />
        <Stack.Screen
          name="EditShoppingItem"
          options={{headerShown: false}}
          component={EditShoppingItemScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
