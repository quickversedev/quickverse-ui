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
        <View style={styles.line} />
        <Image
          style={styles.store_logo}
          source={require('../../../data/images/store_logo.png')}
        />
        <Text variant="titleLarge" style={styles.heading}>
          Stores Near You
        </Text>
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
  line: {
    borderWidth: 1,
    width: '10%',
    borderColor: theme.colors.ternary,
    marginRight: 1,
    // shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'condensedBold',
    color: theme.colors.ternary,
  },
  store_logo: {width: 24, height: 24, marginRight: 8},
});

export default HomeScreenVendors;
