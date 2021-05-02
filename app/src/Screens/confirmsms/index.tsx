import React, { useEffect, useState } from 'react'
import { Image, View, TouchableOpacity, Alert, Text } from 'react-native'

import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'
import { globalStyles } from '../../utils/globalStyles'
import Loader from '../../components/Loader'
import { ScreenNames } from '../../utils/ScreenNames'
import { userInit, userInitSuccess } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import {
  User,
  VerifyCodeQuery,
  useVerifyCodeLazyQuery,
} from '../../generated/graphql'
import AppStrings from '../../utils/Strings'
import { SafeAreaView } from 'react-native-safe-area-context'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AppButton from '../../components/AppButton'
import ErrorText from '../../components/ErrorText'

export default function ConfirmSms() {
  const navigation = useNavigation()
  const { params } = useRoute<any>()
  const [otp, setOTP] = useState('')

  const [
    verifyCode,
    { data, loading, error: errorVerifyCode },
  ] = useVerifyCodeLazyQuery()

  const dispatch = useDispatch()

  const { setItem, error } = useSecureStore()

  const verifyOTP = async (OTP: string) => {
    if (OTP.length == 6) {
      verifyCode({
        variables: {
          code: OTP,
          phone: `+91${params?.phone}`,
        },
      })
      dispatch(userInit())
    }
  }

  useEffect(() => {
    if (!data) return
    dispatch(userInitSuccess(data?.verify_code as User))
    navigateToMainScreen(data)
  }, [data])

  useEffect(() => {
    if (errorVerifyCode) {
      Alert.alert(errorVerifyCode.message)
    }
  }, [errorVerifyCode])

  useEffect(() => {
    verifyOTP(otp)
  }, [otp])

  const navigateToMainScreen = async (data?: VerifyCodeQuery) => {
    if (data?.verify_code?.username) {
      await setItem(StorageKeys.USER, data.verify_code)
      await setItem(StorageKeys.AUTH_TOKEN, data.verify_code.token)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ScreenNames.HomeScreens.MAIN_SCREEN,
          },
        ],
      })
    } else {
      navigation.navigate(ScreenNames.AuthScreens.NEW_ACCOUNT, {
        user: data?.verify_code,
      })
    }
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Loader isLoading={loading} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={globalStyles.rowContainer}>
          <TouchableOpacity
            style={globalStyles.colorlessContainer}
            onPress={navigation.goBack}
          >
            <Image
              source={require('../../../assets/left_arrow.png')}
              style={globalStyles.defaultIconStyle}
            />
          </TouchableOpacity>

          <Text style={globalStyles.textHeader1}>
            {AppStrings.confirmOTP.verification}
          </Text>
          <View style={globalStyles.colorlessContainer} />
        </View>

        <Text style={globalStyles.textBody1}>
          {AppStrings.confirmOTP.we_sent_the_code}
        </Text>
        <View style={styles.otpBlockWrapper}>
          <OTPInputView
            style={styles.otpWrapper}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles._codeInput}
            codeInputHighlightStyle={styles.focusedInput}
            editable
            placeholderCharacter="x"
            keyboardType="phone-pad"
            keyboardAppearance="dark"
            onCodeChanged={(otp) => setOTP(otp)}
          />
          {errorVerifyCode ? (
            <ErrorText error={errorVerifyCode.message} />
          ) : null}
        </View>

        <AppButton
          title={AppStrings.util.next}
          onPress={() => {
            verifyOTP(otp)
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
