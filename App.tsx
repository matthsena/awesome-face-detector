import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import { Face, FaceDetectionResult } from 'expo-camera/build/Camera.types';

const { width, height } = Dimensions.get('window')

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);
  const [faceData, setFaceData] = useState<Face | null>(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      console.log('status', status)
      // @ts-ignore
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
      console.log('face', param.faces[0])
      setFaceData(param.faces[0])
    } else {
      setFaceData(null)
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.front}
        onFacesDetected={face => handleFacesDetected(face)}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        <View style={{
          position: 'absolute',
          height: 10,
          width: 10,
          backgroundColor: 'red',
          left: faceData?.leftEarPosition.x || 0,
          top: faceData?.leftEarPosition.y || 0
        }}>
        </View>


        <View style={{
          position: 'absolute',
          height: 10,
          width: 10,
          backgroundColor: 'purple',
          left: faceData?.rightEarPosition.x || 0,
          top: faceData?.rightEarPosition.y || 0
        }}>


        </View>

        <View style={{
          position: 'absolute',
          height: 10,
          width: 10,
          backgroundColor: 'green',
          left: faceData?.leftEyePosition.x || 0,
          top: faceData?.leftEyePosition.y || 0
        }}>
        </View>

        <View style={{
          position: 'absolute',
          height: 10,
          width: 10,
          backgroundColor: 'orange',
          left: faceData?.rightEyePosition.x || 0,
          top: faceData?.rightEyePosition.y || 0
        }}>
        </View>


        <View style={{
          position: 'absolute',
          height: 10,
          width: 10,
          backgroundColor: 'blue',
          left: faceData?.noseBasePosition.x || 0,
          top: faceData?.noseBasePosition.y || 0
        }}>
        </View>


        <View style={{
          position: 'absolute',
          height: 10,
          width: 10,
          backgroundColor: '#eee',
          left: faceData?.leftMouthPosition.x || 0,
          top: faceData?.leftMouthPosition.y || 0
        }}>
        </View>


        <View style={{
          position: 'absolute',
          height: 10,
          width: 10,
          backgroundColor: '#eee',
          left: faceData?.rightMouthPosition.x || 0,
          top: faceData?.rightMouthPosition.y || 0
        }}>
        </View>
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
  label: {
    width: width,
    position: 'absolute',
    height: height * 0.1,
    backgroundColor: '#fff',
    bottom: 0
  },
  labelText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
