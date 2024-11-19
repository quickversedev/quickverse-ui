import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles';
import theme from '../../../theme';

interface HeaderProps {
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({onBack}) => {
  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.secondary}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Address List</Text>
      </View>
    </View>
  );
};

export default Header;
