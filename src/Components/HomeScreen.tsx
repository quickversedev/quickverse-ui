import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import {Appbar, Card, Text} from 'react-native-paper';
import theme from '../theme';
const {width} = Dimensions.get('window');
import fetchFoodItems from '../services/foodItemsApi';
import {FoodItem} from '../data/foodItems';

const SPACING: any = 10;
const ITEM_SIZE: any = width * 0.54;
const EMPTY_ITEM_SIZE: any = (width - ITEM_SIZE) / 2;
const Loading: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};
const HomeScreen: React.FC = () => {
  // const [foodCollection, setFoodCollenction] = useState<any>();
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const flatListRef = React.useRef<FlatList<FoodItem>>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchFoodItems();
        setFoodItems([{id: 'empty-left'}, ...items, {id: 'empty-right'}]);
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

  // const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: '#FFDC52', height: 90}}>
        <View style={styles.headerContent}>
          <Text style={styles.textHeaderContent} variant="headlineMedium">
            Hi, QUICK!
          </Text>
          <Text variant="bodyMedium" style={styles.textSubContent}>
            Welcome to the lightning Fast universe
          </Text>
        </View>
      </Appbar.Header>
      <StatusBar hidden />
      <Animated.FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={foodItems}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0.98}
        snapToAlignment="start"
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollx}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.image) {
            return <View style={{width: EMPTY_ITEM_SIZE}} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollx.interpolate({
            inputRange,
            outputRange: [0, -50, 0],
            extrapolate: 'clamp',
          });
          return (
            <View style={{width: ITEM_SIZE}}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  transform: [{translateY}],
                  // backgroundColor: 'white',
                  borderRadius: 34,
                }}>
                <Card.Cover source={item.image} style={styles.posterImage} />
              </Animated.View>
            </View>
          );
        }}
      />

      {/* <ScrollView contentContainerStyle={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {foodItems.map(item => (
            <Card key={item.id} style={styles.card}>
              <Card.Cover source={{uri: item.image}} style={styles.cardImage} />
              <Card.Content>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  textHeaderContent: {
    fontFamily: 'inter',
    fontSize: 26,
    fontWeight: '900',
    color: theme.colors.secondary,
  },
  textSubContent: {
    fontFamily: 'inter',
    fontSize: 20,
    fontWeight: 800,
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    marginTop: 30,
    marginRight: 26,
    width: 200,
    borderRadius: 8,
    height: 200,
    // overflow: 'hidden',
  },
  cardImage: {
    height: 120,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#0000ff',
  },
});

export default HomeScreen;
