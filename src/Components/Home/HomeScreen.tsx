import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import theme from '../../theme';
import HomeScreenVendors from './homeVendors/HomeScreenVendors';
import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
import CampusBuzz from './campusBuzz/CampusBuzz';
import FeaturedItems from './featuredItems/FeaturedItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCampus, getIsNewUser, setCampus} from '../../utils/Storage';
import {fetchCampusIds} from '../../services/fetchCampusIds';
import LoginDetails from '../Login/loginDetails';
import {useAuth} from '../../utils/AuthContext';
import CartScreen from '../Cart/CartScreen';
import {useSelector} from 'react-redux';
import {selectCart} from '../../services/cart/productCartSlice';
const HomeScreen: React.FC = () => {
  const [selectedCampusId, setSelectedCampusId] = useState<
    string | undefined
  >();
  const [modalVisible, setModalVisible] = useState(false);
  const [campusOptions, setCampusOptions] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const isFirstTimeLogin = getIsNewUser();
  const {selectedCampus} = useAuth();
  const animationValue = useRef(new Animated.Value(1000)).current;
  const closeCartModal = () => {
    Animated.timing(animationValue, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };
  const fetchCampus = async () => {
    const response = await fetchCampusIds();
    const campusOption = response?.map(campus => ({
      label: campus.campusName,
      value: campus.campusId,
    }));
    setCampusOptions(campusOption);
  };
  useEffect(() => {
    fetchCampus();
    setTimeout(() => {
      const camp = getCampus();
      camp ? setSelectedCampusId(camp) : setSelectedCampusId('IIMU-313001');
    }, 1000);

    if (selectedCampusId) {
      setCampus(selectedCampusId);
    }
  }, [selectedCampusId]);
  useEffect(() => {
    selectedCampus && setSelectedCampusId(selectedCampus);
  }, [selectedCampus]);
  const cart = useSelector(selectCart);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <>
          <View style={styles.headerContainer}>
            <View style={styles.campusSelector}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => setClicked(!clicked)}>
                <Text style={styles.touchableText}>
                  {selectedCampusId === '' ? 'Select Campus' : selectedCampusId}
                </Text>
                <MaterialCommunityIcons
                  name={clicked ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={theme.colors.ternary}
                />
              </TouchableOpacity>
              {clicked && (
                <View style={styles.dropdownContainer}>
                  <FlatList
                    data={campusOptions}
                    keyExtractor={item => item.value}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => {
                          setSelectedCampusId(item.value);
                          setClicked(!clicked);
                        }}>
                        <Text style={styles.listItemText}>{item.value}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons
                name="cart-outline"
                size={24}
                color="#FFDC52"
              />
              {totalCartItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {isFirstTimeLogin && <LoginDetails />}
          <ScrollView style={styles.scrollView}>
            <PromoDiscounts campus={selectedCampusId} />
            <FeaturedItems campus={selectedCampusId} />
            <HomeScreenVendors campus={selectedCampusId} />
            <CampusBuzz campus={selectedCampusId} />
          </ScrollView>
        </>
      </SafeAreaView>
      <CartScreen modalVisible={modalVisible} closeCartModal={closeCartModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    zIndex: 1000,
  },
  campusSelector: {
    flex: 1,
    zIndex: 2,
  },
  touchableOpacity: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: theme.colors.primary,
  },
  touchableText: {
    fontWeight: '600',
    color: theme.colors.ternary,
  },
  dropdownContainer: {
    elevation: 5,
    marginTop: 10,
    maxHeight: 500,
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0.9,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    position: 'absolute',
    top: 60,
    zIndex: 10,
    overflow: 'scroll',
  },

  listItem: {
    width: '85%',
    alignSelf: 'center',
    height: 50,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: theme.colors.ternary,
  },
  listItemText: {
    fontWeight: '600',
    color: theme.colors.ternary,
  },
  scrollView: {
    zIndex: 1, // Ensure the scroll view stays below the dropdown
  },
  cartButton: {
    height: 50,
    width: 50,
    borderRadius: 15,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 10, // Adds spacing between dropdown and cart button
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
