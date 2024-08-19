import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';

// const AddAddressScreen: React.FC<{ onSave: (address: any) => void, navigation: any }> = ({ onSave, navigation }) => {
//   const [flatNo, setFlatNo] = useState('');
//   const [street, setStreet] = useState('');
//   const [area, setArea] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [pincode, setPincode] = useState('');

// //   const handleSave = () => {
// //     const newAddress = { flatNo, street, area, city, state, pincode };
// //     onSave(newAddress);
// //     navigation.goBack();
// //   };
// const handleSave = () => {
//     const newAddress = {
//       flatNo,
//       street,
//       area,
//       city,
//       state,
//       pincode,
//     };
  
//     if (
//       newAddress.flatNo &&
//       newAddress.street &&
//       newAddress.area &&
//       newAddress.city &&
//       newAddress.state &&
//       newAddress.pincode
//     ) {
//       onSave(newAddress);
//       navigation.goBack();
//     } else {
//       console.log("Please fill in all fields.");
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Flat No</Text>
//       <TextInput style={styles.input} value={flatNo} onChangeText={setFlatNo} />

//       <Text style={styles.label}>Street</Text>
//       <TextInput style={styles.input} value={street} onChangeText={setStreet} />

//       <Text style={styles.label}>Area</Text>
//       <TextInput style={styles.input} value={area} onChangeText={setArea} />

//       <Text style={styles.label}>City</Text>
//       <TextInput style={styles.input} value={city} onChangeText={setCity} />

//       <Text style={styles.label}>State</Text>
//       <TextInput style={styles.input} value={state} onChangeText={setState} />

//       <Text style={styles.label}>Pincode</Text>
//       <TextInput style={styles.input} value={pincode} onChangeText={setPincode} />

//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save Address</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   label: {
//     fontSize: 16,
//     color: theme.colors.primary,
//     marginTop: 10,
//   },
//   input: {
//     borderColor: theme.colors.ternary,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 5,
//     marginBottom: 15,
//   },
//   saveButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default AddAddressScreen;




