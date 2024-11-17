import React from 'react';
import {View, StyleSheet, FlatList, Dimensions, Image} from 'react-native';
import CardItem from '../../util/CardItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';
import {useNavigation} from '@react-navigation/native';
import {CampusBuzz} from '../../../utils/canonicalModel';

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 6912 / 3456;
const bannerHeight = screenWidth / aspectRatio;
const itemSpacing = 16;
const bannerWidth = screenWidth - 2 * itemSpacing;

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'WebView'
>;

interface Props {
  buzzData?: CampusBuzz[];
}

const CampusBuzzList: React.FC<Props> = ({buzzData}) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCardPress = (url: string | undefined) => {
    url && navigation.navigate('WebView', {url});
  };
  console.log('buzzdata', buzzData);
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={buzzData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={bannerWidth + itemSpacing * 2}
        decelerationRate="fast"
        snapToAlignment="center"
        bounces={false}
        scrollEventThrottle={16}
        renderItem={({item}) => (
          <View style={[styles.cardContainer, {marginHorizontal: itemSpacing}]}>
            <Image
              source={{uri: `${item?.buzzImage}.jpg`}}
              style={styles.image}
              resizeMode="cover"
            />
            <CardItem
              onPress={() => handleCardPress(item?.buzzUrl)}
              image={0}
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
    paddingTop: itemSpacing * 2,
    paddingBottom: itemSpacing * 2,
    // backgroundColor: '#FFDC52', // Match with user background preference
  },
  cardContainer: {
    width: bannerWidth,
    height: bannerHeight,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CampusBuzzList;
