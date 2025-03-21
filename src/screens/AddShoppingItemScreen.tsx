import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import NotificationManager, {notify} from '../components/NotificationManager';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';
import {DefaultCategories} from '../common/data/defaultCategories';
import {Picker} from '@react-native-picker/picker';
import Navbar from '../components/NavBar';
import {useTheme} from '../context/ThemeContext';
import LightModeTheme from '../theme/LightModeTheme';
import DarkModeTheme from '../theme/DarkModeTheme';
import AddShoppingItemScreenStyles from '../styles/css/AddShoppingItemScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

interface AddShoppingItemScreenProps {
  navigation: NavigationProp<any>;
}

const AddShoppingItemScreen: React.FC<AddShoppingItemScreenProps> = ({
  navigation,
  route,
}) => {
  const {saveItems, items} = useShoppingList();
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemCategory, setItemCategory] = useState('');
  const [itemPurchased, setItemPurchased] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const {darkMode} = useTheme();
  const {listId} = route.params;

  const theme = darkMode ? DarkModeTheme : LightModeTheme;

  // Efecto para recuperar categorías personalizadas desde AsyncStorage
  useEffect(() => {
    const loadCustomCategories = async () => {
      try {
        const storedCategories = await AsyncStorage.getItem('customCategories');
        if (storedCategories) {
          setCustomCategories(JSON.parse(storedCategories));
        }
      } catch (error) {
        console.error('Error loading custom categories:', error);
      }
    };

    loadCustomCategories();
  }, []);

  // Agregar un nuevo ítem
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
      if (list.id === listId) {
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

    // Si el usuario crea una categoría personalizada nueva
    if (customCategory.trim() && !customCategories.includes(customCategory)) {
      const updatedCustomCategories = [...customCategories, customCategory];
      setCustomCategories(updatedCustomCategories);
      AsyncStorage.setItem(
        'customCategories',
        JSON.stringify(updatedCustomCategories),
      ); // Guardar en AsyncStorage
    }

    notify(
      'success',
      'Item Added',
      'Your shopping item has been added successfully.',
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
          AddShoppingItemScreenStyles.container,
          {backgroundColor: theme.colors.background},
        ]}>
        <NotificationManager />
        <Text
          style={[
            AddShoppingItemScreenStyles.title,
            {color: theme.colors.text},
          ]}>
          Add Shopping Item
        </Text>

        <TextInput
          style={[
            AddShoppingItemScreenStyles.input,
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
            {DefaultCategories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
            {customCategories.map((category, index) => (
              <Picker.Item
                key={`custom-${index}`}
                label={category}
                value={category}
              />
            ))}
          </Picker>

          <TextInput
            style={[
              AddShoppingItemScreenStyles.input,
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
            AddShoppingItemScreenStyles.input,
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
            AddShoppingItemScreenStyles.checkbox,
            {backgroundColor: theme.colors.button},
          ]}
          onPress={() => setItemPurchased(!itemPurchased)}>
          <Text style={{color: theme.colors.text}}>
            {itemPurchased ? 'Purchased' : 'Not Purchased'}
          </Text>
        </TouchableOpacity>

        <View style={AddShoppingItemScreenStyles.modalButtons}>
          <TouchableOpacity
            style={[
              AddShoppingItemScreenStyles.modalButton,
              {backgroundColor: theme.colors.button},
            ]}
            onPress={addItem}>
            <Text
              style={[
                AddShoppingItemScreenStyles.modalButtonText,
                {color: theme.colors.text},
              ]}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              AddShoppingItemScreenStyles.modalButton,
              {backgroundColor: theme.colors.cancelButton},
            ]}
            onPress={() => navigation.goBack()}>
            <Text
              style={[
                AddShoppingItemScreenStyles.modalButtonText,
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

export default AddShoppingItemScreen;
