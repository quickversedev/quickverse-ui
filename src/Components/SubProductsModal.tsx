import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import {SubProductModalUnit} from '../../src/utils/canonicalModel'; // Import the unit type
import {ActivityIndicator} from 'react-native';

const {width} = Dimensions.get('window');

// SubProductModalUnit should align with what subProductModalUnits in Categories.tsx creates
// which is based on the mapped ApiVariant from subProductSlice
// import {SubProductModalUnit, ApiVariant} from '../../src/utils/canonicalModel'; // Or wherever ApiVariant is

// ... (Dimensions, styles - assume they are largely the same, adjust if needed)

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  units: SubProductModalUnit[]; // This unit should have id, label, price, image, originalSubProduct (which is ApiVariant)
  onAdd: (unitId: string, quantity: number) => void; // unitId of the selected variant, and quantity
  isLoading?: boolean;
  error?: string | null;
}

const SubProductModal: React.FC<Props> = ({
  visible,
  onClose,
  title,
  units,
  onAdd,
  isLoading,
  error,
}) => {
  const renderContent = () => {
    if (isLoading) {
      /* ... loader ... */
    }
    if (error) {
      /* ... error message ... */
    }
    if (units.length === 0 && !isLoading) {
      // Added !isLoading condition
      return (
        <View style={styles.loaderContainerModal}>
          <Text style={styles.loadingTextModal}>
            No specific options available for this product.
            {'\n'}If this product is sold as a single unit, please add it
            directly from the product list.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={units}
        keyExtractor={item => item.id} // item.id is now the variant's productId
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => {
          // item is a SubProductModalUnit, item.originalSubProduct is the ApiVariant
          const variant = item.originalSubProduct as ApiVariant; // Cast for clarity
          const displayPrice =
            parseFloat(variant.productSalePrice as any) ||
            parseFloat(variant.productPrice as any) ||
            0;
          const originalPrice = parseFloat(variant.productPrice as any) || 0;
          const onSale = displayPrice < originalPrice;

          return (
            <View style={styles.unitRow}>
              <Image
                source={
                  typeof variant.productImageLink === 'string'
                    ? {uri: variant.productImageLink}
                    : require('../../src/data/images/campus_logo.png') /* Fallback */
                }
                style={styles.unitImage}
              />
              <View style={styles.unitInfo}>
                <Text style={styles.unitLabel} numberOfLines={2}>
                  {/* Use item.label which was derived in the slice/Categories.tsx.
                      This should be the distinguishing factor like "Half" or "Full" if available.
                      If not, title might be repetitive.
                  */}
                  {item.label || variant.title}
                  {item.volume ? ` (${item.volume})` : ''}{' '}
                  {/* If SubProductModalUnit has volume */}
                </Text>
                <View style={styles.priceRow}>
                  {onSale && originalPrice > 0 && (
                    <Text style={styles.strike}>
                      ₹{originalPrice.toFixed(2)}
                    </Text>
                  )}
                  <Text style={styles.discounted}>
                    ₹{displayPrice.toFixed(2)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => onAdd(item.id, 1)} // Pass variant.productId (which is item.id) and quantity 1
              >
                <Text style={styles.addText}>ADD +</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      {/* ... Modal structure (overlay, sheet, close button, title, subtitle) same as before ... */}
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheet}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeIcon}>
              <Text style={styles.closeIconText}>✕</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>SELECT OPTION</Text>
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};

// Styles (from your code, ensure loaderContainerModal, loadingTextModal, etc. are defined)
const styles = StyleSheet.create({
  /* ... Your existing styles ... */
  overlay: {flex: 1, justifyContent: 'flex-end'},
  backdrop: {flex: 1, backgroundColor: '#00000099'},
  sheet: {
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
    maxHeight: '70%',
  },
  closeButton: {position: 'absolute', top: -60, alignSelf: 'center'},
  closeIcon: {
    backgroundColor: '#2f3a4b',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {fontSize: 20, color: '#fff'},
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#2f3a4b',
    paddingBottom: 6,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2f3a4b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  unitImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#444',
  }, // Added bg color
  unitInfo: {flex: 1},
  unitLabel: {color: '#fff', fontSize: 14, fontWeight: '500', marginBottom: 4},
  priceRow: {flexDirection: 'row', alignItems: 'center'},
  strike: {
    color: '#999',
    textDecorationLine: 'line-through',
    fontSize: 13,
    marginRight: 6,
  },
  discounted: {color: '#fff', fontWeight: '600', fontSize: 14},
  addButton: {
    borderWidth: 1,
    borderColor: '#FFC107',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  addText: {color: '#FFC107', fontWeight: '600', fontSize: 13},
  loaderContainerModal: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingTextModal: {
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainerModal: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTextModal: {color: 'red', fontSize: 14, textAlign: 'center'},
});

export default SubProductModal;
