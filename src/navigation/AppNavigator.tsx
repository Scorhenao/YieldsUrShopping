/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AddShoppingListScreen from '../screens/AddShoppingListScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
