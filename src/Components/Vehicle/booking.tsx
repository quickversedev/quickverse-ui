/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles, pickerSelectStyles} from '../Vehicle/V_styles';
import {vehiclesData, Vehicle} from '../../data/vehicle';

export default function App() {
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

      <View style={styles.vehicleTypeContainer}>
        <TouchableOpacity
          onPress={() => {
            setSelectedVehicleType('Scooty');
            setSelectedVehicle(null);
          }}
          style={[
            styles.vehicleIconContainer,
            selectedVehicleType === 'Scooty' && styles.selectedButton,
          ]}>
          <Image
            source={{
              uri: 'https://en.wikipedia.org/wiki/Motorcycle#/media/File:NSU_Lambretta,_150_cm%C2%B3,_6_PS,_Bj._1955_(2018-06-03_Sp_sw_qu).JPG',
            }}
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
            setSelectedVehicle(null);
          }}
          style={[
            styles.vehicleIconContainer,
            selectedVehicleType === 'Bike' && styles.selectedButton,
          ]}>
          <Image
            source={{uri: 'https://example.com/bike-icon.png'}}
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

      <Text style={styles.subHeader}>Vehicles</Text>
      <FlatList
        data={filteredVehicles}
        renderItem={renderVehicle}
        keyExtractor={item => item.id}
      />

      {selectedVehicle && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Enter Details</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Icon name="close" size={24} color="#8F1413" />
                </TouchableOpacity>
              </View>

              <Text style={styles.modalVehicleName}>
                {selectedVehicle.name}
              </Text>

              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  onValueChange={value => console.log(value)}
                  items={quantityOptions.map(qty => ({
                    label: `${qty}`,
                    value: qty,
                  }))}
                  placeholder={{label: 'Quantity', value: null, color: 'Black'}}
                  style={pickerSelectStyles}
                />
              </View>

              <TouchableOpacity
                onPress={() => setPickupPickerVisible(true)}
                style={styles.pickerContainer}>
                <Text style={{color: '#000'}}>
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
                minimumDate={new Date()}
              />

              <TouchableOpacity
                onPress={() => setDropoffPickerVisible(true)}
                style={styles.pickerContainer}>
                <Text style={{color: '#000'}}>
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
                minimumDate={pickupDate || new Date()}
              />

              <Text style={styles.modalNote}>
                You will need to show your driving license at {'\n'} the time of
                pickup.
              </Text>

              {/* Terms & Conditions */}
              <ScrollView style={styles.termsContainer}>
                <Text style={styles.termsTitle}>Terms & Conditions</Text>
                <Text style={styles.termsText}>
                  1. Late returns incur extra fees.
                </Text>
                <Text style={styles.termsText}>2. Must be 18 or older.</Text>
                <Text style={styles.termsText}>
                  3. Renter responsible for bike damage.
                </Text>
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
