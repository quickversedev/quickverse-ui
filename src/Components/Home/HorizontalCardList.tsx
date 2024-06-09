import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, FlatList, Dimensions} from 'react-native';
import {Card, Text} from 'react-native-paper';
const {width} = Dimensions.get('window');
import fetchVenderList from '../../services/venderListApi';
import {Loading} from '../../utils/Loading';
import {VenderList} from '../../data/venderList';
import CardItem from '../util/CardItem';

const SPACING: any = 4;
const ITEM_SIZE: any = width * 0.46;
const EMPTY_ITEM_SIZE: any = width - ITEM_SIZE * 2.5;

const HorizontalCardList: React.FC = () => {
  //   const scrollx = React.useRef(new Animated.Value(0)).current;
  const [venderList, setvenderList] = useState<VenderList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchVenderList();
        setvenderList(items);
      } catch (error) {
        console.error('Error fetching food items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={venderList}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.98}
        snapToAlignment="start"
        bounces={false}
        scrollEventThrottle={16}
        renderItem={({item}) => {
          if (!item.image) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }

          return (
            <View style={{width: ITEM_SIZE, margin: SPACING * 3}}>
              {/* <View style={styles.card}> */}
              {/* <Card.Cover source={item.image} style={styles.posterImage} />
                <Card.Content style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 18}} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 14}} numberOfLines={1}>
                    {item.distance}
                  </Text>
                </Card.Content> */}
              <CardItem
                name={item.name}
                distance={item.distance}
                image={item.image}
              />
              {/* </View> */}
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
  card: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    borderRadius: 34,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,

    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HorizontalCardList;
