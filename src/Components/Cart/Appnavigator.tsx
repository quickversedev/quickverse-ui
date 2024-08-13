import { createStackNavigator } from '@react-navigation/stack';
import PaymentSummaryScreen from './PaymentSummaryScreen';
import CheckoutScreen from '../Checkout/CheckoutScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PaymentSummary">
      <Stack.Screen name="PaymentSummary" component={PaymentSummaryScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

