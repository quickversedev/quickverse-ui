import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from '../../theme';

const SearchBarScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search for Food, Pharmacy and more"
          style={styles.input}
          placeholderTextColor="#113E50"
        />
        <MaterialIcons
          name="search"
          size={24}
          color="#8F1413"
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: '5%', // Ensure consistent spacing
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.buttonText,
    width: '100%',
    height: 50,
    maxWidth: 600,
    borderRadius: 25,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.colors.ternary,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16, // Fixed font size
    fontWeight: 'bold',
  },
});

export default SearchBarScreen;
