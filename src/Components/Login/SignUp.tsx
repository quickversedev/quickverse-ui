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
} from 'react-native';
import {Loading} from '../../utils/Loading';
import {useAuth} from '../../utils/AuthContext';
import theme from '../../theme';
import CustomButton from '../../utils/CustomButton';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dropdown from '../../utils/Dropdowm';
import fetchOptions from './getCampusList';

const SignupScreen: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setconfirmPin] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  // const [valid, setValid] = useState<boolean>(true);
  const [loading, isLoading] = useState(false);
  const navigation = useNavigation();
  const [loadingCampuses, isLoadingCampuses] = useState(true);
  const [campusIds, setcampusIds] = useState<string[]>();
  const [selectedCampusId, setSelectedCampusId] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handlingconfirmPin = (value: string) => {
    setconfirmPin(value);

    if (pin !== value) {
      setError('Confirmation pin does not match the original pin');
    } else {
      setError('');
    }
  };
  const handleSignUpError = (error: any) => {
    if (error.includes('1005')) {
      setError('Error occurred while creating the User.');
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
      pin != confirmPin ||
      !selectedCampusId
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
        const response = await auth.signUp(
          fullName,
          phoneNumber,
          selectedCampusId,
          email,
          pin,
        );
        console.log('signup response', typeof response);
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
      console.error('Error fetching options:', error);
    } finally {
      isLoadingCampuses(false);
    }
  };
  useEffect(() => {
    getCamousList();
  }, []);
  const handleOptionSelected = (option: string) => {
    setSelectedCampusId(option);
  };
 
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../data/images/qv-blue.png')}
        style={styles.logo}
      />
      <Text style={styles.header}>Sign Up</Text>
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
        
          
        <Text style={styles.countryCode}>91</Text>
        
         
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
          placeholder="confirm Pin"
          value={confirmPin}
          onChangeText={handlingconfirmPin}
          placeholderTextColor={theme.colors.ternary}
          secureTextEntry
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <View>
        {!loadingCampuses && campusIds ? (
          <Dropdown
            options={campusIds}
            onOptionSelected={handleOptionSelected}
            isLoadingCampuses={loadingCampuses}
            // placeholder={'Search..'}
          />
        ) : (
          <Loading />
        )}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
        <Text style={styles.signUpText}>Already have an account? Sign Up</Text>
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
  countryCode :{
    marginRight: -3,
    color : theme.colors.ternary,
    fontSize: 16,
  }
});
export default SignupScreen;
