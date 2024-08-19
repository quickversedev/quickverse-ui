

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
// import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';
// import theme from '../../theme';
// import globalConfig from '../../utils/GlobalConfig';

// const HomeScreen: React.FC = () => {
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
//           <TouchableOpacity>
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
          
//           <SearchBar  />
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
//     padding:10,
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
//     height: 50,
//     width: 50,
//     backgroundColor: '#FFF',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     alignItems: 'center',
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
//   searchBar: {
//     backgroundColor: '#FFF', // Set search bar background color to white
//   },
// });

// export default HomeScreen;






//1.
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
// import CampusBuzz from './campusBuzz/CampusBuzz';
// import FeaturedItems from './featuredItems/FeaturedItems';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';
// import theme from '../../theme';
// import CustomBottomSheet from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/bottomSheet.tsx'; // Import the BottomSheet component

// const HomeScreen: React.FC = () => {
//   const [selectedCampus, setSelectedCampus] = useState<string | undefined>('IIMU-313001');
//   const [clicked, setClicked] = useState(false);
//   const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

//   const toggleBottomSheet = () => {
//     setBottomSheetVisible(!isBottomSheetVisible);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={() => setClicked(!clicked)}>
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
//           <TouchableOpacity onPress={toggleBottomSheet}>
//             <IonIcons name="person" size={20} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {clicked && (
//         <View style={styles.dropdownContainer}>
//           {/* Dropdown content goes here */}
//         </View>
//       )}

//       <ScrollView>
//         <SearchBar />
//         <FeaturedItems campus={selectedCampus} />
//         <HomeScreenVendors campus={selectedCampus} />
//         <PromoDiscounts campus={selectedCampus} />
//         <CampusBuzz campus={selectedCampus} />
//       </ScrollView>

//       {isBottomSheetVisible && (
//         <CustomBottomSheet closeSheet={toggleBottomSheet} />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   buttonAdd: {
//     padding: 10,
//     height: 50,
//     width: 50,
//     backgroundColor: '#FFF',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     alignItems: 'center',
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
//     backgroundColor: theme.colors.primary,
//   },
//   touchableText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
//   dropdownContainer: {
//     elevation: 5,
//     marginTop: 10,
//     maxHeight: 500,
//     alignSelf: 'center',
//     width: '90%',
//     borderWidth: 0.9,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 10,
//     position: 'absolute',
//     top: 60,
//     zIndex: 1000,
//   },
// });

// export default HomeScreen;

//2.
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
// import CampusBuzz from './campusBuzz/CampusBuzz';
// import FeaturedItems from './featuredItems/FeaturedItems';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';
// import theme from '../../theme';
// import CustomBottomSheet from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/bottomSheet.tsx'; // Updated import

// const HomeScreen: React.FC = () => {
//   const [selectedCampus, setSelectedCampus] = useState<string | undefined>('IIMU-313001');
//   const [clicked, setClicked] = useState(false);
//   const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

//   const toggleBottomSheet = () => {
//     setBottomSheetVisible(!isBottomSheetVisible);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={() => setClicked(!clicked)}>
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
//           <TouchableOpacity onPress={toggleBottomSheet}>
//             <IonIcons name="person" size={20} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {clicked && (
//         <View style={styles.dropdownContainer}>
//           {/* Dropdown content goes here */}
//         </View>
//       )}

//       <ScrollView>
//         <SearchBar />
//         <FeaturedItems campus={selectedCampus} />
//         <HomeScreenVendors campus={selectedCampus} />
//         <PromoDiscounts campus={selectedCampus} />
//         <CampusBuzz campus={selectedCampus} />
//       </ScrollView>

//       {isBottomSheetVisible && (
//         <CustomBottomSheet closeSheet={toggleBottomSheet} />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   buttonAdd: {
//     padding: 10,
//     height: 50,
//     width: 50,
//     backgroundColor: '#FFF',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     alignItems: 'center',
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
//     backgroundColor: theme.colors.primary,
//   },
//   touchableText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
//   dropdownContainer: {
//     elevation: 5,
//     marginTop: 10,
//     maxHeight: 500,
//     alignSelf: 'center',
//     width: '90%',
//     borderWidth: 0.9,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 10,
//     position: 'absolute',
//     top: 60,
//     zIndex: 1000,
//   },
// });

