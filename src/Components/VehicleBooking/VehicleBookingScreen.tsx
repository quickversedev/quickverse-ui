import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

type Vehicle = {
  id: string;
  name: string;
  rate: string;
  available: number;
  image: string;
};

const vehiclesData: Vehicle[] = [
  {
    id: '1',
    name: 'Activa 5g',
    rate: '100',
    available: 10,
    image: 'https://example.com/activa.png', // Replace with actual image link
  },
  {
    id: '2',
    name: 'Splender',
    rate: '150',
    available: 8,
    image: 'https://example.com/splender.png', // Replace with actual image link
  },
  {
    id: '3',
    name: 'Vespa',
    rate: '200',
    available: 0,
    image: 'https://example.com/vespa.png', // Replace with actual image link
  },
];

export default function App() {
  const [, setSelectedCollege] = useState<string | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    'Scooty' | 'Bike' | null
  >(null);

  const renderVehicle = ({item}: {item: Vehicle}) => (
    <View style={styles.vehicleContainer}>
      <Image source={{uri: item.image}} style={styles.vehicleImage} />
      <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleRate}>Rs {item.rate}/hr</Text>
        <Text
          style={
            item.available > 0 ? styles.availableText : styles.notAvailableText
          }>
          {item.available > 0 ? `${item.available} Available` : 'Not Available'}
        </Text>
        <TouchableOpacity
          style={styles.bookButton}
          disabled={item.available === 0}
          onPress={() => alert(`Booking ${item.name}`)}>
          <Text style={styles.bookButtonText}>Book Vehicle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scooty & Bike Rentals</Text>
      <RNPickerSelect
        onValueChange={value => setSelectedCollege(value)}
        items={[
          {label: 'College 1', value: 'College 1'},
          {label: 'College 2', value: 'College 2'},
        ]}
        placeholder={{label: 'Select College', value: null}}
        style={pickerSelectStyles}
      />
      <View style={styles.vehicleTypeContainer}>
        <TouchableOpacity onPress={() => setSelectedVehicleType('Scooty')}>
          <Text
            style={
              selectedVehicleType === 'Scooty'
                ? styles.selectedVehicleType
                : styles.vehicleType
            }>
            Scooty
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedVehicleType('Bike')}>
          <Text
            style={
              selectedVehicleType === 'Bike'
                ? styles.selectedVehicleType
                : styles.vehicleType
            }>
            Bike
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={vehiclesData}
        renderItem={renderVehicle}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdd835',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  vehicleType: {
    fontSize: 18,
    marginHorizontal: 20,
    color: '#000',
  },
  selectedVehicleType: {
    fontSize: 18,
    marginHorizontal: 20,
    color: '#007bff',
    fontWeight: 'bold',
  },
  vehicleContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  vehicleImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  vehicleDetails: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vehicleRate: {
    fontSize: 16,
    color: '#888',
  },
  availableText: {
    fontSize: 14,
    color: 'green',
  },
  notAvailableText: {
    fontSize: 14,
    color: 'red',
  },
  bookButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#fff',
  },
};
function alert(_arg0: string): void {
  throw new Error('Function not implemented.');
}
