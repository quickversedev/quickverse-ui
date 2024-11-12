import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import theme from '../../../theme';
import { fetchCampusIds } from '../../../services/fetchCampusIds';
import { Campus } from '../../../utils/canonicalModel'; // Ensure Campus type is correctly imported
import { authService } from '../../../services/authService'; // Import authService
import { useAuth } from '../../../utils/AuthContext';


export default function LoginDetails() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [campus, setCampus] = useState('');
  const [campusList, setCampusList] = useState<Campus[]>([]); // Explicitly define the type of campusList as Campus[]
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    // Fetch campus data on mount
    const loadCampusData = async () => {
      try {
        const campuses = await fetchCampusIds();
        setCampusList(campuses); // Now TypeScript knows campusList is an array of Campus
      } catch (error) {
        console.error('Error fetching campus data:', error);
        Alert.alert('Error', 'Unable to load campus data.');
      }
    };
    loadCampusData();
  }, []);

  // Validation functions
  const validateName = (text: string) => /^[A-Za-z]+$/.test(text);
  const validateEmail = (text: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(text);
  const validateDob = (selectedDob?: Date) => selectedDob && selectedDob < new Date();

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };
  const handleSubmit = async () => {
    if (!validateName(name)) {
      Alert.alert('Invalid Name', 'Name can only contain letters.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!dob || !validateDob(dob)) {
      Alert.alert('Invalid Date of Birth', 'Please select a valid date of birth.');
      return;
    }
    if (!campus) {
      Alert.alert('Select Campus', 'Please select a campus.');
      return;
    }

    // Prepare data for API call
    const formattedDob = dob.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
    const auth = useAuth();
    try {
      await auth.signUp(name, campus, email, formattedDob);
        Alert.alert('Success', 'Your details have been submitted successfully.');
        setModalVisible(false); // Close modal after successful submission
     
    } catch (error) {
      console.error('Sign-up error:', error);
      Alert.alert('Error', 'Unable to submit details. Please try again.');
    }
  };
  
  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Enter details</Text>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />

          {/* Date of Birth Input */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{dob ? dob.toDateString() : 'Enter your date of birth'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dob || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campus Picker */}
          <View style={styles.input}>
            <Picker
              selectedValue={campus}
              onValueChange={(itemValue) => setCampus(itemValue)}
            >
              <Picker.Item label="Select Campus" value="" />
              {campusList.map((campusItem) => (
                <Picker.Item
                  key={campusItem.campusId} // Use campusId (or the correct unique identifier)
                  label={campusItem.campusName} // Use campusName here
                  value={campusItem.campusId} // Use campusId as value
                />
              ))}
            </Picker>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.ternary,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  submitButton: {
    width: '70%',
    paddingVertical: 15,
    backgroundColor: theme.colors.ternary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
