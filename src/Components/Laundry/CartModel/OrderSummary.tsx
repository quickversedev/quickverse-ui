import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
// import theme from '../theme';
import theme from '../../../theme';

interface OrderSummaryProps {
  totalItems: number;
  washingTotal: number;
  ironingTotal: number;
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalItems,
  washingTotal,
  ironingTotal,
  totalPrice,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.orderSummary}>
        <View style={styles.priceSection}>
          <Text style={styles.itemName}>{`Total Items : `}</Text>
          <Text style={styles.itemName}>{`${totalItems}`}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text>{`    Total Washing Amount : `}</Text>
          <Text>{`${washingTotal} Rs`}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text>{`    Total Ironing Amount : `}</Text>
          <Text>{`+${ironingTotal} Rs`}</Text>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.itemName}>{`Total Amount : `}</Text>
          <Text
            style={{
              color: theme.colors.secondary,
              fontSize: 22,
              fontWeight: 'bold',
            }}>{`${totalPrice} Rs`}</Text>
        </View>
      </View>
    </View>
  );
};

export default OrderSummary;
