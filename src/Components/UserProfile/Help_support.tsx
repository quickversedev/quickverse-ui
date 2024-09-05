import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './profileNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Type for navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;

const HelpScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [query, setQuery] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header Container (outside ScrollView) */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#A52A2A" />
        </TouchableOpacity>
        <Text style={styles.heading}>Help</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Subheading (outside the inner container) */}
        <Text style={styles.subheading}>Please write about query in full detail</Text>

        {/* Query Input Section */}
        <View style={styles.textBox}>
          <TextInput
            style={styles.textInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Enter your query"
            multiline
          />
          <TouchableOpacity>
            <MaterialCommunityIcons name="pencil" size={20} color="#A52A2A" />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}
                onPress={() => navigation.navigate ('ProfileScreen')}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Refund Status Button */}
        <TouchableOpacity style={styles.refundButton}
        onPress={() => navigation.navigate('Refundstatus')}>
          <MaterialCommunityIcons name="cash-refund" size={20} color="#A52A2A" />
          <Text style={styles.refundButtonText}>Refund Status</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#A52A2A" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Main container for content inside ScrollView
  container: {
    flexGrow: 1,
    backgroundColor: '#FFDC52',
    padding: 20,
    alignItems: 'center',
  },
  // Header styles (outside ScrollView)
  headerContainer: {
    flexDirection: 'row',
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
  backButton: {
    marginRight: 'auto',
    left:30,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8F1413',
    textAlign: 'center',
    marginRight:30,
    flex: 1,
  },
  // Subheading (above the input field)
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#103E60',
    marginBottom: 5,
    marginTop:10,
    alignSelf: 'flex-start',
  },
  // Query input section
  textBox: {
    backgroundColor: '#FFDF63',
    borderRadius: 20,
    borderColor: '#8F1413',
    borderWidth: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 150,
    width: '100%',
    marginBottom: 20,
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1.0,
    shadowRadius: 4,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#3E2723',
  },
  // Submit Button
  submitButton: {
    backgroundColor: '#8F1413',
    paddingVertical: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  // Refund Status Button
  refundButton: {
    flexDirection: 'row',
    backgroundColor: '#FFE474',
    paddingVertical: 15,
    borderColor:'#8F1413',
    borderWidth:1,
    borderRadius: 20,
    width: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  refundButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#103E60',
    marginLeft: 10,
    flex: 1,
  },
});

export default HelpScreen;
