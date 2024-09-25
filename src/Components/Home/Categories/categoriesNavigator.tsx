import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesScreen from './CategoriesScreen';
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
        component={CategoriesScreen}
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
