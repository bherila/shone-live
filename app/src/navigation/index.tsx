// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./../Screens/login";
import ConfirmSms from "./../Screens/confirmsms";
import NewAccount from "./../Screens/newaccount";
import ProfilePhoto from "./../Screens/profilePhoto";
import MainScreen from "./../Screens/mainScreen";
import Account from "./../Screens/account";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmSms"
          component={ConfirmSms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewAccount"
          component={NewAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfilePhoto"
          component={ProfilePhoto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
