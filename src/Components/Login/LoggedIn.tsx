/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../theme';
import HomeNavigation from '../Home/HomeNavigation';
import ProfileNavigation from '../UserProfile/profileNavigation';
import CategoriesScreen from '../Categories/CategoriesScreen';
import {storage} from '../../utils/Storage';
import ChangePinScreen from '../UserProfile/ChangePin';
import {
  Platform,
  View,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CartScreen from '../Cart/CartScreen';
import OrdersNavigation from '../Orders/OrderSNavigator';

const Tab = createBottomTabNavigator();

const LoggedIn: React.FC = () => {
  const [forgotPasswordFlow, setForgotPasswordFlow] = useState<boolean>();
  const [modalVisible, setModalVisible] = useState(false);
  const animationValue = useState(
    new Animated.Value(Dimensions.get('window').height),
  )[0];

  React.useEffect(() => {
    const forgotPass = async () => {
      const resetFlow = await storage.getBoolean('@resetPass');
      setForgotPasswordFlow(resetFlow);
    };
    forgotPass();
  }, [forgotPasswordFlow]);

  const handleForgotPasswordFlow = (forgotpass: boolean) => {
    setForgotPasswordFlow(forgotpass);
  };

  const openCartModal = () => {
    setModalVisible(true);
    Animated.timing(animationValue, {
      toValue: Dimensions.get('window').height * 0.1, // Move to 10% from the top (i.e., 90% height)
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const closeCartModal = () => {
    Animated.timing(animationValue, {
      toValue: Dimensions.get('window').height,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  if (forgotPasswordFlow) {
    return <ChangePinScreen forgotPasswordRoute={handleForgotPasswordFlow} />;
  }

  return (
    <PaperProvider theme={theme}>
      <View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.secondary,
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarStyle: {
              backgroundColor: theme.colors.primary,
              height: Platform.OS === 'ios' ? 80 : 60,
              paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            },
            headerShown: false,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={focused ? 'home' : 'home-outline'}
                  color={color}
                  size={focused ? 36 : 26}
                />
              ),
              tabBarLabel: 'Shop',
            }}
          />
          <Tab.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={focused ? 'view-grid' : 'view-grid-outline'}
                  color={color}
                  size={focused ? 36 : 26}
                />
              ),
              tabBarLabel: 'Categories',
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartScreen}
            options={{
              tabBarIcon: () => (
                <View style={styles.floatingButtonContainer}>
                  <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={openCartModal}>
                    <MaterialCommunityIcons
                      name="cart"
                      color="#8A0707" // Blood red cart icon
                      size={50} // Increased icon size
                    />
                  </TouchableOpacity>
                </View>
              ),
              tabBarLabel: '',
            }}
            listeners={({navigation}) => ({
              tabPress: e => {
                e.preventDefault();
                openCartModal();
              },
            })}
          />
          <Tab.Screen
            name="Orders"
            component={OrdersNavigation}
            options={{
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={focused ? 'clipboard-list' : 'clipboard-list-outline'}
                  color={color}
                  size={focused ? 36 : 26}
                />
              ),
              tabBarLabel: 'Orders',
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNavigation}
            options={{
              tabBarIcon: ({focused, color}) => (
                <MaterialCommunityIcons
                  name={focused ? 'account-circle' : 'account-circle-outline'}
                  color={color}
                  size={focused ? 36 : 26}
                />
              ),
              tabBarLabel: 'Account',
            }}
          />
        </Tab.Navigator>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="none"
          onRequestClose={closeCartModal}>
          <TouchableWithoutFeedback onPress={closeCartModal}>
            <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)'}} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={{
              position: 'absolute',
              transform: [{translateY: animationValue}],
              left: 0,
              right: 0,
              height: '90%',
              backgroundColor: 'white',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            {/* Transparent Back Button */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 16,
                position: 'absolute',
                top: 10,
                right: 10,
              }}>
              <TouchableOpacity onPress={closeCartModal}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={24}
                  color={theme.colors.primary}
                  style={{backgroundColor: 'transparent'}}
                />
              </TouchableOpacity>
            </View>

            <CartScreen navigation={undefined} />
          </Animated.View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  floatingButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -25,
  },
  floatingButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    marginTop: 25,
  },
});

export default LoggedIn;
