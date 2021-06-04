import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import { Face, FaceDetectionResult, PermissionResponse } from 'expo-camera/build/Camera.types';
import Ladmarks from './components/Landmarks'
import SmilingText from './components/SmilingText'
import ClownNose from './components/ClownNose'

const { width, height } = Dimensions.get('window')

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [faceData, setFaceData] = useState<Face | null>(null)

  useEffect(() => {
    (async () => {
      const { status }: PermissionResponse = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFacesDetected = (param: FaceDetectionResult) => {
    if (param.faces.length) {
      setFaceData(param.faces[0])
    } else {
      setFaceData(null)
    }
  }

  const handleCamRotate = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera}
        type={type}
        onFacesDetected={face => handleFacesDetected(face)}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >

        {/* Orelha esquerda */}
        <Ladmarks x={faceData?.leftEarPosition.x} y={faceData?.leftEarPosition.y} />

        {/* Orelha direita */}
        <Ladmarks x={faceData?.rightEarPosition.x} y={faceData?.rightEarPosition.y} />

        {/* Olho esquerdo */}
        <Ladmarks x={faceData?.leftEyePosition.x} y={faceData?.leftEyePosition.y} />

        {/* Olho direito */}
        <Ladmarks x={faceData?.rightEyePosition.x} y={faceData?.rightEyePosition.y} />

        {/* Nariz */}
        {(faceData?.smilingProbability || 0) > 0.8 ?
          <ClownNose x={faceData?.noseBasePosition.x} y={faceData?.noseBasePosition.y} /> :
          <Ladmarks x={faceData?.noseBasePosition.x} y={faceData?.noseBasePosition.y} />
        }

        {/* Lado esquerdo boca */}
        <Ladmarks x={faceData?.leftMouthPosition.x} y={faceData?.leftMouthPosition.y} />

        {/* Lado direito boca */}
        <Ladmarks x={faceData?.rightMouthPosition.x} y={faceData?.rightMouthPosition.y} />

        <SmilingText value={faceData?.smilingProbability} />

        <TouchableOpacity style={styles.camRotateContainer} onPress={() => handleCamRotate()}>
          <Image style={styles.camRotate} source={require('./assets/reverse-camera.jpeg')} width={width * 0.15} height={width * 0.15} />
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  camera: {
    flex: 1,
    width: width,
    height: height
  },
  camRotateContainer: {
    alignSelf: 'flex-end',
    marginTop: height - (width * 0.15) - 32,
    marginHorizontal: 32,
    opacity: 0.5
  },
  camRotate: {
    width: width * 0.15,
    height: width * 0.15,
    backgroundColor: '#fff',
    borderRadius: 8
  }
});
