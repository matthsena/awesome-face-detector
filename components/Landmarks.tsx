import React from 'react'
import { View, StyleSheet } from 'react-native'

interface LandMarksParams {
  x?: number
  y?: number
  color?: string
  isVisible?: boolean
}

export default function Landmarks({ color = '#32a852', isVisible, x, y }: LandMarksParams) {
  return (
    <View style={{
      ...styles.landmarks,
      left: x || 0,
      top: y || 0,
      backgroundColor: color
    }} />
  )
}

const styles = StyleSheet.create({
  landmarks: {
    position: 'absolute',
    width: 8,
    height: 8,
    opacity: 0.5,
    borderRadius: 16
  }
})