const AddAddressScreen: React.FC<{ onSave: (address: any) => void, navigation: any }> = ({ onSave, navigation }) => {
  const [flatNo, setFlatNo] = useState('');
  const [street, setStreet] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const handleSave = () => {
    const newAddress = {
      flatNo,
      street,
      area,
      city,
      state,
      pincode,
    };
  
    if (
      newAddress.flatNo &&
      newAddress.street &&
      newAddress.area &&
      newAddress.city &&
      newAddress.state &&
      newAddress.pincode
    ) {
      onSave(newAddress);
      navigation.goBack();
    } else {
      console.log("Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Flat No</Text>
      <TextInput style={styles.input} value={flatNo} onChangeText={setFlatNo} />

      <Text style={styles.label}>Street</Text>
      <TextInput style={styles.input} value={street} onChangeText={setStreet} />

      <Text style={styles.label}>Area</Text>
      <TextInput style={styles.input} value={area} onChangeText={setArea} />

      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />

      <Text style={styles.label}>State</Text>
      <TextInput style={styles.input} value={state} onChangeText={setState} />

      <Text style={styles.label}>Pincode</Text>
      <TextInput style={styles.input} value={pincode} onChangeText={setPincode} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: theme.colors.primary,
    marginTop: 10,
  },
  input: {
    borderColor: theme.colors.ternary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddAddressScreen;

// // // import React, { useState } from 'react';
// // // import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// // // import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';

// // // const AddAddressScreen: React.FC<{ onSave: (address: any) => void, navigation: any }> = ({ onSave, navigation }) => {
// // //   const [flatNo, setFlatNo] = useState('');
// // //   const [street, setStreet] = useState('');
// // //   const [area, setArea] = useState('');
// // //   const [city, setCity] = useState('');
// // //   const [state, setState] = useState('');
// // //   const [pincode, setPincode] = useState('');

// // //   const handleSave = () => {
// // //     const newAddress = {
// // //       flatNo,
// // //       street,
// // //       area,
// // //       city,
// //       state,
// //       pincode,
// //     };
  
// //     if (
// //       newAddress.flatNo &&
// //       newAddress.street &&
// //       newAddress.area &&
// //       newAddress.city &&
// //       newAddress.state &&
// //       newAddress.pincode
// //     ) {
// //       onSave(newAddress);
// //       navigation.goBack();
// //     } else {
// //       console.log("Please fill in all fields.");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.label}>Flat No</Text>
// //       <TextInput style={styles.input} value={flatNo} onChangeText={setFlatNo} />

// //       <Text style={styles.label}>Street</Text>
// //       <TextInput style={styles.input} value={street} onChangeText={setStreet} />

// //       <Text style={styles.label}>Area</Text>
// //       <TextInput style={styles.input} value={area} onChangeText={setArea} />

// //       <Text style={styles.label}>City</Text>
// //       <TextInput style={styles.input} value={city} onChangeText={setCity} />

// //       <Text style={styles.label}>State</Text>
// //       <TextInput style={styles.input} value={state} onChangeText={setState} />

// //       <Text style={styles.label}>Pincode</Text>
// //       <TextInput style={styles.input} value={pincode} onChangeText={setPincode} />

// //       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
// //         <Text style={styles.saveButtonText}>Save Address</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //   },
// //   label: {
// //     fontSize: 16,
// //     color: theme.colors.primary,
// //     marginTop: 10,
// //   },
// //   input: {
// //     borderColor: theme.colors.ternary,
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     padding: 10,
// //     marginTop: 5,
// //     marginBottom: 15,
// //   },
// //   saveButton: {
// //     backgroundColor: theme.colors.primary,
// //     padding: 10,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   saveButtonText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// // });

// // export default AddAddressScreen;

// // import React, { useState } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// // import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';

// // const AddAddressScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
// //   const { onSave } = route.params; // Get onSave from route params
// //   const [flatNo, setFlatNo] = useState('');
// //   const [street, setStreet] = useState('');
// //   const [area, setArea] = useState('');
// //   const [city, setCity] = useState('');
// //   const [state, setState] = useState('');
// //   const [pincode, setPincode] = useState('');

// //   const handleSave = () => {
// //     const newAddress = {
// //       flatNo,
// //       street,
// //       area,
// //       city,
// //       state,
// //       pincode,
// //     };

// //     if (
// //       newAddress.flatNo &&
// //       newAddress.street &&
// //       newAddress.area &&
// //       newAddress.city &&
// //       newAddress.state &&
// //       newAddress.pincode
// //     ) {
// //       onSave(newAddress);
// //       navigation.goBack();
// //     } else {
// //       console.log("Please fill in all fields.");
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.label}>Flat No</Text>
// //       <TextInput style={styles.input} value={flatNo} onChangeText={setFlatNo} />

// //       <Text style={styles.label}>Street</Text>
// //       <TextInput style={styles.input} value={street} onChangeText={setStreet} />

// //       <Text style={styles.label}>Area</Text>
// //       <TextInput style={styles.input} value={area} onChangeText={setArea} />

// //       <Text style={styles.label}>City</Text>
// //       <TextInput style={styles.input} value={city} onChangeText={setCity} />

// //       <Text style={styles.label}>State</Text>
// //       <TextInput style={styles.input} value={state} onChangeText={setState} />

// //       <Text style={styles.label}>Pincode</Text>
// //       <TextInput style={styles.input} value={pincode} onChangeText={setPincode} />

// //       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
// //         <Text style={styles.saveButtonText}>Save Address</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //   },
// //   label: {
// //     fontSize: 16,
// //     color: theme.colors.primary,
// //     marginTop: 10,
// //   },
// //   input: {
// //     borderColor: theme.colors.ternary,
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     padding: 10,
// //     marginTop: 5,
// //     marginBottom: 15,
// //   },
// //   saveButton: {
// //     backgroundColor: theme.colors.primary,
// //     padding: 10,
// //     borderRadius: 5,
// //     alignItems: 'center',
// //   },
// //   saveButtonText: {
// //     color: '#fff',
// //     fontWeight: '600',
// //     fontSize: 16,
// //   },
// // });

// // export default AddAddressScreen;
// // import React, { useState } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// // import theme from '/Users/kalidasulochani/Desktop/ReactAPPS/quickverse-ui/src/theme.ts';

// const AddAddressScreen: React.FC<{ onSave: (address: any) => void, navigation: any }> = ({ onSave, navigation }) => {
//   const [flatNo, setFlatNo] = useState('');
//   const [street, setStreet] = useState('');
//   const [area, setArea] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [pincode, setPincode] = useState('');

// //   const handleSave = () => {
// //     const newAddress = { flatNo, street, area, city, state, pincode };
// //     onSave(newAddress);
// //     navigation.goBack();
// //   };
// const handleSave = () => {
//     if (
//       newAddress.flatNo &&
//       newAddress.street &&
//       newAddress.area &&
//       newAddress.city &&
//       newAddress.state &&
//       newAddress.pincode
//     ) {
//       onSave(newAddress);
//       navigation.goBack();
//     } else {
//       // Handle the case where some fields are missing
//       alert("Please fill in all fields.");
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Flat No</Text>
//       <TextInput style={styles.input} value={flatNo} onChangeText={setFlatNo} />

//       <Text style={styles.label}>Street</Text>
//       <TextInput style={styles.input} value={street} onChangeText={setStreet} />

//       <Text style={styles.label}>Area</Text>
//       <TextInput style={styles.input} value={area} onChangeText={setArea} />

//       <Text style={styles.label}>City</Text>
//       <TextInput style={styles.input} value={city} onChangeText={setCity} />

//       <Text style={styles.label}>State</Text>
//       <TextInput style={styles.input} value={state} onChangeText={setState} />

//       <Text style={styles.label}>Pincode</Text>
//       <TextInput style={styles.input} value={pincode} onChangeText={setPincode} />

//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save Address</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   label: {
//     fontSize: 16,
//     color: theme.colors.primary,
//     marginTop: 10,
//   },
//   input: {
//     borderColor: theme.colors.ternary,
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 5,
//     marginBottom: 15,
//   },
//   saveButton: {
//     backgroundColor: theme.colors.primary,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default AddAddressScreen;
