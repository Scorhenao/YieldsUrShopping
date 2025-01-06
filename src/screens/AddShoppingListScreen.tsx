import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import NotificationManager, {notify} from '../components/NotificationManager';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';
import Navbar from '../components/NavBar';
import {useTheme} from '../context/ThemeContext';
import AddShoppingListScreenStyles from '../styles/css/AddShoppingListScreenStyles';
import LightModeTheme from '../theme/LightModeTheme';
import DarkModeTheme from '../theme/DarkModeTheme';

interface AddShoppingListScreenProps {
  navigation: NavigationProp<any>;
}

const AddShoppingListScreen: React.FC<AddShoppingListScreenProps> = ({
  navigation,
}) => {
  const {saveItems, items} = useShoppingList();
  const [listName, setListName] = useState('');
  const [listPurpose, setListPurpose] = useState('');
  const {darkMode} = useTheme();

  const theme = darkMode ? DarkModeTheme : LightModeTheme;

  const addList = () => {
    if (listName.trim() === '' || listPurpose.trim() === '') {
      notify('danger', 'Error', 'Please fill in all fields.');
      return;
    }

    const newList = {
      id: `${Date.now()}`,
      name: listName,
      purpose: listPurpose,
      items: [
        {
          id: `${Date.now()}_item`,
          name: 'Sample Item',
          quantity: 1,
          category: 'Misc',
          purchased: false,
        },
      ] as ShoppingItem[],
    };

    saveItems([...items, newList]);
    setListName('');
    setListPurpose('');
    notify(
      'success',
      'List Added',
      'Your shopping list has been added successfully.',
    );
    navigation.goBack();
  };

  return (
    <>
      <Navbar />
      <View
        style={[
          AddShoppingListScreenStyles.container,
          {backgroundColor: theme.colors.background},
        ]}>
        <NotificationManager />
        <Text
          style={[
            AddShoppingListScreenStyles.title,
            {color: theme.colors.text},
          ]}>
          Add Shopping List
        </Text>
        <TextInput
          style={[
            AddShoppingListScreenStyles.input,
            {
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
            },
          ]}
          placeholder="Enter list name"
          placeholderTextColor={theme.colors.placeholder}
          value={listName}
          onChangeText={setListName}
        />
        <TextInput
          style={[
            AddShoppingListScreenStyles.input,
            {
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
            },
          ]}
          placeholder="Enter purpose of the list"
          placeholderTextColor={theme.colors.placeholder}
          value={listPurpose}
          onChangeText={setListPurpose}
        />
        <View style={AddShoppingListScreenStyles.modalButtons}>
          <TouchableOpacity
            style={[
              AddShoppingListScreenStyles.modalButton,
              {backgroundColor: theme.colors.button},
            ]}
            onPress={addList}>
            <Text
              style={[
                AddShoppingListScreenStyles.modalButtonText,
                {color: theme.colors.text},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              AddShoppingListScreenStyles.modalButton,
              AddShoppingListScreenStyles.cancelButton,
              {backgroundColor: theme.colors.cancelButton},
            ]}
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                AddShoppingListScreenStyles.modalButtonText,
                {
                  color: theme.colors.text,
                },
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default AddShoppingListScreen;
