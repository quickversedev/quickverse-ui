// src/components/Heading.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import HorizontalCardList from './HorizontalCardList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchVendorList } from '../../../services/VendorListSlice';
import { Loading } from '../../util/Loading';
import { AppDispatch, RootState } from '../../../store/store';
import theme from '../../../theme';

interface HomeScreenVendorsProps {
  campus: string | undefined; // Define the type for the campus prop
}
const HomeScreenVendors: React.FC<HomeScreenVendorsProps> = ({ campus }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { vendors, loading } = useSelector(
    (state: RootState) => state.vendorList,
  );
  useEffect(() => {
    setTimeout(() => {
      campus && dispatch(fetchVendorList(campus));
    }, 1000);
  }, [campus, dispatch]);
  if (loading) {
    return <Loading />;
  }
  const enabledVendors =
    vendors && vendors.filter(vendor => vendor.storeEnabled);
  return enabledVendors?.length > 0 ? (
    <View style={styles.headingContainer}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text variant="titleLarge" style={styles.heading}>
          Promo and Discounts
        </Text>
      </View>
      <HorizontalCardList vendors={enabledVendors} />
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
    marginTop: 48,
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

export default HomeScreenVendors;
