import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import theme from '../../theme';

type HeaderComponentProps = {
  heading: string;
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({heading}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../data/images/qv-blue.png')}
        style={styles.logo}
      />
      <Text style={styles.header}>{heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: theme.colors.ternary,
  },
});

export default HeaderComponent;
