import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useAuth} from '../../utils/AuthContext';
import theme from '../../theme';
import {setSkipLoginFlow} from '../../utils/Storage';

// Get screen width
const screenWidth = Dimensions.get('window').width;

interface LoginCardProps {
  feature: string; // Functionality passed as a prop
}

const LoginCard: React.FC<LoginCardProps> = ({feature}) => {
  const {authData, setSkipLogin} = useAuth();
  const handleClick = () => {
    console.log('buttonslivked');
    if (!authData) {
      setSkipLogin(false);
      setSkipLoginFlow(false);
    }
  };
  return (
    <View style={styles.card}>
      <Text style={styles.message}>{`Please login to use the ${feature}`}</Text>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: theme.colors.ternary,
  },
  button: {
    width: screenWidth * 0.7, // 90% of screen width
    paddingVertical: 15,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginCard;
