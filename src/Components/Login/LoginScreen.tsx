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
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {loginRootStackParamList} from './login_navigator';
import {setSkipLoginFlow} from '../../utils/Storage';
import {useAuth} from '../../utils/AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<
  loginRootStackParamList,
  'LoginScreen1'
>;

const LoginScreen: React.FC = () => {
  const {setSkipLogin} = useAuth();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const auth = useAuth();
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

  const handleContinue = async () => {
    if (validate()) {
      setLoading(true);
      await auth
        .sendOtp(phoneNumber)
        .then(() => {
          navigation.navigate('otpverify', {phoneNumber});
        })
        .catch(errorr => {
          setError(true);
          console.log('error in phone,', errorr);
        })
        .finally(() => {
          setLoading(false);
        });
      setPhoneNumber('');
    }
  };

  const handleSkipLogin = async () => {
    setSkipLoginFlow(true);
    setSkipLogin(true);
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
                    setError(false);
                  }}
                  placeholderTextColor={theme.colors.secondary}
                  keyboardType="phone-pad"
                />
              </View>

              {phoneError ? (
                <Text style={styles.error}>{phoneError}</Text>
              ) : null}
              {error ? (
                <Text style={styles.error}>
                  Error ocured while sending otp , please try again later
                </Text>
              ) : null}

              <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={loading ? undefined : handleContinue}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    color={theme.colors.secondary}
                  />
                ) : (
                  <Text style={styles.buttonText}>Continue</Text>
                )}
              </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
              onPress={handleSkipLogin}
              style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFDC52',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 50,
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
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
    height: 60,
    borderColor: '#8B0000',
    borderWidth: 3,
    width: 300,
    borderRadius: 15,
    marginBottom: 16,
    paddingHorizontal: 15,
    backgroundColor: '#FFDC52',
  },
  input: {
    flex: 1,
    fontSize: 20,
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
    width: '60%',
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  skipButtonText: {
    color: '#8B0000',
    fontSize: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default LoginScreen;
