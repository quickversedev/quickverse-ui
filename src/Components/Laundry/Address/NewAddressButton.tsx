import React from 'react';
import {Pressable, Text} from 'react-native';

import styles from '../styles';

interface AddNewAddressButtonProps {
  onPress: () => void;
}

const AddNewAddressButton: React.FC<AddNewAddressButtonProps> = ({onPress}) => {
  return (
    <Pressable style={styles.checkoutButton} onPress={onPress}>
      <Text style={styles.checkoutButtonText}>Add New Address</Text>
    </Pressable>
  );
};

export default AddNewAddressButton;
