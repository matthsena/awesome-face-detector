import React from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export default function SmilingText({ value = 0 }: { value?: number }) {
  return (
    <View style={styles.textContent}>
      <Text style={styles.textDesc}>
        Probabilidade de estar sorrindo
      </Text>
      <Text style={styles.textStyle}>
        {(value * 100).toFixed(2)}%
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContent: {
    width: width,
    position: 'absolute',
    bottom: 96,
    left: 0
  },
  textDesc: {
    fontSize: 18,
    color: '#32a852',
    textAlign: 'center',
    opacity: 0.5
  },
  textStyle: {
    fontSize: 32,
    color: '#32a852',
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.5
  }
})