import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import theme from '../../theme';
import {useAuth} from '../../utils/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

type RootStackParamList = {
  OtpVerification: {phoneNumber: string; verificationId: string};
};

// Timer Component
const Timer: React.FC<{
  initialTime: number;
  onComplete: () => void;
  key: number;
  isButtonDisabled: boolean;
}> = ({initialTime, onComplete, isButtonDisabled}) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time <= 0) {
      onComplete();
      return;
    }
    const interval = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, onComplete]);

  return (
    <Text
      style={
        isButtonDisabled ? styles.resendTextDisabled : styles.resendTextEnabled
      }>
      {time > 0 ? `Resend Code in ${time}s` : 'Resend Code'}
    </Text>
  );
};

const OtpVerificationScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<boolean>(false);
  const [timerKey, setTimerKey] = useState<number>(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const route = useRoute<RouteProp<RootStackParamList, 'OtpVerification'>>();
  const {phoneNumber, verificationId} = route.params;
  const auth = useAuth();

  const [otpVerificationId, setOtpVerificationId] =
    useState<string>(verificationId);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // const handleKeyPress = (index: number, key: string) => {
  //   console.log('back:', key);
  //   if (key === 'Backspace') {
  //     const newOtp = [...otp];

  //     if (otp[index]) {
  //       newOtp[index] = '';
  //       setOtp(newOtp);
  //     } else if (index > 0) {
  //       inputRefs.current[index - 1]?.focus();
  //       newOtp[index - 1] = '';
  //       setOtp(newOtp);
  //     }
  //   }
  // };
  const handleKeyPress = (index: number, key: string) => {
    console.log('back', key);
    if (key === 'Backspace') {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus(); // Move focus to the previous input
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleLoginPress = async () => {
    const finalOtp = otp.join('');
    await auth.verifyOtp(phoneNumber, finalOtp, otpVerificationId).catch(() => {
      setError(true);
    });
  };

  const handleResendPress = async () => {
    try {
      const newVerificationId = await auth.sendOtp(phoneNumber);
      setOtpVerificationId(newVerificationId);
    } catch (err) {
      setError(true);
    }
    setIsButtonDisabled(true);
    setTimerKey(prevVal => prevVal + 1);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              onPress={handleResendPress}
              style={[
                isButtonDisabled
                  ? styles.resendTextDisabled
                  : styles.resendTextEnabled,
              ]}>
              <Timer
                initialTime={60}
                key={timerKey}
                isButtonDisabled={isButtonDisabled}
                onComplete={() => setIsButtonDisabled(false)}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {error && (
              <Text style={styles.error}>
                Error occurred while sending OTP, please try again later
              </Text>
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
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
    color: theme.colors.ternary,
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
