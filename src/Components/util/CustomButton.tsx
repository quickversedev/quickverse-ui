// src/components/CustomButton.tsx
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import theme from '../../theme';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonColor?: string;
  textColor?: string;
  enabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonColor,
  textColor,
  enabled,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: enabled
            ? buttonColor || theme.colors.primary
            : '#164c62',
        },
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          {color: textColor || theme.colors.secondary},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
