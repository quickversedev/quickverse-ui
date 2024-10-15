import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../../../theme';

export default function Categories() {
  return (
    <View style={styles.container}>
      <Text>Categories</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary
    },
})