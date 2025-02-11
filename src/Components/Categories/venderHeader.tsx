import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Vendor} from '../../utils/canonicalModel';
import theme from '../../theme';

interface VendorDetailsProps {
  vendor: Vendor;
}

const VendorDetails: React.FC<VendorDetailsProps> = ({vendor}) => {
  return (
    vendor && (
      <View style={styles.container}>
        <Image
          source={{uri: `${vendor.vendorBanner}.jpg`}}
          style={styles.banner}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.description}>{vendor.storeDescription}</Text>
          <Text style={styles.category}> {vendor.storeCategory}</Text>
          <Text style={styles.info}>
            🕒 {vendor.storeOpeningTime} - {vendor.storeClosingTime}
          </Text>
          <Text style={styles.info}>📍 {vendor.distance}</Text>
          <Text style={styles.info}>👤 {vendor.vendorOwner}</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${vendor.vendorPhone}`)}>
            <Text style={styles.phone}>📞 {vendor.vendorPhone}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 2},
      },
      android: {
        elevation: 5,
      },
    }),
    margin: 15,
    alignItems: 'center',
    height: 200,
  },
  banner: {
    width: 120,
    height: '100%',
    borderRadius: 15,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ternary,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  phone: {
    fontSize: 18,
    color: '#007BFF',
    marginTop: 10,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VendorDetails;
