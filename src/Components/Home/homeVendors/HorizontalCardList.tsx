import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import CardItem from '../../util/CardItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';
import {useNavigation} from '@react-navigation/native';
import {Vendor} from '../../../utils/canonicalModel';

const {width} = Dimensions.get('window');
const SPACING: any = 10;
const ITEM_SIZE: any = width * 0.3;
// const EMPTY_ITEM_SIZE: any = width - ITEM_SIZE * 2.5;

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'Categories'
>;
interface Props {
  vendors: Vendor[];
}
const HorizontalCardList: React.FC<Props> = ({vendors}) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCardPress = (vendor: Vendor) => {
    navigation.removeListener;
    navigation.navigate('Categories', {vendor});
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={vendors}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        horizontal
        // contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.98}
        snapToAlignment="start"
        bounces={false}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={styles.cardContainer}>
              <CardItem
                name={item.vendorName}
                distance={item.distance}
                image={{uri: `${item.vendorBanner}.jpg`}}
                onPress={() => handleCardPress(item)}
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
    paddingTop: 5,
  },
  cardContainer: {
    width: ITEM_SIZE,
    margin: SPACING,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default HorizontalCardList;
