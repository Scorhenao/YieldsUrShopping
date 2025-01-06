import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import {ShoppingList} from '../common/interfaces/ShoppingList';
import {HomeScreenStyles} from '../styles/css/HomeScreenStyle';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';
import Navbar from '../components/NavBar';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {items} = useShoppingList();
  const [expandedListId, setExpandedListId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    console.log('Items loaded:', items);
  }, [items]);

  const toggleItemsVisibility = (listId: string) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const renderShoppingItem = ({item}: {item: ShoppingItem}) => (
    <View style={HomeScreenStyles.shoppingItemContainer}>
      <Text style={HomeScreenStyles.shoppingItemText}>
        {item.name} (Quantity: {item.quantity}, Category: {item.category})
      </Text>
      <Text
        style={[
          HomeScreenStyles.statusText,
          item.purchased
            ? HomeScreenStyles.statusReady
            : HomeScreenStyles.statusMissed,
        ]}>
        {item.purchased ? 'Ready' : 'Missed'}
      </Text>
    </View>
  );

  const renderItem = ({item}: {item: ShoppingList}) => (
    <View style={HomeScreenStyles.itemContainer}>
      <View style={HomeScreenStyles.listHeader}>
        <Text style={HomeScreenStyles.itemText}>
          {item.name} ({item.purpose})
        </Text>
        <TouchableOpacity onPress={() => toggleItemsVisibility(item.id)}>
          <Text style={HomeScreenStyles.arrow}>
            {expandedListId === item.id ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>
      </View>

      {expandedListId === item.id && (
        <>
          {item.items && item.items.length > 0 ? (
            <FlatList
              data={item.items}
              keyExtractor={i => i.id}
              renderItem={renderShoppingItem}
            />
          ) : (
            <Text style={HomeScreenStyles.emptyListText}>
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
        </>
      )}
    </View>
  );

  return (
    <View style={HomeScreenStyles.container}>
      <Navbar />
      <Text style={HomeScreenStyles.title}>Shopping Lists</Text>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={HomeScreenStyles.emptyText}>
            There are no lists yet.
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        style={HomeScreenStyles.floatingButton}
        onPress={() => navigation.navigate('AddShoppingList')}>
        <Text style={HomeScreenStyles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
