import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LandMarksParams } from './Landmarks'

export default function ClownNose({ x = 0, y = 0 }: LandMarksParams) {
  return (
    <View style={{
      ...styles.landmarks,
      left: x - 32,
      top: y - 32,
      backgroundColor: 'red'
    }} />
  )
}

const styles = StyleSheet.create({
  landmarks: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 64
  }
})