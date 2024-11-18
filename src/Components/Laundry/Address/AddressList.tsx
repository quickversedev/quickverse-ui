import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../../store/store';
import {loadAddresses, deleteAddress} from '../../../services/addressSclice';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {Address} from '../../../utils/canonicalModel';
import AddressForm from './AddressPage';
import AddressCard from './AddressCard';
import theme from '../../../theme';
import styles from '../styles';
import AddNewAddressButton from './NewAddressButton';
import Header from './AddressHeader';

interface AddressListProps {
  onBack: () => void;
  onAddressSelect: (address: Address) => void;
  showHeader?: boolean;
}

const AddressList: React.FC<AddressListProps> = ({
  onBack,
  onAddressSelect,
  showHeader = true,
}) => {
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

  const handleShowAddress = () => setShowAddress(true);
  const handleBackToCart = () => setShowAddress(false);

  const handleAddressSubmit = (formData: Address) => {
    console.log('Address Submitted:', formData);
    // Handle address submission logic
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddressId(address.keyId);
    onAddressSelect(address); // Pass selected address to the parent component
  };

  return (
    <View style={styles.container}>
      {/* Conditionally render the header based on the showHeader prop */}
      {showHeader && <Header onBack={onBack} />}
      {!showAddress ? (
        <>
          {/* Add New Address Button */}
          <AddNewAddressButton onPress={handleShowAddress} />
          {/* Address List */}
          <FlatList
            data={addresses}
            keyExtractor={item => item.keyId}
            renderItem={({item}) => (
              <AddressCard
                address={item}
                isSelected={selectedAddressId === item.keyId}
                onDelete={() => dispatch(deleteAddress(item.keyId))}
                onSelect={() => handleSelectAddress(item)}
              />
            )}
            contentContainerStyle={styles.list}
          />
        </>
      ) : (
        /* Address Form */
        <AddressForm onSubmit={handleAddressSubmit} onBack={handleBackToCart} />
      )}
    </View>
  );
};

export default AddressList;
