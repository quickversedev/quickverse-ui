import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Refundstatus = ({ navigation }) => {
    const [orderID, setOrderID] = useState('');
    const [transactionID, setTransactionID] = useState('');
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
                <Text style={styles.heading}>Refund Status</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                {/* Order ID Input */}
                <Text style={styles.label}>Please Mention your Order ID</Text>
                <TextInput
                    style={styles.inputBox}
                    value={orderID}
                    onChangeText={setOrderID}
                    placeholder="Enter your order ID"
                />

                {/* Transaction ID Input */}
                <Text style={styles.label}>Please Mention your Transaction ID</Text>
                <TextInput
                    style={styles.inputBox}
                    value={transactionID}
                    onChangeText={setTransactionID}
                    placeholder="Enter your transaction ID"
                />

                {/* Query Input Section */}
                <Text style={styles.label}>Please write about query about refund in full detail</Text>
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
                    onPress={() => navigation.navigate('Help_support')}>
                    <Text style={styles.submitButtonText}>Submit</Text>
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
        elevation: 10,
        alignItems: 'center',
    },
    backButton: {
        marginRight: 'auto',
        left: 30,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8F1413',
        textAlign: 'center',
        marginRight: 30,
        flex: 1,
    },
    // Input label
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#103E60',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    // Input boxes
    inputBox: {
        backgroundColor: '#FFDF63',
        borderRadius: 10,
        borderColor: '#8F1413',
        borderWidth: 1,
        padding: 10,
        height: 50,
        width: '100%',
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1.0,
        shadowRadius: 4,
        elevation: 10,
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
        elevation: 6,
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
});

export default Refundstatus;
