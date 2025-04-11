// src/components/Heading.tsx
import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import HorizontalCardList from './HorizontalCardList';

import {useDispatch, useSelector} from 'react-redux';
import {fetchVendorList} from '../../../services/VendorListSlice';
import {Loading} from '../../util/Loading';
import {AppDispatch, RootState} from '../../../store/store';
import theme from '../../../theme';

interface HomeScreenVendorsProps {
  campus: string | undefined; // Define the type for the campus prop
}
const HomeScreenVendors: React.FC<HomeScreenVendorsProps> = ({campus}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {vendors, loading} = useSelector(
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
    <View style={styles.vendorsContainer}>
      <View style={styles.headContainer}>
        <Text variant="titleLarge" style={styles.heading}>
          Stores Near You
        </Text>
        <Image
          style={styles.store_logo}
          source={require('../../../data/images/store_logo_color.png')}
        />
      </View>
      <HorizontalCardList vendors={enabledVendors} />
    </View>
  ) : (
    ''
  );
};

const styles = StyleSheet.create({
  vendorsContainer: {
    marginTop: 15,
  },
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
  store_logo: {width: 30, height: 30, marginHorizontal: 8},
});

export default HomeScreenVendors;
