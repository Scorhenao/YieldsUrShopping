import {StyleSheet} from 'react-native';

const AddShoppingItemScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#000000',
  },
  placeholder: {
    color: '#999',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkbox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    borderRadius: 5,
    padding: 10,
  },
  statusReady: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  statusMissed: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
});

export default AddShoppingItemScreenStyles;
