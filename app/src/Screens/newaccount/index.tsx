// eslint-disable-next-line no-use-before-define
import React, { createRef, useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import { Body, Item, Icon, Button, Header, Left, Right } from 'native-base'
import Text from './../../components/Text'
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { useMutation } from '@apollo/client'
import {
  UpdateUser,
  UpdateUserVariables,
} from '../../graphql/mutations/types/UpdateUser'
import { UPDATE_USER } from '../../graphql/mutations/updateUser'
import {
  VerifyCode,
  VerifyCode_verifyCode,
} from '../../graphql/queries/types/VerifyCode'
import { ScreenNames } from '../../utils/ScreenNames'
import { globalStyles } from '../../utils/globalStyles'
import Loader from '../../components/Loader'
import { SafeAreaView } from 'react-native-safe-area-context'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'
import {
  userInit,
  userInitFailure,
  userInitSuccess,
} from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'

interface IParams extends ParamListBase {
  NewAccount: {
    user: VerifyCode_verifyCode
  }
}

export default function NewAccount() {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<IParams, 'NewAccount'>>()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')

  const { setItem, error } = useSecureStore()
  const dispatch = useDispatch()

  let lnameRef = createRef<TextInput>()
  let emailRef = createRef<TextInput>()
  console.log({ route })

  const [
    updateUser,
    { data: userData, loading, error: userUpdateError },
  ] = useMutation<UpdateUser, UpdateUserVariables>(UPDATE_USER, {
    variables: {
      email: email,
      userID: route.params?.user?.id,
      username: 'AbhishekTagline5',
    },
  })

  useEffect(() => {
    console.log({ userData, loading, userUpdateError })

    if (userUpdateError) {
      dispatch(userInitFailure(userUpdateError))
      return Alert.alert(userUpdateError.message)
    }
    if (userData?.updateUser) {
      dispatch(userInitSuccess(userData.updateUser))
      navigateToProfileScreen(userData)
    }
  }, [userData, loading, userUpdateError])

  const onGo = () => {
    if (fname !== '' && lname !== '' && email !== '') {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (reg.test(email) === true) {
        dispatch(userInit())
        updateUser()
      } else {
        alert('Enter a valid email')
      }
    } else {
      alert('All fields are required!')
    }
  }

  const navigateToProfileScreen = async (data: UpdateUser) => {
    await setItem(StorageKeys.AUTH_TOKEN, data.updateUser.token)
    await setItem(StorageKeys.USER, data.updateUser)
    navigation.navigate(ScreenNames.AuthScreens.PROFILE_PHOTO)
  }

  return (
    <SafeAreaView style={[globalStyles.container, { height: '100%' }]}>
      <Loader isLoading={loading} />
      <KeyboardAwareScrollView>
        <View style={[globalStyles.container]}>
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
          <View style={styles._innerView}>
            <Text style={styles._desc}>Welcome. Create a new account.</Text>

            <Item regular style={styles._codeInput}>
              <TextInput
                autoFocus={true}
                placeholder="First name"
                placeholderTextColor={'grey'}
                style={styles._textinput}
                onChangeText={(text) => {
                  setFname(text)
                }}
                autoCapitalize={'none'}
                keyboardType={'default'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  lnameRef.current?.focus()
                }}
              />
            </Item>

            <Item regular style={styles._codeInput}>
              <TextInput
                ref={lnameRef}
                placeholder="Last name"
                placeholderTextColor={'grey'}
                style={styles._textinput}
                onChangeText={(text) => {
                  setLname(text)
                }}
                autoCapitalize={'none'}
                keyboardType={'default'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  emailRef.current?.focus()
                }}
              />
            </Item>

            <Item regular style={styles._codeInput}>
              <TextInput
                ref={emailRef}
                placeholder="Email address"
                placeholderTextColor={'grey'}
                style={styles._textinput}
                keyboardType="email-address"
                autoCapitalize={'none'}
                onChangeText={(text) => {
                  setEmail(text)
                }}
                returnKeyType={'done'}
                onSubmitEditing={() => {
                  onGo()
                }}
              />
            </Item>

            <TouchableOpacity
              style={[styles._confirmBtn, theme.bg]}
              onPress={() => onGo()}
            >
              <Text style={styles._confirmBtn_text}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
