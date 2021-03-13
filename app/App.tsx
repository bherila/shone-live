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
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import Navigator from "./src/navigation/index";

export default function App() {
  const [loaded] = useFonts({
    bahnscift: require("./src/utils/Fonts/Bahnschrift-Font-Family/BAHNSCHRIFT1.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    // <View style={styles.container}>
      <Navigator />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  _text: {
    // fontFamily: "bahnscift",
  },
});
