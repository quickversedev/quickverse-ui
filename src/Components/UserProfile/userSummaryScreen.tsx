import React, {useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './profileNavigation';
import theme from '../../theme';
import CustomButton from '../util/CustomButton';
import {useAuth} from '../../utils/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {Loading} from '../util/Loading';
import {fetchUserDetails} from '../../services/UserDetailsSlice';
import LoginCard from '../util/MandatoryLoginButton';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  const dispatch = useDispatch<AppDispatch>();
  const {authData} = useAuth();
  const {userDetails, loading} = useSelector(
    (state: RootState) => state.userDetails,
  );
  useEffect(() => {
    authData && dispatch(fetchUserDetails(authData));
  }, [authData, dispatch]);
  const handleDeleteAccount = () => {
    // Open the terms and conditions link
    Linking.openURL('https://forms.gle/GDWr1mj2LBbZ5m7L6');
  };
  if (loading) {
    return <Loading />;
  }
  console.log('userDetails,', userDetails.user);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {authData ? (
          <>
            <View style={styles.header}>
              <Image
                source={require('../../data/images/qv-blue.png')}
                style={styles.profileImage}
              />
              <View style={styles.headerText}>
                <Text style={styles.name}>{userDetails?.user?.userName}</Text>
                <Text style={styles.phone}>
                  +91-{userDetails?.user?.mobile}
                </Text>
                <Text style={styles.email}>{userDetails?.user?.emailId}</Text>
              </View>
            </View>
          </>
        ) : (
          <Image
            source={require('../../data/images/qv-blue.png')}
            style={styles.profileImage}
          />
        )}
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            navigation.removeListener;
            navigation.navigate('Help');
          }}>
          <MaterialCommunityIcons
            name="account-tie"
            size={24}
            color={theme.colors.ternary}
          />
          <Text style={styles.optionText}>Help</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.ternary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            navigation.removeListener;
            navigation.navigate('Feedback');
          }}>
          <MaterialCommunityIcons
            name="book-edit"
            size={24}
            color={theme.colors.ternary}
          />

          <Text style={styles.optionText}>Feedback</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.ternary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            navigation.removeListener;
            navigation.navigate('AboutUs');
          }}>
          <MaterialCommunityIcons
            name="account-network"
            size={24}
            color={theme.colors.ternary}
          />
          <Text style={styles.optionText}>AboutUs..</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.ternary}
          />
        </TouchableOpacity>

        {authData ? (
          <>
            <TouchableOpacity onPress={handleDeleteAccount}>
              <Text style={styles.deleteAccount}>Delete Account?</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="LogOut"
                onPress={signOut}
                buttonColor={theme.colors.ternary}
                textColor={theme.colors.primary}
              />
            </View>
          </>
        ) : (
          <LoginCard />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.primary,
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  container: {
    backgroundColor: theme.colors.primary,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
    color: theme.colors.ternary,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.ternary,
  },
  phone: {
    fontSize: 16,
    color: theme.colors.ternary,
  },
  email: {
    fontSize: 16,
    color: theme.colors.ternary,
  },
  editIcon: {
    padding: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ternary,
  },
  buttonContainer: {
    marginTop: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 18,
    color: theme.colors.ternary,
  },
  deleteAccount: {
    marginTop: 36,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: theme.colors.ternary,
    textDecorationLine: 'underline',
  },
});

export default ProfileScreen;
