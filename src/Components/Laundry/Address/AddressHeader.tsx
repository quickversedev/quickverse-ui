import React from 'react';
import {View, Text, Button} from 'react-native';
import styles from '../styles';

interface HeaderProps {
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({onBack}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Address List</Text>
      <Button title="Back" onPress={onBack} />
    </View>
  );
};

export default Header;
