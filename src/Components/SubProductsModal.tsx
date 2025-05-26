// import SubProductModal from '../SubProductsModal';
// import brownie1 from '../../data/images/promo_logo.png';
// import brownie2 from '../../data/images/promo_logo.png';

// const [modalVisible2, setModalVisible2] = useState(false);
// <SubProductModal
//   visible={modalVisible2}
//   onClose={() => setModalVisible2(false)}
//   title="Brownie Fantasy"
//   units={[
//     {
//       id: '1',
//       label: '1 scoop',
//       volume: '250ml',
//       price: 79,
//       discountedPrice: 69,
//       image: brownie1,
//     },
//     {
//       id: '2',
//       label: '2 scoops',
//       volume: '500ml',
//       price: 79,
//       discountedPrice: 69,
//       image: brownie2,
//     },
//   ]}
//   onAdd={id => console.log('Add unit:', id)}
// />

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

const {width} = Dimensions.get('window');

interface Unit {
  id: string;
  label: string;
  volume: string;
  price: number;
  discountedPrice: number;
  image: any; // Replace with ImageSourcePropType if using static assets
}

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  units: SubProductModalUnit[]; // Use the new type
  onAdd: (unitId: string) => void; // unitId of the SubProductModalUnit
  isLoading?: boolean; // New prop for loading state
  error?: string | null; // New prop for error state
}

const SubProductModal: React.FC<Props> = ({
  visible,
  onClose,
  title,
  units,
  onAdd,
  isLoading, // Destructure new props
  error,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderContainerModal}>
          <ActivityIndicator size="large" color="#FFC107" />
          <Text style={styles.loadingTextModal}>Loading options...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.errorContainerModal}>
          <Text style={styles.errorTextModal}>Error: {error}</Text>
          <Text style={styles.errorTextModal}>Please try again.</Text>
          {/* Optionally add a retry button that calls a refetch passed via props */}
        </View>
      );
    }
    if (units.length === 0) {
      return (
        <View style={styles.loaderContainerModal}>
          <Text style={styles.loadingTextModal}>
            No options available for this product.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={units}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => (
          <View style={styles.unitRow}>
            <Image
              source={
                typeof item.image === 'string' ? {uri: item.image} : item.image
              }
              style={styles.unitImage}
            />
            <View style={styles.unitInfo}>
              <Text style={styles.unitLabel}>
                {item.label} {item.volume ? `(${item.volume})` : ''}
              </Text>
              <View style={styles.priceRow}>
                {item.discountedPrice && item.discountedPrice < item.price ? (
                  <>
                    <Text style={styles.strike}>₹{item.price}</Text>
                    <Text style={styles.discounted}>
                      {' '}
                      ₹{item.discountedPrice}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.discounted}>₹{item.price}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onAdd(item.id)}>
              <Text style={styles.addText}>ADD +</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
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
          <Text style={styles.subtitle}>SELECT UNIT</Text>
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};

export default SubProductModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000099',
  },
  sheet: {
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
    maxHeight: '70%',
  },
  closeButton: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
  },
  closeIcon: {
    backgroundColor: '#2f3a4b',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconText: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#2f3a4b',
    paddingBottom: 6,
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
  },
  unitInfo: {
    flex: 1,
  },
  unitLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strike: {
    color: '#999',
    textDecorationLine: 'line-through',
    fontSize: 13,
    marginRight: 6,
  },
  discounted: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#FFC107',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addText: {
    color: '#FFC107',
    fontWeight: '600',
    fontSize: 13,
  },

  // neww
  loaderContainerModal: {
    // New style
    minHeight: 150, // Give some height for the loader/message
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingTextModal: {
    // New style
    marginTop: 10,
    color: '#fff',
    fontSize: 14,
  },
  errorContainerModal: {
    // New style
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTextModal: {
    // New style
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  // Make sure other styles (overlay, sheet, unitRow etc.) are appropriate
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
  title: {fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 8},
  subtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#2f3a4b',
    paddingBottom: 6,
  },
  unitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2f3a4b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  unitImage: {width: 48, height: 48, borderRadius: 8, marginRight: 12},
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addText: {color: '#FFC107', fontWeight: '600', fontSize: 13},
});
