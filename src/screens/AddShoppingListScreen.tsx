import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import AddShoppingListScreenStyles from '../styles/css/AddShoppingListStyles';
import NotificationManager, {notify} from '../components/NotificationManager';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';

interface AddShoppingListScreenProps {
  navigation: NavigationProp<any>;
}

const AddShoppingListScreen: React.FC<AddShoppingListScreenProps> = ({
  navigation,
}) => {
  const {saveItems, items} = useShoppingList();
  const [listName, setListName] = useState('');
  const [listPurpose, setListPurpose] = useState('');

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
    <View style={AddShoppingListScreenStyles.container}>
      <NotificationManager />
      <Text style={AddShoppingListScreenStyles.title}>Add Shopping List</Text>
      <TextInput
        style={AddShoppingListScreenStyles.input}
        placeholder="Enter list name"
        placeholderTextColor="#999"
        value={listName}
        onChangeText={setListName}
      />
      <TextInput
        style={AddShoppingListScreenStyles.input}
        placeholder="Enter purpose of the list"
        placeholderTextColor="#999"
        value={listPurpose}
        onChangeText={setListPurpose}
      />
      <View style={AddShoppingListScreenStyles.modalButtons}>
        <TouchableOpacity
          style={AddShoppingListScreenStyles.modalButton}
          onPress={addList}>
          <Text style={AddShoppingListScreenStyles.modalButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            AddShoppingListScreenStyles.modalButton,
            AddShoppingListScreenStyles.cancelButton,
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={AddShoppingListScreenStyles.modalButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddShoppingListScreen;
