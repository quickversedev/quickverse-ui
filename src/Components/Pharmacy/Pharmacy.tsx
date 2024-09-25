import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import SelectedAddress from '../Laundry/CartModel/SelectedAddress';
import AddressList from '../Laundry/Address/AddressList';
import {Address} from '../../utils/canonicalModel';

const s3Options = {
  keyPrefix: 'uploads/',
  bucket: 'p1images',
  region: 'eu-north-1',
  accessKey: 'your-access-key', // Replace with your accessKey
  secretKey: 'your-secret-key', // Replace with your secretKey
  successActionStatus: 201,
};

const PharmacyScreen = () => {
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const selectImageFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImages([...images, response.assets[0].uri ?? '']);
      }
      setShowNotification(false);
    });
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImages([...images, response.assets[0].uri ?? '']);
      }
      setShowNotification(false);
    });
  };

  const removeImage = (uri: string) => {
    setImages(images.filter(imageUri => imageUri !== uri));
  };

  const uploadFileToS3 = async (fileUri: string) => {
    const fileName = fileUri.split('/').pop() || 'default_filename';
    const fileType = fileName.split('.').pop();

    const file = {
      uri: fileUri,
      name: fileName,
      type: `image/${fileType}`,
    };

    try {
      setIsLoading(true);
      const response = await RNS3.put(file as any, s3Options);

      if (response.status === 201) {
        console.log('File uploaded successfully', response);
        const responseBody = (response as any).body;
        return responseBody;
      } else {
        console.log('Failed to upload file', response);
        throw new Error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file to S3', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (images.length === 0 || !description.trim() || !selectedAddress) {
      Alert.alert(
        'Error',
        'Please upload at least one image, add a description, and select an address.',
      );
      return;
    }

    try {
      for (const image of images) {
        await uploadFileToS3(image);
      }

      Alert.alert(
        'Success',
        'Images, description, and address submitted successfully!',
      );
      setImages([]);
      setDescription('');
      setSelectedAddress(null);
    } catch (error) {
      Alert.alert('Error', 'File upload failed.');
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const removeSelectedAddress = () => {
    setSelectedAddress(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Drop Shadow */}
      <View style={styles.headerContainer}>
        <Text style={styles.pharmacyHeader}>Pharmacy</Text>
      </View>

      <Text style={styles.title}>Upload Prescription</Text>

      <View style={styles.uploadSection}>
        {/* Images are arranged horizontally */}
        <ScrollView horizontal>
          {images.map((imageUri, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{uri: imageUri}} style={styles.image} />
              <Pressable
                style={styles.removeButton}
                onPress={() => removeImage(imageUri)}>
                <Text style={styles.removeButtonText}>x</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        <Pressable
          style={styles.uploadBox}
          onPress={() => setShowNotification(true)}>
          <Image
            source={{
              uri: 'https://img.icons8.com/material-rounded/24/000000/image.png',
            }}
            style={styles.uploadIcon}
          />
          <Text style={styles.uploadText}>Select or Add More Images</Text>
        </Pressable>
      </View>

      {/* Description Box with Reduced Height */}
      <TextInput
        style={styles.textInput}
        placeholder="Add a description..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {selectedAddress ? (
        <View style={styles.selectedAddressContainer}>
          <SelectedAddress
            selectedAddress={selectedAddress}
            onChangeAddress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <Pressable
            style={styles.removeAddressButton}
            onPress={removeSelectedAddress}>
            <Text style={styles.removeAddressButtonText}>Remove Address</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={styles.addressButton}
          onPress={() => setShowAddressModal(true)}>
          <Text style={styles.buttonText}>Select Address</Text>
        </Pressable>
      )}

      <Pressable
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Text>
        {isLoading && <ActivityIndicator size="small" color="#fff" />}
      </Pressable>

      {/* Notification for Image Selection */}
      {showNotification && (
        <View style={styles.notificationContainer}>
          <Pressable style={styles.notificationButton} onPress={takePhoto}>
            <Text style={styles.notificationButtonText}>Take a Photo</Text>
          </Pressable>
          <Pressable
            style={styles.notificationButton}
            onPress={selectImageFromGallery}>
            <Text style={styles.notificationButtonText}>
              Select from Gallery
            </Text>
          </Pressable>
          <Pressable
            style={styles.notificationButton}
            onPress={() => setShowNotification(false)}>
            <Text style={styles.notificationButtonText}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {/* Address List Modal */}
      <Modal
        visible={showAddressModal}
        animationType="slide"
        onRequestClose={() => setShowAddressModal(false)}>
        <View style={styles.fullScreenModal}>
          <AddressList
            onAddressSelect={handleAddressSelect}
            onBack={() => setShowAddressModal(false)}
          />
          <Pressable
            style={styles.closeButton}
            onPress={() => setShowAddressModal(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFDC52',
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  headerContainer: {
    backgroundColor: '#FFDC52',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: -30,
    marginHorizontal: -20,
    elevation: 5,
    marginBottom: 20, // Added space to separate the header
  },
  pharmacyHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000080',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000080',
  },
  uploadSection: {
    marginBottom: 0,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#800000',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadBox: {
    borderColor: '#00BFA6',
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginBottom: 20,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    color: '#999',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fcf4d4',
    height: 60, // Reduced height
  },
  selectedAddressContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fcf4d4',
    marginBottom: 20,
  },
  removeAddressButton: {
    backgroundColor: '#800000',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  removeAddressButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#800000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationContainer: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: '#fcf4d4',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationButton: {
    backgroundColor: '#800000',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  notificationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PharmacyScreen;
