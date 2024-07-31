import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import theme from '../../theme';
import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import AppHeader from '../util/AppHeader';
import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
import CampusBuzz from './campusBuzz/CampusBuzz';
import FeaturedItems from './featuredItems/FeaturedItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCampus, setCampus} from '../../utils/Storage';
import {fetchCampusIds} from '../../services/fetchCampusIds';
import {Campus} from '../../utils/canonicalModel';
const HomeScreen: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>();
  const [campusOptions, setCampusOptions] = useState<any>();
  // const campusOptions = [
  //   {label: 'iimu', value: 'IIMU-313001'},
  //   {label: 'GITS', value: 'GITS-313022'},
  //   {label: 'Campus 3', value: '3'},
  //   // Add more campuses as needed
  // ];
  const fetchCampus = async () => {
    const response = await fetchCampusIds();
    const campusOption = response.map(campus => ({
      label: campus.campusName,
      value: campus.campusId,
    }));
    setCampusOptions(campusOption);
  };
  useEffect(() => {
    // getCampusDetails();
    fetchCampus();

    console.log('selected camous:', selectedCampus);
    setTimeout(() => {
      const camp = getCampus();
      setSelectedCampus(camp);
    }, 1000);

    selectedCampus && setCampus(selectedCampus);
  }, [selectedCampus]);
  return (
    selectedCampus && (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <RNPickerSelect
            onValueChange={value => setSelectedCampus(value)}
            items={campusOptions}
            placeholder={
              selectedCampus
                ? {label: `${selectedCampus}`, value: selectedCampus}
                : {label: 'Select Campus', value: null}
            }
            style={pickerSelectStyles}
            Icon={() => {
              return (
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={20}
                  color={theme.colors.ternary}
                />
              );
            }}
          />
          {/* <AppHeader headerText={authData ? 'Hi, ' + name : 'Hi, Welcome...!'} /> */}
        </View>
        <ScrollView>
          <FeaturedItems campus={selectedCampus} />
          <HomeScreenVendors campus={selectedCampus} />
          <PromoDiscounts campus={selectedCampus} />
          <CampusBuzz campus={selectedCampus} />
        </ScrollView>
      </SafeAreaView>
    )
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
    paddingHorizontal: 10,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.ternary,
    borderRadius: 4,
    color: theme.colors.ternary,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: theme.colors.ternary,
    borderRadius: 8,
    color: theme.colors.ternary,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: theme.colors.ternary, // Customize the placeholder color here
    fontSize: 16,
  },
});
export default HomeScreen;
function async() {
  throw new Error('Function not implemented.');
}
