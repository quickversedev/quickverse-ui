import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const CategoriesScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FOOD & GROCERIES</Text>
        <View style={styles.itemRow}>
          <Image source={{ uri: 'https://linktoimage1.com' }} style={styles.itemImage} />
          <Image source={{ uri: 'https://linktoimage2.com' }} style={styles.itemImage} />
          <Image source={{ uri: 'https://linktoimage3.com' }} style={styles.itemImage} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RESTRO</Text>
        <View style={styles.itemRow}>
          <View style={styles.itemPlaceholder} />
          <View style={styles.itemPlaceholder} />
          <View style={styles.itemPlaceholder} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SERVICES</Text>
        <View style={styles.itemRow}>
          <View style={styles.itemPlaceholder} />
          <View style={styles.itemPlaceholder} />
          <View style={styles.itemPlaceholder} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFD700',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#8B0000',
    color: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#8B0000',
    borderRadius: 8,
  },
});

export default CategoriesScreen;
