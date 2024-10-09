import React, {useState} from 'react';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

export type RootStackParamList = {
  Login: undefined;
  Help: undefined;
  Signup: undefined;
  OtpVerification: undefined;
  LoggedIn: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [responseError, setResponseError] = useState<string>('');
  const [loading, isLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const auth = useAuth();

  const validate = () => {
    let isValid = true;
    setPhoneError('');
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      isValid = false;
    }
    return isValid;
  };

  const signIn = async () => {
    if (validate()) {
      isLoading(true);
      await auth.signIn(phoneNumber, '0000').catch(error => {
        handleSignInError(error);
      });
      isLoading(false);
      navigation.navigate('OtpVerification'); // Navigate to OTP verification screen
    }
  };

  const handleSignInError = (error: any) => {
    if (error.includes('1004')) {
      setResponseError('Incorrect username or password. Please try again.');
    } else {
      setResponseError('An unknown error occurred. Please try again.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {loading ? (
            <Loading />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}>
              <Image
                source={require('../../data/images/qv-blue.png')}
                style={styles.logo}
              />
              <Text style={styles.header}>Log in</Text>
              
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                  name="phone"
                  size={24}
                  color={theme.colors.secondary}
                  style={styles.icon}
                />
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Mobile Number"
                  value={phoneNumber}
                  onChangeText={text => {
                    setPhoneError('');
                    setPhoneNumber(text);
                  }}
                  placeholderTextColor={theme.colors.secondary}
                  keyboardType="phone-pad"
                />
              </View>

              {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
              {responseError ? <Text style={styles.error}>{responseError}</Text> : null}
              
              <TouchableOpacity onPress={signIn} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('LoggedIn')} style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signUpButton}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFD700', // Adjusted to match the yellow background color
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFD700',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 160,
    alignSelf: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#8B0000', // Matching the red/maroon color
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderColor: '#8B0000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#FFD700',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#8B0000',
  },
  icon: {
    marginRight: 8,
  },
  countryCode: {
    color: '#8B0000',
    fontSize: 16,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    marginTop: 10,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#8B0000',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#000',
    marginRight: 4,
  },
  signUpButton: {
    color: '#8B0000',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default LoginScreen;
