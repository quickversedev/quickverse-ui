import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import {Text} from 'react-native-paper';
import HorizontalCardList from './HorizontalCardList';

import {useDispatch, useSelector} from 'react-redux';
import {fetchVendorList} from '../../../services/VendorListSlice';
import {AppDispatch, RootState} from '../../../store/store';
import theme from '../../../theme';

interface HomeScreenVendorsProps {
  campus: string | undefined;
}

const HomeScreenVendors: React.FC<HomeScreenVendorsProps> = ({campus}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {vendors} = useSelector((state: RootState) => state.vendorList);

  useEffect(() => {
    setTimeout(() => {
      campus && dispatch(fetchVendorList(campus));
    }, 1000);
  }, [campus, dispatch]);

  const enabledVendors =
    vendors && vendors.filter(vendor => vendor.storeEnabled);

  return enabledVendors?.length > 0 ? (
    <View style={styles.vendorsContainer}>
      <View style={styles.headContainer}>
        {/* <View style={styles.shadowContainer}>
          <View style={styles.line} />
        </View> */}
        <View style={styles.textContainer}>
          <Text variant="titleLarge" style={styles.heading}>
            Stores Near You
          </Text>
          <Image
            style={styles.store_logo}
            source={require('../../../data/images/store_logo.png')}
          />
        </View>
      </View>
      <HorizontalCardList vendors={enabledVendors} />
    </View>
  ) : (
    <View style={styles.emptyContainer} />
  );
};

const styles = StyleSheet.create({
  vendorsContainer: {
    flex: 1,
    marginVertical: Platform.select({
      ios: 20,
      android: 15,
    }),
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowContainer: {
    backgroundColor: 'transparent',
  },
  line: {
    borderWidth: 1,
    width: 40,
    borderColor: theme.colors.ternary,
    marginRight: 8,
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.ternary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
      },
      android: {
        elevation: 5,
        backgroundColor: 'white',
      },
    }),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.select({
      ios: 8,
      android: 0,
    }),
  },
  heading: {
    fontSize: Platform.select({
      ios: 22,
      android: 24,
    }),
    fontWeight: Platform.select({
      ios: '600',
      android: 'bold',
    }),
    color: theme.colors.ternary,
    marginLeft: 12,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 1,
      },
      android: {},
    }),
  },
  store_logo: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
    ...Platform.select({
      ios: {
        resizeMode: 'contain',
        tintColor: theme.colors.ternary,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  emptyContainer: {
    height: 0,
  },
  store_logo: {width: 30, height: 30, marginHorizontal: 8},
});

export default HomeScreenVendors;
