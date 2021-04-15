// // import { StatusBar } from 'expo-status-bar';
// // import React from 'react';
// // import { StyleSheet, Text, View } from 'react-native';

// import Navigator from "./src/navigation/index";
// // export default function App() {
// //   return (
// //    <Navigator />
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { StyleSheet, View } from "react-native";
// import * as Font from "expo-font";
// import AppLoading from "expo-app-loading";
// import { Ionicons } from "@expo/vector-icons";

// const FetchFont = () => {
//   return Font.loadAsync({
//     BAHNSCHRIFT: require("./src/utils/Fonts/Bahnschrift-Font-Family/BAHNSCHRIFT1.ttf"),
//   });
// };
// export default function App() {
//   useEffect(async () => {
//     await Font.loadAsync({
//       Roboto: require("native-base/Fonts/Roboto.ttf"),
//       Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
//       ...Ionicons.font,
//     });
//   }, []);

//   const [fontLoaded, setFontLoaded] = useState(false);
//   if (!fontLoaded) {
//     return (
//       <AppLoading
//         startAsync={FetchFont}
//         onError={() => console.log("ERROR")}
//         onFinish={() => setFontLoaded(true)}
//       />
//     );
//   }
//   return (
//     <View style={{ flex: 1 }}>
//       <Navigator />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   _text: {
//     fontFamily: "BAHNSCHRIFT",
//   },
// });
// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import { useFonts } from 'expo-font'
import Navigator from './src/navigation/index'
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { requestCameraAndAudioPermission } from './src/utils/helper'
import { ApolloProvider } from '@apollo/client'
import client from './src/graphql/client'

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
    <ApolloProvider client={client}>
      <>
        {isReady ? (
          <Navigator />
        ) : (
          <View style={styles.animationContainer}>
            <LottieView
              autoPlay={true}
              loop={false}
              style={{
                width: '100%',
                // height: 100,
                backgroundColor: '#fff'
              }}
              source={require('./assets/shone-lottie-animation-black.json')}
            />
          </View>
        )}
      </>
    </ApolloProvider>
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
