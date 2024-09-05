import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './profileNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// Type for navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;

const AddressScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const addresses = [
    {
      label: 'HOME',
      address: 'Flat No. 503, Royal Classic, Udaipur, Rajasthan',
      icon: 'home-outline'
    },
    {
      label: 'WORK',
      address: 'Third Space, Shobhagpura, Udaipur, Rajasthan',
      icon: 'briefcase-outline'
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}
        onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#A52A2A"/>
        </TouchableOpacity>
        <Text style={styles.heading}>My Addresses</Text>
      </View>

      {/* Address List */}
      <ScrollView contentContainerStyle={styles.container}>
        {addresses.map((item, index) => (
          <View key={index} style={styles.addressCard}>
            <View style={styles.addressLeft}>
              <MaterialCommunityIcons name={item.icon} size={34} color="#A52A2A" />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressLabel}>{item.label}</Text>
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
            <View style={styles.addressActions}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="pencil-outline" size={24} color="#A52A2A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="delete-outline" size={24} color="#A52A2A" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add New Address Button */}
        <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate('EditAddressScreen')}>
          <Text style={styles.addButtonText}>ADD NEW ADDRESS</Text>
          
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Stylesheet for Layout
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFDC52',
    width: '100%',
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFE474',
    paddingVertical: 16,
    paddingHorizontal: 10,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center the text
  },
  backButton: {
    position: 'absolute',
    left: 30, // Align back button to the left
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A52A2A',
    textAlign: 'center',
  },
  // Address Card Styles
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#FFE474',
    padding: 15,
    borderColor:'#8F1413',
    borderWidth:1,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.50,
    shadowRadius: 3,
    elevation: 10,
    width: '100%', // Make each card full width
  },
  addressLeft: {
    marginRight: 15,
    justifyContent: 'center',
  },
  addressContent: {
    flex: 1,
    justifyContent: 'center',
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F1413',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    fontWeight:'600',
    color: '#103E60',
  },
  addressActions: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  // Add Button Styles
  addButton: {
    backgroundColor: '#8F1413',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%', // Make the button full width
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default AddressScreen;
