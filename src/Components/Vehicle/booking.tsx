import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

type Vehicle = {
  id: string;
  name: string;
  rate: string;
  available: number;
  image: string;
  type: 'Scooty' | 'Bike';
};

const vehiclesData: Vehicle[] = [
  {
    id: '1',
    name: 'Activa 5g',
    rate: '100',
    available: 10,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/9/95/Honda_Activa.jpg',
    type: 'Scooty',
  },
  {
    id: '2',
    name: 'Maestro',
    rate: '150',
    available: 8,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/3/35/Hero_Maestro_Edge.jpg',
    type: 'Scooty',
  },
  {
    id: '3',
    name: 'Access 125',
    rate: '150',
    available: 8,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Suzuki_Access_125.jpg',
    type: 'Scooty',
  },
  {
    id: '4',
    name: 'Vespa',
    rate: '200',
    available: 0,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/6/68/Vespa_Sport_50cc.jpg',
    type: 'Scooty',
  },
  {
    id: '5',
    name: 'Ktm Duke',
    rate: '200',
    available: 4,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/79/KTM_390_Duke.jpg',
    type: 'Bike',
  },
  {
    id: '6',
    name: 'Kavasaki Ninja',
    rate: '200',
    available: 2,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/f4/Kawasaki_Ninja_300.jpg',
    type: 'Bike',
  },
  {
    id: '7',
    name: 'Royal Enfield',
    rate: '200',
    available: 0,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/7d/Royal_Enfield_Classic_350.jpg',
    type: 'Bike',
  },
];
export default function App() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    'Scooty' | 'Bike' | null
  >(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [quantityOptions, setQuantityOptions] = useState<number[]>([]);
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
  const [isPickupPickerVisible, setPickupPickerVisible] = useState(false);
  const [isDropoffPickerVisible, setDropoffPickerVisible] = useState(false);

  useEffect(() => {
    axios
      .get('http://65.0.18.159:8080/quickVerse/v1/campus', {
        headers: {
          Authorization: 'Basic cXZDYXN0bGVFbnRyeTpjYSR0bGVfUGVybWl0QDAx',
          Cookie: 'JSESSIONID=093C9E3EAFB15CE9BD4AEFD539BF98F8', // Add the Cookie header
        },
      })
      .then(response => {
        const campusArray = response.data?.campuses?.campus;
        if (Array.isArray(campusArray)) {
          const campusData = campusArray.map((campus: any) => ({
            label: campus.name,
            value: campus.name,
            key: campus.id,
          }));
          setColleges(campusData);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      })
      .catch(error => {
        console.error(
          'Error fetching colleges:',
          error.response?.data || error.message,
        );
      });
  }, []);
  

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
          style={[
            styles.bookButton,
            item.available === 0 && styles.disabledButton,
          ]}
          disabled={item.available === 0}
          onPress={() => {
            setSelectedVehicle(item);
            setQuantityOptions(
              Array.from({length: item.available}, (_, i) => i + 1),
            );
            setModalVisible(true);
          }}>
          <Text style={styles.bookButtonText}>Book Vehicle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVehicle(null);
    setPickupDate(null);
    setDropoffDate(null);
  };

  // Filter vehicles based on selected vehicle type
  const filteredVehicles = selectedVehicleType
    ? vehiclesData.filter(vehicle => vehicle.type === selectedVehicleType)
    : vehiclesData;

  const handlePickupConfirm = (date: Date) => {
    setPickupDate(date);
    setPickupPickerVisible(false);
  };

  const handleDropoffConfirm = (date: Date) => {
    setDropoffDate(date);
    setDropoffPickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Scooty & Bike Rentals</Text>

      {/* College Selector Dropdown */}
      <View style={styles.curvedPickerContainer}>
        <RNPickerSelect
          onValueChange={value => setSelectedCollege(value)}
          items={colleges}
          placeholder={{label: 'Select College', value: null}}
          style={pickerSelectStyles}
        />
      </View>

      {/* Vehicle Type Selection */}
      <View style={styles.vehicleTypeContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedVehicleType('Scooty');
            setSelectedVehicle(null); // Reset selected vehicle when changing type
          }}
          style={[
            styles.vehicleIconContainer,
            selectedVehicleType === 'Scooty' ? styles.selectedButton : null,
          ]}>
          <Image
            source={{uri: 'https://example.com/scooty-icon.png'}} // Replace with actual image link
            style={styles.iconImage}
          />
          <Text
            style={
              selectedVehicleType === 'Scooty'
                ? styles.selectedVehicleType
                : styles.vehicleType
            }>
            Scooty
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setSelectedVehicleType('Bike');
            setSelectedVehicle(null); // Reset selected vehicle when changing type
          }}
          style={[
            styles.vehicleIconContainer,
            selectedVehicleType === 'Bike' ? styles.selectedButton : null,
          ]}>
          <Image
            source={{uri: 'https://example.com/bike-icon.png'}} // Replace with actual image link
            style={styles.iconImage}
          />
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

      {/* Vehicle List */}
      <Text style={styles.subHeader}>Vehicles</Text>
      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicle}
        keyExtractor={item => item.id}
      />

      {/* Booking Modal */}
      {selectedVehicle && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Enter Details</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Icon name="close" size={24} color="red" />
                </TouchableOpacity>
              </View>

              {/* Vehicle Details */}
              <Text style={styles.modalVehicleName}>
                {selectedVehicle.name}
              </Text>

              {/* Quantity Dropdown */}
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={value => console.log(value)}
                  items={quantityOptions.map(qty => ({
                    label: `${qty}`,
                    value: qty,
                  }))}
                  placeholder={{label: 'Quantity', value: null}}
                  style={pickerSelectStyles}
                />
              </View>

              {/* Pickup Date & Time */}
              <TouchableOpacity
                onPress={() => setPickupPickerVisible(true)}
                style={styles.pickerContainer}>
                <Text>
                  {pickupDate
                    ? `Pickup: ${pickupDate.toLocaleString()}`
                    : 'Select Pickup Date & Time'}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isPickupPickerVisible}
                mode="datetime"
                onConfirm={handlePickupConfirm}
                onCancel={() => setPickupPickerVisible(false)}
                minimumDate={new Date()} // Cannot select past date
              />

              {/* Dropoff Date & Time */}
              <TouchableOpacity
                onPress={() => setDropoffPickerVisible(true)}
                style={styles.pickerContainer}>
                <Text>
                  {dropoffDate
                    ? `Dropoff: ${dropoffDate.toLocaleString()}`
                    : 'Select Dropoff Date & Time'}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isDropoffPickerVisible}
                mode="datetime"
                onConfirm={handleDropoffConfirm}
                onCancel={() => setDropoffPickerVisible(false)}
                minimumDate={pickupDate || new Date()} // Ensure dropoff is after pickup
              />

              <Text style={styles.modalNote}>
                You will need to show your driving license at {'\n'} the time of
                pickup.
              </Text>

              {/* Terms & Conditions */}
              <ScrollView style={styles.termsContainer}>
                <Text style={styles.termsTitle}>Terms & Conditions</Text>
                <Text style={styles.termsText}>1. Lorem Ipsum</Text>
                <Text style={styles.termsText}>2. Lorem Ipsum</Text>
                <Text style={styles.termsText}>3. Lorem Ipsum</Text>
              </ScrollView>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closeModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton}>
                  <Text style={styles.confirmButtonText}>Proceed</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDC52',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1f1f1f',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1f1f1f',
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#FFDC52',
    paddingVertical: 10,
    borderRadius: 20,
  },
  pickerContainer: {
    borderColor: '#103E60',
    borderWidth: 1.5,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  vehicleIconContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 15,
    width: 100,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  vehicleType: {
    fontSize: 18,
    color: '#000',
  },
  selectedVehicleType: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  curvedPickerContainer: {
    backgroundColor: '#FFDF63',
    borderRadius: 20,
    overflow: 'hidden',
    height: 50,
    borderColor: '#103E60',
    borderWidth: 2,
  },
  selectedButton: {
    backgroundColor: '#8F1413',
  },
  vehicleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFDF63',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderColor: '#103E60',
    borderWidth: 2,
  },
  vehicleImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  vehicleDetails: {
    marginLeft: 20,
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  vehicleRate: {
    fontSize: 16,
    color: '#FF4500',
  },
  availableText: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  notAvailableText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  bookButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#8F1413',
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFE474',
    padding: 20,
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f1f1f',
  },
  modalVehicleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#103E60',
    marginVertical: 10,
  },
  modalNote: {
    marginVertical: 10,
    color: '#8F1413',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  termsContainer: {
    marginTop: 10,
    backgroundColor: '#FFDC52',
    padding: 10,
    borderRadius: 10,
  },
  termsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#8F1413',
  },
  termsText: {
    color: '#000',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#8F1413',
    padding: 10,
    borderRadius: 10,
    borderColor: '#8F1413',
    borderWidth: 2,
  },
  cancelButtonText: {
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#8F1413',
    padding: 10,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: '#fff',
  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f0f0f0',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f0f0f0',
  },
});