// export default HomeScreen;
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
// import CampusBuzz from './campusBuzz/CampusBuzz';
// import FeaturedItems from './featuredItems/FeaturedItems';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';
// import theme from '../../theme';
// import CustomBottomSheet from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/bottomSheet.tsx'; // Updated import

// //import CustomBottomSheet from './CustomBottomSheet'; // Import custom bottom sheet

// const HomeScreen: React.FC = () => {
//   const [selectedCampus, setSelectedCampus] = useState<string | undefined>('IIMU-313001');
//   const [clicked, setClicked] = useState(false);
//   const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

//   const toggleBottomSheet = () => {
//     setBottomSheetVisible(!isBottomSheetVisible);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={() => setClicked(!clicked)}>
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
//           <TouchableOpacity onPress={toggleBottomSheet}>
//             <IonIcons name="person" size={20} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {clicked && (
//         <View style={styles.dropdownContainer}>
//           {/* Dropdown content goes here */}
//         </View>
//       )}

//       <ScrollView>
//         <SearchBar />
//         <FeaturedItems campus={selectedCampus} />
//         <HomeScreenVendors campus={selectedCampus} />
//         <PromoDiscounts campus={selectedCampus} />
//         <CampusBuzz campus={selectedCampus} />
//       </ScrollView>

//       <CustomBottomSheet
//         visible={isBottomSheetVisible}
//         onClose={toggleBottomSheet}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   buttonAdd: {
//     padding: 10,
//     height: 50,
//     width: 50,
//     backgroundColor: '#FFF',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     alignItems: 'center',
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
//     backgroundColor: theme.colors.primary,
//   },
//   touchableText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
//   dropdownContainer: {
//     elevation: 5,
//     marginTop: 10,
//     maxHeight: 500,
//     alignSelf: 'center',
//     width: '90%',
//     borderWidth: 0.9,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 10,
//     position: 'absolute',
//     top: 60,
//     zIndex: 1000,
//   },
// });

// export default HomeScreen;
import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Alert, // Import Alert for demonstration
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import globalConfig from '../../utils/GlobalConfig';
import HomeScreenVendors from './homeVendors/HomeScreenVendors';
import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
import CampusBuzz from './campusBuzz/CampusBuzz';
import FeaturedItems from './featuredItems/FeaturedItems';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';
import theme from '../../theme';
import CustomBottomSheet from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/bottomSheet.tsx'; // Updated import

//import CustomBottomSheet from './CustomBottomSheet'; // Import custom bottom sheet

// const HomeScreen: React.FC = () => {
//   const [selectedCampus, setSelectedCampus] = useState<string | undefined>('IIMU-313001');
//   const [clicked, setClicked] = useState(false);
//   const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

//   const toggleBottomSheet = () => {
//     setBottomSheetVisible(!isBottomSheetVisible);
//   };

//   const handleAddAddress = () => {
//     // Handle "Add New Address" button press
//     Alert.alert('Add New Address', 'This is where you can add a new address.');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={() => setClicked(!clicked)}>
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
//           <TouchableOpacity onPress={toggleBottomSheet}>
//             <IonIcons name="person" size={20} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {clicked && (
//         <View style={styles.dropdownContainer}>
//           {/* Dropdown content goes here */}
//         </View>
//       )}

//       <ScrollView>
//         <SearchBar />
//         <FeaturedItems campus={selectedCampus} />
//         <HomeScreenVendors campus={selectedCampus} />
//         <PromoDiscounts campus={selectedCampus} />
//         <CampusBuzz campus={selectedCampus} />
//       </ScrollView>

