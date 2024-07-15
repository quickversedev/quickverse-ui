import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Alert} from 'react-native';
import theme from '../../theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../util/CustomButton';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    Alert.alert(
      'Feedback Submitted',
      `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}`,
    );
  };

  return (
    <View style={styles.container}>
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
          value={name}
          onChangeText={setName}
          placeholderTextColor={theme.colors.ternary}
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
  icon: {
    marginRight: 8,
  },
});

export default Feedback;
