import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import AddressList from '../Laundry/Address/AddressList';

type RootStackParamList = {
  ProfileScreen: undefined;
  AddressScreen: undefined;
};

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddressScreen'
>;

const Address: React.FC = () => {
  const navigation = useNavigation<AddressScreenNavigationProp>();

  const handleBack = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleAddressSelect = (address: any) => {
    console.log('Selected address:', address);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address List</Text>
      </View>
      <AddressList
        onBack={handleBack}
        onAddressSelect={handleAddressSelect}
        showHeader={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E1',
  },
  headerContainer: {
    backgroundColor: '#FFDC52',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});

export default Address;
