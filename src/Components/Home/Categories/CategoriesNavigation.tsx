import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Categories from './Categories';
import theme from '../../../theme';

export type CategoriesStackParamList = {
  Categories: undefined;
  CategoryDetails: {category: string};
};

const Stack = createStackNavigator<CategoriesStackParamList>();

const CategoriesNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          title: 'Categories',
        }}
      />
    </Stack.Navigator>
  );
};

export default CategoriesNavigation;
