// src/components/LoginScreen.tsx
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useAuth} from '../../utils/AuthContext';
import {Loading} from '../../utils/Loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import theme from '../../theme';
import CustomButton from '../../utils/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dropdown from '../../utils/Dropdowm';
import {fetchCampusIds} from '../../services/fetchCampusIds';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>(' ');
  const [pin, setPin] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [campusIdError, setCampusIdError] = useState<string>('');
  const [loading, isLoading] = useState(false);
  const [loadingCampuses, isLoadingCampuses] = useState(true);
  const [campusIds, setCampusIds] = useState<string[]>([]);
  const [selectedCampusId, setSelectedCampusId] = useState<string>('');

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const fetchOptions = async () => {
    try {
      isLoadingCampuses(true);
      const response = await fetchCampusIds();
      setCampusIds(response);
    } catch (error) {
      console.error('Error fetching options:', error);
    } finally {
      isLoadingCampuses(false);
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  



  const validatePin = (digitpin: string) => {
    const pinRegex = /^[0-9]{4}$/;
    return pinRegex.test(digitpin);
  };
  const auth = useAuth();
  const validate = () => {
    let isValid = true;
    setPhoneError('');
    setPinError('');
    setCampusIdError('');
    console.log('inside validate');
    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      isValid = false;
    }

    if (!validatePin(pin)) {
      setPinError('PIN must be exactly 4 digits.');

      isValid = false;
    }
    if (!campusIds.includes(selectedCampusId)) {
      setCampusIdError('Please select the campusId');
      isValid = false;
    }
    return isValid;
  };
  const signIn = async () => {
    if (validate()) {
      isLoading(true);
      await auth.signIn(phoneNumber, pin, selectedCampusId).catch(error => {
        console.error('Error signing in:', error);
      });
    }
    isLoading(false);
  };

  useEffect(() => {
    fetchOptions();
  }, []);
  const handleOptionSelected = (option: string) => {
    setSelectedCampusId(option);
    console.log('opt', selectedCampusId);
  };

  return (
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
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="phone"
              size={24}
              color={theme.colors.ternary}
              style={styles.icon}
            />
            <Text style = {styles.countrycode}> 91 </Text>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={text => {
                
                setPhoneNumber(text);
                setPhoneError('');
                
                
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
          <View>
            {!loadingCampuses ? (
              <Dropdown
                options={campusIds}
                onOptionSelected={handleOptionSelected}
                isLoadingCampuses={loadingCampuses}
              />
            ) : (
              <Loading />
            )}
          </View>
          {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
          {pinError ? <Text style={styles.error}>{pinError}</Text> : null}
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
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signUpText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  countrycode : {
    marginRight : -7,
    color : theme.colors.ternary,
    fontSize : 16,
  }
});

export default LoginScreen;
