import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar, FlatList, Dimensions} from 'react-native';
import {Loading} from '../../utils/Loading';
import CardItem from '../util/CardItem';
import {AppDispatch, RootState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVendorList} from '../../services/VendorListSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from './HomeNavigation';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const SPACING: any = 3;
const ITEM_SIZE: any = width * 0.46;
const EMPTY_ITEM_SIZE: any = width - ITEM_SIZE * 2.5;

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'WebView'
>;

const HorizontalCardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomeNavigationProp>();
  const {vendors, loading} = useSelector(
    (state: RootState) => state.vendorList,
  );
  useEffect(() => {
    dispatch(fetchVendorList());
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  const handleCardPress = (url: string) => {
    navigation.navigate('WebView', {url});
  };
  const enabledVendors = vendors.filter(vendor => vendor.enable);
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={enabledVendors}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.98}
        snapToAlignment="start"
        bounces={false}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          return (
            <View style={{width: ITEM_SIZE, margin: SPACING * 3}}>
              <CardItem
                name={item.name}
                distance={item.distance}
                image={item.image}
                onPress={() => handleCardPress(item.link)}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SPACING * 10,
  },
});

export default HorizontalCardList;
