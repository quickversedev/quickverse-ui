import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Modal} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import theme from '../../theme';
import HorizontalScroll from './HorizontalScroll';
import VendorsList from './HomeScreenVendors';
import {useAuth} from '../../utils/AuthContext';
import AppHeader from '../../utils/AppHeader';

const HomeScreen: React.FC = () => {
  // const onChangeSearch = (query: string) => setSearchQuery(query);
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const {authData} = useAuth();
  const loggeedInAs = authData?.email;
  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
      console.log('useefefct');
    }, 2000);
  });

  return (
    <View style={styles.container}>
      {/* <Appbar.Header style={{backgroundColor: '#FFDC52', height: 90}}>
        <View style={styles.headerContent}>
          <Text style={styles.textHeaderContent} variant="headlineMedium">
            Hi, QUICK!
          </Text>
          <Text variant="bodyMedium" style={styles.textSubContent}>
            Welcome to the lightning Fast universe
          </Text>
        </View>
      </Appbar.Header> */}
      <AppHeader headerText="Hi, Quick!" />
      <ScrollView>
        <HorizontalScroll />
        <VendorsList />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{loggeedInAs}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textHeaderContent: {
    fontFamily: 'inter',
    fontSize: 26,
    fontWeight: '900',
    color: theme.colors.secondary,
  },
  textSubContent: {
    fontFamily: 'inter',
    fontSize: 20,
    fontWeight: 800,
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
