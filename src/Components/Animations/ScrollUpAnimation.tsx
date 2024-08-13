import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ScrollUpAnimation = ({ navigateTo }) => {
  const navigation = useNavigation();
  const translateY = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -1000,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate(navigateTo);
    });
  }, []);

  return <Animated.View style={[styles.container, { transform: [{ translateY }] }]} />;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white', // Adjust this color as needed
  },
});

export default ScrollUpAnimation;
