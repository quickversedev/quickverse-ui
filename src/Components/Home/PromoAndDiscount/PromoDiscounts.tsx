import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PromoScroll from './PromoScroll';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Loading } from '../../util/Loading';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromoItems } from '../../../services/promoListSlice';
import theme from '../../../theme';

interface PromoDiscountsProps {
  campus: string | undefined;
}

const PromoDiscounts: React.FC<PromoDiscountsProps> = ({ campus }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { promoItemsList, loading } = useSelector(
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
          Promotions
        </Text>
        <MaterialCommunityIcons
          name="gift-outline"
          size={30}
          color={theme.colors.secondary}
        />
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
    paddingTop: 24,
    width: '100%',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
  },
  line: {
    height: 3,
    backgroundColor: theme.colors.ternary,
    width: '15%',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 30,
    padding: 5,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
});

export default PromoDiscounts;
