// eslint-disable-next-line no-use-before-define
import React from 'react'
import { SafeAreaView, View, Image } from 'react-native'
import { Body, Header, Left, Button, Text, Title } from 'native-base'
import { useNavigation } from '@react-navigation/core'
import { FlatList } from 'react-native-gesture-handler'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons'
import { AppColors } from '../../utils/colors'

export default function Payment() {
  const navigation = useNavigation()

  const details = [
    {
      name: 'JESSICA SMITH',
      type: 'Default payment method',
      card: 'Mastercard (0000)',
      exp: '02/21',
    },
    {
      name: 'JESSICA',
      type: 'Set as default payment method',
      card: 'Mastercard (0000)',
      exp: '02/21',
    },
    {
      name: 'JESSICA SMITH',
      type: 'Set as default payment method',
      card: 'Mastercard (0000)',
      exp: '03/21',
    },
  ]

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles._viewcard}>
        <Text
          style={[
            item.type === 'Default payment method' ? null : { color: 'blue' },
            styles._texttype,
          ]}
        >
          {item.type}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles._textname}>{item.card}</Text>
            <Text style={styles._textname}>{item.name}</Text>
            <Text style={styles._textname}>Exp: {item.exp}</Text>
          </View>
          <Image
            style={styles._imagecard}
            source={require('../../../assets/mastercard.png')}
            resizeMode={'contain'}
          />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header style={{ elevation: 0, backgroundColor: 'transparent' }}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color="black"
              style={{ alignSelf: 'center' }}
            />
            <Text style={{ color: AppColors.BLACK, alignSelf: 'center' }}>
              Back
            </Text>
          </Button>
        </Left>
        <Body
          style={{
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <Title style={{ fontSize: 20, alignSelf: 'center' }}>Payments</Title>
        </Body>
      </Header>
      <FlatList
        data={details}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button style={{ alignSelf: 'center', justifyContent: 'flex-end' }}>
        <Text>Add New Payment Method</Text>
      </Button>
    </SafeAreaView>
  )
}
