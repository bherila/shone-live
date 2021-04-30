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
import { userInitSuccess } from '../redux/actions/userActions'
import WatchStyle from '../Screens/WatchStyle'
import VoteAndWin from '../Screens/VoteAndWin'
import RankingDetails from '../Screens/RankingDetails'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ContestVideoScreen from '../Screens/ContestVideoScreen'
import ContestVoteScreen from '../Screens/ContestVoteScreen'
import GiftScreen from '../Screens/GiftScreen'

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

const ContestTabs = () => (
  <Tab.Navigator
    tabBar={() => null}
    initialRouteName={ScreenNames.MainScreenTabs.CONTEST_VIDEO_VOTE}
  >
    <Tab.Screen
      name={ScreenNames.MainScreenTabs.CONTEST_VIDEO_LIST_SCREEN}
      component={ContestVideoScreen}
    />
    <Tab.Screen
      name={ScreenNames.MainScreenTabs.CONTEST_VIDEO_VOTE}
      component={ContestVoteScreen}
    />
  </Tab.Navigator>
)

const screenOptions = { headerShown: false }

function Navigation() {
  const { data, isLoading } = useSecureStore(StorageKeys.USER)

  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(userInitSuccess(data))
    }
  }, [data])

  if (isLoading) return <></>

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          !data
            ? ScreenNames.AuthScreens.LOGIN
            : ScreenNames.HomeScreens.CONTEST_TAB_SCREEN
        }
        screenOptions={{ gestureEnabled: true }}
      >
        <Stack.Screen
          name={ScreenNames.AuthScreens.LOGIN}
          component={Login}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.AuthScreens.CONFIRM_SMS}
          component={ConfirmSms}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.AuthScreens.NEW_ACCOUNT}
          component={NewAccount}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.AuthScreens.PROFILE_PHOTO}
          component={ProfilePhoto}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.MAIN_SCREEN}
          component={MainScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.CONTEST_TAB_SCREEN}
          component={ContestTabs}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.GIFT_SCREEN}
          component={GiftScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.WATCH_STYLE}
          component={WatchStyle}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.VOTE_AND_WIN}
          component={VoteAndWin}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.RANKING_DETAILS_SCREEN}
          component={RankingDetails}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.ACCOUNT}
          component={Account}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.HOME}
          component={Home}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.LIVE_SHOW}
          component={LiveShow}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.PAYMENT}
          component={Payment}
          options={screenOptions}
        />
        <Stack.Screen
          name={ScreenNames.HomeScreens.ADDRESS}
          component={Address}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation
