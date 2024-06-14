// src/components/SignupScreen.tsx
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {Loading} from '../../utils/Loading';
import {useAuth} from '../../utils/AuthContext';
import theme from '../../theme';
const SignupScreen: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [campusId, setCampusId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, isLoading] = useState(false);
  //   const handleSignup = async () => {
  //     try {
  //       const authData = await authService.signUp(
  //         firstName,
  //         lastName,
  //         phoneNumber,
  //         campusId,
  //         email,
  //         password,
  //       );
  //       storage.set('@AuthData', JSON.stringify(authData));
  //     } catch (error) {
  //       setError('Signup failed. Please try again.');
  //     }
  //   };
  const auth = useAuth();
  const signUp = async () => {
    try {
      isLoading(true);
      await auth.signUp(firstName, lastName, phoneNumber, campusId, email);
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholderTextColor="#888"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Campus ID"
        value={campusId}
        onChangeText={setCampusId}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={signUp} color={theme.colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#fff',
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
});
export default SignupScreen;