//       <CustomBottomSheet
//         visible={isBottomSheetVisible}
//         onClose={toggleBottomSheet}
//         onAddAddress={handleAddAddress} // Pass the handler to bottom sheet
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   buttonAdd: {
//     padding: 10,
//     height: 50,
//     width: 50,
//     backgroundColor: '#FFF',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     alignItems: 'center',
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
//     backgroundColor: theme.colors.primary,
//   },
//   touchableText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
//   dropdownContainer: {
//     elevation: 5,
//     marginTop: 10,
//     maxHeight: 500,
//     alignSelf: 'center',
//     width: '90%',
//     borderWidth: 0.9,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 10,
//     position: 'absolute',
//     top: 60,
//     zIndex: 1000,
//   },
// });

// export default HomeScreen;
// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
// import CampusBuzz from './campusBuzz/CampusBuzz';
// import FeaturedItems from './featuredItems/FeaturedItems';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';
// import theme from '../../theme';
// import CustomBottomSheet from './CustomBottomSheet'; // Import custom bottom sheet

// const HomeScreen: React.FC = () => {
//   const [selectedCampus, setSelectedCampus] = useState<string | undefined>('IIMU-313001');
//   const [clicked, setClicked] = useState(false);
//   const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
//   const [address, setAddress] = useState('1234 Some Street, City, Country'); // Default address

//   const toggleBottomSheet = () => {
//     setBottomSheetVisible(!isBottomSheetVisible);
//   };

//   const handleAddAddress = (newAddress: string) => {
//     setAddress(newAddress);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity
//           style={styles.touchableOpacity}
//           onPress={() => setClicked(!clicked)}>
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
//           <TouchableOpacity onPress={toggleBottomSheet}>
//             <IonIcons name="person" size={20} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {clicked && (
//         <View style={styles.dropdownContainer}>
//           {/* Dropdown content goes here */}
//         </View>
//       )}

//       <ScrollView>
       
//         { globalConfig.SearchBarEnabled?<SearchBar />:<></>
//         }
        
//         <FeaturedItems campus={selectedCampus} />
//         <HomeScreenVendors campus={selectedCampus} />
//         <PromoDiscounts campus={selectedCampus} />
//         <CampusBuzz campus={selectedCampus} />
//       </ScrollView>

//       <CustomBottomSheet
//         visible={isBottomSheetVisible}
//         onClose={toggleBottomSheet}
//         address={address}
//         onAddAddress={handleAddAddress} // Pass the handler to bottom sheet
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 10,
//   },
//   buttonAdd: {
//     padding: 10,
//     height: 50,
//     width: 50,
//     backgroundColor: '#FFF',
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     alignItems: 'center',
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
//     backgroundColor: theme.colors.primary,
//   },
//   touchableText: {
//     fontWeight: '600',
//     color: theme.colors.ternary,
//   },
//   dropdownContainer: {
//     elevation: 5,
//     marginTop: 10,
//     maxHeight: 500,
//     alignSelf: 'center',
//     width: '90%',
//     borderWidth: 0.9,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 10,
//     position: 'absolute',
//     top: 60,
//     zIndex: 1000,
//   },
// });

// export default HomeScreen;

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   SafeAreaView,
//   View,
//   TouchableOpacity,
//   Text,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import theme from '../../theme';
// import CustomBottomSheet from './CustomBottomSheet'; // Import custom bottom sheet
// import FeaturedItems from './featuredItems/FeaturedItems';
// import HomeScreenVendors from './homeVendors/HomeScreenVendors';
// import PromoDiscounts from './PromoAndDiscount/PromoDiscounts';
// import CampusBuzz from './campusBuzz/CampusBuzz';
// import SearchBar from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/searchBar.tsx';

const HomeScreen: React.FC = () => {
  const [selectedCampus, setSelectedCampus] = useState<string | undefined>('IIMU-313001');
  const [clicked, setClicked] = useState(false);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [address, setAddress] = useState('1234 Some Street, City, Country'); // Default address

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  const handleAddAddress = (newAddress: any) => {
    setAddress(`${newAddress.flatNo}, ${newAddress.street}, ${newAddress.area}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={() => setClicked(!clicked)}>
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
        <View style={styles.buttonAdd}>
          <TouchableOpacity onPress={toggleBottomSheet}>
            <IonIcons name="person" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {clicked && (
        <View style={styles.dropdownContainer}>
          {/* Dropdown content goes here */}
        </View>
      )}

      <ScrollView>
        { globalConfig.SearchBarEnabled ? <SearchBar /> : <></> }
        <FeaturedItems campus={selectedCampus} />
        <HomeScreenVendors campus={selectedCampus} />
        <PromoDiscounts campus={selectedCampus} />
        <CampusBuzz campus={selectedCampus} />
      </ScrollView>

      <CustomBottomSheet
        visible={isBottomSheetVisible}
        onClose={toggleBottomSheet}
        onAddAddress={handleAddAddress} // Pass the handler to bottom sheet
        //address={address}
        // Ensure address prop is passed correctly if needed
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  buttonAdd: {
    padding: 10,
    height: 50,
    width: 50,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  touchableOpacity: {
    width: '70%',
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
    maxHeight: 500,
    alignSelf: 'center',
    width: '90%',
    borderWidth: 0.9,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    position: 'absolute',
    top: 60,
    zIndex: 1000,
  },
});

export default HomeScreen;
