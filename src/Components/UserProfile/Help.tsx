import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Alert, Text} from 'react-native';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../util/CustomButton';
import Dropdown from '../util/Dropdowm';
import profileService from '../../services/profileService';
import {getCampus} from '../../utils/Storage';
import {useNavigation} from '@react-navigation/native';

const Help = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<string>('');
  const [campusId, setCampusId] = useState<string>('');
  const dropdown = ['Forgot Pin', 'Refund Status'];
  const navigation = useNavigation();
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
    } catch (error) {
      Alert.alert(
        'Error',
        `Something went wrong..!
        please try again later`,
      );
    }
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };
  useEffect(() => {
    const campus = getCampus();
    campus && setCampusId(campus);
  }, []);
  const handleOptionSelected = (option: string) => {
    setSelectedQuery(option);
  };
  return (
    <View style={styles.container}>
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
        onOptionSelected={handleOptionSelected}
        placeHolder="Query"
        iconName="pencil"
      />
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
