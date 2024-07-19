import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Alert, Text} from 'react-native';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../util/CustomButton';
import {getCampus} from '../../utils/Storage';
import profileService from '../../services/profileService';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from './LogoAndHeading';
import {ScrollView} from 'react-native-gesture-handler';

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [campusId, setCampusId] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      await profileService(phoneNumber, campusId, email, 'Feedback', feedback);
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
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderComponent heading="FeedBack" />
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
      <View style={styles.inputContainer1}>
        <TextInput
          style={styles.input}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Enter your feedback"
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Submit"
          onPress={handleSubmit}
          buttonColor={theme.colors.ternary}
          textColor={theme.colors.primary}
        />
      </View>
    </ScrollView>
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
  icon: {
    marginRight: 8,
  },
  countryCode: {
    color: theme.colors.ternary,
    fontSize: 16,
  },
});

export default Feedback;
