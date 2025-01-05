import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import AddShoppingListScreenStyles from '../styles/css/AddShoppingListStyles';
import NotificationManager, {notify} from '../components/NotificationManager';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';

interface AddItemScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

const AddItemScreen: React.FC<AddItemScreenProps> = ({navigation, route}) => {
  const {saveItems, items} = useShoppingList();
  const {listId} = route.params;
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemCategory, setItemCategory] = useState('');
  const [itemPurchased, setItemPurchased] = useState(false);

  const addItem = () => {
    if (itemName.trim() === '' || itemCategory.trim() === '') {
      notify('danger', 'Error', 'Please fill in all fields.');
      return;
    }

    const updatedItems = items.map(list => {
      if (list.id === listId) {
        const newItem: ShoppingItem = {
          id: `${Date.now()}_item`,
          name: itemName,
          quantity: itemQuantity,
          category: itemCategory,
          purchased: itemPurchased,
        };
        return {...list, items: [...list.items, newItem]};
      }
      return list;
    });

    saveItems(updatedItems);
    setItemName('');
    setItemCategory('');
    setItemQuantity(1);
    setItemPurchased(false);

    notify('success', 'Item Added', 'The item has been added successfully.');
    navigation.goBack();
  };

  return (
    <View style={AddShoppingListScreenStyles.container}>
      <NotificationManager />
      <Text style={AddShoppingListScreenStyles.title}>Add Item to List</Text>
      <TextInput
        style={AddShoppingListScreenStyles.input}
        placeholder="Enter item name"
        placeholderTextColor="#999"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={AddShoppingListScreenStyles.input}
        placeholder="Enter item category"
        placeholderTextColor="#999"
        value={itemCategory}
        onChangeText={setItemCategory}
      />
      <TextInput
        style={AddShoppingListScreenStyles.input}
        placeholder="Enter item quantity"
        placeholderTextColor="#999"
        value={String(itemQuantity)}
        keyboardType="numeric"
        onChangeText={text => setItemQuantity(Number(text))}
      />
      <TouchableOpacity
        style={AddShoppingListScreenStyles.checkbox}
        onPress={() => setItemPurchased(!itemPurchased)}>
        <Text style={AddShoppingListScreenStyles.checkboxText}>
          {itemPurchased ? 'Purchased' : 'Not Purchased'}
        </Text>
      </TouchableOpacity>
      <View style={AddShoppingListScreenStyles.modalButtons}>
        <TouchableOpacity
          style={AddShoppingListScreenStyles.modalButton}
          onPress={addItem}>
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

export default AddItemScreen;
