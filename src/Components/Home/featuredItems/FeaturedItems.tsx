// src/components/Heading.tsx
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import HorizontalScroll from './HorizontalScroll';

import {useDispatch, useSelector} from 'react-redux';
import {Loading} from '../../util/Loading';
import {AppDispatch, RootState} from '../../../store/store';
import {fetchFoodItems} from '../../../services/FoodItemsSlice';
import theme from '../../../theme';
interface FeaturedItemsProps {
  campus: string | undefined; // Define the type for the campus prop
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({campus}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {foodItemsList, loading} = useSelector(
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
          Best Sellers..!
        </Text>
        <View style={styles.invisibleLine} />
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
    paddingTop: 25,
    // paddingBottom: 10,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 3, // Thicker line
    backgroundColor: theme.colors.ternary,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  invisibleLine: {
    flex: 1,
    height: 3, // Thicker line
    backgroundColor: theme.colors.primary,
    marginHorizontal: 8,
  },
  heading: {
    fontSize: 30,
    paddingTop: 5,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
});

export default FeaturedItems;
