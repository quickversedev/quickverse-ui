import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import theme from '../../theme';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line prettier/prettier, no-useless-escape
        source={require('../../data/images/qv-blue.png')}
        style={styles.profileImage}
      />
      <View style={styles.container2}>
        <Text style={styles.font}>
          QuickVerse is a hyper-local delivery startup for India's premium
          campuses, utilizing advanced drone technology for swift and reliable
          delivery of groceries, meals, books, and more. Our mission is to
          enhance campus life by providing fast, efficient, and eco-friendly
          delivery solutions tailored to the unique needs of each community.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
