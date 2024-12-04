import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Card, Text } from 'react-native-paper';
const { width } = Dimensions.get('window');
import { FoodItem } from '../../../utils/canonicalModel';
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListHome } from '../HomeNavigation';

const SPACING: any = 10;
const ITEM_SIZE: any = width * 0.5;
const EMPTY_ITEM_SIZE: any = (width - ITEM_SIZE) / 2;

type HomeNavigationProp = StackNavigationProp<
  RootStackParamListHome,
  'WebView'
>;

interface Props {
  featuredItems: FoodItem[];
}

const HorizontalScroll: React.FC<Props> = ({ featuredItems }) => {
  const navigation = useNavigation<HomeNavigationProp>();

  const handleCardPress = (url: string | undefined) => {
    url && navigation.navigate('WebView', { url });
  };
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef<FlatList<FoodItem>>(null);

  const food = [
    { itemId: 'empty-left' },
    ...featuredItems,
    { itemId: 'empty-right' },
  ];

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        data={food}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        horizontal
        contentContainerStyle={{ alignItems: 'center' }}
        snapToInterval={ITEM_SIZE + SPACING * 2} // Adjusted spacing
        decelerationRate={0.98}
        snapToAlignment="start"
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollx } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          if (!item.itemImage) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollx.interpolate({
            inputRange,
            outputRange: [0, -40, 0],
            extrapolate: 'clamp',
          });

          return (
            <View key={index} style={{ width: ITEM_SIZE, marginBottom: 30 }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING,
                  alignItems: 'center',
                  transform: [{ translateY }, { translateY: 40 }], // Added constant shift down
                  borderRadius: 20, // Rounded rectangle
                  backgroundColor: '#FFE474', // Yellow background
                  paddingBottom: 20,
                  ...styles.elevatedCard, // Apply the elevation styles
                }}>
                <TouchableOpacity
                  onPress={() => handleCardPress(item.itemLink)}>
                  <View style={styles.cardContainer}>
                    <View style={styles.imageContainer}>
                      <Card.Cover
                        source={{ uri: `${item.itemImage}.jpg` }}
                        style={styles.posterImage}
                      />
                    </View>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.itemName}
                    </Text>
                    <TouchableOpacity
                      style={styles.orderButton}
                      onPress={() => handleCardPress(item.itemLink)}>
                      <Text style={styles.buttonText}>Order Now</Text>
                    </TouchableOpacity>
                  </View>
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
    marginTop: 14,
    marginBottom: 14,
    justifyContent: 'flex-start',
  },
  cardContainer: {
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageContainer: {
    width: ITEM_SIZE * 0.6, // size for the circle
    height: ITEM_SIZE * 0.5,
    borderRadius: ITEM_SIZE * 0.25,
    overflow: 'hidden',
    marginBottom: 10,
    // padding:10,
    // backgroundColor: '#FFF', // Optional background color for the gap
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    width: '100%',
    height: '100%',
    borderRadius: ITEM_SIZE * 0.25,
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, //  for iOS
    shadowOpacity: 0.3, // Opacity for iOS
    shadowRadius: 6, // Shadow blur radius for iOS
    elevation: 6, //
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.ternary,
    marginBottom: 10,
  },
  orderButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HorizontalScroll;
