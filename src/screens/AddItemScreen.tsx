import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import AddShoppingItemScreenStyles from '../styles/css/AddShoppingItemScreenStyles';
import NotificationManager, {notify} from '../components/NotificationManager';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';
import {DefaultCategories} from '../common/data/defaultCategories';
import {Picker} from '@react-native-picker/picker';

interface AddShoppingItemScreenProps {
  navigation: NavigationProp<any>;
}

const AddShoppingItemScreen: React.FC<AddShoppingItemScreenProps> = ({
  navigation,
}) => {
  const {saveItems, items} = useShoppingList();
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemCategory, setItemCategory] = useState('');
  const [itemPurchased, setItemPurchased] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const addItem = () => {
    if (
      itemName.trim() === '' ||
      (itemCategory.trim() === '' && customCategory.trim() === '')
    ) {
      notify('danger', 'Error', 'Please fill in all fields.');
      return;
    }

    const category = customCategory.trim() ? customCategory : itemCategory;

    const newItem: ShoppingItem = {
      id: `${Date.now()}_item`,
      name: itemName,
      quantity: itemQuantity,
      category: category,
      purchased: itemPurchased,
    };

    const updatedItems = items.map(list => {
      if (list.id === 'someListId') {
        return {...list, items: [...list.items, newItem]};
      }
      return list;
    });

    saveItems(updatedItems);
    setItemName('');
    setItemCategory('');
    setItemQuantity(1);
    setItemPurchased(false);
    setCustomCategory('');
    notify(
      'success',
      'Item Added',
      'Your shopping item has been added successfully.',
    );
    navigation.goBack();
  };

  return (
    <View style={AddShoppingItemScreenStyles.container}>
      <NotificationManager />
      <Text style={AddShoppingItemScreenStyles.title}>Add Shopping Item</Text>

      <TextInput
        style={AddShoppingItemScreenStyles.input}
        placeholder="Enter item name"
        placeholderTextColor="#000000"
        value={itemName}
        onChangeText={setItemName}
      />

      <View style={{width: '100%', marginBottom: 20}}>
        <Text style={{marginBottom: 5}}>Select or enter a category</Text>

        <Picker
          selectedValue={itemCategory}
          style={[
            AddShoppingItemScreenStyles.input,
            {backgroundColor: itemCategory === '' ? '#ffffff' : '#ffffff'},
          ]}
          onValueChange={setItemCategory}>
          <Picker.Item label="Select a category" value="" />
          {Object.keys(DefaultCategories).map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>

        <TextInput
          style={AddShoppingItemScreenStyles.input}
          placeholder="Or enter a custom category"
          placeholderTextColor="#000000"
          value={customCategory}
          onChangeText={setCustomCategory}
          editable={itemCategory === ''}
        />
      </View>

      <TextInput
        style={AddShoppingItemScreenStyles.input}
        placeholder="Enter item quantity"
        placeholderTextColor="#000000"
        value={String(itemQuantity)}
        keyboardType="numeric"
        onChangeText={text => setItemQuantity(Number(text))}
      />

      <TouchableOpacity
        style={AddShoppingItemScreenStyles.checkbox}
        onPress={() => setItemPurchased(!itemPurchased)}>
        <Text
          style={[
            AddShoppingItemScreenStyles.checkboxText,
            itemPurchased
              ? AddShoppingItemScreenStyles.statusReady
              : AddShoppingItemScreenStyles.statusMissed,
          ]}>
          {itemPurchased ? 'Purchased' : 'Not Purchased'}
        </Text>
      </TouchableOpacity>

      <View style={AddShoppingItemScreenStyles.modalButtons}>
        <TouchableOpacity
          style={AddShoppingItemScreenStyles.modalButton}
          onPress={addItem}>
          <Text style={AddShoppingItemScreenStyles.modalButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            AddShoppingItemScreenStyles.modalButton,
            AddShoppingItemScreenStyles.cancelButton,
          ]}
          onPress={() => navigation.goBack()}>
          <Text style={AddShoppingItemScreenStyles.modalButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddShoppingItemScreen;
