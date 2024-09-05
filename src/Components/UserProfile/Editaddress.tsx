import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './profileNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Type for navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;
const EditAddressScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [label, setLabel] = useState('Home'); // Manage label selection
  const [address, setAddress] = useState({
    fullAddress: '', // New field for full address
    street: '',
    postCode: '',
    apartment: ''
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#A52A2A" />
        </TouchableOpacity>
        <Text style={styles.heading}>My Addresses</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Full Address */}
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheading}>ADDRESS</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Full Address"
          value={address.fullAddress}
          onChangeText={(text) => setAddress({ ...address, fullAddress: text })}
        />

        {/* Street and Post Code */}
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheading}>STREET</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Street"
          value={address.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
        />

        <View style={styles.subheadingContainer}>
          <Text style={styles.subheading}>POST CODE</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Post Code"
          keyboardType="numeric"
          value={address.postCode}
          onChangeText={(text) => setAddress({ ...address, postCode: text })}
        />

        {/* Hostel / Apartment */}
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheading}>HOSTEL / APPARTMENT</Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Hostel / Apartment"
          value={address.apartment}
          onChangeText={(text) => setAddress({ ...address, apartment: text })}
        />

        {/* Label Section */}
        <View style={styles.subheadingContainer}>
          <Text style={styles.subheading}>LABEL AS</Text>
        </View>
        <View style={styles.labelContainer}>
          <View style={styles.labelRow}>
            <TouchableOpacity
              style={[styles.labelButton, label === 'Home' && styles.selectedLabel]}
              onPress={() => setLabel('Home')}
            >
              <Text style={[styles.labelText, label === 'Home' && styles.selectedLabelText]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.labelButton, label === 'Work' && styles.selectedLabel]}
              onPress={() => setLabel('Work')}
            >
              <Text style={[styles.labelText, label === 'Work' && styles.selectedLabelText]}>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.labelButton, label === 'Other' && styles.selectedLabel]}
              onPress={() => setLabel('Other')}
            >
              <Text style={[styles.labelText, label === 'Other' && styles.selectedLabelText]}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}
          onPress={() => navigation.navigate('AddressScreen')}>
          <Text style={styles.saveButtonText}>SAVE LOCATION</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Stylesheet for Layout
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFDC52',// Background color from the image
    marginTop: 50,
  },
  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFE474',
    paddingVertical: 16,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 8,
    alignItems: 'center',
    position: 'absolute', // Position the header at the top of the screen
    top: 0, // Align it to the top
    left: 0, // Align it fully from the left
    right: 0, // Stretch fully to the right
    zIndex: 10, // Ensure the header stays on top of other elements
  },
  backButton: {
    marginRight: 'auto',
    left: 30, // Move the back button to the left
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#8F1413',
    textAlign: 'center',
    marginRight: 20,

    flex: 1,
  },
  // Subheading Styles
  subheadingContainer: {
    marginTop: 15,
    marginBottom: 5,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8F1413', // Dark brown for subheading
  },
  // Input Section Styles
  textInput: {
    color: '#103E60',
    backgroundColor: '#FFDF63',
    padding: 15,
    borderRadius: 20,
    borderColor: '#8F1413',
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 10,
    elevation: 6,
  },
  // Label Section Styles
  labelContainer: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelButton: {
    flex: 1,
    padding: 10,
    borderRadius: 25,
    borderColor: '#8F1413',
    borderWidth: 1,
    backgroundColor: '#FFE474', // Yellow label background
    alignItems: 'center',
    marginRight: 10,
  },
  selectedLabel: {
    backgroundColor: '#8F1413', // Selected red background
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A52A2A', // Red text for unselected label
  },
  selectedLabelText: {
    color: '#FFF', // White text for selected label
  },
  // Save Button Styles
  saveButton: {
    backgroundColor: '#8F1413',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default EditAddressScreen;
