/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AddShoppingListScreen from '../screens/AddShoppingListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditShoppingItemScreen from '../screens/EditShoppingItemScreen';

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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
