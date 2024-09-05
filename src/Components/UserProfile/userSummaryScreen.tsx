import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './profileNavigation';
import theme from '../../theme';
import { useAuth } from '../../utils/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Loading } from '../util/Loading';
import { fetchUserDetails } from '../../services/UserDetailsSlice';

// Type for navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;

// Reusable ProfileSection Component
const ProfileSection = ({ profile }) => {
  return (
    <View style={styles.profileSection}>
      <Image source={{ uri: profile.image }} style={styles.profileImage} />
      <View style={styles.profileTextContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
        <Text style={styles.profilecollege}>{profile.college}</Text>
      </View>
    </View>
  );
};

// Reusable OrderItem Component
const OrderItem = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.orderContainer}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color="#A52A2A"
        style={styles.orderIcon}
      />
      <Text style={styles.orderText}>{text}</Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color="#A52A2A"
        style={styles.chevronIcon}
      />
    </TouchableOpacity>
  );
};

// Main ProfileScreen Component
const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  const dispatch = useDispatch<AppDispatch>();
  const { authData } = useAuth();
  const { userDetails, loading } = useSelector(
    (state: RootState) => state.userDetails,
  );

  useEffect(() => {
    if (authData) {
      dispatch(fetchUserDetails(authData?.session.token));
    }
  }, [authData, dispatch]);

  const profile = {
    image: 'https://via.placeholder.com/100',
    name: 'SHUVO JAIN',
    email: '+91 7489343894',
    college: 'IIM UDAIPUR',
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Account</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.nameSection}>
          <ProfileSection profile={profile} />
        </View>

        {/* Order Items */}
        <View style={styles.ordersContainer}>
          <OrderItem
            icon="account-box"
            text="My Details"
            onPress={() => navigation.navigate('MyDetails')}
          />
          <OrderItem
            icon="map-marker"
            text="Delivery Address"
            onPress={() => navigation.navigate('AddressScreen')}
          />
          <OrderItem
            icon="credit-card"
            text="Payment Methods"
            onPress={() => navigation.navigate('PaymentMethods')}
          />
          <OrderItem
            icon="card-bulleted-outline"
            text="Promo Cards"
            onPress={() => navigation.navigate('PromoCards')}
          />
          <OrderItem
            icon="bell-outline"
            text="Notifications"
            onPress={() => navigation.navigate('Notifications')}
          />
          <OrderItem
            icon="help-circle"
            text="Help & Support"
            onPress={() => navigation.navigate('Help_support')}
          />
          <OrderItem
            icon="information-outline"
            text="About"
            onPress={() => navigation.navigate('AboutUs')}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color="#fff"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  container: {
    backgroundColor: theme.colors.primary,
    paddingBottom: 16,
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#FFE474',
    paddingVertical: 16,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 8,
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A52A2A',
  },
  nameSection: {
    width: '100%',
    paddingHorizontal: 46,
    paddingVertical: 10,
    backgroundColor: '#FFE474',
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B1A1A',
  },
  profileEmail: {
    fontSize: 14,
    color: '#0D3B66',
  },
  profilecollege: {
    fontSize: 14,
    color: '#0D3B66',
  },

  ordersContainer: {
    paddingHorizontal: 16,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE474',
    width: '100%',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.50,
    shadowRadius: 4,
    elevation: 4,
  },
  orderIcon: {
    marginRight: 16,
  },
  orderText: {
    fontSize: 16,
    color: '#0D3B66',
    fontWeight: 'bold',
    flex: 1,
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    backgroundColor: '#8F1413',
    padding: 12,
    borderRadius: 25,
    marginTop: 20,
  },


  logoutIcon: {
    position: 'absolute',
    left: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
