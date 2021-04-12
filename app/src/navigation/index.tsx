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
import StorageKeys from '../utils/StorageKeys'
import { useSecureStore } from '../hooks/useSecureStore'
import { ScreenNames } from '../utils/ScreenNames'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userInit, userInitSuccess } from '../redux/actions/userActions'

const Stack = createStackNavigator()

function Navigation() {
  const { data, isLoading } = useSecureStore(StorageKeys.USER)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userInitSuccess(data))
  }, [data])

  if (isLoading) return <></>

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          !data
            ? ScreenNames.AuthScreens.LOGIN
            : ScreenNames.HomeScreens.MAIN_SCREEN
        }
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen
          name={ScreenNames.AuthScreens.LOGIN}
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.AuthScreens.CONFIRM_SMS}
          component={ConfirmSms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.AuthScreens.NEW_ACCOUNT}
          component={NewAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.AuthScreens.PROFILE_PHOTO}
          component={ProfilePhoto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.MAIN_SCREEN}
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.ACCOUNT}
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.HOME}
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.LIVE_SHOW}
          component={LiveShow}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.PAYMENT}
          component={Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.ADDRESS}
          component={Address}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
