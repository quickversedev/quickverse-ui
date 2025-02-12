// src/components/HorizontalCardList.tsx
import React, {useEffect} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
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

const {width} = Dimensions.get('window');
const SPACING: number = 4;
const ITEM_SIZE: number = (width - SPACING * 6) / 2;
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
  useEffect(() => {
    const campus = getCampus();
    campus && dispatch(fetchVendorList(campus));
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  const handleCardPress = (vendor: Vendor) => {
    navigation.removeListener;
    navigation.navigate('Categories', {vendor});
  };

  return (
    <ScrollView contentContainerStyle={styles.gridContainer}>
      {vendors &&
        vendors
          .filter(item => item.storeEnabled)
          .map((item, index) => (
            <View key={index} style={styles.cardContainer}>
              <CardItem
                name={item.vendorName}
                distance={item.distance}
                image={{uri: `${item.vendorBanner}.jpg`}}
                onPress={() => handleCardPress(item)}
              />
            </View>
          ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: SPACING * 10,
  },
  gridContainer: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING,
  },
  cardContainer: {
    width: ITEM_SIZE,
    marginVertical: SPACING,
  },
});

export default VendorCards;
