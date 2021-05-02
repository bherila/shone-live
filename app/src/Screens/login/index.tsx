/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import {
  Image,
  View,
  Keyboard,
  Alert,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import { AppColors } from './../../utils/colors'
import styles from './styles'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../utils/globalStyles'
import Loader from '../../components/Loader'
import { ScreenNames } from '../../utils/ScreenNames'
import { useAddUserMutation } from '../../generated/graphql'
import AppStrings from '../../utils/Strings'
import AppButton from '../../components/AppButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ErrorText from '../../components/ErrorText'

const MAX_LENGTH_MOBILE_INPUT = 14

const {
  accept_aggrement,
  privacy_policy,
  terms_of_service,
  hello,
  beautiful,
  enter_your_number,
  are_you_creator,
  lets_start,
} = AppStrings.login

const PhoneNumberSchema = Yup.object().shape({
  phone: Yup.string()
    .length(MAX_LENGTH_MOBILE_INPUT, AppStrings.errors.phone_number_length)
//    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g)
    .required()
    .label('Phone Number'),
})

export default function Login() {
  const navigation = useNavigation()

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: {
      phone: '',
    },
    validationSchema: PhoneNumberSchema,
    onSubmit: (values) => {
      onContinue(values)
    },
  })

  useEffect(() => {
    if (values.phone.length === MAX_LENGTH_MOBILE_INPUT) {
      Keyboard.dismiss()
    }
  }, [values])

  const [mobile, setMobile] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const [addUser, { data, error, loading }] = useAddUserMutation()

  useEffect(() => {
    if (error) return Alert.alert(error.message)
    if (data?.add_user) {
      navigation.navigate(ScreenNames.AuthScreens.CONFIRM_SMS, {
        phone: mobile,
      })
    }
  }, [data, error, loading])

  const onContinue = (values: { phone: string }) => {
    const finalNumber = values.phone.replace(/[()-/\s]/g, '')
    setMobile(finalNumber)
    addUser({
      variables: {
        phone: `${finalNumber}`,
      },
    })
  }

  const onBlur = () => {
    handleBlur('phone')
    setIsFocused(false)
  }

  return (
    <TouchableWithoutFeedback
      style={globalStyles.container}
      onPress={() => Keyboard.dismiss()}
    >
      <>
        <Loader isLoading={loading} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
        >
          <Image
            style={styles._logo}
            resizeMode="contain"
            source={require('../../../assets/logo.png')}
          />

          <View>
            <Text
              style={[
                globalStyles.textHeader1,
                globalStyles.colorNeutralSecondary,
              ]}
            >
              {`${hello} `}
              <Text style={globalStyles.textHeader1}>{`${beautiful},`}</Text>
            </Text>
            <Text style={globalStyles.textBody1}>{`${enter_your_number}`}</Text>

            <View>
              <TextInputMask
                style={[
                  globalStyles.input,
                  globalStyles.textBody1,
                  globalStyles.textAlignStart,
                  {
                    borderColor: isFocused
                      ? AppColors.NEUTRAL_PRIMARY
                      : AppColors.DIVIDER,
                  },
                ]}
                type={'cel-phone'}
                autoFocus={true}
                options={{
                  //@ts-ignore
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(999) 999-9999',
                }}
                keyboardAppearance="dark"
                maxLength={MAX_LENGTH_MOBILE_INPUT}
                onChangeText={handleChange('phone')}
                onBlur={onBlur}
                onFocus={() => setIsFocused(true)}
                blurOnSubmit
                value={values.phone}
                placeholder={`${AppStrings.login.phone_number_placeholder}`}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'number-pad'}
              />

              {errors.phone && touched.phone && (
                <ErrorText error={errors.phone} />
              )}
            </View>

            {!isFocused && (
              <Text
                style={[globalStyles.textBody2, styles.creatorTextContainer]}
              >
                {`${are_you_creator} `}
                <Text
                  style={[
                    globalStyles.textBody2,
                    globalStyles.colorNeutralPrimary,
                  ]}
                >{`${lets_start}`}</Text>
              </Text>
            )}

            <AppButton title={AppStrings.util.next} onPress={handleSubmit} />
          </View>

          <View style={styles.termsServicesContainer}>
            <Text style={globalStyles.textBody2}>
              {`${accept_aggrement} `}{' '}
              <Text
                style={globalStyles.colorNeutralPrimary}
              >{`${terms_of_service}`}</Text>{' '}
              {`${AppStrings.util.and} `}{' '}
              <Text
                style={globalStyles.colorNeutralPrimary}
              >{`${privacy_policy}`}</Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </>
    </TouchableWithoutFeedback>
  )
}
