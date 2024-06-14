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

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [loading, isLoading] = useState(false);
  const [valid, setValid] = useState(true);
  const [loadingCampuses, isLoadingCampuses] = useState(true);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const fetchOptions = async () => {
    try {
      // Replace with your actual API endpoint
      isLoadingCampuses(true);
      const response = await fetchCampusIds();
      // const data = await response.json();
      setFilteredOptions(response); // Assuming response structure has an array of options
    } catch (error) {
      console.error('Error fetching options:', error);
      // Handle error fetching options
    } finally {
      isLoadingCampuses(false);
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust the regex based on your phone number requirements
    return phoneRegex.test(phone);
  };

  const validatePin = (digitpin: string) => {
    const pinRegex = /^[0-9]{4}$/;
    return pinRegex.test(digitpin);
  };
  const auth = useAuth();
  const signIn = async () => {
    setPhoneError('');
    setPinError('');

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
      setValid(false);
    }

    if (!validatePin(pin)) {
      setPinError('PIN must be exactly 4 digits.');
      setValid(false);
    }

    if (valid) {
      isLoading(true);
      await auth.signIn(phoneNumber, pin, selectedOption);
    }
  };
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    fetchOptions();
  }, []);
  const handleOptionSelected = (option: string) => {
    setSelectedOption(option);
    console.log('opt', selectedOption);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        // <>
        //   <TextInput
        //     style={styles.input}
        //     placeholder="Username"
        //     value={username}
        //     onChangeText={setUsername}
        //   />
        //   <TextInput
        //     style={styles.input}
        //     placeholder="Password"
        //     secureTextEntry
        //     value={password}
        //     onChangeText={setPassword}
        //   />
        //   <Button title="Login" onPress={signIn} />
        //   <Button
        //     title="Sign Up"
        //     onPress={() => navigation.navigate('Signup')}
        //   />
        // </>
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
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={text => {
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
                options={filteredOptions}
                onOptionSelected={handleOptionSelected}
                isLoadingCampuses={loadingCampuses}
                // placeholder={'Search..'}
              />
            ) : (
              <Loading />
            )}
          </View>
          {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
          {pinError ? <Text style={styles.error}>{pinError}</Text> : null}
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
    // marginBottom:,
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
});

export default LoginScreen;
