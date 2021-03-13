import React, { useState, useRef } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import theme from "./../../utils/colors";
import styles from "./styles";
import { Card, CardItem, Body, Item, Icon, Input, Button } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Text from "./../../components/Text";
import { Dimensions } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { TextInput } from "react-native-gesture-handler";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Login(props) {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ paddingBottom: 30 }}>
        <View style={{ height: windowHeight + 60 }}>
          <View style={styles._logView}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles._logo}
            />
          </View>
          <View style={[styles._bodyView, theme.bg]}>
            <View style={{ flex: 1 }}>
              <Card style={styles._card}>
                <CardItem>
                  <Body>
                    <Text style={styles._login_desc}>
                      For the fast and easy login, we'll need your digits, Don't
                      worry about remembering your password for latter
                    </Text>
                  </Body>
                </CardItem>
                <Item style={[styles._inputFiled, theme.borderColor]}>
                  <Icon active name="call" style={theme.iconColor} />
                  <Text style={{ fontWeight: "bold", fontSize: 18 ,color:"grey"}}>+1 </Text>
                  <TextInput
                    style={styles._input}
                    placeholder="###-###-####"
                    keyboardType="numeric"
                  />
                </Item>
                <Button
                  style={[styles._continue_btn, theme.bg]}
                  onPress={() => props.navigation.navigate("ConfirmSms")}
                >
                  <Text style={styles._btn_text}>Continue</Text>
                </Button>
              </Card>
              <View style={{ flex: 1 }}>
                <Text style={styles._footer_text}>Or sign in with</Text>

                <View style={styles._fotter_row}>
                  <TouchableOpacity style={styles._fb_btn}>
                    <EvilIcons name="sc-facebook" size={50} color="white" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles._apple_btn}>
                    <FontAwesome name="apple" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles._footerBox}>
                <Text style={styles._box_text}>
                  By clicking send, you accept our terms of service and privacy
                  policy.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
