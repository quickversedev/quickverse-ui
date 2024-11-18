import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles';

interface HeaderProps {
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({onBack}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Address List</Text>
      <TouchableOpacity style={styles.backb} onPress={onBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
