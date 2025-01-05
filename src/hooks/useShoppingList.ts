import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';
import {ShoppingList} from '../common/interfaces/ShoppingList';

export const useShoppingList = () => {
  const [items, setItems] = useState<ShoppingList[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('@shopping_lists');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };
    loadItems();
  }, []);

  const saveItems = async (newItems: ShoppingList[]) => {
    try {
      await AsyncStorage.setItem('@shopping_lists', JSON.stringify(newItems));
      setItems(newItems);
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };

  return {items, setItems, saveItems};
};
