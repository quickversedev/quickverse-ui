// src/components/LoginScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {useAuth} from '../../utils/AuthContext';
import {Loading} from '../util/Loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import theme from '../../theme';
import CustomButton from '../util/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dropdown from '../util/Dropdowm';
import {setCampus, setSkipLoginFlow} from '../../utils/Storage';
import fetchOptions from './getCampusList';
import {ScrollView} from 'react-native-gesture-handler';

export type RootStackParamList = {
  Login: undefined;
  Help: undefined;
  Signup: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [responseError, setResponseError] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [campusIdError, setCampusIdError] = useState<string>('');
  const [loading, isLoading] = useState(false);
  const [loadingCampuses, isLoadingCampuses] = useState(true);
  const [campusIds, setCampusIds] = useState<string[]>();
  const [selectedCampusId, setSelectedCampusId] = useState<string>('');

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePin = (digitpin: string) => {
    const pinRegex = /^[0-9]{4}$/;
    return pinRegex.test(digitpin);
  };
  const auth = useAuth();
  const {setSkipLogin} = useAuth();
  const validate = () => {
    let isValid = true;
    setPhoneError('');
    setPinError('');
    setCampusIdError('');
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      isValid = false;
    }

    if (!validatePin(pin)) {
      setPinError('PIN must be exactly 4 digits.');

      isValid = false;
    }
    if (selectedCampusId === '') {
      setCampusIdError('Please select the campusId');
      isValid = false;
    }
    return isValid;
  };
  const signIn = async () => {
    if (validate()) {
      isLoading(true);
      await auth.signIn(phoneNumber, pin, selectedCampusId).catch(error => {
        handleSignInError(error);
      });
    }
    let result = selectedCampusId.split(' |')[0];
    setCampus(result);
    isLoading(false);
  };
  const handleSignInError = (error: any) => {
    if (error.includes('1004')) {
      setResponseError('Incorrect username or password. Please try again.');
    } else if (error.includes('1001')) {
      setResponseError('Error occurred while retrieving the JWT Token.');
    } else if (error.includes('1002')) {
      setResponseError('Error occurred while processing the Login Request.');
    } else if (error.includes('1003')) {
      setResponseError('Error occurred while processing the Login Request.');
    } else if (error.includes('1006')) {
      setResponseError('User not Found.');
    } else if (error.includes('1111')) {
      setResponseError('Unknown error.');
    } else {
      setResponseError('An unknown error occurred. Please try again.');
    }
  };
  useEffect(() => {
    const getCamousList = async () => {
      try {
        isLoadingCampuses(true);
        const campusList = await fetchOptions();
        setCampusIds(campusList);
      } catch (error) {
        setResponseError('Error fetching campus details');
      } finally {
        isLoadingCampuses(false);
      }
    };
    getCamousList();
  }, []);
  const handleOptionSelected = (option: string) => {
    const extractedString = option.split(' |')[0].trim();
    setSelectedCampusId(extractedString);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topRightButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setSkipLogin(true);
              setSkipLoginFlow(true);
            }}
            style={styles.topRightButton}>
            <Text style={styles.topRightButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {loading ? (
            <Loading />
          ) : (
            <View style={styles.container}>
              <Image
                source={require('../../data/images/qv-blue.png')}
                style={styles.logo}
              />
              <Text style={styles.header}>Login</Text>
              <View
                style={
                  Platform.OS === 'ios'
                    ? styles.iosContainer
                    : styles.androidContainer
                }>
                {!loadingCampuses ? (
                  <Dropdown
                    options={campusIds ? campusIds : []}
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
                    onChangeText={text => {
                      setPhoneError('');
                      setPhoneNumber(text);
                    }}
                    placeholderTextColor={theme.colors.ternary}
                    keyboardType="phone-pad"
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
                    placeholder="4-digit PIN"
                    value={pin}
                    onChangeText={text => {
                      setPinError('');
                      setPin(text);
                    }}
                    placeholderTextColor={theme.colors.ternary}
                    secureTextEntry
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>

                {phoneError ? (
                  <Text style={styles.error}>{phoneError}</Text>
                ) : null}
                {pinError ? <Text style={styles.error}>{pinError}</Text> : null}
                {responseError ? (
                  <Text style={styles.error}>{responseError}</Text>
                ) : null}
                {campusIdError ? (
                  <Text style={styles.error}>{campusIdError}</Text>
                ) : null}
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title="Login"
                    onPress={signIn}
                    buttonColor={theme.colors.ternary}
                    textColor={theme.colors.primary}
                    enabled={!loading && !loadingCampuses}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.removeListener;
                    navigation.navigate('Help');
                  }}>
                  <Text style={styles.signUpText}>Forgot Passowrd?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.removeListener;
                    navigation.navigate('Signup');
                  }}>
                  <Text style={styles.signUpText}>
                    Don't have an account? Sign Up
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.primary,
    flex: 1,
  },
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
  logo: {
    width: 150,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
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
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  signUpText: {
    marginTop: 16,
    textAlign: 'center',
    color: theme.colors.ternary,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  countryCode: {
    color: theme.colors.ternary,
    fontSize: 16,
  },
  iosContainer: {
    zIndex: 1,
    marginBottom: 10,
  },
  androidContainer: {
    marginBottom: 10,
  },
  topRightButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  topRightButton: {
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
  topRightButtonText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
