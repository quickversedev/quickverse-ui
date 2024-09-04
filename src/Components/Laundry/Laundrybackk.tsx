// import React, {useEffect, useState, useRef} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   Pressable,
//   SafeAreaView,
//   Modal,
//   Animated,
//   TouchableWithoutFeedback,
//   ScrollView,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//   addToCart,
//   decrementQuantity,
//   incrementQuantity,
//   removeFromCart,
//   CartItem,
//   updateCartItemServices,
// } from '../../services/cartSlice';
// import {AppDispatch, RootState} from '../../store/store';
// import {LaundryProduct} from '../../utils/canonicalModel';
// import {fetchLaundryProductsList} from '../../services/laundryProductsSlice';
// import {Loading} from '../util/Loading';
// import theme from '../../theme';

// const Laundry: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const {LaundryProducts, loading} = useSelector(
//     (state: RootState) => state.laundryProducts,
//   );
//   const cart = useSelector((state: RootState) => state.cart.cart);

//   const [modalVisible, setModalVisible] = useState(false);
//   const animationValue = useRef(new Animated.Value(1000)).current;

//   useEffect(() => {
//     dispatch(fetchLaundryProductsList());
//   }, [dispatch]);

//   const openCartModal = () => {
//     setModalVisible(true);
//     Animated.timing(animationValue, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeCartModal = () => {
//     Animated.timing(animationValue, {
//       toValue: 1000,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => setModalVisible(false));
//   };

//   if (loading) return <Loading />;

//   const addItemToCart = (item: LaundryProduct) => {
//     const cartItem: CartItem = {
//       id: item.id,
//       name: item.name,
//       price: item.price,
//       ironRate: item.ironRate,
//       quantity: 1,
//       isIroningSelected: false,
//       isWashingSelected: true,
//     };
//     dispatch(addToCart(cartItem));
//   };

//   const removeItemFromCart = (item: LaundryProduct) => {
//     dispatch(removeFromCart({id: item.id}));
//   };

//   const increaseQuantity = (item: CartItem) => {
//     dispatch(incrementQuantity({id: item.id}));
//   };

//   const decreaseQuantity = (item: CartItem) => {
//     if (item.quantity === 1) {
//       dispatch(removeFromCart({id: item.id}));
//     } else {
//       dispatch(decrementQuantity({id: item.id}));
//     }
//   };

//   const handleCheckboxChange = (
//     cartItem: CartItem,
//     service: 'ironing' | 'washing',
//   ) => {
//     const updatedItem = {
//       ...cartItem,
//       isIroningSelected:
//         service === 'ironing'
//           ? !cartItem.isIroningSelected
//           : cartItem.isIroningSelected,
//       isWashingSelected:
//         service === 'washing'
//           ? !cartItem.isWashingSelected
//           : cartItem.isWashingSelected,
//     };
//     dispatch(updateCartItemServices(updatedItem));
//   };

//   const washingTotal = cart.reduce((sum, item) => {
//     if (item.isWashingSelected) {
//       return sum + item.quantity * item.price;
//     }
//     return sum;
//   }, 0);

//   // Total price for ironing clothes
//   const ironingTotal = cart.reduce((sum, item) => {
//     if (item.isIroningSelected) {
//       return sum + item.quantity * item.ironRate;
//     }
//     return sum;
//   }, 0);
//   const totalPrice = washingTotal + ironingTotal;

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Laundry Service</Text>
//       <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//         {LaundryProducts.map(item => {
//           const cartItem = cart.find(cartItem => cartItem.id === item.id);

//           return (
//             <Pressable key={item.id} style={styles.itemContainer}>
//               <View style={styles.imageContainer}>
//                 <Image style={styles.image} source={{uri: item.imageUrl}} />
//               </View>
//               <View style={styles.detailsContainer}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <View style={styles.priceSection}>
//                   <Pressable
//                     onPress={() =>
//                       cartItem && handleCheckboxChange(cartItem, 'washing')
//                     }>
//                     <MaterialCommunityIcons
//                       name={
//                         cartItem?.isWashingSelected
//                           ? 'checkbox-marked-outline'
//                           : 'checkbox-blank-outline'
//                       }
//                       size={24}
//                       color={theme.colors.secondary}
//                     />
//                   </Pressable>
//                   <Text
//                     style={
//                       styles.itemPrice
//                     }>{`Washing: ${item.price}Rs.`}</Text>

