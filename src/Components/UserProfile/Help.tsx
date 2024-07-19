import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Alert, Text} from 'react-native';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../util/CustomButton';
import Dropdown from '../util/Dropdowm';
import profileService from '../../services/profileService';
import {getCampus} from '../../utils/Storage';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../utils/AuthContext';
import {Loading} from '../util/Loading';
import fetchOptions from '../Login/getCampusList';

const Help = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<string>('');
  const [campusId, setCampusId] = useState<string>('');
  const [loadingCampuses, isLoadingCampuses] = useState(true);
  const [campusIds, setcampusIds] = useState<string[]>();
  const [selectedCampusId, setSelectedCampusId] = useState<string>('');
  const dropdown = ['Forgot Pin', 'Refund Status'];
  const navigation = useNavigation();
  const {authData} = useAuth();
  // const handleSubmit = () => {
  //   profileService(phoneNumber, campusId, email, selectedQuery, feedback);
  //   Alert.alert('Query Submitted', `Email: ${email}\nQuery: ${feedback}`);
  // };
  const handleSubmit = async () => {
    try {
      await profileService(
        phoneNumber,
        campusId,
        email,
        selectedQuery,
        feedback,
      );
      Alert.alert(
        'Feedback Submitted',
        ` Email: ${email}\nFeedback: ${feedback}`,
      );
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    } catch (error) {
      Alert.alert(
        'Error',
        `Something went wrong..!
        please try again later`,
      );
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
  useEffect(() => {
    if (authData) {
      const campus = getCampus();
      campus && setCampusId(campus);
    } else {
      setCampusId(selectedCampusId);
    }
  }, [authData, selectedCampusId]);
  const handleQueryOptionSelected = (option: string) => {
    setSelectedQuery(option);
  };
  const handleOptionSelected = (option: string) => {
    let result = option.split(' |')[0];
    setSelectedCampusId(result);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Help</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="phone"
          size={24}
          color={theme.colors.ternary}
          style={styles.icon}
        />
        <Text style={styles.countryCode}> +91</Text>
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
      <Dropdown
        options={dropdown}
        onOptionSelected={handleQueryOptionSelected}
        placeHolder="Query"
        iconName="pencil"
      />
      {!authData && (
        <View>
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
      )}
      <View style={styles.inputContainer1}>
        <TextInput
          style={styles.input}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Enter your Query"
          multiline
          numberOfLines={4}
        />
      </View>
      <Text>Please provide order Id in case for refund query..!</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          buttonColor={theme.colors.ternary}
          textColor={theme.colors.primary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  label: {
    fontSize: 18,
    marginBottom: 8,
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
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderColor: theme.colors.ternary,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.primary,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  countryCode: {
    color: theme.colors.ternary,
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
});

export default Help;
