import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native'; // Import useRoute
import theme from '../../theme';
import CustomButton from '../util/CustomButton';

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const route = useRoute(); // Access the route object
  const {phoneNumber} = route.params; // Retrieve the phone number

  // State for the timer and resend button disable status
  const [timer, setTimer] = useState<number>(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    // Start countdown when component mounts or when the timer is reset
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false); // Enable the resend button when timer is 0
    }

    // Clear the interval when the component unmounts or timer is reset
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleLoginPress = () => {
    console.log('OTP entered:', otp.join(''));
  };

  const handleResendPress = () => {
    console.log('Resending OTP to +91-', phoneNumber);
    setTimer(30); // Reset the timer
    setIsButtonDisabled(true); // Disable the button again
    // Trigger OTP resend logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>OTP Verification</Text>
        <Text style={styles.subHeader}>
          We have sent a verification code to {'\n'} +91-{phoneNumber}
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
        <TouchableOpacity
          disabled={isButtonDisabled}
          onPress={handleResendPress}>
          <Text
            style={
              isButtonDisabled
                ? styles.resendTextDisabled
                : styles.resendTextEnabled
            }>
            Didn’t get the OTP?{' '}
            {isButtonDisabled ? `Resend Code in ${timer}s` : 'Resend Code'}
          </Text>
        </TouchableOpacity>
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
  resendTextDisabled: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: '#AAAAAA', // Hardcoded disabled text color
  },
  resendTextEnabled: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: theme.colors.ternary, // Active color for the resend text
  },
});

export default OtpVerificationScreen;
