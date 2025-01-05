import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useShoppingList} from '../hooks/useShoppingList';
import {ShoppingList} from '../common/interfaces/ShoppingList';
import {HomeScreenStyles} from '../styles/css/HomeScreenStyle';
import {ShoppingItem} from '../common/interfaces/ShoppingItem';

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {items, saveItems} = useShoppingList();
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState('');
  const [listPurpose, setListPurpose] = useState('');
  const [expandedListId, setExpandedListId] = useState<string | null>(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const addList = () => {
    if (listName.trim() === '' || listPurpose.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newList: ShoppingList = {
      id: `${Date.now()}`,
      name: listName,
      purpose: listPurpose,
      items: [],
    };

    saveItems([...items, newList]);
    setListName('');
    setListPurpose('');
    setModalVisible(false);
  };

  const toggleItemsVisibility = (listId: string) => {
    setExpandedListId(expandedListId === listId ? null : listId);
  };

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
        style={[
          HomeScreenStyles.floatingButton,
          buttonPressed && {backgroundColor: '#0056b3'},
        ]}
        onPressIn={() => setButtonPressed(true)} // Cambia el color cuando se toca
        onPressOut={() => setButtonPressed(false)} // Vuelve al color original cuando se suelta
        onPress={() => setModalVisible(true)}>
        <Text style={HomeScreenStyles.floatingButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={HomeScreenStyles.modalOverlay}>
          <View style={HomeScreenStyles.modalContent}>
            <Text style={HomeScreenStyles.modalTitle}>
              {items.length === 0 ? 'Add your first list' : 'Add your list'}
            </Text>
            <TextInput
              style={HomeScreenStyles.input}
              placeholder="Enter list name"
              value={listName}
              onChangeText={setListName}
            />
            <TextInput
              style={HomeScreenStyles.input}
              placeholder="Enter purpose of the list"
              value={listPurpose}
              onChangeText={setListPurpose}
            />
            <View style={HomeScreenStyles.modalButtons}>
              <TouchableOpacity
                style={HomeScreenStyles.modalButton}
                onPress={addList}>
                <Text style={HomeScreenStyles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  HomeScreenStyles.modalButton,
                  HomeScreenStyles.cancelButton,
                ]}
                onPress={() => setModalVisible(false)}>
                <Text style={HomeScreenStyles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
