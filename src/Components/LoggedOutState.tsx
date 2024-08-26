import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import theme from '../theme';

interface ProfilePromptProps {
  title: string;
}
const LoggedOutState: React.FC<ProfilePromptProps> = ({title}) => {
  const handlePress = (event: GestureResponderEvent) => {
    // Handle the button press here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {`Log in or sign up to view your complete ${title}`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    margin: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2, // Adds shadow on Android
    shadowColor: theme.colors.ternary,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.ternary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.ternary,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colors.ternary,
    borderColor: theme.colors.ternary,
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoggedOutState;