//                   <Pressable
//                     onPress={() =>
//                       cartItem && handleCheckboxChange(cartItem, 'ironing')
//                     }>
//                     <MaterialCommunityIcons
//                       name={
//                         cartItem?.isIroningSelected
//                           ? 'checkbox-marked-outline'
//                           : 'checkbox-blank-outline'
//                       }
//                       size={24}
//                       color={theme.colors.secondary}
//                     />
//                   </Pressable>
//                   <Text
//                     style={
//                       styles.itemPrice
//                     }>{`Ironing: ${item.ironRate}Rs.`}</Text>
//                 </View>

//                 {cartItem ? (
//                   <>
//                     <View style={styles.quantityContainer}>
//                       <Pressable onPress={() => decreaseQuantity(cartItem)}>
//                         <Text style={styles.quantityButton}>-</Text>
//                       </Pressable>
//                       <Text style={styles.quantityText}>
//                         {cartItem.quantity}
//                       </Text>
//                       <Pressable onPress={() => increaseQuantity(cartItem)}>
//                         <Text style={styles.quantityButton}>+</Text>
//                       </Pressable>
//                     </View>
//                     <Pressable
//                       style={styles.deleteIcon}
//                       onPress={() => removeItemFromCart(item)}>
//                       <MaterialCommunityIcons
//                         name="delete"
//                         size={24}
//                         color={theme.colors.secondary}
//                       />
//                     </Pressable>
//                   </>
//                 ) : (
//                   <Pressable onPress={() => addItemToCart(item)}>
//                     <Text style={styles.buttonText}>ADD TO CART</Text>
//                   </Pressable>
//                 )}
//               </View>
//             </Pressable>
//           );
//         })}
//       </ScrollView>

//       {/* Cart Summary View */}
//       <Pressable style={styles.cartSummary} onPress={openCartModal}>
//         <Text
//           style={styles.cartSummaryText}>{`${totalItems} items Added`}</Text>
//         <Text style={styles.cartSummaryText}>{`Total: ${totalPrice}`}</Text>
//       </Pressable>

//       {/* Cart Modal */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="none"
//         onRequestClose={closeCartModal}>
//         <TouchableWithoutFeedback onPress={closeCartModal}>
//           <View style={styles.modalOverlay} />
//         </TouchableWithoutFeedback>
//         <Animated.View
//           style={[
//             styles.modalContent,
//             {transform: [{translateY: animationValue}]},
//           ]}>
//           <View style={styles.modalHeader}>
//             <Pressable style={styles.closeButton} onPress={closeCartModal}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </Pressable>
//             <Text style={styles.title}>Laundry Cart</Text>
//           </View>
//           <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//             {cart.length === 0 ? (
//               <View>
//                 <Text>Please items to the laundry cart</Text>
//               </View>
//             ) : (
//               ''
//             )}
//             {cart.map(cartItem => (
//               <Pressable key={cartItem.id} style={styles.itemContainer}>
//                 <View style={styles.imageContainer}>
//                   <Image
//                     style={styles.image}
//                     source={{
//                       uri: LaundryProducts.find(p => p.id === cartItem.id)
//                         ?.imageUrl,
//                     }}
//                   />
//                 </View>
//                 <View style={styles.detailsContainer}>
//                   <Text style={styles.itemName}>{cartItem.name}</Text>
//                   <View style={styles.priceSection}>
//                     <Pressable
//                       onPress={() =>
//                         cartItem && handleCheckboxChange(cartItem, 'washing')
//                       }>
//                       <MaterialCommunityIcons
//                         name={
//                           cartItem?.isWashingSelected
//                             ? 'checkbox-marked-outline'
//                             : 'checkbox-blank-outline'
//                         }
//                         size={24}
//                         color={theme.colors.secondary}
//                       />
//                     </Pressable>
//                     <Text
//                       style={
//                         styles.itemPrice
//                       }>{`Washing: ${cartItem.price}Rs.`}</Text>

