// src/components/Heading.tsx
import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
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
    <View style={styles.featuredContainer}>
      <View style={styles.headContainer}>
        <Text style={styles.heading}>Best Sellers</Text>
        <Image
          style={styles.logo}
          source={require('../../../data/images/featured_logo_color.png')}
        />
      </View>
      <HorizontalScroll featuredItems={foodItemsList} />
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  featuredContainer: {marginTop: 5},
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ternary,
    marginLeft: 12,
  },
  logo: {width: 30, height: 30, marginHorizontal: 8},
});

export default FeaturedItems;
