import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import theme from '../theme';

interface ReloadButtonProps {
  onPress: () => void;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({onPress}) => {
  return (
    <MaterialCommunityIcons
      name="refresh"
      size={29}
      color={theme.colors.secondary}
      style={styles.icon}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
});

export default ReloadButton;
