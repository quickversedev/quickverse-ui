import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {OrderStackParamList} from './OrdersNavigator';
import theme from '../../theme';

type OrderStackNavigationProp = StackNavigationProp<
  OrderStackParamList,
  'HomeNavigation'
>;
const ZeroOrdersState: React.FC = () => {
  const navigation = useNavigation<OrderStackNavigationProp>();

  const handleStartOrdering = () => {
    navigation.navigate('HomeScreen'); // Replace with your actual order screen route
    console.log('Start ordering');
  };

  return (
    <View style={styles.container}>
      <Icon
        name="calendar-text-outline"
        size={80}
        color={theme.colors.ternary}
      />
      <Text style={styles.title}>No history yet</Text>
      <Text style={styles.subtitle}>
        Hit the button down below to palace your first order
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartOrdering}>
        <Text style={styles.buttonText}>Start ordering</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.ternary,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.ternary,
    textAlign: 'center',
    marginTop: 8,
    marginHorizontal: 40,
  },
  button: {
    marginTop: 30,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ZeroOrdersState;
