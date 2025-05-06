import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const COLORS = {
  backgroundPrimary: '#FAEA7B', // Main yellow background
  backgroundSecondary: '#FFF9E6', // Lighter yellow for inputs/cards
  textPrimary: '#4A4A4A', // Dark grey/brown text
  textSecondary: '#757575', // Lighter grey text
  buttonBackground: '#8F1413', // Dark red button
  buttonText: '#FFFFFF', // White button text
  border: '#E0B84C', // Darker yellow border
  iconDefault: '#4A4A4A',
  iconLight: '#757575',
  mapPlaceholder: '#E0E0E0', // Grey for map placeholder
};

// Interface for Address Details state
interface AddressDetailsState {
  houseNo: string;
  floor: string;
  towerBlock: string;
  landmark: string;
}

const AddressScreen: React.FC = () => {
  // State to toggle between map view and address form view
  const [isAddingDetails, setIsAddingDetails] = useState(false);

  // State for the address form inputs
  const [addressDetails, setAddressDetails] = useState<AddressDetailsState>({
    houseNo: '',
    floor: '',
    towerBlock: '',
    landmark: '',
  });

  // Handler for input changes
  const handleInputChange = (
    name: keyof AddressDetailsState,
    value: string,
  ) => {
    setAddressDetails(prev => ({...prev, [name]: value}));
  };

  // Handler for the main action button press
  const handleActionPress = () => {
    if (isAddingDetails) {
      // Logic to save address details
      console.log('Saving Address:', addressDetails);
      // TODO: Implement actual saving logic
      // Potentially navigate back or show success message
    } else {
      // Switch to the address details form
      setIsAddingDetails(true);
    }
  };

  // Handler for the back button
  const handleBackPress = () => {
    console.log('Back pressed');
    // TODO: Implement navigation logic (e.g., navigation.goBack())
  };

  // Handler for the close button on the cards
  const handleCloseCard = () => {
    if (isAddingDetails) {
      setIsAddingDetails(false); // Go back to the map view / delivering to card
    } else {
      // Handle close on "Delivering to" card if needed (e.g., clear selection)
      console.log("Close 'Delivering To' pressed");
      // TODO: Implement logic if needed (e.g., clear selected address)
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.backgroundPrimary}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Icon name="arrow-back" size={26} color={COLORS.iconDefault} />
          </TouchableOpacity>
          {/* Ensure headerTitle is wrapped in Text */}
          <Text style={styles.headerTitle}>Confirm Delivery Address</Text>
          {/* Spacer view to help center the title */}
          <View style={styles.backButton} />
        </View>

        {/* --- Search Bar --- */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Location"
            placeholderTextColor={COLORS.textSecondary}
            style={styles.searchInput}
          />
          <Icon
            name="search"
            size={22}
            color={COLORS.iconDefault}
            style={styles.searchIcon}
          />
        </View>

        {/* --- Map Area (Placeholder) --- */}
        <View style={styles.mapContainer}>
          {/* === IMPORTANT: Replace this View with your actual Map component === */}
          {/* Example: <MapView style={StyleSheet.absoluteFillObject} ... /> */}
          <View style={styles.mapPlaceholder}>
            {/* Ensure placeholder text is wrapped */}
            <Text style={styles.mapPlaceholderText}>Map View Placeholder</Text>
          </View>
          {/* === End Map Component Replacement === */}

          {/* Conditional rendering of the Address Details Form OVER the map */}
          {isAddingDetails && (
            <ScrollView
              style={[styles.cardBase, styles.addressFormCard]} // Styles for the sliding card
              contentContainerStyle={styles.scrollViewContent} // Inner padding for scroll content
              showsVerticalScrollIndicator={false} // Hide scroll bar if desired
            >
              <View style={styles.cardHeader}>
                {/* Ensure card title is wrapped */}
                <Text style={styles.cardTitle}>Address Details</Text>
                <TouchableOpacity
                  onPress={handleCloseCard}
                  style={styles.closeButton}>
                  <Icon
                    name="close-circle"
                    size={24}
                    color={COLORS.iconDefault}
                  />
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <View style={styles.formField}>
                {/* Ensure label is wrapped */}
                <Text style={styles.label}>House No:</Text>
                <TextInput
                  placeholder="House No."
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                  value={addressDetails.houseNo}
                  onChangeText={value => handleInputChange('houseNo', value)}
                />
              </View>
              <View style={styles.formField}>
                {/* Ensure label is wrapped */}
                <Text style={styles.label}>Floor:</Text>
                <TextInput
                  placeholder="Floor"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                  value={addressDetails.floor}
                  onChangeText={value => handleInputChange('floor', value)}
                />
              </View>
              <View style={styles.formField}>
                {/* Ensure label is wrapped */}
                <Text style={styles.label}>Tower / Block:</Text>
                <TextInput
                  placeholder="Tower / Block"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                  value={addressDetails.towerBlock}
                  onChangeText={value => handleInputChange('towerBlock', value)}
                />
              </View>
              <View style={styles.formField}>
                {/* Ensure label is wrapped */}
                <Text style={styles.label}>Landmark:</Text>
                <TextInput
                  placeholder="Landmark"
                  placeholderTextColor={COLORS.textSecondary}
                  style={styles.input}
                  value={addressDetails.landmark}
                  onChangeText={value => handleInputChange('landmark', value)}
                />
              </View>
            </ScrollView>
          )}
        </View>

        {/* --- Bottom Section (Conditional) --- */}
        {/* Show "Delivering To" card only when NOT adding details */}
        {!isAddingDetails && (
          <View style={[styles.cardBase, styles.deliveringToCard]}>
            <View style={styles.cardHeader}>
              {/* Ensure card title is wrapped */}
              <Text style={styles.cardTitle}>Delivering to</Text>
              <TouchableOpacity
                onPress={handleCloseCard}
                style={styles.closeButton}>
                <Icon
                  name="close-circle"
                  size={24}
                  color={COLORS.iconDefault}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.addressRow}>
              {/* Ensure address text is wrapped */}
              <Text style={styles.addressText}>
                23, MG Road, Indiranagar, Bengaluru, Karnataka
              </Text>
              <TouchableOpacity onPress={() => console.log('Change address')}>
                {/* Ensure button text is wrapped */}
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* --- Action Button (Text changes based on state) --- */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleActionPress}>
          {/* Ensure button text is wrapped */}
          <Text style={styles.actionButtonText}>
            {isAddingDetails ? 'Save Address Details' : 'Add Address Details'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- Styles --- (Copied from previous correct version)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.backgroundPrimary,
  },
  backButton: {
    padding: 5, // Increase touchable area
    width: 36, // Helps balance the title centering with the spacer view
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  searchIcon: {
    marginLeft: 10,
  },
  mapContainer: {
    flex: 1, // Takes up remaining space above the bottom card/button
    backgroundColor: COLORS.mapPlaceholder, // Background for the area
    position: 'relative', // Needed for absolute positioning of the form card overlay
  },
  mapPlaceholder: {
    // Style for the placeholder View
    ...StyleSheet.absoluteFillObject, // Make it fill the mapContainer
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.mapPlaceholder, // Can be same or different
  },
  mapPlaceholderText: {
    // Style for the text inside the placeholder
    color: COLORS.textSecondary,
    fontSize: 16,
  },
  cardBase: {
    // Common styles for bottom cards
    backgroundColor: COLORS.backgroundSecondary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderBottomWidth: 0, // No bottom border as it blends into the button area
    padding: 15,
  },
  deliveringToCard: {
    marginHorizontal: 15,
    marginBottom: 0,
  },
  addressFormCard: {
    // Specific styles for the Address Form overlay
    position: 'absolute', // Position it over the mapContainer
    bottom: 0, // Anchor to the bottom
    left: 0, // Stretch left
    right: 0, // Stretch right
    maxHeight: '70%', // Limit how much screen it takes (adjust as needed)
    marginHorizontal: 0, // No horizontal margin, spans full width
    // Inherits common styles from cardBase
    // Optional: Add elevation/shadow for visual separation
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollViewContent: {
    // Style for the content inside the ScrollView
    paddingBottom: 20, // Add space at the bottom inside the scrollable area
  },
  cardHeader: {
    // Style for the header row within cards
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    // Style for the title text in cards
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  closeButton: {
    // Style for the close icon touchable area
    padding: 5, // Increase touchable area
  },
  addressRow: {
    // Style for the row showing the address and 'Change' button
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to top in case text wraps
  },
  addressText: {
    // Style for the address text itself
    flex: 1, // Allow text to take available space and wrap
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
    marginRight: 10, // Space before 'Change' button
  },
  changeButtonText: {
    // Style for the 'Change' text button
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.buttonBackground, // Use button color for emphasis
  },
  formField: {
    // Style for each label + input group in the form
    marginBottom: 15,
  },
  label: {
    // Style for the text labels above inputs
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  input: {
    // Style for the text input fields
    backgroundColor: COLORS.backgroundPrimary, // Slightly different yellow
    borderRadius: 10,
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12, // Adjust padding for platform consistency
    fontSize: 15,
    color: COLORS.textPrimary,
    minHeight: 50, // Ensure a minimum height
  },
  actionButton: {
    // Style for the main bottom action button
    backgroundColor: COLORS.buttonBackground,
    borderRadius: 15,
    paddingVertical: 18,
    marginHorizontal: 15,
    marginVertical: 10, // Space above/below button
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50, // Ensure a minimum height
  },
  actionButtonText: {
    // Style for the text inside the action button
    color: COLORS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddressScreen;
