import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
const {width} = Dimensions.get('window');
import {fetchFoodItems} from '../../../services/FoodItemsSlice';
import {FoodItem} from '../../../utils/canonicalModel';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {Loading} from '../../util/Loading';
import theme from '../../../theme';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamListHome} from '../HomeNavigation';

const SPACING: any = 4;
const ITEM_SIZE: any = width * 0.76;
const EMPTY_ITEM_SIZE: any = (width - ITEM_SIZE) / 2;

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'WebView'
>;

const HorizontalScroll: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCardPress = (url: string | undefined) => {
    url && navigation.navigate('WebView', {url});
  };
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<FlatList<FoodItem>>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {foodItemsList, loading} = useSelector(
    (state: RootState) => state.foodItems,
  );
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchFoodItems());
    }, 1000);
  }, [dispatch]);
  if (loading) {
    return <Loading />;
  }
  const food = [
    {itemId: 'empty-left'},
    ...foodItemsList,
    {itemId: 'empty-right'},
  ];
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={food}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
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
          if (!item.itemImage) {
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
            <View key={index} style={{width: ITEM_SIZE}}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  paddingTop: SPACING * 15,
                  transform: [{translateY}],
                  borderRadius: 34,
                }}>
                <TouchableOpacity
                  onPress={() => handleCardPress(item.itemLink)}
                  style={styles.posterImage}>
                  <Card.Cover
                    source={{uri: `${item.itemImage}.jpg`}}
                    style={styles.posterImage}
                  />
                  <Card.Content style={{alignItems: 'center'}}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.itemName}
                    </Text>
                    <Text style={styles.itemDesc} numberOfLines={3}>
                      {item.itemDesc}
                    </Text>
                  </Card.Content>
                </TouchableOpacity>
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
  itemName: {fontSize: 24, color: theme.colors.ternary},
  itemDesc: {fontSize: 14, color: theme.colors.ternary, textAlign: 'center'},
});

export default HorizontalScroll;
