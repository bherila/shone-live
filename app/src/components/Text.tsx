import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function App(props) {
  const [loaded] = useFonts({
    bahnscift: require("./../utils/Fonts/Bahnschrift-Font-Family/BAHNSCHRIFT1.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <Text style={[styles._text,props.style]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  _text: {
    fontFamily: "bahnscift",
  },
});
