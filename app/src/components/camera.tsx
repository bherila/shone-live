/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { Camera } from 'expo-camera'
import { Entypo } from '@expo/vector-icons'

let cameraRef: Camera | null

const TakePhoto = (props) => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type] = useState(Camera.Constants.Type.back)
  const [, setIsCameraUiOn] = useState(false)
  const [, setIsCapturing] = useState(false)
  const [flashMode] = useState(true)
  const [, setCapturePhoto] = useState(null)

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({
        quality: 0.5,
      })
      setCapturePhoto(photo.uri)
      setIsCapturing(false)
      setIsCameraUiOn(false)
      props.func(photo.uri)
    }
  }

  const getCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  useEffect(() => {
    getCameraPermission()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        hidden={true}
        backgroundColor="white"
        translucent={true}
      />
      <View style={{ flex: 1 }}>
        <Camera
          style={{ flex: 1 }}
          type={type}
          ref={(ref) => (cameraRef = ref)}
          flashMode={
            flashMode
              ? Camera.Constants.FlashMode.on
              : Camera.Constants.FlashMode.off
          }
        >
          {/* >>>>>>>>>>>>>>>> captures <<<<<<<<<<<<< */}

          <View style={styles._bottom_tab_2}>
            <TouchableOpacity
              onPress={() => {
                setIsCapturing(true)
                snap()
              }}
              style={styles._circle}
            >
              <Entypo name="camera" size={24} color="red" />
              {/* <Image
                source={require("./../../assets/video-_button.png")}
                style={styles._video_recorder}
              /> */}
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  _bottom_tab_2: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    width: '90%',
    margin: 20,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  _video_recorder: {
    height: 94,
    width: 94,
  },
  _circle: {
    height: 70,
    width: 70,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default TakePhoto
