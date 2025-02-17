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
import theme from '../../../theme';
interface PromoDiscountsProps {
  campus: string | undefined; // Define the type for the campus prop
}
const PromoDiscounts: React.FC<PromoDiscountsProps> = ({campus}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {promoItemsList, loading} = useSelector(
    (state: RootState) => state.promoItems,
  );
  useEffect(() => {
    setTimeout(() => {
      campus && dispatch(fetchPromoItems(campus));
    }, 1000);
  }, [campus, dispatch]);
  if (loading) {
    return <Loading />;
  }
  return promoItemsList.length > 0 ? (
    <View style={styles.headingContainer}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text variant="titleLarge" style={styles.heading}>
          Promo & Discounts..!
        </Text>
        <View style={styles.invisibleLine} />
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
    paddingTop: 25,
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
    padding: 5,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
});

export default PromoDiscounts;
