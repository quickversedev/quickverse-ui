
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, TextInput, FlatList } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';



//import React, { useState, useEffect } from 'react';
//import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, TextInput, FlatList } from 'react-native';
//import IonIcons from 'react-native-vector-icons/Ionicons';
//import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';
//import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/util/MockdataAddress.json'
import { writeFile } from 'react-native-fs';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface Address {
//   flatNo: string;
//   street: string;
//   area: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddAddress: (newAddress: Address) => void;
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, onAddAddress }) => {
//   const [addresses, setAddresses] = useState<Address[]>(addressData.addresses);

//   const handleAddAddress = (newAddress: Address) => {
//     const updatedAddresses = [...addresses, newAddress];
//     setAddresses(updatedAddresses);

//     // Update JSON file
//     const updatedData = { addresses: updatedAddresses };
//     const path = '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
//     writeFile(path, JSON.stringify(updatedData), 'utf8')
//       .then(() => console.log('Address added to JSON file'))
//       .catch((error: any) => console.log('Error writing to file:', error));
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={() => onAddAddress(newAddress)}>
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';
// import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/util/MockdataAddress.json';
// import { writeFile } from 'react-native-fs';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface Address {
//   flatNo: string;
//   street: string;
//   area: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddAddress: () => void;
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, onAddAddress }) => {
//   const [addresses, setAddresses] = useState<Address[]>(addressData.addresses);

//   const handleAddAddress = (newAddress: Address) => {
//     const updatedAddresses = [...addresses, newAddress];
//     setAddresses(updatedAddresses);

//     // Update JSON file
//     const updatedData = { addresses: updatedAddresses };
//     const path = '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
//     writeFile(path, JSON.stringify(updatedData), 'utf8')
//       .then(() => console.log('Address added to JSON file'))
//       .catch((error: any) => console.log('Error writing to file:', error));
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={onAddAddress}>
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';
// import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/util/MockdataAddress.json';
// import { writeFile } from 'react-native-fs';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface Address {
//   flatNo: string;
//   street: string;
//   area: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   navigation: any;
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, navigation }) => {
//   const [addresses, setAddresses] = React.useState<Address[]>(addressData.addresses);

//   const handleAddAddress = (newAddress: Address) => {
//     const updatedAddresses = [...addresses, newAddress];
//     setAddresses(updatedAddresses);

//     // Update JSON file
//     const updatedData = { addresses: updatedAddresses };
//     const path = '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
//     writeFile(path, JSON.stringify(updatedData), 'utf8')
//       .then(() => console.log('Address added to JSON file'))
//       .catch((error: any) => console.log('Error writing to file:', error));
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate('AddAddress', { onSave: handleAddAddress })}
//           >
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;
// CustomBottomSheet.tsx
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import theme from '/path/to/theme';
// import addressData from '/path/to/MockdataAddress.json';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface Address {
//   flatNo: string;
//   street: string;
//   area: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   address: string;
//   onAddAddress: (newAddress: Address) => void;
//   navigation: any; // Ensure proper type if using TypeScript
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, address, onAddAddress, navigation }) => {
//   const [addresses, setAddresses] = useState<Address[]>(addressData.addresses);

//   const handleOpenAddAddressScreen = () => {
//     navigation.navigate('AddAddress', {
//       onSave: (newAddress: Address) => {
//         const updatedAddresses = [...addresses, newAddress];
//         setAddresses(updatedAddresses);

//         // Optionally update JSON file here
//       },
//     });
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <Text style={styles.addressText}>{address}</Text>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={handleOpenAddAddressScreen}>
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, TextInput, FlatList } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';
// import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddAddress: (newAddress: any) => void;
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, onAddAddress }) => {
//   const [addresses, setAddresses] = useState(addressData.addresses);
//   const [newAddress, setNewAddress] = useState('');

//   const handleAddAddress = () => {
//     const newAddr = { /* New address details */ };
//     onAddAddress(newAddr);
//     setAddresses([...addresses, newAddr]);
//     setNewAddress('');
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';
// import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
// import { writeFile } from 'react-native-fs'; // Assuming you're using this or a similar library for file operations

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface Address {
//   flatNo: string;
//   street: string;
//   area: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddAddress: (newAddress: Address) => void;
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, onAddAddress }) => {
//   const [addresses, setAddresses] = useState<Address[]>(addressData.addresses);

//   const handleAddAddress = (newAddress: Address) => {
//     const updatedAddresses = [...addresses, newAddress];
//     setAddresses(updatedAddresses);

//     // Update JSON file
//     const updatedData = { addresses: updatedAddresses };
//     const path = '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
//     writeFile(path, JSON.stringify(updatedData), 'utf8')
//       .then(() => console.log('Address added to JSON file'))
//       .catch((error) => console.log('Error writing to file:', error));
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={() => onAddAddress(newAddress)}>
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;


// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface Address {
//   flatNo: string;
//   street: string;
//   area: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddAddress: (newAddress: Address) => void;
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, onAddAddress }) => {
//   const [addresses, setAddresses] = useState<Address[]>([]);

//   const handleAddAddress = (newAddress: Address) => {
//     const updatedAddresses = [...addresses, newAddress];
//     setAddresses(updatedAddresses);
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={() => onAddAddress(newAddress)}>
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions, FlatList } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';
// import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/Components/util/MockdataAddress.json';
// import { writeFile } from 'react-native-fs';

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// interface Address {
//   flatNo: string;
//   street: string;
//   area: string;
//   city: string;
//   state: string;
//   pincode: string;
// }

