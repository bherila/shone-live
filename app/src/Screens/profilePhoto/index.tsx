import React, { useEffect, useState } from "react";
import { Image, View, TouchableOpacity, Platform } from "react-native";
import theme from "./../../utils/colors";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  Card,
  CardItem,
  Body,
  Item,
  Icon,
  Input,
  Button,
  Header,
  Left,
  Right,
} from "native-base";
import Text from "./../../components/Text";
import Camera from "./../../components/camera";
export default function ProfilePhoto(props) {
  const [image, setImage] = useState(null);

  const [openCamera, setOpenCamera] = useState(true);
  const [photo, setPhoto] = useState(false);

  const getPermition = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else {
      getPermition();
    }
  };

  const capture = (v) => {
    setOpenCamera(true);
    setImage(v);
    console.log("--------------->", v);
  };
  return (
    <View style={styles.container}>
      {openCamera ? (
        <>
          <Header style={{ elevation: 0, backgroundColor: "transparent" }}>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={() => props.navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: "black" }} />
              </Button>
            </Left>
            <Body
              style={{
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./../../../assets/logo.png")}
                style={{ height: 60, width: 120 }}
              />
            </Body>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("MainScreen")}
              >
                <Text style={theme.textColor}>Next</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <View style={styles._innerView}>
            <Text style={styles._screenHeading}>Profile Photo</Text>
            <Text style={styles._desc}>
              Shone is a community full of authentic users. Go ahead, and upload
              your best photo!
            </Text>
            <View style={styles._circle}>
              {image ? (
                <>
                  {image && (
                    <Image source={{ uri: image }} style={styles._avatarImg} />
                  )}
                </>
              ) : (
                <Image
                  source={require("./../../../assets/avatar.jpg")}
                  style={styles._avatarImg}
                />
              )}

              <TouchableOpacity style={[styles._editView, theme.bg]}>
                <MaterialIcons name="mode-edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
            }}
          >
            <TouchableOpacity
              style={[styles._confirmBtn, theme.bg]}
              onPress={pickImage}
            >
              <Text style={styles._confirmBtn_text}>Upload from album</Text>
            </TouchableOpacity>

            <View style={styles._orView}>
              <View style={[styles._orCircle, theme.bg]}>
                <Text style={styles._orText}>OR</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles._confirmBtn, theme.bg]}
              onPress={() => setOpenCamera(false)}
            >
              <Text style={styles._confirmBtn_text}>Take a photo</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Camera func={capture} />
      )}
    </View>
  );
}