//                     <Pressable
//                       onPress={() =>
//                         cartItem && handleCheckboxChange(cartItem, 'ironing')
//                       }>
//                       <MaterialCommunityIcons
//                         name={
//                           cartItem?.isIroningSelected
//                             ? 'checkbox-marked-outline'
//                             : 'checkbox-blank-outline'
//                         }
//                         size={24}
//                         color={theme.colors.secondary}
//                       />
//                     </Pressable>
//                     <Text
//                       style={
//                         styles.itemPrice
//                       }>{`Ironing: ${cartItem.ironRate}Rs.`}</Text>
//                   </View>
//                   <View style={styles.quantityContainer}>
//                     <Pressable onPress={() => decreaseQuantity(cartItem)}>
//                       <Text style={styles.quantityButton}>-</Text>
//                     </Pressable>
//                     <Text style={styles.quantityText}>{cartItem.quantity}</Text>
//                     <Pressable onPress={() => increaseQuantity(cartItem)}>
//                       <Text style={styles.quantityButton}>+</Text>
//                     </Pressable>
//                   </View>
//                   <Pressable
//                     style={styles.deleteIcon}
//                     onPress={() => removeItemFromCart(cartItem)}>
//                     <MaterialCommunityIcons
//                       name="delete"
//                       size={24}
//                       color={theme.colors.secondary}
//                     />
//                   </Pressable>
//                 </View>
//               </Pressable>
//             ))}
//             {cart.length >= 1 ? (
//               <View style={styles.container}>
//                 <View style={styles.orderSummary}>
//                   <View style={styles.priceSection}>
//                     <Text style={styles.itemName}>{`Total Items : `}</Text>
//                     <Text style={styles.itemName}>{`${totalItems}`}</Text>
//                   </View>
//                   <View style={styles.priceSection}>
//                     <Text>{`    Total Washing Amount : `}</Text>
//                     <Text>{`${washingTotal} Rs`}</Text>
//                   </View>
//                   <View style={styles.priceSection}>
//                     <Text>{`    Total Ironing Amount : `}</Text>
//                     <Text>{`+${ironingTotal} Rs`}</Text>
//                   </View>
//                   <View style={styles.priceSection}>
//                     <Text style={styles.itemName}>{`Total Amount : `}</Text>
//                     <Text
//                       style={{
//                         color: theme.colors.secondary,
//                         fontSize: 22,
//                         fontWeight: 'bold',
//                       }}>{`${totalPrice} Rs`}</Text>
//                   </View>
//                 </View>
//               </View>
//             ) : (
//               ''
//             )}
//           </ScrollView>
//         </Animated.View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default Laundry;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: theme.colors.primary,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: theme.colors.secondary,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     padding: 10,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 8,
//     shadowColor: theme.colors.ternary,
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   orderSummary: {
//     // flexDirection: 'row',
//     // alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//     padding: 10,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 8,
//     shadowColor: theme.colors.ternary,
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   imageContainer: {
//     marginRight: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   priceSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   detailsContainer: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: theme.colors.ternary,
//   },
//   itemPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: theme.colors.ternary,
//   },
//   buttonText: {
//     borderColor: theme.colors.ternary,
//     borderWidth: 1,
//     marginVertical: 10,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//     textAlign: 'center',
//     color: theme.colors.ternary,
//     fontWeight: 'bold',
//   },
//   deleteIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     margin: 10,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     backgroundColor: theme.colors.secondary,
//     borderRadius: 5,
//     width: 120,
//     justifyContent: 'space-between',
//   },
//   quantityButton: {
//     fontSize: 25,
//     color: theme.colors.primary,
//     paddingHorizontal: 10,
//   },
//   quantityText: {
//     fontSize: 20,
//     color: theme.colors.primary,
//   },
//   cartSummary: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 15,
//     backgroundColor: theme.colors.secondary,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   cartSummaryText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: '90%',
//     backgroundColor: theme.colors.primary,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   closeButton: {
//     alignSelf: 'flex-end',
//     paddingRight: 15,
//     paddingTop: 10,
//   },
//   closeButtonText: {
//     fontSize: 16,
//     color: theme.colors.secondary,
//     fontWeight: 'bold',
//   },
//   scrollViewContainer: {
//     paddingBottom: 20,
//   },
//   modalHeader: {
//     padding: 10,
//   },
// });
