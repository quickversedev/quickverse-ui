import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
  const handleDeleteClick = () => {
    console.log('delete clicked');
    onDelete();
  };

  return (
    <View style={styles.addressCard}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteClick()}>
        <MaterialCommunityIcons
          name="delete"
          size={24}
          color={theme.colors.secondary}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.radioButton} onPress={onSelect}>
        <MaterialCommunityIcons
          name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
          size={24}
          color={theme.colors.ternary}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.label}>Name: </Text>
          {address.address.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Phone: </Text>
          {address.address.phone}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Address: </Text>
          {address.address.concatenatedAddress}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressCard: {
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
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  radioButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 12,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 40,
    marginRight: 50,
    flexShrink: 1,
    // backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: theme.colors.ternary,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: 'bold', // Makes the label bold
    fontSize: 18,
  },
});

export default AddressCard;
