import React from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import theme from '../../theme';

const AboutUs = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          // eslint-disable-next-line prettier/prettier, no-useless-escape
          source={require('../../data/images/qv-blue.png')}
          style={styles.profileImage}
        />
        <View style={styles.container2}>
          <Text style={styles.font}>
            QuickVerse is a hyper-local delivery startup serving India's premium
            campuses with advanced drone technology. We offer fast and reliable
            delivery of groceries, meals, books, and more. Our mission is to
            enhance campus life through swift, efficient, and eco-friendly
            delivery solutions tailored to each community's unique needs.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.primary,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: 20,
    fontSize: 22,
  },
  font: {
    fontSize: 22,
    color: theme.colors.ternary,
  },
  profileImage: {
    width: 200,
    height: 200,
  },
  container2: {
    marginTop: 60,
  },
});

export default AboutUs;
