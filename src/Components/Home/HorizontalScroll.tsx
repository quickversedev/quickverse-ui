import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
const {width} = Dimensions.get('window');
import {fetchFoodItems} from '../../services/FoodItemsSlice';
import {FoodItem} from '../../data/foodItems';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {Loading} from '../../utils/Loading';

const SPACING: any = 4;
const ITEM_SIZE: any = width * 0.76;
const EMPTY_ITEM_SIZE: any = (width - ITEM_SIZE) / 2;
const HorizontalScroll: React.FC = () => {
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<FlatList<FoodItem>>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {foodItemsList, loading} = useSelector(
    (state: RootState) => state.foodItems,
  );
  useEffect(() => {
    dispatch(fetchFoodItems());
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  const food = [{id: 'empty-left'}, ...foodItemsList, {id: 'empty-right'}];
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={food}
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
                  paddingTop: SPACING * 15,
                  transform: [{translateY}],
                  borderRadius: 34,
                }}>
                <Card.Cover source={item.image} style={styles.posterImage} />
                <Card.Content style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 24}} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 14}} numberOfLines={3}>
                    {item.description}
                  </Text>
                </Card.Content>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: SPACING,
    justifyContent: 'flex-start',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 0.8,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default HorizontalScroll;
