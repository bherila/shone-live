import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { Body, Button, Header, Left, Title, Text } from 'native-base'
import { SafeAreaView, FlatList, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'
import { AppColors } from '../../utils/colors'

export default function Address() {
  const navigation = useNavigation()

  const details = [
    {
      name: 'Jessica smith',
      type: 'Default delivery address',
      add: '23 Industrial blvd, 56',
      city: 'New Castle',
      mo_no: '19032-2013',
      state: 'DE(Delaware)',
      no: '(302)687-6775',
    },
    {
      name: 'Jessica',
      type: 'Set as default delivery address',
      add: '23 Industrial blvd, 56',
      city: 'New Castle',
      mo_no: '19032-2013',
      state: 'DE(Delaware)',
      no: '(302)687-6775',
    },
  ]

  const renderItem = ({ item }: any) => {
    return (
      <>
        <View style={styles._viewcard}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text
                style={[
                  item.type === 'Default delivery address'
                    ? null
                    : { color: 'blue' },
                  styles._texttype,
                ]}
              >
                {item.type}
              </Text>
              <Text style={styles._textname}>{item.card}</Text>
              <Text style={styles._textname}>{item.name}</Text>
              <Text style={styles._textname}>{item.add}</Text>
              <Text style={styles._textname}>{item.city}</Text>
              <Text style={styles._textname}>{item.mo_no}</Text>
              <Text style={styles._textname}>{item.state}</Text>
              <Text style={styles._textname}>{item.no}</Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="black"
              style={{ alignSelf: 'flex-start' }}
            />
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.5,
            marginHorizontal: 10,
            borderColor: '#DCDCDC',
          }}
        />
      </>
    )
  }

  return (
    <SafeAreaView style={styles._container}>
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
          <Title style={{ fontSize: 20, alignSelf: 'center' }}>Addresses</Title>
        </Body>
      </Header>
      <FlatList
        data={details}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button style={{ alignSelf: 'center', justifyContent: 'flex-end' }}>
        <Text>Add new delivery address</Text>
      </Button>
    </SafeAreaView>
  )
}
