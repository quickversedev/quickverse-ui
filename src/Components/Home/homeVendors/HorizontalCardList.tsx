import React from 'react';
import {View, StyleSheet, StatusBar, FlatList, Dimensions} from 'react-native';
import CardItem from '../../util/CardItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';
import {useNavigation} from '@react-navigation/native';
import {Vendor} from '../../../utils/canonicalModel';

const {width} = Dimensions.get('window');
const SPACING: any = 3;
const ITEM_SIZE: any = width * 0.46;
// const EMPTY_ITEM_SIZE: any = width - ITEM_SIZE * 2.5;

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'WebView'
>;
interface Props {
  vendors: Vendor[];
}
const HorizontalCardList: React.FC<Props> = ({vendors}) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCardPress = (url: string) => {
    navigation.navigate('WebView', {url});
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
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.98}
        snapToAlignment="start"
        bounces={false}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          return (
            <View key={index} style={{width: ITEM_SIZE, margin: SPACING * 2}}>
              <CardItem
                name={item.vendorName}
                distance={item.distance}
                image={{uri: `${item.vendorBanner}.jpg`}}
                onPress={() => handleCardPress(item.vendorEndPoint)}
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
