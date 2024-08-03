import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import theme from '../../theme';

export const Loading = () => {
  return (
    <View style={styles.container}>

      {/* <SkeletonPlaceholder
        backgroundColor={theme.colors.primary} // Set background color to #FFDC52
        highlightColor={theme.colors.ternary} // Set highlight color to #FFDC52
        borderRadius={10} // Increase border radius for a smoother look
        speed={800} // Adjust animation speed as needed
        animationDirection="leftToRight"
        linearGradient={(start, end) => (
          <LinearGradient
            start={start}
            end={end}
            colors={[
              theme.colors.primary,
              theme.colors.ternary,
              theme.colors.primary,
            ]} // Use #FFDC52 for gradient colors
          />
        )}>
        <View style={styles.skeletonContainer}>
          <View style={styles.skeletonItem} />
        </View> */}
      {/* </SkeletonPlaceholder> */}
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
