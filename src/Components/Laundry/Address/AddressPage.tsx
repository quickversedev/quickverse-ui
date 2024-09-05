// components/AddressForm.tsx

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import theme from '../../../theme';
import {Address} from '../../../utils/canonicalModel';
import uuid from 'react-native-uuid';
import {addAddress} from '../../../services/addressSclice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';

interface AddressFormProps {
  onBack: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({onBack}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [hostelName, setHostelName] = useState('');
  const [address, setAddress] = useState('');
  const [howToReach, setHowToReach] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    roomNumber: '',
    floor: '',
    hostelName: '',
    address: '',
  });

  const dispatch = useDispatch<AppDispatch>();

  const validateFields = () => {
    const newErrors: typeof errors = {
      name: '',
      phone: '',
      roomNumber: '',
      floor: '',
      hostelName: '',
      address: '',
    };

    if (!name) {
      newErrors.name = 'Name is required';
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!roomNumber) {
      newErrors.roomNumber = 'Room number is required';
    }
    if (!floor) {
      newErrors.floor = 'Floor is required';
    }
    if (!hostelName) {
      newErrors.hostelName = 'Hostel name is required';
    }
    if (!address) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      return;
    }

    const keyId = uuid.v4().toString();
    const concatenatedAddress = `Room Number:${roomNumber}, Floor:${floor}, Address: ${address}, Hostel: ${hostelName}, How to Reach: ${howToReach}`;

    const newAddress: Address = {
      keyId,
      address: {
        name,
        phone,
        concatenatedAddress,
      },
    };

    dispatch(addAddress(newAddress));
    onBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Button title="Back" onPress={onBack} />
          <Text style={styles.title}>Address Details</Text>
        </View>
        <TextInput
          style={[styles.input, errors.name && styles.errorInput]}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          keyboardType="default"
        />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
        <TextInput
          style={[styles.input, errors.phone && styles.errorInput]}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}
        <TextInput
          style={[styles.input, errors.roomNumber && styles.errorInput]}
          placeholder="Room Number"
          value={roomNumber}
          onChangeText={setRoomNumber}
          keyboardType="numeric"
        />
        {errors.roomNumber ? (
          <Text style={styles.errorText}>{errors.roomNumber}</Text>
        ) : null}
        <TextInput
          style={[styles.input, errors.floor && styles.errorInput]}
          placeholder="Floor"
          value={floor}
          onChangeText={setFloor}
          keyboardType="numeric"
        />
        {errors.floor ? (
          <Text style={styles.errorText}>{errors.floor}</Text>
        ) : null}
        <TextInput
          style={[styles.input, errors.hostelName && styles.errorInput]}
          placeholder="Hostel Name"
          value={hostelName}
          onChangeText={setHostelName}
          keyboardType="default"
        />
        {errors.hostelName ? (
          <Text style={styles.errorText}>{errors.hostelName}</Text>
        ) : null}
        <TextInput
          style={[styles.input, errors.address && styles.errorInput]}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          keyboardType="default"
        />
        {errors.address ? (
          <Text style={styles.errorText}>{errors.address}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="How to Reach (Optional)"
          value={howToReach}
          onChangeText={setHowToReach}
          keyboardType="default"
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddressForm;
