import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import MyOrdersScreen from './OrderSummary';
import OrderDetailsScreen from './OrderDetailsScreen';
import WebViewScreen from '../../utils/WebViewScreen'; // Assuming this path for WebViewScreen
import theme from '../../theme'; // Assuming the existence of a theme file
import {OrderMetadata} from '../../utils/canonicalModel';

export type OrderStackParamList = {
  AllOrders: undefined;
  OrderDetails: {order: OrderMetadata};
  WebView: {url: string};
  navigation?: StackNavigationProp<any, any>;
  HomeNavigation: undefined;
  HomeScreen: undefined;
};

const Stack = createStackNavigator<OrderStackParamList>();

const OrdersNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AllOrders">
      <Stack.Screen
        name="AllOrders"
        component={MyOrdersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          title: 'Order Web Page',
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigation;
