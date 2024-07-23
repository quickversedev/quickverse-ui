// src/components/Heading.tsx
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
// import HorizontalCardList from '../homeVendors/HorizontalCardList';
import PromoScroll from './PromoScroll';
import {Loading} from '../../util/Loading';
import {AppDispatch, RootState} from '../../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPromoItems} from '../../../services/promoListSlice';

const PromoDiscounts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {promoItemsList, loading} = useSelector(
    (state: RootState) => state.promoItems,
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPromoItems());
    }, 1000);
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  return promoItemsList.length > 0 ? (
    <View style={styles.headingContainer}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text variant="titleLarge" style={styles.heading}>
          Promo & Discounts!
        </Text>
        <View style={styles.line} />
      </View>
      <PromoScroll promoItemsList={promoItemsList} />
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 2, // Thicker line
    backgroundColor: '#333',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PromoDiscounts;
