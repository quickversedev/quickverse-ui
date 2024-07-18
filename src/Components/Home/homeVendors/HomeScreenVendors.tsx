// src/components/Heading.tsx
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import HorizontalCardList from './HorizontalCardList';

import {useDispatch, useSelector} from 'react-redux';
import {fetchVendorList} from '../../../services/VendorListSlice';
import {Loading} from '../../util/Loading';
import {AppDispatch, RootState} from '../../../store/store';

const HomeScreenVendors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {vendors, loading} = useSelector(
    (state: RootState) => state.vendorList,
  );
  useEffect(() => {
    console.log('callsing fetchVendorsList');
    setTimeout(() => {
      dispatch(fetchVendorList());
    }, 1000);
  }, [dispatch]);
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
          Stores Near You!
        </Text>
        <View style={styles.line} />
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

export default HomeScreenVendors;
