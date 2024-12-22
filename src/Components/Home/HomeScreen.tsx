import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
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
import HomeButtons from './Homebuttons/HomeButtons';
import SearchBarScreen from './Searchbar/SearchBarScreen';
import AppNavigator from '../Cart/Cart_navigator';

const HomeScreen: React.FC = () => {
  const [selectedCampusId, setSelectedCampusId] = useState<
    string | undefined
  >();
  const [campusOptions, setCampusOptions] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const isFirstTimeLogin = getIsNewUser();
  const {selectedCampus} = useAuth();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.campusSelector}>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => {
              setClicked(!clicked);
            }}>
            <Text style={styles.touchableText}>
              {selectedCampusId === '' ? 'Select Campus' : selectedCampusId}
            </Text>
            {clicked ? (
              <MaterialCommunityIcons
                name="chevron-up"
                size={20}
                color={theme.colors.ternary}
              />
            ) : (
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={theme.colors.ternary}
              />
            )}
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

        {/* Cart Button */}
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() =>
            navigation.navigate('CategoriesNavigator', {screen: 'Services'})
          }>
          <MaterialCommunityIcons
            name="cart-outline"
            size={24}
            color="#FFDC52"
          />
        </TouchableOpacity>
      </View>

      {isFirstTimeLogin && <LoginDetails />}
      <ScrollView style={styles.scrollView}>
        <SearchBarScreen />
        <HomeButtons />
        <PromoDiscounts campus={selectedCampusId} />
        <FeaturedItems campus={selectedCampusId} />
        <HomeScreenVendors campus={selectedCampusId} />
        <CampusBuzz campus={selectedCampusId} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 10,
    position: 'relative', // Allow dropdown to be positioned relative to this container
    zIndex: 2, // header stays above other components
  },
  campusSelector: {
    flex: 1,
    zIndex: 2,
  },
  touchableOpacity: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: theme.colors.primary,
  },
  touchableText: {
    fontWeight: '600',
    color: theme.colors.ternary,
  },
  dropdownContainer: {
    elevation: 5,
    marginTop: 10,
    maxHeight: 500, // Limit the height of dropdown
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0.9,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    position: 'absolute',
    top: 60,
    zIndex: 10, // Ensure the dropdown is above the search bar and buttons
    overflow: 'scroll',
  },
  searchInput: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderWidth: 0.2,
    borderColor: theme.colors.ternary,
    borderRadius: 7,
    marginTop: 20,
    paddingLeft: 20,
    zIndex: 1, // Ensure it stays under the dropdown
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
  cartButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginLeft: 5,
  },
  scrollView: {
    zIndex: 1, // Ensure the scroll view stays below the dropdown
  },
});

export default HomeScreen;
