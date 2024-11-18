import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  // TextInput,
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
const HomeScreen: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>();
  const [campusOptions, setCampusOptions] = useState<any>();
  const [clicked, setClicked] = useState(false);

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
      camp ? setSelectedCampus(camp) : setSelectedCampus('IIMU-313001');
    }, 1000);

    selectedCampus && setCampus(selectedCampus);
  }, [selectedCampus]);
  const isForstTimeLogin = getIsNewUser();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => {
            setClicked(!clicked);
          }}>
          <Text style={styles.touchableText}>
            {selectedCampus === '' ? 'Select Campus' : selectedCampus}
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
        {clicked ? (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={campusOptions}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => {
                    setSelectedCampus(item.value);
                    setClicked(!clicked);
                  }}>
                  <Text style={styles.listItemText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null}
      </View>
      {isForstTimeLogin ? (
        <LoginDetails />
      ) : (
        <ScrollView>
          <PromoDiscounts campus={selectedCampus} />
          <FeaturedItems campus={selectedCampus} />
          <HomeScreenVendors campus={selectedCampus} />
          <CampusBuzz campus={selectedCampus} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerContainer: {
    zIndex: 1000, // Ensure the dropdown is above other elements
  },
  touchableOpacity: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.9,
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: theme.colors.primary, // Ensure background is set for visibility
  },
  touchableText: {
    fontWeight: '600',
    color: theme.colors.ternary,
  },
  dropdownContainer: {
    elevation: 5,
    marginTop: 10,
    maxHeight: 500, // Limit the height of the dropdown
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0.9,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    position: 'absolute',
    top: 60, // Adjust as needed to position below the button
    zIndex: 1000,
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
});

export default HomeScreen;
