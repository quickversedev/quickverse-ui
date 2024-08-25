import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyOrdersScreen from './OrderSummary';
import OrderDetailsScreen from './OrderDetailsScreen';
import theme from '../../theme';

export type OrderStackParamList = {
  MyOrdersScreen: undefined;
  OrderDetailsScreen: { order: any };
};

const Stack = createStackNavigator<OrderStackParamList>();

const OrdersNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="MyOrdersScreen">
      <Stack.Screen
        name="MyOrdersScreen"
        component={MyOrdersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.primary,
            height: 60,
          },
          title: 'Order Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigation;
