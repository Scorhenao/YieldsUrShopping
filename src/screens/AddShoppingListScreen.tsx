import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import AddShoppingListScreenStyles from '../styles/css/AddShoppingListStyles';

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
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newList = {
      id: `${Date.now()}`,
      name: listName,
      purpose: listPurpose,
      items: [],
    };

    saveItems([...items, newList]);
    setListName('');
    setListPurpose('');
    navigation.goBack();
  };

  return (
    <View style={AddShoppingListScreenStyles.container}>
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
