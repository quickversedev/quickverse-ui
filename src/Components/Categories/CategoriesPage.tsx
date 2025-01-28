// import React from 'react';
// import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
// import {categoriesData} from '../../data/mockData';
// import CategoryItem from './CategoryItem';

// import theme from '../../theme';

// export default function CategoriesPage() {
//   // Handle item click
//   const handleItemClick = (itemName: string) => {
//     Alert.alert('Item Clicked', `You clicked on: ${itemName}`);
//     // You can add navigation or other actions here
//   };

//   return (
//     <View style={styles.main}>
//       {/* Food Section */}
//       <View style={styles.section}>
//         <Text style={styles.heading}>Food</Text>
//         <FlatList
//           data={categoriesData[0].items} // Accessing Food items from mocked data
//           numColumns={3}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => (
//             <CategoryItem
//               image={item.image}
//               name={item.name}
//               onPress={() => handleItemClick(item.name)} // Pass the click handler
//             />
//           )}
//         />
//         {/* Horizontal line after the section */}
//         <View style={styles.horizontalLine} />
//       </View>

//       {/* Pharmacy Section */}
//       <View style={styles.section}>
//         <Text style={styles.heading}>Pharmacy</Text>
//         <FlatList
//           data={categoriesData[1].items} // Accessing Pharmacy items from mocked data
//           numColumns={3}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => (
//             <CategoryItem
//               image={item.image}
//               name={item.name}
//               onPress={() => handleItemClick(item.name)} // Pass the click handler
//             />
//           )}
//         />
//         {/* Horizontal line after the section */}
//         <View style={styles.horizontalLine} />
//       </View>

//       {/* Services Section */}
//       <View style={styles.section}>
//         <Text style={styles.heading}>Services</Text>
//         <FlatList
//           data={categoriesData[2].items} // Accessing Services items from mocked data
//           numColumns={3}
//           keyExtractor={item => item.id}
//           renderItem={({item}) => (
//             <CategoryItem
//               image={item.image}
//               name={item.name}
//               onPress={() => handleItemClick(item.name)} // Pass the click handler
//             />
//           )}
//         />
//         {/* Horizontal line after the section */}
//         <View style={styles.horizontalLine} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: theme.colors.primary,
//   },
//   section: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: 23,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#8F1413',
//     borderWidth: 1,
//     borderColor: '#8F1413',
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 30,
//     alignSelf: 'center',
//     maxWidth: '80%',
//   },
//   horizontalLine: {
//     height: 1,
//     backgroundColor: '#8F1413',
//     width: '90%',
//     alignSelf: 'center',
//     marginVertical: 5,
//   },
// });
