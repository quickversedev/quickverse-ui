import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// import {Address} from '../../utils/canonicalModel';
import {Address} from '../../../utils/canonicalModel';
// import styles from './styles';
import styles from '../styles';

interface SelectedAddressProps {
  selectedAddress: Address | null;
  onChangeAddress: () => void;
}

const SelectedAddress: React.FC<SelectedAddressProps> = ({
  selectedAddress,
  onChangeAddress,
}) => {
  if (!selectedAddress) return null;

  return (
    <View style={styles.AddressContainer}>
      <View style={styles.showAddressCard}>
        <Text style={styles.title}>Address</Text>
        <View style={styles.addressDetails}>
          <Text style={styles.Addresstext}>
            Name: {selectedAddress.address.name}
          </Text>
          <Text style={styles.Addresstext}>
            Phone: {selectedAddress.address.phone}
          </Text>
          <Text style={styles.Addresstext}>
            Address: {selectedAddress.address.concatenatedAddress}
          </Text>
        </View>
        <TouchableOpacity style={styles.changeButton} onPress={onChangeAddress}>
          <Text style={styles.buttonText}>Change Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectedAddress;
