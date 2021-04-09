// eslint-disable-next-line no-use-before-define
import React, { useState, useEffect } from 'react'
import { Image, View, TouchableOpacity, Keyboard } from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import { Card, CardItem, Body, Item, Icon, Button } from 'native-base'
import { EvilIcons, FontAwesome } from '@expo/vector-icons'

import Text from './../../components/Text'
//@ts-ignore
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { TextInputMask } from 'react-native-masked-text'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@apollo/client'
import { ADD_USER } from '../../graphql/mutations/addUser'
import {
  AddUser,
  AddUserVariables
} from '../../graphql/mutations/types/AddUser'
import { globalStyles } from '../../utils/globalStyles'
import Loader from '../../components/Loader'

export default function Login() {
  const navigation = useNavigation()

  const [mobile, setMobile] = useState('')

  const [addUser, { data, error, loading }] = useMutation<
    AddUser,
    AddUserVariables
  >(ADD_USER, {
    variables: {
      phone: mobile
    }
  })

  useEffect(() => {
    if (mobile.length === 12) {
      Keyboard.dismiss()
    }
  }, [mobile])

  useEffect(() => {
    if (error) return
    if (data?.addUser) {
      navigation.navigate('ConfirmSms', {
        phone: mobile
      })
    }
  }, [data, error, loading])

  const onContinue = () => {
    if (mobile.replace(/-/g, '')?.length === 10) {
      addUser()
      // navigation.navigate('ConfirmSms')
    } else {
      alert('Please enter correct mobile number')
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={globalStyles.container}>
      <Loader isLoading={loading} />
      <View style={{ flex: 1 }}>
        <View style={styles._logView}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles._logo}
          />
        </View>
        <View style={[styles._bodyView, theme.bg]}>
          <View style={{ flex: 1 }}>
            <Card style={styles._card}>
              <CardItem>
                <Body>
                  <Text style={styles._login_desc}>
                    For fast and easy login, we'll need your digits. Don't ``
                    worry about remembering your password for later.
                  </Text>
                </Body>
              </CardItem>
              <Item style={[styles._inputFiled, theme.borderColor]}>
                <Icon active name="call" style={theme.iconColor} />
                <Text
                  style={{ fontWeight: 'bold', fontSize: 18, color: 'grey' }}
                >
                  +1{' '}
                </Text>

                <TextInputMask
                  style={styles._input}
                  type={'cel-phone'}
                  autoFocus={true}
                  options={{
                    //@ts-ignore
                    maskType: 'BRL', // for international set it -&amp;nbsp;INTERNATIONAL type masking
                    withDDD: true,
                    dddMask: '999-999-9999' // this is a your define formatting you use according to your requirment
                  }}
                  maxLength={12} // set length according to your input requirment
                  onChangeText={text => {
                    setMobile(text)
                  }}
                  value={mobile}
                  placeholder={'###-###-####'}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  keyboardType={'number-pad'}
                />
              </Item>
              <Button
                style={[styles._continue_btn, theme.bg]}
                onPress={() => onContinue()}
              >
                <Text style={styles._btn_text}>Continue</Text>
              </Button>
            </Card>
            <View style={{ flex: 1 }}>
              <Text style={styles._footer_text}>Or sign in with</Text>

              <View style={styles._fotter_row}>
                <TouchableOpacity style={styles._fb_btn}>
                  <EvilIcons name="sc-facebook" size={50} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles._apple_btn}>
                  <FontAwesome name="apple" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles._footerBox}>
              <Text style={styles._box_text}>
                By clicking send, you accept our terms of service and privacy
                policy.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}
