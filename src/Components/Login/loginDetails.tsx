import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAuth} from '../../utils/AuthContext';
import {Campus} from '../../utils/canonicalModel';
import {fetchCampusIds} from '../../services/fetchCampusIds';
import theme from '../../theme';
import {setCampus, setIsNewUser} from '../../utils/Storage';

export default function LoginDetails() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [dob, setDob] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState('');
  const [campusId, setCampusId] = useState('');
  const [campusList, setCampusList] = useState<Campus[]>([]);
  const [modalVisible, setModalVisible] = useState(true);
  const [campusModalVisible, setCampusModalVisible] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [campusLoading, setCampusLoading] = useState<boolean>(false);
  const auth = useAuth();
  const {setSelectedCampus} = useAuth();

  useEffect(() => {
    const loadCampusData = async () => {
      setCampusLoading(true);
      setFetchError(false);
      try {
        const campuses = await fetchCampusIds();
        setCampusList(campuses);
      } catch (error) {
        console.error('Error fetching campus data:', error);
        setFetchError(true);
      } finally {
        setCampusLoading(false);
      }
    };
    loadCampusData();
  }, []);

  const handleRetry = async () => {
    setCampusLoading(true);
    setFetchError(false);
    try {
      const campuses = await fetchCampusIds();
      setCampusList(campuses);
    } catch (error) {
      console.error('Error fetching campus data:', error);
      setFetchError(true);
    } finally {
      setCampusLoading(false);
    }
  };

  const handleCancel = () => {
    auth.signOut();
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Invalid Name', 'Name cannot be empty.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Invalid Email', 'Email cannot be empty.');
      return;
    }
    if (!dob) {
      Alert.alert('Invalid Date of Birth', 'Please select your date of birth.');
      return;
    }
    if (!campusId) {
      Alert.alert('Invalid Campus', 'Please select a campus.');
      return;
    }

    const formattedDob = dob.toISOString().split('T')[0];
    setLoading(true);
    console.log(
      'name:' +
        name +
        ' camousId:' +
        campusId +
        ' email:' +
        email +
        ' dob:' +
        formattedDob,
    );
    try {
      await auth.signUp(name, campusId, email, formattedDob);
      Alert.alert('Success', 'Your details have been submitted successfully.');
      setModalVisible(false);
      setCampus(campusId);
      setSelectedCampus(campusId);
      setIsNewUser(false);
    } catch (error) {
      console.error('Sign-up error:', error);
      Alert.alert('Error', 'Unable to submit details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Enter Details</Text>

          {/* Name Input */}
          <TextInput
            style={styles.input}
            placeholderTextColor={theme.colors.ternary}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          {/* Date of Birth Input */}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.input}>
            <Text style={{color: theme.colors.ternary, fontWeight: 'bold'}}>
              {dob ? dob.toDateString() : 'Enter your date of birth'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={showDatePicker}
              onRequestClose={() => setShowDatePicker(false)} // Handle hardware back button on Android
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowDatePicker(false)} // Close on background press
              >
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={dob || new Date()}
                    mode="date"
                    display="spinner" // iOS-friendly display
                    onChange={(event, selectedDate) => {
                      if (event.type !== 'dismissed') {
                        setDob(selectedDate || dob); // Set selected date
                      }
                    }}
                    maximumDate={new Date()}
                  />
                  <View style={styles.datePickerButtons}>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setShowDatePicker(false)} // Cancel without saving
                    >
                      <Text style={styles.datePickerButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => {
                        setShowDatePicker(false); // Close modal
                        // Finalize the selected date (already set via spinner)
                      }}>
                      <Text style={styles.datePickerButtonText}>Select</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
          )}
          {/* Email Input */}
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={theme.colors.ternary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campus Picker */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setCampusModalVisible(true)}>
            <Text style={{color: theme.colors.ternary, fontWeight: 'bold'}}>
              {campusId
                ? campusList.find(c => c.campusId === campusId)?.campusName
                : 'Select Campus'}
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={loading ? undefined : handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.secondary} />
            ) : (
              <Text style={styles.submitButtonText}>Continue</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleCancel}>
            <Text style={styles.submitButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Campus Modal */}
      <Modal
        visible={campusModalVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.smallModalContainer}>
          <View style={styles.smallModal}>
            <Text style={styles.title}>Select Campus</Text>
            {campusLoading ? (
              <ActivityIndicator size="large" color={theme.colors.secondary} />
            ) : (
              <FlatList
                data={campusList}
                keyExtractor={item => item.campusId}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.campusOption}
                    onPress={() => {
                      setCampusId(item.campusId);
                      setCampusModalVisible(false);
                    }}>
                    <Text style={styles.campusText}>{item.campusName}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
            {fetchError && (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCampusModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    alignItems: 'center',
  },
  smallModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  smallModal: {
    width: '80%',
    padding: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.ternary,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.ternary,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: theme.colors.ternary,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  datePickerContainer: {
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignItems: 'center',
    width: '80%',
  },
  datePickerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
  },
  datePickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    width: '70%',
    paddingVertical: 15,
    backgroundColor: theme.colors.ternary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  submitButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  campusOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  campusText: {
    fontSize: 16,
    color: theme.colors.ternary,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.secondary,
    fontSize: 16,
  },
});
