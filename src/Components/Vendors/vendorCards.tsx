import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  FlatList,
  TextInput,
  Platform,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fetchVendorList} from '../../services/VendorListSlice';
import {AppDispatch, RootState} from '../../store/store';
import CardItem from '../util/CardItem';
import {Loading} from '../util/Loading';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './VendorsNavigator';
import {useNavigation} from '@react-navigation/native';
import {getCampus} from '../../utils/Storage';
import {Vendor} from '../../utils/canonicalModel';
import theme from '../../theme';

const {width} = Dimensions.get('window');
const SPACING: number = 16;
const ITEM_SIZE: number = width;

type VendorCardsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Categories'
>;

const VendorCards: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<VendorCardsNavigationProp>();
  const {vendors, loading} = useSelector(
    (state: RootState) => state.vendorList,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false); // Add this state

  useEffect(() => {
    const campus = getCampus();
    campus && dispatch(fetchVendorList(campus));
  }, [dispatch]);
  // Add this function for refresh handling
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const campus = getCampus();
      if (campus) {
        await dispatch(fetchVendorList(campus));
      }
    } catch (error) {
      console.error('Error refreshing vendors:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    handleRefresh(); // Initial load (you could keep your original useEffect if preferred)
  }, [dispatch]);

  const groupedVendors = useMemo(() => {
    return vendors
      .filter(item => item.storeEnabled)
      .reduce((acc: Record<string, Vendor[]>, vendor) => {
        if (!acc[vendor.storeCategory]) {
          acc[vendor.storeCategory] = [];
        }
        acc[vendor.storeCategory].push(vendor);
        return acc;
      }, {});
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    if (!searchQuery.trim()) {
      return groupedVendors;
    }
    return Object.entries(groupedVendors).reduce(
      (acc: Record<string, Vendor[]>, [category, categoryVendors]) => {
        const matchedVendors = categoryVendors.filter(
          vendor =>
            vendor.vendorName
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            category.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        if (matchedVendors.length > 0) {
          acc[category] = matchedVendors;
        }
        return acc;
      },
      {},
    );
  }, [groupedVendors, searchQuery]);

  if (loading) {
    return <Loading />;
  }

  const handleCardPress = (vendor: Vendor) => {
    navigation.navigate('Categories', {vendor});
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[theme.colors.secondary]} // Customize the loading indicator color
          tintColor={theme.colors.secondary} // iOS only
          progressBackgroundColor={theme.colors.primary} // Android only
        />
      }>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={theme.colors.ternary}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by vendor or category"
          placeholderTextColor={theme.colors.ternary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {Object.entries(filteredVendors).map(([category, categoryVendors]) => (
        <View key={category} style={styles.categorySection}>
          <Text
            style={[
              styles.categoryTitle,
              {
                borderWidth: 1.2,
                borderColor: theme.colors.secondary,
                marginHorizontal: 'auto',
                borderRadius: 12,
                paddingHorizontal: 26,
                paddingVertical: 2,
              },
            ]}>
            {category}
          </Text>

          <FlatList
            data={categoryVendors}
            keyExtractor={item => item.vendorId.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.cardWrapper}>
                <CardItem
                  name={item.vendorName}
                  distance={item.distance}
                  image={{uri: `${item.vendorBanner}.jpg`}}
                  onPress={() => handleCardPress(item)}
                />
              </View>
            )}
            contentContainerStyle={styles.flatListContent}
          />

          <View
            style={{
              borderWidth: 0.5,
              borderColor: theme.colors.secondary,
              marginTop: 12,
              marginHorizontal: 16,
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING,
    paddingHorizontal: SPACING / 4,
    backgroundColor: theme.colors.primary,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginBottom: SPACING,
    marginHorizontal: SPACING,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        paddingVertical: 6,
      },
      android: {
        elevation: 3,
        borderWidth: 0.5,
        borderColor: theme.colors.secondary,
        paddingVertical: 4,
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
    color: theme.colors.ternary,
    ...Platform.select({
      ios: {
        marginTop: 2,
      },
    }),
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.secondary,
    ...Platform.select({
      ios: {
        paddingVertical: 8,
        fontWeight: '500',
        fontFamily: 'System',
      },
      android: {
        paddingVertical: 4,
        fontWeight: 'normal',
        includeFontPadding: false,
      },
    }),
  },

  categorySection: {
    marginBottom: SPACING,
    padding: SPACING / 2,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING / 2,
    color: theme.colors.secondary,
    paddingHorizontal: SPACING / 2,
  },
  flatListContent: {
    paddingHorizontal: SPACING / 2,
  },
  cardWrapper: {
    width: ITEM_SIZE * 0.35,
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        overflow: 'hidden',
      },
    }),
  },
});

export default VendorCards;
