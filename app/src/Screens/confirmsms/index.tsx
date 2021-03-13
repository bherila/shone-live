import React from "react";
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import theme from "./../../utils/colors";
import styles from "./styles";
import { Item, Input } from "native-base";
import { Header, Left, Button, Icon, Right, Body, Title } from "native-base";
import Text from "./../../components/Text";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function ConfirmSms(props) {
  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior="position" style={styles.form}>

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
          <Right style={{ flex: 1 }}></Right>
        </Header>
        <View style={[styles._innerView]}>
          <Image
            source={require("../../../assets/device.png")}
            style={styles._deviceImg}
          />
          <Text style={styles._desc}>
            We just texted you a code to confirm your identity
          </Text>

          <Item regular style={styles._codeInput}>
            <Input placeholder="Enter your code" keyboardType="number-pad" />
          </Item>
          <TouchableOpacity
            style={[styles._confirmBtn, theme.bg]}
            onPress={() => props.navigation.navigate("NewAccount")}
          >
            <Text style={styles._confirmBtn_text}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
