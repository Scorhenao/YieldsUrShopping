import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import {ShoppingList} from '../common/interfaces/ShoppingList';
import {HomeScreenStyles} from '../styles/css/HomeScreenStyle';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';
import Navbar from '../components/NavBar';
import {Switch} from 'react-native';
import {notify} from '../components/NotificationManager';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {items, saveItems} = useShoppingList();
  const {theme} = useTheme();
  const [expandedListId, setExpandedListId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log('Shopping lists loaded:', items);
  }, [items]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Screen focused, refreshing items');
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 100);
    });

    return unsubscribe;
  }, [navigation]);

  const toggleItemsVisibility = (listId: string) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const handleTogglePurchased = (itemId: string, newValue: boolean) => {
    const updatedItems = items.map(list => {
      const updatedItemsList = list.items.map(item =>
        item.id === itemId ? {...item, purchased: newValue} : item,
      );
      return {...list, items: updatedItemsList};
    });

    saveItems(updatedItems);
  };

  const deleteShoppingList = (listId: string) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this shopping list?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const updatedItems = items.filter(item => item.id !== listId);
            saveItems(updatedItems);
            notify(
              'success',
              'List Deleted',
              'Your shopping list has been deleted.',
            );
          },
        },
      ],
      {cancelable: false},
    );
  };

  const deleteShoppingItem = (listId: string, itemId: string) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const updatedItems = items.map(list => {
              if (list.id === listId) {
                return {
                  ...list,
                  items: list.items.filter(item => item.id !== itemId),
                };
              }
              return list;
            });
            saveItems(updatedItems);
            notify('success', 'Item Deleted', 'The item has been removed.');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderShoppingItem = ({item}: {item: ShoppingItem}) => (
    <View
      style={[
        HomeScreenStyles.shoppingItemContainer,
        {backgroundColor: theme.colors.background},
      ]}>
      <View style={HomeScreenStyles.itemRow}>
        <Text
          style={[
            HomeScreenStyles.shoppingItemText,
            {color: theme.colors.text},
          ]}>
          {item.name}
        </Text>
        <View style={HomeScreenStyles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EditShoppingItem', {
                itemId: item.id,
                onGoBack: async () => {
                  setIsRefreshing(true);
                  try {
                    const storedItems = await AsyncStorage.getItem(
                      '@shopping_lists',
                    );
                    if (storedItems) {
                      saveItems(JSON.parse(storedItems));
                    }
                  } catch (error) {
                    console.error('Error reloading items:', error);
                  }
                  setIsRefreshing(false);
                },
              })
            }>
            <Icon name="pencil" size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => deleteShoppingItem(expandedListId || '', item.id)}>
            <Icon name="trash" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      {item.quantity && (
        <Text
          style={[
            HomeScreenStyles.shoppingItemText,
            {color: theme.colors.text},
          ]}>
          Quantity: {item.quantity}
        </Text>
      )}
      {item.category && (
        <Text
          style={[
            HomeScreenStyles.shoppingItemText,
            {color: theme.colors.text},
          ]}>
          Category: {item.category}
        </Text>
      )}
      <View style={HomeScreenStyles.statusContainer}>
        <Text
          style={[
            HomeScreenStyles.statusText,
            item.purchased
              ? HomeScreenStyles.statusReady
              : HomeScreenStyles.statusMissed,
          ]}>
          {item.purchased ? 'Ready' : 'Missed'}
        </Text>

        <Switch
          value={item.purchased}
          onValueChange={newValue => handleTogglePurchased(item.id, newValue)}
        />
      </View>
    </View>
  );

  const renderList = ({item}: {item: ShoppingList}) => {
    console.log(`Rendering items for list ${item.name}:`, item.items);

    const handleLongPress = () => {
      Alert.alert(
        'Manage List',
        'Would you like to edit or delete this list?',
        [
          {
            text: 'Edit',
            onPress: () => {
              navigation.navigate('EditShoppingList', {
                listId: item.id,
                onGoBack: async () => {
                  setIsRefreshing(true);
                  try {
                    const storedItems = await AsyncStorage.getItem(
                      '@shopping_lists',
                    );
                    if (storedItems) {
                      saveItems(JSON.parse(storedItems));
                    }
                  } catch (error) {
                    console.error('Error reloading items:', error);
                  }
                  setIsRefreshing(false);
                },
              });
            },
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              deleteShoppingList(item.id);
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    };

    return (
      <View
        style={[
          HomeScreenStyles.itemContainer,
          {backgroundColor: theme.colors.background},
        ]}>
        <View style={HomeScreenStyles.listHeader}>
          <TouchableOpacity
            onPress={() => toggleItemsVisibility(item.id)}
            onLongPress={handleLongPress}
            style={HomeScreenStyles.touchableRow}>
            <Text
              style={[HomeScreenStyles.itemText, {color: theme.colors.text}]}>
              {item.name} {item.purpose ? `(${item.purpose})` : ''}
            </Text>
            <View style={HomeScreenStyles.arrowContainer}>
              <Text
                style={[HomeScreenStyles.arrow, {color: theme.colors.text}]}>
                {expandedListId === item.id ? '▲' : '▼'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {expandedListId === item.id && (
          <View>
            {Array.isArray(item.items) && item.items.length > 0 ? (
              <FlatList
                data={item.items}
                keyExtractor={i => i.id}
                renderItem={renderShoppingItem}
              />
            ) : (
              <Text
                style={[
                  HomeScreenStyles.emptyListText,
                  {color: theme.colors.text},
                ]}>
                This list doesn't have items.
              </Text>
            )}
            <TouchableOpacity
              style={HomeScreenStyles.addButton}
              onPress={() =>
                navigation.navigate('AddShoppingItem', {listId: item.id})
              }>
              <Text style={HomeScreenStyles.addButtonText}>+ Add Item</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <Navbar />
      <View
        style={[
          HomeScreenStyles.container,
          {backgroundColor: theme.colors.background},
        ]}>
        <Text style={[HomeScreenStyles.title, {color: theme.colors.text}]}>
          Shopping Lists
        </Text>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderList}
          ListEmptyComponent={
            <Text
              style={[HomeScreenStyles.emptyText, {color: theme.colors.text}]}>
              There are no lists yet.
            </Text>
          }
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
        <TouchableOpacity
          style={[
            HomeScreenStyles.floatingButton,
            {backgroundColor: theme.colors.button},
          ]}
          onPress={() => navigation.navigate('AddShoppingList')}>
          <Text style={HomeScreenStyles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HomeScreen;
