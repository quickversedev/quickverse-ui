import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../../theme';
import {Address} from '../../../utils/canonicalModel';
// import styles from '../styles';

interface AddressCardProps {
  address: Address;
  isSelected: boolean;
  onDelete: () => void;
  onSelect: () => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  onDelete,
  onSelect,
}) => {
  return (
    <View style={styles.addressCard}>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Icon name="delete" size={24} color={theme.colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.radioButton} onPress={onSelect}>
        <Icon
          name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={24}
          color={theme.colors.ternary}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Name: {address.address.name}</Text>
        <Text style={styles.text}>Phone: {address.address.phone}</Text>
        <Text style={styles.text}>
          Address: {address.address.concatenatedAddress}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressCard: {
    // Existing styles for the card
    backgroundColor: theme.colors.primary,
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: theme.colors.ternary,
    borderWidth: 1,
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 40, // Adjust margin to accommodate for icons
    flexShrink: 1, // Allow text to shrink if needed
  },
  text: {
    fontSize: 14,
    color: theme.colors.ternary,
    flexWrap: 'wrap', // Ensure text wraps
  },
});

export default AddressCard;
