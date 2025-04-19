import React from 'react';
import {View, StyleSheet, FlatList, Dimensions, Platform} from 'react-native';
import CardItem from '../../util/CardItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';
import {useNavigation} from '@react-navigation/native';
import {Vendor} from '../../../utils/canonicalModel';

const {width} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width;

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
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.listContent}
        snapToInterval={ITEM_SIZE + SPACING * 2}
        decelerationRate={Platform.select({ios: 0.98, android: 0.95})}
        snapToAlignment="start"
        bounces={false}
        scrollEventThrottle={16}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: Platform.select({
      ios: 15,
      android: 10,
    }),
  },
  listContent: {
    // paddingHorizontal: Platform.select({
    //   ios: SPACING,
    //   android: SPACING,
    // }),
  },
  cardWrapper: {
    width: ITEM_SIZE * 0.35,
    marginHorizontal: SPACING,
    // backgroundColor: 'white',//
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

export default HorizontalCardList;
