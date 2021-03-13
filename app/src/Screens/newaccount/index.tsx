import React from "react";
import { View, TouchableOpacity, Image, KeyboardAvoidingView } from "react-native";
import theme from "./../../utils/colors";
import styles from "./styles";
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

export default function ConfirmSms(props) {
  return (
    <View style={styles.container}>
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
        <View style={styles._innerView}>
      <KeyboardAvoidingView>
          <Text style={styles._desc}>
            We haven’t seen you before. Create a new account.
          </Text>

          <Item regular style={styles._codeInput}>
            <Input placeholder="First name" />
          </Item>

          <Item regular style={styles._codeInput}>
            <Input placeholder="Last name" />
          </Item>

          <Item regular style={styles._codeInput}>
            <Input placeholder="Email address" keyboardType="email-address" />
          </Item>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity
          style={[styles._confirmBtn, theme.bg]}
          onPress={() => props.navigation.navigate("ProfilePhoto")}
        >
          <Text style={styles._confirmBtn_text}>Go</Text>
        </TouchableOpacity>
    </View>
  );
}
