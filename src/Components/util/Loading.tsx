import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import theme from '../../theme';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.ternary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  skeletonContainer: {
    alignItems: 'center',
  },
  skeletonItem: {
    height: 200,
    width: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
});
