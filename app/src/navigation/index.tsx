/* eslint-disable no-use-before-define */
// In App.js in a new project

import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './../Screens/login'
import ConfirmSms from './../Screens/confirmsms'
import NewAccount from './../Screens/newaccount'
import ProfilePhoto from './../Screens/profilePhoto'
import MainScreen from './../Screens/mainScreen'
import Account from './../Screens/account'
import Home from '../Screens/Home'
import LiveShow from '../Screens/LiveShow'
import Payment from '../Screens/Payments'
import Address from '../Screens/Address'
import * as SecureStore from 'expo-secure-store'
import StorageKeys from '../utils/StorageKeys'
import { useSecureStore } from '../hooks/useSecureStore'

const Stack = createStackNavigator()

function Navigation() {
  const { data, isLoading } = useSecureStore(StorageKeys.AUTH_TOKEN)

  if (isLoading) return <></>

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!data ? 'Login' : 'MainScreen'}>
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LiveShow"
          component={LiveShow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
