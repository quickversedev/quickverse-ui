import React, {useEffect, useRef, useState} from 'react';
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
// import RNPickerSelect from 'react-native-picker-select';
import theme from '../../theme';
import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import AppHeader from '../util/AppHeader';
import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
import CampusBuzz from './campusBuzz/CampusBuzz';
import FeaturedItems from './featuredItems/FeaturedItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCampus, setCampus} from '../../utils/Storage';
import {fetchCampusIds} from '../../services/fetchCampusIds';
import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';
import IonIcons from 'react-native-vector-icons/Ionicons';
const HomeScreen: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>(
    'IIMU-313001',
  );
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
    // getCampusDetails();
    fetchCampus();

    console.log('selected camous:', selectedCampus);
    setTimeout(() => {
      const camp = getCampus();
      console.log('campussssssssssssss:', camp);
      camp && setSelectedCampus(camp);
    }, 1000);
    console.log('selecteddddd camous:', selectedCampus);
    selectedCampus && setCampus(selectedCampus);
  }, [selectedCampus]);
  // adding these lines for search bar
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
            {/* <View style= {styles.buttonadd}>
                  <TouchableOpacity>
    <AntDesign name = 'Profile' size={20}/>
</TouchableOpacity>
                  </View> */}
        </TouchableOpacity>
        <View style= {styles.buttonadd}>
                  <TouchableOpacity>
    <IonIcons name = 'profile' size={20}/>
