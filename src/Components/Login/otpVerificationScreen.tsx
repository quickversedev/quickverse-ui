import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import theme from '../../theme';
import {useAuth} from '../../utils/AuthContext';

type RootStackParamList = {
  OtpVerification: {phoneNumber: string};
};

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<boolean>(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const route = useRoute<RouteProp<RootStackParamList, 'OtpVerification'>>();
  const {phoneNumber} = route.params;

  const [timer, setTimer] = useState<number>(30);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const auth = useAuth();
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }

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

  const handleLoginPress = async () => {
    console.log('OTP entered:', otp.join(''));
    const finalOtp = otp.join();
    await auth.verifyOtp(phoneNumber, finalOtp).catch(() => {
      setError(true);
    });
  };

  const handleResendPress = async () => {
    console.log('Resending OTP to +91-', phoneNumber);
    await auth
      .sendOtp(phoneNumber)
      .then(() => {
        // navigation.navigate('otpverify', {phoneNumber});
      })
      .catch(() => {
        setError(true);
      });
    setTimer(30);
    setIsButtonDisabled(true);
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
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {error ? (
          <Text style={styles.error}>
            Error ocured while sending otp , please try again later
          </Text>
        ) : null}
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
    color: '#AAAAAA',
  },
  resendTextEnabled: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: theme.colors.ternary,
  },
  button: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default OtpVerificationScreen;
