import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text>My Orders Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AboutUs;