</TouchableOpacity>
                  </View>

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

      <ScrollView>
      <View>
            <SearchBar />
            </View>
        
        <FeaturedItems campus={selectedCampus} />
        <HomeScreenVendors campus={selectedCampus} />
        <PromoDiscounts campus={selectedCampus} />
        <CampusBuzz campus={selectedCampus} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  buttonadd:{
    padding:10,
    paddingVertical:20,
    paddingStart:40,
    paddingLeft:40,
    height:50,
    width:50,
    backgroundColor: '#FFF',
    borderColor:'#C0C0C0',
    borderWidth:1,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
    borderRadius:100,
  },
  container: {
    //padding:25,
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerContainer: {
    flexDirection:'row',
    zIndex: 1000, // Ensure the dropdown is above other elements
  },
  touchableOpacity: {
    width: '70%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.9,
    alignSelf: "flex-start",
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


// import React, {useEffect, useRef, useState} from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Text,
//   // TextInput,
// } from 'react-native';
// // import RNPickerSelect from 'react-native-picker-select';
// import theme from '../../theme';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// // import AppHeader from '../util/AppHeader';
// import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
// import CampusBuzz from './campusBuzz/CampusBuzz';
// import FeaturedItems from './featuredItems/FeaturedItems';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {getCampus, setCampus} from '../../utils/Storage';
// import {fetchCampusIds} from '../../services/fetchCampusIds';
// import SearchBar from '../searchbar';
// const HomeScreen: React.FC = () => {
//   const [selectedCampus, setSelectedCampus] = useState<string | undefined>(
//     'IIMU-313001',
//   );
//   const [campusOptions, setCampusOptions] = useState<any>();
//   const [clicked, setClicked] = useState(false);

//   const fetchCampus = async () => {
//     const response = await fetchCampusIds();
//     const campusOption = response?.map(campus => ({
//       label: campus.campusName,
//       value: campus.campusId,
//     }));
//     setCampusOptions(campusOption);
//   };
//   useEffect(() => {
//     // getCampusDetails();
//     fetchCampus();

//     console.log('selected camous:', selectedCampus);
//     setTimeout(() => {
//       const camp = getCampus();
//       console.log('campussssssssssssss:', camp);
//       camp && setSelectedCampus(camp);
//     }, 1000);
//     console.log('selecteddddd camous:', selectedCampus);
//     selectedCampus && setCampus(selectedCampus);
//   }, [selectedCampus]);
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={() => {
//             setClicked(!clicked);
//           }}>
//           <Text style={styles.touchableText}>
//             {selectedCampus === '' ? 'Select Campus' : selectedCampus}
//           </Text>
//           {clicked ? (
//             <MaterialCommunityIcons
//               name="chevron-up"
//               size={20}
//               color={theme.colors.ternary}
//             />
//           ) : (
//             <MaterialCommunityIcons
//               name="chevron-down"
//               size={20}
//               color={theme.colors.ternary}
//             />
//           )}

// </TouchableOpacity>
//         <View style= {styles.buttonadd}>
//                   <TouchableOpacity>
//     <IonIcons name = 'profile' size={20}/>
// </TouchableOpacity>
       
        
//         {clicked ? (
//           <View style={styles.dropdownContainer}>
//             <FlatList
//               data={campusOptions}
//               keyExtractor={item => item.value}
//               renderItem={({item}) => (
//                 <TouchableOpacity
//                   style={styles.listItem}
//                   onPress={() => {
//                     setSelectedCampus(item.value);
//                     setClicked(!clicked);
//                   }}>
//                   <Text style={styles.listItemText}>{item.value}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         ) : null}
//       </View>
//       <ScrollView>
//       <View>
//         <SearchBar />
//       </View>
//         <FeaturedItems campus={selectedCampus} />
//         <HomeScreenVendors campus={selectedCampus} />
//         <PromoDiscounts campus={selectedCampus} />
//         <CampusBuzz campus={selectedCampus} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   headerContainer: {
//     zIndex: 1000, // Ensure the dropdown is above other elements
//   },
//   buttonadd:{
//     padding:10,
//     paddingVertical:20,
//     paddingStart:40,
//     paddingLeft:40,
//     height:50,
//     width:50,
//     backgroundColor: '#FFF',
//     borderColor:'#C0C0C0',
//     borderWidth:1,
//     alignItems:'center',
//     alignContent:'center',
//     justifyContent:'center',
//     borderRadius:100,
//   },
//   touchableOpacity: {
//     width: '90%',
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 0.9,
//     alignSelf: 'center',
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: 15,
//     paddingRight: 15,
//     backgroundColor: theme.colors.primary, // Ensure background is set for visibility
//   },
//   touchableText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
//   dropdownContainer: {
//     elevation: 5,
//     marginTop: 10,
//     maxHeight: 500, // Limit the height of the dropdown
//     alignSelf: 'center',
//     width: '90%',
//     borderWidth: 0.9,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 10,
//     position: 'absolute',
//     top: 60, // Adjust as needed to position below the button
//     zIndex: 1000,
//     overflow: 'scroll',
//   },
//   searchInput: {
//     width: '90%',
//     height: 50,
//     alignSelf: 'center',
//     borderWidth: 0.2,
//     borderColor: theme.colors.ternary,
//     borderRadius: 7,
//     marginTop: 20,
//     paddingLeft: 20,
//   },
//   listItem: {
//     width: '85%',
//     alignSelf: 'center',
//     height: 50,
//     justifyContent: 'center',
//     borderBottomWidth: 0.5,
//     borderColor: theme.colors.ternary,
//   },
//   listItemText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
// });

// export default HomeScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
// import CampusBuzz from './campusBuzz/CampusBuzz';
// import FeaturedItems from './featuredItems/FeaturedItems';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { getCampus, setCampus } from '../../utils/Storage';
// import { fetchCampusIds } from '../../services/fetchCampusIds';
// import SearchBar from '../searchbar';
// import { useNavigation } from '@react-navigation/native';
// import theme from '../../theme';

// const HomeScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const [selectedCampus, setSelectedCampus] = useState<string | undefined>(
//     'IIMU-313001'
//   );
//   const [campusOptions, setCampusOptions] = useState<any>();
//   const [clicked, setClicked] = useState(false);

//   const fetchCampus = async () => {
//     const response = await fetchCampusIds();
//     const campusOption = response?.map(campus => ({
//       label: campus.campusName,
//       value: campus.campusId,
//     }));
//     setCampusOptions(campusOption);
//   };

//   useEffect(() => {
//     fetchCampus();
//     setTimeout(() => {
//       const camp = getCampus();
//       camp && setSelectedCampus(camp);
//     }, 1000);
//     selectedCampus && setCampus(selectedCampus);
//   }, [selectedCampus]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={() => {
//             setClicked(!clicked);
//           }}>
//           <Text style={styles.touchableText}>
//             {selectedCampus === '' ? 'Select Campus' : selectedCampus}
//           </Text>
//           {clicked ? (
//             <MaterialCommunityIcons
//               name="chevron-up"
//               size={20}
//               color={theme.colors.ternary}
//             />
//           ) : (
//             <MaterialCommunityIcons
//               name="chevron-down"
//               size={20}
//               color={theme.colors.ternary}
//             />
//           )}
//         </TouchableOpacity>

//         <View style={styles.buttonAdd}>
//           <TouchableOpacity >
//             <IonIcons name="person" size={20} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {clicked && (
//         <View style={styles.dropdownContainer}>
//           <FlatList
//             data={campusOptions}
//             keyExtractor={item => item.value}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.listItem}
//                 onPress={() => {
//                   setSelectedCampus(item.value);
//                   setClicked(!clicked);
//                 }}>
//                 <Text style={styles.listItemText}>{item.label}</Text>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}

//       <ScrollView>
//         <View>
//           <SearchBar />
//         </View>
//         <FeaturedItems campus={selectedCampus} />
//         <HomeScreenVendors campus={selectedCampus} />
//         <PromoDiscounts campus={selectedCampus} />
//         <CampusBuzz campus={selectedCampus} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//     zIndex: 1000, // Ensure the dropdown is above other elements
//   },
//   buttonAdd: {
//     padding: 10,
//     paddingVertical: 20,
//     paddingStart: 40,
//     paddingLeft: 40,
//     height: 50,
//     width: 50,
//     backgroundColor: '#FFF',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     alignItems: 'center',
//     alignContent: 'center',
//     justifyContent: 'center',
//     borderRadius: 100,
//   },
//   touchableOpacity: {
//     width: '70%',
//     height: 50,
//     borderRadius: 10,
//     borderWidth: 0.9,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingLeft: 15,
//     paddingRight: 15,
//     backgroundColor: theme.colors.primary, // Ensure background is set for visibility
//   },
//   touchableText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
//   dropdownContainer: {
//     elevation: 5,
//     marginTop: 10,
//     maxHeight: 500, // Limit the height of the dropdown
//     alignSelf: 'center',
//     width: '90%',
//     borderWidth: 0.9,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 10,
//     position: 'absolute',
//     top: 60, // Adjust as needed to position below the button
//     zIndex: 1000,
//     overflow: 'scroll',
//   },
//   searchInput: {
//     width: '90%',
//     height: 50,
//     alignSelf: 'center',
//     borderWidth: 0.2,
//     borderColor: theme.colors.ternary,
//     borderRadius: 7,
//     marginTop: 20,
//     paddingLeft: 20,
//   },
//   listItem: {
//     width: '85%',
//     alignSelf: 'center',
//     height: 50,
//     justifyContent: 'center',
//     borderBottomWidth: 0.5,
//     borderColor: theme.colors.ternary,
//   },
//   listItemText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
// });

// export default HomeScreen;
