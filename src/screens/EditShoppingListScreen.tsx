import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import NotificationManager, {notify} from '../components/NotificationManager';
import Navbar from '../components/NavBar';
import {useTheme} from '../context/ThemeContext';
import LightModeTheme from '../theme/LightModeTheme';
import DarkModeTheme from '../theme/DarkModeTheme';
import EditShoppingListScreenStyles from '../styles/css/EditShoppingListScreenStyles';

interface EditShoppingListScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

const EditShoppingListScreen: React.FC<EditShoppingListScreenProps> = ({
  navigation,
  route,
}) => {
  const {saveItems, items} = useShoppingList();
  const {listId} = route.params;
  const [listName, setListName] = useState('');
  const [listPurpose, setListPurpose] = useState('');
  const {darkMode} = useTheme();

  const theme = darkMode ? DarkModeTheme : LightModeTheme;

  useEffect(() => {
    const foundList = items.find(list => list.id === listId);
    if (foundList) {
      setListName(foundList.name);
      setListPurpose(foundList.purpose || '');
    }
  }, [listId, items]);

  const saveList = () => {
    if (listName.trim() === '') {
      notify('danger', 'Error', 'Please enter a name for the list.');
      return;
    }

    const updatedItems = items.map(list =>
      list.id === listId
        ? {...list, name: listName, purpose: listPurpose}
        : list,
    );

    saveItems(updatedItems);
    notify(
      'success',
      'List Updated',
      'Your shopping list has been updated successfully.',
    );

    if (route.params?.onGoBack) {
      route.params.onGoBack();
    }

    navigation.goBack();
  };

  return (
    <>
      <Navbar />
      <View
        style={[
          EditShoppingListScreenStyles.container,
          {backgroundColor: theme.colors.background},
        ]}>
        <NotificationManager />
        <Text
          style={[
            EditShoppingListScreenStyles.title,
            {color: theme.colors.text},
          ]}>
          Edit Shopping List
        </Text>

        <TextInput
          style={[
            EditShoppingListScreenStyles.input,
            {
              borderColor: theme.colors.border,
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
            EditShoppingListScreenStyles.input,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
              marginTop: 20,
            },
          ]}
          placeholder="Enter list purpose (optional)"
          placeholderTextColor={theme.colors.placeholder}
          value={listPurpose}
          onChangeText={setListPurpose}
        />

        <View style={EditShoppingListScreenStyles.modalButtons}>
          <TouchableOpacity
            style={[
              EditShoppingListScreenStyles.modalButton,
              {backgroundColor: theme.colors.button},
            ]}
            onPress={saveList}>
            <Text
              style={[
                EditShoppingListScreenStyles.modalButtonText,
                {color: theme.colors.text},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              EditShoppingListScreenStyles.modalButton,
              {backgroundColor: theme.colors.cancelButton},
            ]}
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                EditShoppingListScreenStyles.modalButtonText,
                {color: theme.colors.text},
              ]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default EditShoppingListScreen;
