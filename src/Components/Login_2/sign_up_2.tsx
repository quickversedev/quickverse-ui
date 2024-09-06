import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dropdown from '../util/Dropdowm';
import CheckBox from '@react-native-community/checkbox';
import theme from '../../theme';

const SignupScreen: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedCampus, setSelectedCampus] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const validateFields = () => {
    let isValid = true;
    if (
      !fullName ||
      !phoneNumber.match(/^\d{10}$/) ||
      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      !selectedCampus ||
      !selectedLocation ||
      !isTermsAccepted
    ) {
      setError('Please fill out all fields correctly.');
      isValid = false;
    }
    return isValid;
  };

  const handleSignUp = () => {
    if (validateFields()) {
      console.log('Form is valid. Implement sign-up process here.');
    }
  };

  const handleTermsCheckbox = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Image
            source={require('../../data/images/qv-blue.png')}
            style={styles.logo}
          />
          <Text style={styles.header}>Sign up</Text>
          <Text style={styles.subHeader}>Please Enter Details</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor={theme.colors.ternary}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholderTextColor={theme.colors.ternary}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={theme.colors.ternary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Dropdown
              options={['College A', 'College B', 'College C']}
              onOptionSelected={setSelectedCampus}
              placeHolder="Choose College Name"
              iconName="school"
            />
          </View>

          <View style={styles.inputContainer}>
            <Dropdown
              options={['Location A', 'Location B', 'Location C']}
              onOptionSelected={setSelectedLocation}
              placeHolder="Choose Location"
              iconName="map-marker"
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignUp}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFDC60', // Yellow background as per the image
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFDC60', // Yellow background as per the image
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#B10A0A', // Red color for the "Sign up" text
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#B10A0A', // Red color for the "Please Enter Details" text
  },
  inputContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    borderColor: '#B10A0A',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF5CC',
    fontSize: 16,
    color: '#B10A0A', // Input text color
  },
  buttonContainer: {
    height: 50,
    backgroundColor: '#B10A0A', // Red button background color
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // White button text color
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SignupScreen;
