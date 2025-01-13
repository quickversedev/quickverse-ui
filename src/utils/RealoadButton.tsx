import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../theme';

interface ReloadButtonProps {
  onPress: () => void;
}

const ReloadButton: React.FC<ReloadButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons
        name="refresh"
        size={29}
        color={theme.colors.secondary}
        style={styles.icon}
        // onPress={onPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
  button: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
});

export default ReloadButton;
