import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardTypeOptions,
} from 'react-native';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {addAddress} from '../../../services/addressSclice';
import {AppDispatch} from '../../../store/store';
import theme from '../../../theme';

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
    const concatenatedAddress = `Room Number: ${roomNumber}, Floor: ${floor}, Address: ${address}, Hostel: ${hostelName}, How to Reach: ${howToReach}`;

    dispatch(
      addAddress({
        keyId,
        address: {
          name,
          phone,
          concatenatedAddress,
        },
      }),
    );

    onBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.formContainer}>
        {[
          {label: 'Name', value: name, setter: setName, error: errors.name},
          {
            label: 'Phone Number',
            value: phone,
            setter: setPhone,
            error: errors.phone,
            keyboardType: 'phone-pad',
          },
          {
            label: 'Room Number',
            value: roomNumber,
            setter: setRoomNumber,
            error: errors.roomNumber,
            keyboardType: 'numeric',
          },
          {
            label: 'Floor',
            value: floor,
            setter: setFloor,
            error: errors.floor,
            keyboardType: 'numeric',
          },
          {
            label: 'Hostel Name',
            value: hostelName,
            setter: setHostelName,
            error: errors.hostelName,
          },
          {
            label: 'Address',
            value: address,
            setter: setAddress,
            error: errors.address,
          },
          {
            label: 'How to Reach (Optional)',
            value: howToReach,
            setter: setHowToReach,
          },
        ].map(({label, value, setter, error, keyboardType}, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={[styles.input, error ? styles.errorInput : null]}
              placeholder={label}
              value={value}
              onChangeText={setter}
              keyboardType={(keyboardType as KeyboardTypeOptions) || 'default'}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: theme.colors.secondary,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
    marginBottom: 6,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontWeight: 'bold',
    fontSize: 18,
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
