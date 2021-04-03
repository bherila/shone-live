import React, { useEffect, useState } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import { Header, Left, Button, Icon, Right, Body } from 'native-base'
import Text from './../../components/Text'
import OTPTextInput from 'react-native-otp-textinput'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'

export default function ConfirmSms() {
  const navigation = useNavigation()
  const [otp, setOTP] = useState('')

  const { setItem, error } = useSecureStore()

  useEffect(() => {
    if (otp.length === 6 && !error) {
      navigateToMainScreen()
    }
  }, [otp])

  const navigateToMainScreen = async () => {
    await setItem(StorageKeys.AUTH_TOKEN, 'fake_token')
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainScreen',
        },
      ],
    })
  }

  const onConfirm = () => {
    if (otp.length === 6 && !error) {
      navigateToMainScreen()
    } else {
      alert('Enter valid otp')
    }
  }

  return (
    <View style={styles.container}>
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
              alignItems: 'center',
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
              width: '100%',
            }}
          >
            <OTPTextInput
              textInputStyle={{ borderWidth: 1, borderRadius: 5 }}
              inputCount={6}
              autoFocus={true}
              handleTextChange={(text) => {
                setOTP(text)
              }}
            />
          </View>
          <TouchableOpacity
            style={[styles._confirmBtn, theme.bg]}
            onPress={() => onConfirm()}
          >
            <Text style={styles._confirmBtn_text}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}
