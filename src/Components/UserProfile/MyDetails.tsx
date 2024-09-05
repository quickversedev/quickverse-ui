import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './profileNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker'; // Import Picker

// Type for navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

const MyDetailsScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  // State to hold user details
  const [details, setDetails] = useState({
    fullName: '',
    phoneNumber: '',
    countryCode: '+91',  // Default country code
    email: '',
    college: '',
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header Container */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#A52A2A" />
        </TouchableOpacity>
        <Text style={styles.heading}>My Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image Section */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          <TouchableOpacity style={styles.editIcon}>
            <MaterialCommunityIcons name="pencil" size={20} color="#A52A2A" />
          </TouchableOpacity>
        </View>

        {/* Detail Input Sections */}
        <View style={styles.inputSection}>
          {/* Full Name */}
          <Text style={styles.subheading}>FULL NAME</Text>
          <View style={styles.detailBox}>
            <TextInput
              style={styles.textInput}
              value={details.fullName}
              onChangeText={(text) => setDetails({ ...details, fullName: text })}
              placeholder="Enter your full name"
            />
          </View>

          {/* Phone Number */}
          <Text style={styles.subheading}>PHONE NUMBER</Text>
          <View style={styles.phoneSection}>
            <View style={styles.countryCodePicker}>
              <Picker
                selectedValue={details.countryCode}
                onValueChange={(value) => setDetails({ ...details, countryCode: value })}
                style={styles.picker}
              >
                <Picker.Item label="+91" value="+91" />
                <Picker.Item label="+1" value="+1" />
                <Picker.Item label="+44" value="+44" />
                <Picker.Item label="+61" value="+61" />
                {/* Add more country codes as needed */}
              </Picker>
            </View>
            <View style={[styles.detailBox, { flex: 1 }]}>
              <TextInput
                style={styles.textInput}
                value={details.phoneNumber}
                onChangeText={(text) => setDetails({ ...details, phoneNumber: text })}
                placeholder="Enter your phone number"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Email */}
          <Text style={styles.subheading}>EMAIL</Text>
          <View style={styles.detailBox}>
            <TextInput
              style={styles.textInput}
              value={details.email}
              onChangeText={(text) => setDetails({ ...details, email: text })}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          {/* College */}
          <Text style={styles.subheading}>COLLEGE</Text>
          <View style={styles.detailBox}>
            <TextInput
              style={styles.textInput}
              value={details.college}
              onChangeText={(text) => setDetails({ ...details, college: text })}
              placeholder="Enter your college"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Main container for content inside the ScrollView
  container: {
    flexGrow: 1,
    backgroundColor: '#FFDC52',
    padding: 20,
  },
  // Header styles
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFE474',
    paddingVertical: 16,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 10,
    alignItems: 'center',
  },
  backButton: {
    marginRight: 'auto',
    left: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A52A2A',
    textAlign: 'center',
    flex: 1,
  },
  // Image section
  imageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
  },
  editIcon: {
    position: 'absolute',
    right: '35%',
    bottom: '15%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 5,
    elevation: 4,
  },
  // Input section styles
  inputSection: {
    marginBottom: 20,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8F1413',
    marginBottom: 5,
    marginLeft: 10,
  },
  detailBox: {
    backgroundColor: '#FFDF63',
    padding: 10,
    borderRadius: 20,
    borderColor: '#8F1413',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.50,
    shadowRadius: 3,
    elevation: 10,
  },
  textInput: {
    flex: 0,
    fontSize: 16,
    fontWeight: '500',
    color: '#103E60',
    marginRight: 10,
  },
  // Phone number and country code styles
  phoneSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  countryCodePicker: {
    backgroundColor: '#FFDF63',
    borderColor: '#8F1413',
    borderWidth: 1,
    borderRadius: 20,
    padding: 0,
    marginRight: 10,
    marginTop: -12,
  },
  picker: {
    height: 40,
    width: 110, // Adjust width based on how much space you need for the country code
  },
  // Save Button
  saveButton: {
    backgroundColor: '#8F1413',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default MyDetailsScreen;
