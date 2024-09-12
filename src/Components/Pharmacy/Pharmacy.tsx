import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Animated,
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
      phone: '123-456-7890',
      imageUri:
        'F:\\Qickverse\\NEw_login\\quickverse-ui\\src\\data\\images\\a1.jpg',
    },
    {
      id: '2',
      name: 'Aspirin',
      description: 'Used to reduce pain, fever, or inflammation',
      phone: '987-654-3210',
      imageUri:
        'F:\\Qickverse\\NEw_login\\quickverse-ui\\src\\data\\images\\a1.jpg',
    },
  ]);

  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    description: '',
    phone: '',
    imageUri: '',
  });

  const [isAddItemVisible, setIsAddItemVisible] = useState(false); // Hidden by default
  const animation = useRef(new Animated.Value(0)).current; // Initially set to hidden
  const rotateAnimation = useRef(new Animated.Value(0)).current; // Animation for floating button

  // Function to pick an image
  const pickImage = async () => {
    const granted = await requestStoragePermission();
    if (granted) {
      launchImageLibrary(
        {
          mediaType: 'video',
        },
        response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
          } else {
            const uri =
              response.assets && response.assets.length > 0
                ? response.assets[0].uri
                : null;
            setNewItem(prevItem => ({...prevItem, imageUri: uri}));
          }
        },
      );
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

  // Function to toggle visibility of Add Item container with animation
  const toggleAddItem = () => {
    if (isAddItemVisible) {
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setIsAddItemVisible(false));
    } else {
      setIsAddItemVisible(true);
      Animated.parallel([
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Pharmacy</Text>
      </View>

      <FlatList
        data={pharmacyData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                {item.imageUri ? (
                  <Image source={{uri: item.imageUri}} style={styles.image} />
                ) : null}
                <View style={styles.descriptionContainer}>
                  <Title>{item.name}</Title>
                  <Paragraph>{item.description}</Paragraph>
                  <Text style={styles.phoneText}>Phone: {item.phone}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />

      {/* Animated Add Item container */}
      {isAddItemVisible && (
        <Animated.View style={[styles.inputContainer, {opacity: animation}]}>
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

          {/* Buttons in the same row with spacing */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addNewItem}>
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Floating button to toggle Add Item container */}
      <Animated.View
        style={[
          styles.floatingButton,
          {transform: [{rotate: rotateInterpolate}]},
        ]}>
        <TouchableOpacity onPress={toggleAddItem}>
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFDC52',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#FFDC52',
    marginBottom: 16,
    marginHorizontal: -20,
    marginVertical: -15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#8B0000',
  },
  card: {
    backgroundColor: '#fcefb6',
    marginBottom: 15,
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  inputContainer: {
    marginTop: 20,
    backgroundColor: '#fcefb6',
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
    backgroundColor: '#FFF',
  },
  phoneText: {
    fontSize: 14,
    marginTop: 8,
    color: '#555',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4a0101',
    padding: 10,
    borderRadius: 5,
    flex: 0.48, // Adjust the width of each button
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4a0101',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Pharmacy;
