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
  units: Unit[];
  onAdd: (unitId: string) => void;
}

const SubProductModal: React.FC<Props> = ({
  visible,
  onClose,
  title,
  units,
  onAdd,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.sheet}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeIcon}>
              <Text style={styles.closeIconText}>✕</Text>
            </View>
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>SELECT UNIT</Text>

          <FlatList
            data={units}
            keyExtractor={item => item.id}
            contentContainerStyle={{paddingBottom: 20}}
            renderItem={({item}) => (
              <View style={styles.unitRow}>
                <Image source={item.image} style={styles.unitImage} />
                <View style={styles.unitInfo}>
                  <Text style={styles.unitLabel}>
                    {item.label} ({item.volume})
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.strike}>₹{item.price}</Text>
                    <Text style={styles.discounted}>
                      {' '}
                      ₹{item.discountedPrice}
                    </Text>
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
});
