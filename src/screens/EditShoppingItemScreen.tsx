import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import NotificationManager, {notify} from '../components/NotificationManager';
import {DefaultCategories} from '../common/data/defaultCategories';
import {Picker} from '@react-native-picker/picker';
import Navbar from '../components/NavBar';
import {useTheme} from '../context/ThemeContext';
import LightModeTheme from '../theme/LightModeTheme';
import DarkModeTheme from '../theme/DarkModeTheme';
import EditShoppingItemScreenStyles from '../styles/css/EditShoppingItemScreenStyles';

interface EditShoppingItemScreenProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

const EditShoppingItemScreen: React.FC<EditShoppingItemScreenProps> = ({
  navigation,
  route,
}) => {
  const {saveItems, items} = useShoppingList();
  const {itemId} = route.params;
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemCategory, setItemCategory] = useState('');
  const [itemPurchased, setItemPurchased] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const {darkMode} = useTheme();

  const theme = darkMode ? DarkModeTheme : LightModeTheme;

  useEffect(() => {
    let foundItem = null;

    for (const list of items) {
      foundItem = list.items.find(item => item.id === itemId);
      if (foundItem) {
        break;
      }
    }

    if (foundItem) {
      setItemName(foundItem.name);
      setItemQuantity(foundItem.quantity || 1);
      setItemCategory(foundItem.category || '');
      setItemPurchased(foundItem.purchased || false);
    }
  }, [itemId, items]);

  const saveItem = () => {
    if (
      itemName.trim() === '' ||
      (itemCategory.trim() === '' && customCategory.trim() === '')
    ) {
      notify('danger', 'Error', 'Please fill in all fields.');
      return;
    }

    const category = customCategory.trim() ? customCategory : itemCategory;

    const updatedItems = items.map(list => {
      const updatedListItems = list.items.map(item =>
        item.id === itemId
          ? {
              ...item,
              name: itemName,
              quantity: itemQuantity,
              category,
              purchased: itemPurchased,
            }
          : item,
      );
      return {...list, items: updatedListItems};
    });

    saveItems(updatedItems);
    notify(
      'success',
      'Item Updated',
      'Your shopping item has been updated successfully.',
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
          EditShoppingItemScreenStyles.container,
          {backgroundColor: theme.colors.background},
        ]}>
        <NotificationManager />
        <Text
          style={[
            EditShoppingItemScreenStyles.title,
            {color: theme.colors.text},
          ]}>
          Edit Shopping Item
        </Text>

        <TextInput
          style={[
            EditShoppingItemScreenStyles.input,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
            },
          ]}
          placeholder="Enter item name"
          placeholderTextColor={theme.colors.placeholder}
          value={itemName}
          onChangeText={setItemName}
        />

        <View style={{width: '100%', marginBottom: 20}}>
          <Picker
            selectedValue={itemCategory}
            style={{
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
            }}
            onValueChange={setItemCategory}>
            <Picker.Item label="Select a category" value="" />
            {Object.keys(DefaultCategories).map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>

          <TextInput
            style={[
              EditShoppingItemScreenStyles.input,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.inputBackground,
                color: theme.colors.text,
                marginTop: 20,
              },
            ]}
            placeholder="Or enter a custom category"
            placeholderTextColor={theme.colors.placeholder}
            value={customCategory}
            onChangeText={setCustomCategory}
            editable={itemCategory === ''}
          />
        </View>

        <TextInput
          style={[
            EditShoppingItemScreenStyles.input,
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.inputBackground,
              color: theme.colors.text,
            },
          ]}
          placeholder="Enter item quantity"
          placeholderTextColor={theme.colors.placeholder}
          value={String(itemQuantity)}
          keyboardType="numeric"
          onChangeText={text => setItemQuantity(Number(text))}
        />

        <TouchableOpacity
          style={[
            EditShoppingItemScreenStyles.checkbox,
            {backgroundColor: theme.colors.button},
          ]}
          onPress={() => setItemPurchased(!itemPurchased)}>
          <Text style={{color: theme.colors.text}}>
            {itemPurchased ? 'Purchased' : 'Not Purchased'}
          </Text>
        </TouchableOpacity>

        <View style={EditShoppingItemScreenStyles.modalButtons}>
          <TouchableOpacity
            style={[
              EditShoppingItemScreenStyles.modalButton,
              {backgroundColor: theme.colors.button},
            ]}
            onPress={saveItem}>
            <Text
              style={[
                EditShoppingItemScreenStyles.modalButtonText,
                {color: theme.colors.text},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              EditShoppingItemScreenStyles.modalButton,
              {backgroundColor: theme.colors.cancelButton},
            ]}
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                EditShoppingItemScreenStyles.modalButtonText,
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

export default EditShoppingItemScreen;
