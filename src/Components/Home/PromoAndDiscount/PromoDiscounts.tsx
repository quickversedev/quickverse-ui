import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
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
    <View style={styles.promoContainer}>
      <View style={styles.headContainer}>
        {/* <View style={styles.line} /> */}
        <Text style={styles.heading}>Promotions</Text>
        <Image
          style={styles.promo_logo}
          source={require('../../../data/images/promo_logo.png')}
        />
      </View>
      <PromoScroll promoItemsList={promoItemsList} />
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  promoContainer: {},
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderWidth: 1,
    width: '10%',
    borderColor: theme.colors.ternary,
    marginRight: 6,
    // shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ternary,
    marginLeft: 12,
  },
  promo_logo: {width: 40, height: 40, marginHorizontal: 8},
});

export default PromoDiscounts;
