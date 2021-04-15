import React, { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import Navigator from './src/navigation/index'
import { Platform, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { requestCameraAndAudioPermission } from './src/utils/helper'
import { ApolloProvider } from '@apollo/client'
import client from './src/graphql/client'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [loaded] = useFonts({
    bahnscift: require('./src/utils/Fonts/Bahnschrift-Font-Family/BAHNSCHRIFT1.ttf')
  })

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestCameraAndAudioPermission()
    }
    setTimeout(() => {
      setIsReady(true)
    }, 3500)
  }, [])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {isReady ? (
          <Navigator />
        ) : (
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay={true}
              loop={false}
              style={{
                width: '100%',
                backgroundColor: '#fff'
              }}
              source={require('./assets/shone-lottie-animation-black.json')}
            />
          </View>
        )}
      </ApolloProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  buttonContainer: {
    paddingTop: 20
  }
})
