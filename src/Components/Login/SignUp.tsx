// src/components/SignupScreen.tsx
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {Loading} from '../../utils/Loading';
import {useAuth} from '../../utils/AuthContext';
const SignupScreen: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [campusId, setCampusId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      await auth.signUp(
        firstName,
        lastName,
        phoneNumber,
        campusId,
        email,
        password,
      );
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Campus ID"
        value={campusId}
        onChangeText={setCampusId}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Sign Up" onPress={signUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default SignupScreen;
