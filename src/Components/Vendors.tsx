import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import theme from '../theme';
import CardItem from './util/CardItem';
import {VenderList} from '../data/venderList';
import fetchVenderList from '../services/venderListApi';
import {Loading} from '../utils/Loading';
const {width} = Dimensions.get('window');
const ITEM_SIZE: any = width * 0.76;
const SPACING: any = 4;
function Vandors() {
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
    <Loading />;
  }
  return (
    <>
      <View style={styles.container}>
        <Appbar.Header style={styles.headerContent}>
          {/* <View style={styles.headerContent}> */}
          <Text style={styles.textHeaderContent} variant="headlineMedium">
            Stores Near You!
          </Text>
          {/* </View> */}
        </Appbar.Header>
      </View>
      <View style={{backgroundColor: 'red', display: 'flex', flex: 1}}>
        <FlatList
          data={venderList}
          keyExtractor={item => item.id}
          contentContainerStyle={{display: 'flex'}}
          snapToInterval={ITEM_SIZE}
          decelerationRate={0.98}
          bounces={false}
          scrollEventThrottle={16}
          renderItem={({item}) => {
            // if (!item.image) {
            //   return <View style={{width: EMPTY_ITEM_SIZE}} />;
            // }

            return (
              <View
                style={{
                  width: ITEM_SIZE / 2,
                  margin: SPACING,
                  display: 'flex',
                }}>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,r
    margin: 10,
    // padding: 15,
    backgroundColor: theme.colors.primary, // You can change the color as per your theme
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 40, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  textHeaderContent: {
    fontFamily: 'inter',
    fontSize: 26,
    fontWeight: '900',
    color: theme.colors.secondary,
    // backgroundColor: theme.colors.primary,
    // backgroundColor: 'black',
  },
  headerContent: {
    backgroundColor: theme.colors.primary,
    // margin: 10,
    // borderRadius: 50,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Vandors;
