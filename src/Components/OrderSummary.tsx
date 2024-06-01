import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Appbar, Card, Text, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import orders from '../data/orders';
import theme from '../theme';

const OrderDetailsScreen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.primary,
        borderBottomColor: theme.colors.secondary,
        borderBottomWidth: 10,
      }}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.Content title="My Orders" titleStyle={styles.title} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        {orders.map(order => (
          <Card key={order.id} style={styles.card} elevation={4}>
            <Card.Content>
              <View style={styles.header}>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.date}>Date: {order.date}</Text>
              </View>
              <List.Section>
                <List.Subheader>Items</List.Subheader>
                {order.items.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item}
                    titleNumberOfLines={2}
                    titleStyle={styles.itemTitle}
                    left={() => (
                      <Icon
                        name="package-variant"
                        size={24}
                        color={theme.colors.primary}
                      />
                    )}
                  />
                ))}
              </List.Section>
              <View style={styles.footer}>
                <Text style={styles.total}>
                  Total: ${order.total.toFixed(2)}
                </Text>
                <View style={styles.statusContainer}>
                  <Icon
                    name={
                      order.status === 'Delivered'
                        ? 'check-circle'
                        : 'clock-outline'
                    }
                    color={order.status === 'Delivered' ? 'green' : 'orange'}
                    size={24}
                  />
                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          order.status === 'Delivered' ? 'green' : 'orange',
                      },
                    ]}>
                    {order.status}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: theme.colors.primary,
  },
  title: {
    color: theme.colors.secondary,
    fontWeight: 900,
  },
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  date: {
    color: theme.colors.primary,
  },
  itemTitle: {
    color: 'black',
    marginLeft: 8,
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    marginLeft: 4,
  },
});

export default OrderDetailsScreen;
