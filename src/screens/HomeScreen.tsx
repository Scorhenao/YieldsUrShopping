import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
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
  const {items, saveItems} = useShoppingList();
  const [expandedListId, setExpandedListId] = useState<string | null>(null);

  const toggleItemsVisibility = (listId: string) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

  const renderItem = ({item}: {item: ShoppingList}) => (
    <View style={HomeScreenStyles.itemContainer}>
      <Navbar />

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
        <FlatList
          data={item.items}
          keyExtractor={i => i.id}
          renderItem={({item: shoppingItem}: {item: ShoppingItem}) => (
            <View>
              <Text>
                {shoppingItem.name} (Quantity: {shoppingItem.quantity},
                Category: {shoppingItem.category})
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text>No items yet in this list.</Text>}
        />
      )}
    </View>
  );

  return (
    <View style={HomeScreenStyles.container}>
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
