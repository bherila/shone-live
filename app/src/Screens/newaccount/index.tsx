// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import {
  Body,
  Item,
  Icon,
  Input,
  Button,
  Header,
  Left,
  Right
} from 'native-base'
import Text from './../../components/Text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native'

export default function NewAccount() {
  const navigation = useNavigation()

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')

  const onGo = () => {
    if (fname !== '' && lname !== '' && email !== '') {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (reg.test(email) === true) {
        navigation.navigate('ProfilePhoto')
      } else {
        alert('Enter right email')
      }
    } else {
      alert('Fill up details')
    }
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
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
        <View style={styles._innerView}>

          <Text style={styles._desc}>
            Welcome. Create a new account.
          </Text>

          <Item regular style={styles._codeInput}>
            <Input
              placeholder="First name"
              onChangeText={(text) => { setFname(text) }}
              keyboardType={'default'}
              returnKeyType={'next'}
            />
          </Item>

          <Item regular style={styles._codeInput}>
            <Input
              placeholder="Last name"
              onChangeText={(text) => { setLname(text) }}
              keyboardType={'default'}
              returnKeyType={'next'}
            />
          </Item>

          <Item regular style={styles._codeInput}>
            <Input
              placeholder="Email address"
              keyboardType="email-address"
              onChangeText={(text) => { setEmail(text) }}
              returnKeyType={'done'} />
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
  )
}
