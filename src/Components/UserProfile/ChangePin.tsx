// ChangePinScreen.tsx

import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import CustomButton from '../util/CustomButton';
import changePinService from '../../services/ChangePinService';
import {useAuth} from '../../utils/AuthContext';
import {getCampus, storage} from '../../utils/Storage';
import {useNavigation} from '@react-navigation/native';
import {Loading} from '../util/Loading';
import HeaderComponent from './LogoAndHeading';
type changePinProps = {
  forgotPasswordRoute?: (forgotPasswordFlow: boolean) => void;
};
const ChangePinScreen: React.FC<changePinProps> = ({forgotPasswordRoute}) => {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  const [loading, isLoading] = useState(false);
  const {authData} = useAuth();
  const navigation = useNavigation();
  const handleChangePin = async () => {
    if (
      currentPin.length !== 4 ||
      newPin.length !== 4 ||
      confirmNewPin.length !== 4
    ) {
      Alert.alert('Error', 'PINs must be 4 digits long.');
      return;
    }

    if (newPin !== confirmNewPin) {
      Alert.alert('Error', 'New PIN and Confirm PIN do not match.');
      return;
    }

    try {
      isLoading(true);
      const campus = getCampus();
      authData &&
        campus &&
        (await changePinService(
          authData?.session.phoneNumber,
          campus,
          currentPin,
          newPin,
        ));

      if (forgotPasswordRoute && currentPin === '7779') {
        forgotPasswordRoute(false);
        storage.set('@resetPass', false);
      } else {
        navigation.goBack();
      }
      console.log('Chnage Pin SuccessFUll');
    } catch (error) {
      console.log('Error while changing the Pin!');
    } finally {
      isLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <HeaderComponent heading="Change Pin" />
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="lock"
            size={24}
            color={theme.colors.ternary}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Current Pin"
            value={currentPin}
            onChangeText={setCurrentPin}
            placeholderTextColor={theme.colors.ternary}
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
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
            placeholder="New 4 Digit Pin"
            value={newPin}
            onChangeText={setNewPin}
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
            placeholder="Confirm New Pin"
            value={confirmNewPin}
            onChangeText={setConfirmNewPin}
            placeholderTextColor={theme.colors.ternary}
            secureTextEntry
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Submit"
            onPress={handleChangePin}
            buttonColor={theme.colors.ternary}
            textColor={theme.colors.primary}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
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
  icon: {
    marginRight: 8,
  },
});

export default ChangePinScreen;