// interface CustomBottomSheetProps {
//   visible: boolean;
//   onClose: () => void;
//   onAddAddress: () => void;
// }

// const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, onAddAddress }) => {
//   const [addresses, setAddresses] = useState<Address[]>(addressData.addresses);

//   const handleAddAddress = (newAddress: Address) => {
//     const updatedAddresses = [...addresses, newAddress];
//     setAddresses(updatedAddresses);

//     // Update JSON file
//     const updatedData = { addresses: updatedAddresses };
//     const path = '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
//     writeFile(path, JSON.stringify(updatedData), 'utf8')
//       .then(() => console.log('Address added to JSON file'))
//       .catch((error: any) => console.log('Error writing to file:', error));
//   };
//   onAddAddress()

//   return (
//     <Modal
//       visible={visible}
//       transparent={true}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.container}>
//         <View style={styles.sheetContainer}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <IonIcons name="close" size={24} color={theme.colors.primary} />
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={addresses}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <Text style={styles.addressText}>
//                 {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
//               </Text>
//             )}
//           />
//           <TouchableOpacity style={styles.addButton} onPress={onAddAddress}>
//             <Text style={styles.addButtonText}>Add New Address</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   sheetContainer: {
//     width: '100%',
//     height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   addressText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   addButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default CustomBottomSheet;


// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Modal,
//   View,
//   TouchableOpacity,
//   Text,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import IonIcons from 'react-native-vector-icons/Ionicons';
// import theme from '../../theme';
// import addressData from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Address {
  flatNo: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
}

interface CustomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onAddAddress: (newAddress: Address) => void; // Update the type of onAddAddress
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({ visible, onClose, onAddAddress }) => {
  const [addresses, setAddresses] = useState<Address[]>(addressData.addresses);

  const handleAddAddress = () => {
    // Create a new address for demonstration purposes
    const newAddress: Address = {
      flatNo: 'Flat 12B',
      street: 'Baker Street',
      area: 'Downtown',
      city: 'London',
      state: 'Greater London',
      pincode: 'NW1 6XE',
    };

    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);

    // Pass the new address to the parent component
    onAddAddress(newAddress);

    // Update JSON file
    const updatedData = { addresses: updatedAddresses };
    const path = '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/data/addressData.json';
    writeFile(path, JSON.stringify(updatedData), 'utf8')
      .then(() => console.log('Address added to JSON file'))
      .catch((error: any) => console.log('Error writing to file:', error));
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <IonIcons name="close" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={addresses}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.addressText}>
                {item.flatNo}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}
              </Text>
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.8, // 80% of the screen height
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CustomBottomSheet;
