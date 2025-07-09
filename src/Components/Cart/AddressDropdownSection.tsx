import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Import styles and theme from PaymentSummaryScreen
import { styles } from './PaymentSummaryScreen';
import theme from '../../theme';
import { ApiAddress } from '../../services/userAddressSlice';

interface AddressDropdownSectionProps {
  addresses: ApiAddress[];
  loadingList: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAddAddress: () => void;
  renderAddressItem: ({ item }: { item: ApiAddress }) => JSX.Element;
}

const AddressDropdownSection: React.FC<AddressDropdownSectionProps> = ({
  addresses,
  loadingList,
  isExpanded,
  onToggleExpand,
  onAddAddress,
  renderAddressItem,
}) => (
  <View style={styles.addressSection}>
    <View style={styles.addressDropdownHeader}>
      <Text style={styles.sectionTitle}>
        Available Addresses ({addresses.length})
      </Text>
      <View style={styles.addressHeaderActions}>
       
          <TouchableOpacity
            onPress={onToggleExpand}
            activeOpacity={0.7}
            style={styles.dropdownIconButton}>
            <MaterialIcons
              name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={28}
              color={theme.colors.secondary}
            />
          </TouchableOpacity>
       
      </View>
    </View>
    {isExpanded && (
      <>
        {loadingList ? (
          <ActivityIndicator size="small" color={theme.colors.secondary} />
        ) : addresses.length > 0 ? (
          <FlatList
            data={addresses}
            renderItem={renderAddressItem}
            keyExtractor={item => item.addressID}
            scrollEnabled={false}
            style={styles.addressList}
            contentContainerStyle={{ paddingBottom: 10 }}
          />
        ) : (
          <Text style={styles.noAddressText}>No addresses found. Please add one.</Text>
        )}
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={styles.addAddressHeaderButton}
            onPress={onAddAddress}
            activeOpacity={0.7}>
            <MaterialIcons
              name="add"
              size={22}
              color={theme.colors.secondary}
            />
            <Text style={styles.addAddressHeaderButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </>
    )}
  </View>
);

export default AddressDropdownSection; 