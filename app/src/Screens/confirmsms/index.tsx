import React, { useEffect, useState } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import { Header, Left, Button, Icon, Right, Body } from 'native-base'
import Text from './../../components/Text'

import OTPTextInput from 'react-native-otp-textinput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation, useRoute } from '@react-navigation/native'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'
import { globalStyles } from '../../utils/globalStyles'
import Loader from '../../components/Loader'
import { ScreenNames } from '../../utils/ScreenNames'
import {
  userInit,
  userInitFailure,
  userInitSuccess
} from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import {
  User,
  VerifyCodeQuery,
  useVerifyCodeLazyQuery
} from '../../generated/graphql'
import client from '../../graphql/client'

export default function ConfirmSms() {
  const navigation = useNavigation()
  const { params } = useRoute<any>()
  const [otp, setOTP] = useState('')

  const [
    verifyCode,
    { data, loading, error: errorVerifyCode }
  ] = useVerifyCodeLazyQuery()

  const dispatch = useDispatch()

  const { setItem, error } = useSecureStore()

  const verifyOTP = async () => {
    verifyCode({
      variables: {
        code: otp,
        phone: `+1${params?.phone}`
      }
    })
    dispatch(userInit())
  }

  useEffect(() => {
    if (!data) return
    dispatch(userInitSuccess(data?.verify_code as User))
    navigateToMainScreen(data)
  }, [data])

  useEffect(() => {
    if (errorVerifyCode) dispatch(userInitFailure(errorVerifyCode))
  }, [errorVerifyCode])

  useEffect(() => {
    if (otp.length === 6 && !error) {
      verifyOTP()
    }
  }, [otp])

  const navigateToMainScreen = async (data?: VerifyCodeQuery) => {
    if (data?.verify_code?.username) {
      await setItem(StorageKeys.USER, data.verify_code)
      await setItem(StorageKeys.AUTH_TOKEN, data.verify_code.token)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ScreenNames.HomeScreens.MAIN_SCREEN
          }
        ]
      })
    } else {
      navigation.navigate(ScreenNames.AuthScreens.NEW_ACCOUNT, {
        user: data?.verify_code
      })
    }
  }

  return (
    <View style={globalStyles.container}>
      <Loader isLoading={loading} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ justifyContent: 'center' }}
      >
        <Header style={{ elevation: 0, backgroundColor: 'transparent' }}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" style={{ color: 'black' }} />
            </Button>
          </Left>
          <Body
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={require('./../../../assets/logo.png')}
              style={{ height: 60, width: 120 }}
            />
          </Body>
          <Right style={{ flex: 1 }}></Right>
        </Header>
        <View style={[styles._innerView]}>
          <Image
            source={require('../../../assets/device.png')}
            style={styles._deviceImg}
          />
          <Text style={styles._desc}>
            We just texted you a code to confirm your identity
          </Text>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <OTPTextInput
              textInputStyle={{ borderWidth: 1, borderRadius: 5 }}
              inputCount={6}
              autoFocus={true}
              handleTextChange={(text: string) => {
                setOTP(text)
              }}
            />
          </View>
          <TouchableOpacity
            style={[styles._confirmBtn, theme.bg]}
            onPress={() => {
              if (otp.length === 6 && !error) {
                verifyOTP()
              } else {
                alert('Enter valid OTP')
              }
            }}
          >
            <Text style={styles._confirmBtn_text}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
