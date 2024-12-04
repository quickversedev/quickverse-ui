// src/components/Heading.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import HorizontalScroll from './HorizontalScroll';

import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../util/Loading';
import { AppDispatch, RootState } from '../../../store/store';
import { fetchFoodItems } from '../../../services/FoodItemsSlice';
import theme from '../../../theme';
interface FeaturedItemsProps {
  campus: string | undefined; // Define the type for the campus prop
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ campus }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { foodItemsList, loading } = useSelector(
    (state: RootState) => state.foodItems,
  );
  useEffect(() => {
    setTimeout(() => {
      campus && dispatch(fetchFoodItems(campus));
    }, 1000);
  }, [campus, dispatch]);
  if (loading) {
    return <Loading />;
  }

  return foodItemsList?.length > 0 ? (
    <View style={styles.headingContainer}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text variant="titleLarge" style={styles.heading}>
          Featured Items
        </Text>
      </View>
      <HorizontalScroll featuredItems={foodItemsList} />
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 24,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  line: {
    height: 3, // Thicker line
    backgroundColor: theme.colors.ternary,
    width: '15%',
    marginRight: 8,
    shadowColor: theme.colors.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 30,
    paddingTop: 5,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
});

export default FeaturedItems;
