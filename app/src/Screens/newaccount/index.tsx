/* eslint-disable no-useless-escape */
import React, { createRef, useState } from 'react'
import { View, TouchableOpacity, Image, TextInput } from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import { Body, Item, Icon, Button, Header, Left, Right } from 'native-base'
import Text from './../../components/Text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScreenNames } from '../../utils/ScreenNames'
import { globalStyles } from '../../utils/globalStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUpdateUserMutation } from '../../generated/graphql'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'

export default function NewAccount() {
  const navigation = useNavigation()
  const route = useRoute()

  const [updateUser] = useUpdateUserMutation()
  const { setItem } = useSecureStore()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const lnameRef = createRef<TextInput>()
  const usernameRef = createRef<TextInput>()
  const emailRef = createRef<TextInput>()
  const onGo = () => {
    if (username !== '' && email !== '') {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (reg.test(email) === true) {
        updateUser({
          variables: {
            user: {
              id: route.params?.user.id,
              username,
              email,
            },
          },
        }).then(async (updatedUser) => {
          await setItem(StorageKeys.USER, updatedUser.data?.update_user)
          await setItem(
            StorageKeys.AUTH_TOKEN,
            updatedUser.data?.update_user.token,
          )
          navigateToProfileScreen()
        })
      } else {
        alert('Enter a valid email')
      }
    } else {
      alert('All fields are required!')
    }
  }

  const navigateToProfileScreen = async () => {
    navigation.navigate(ScreenNames.AuthScreens.PROFILE_PHOTO, {
      username,
      email,
    })
  }

  return (
    <SafeAreaView style={[globalStyles.container, { height: '100%' }]}>
      <KeyboardAwareScrollView>
        <View style={[globalStyles.container]}>
          <Header style={{ elevation: 0, backgroundColor: 'transparent' }}>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: AppColors.BLACK }} />
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

            {/* <Item regular style={styles._codeInput}>
              <TextInput
                autoFocus={true}
                placeholder="First name"
                placeholderTextColor={'grey'}
                style={styles._textinput}
                onChangeText={text => {
                  setFname(text)
                }}
                autoCapitalize={'none'}
                keyboardType={'default'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  lnameRef.current?.focus()
                }}
              />
            </Item> */}

            {/* <Item regular style={styles._codeInput}>
              <TextInput
                ref={lnameRef}
                placeholder="Last name"
                placeholderTextColor={'grey'}
                style={styles._textinput}
                onChangeText={text => {
                  setLname(text)
                }}
                autoCapitalize={'none'}
                keyboardType={'default'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  emailRef.current?.focus()
                }}
              />
            </Item> */}

            <Item style={styles._codeInput}>
              <TextInput
                ref={usernameRef}
                placeholder="Username"
                placeholderTextColor={'grey'}
                style={styles._textinput}
                onChangeText={(text) => {
                  setUsername(text)
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
