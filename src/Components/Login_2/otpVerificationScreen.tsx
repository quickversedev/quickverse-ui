import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import theme from '../../theme';
import CustomButton from '../util/CustomButton';

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // If the input value is not empty, focus on the next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      const newOtp = [...otp];

      if (otp[index]) {
        // Clear the current field if it is not empty
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If the current field is already empty, move focus to the previous field
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleLoginPress = () => {
    // Handle OTP verification logic here
    console.log('OTP entered:', otp.join(''));
    // Redirect to Home screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>OTP Verification</Text>
        <Text style={styles.subHeader}>
          We have sent a verification code to {'\n'} +91-9265614292
        </Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={value => handleOtpChange(index, value)}
              onKeyPress={({nativeEvent}) =>
                handleKeyPress(index, nativeEvent.key)
              }
            />
          ))}
        </View>
        <Text style={styles.resendText}>
          Didn’t get the OTP? Resend Code in 30s
        </Text>
        <CustomButton
          title="Login"
          onPress={handleLoginPress}
          buttonColor={theme.colors.ternary}
          textColor={theme.colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: theme.colors.primary,
  },
  backButton: {
    fontSize: 18,
    color: theme.colors.ternary,
    marginBottom: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: theme.colors.ternary,
  },
  subHeader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: theme.colors.secondary,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderColor: theme.colors.secondary,
    borderWidth: 2,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: theme.colors.primary,
  },
  resendText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: theme.colors.secondary,
  },
});

export default OtpVerificationScreen;
