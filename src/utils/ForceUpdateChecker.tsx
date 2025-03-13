import React, {useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import theme from '../theme';

import useFetchUpdateData from '../services/InitialConfigs';

// import useFetchUpdateData from '../hooks/useFetchUpdateData'; // Import the custom hook

const ForceUpdateChecker: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [isUpdateRequired, setIsUpdateRequired] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Use the custom hook to fetch update data
  const {updateData, loading, error, retry} = useFetchUpdateData();

  useEffect(() => {
    if (!loading && !error) {
      checkForUpdate();
    }
  }, [loading, error]);

  const checkForUpdate = async () => {
    try {
      const currentVersion = DeviceInfo.getVersion();

      // Compare versions
      if (currentVersion < updateData.min_required_version) {
        setIsUpdateRequired(true);
        setIsModalVisible(true);
      }
    } catch (err) {
      console.error('Error checking for updates:', err);
    }
  };

  const handleUpdate = () => {
    const storeUrl =
      Platform.OS === 'ios' ? updateData.ios_url : updateData.android_url;
    Linking.openURL(storeUrl);
  };

  // if (loading) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.errorText}>Failed to fetch update data.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={retry}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!isUpdateRequired) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <View style={styles.smallModalContainer}>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>Update Required</Text>
              <Text style={styles.message}>
                A new version of the app is available. Please update to continue
                using the app.
              </Text>
              <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};

export default ForceUpdateChecker;

// Styles for the custom modal and retry button
const styles = StyleSheet.create({
  smallModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
