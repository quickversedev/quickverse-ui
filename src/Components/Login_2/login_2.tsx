import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {loginRootStackParamList} from './login_navigator';

type LoginScreenNavigationProp = StackNavigationProp<
  loginRootStackParamList,
  'LoginScreen1'
>;

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validate = () => {
    let isValid = true;
    setPhoneError('');
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      isValid = false;
    }
    return isValid;
  };

  const handleContinue = () => {
    if (validate()) {
      navigation.navigate('otpverify');
    }
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <GestureHandlerRootView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
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

              {phoneError ? (
                <Text style={styles.error}>{phoneError}</Text>
              ) : null}

              <TouchableOpacity onPress={handleContinue} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don’t have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.signUpButton}>Sign Up</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={styles.skipButton}>
                <Text style={styles.skipButtonText}>Skip</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFD700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Added this to center horizontally
    padding: 16,
    backgroundColor: '#FFDC52',
  },
  scrollContainer: {
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    flexGrow: 1, // Allows proper centering inside ScrollView
  },
  logo: {
    width: 200, // Increased width
    height: 220, // Increased height
    alignSelf: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#8B0000',
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
    backgroundColor: '#FFDC52',
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
  skipButton: {
    marginTop: 16,
  },
  skipButtonText: {
    color: '#8B0000',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default LoginScreen;
