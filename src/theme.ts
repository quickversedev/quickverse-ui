import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FAEA7B',
    foregroupd: 'white', // your primary color
    secondary: '#8F1413', // your secondary color
    ternary: '#113E50',
    cardBackground: '#F5F5F5', // Light grey background for cards
    primaryText: '#333333', // Dark grey for primary text
    secondaryText: '#666666', // Medium grey for secondary text
    buttonText: '#FFFFFF', // White text for buttons
    border: '#DDDDDD',
  },
  // fonts: {
  //   regular: {
  //     fontFamily: 'sans-serif',
  //     fontSize: 14,
  //   },
  //   medium: {
  //     fontFamily: 'sans-serif-medium',
  //     fontSize: 16,
  //   },
  //   light: {
  //     fontFamily: 'sans-serif-light',
  //     fontSize: 12,
  //   },
  //   thin: {
  //     fontFamily: 'sans-serif-thin',
  //     fontSize: 10,
  //   },
  // },
};

export default theme;
