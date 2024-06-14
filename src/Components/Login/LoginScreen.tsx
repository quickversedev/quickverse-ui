// src/components/LoginScreen.tsx
import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import {useAuth} from '../../utils/AuthContext';
import {Loading} from '../../utils/Loading';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

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
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, isLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    await auth.signIn(username, password);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={signIn} />
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Signup')}
          />
        </>
      )}
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
});

export default LoginScreen;
