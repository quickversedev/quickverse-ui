import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  FlatList,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
const ITEM_SIZE: number = (width - SPACING * 3) / 3;

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

  useEffect(() => {
    const campus = getCampus();
    campus && dispatch(fetchVendorList(campus));
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
    if (!searchQuery.trim()) return groupedVendors;
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
      showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by vendor or category"
        placeholderTextColor={theme.colors.ternary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {Object.entries(filteredVendors).map(([category, categoryVendors]) => (
        <View key={category} style={styles.categorySection}>
          <Text style={styles.categoryTitle}>{category}</Text>
          <FlatList
            data={categoryVendors}
            keyExtractor={item => item.vendorId.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.cardContainer}>
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
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: SPACING,
    marginHorizontal: SPACING,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categorySection: {
    marginBottom: SPACING,
    padding: SPACING / 2,
    borderColor: '#e0e0e0',
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.ternary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
  cardContainer: {
    width: ITEM_SIZE,
    marginRight: SPACING,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default VendorCards;
