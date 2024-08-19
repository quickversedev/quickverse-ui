




import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        mode="outlined"
        outlineColor="#C0C0C0"
        activeOutlineColor="#6200EE" // Adjust as per your theme color
        placeholderTextColor="#C0C0C0"
      />
      <TouchableOpacity style={styles.button} >
        <FontAwesome name="search" size={20} color="#C0C0C0" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius:30,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderTopLeftRadius: 65,
    borderBottomLeftRadius: 65,
    borderWidth: 1,
    borderRadius:30,
    borderTopStartRadius:40,
    borderColor: '#C0C0C0',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF  ', // Adjust as per your theme color
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
});
