import {StyleSheet} from 'react-native';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
    width: '100%',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 10,
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    elevation: 2,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },

  floatingButtonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  shoppingItemContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    gap: 5,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  shoppingItemText: {
    fontSize: 16,
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusReady: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusMissed: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  emptyListText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
  touchableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
