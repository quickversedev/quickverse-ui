import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFDC52', // your primary color
    secondary: '#8F1413', // your secondary color
    ternary: '#113E50',
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
