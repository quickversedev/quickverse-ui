import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import theme from '../../../theme';

interface HomeButtonsProps {
    onPressFood?: () => void;
    onPressGroceries?: () => void;
    onPressServices?: () => void;
}

const HomeButtons: React.FC<HomeButtonsProps> = ({
    onPressFood,
    onPressGroceries,
    onPressServices,
}) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onPressFood}>
                <Image
                    source={require('../../../data/images/burger.jpg')}
                    style={styles.buttonImage}
                />
                <Text style={styles.buttonText}>FOOD</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressGroceries}>
                <Image
                    source={require('../../../data/images/groceries.jpg')}
                    style={styles.buttonImage}
                />
                <Text style={styles.buttonText}>GROCERIES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressServices}>
                <Image
                    source={require('../../../data/images/services.jpg')}
                    style={styles.buttonImage}
                />
                <Text style={styles.buttonText}>SERVICES</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 24,
        marginHorizontal: '2%'
    },
    button: {
        flex: 1,
        maxWidth: '30%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.button,
        borderRadius: 20,
        marginHorizontal: '2%',
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Shadow offset 
        shadowOpacity: 0.3,
        shadowRadius: 3,

    },
    buttonImage: {
        width: '60%',
        height: '60%',
        borderRadius: 9999, // image gets fully rounded
        resizeMode: 'cover',
        borderWidth: 1,

    },
    buttonText: {
        marginTop: 2,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: theme.colors.secondary,
    },
});

export default HomeButtons;
