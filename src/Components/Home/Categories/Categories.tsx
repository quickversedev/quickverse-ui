import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

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
    },
})