import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Text} from 'react-native-paper';
import {useAuth} from '../utils/AuthContext';

const UserProfileScreen: React.FC = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  
  return (
    <View style={styles.container}>
      <Text>User Profile Screen</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>

     
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProfileScreen;
