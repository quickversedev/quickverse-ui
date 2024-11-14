import {StyleSheet} from 'react-native';
import theme from '../../theme';

export default StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.primary,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.secondary,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    shadowColor: theme.colors.ternary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
  },
  orderSummary: {
    // flexDirection: 'row',
    // alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    shadowColor: theme.colors.ternary,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
  buttonText: {
    borderColor: theme.colors.ternary,
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
    color: theme.colors.ternary,
    fontWeight: 'bold',
  },
  deleteIcon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    right: 0,
    margin: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
    width: 120,
    justifyContent: 'space-between',
  },
  quantityButton: {
    fontSize: 25,
    color: theme.colors.primary,
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  cartSummary: {
    position: 'absolute',

    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: theme.colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
  },
  cartSummaryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '90%',
    backgroundColor: theme.colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingRight: 15,
    paddingTop: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  modalHeader: {
    padding: 10,
  },
  cartButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 24,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: theme.colors.primary, // Set to your primary color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjust as needed
  },
  checkoutButtonText: {
    color: theme.colors.ternary, // Set to your text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.ternary,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
  },
  addressContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AddressContainer: {
    padding: 16,
    backgroundColor: theme.colors.primary,
    flex: 1,
    justifyContent: 'center',
  },
  showAddressCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: 16,
    shadowColor: theme.colors.ternary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  addressDetails: {
    marginBottom: 50,
  },
  Addresstext: {
    fontSize: 16,
    marginBottom: 8,
    color: theme.colors.ternary,
  },
  changeButton: {
    position: 'absolute',
    bottom: 6,
    right: 16,
    backgroundColor: theme.colors.primary,
    marginTop: 10,
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    borderRadius: 4,
  },
  addressButtonText: {
    color: theme.colors.ternary,
    fontWeight: 'bold',
  },
  list: {
    flexGrow: 1,
  },
  placeOrderButton: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    // backgroundColor: theme.colors.primary,
    borderRadius: 20,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // text: {
  //   fontSize: 16,
  //   marginBottom: 4,
  //   color: theme.colors.ternary,
  // },
  // checkoutButton: {
  //   backgroundColor: theme.colors.secondary,
  //   padding: 16,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   margin: 16,
  // },
  // checkoutButtonText: {
  //   color: theme.colors.primary,
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  // list: {
  //   flexGrow: 1,
  // },
  // loader: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
});
