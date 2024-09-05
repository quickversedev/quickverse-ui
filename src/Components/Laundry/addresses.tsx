import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store/store'; // Adjust the import path as needed
import {loadAddresses, deleteAddress} from '../../services/addressSclice';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Address} from '../../utils/canonicalModel';
import AddressForm from './Address/AddressPage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';

interface AddressListProps {
  onBack: () => void;
  onAddressSelect: (address: Address) => void;
}

const AddressList: React.FC<AddressListProps> = ({onBack, onAddressSelect}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {addresses, loading} = useSelector((state: RootState) => state.address);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    dispatch(loadAddresses());
  }, [dispatch]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.secondary}
        style={styles.loader}
      />
    );
  }

  const handleShowAddress = () => {
    setShowAddress(true);
  };

  const handleBackToCart = () => {
    setShowAddress(false);
  };

  // const handleAddressSubmit = (formData: Address) => {
  //   console.log('Address Submitted:', formData);
  // };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddressId(address.keyId);
    onAddressSelect(address); // Pass selected address to the parent component
  };

  const renderItem = ({item}: {item: Address}) => (
    <View style={styles.addressCard}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => dispatch(deleteAddress(item.keyId))}>
        <Icon name="delete" size={24} color={theme.colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => handleSelectAddress(item)}>
        <Icon
          name={
            selectedAddressId === item.keyId
              ? 'radio-button-checked'
              : 'radio-button-unchecked'
          }
          size={24}
          color={theme.colors.ternary}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.text}>Name: {item.address.name}</Text>
        <Text style={styles.text}>Phone: {item.address.phone}</Text>
        <Text style={styles.text}>
          Address: {item.address.concatenatedAddress}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Address List</Text>
        <Button title="Back" onPress={onBack} />
      </View>
      {!showAddress ? (
        <>
          <Pressable style={styles.checkoutButton} onPress={handleShowAddress}>
            <Text style={styles.checkoutButtonText}>Add New Address</Text>
          </Pressable>
          <FlatList
            data={addresses}
            keyExtractor={item => item.keyId}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </>
      ) : (
        <AddressForm onBack={handleBackToCart} />
      )}
    </View>
  );
};

//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   addressCard: {
//     marginBottom: 16,
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     position: 'relative', // For absolute positioning of delete button
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#ff6f61',
//     borderRadius: 20,
//     padding: 4,
//     width: 36,
//     height: 36,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioButton: {
//     marginRight: 16,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   checkoutButton: {
//     backgroundColor: '#007bff',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     margin: 16,
//   },
//   checkoutButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   list: {
//     flexGrow: 1,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.ternary,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    // backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: theme.colors.ternary,
  },
  checkoutButton: {
    backgroundColor: theme.colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  checkoutButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddressList;
