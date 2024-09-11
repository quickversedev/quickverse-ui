import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, Platform} from 'react-native';

const Pharmacy: React.FC = () => {
  const [pharmacyData, setPharmacyData] = useState([
    {
      id: '1',
      name: 'Paracetamol',
      description: 'Pain relief and fever reducer',
    },
    {
      id: '2',
      name: 'Aspirin',
      description: 'Used to reduce pain, fever, or inflammation',
    },
  ]);

  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    description: '',
    phone: '',
    imageUri: '',
  });

  // Function to pick an image
  const pickImage = async () => {
    const granted = await requestStoragePermission();
    if (granted) {
      launchImageLibrary({}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const uri =
            response.assets && response.assets.length > 0
              ? response.assets[0].uri
              : null;
          setNewItem(prevItem => ({...prevItem, imageUri: uri}));
        }
      });
    } else {
      Alert.alert(
        'Permission denied',
        'Storage permission is required to upload an image.',
      );
    }
  };

  // Request storage permission on Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to upload photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  // Function to add a new pharmacy item
  const addNewItem = () => {
    if (newItem.name && newItem.description && newItem.phone) {
      setPharmacyData(prevData => [
        ...prevData,
        {...newItem, id: (pharmacyData.length + 1).toString()},
      ]);
      setNewItem({id: '', name: '', description: '', phone: '', imageUri: ''});
    } else {
      Alert.alert('Error', 'Please fill in all the details');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pharmacy</Text>
      <FlatList
        data={pharmacyData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>{item.name}</Title>
              <Paragraph>{item.description}</Paragraph>
              {item.imageUri ? (
                <Image source={{uri: item.imageUri}} style={styles.image} />
              ) : null}
            </Card.Content>
          </Card>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Medicine Name"
          style={styles.input}
          value={newItem.name}
          onChangeText={text =>
            setNewItem(prevItem => ({...prevItem, name: text}))
          }
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={newItem.description}
          onChangeText={text =>
            setNewItem(prevItem => ({...prevItem, description: text}))
          }
        />
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={newItem.phone}
          onChangeText={text =>
            setNewItem(prevItem => ({...prevItem, phone: text}))
          }
        />

        <Button title="Pick an Image" onPress={pickImage} />
        <Button title="Add Item" onPress={addNewItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFDC52', // Light gray background for the whole screen
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#8B0000', // Dark red heading color to match the design
  },
  card: {
    backgroundColor: '#FFD700', // Yellow background for each card
    marginBottom: 10,
    padding: 10,
    borderRadius: 20, // Rounded corners
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Shadow for Android
  },
  inputContainer: {
    marginTop: 20,
    backgroundColor: '#FFD700', // Yellow background for the input section
    padding: 16,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFF', // White background for inputs
  },
  image: {
    width: 50, // Smaller image size to fit into the card design
    height: 50,
    marginTop: 10,
    borderRadius: 8, // Rounded image
  },
});

export default Pharmacy;
