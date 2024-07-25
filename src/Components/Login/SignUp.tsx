// src/components/SignupScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Loading} from '../util/Loading';
import {useAuth} from '../../utils/AuthContext';
import theme from '../../theme';
import CustomButton from '../util/CustomButton';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dropdown from '../util/Dropdowm';
import fetchOptions from './getCampusList';
import CheckBox from '@react-native-community/checkbox';
import {Platform} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const SignupScreen: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setconfirmPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [loading, isLoading] = useState(false);
  const navigation = useNavigation();
  const [loadingCampuses, isLoadingCampuses] = useState(true);
  const [campusIds, setcampusIds] = useState<string[]>();
  const [selectedCampusId, setSelectedCampusId] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  useEffect(() => {
    if (pin === '' && confirmPin === '') {
      setPinError('');
    } else if (pin !== confirmPin && confirmPin !== '') {
      setPinError('Pin does not match');
    } else {
      setPinError('');
    }
  }, [pin, confirmPin]);
  const handleConfirmPinChange = (value: string) => {
    setconfirmPin(value);
  };
  const handleSignUpError = (error: any) => {
    if (error.includes('1005')) {
      setError('User Already Exist.!');
    } else if (error.includes('1111')) {
      setError('Unknown error.');
    } else {
      setError('An unknown error occurred. Please try again.');
    }
  };
  const validateFields = () => {
    let isValid = true;
    if (
      !fullName ||
      !phoneNumber.match(/^\d{10}$/) ||
      !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ||
      !pin.match(/^\d{4}$/) ||
      pin !== confirmPin ||
      !selectedCampusId ||
      pin !== confirmPin ||
      !isTermsAccepted
    ) {
      setError('Please fill out all fields correctly.');
      isValid = false;
    }
    // setError('');
    return isValid;
  };

  const auth = useAuth();
  const signUp = async () => {
    if (validateFields()) {
      try {
        isLoading(true);
        await auth.signUp(fullName, phoneNumber, selectedCampusId, email, pin);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.goBack();
          console.log('registration SuccessFull');
        }, 2000);
      } catch (error) {
        handleSignUpError(error);
      } finally {
        isLoading(false);
      }
    }
  };
  const getCamousList = async () => {
    try {
      isLoadingCampuses(true);
      const camousList = await fetchOptions();
      setcampusIds(camousList);
    } catch (error) {
      console.log('Error fetching options:', error);
    } finally {
      isLoadingCampuses(false);
    }
  };
  useEffect(() => {
    getCamousList();
  }, []);
  const handleOptionSelected = (option: string) => {
    const extractedString = option.split(' |')[0].trim();
    setSelectedCampusId(extractedString);
  };
  const handleTermsLinkPress = () => {
    // Open the terms and conditions link
    Linking.openURL(
      'https://drive.google.com/file/d/1RuqiipOyHGKPBxs3QTa5dky3VKL9TYO7/view?usp=sharing',
    );
  };
  const handlePrivacyPolicy = () => {
    // Open the terms and conditions link
    Linking.openURL(
      'https://drive.google.com/file/d/1XSIFl5teCUnWsl3DMfl0pDrmHRGoIm76/view?usp=sharing',
    );
  };
  const handleTermsCheckbox = () => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Image
          source={require('../../data/images/qv-blue.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>Sign Up</Text>
        <View
          style={
            Platform.OS === 'ios'
              ? styles.iosContainer
              : styles.androidContainer
          }>
          {!loadingCampuses && campusIds ? (
            <Dropdown
              options={campusIds}
              onOptionSelected={handleOptionSelected}
              isLoadingCampuses={loadingCampuses}
              placeHolder="CampusId"
              iconName="school"
            />
          ) : (
            <Loading />
          )}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="account-box"
              size={24}
              color={theme.colors.ternary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor={theme.colors.ternary}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="phone"
              size={24}
              color={theme.colors.ternary}
              style={styles.icon}
            />
            <Text style={styles.countryCode}>+91 </Text>
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
            <MaterialCommunityIcons
              name="email"
              size={24}
              color={theme.colors.ternary}
              style={styles.icon}
            />
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
            <MaterialCommunityIcons
              name="lock"
              size={24}
              color={theme.colors.ternary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="4-digit Pin"
              value={pin}
              onChangeText={setPin}
              placeholderTextColor={theme.colors.ternary}
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="lock-check"
              size={24}
              color={theme.colors.ternary}
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Pin"
              value={confirmPin}
              onChangeText={handleConfirmPinChange}
              placeholderTextColor={theme.colors.ternary}
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={styles.termsContainer}>
            <CheckBox
              value={isTermsAccepted}
              onValueChange={handleTermsCheckbox}
              style={styles.checkbox}
            />
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text onPress={handleTermsLinkPress} style={styles.termsLink}>
                Terms and Conditions
              </Text>
            </Text>
            <Text style={styles.termsText}>
              &{' '}
              <Text onPress={handlePrivacyPolicy} style={styles.termsLink}>
                Privacy Policy
              </Text>
            </Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {pinError ? <Text style={styles.error}>{pinError}</Text> : null}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="SignUp"
              onPress={signUp}
              buttonColor={theme.colors.ternary}
              textColor={theme.colors.primary}
              enabled={!loading && !loadingCampuses}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signUpText}>
              Already have an account? Sign Up
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Registration Successful!!</Text>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: theme.colors.primary,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: theme.colors.ternary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.ternary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: theme.colors.ternary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.primary,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  logo: {
    width: 150,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
  },
  signUpText: {
    marginTop: 16,
    textAlign: 'center',
    color: theme.colors.ternary,
    textDecorationLine: 'underline',
  },
  icon: {
    marginRight: 8,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    backgroundColor: theme.colors.ternary,
    padding: 20,
    borderRadius: 10,
    fontSize: 18,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  countryCode: {
    color: theme.colors.ternary,
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  termsText: {
    color: theme.colors.ternary,
  },
  termsLink: {
    color: theme.colors.ternary,
    textDecorationLine: 'underline',
  },
  iosContainer: {
    zIndex: 1,
    marginBottom: 10,
  },
  androidContainer: {
    marginBottom: 10,
  },
});
export default SignupScreen;
