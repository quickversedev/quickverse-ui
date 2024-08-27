import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
// import MyOrdersScreen from './MyOrdersScreen';
import MyOrdersScreen from './OrderSummary';
import OrderDetailsScreen from './OrderDetailsScreen';
import {OrderMetadata} from '../../data/orders';

export type OrderStackParamList = {
  AllOrders: undefined;
  OrderDetails: {order: OrderMetadata};
  navigation?: StackNavigationProp<any, any>;
};

const Stack = createStackNavigator<OrderStackParamList>();

const OrdersNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AllOrders">
      <Stack.Screen
        name="AllOrders"
        component={MyOrdersScreen}
        options={{title: 'My Orders'}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{title: 'Order Details'}}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigation;
