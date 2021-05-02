import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { Body, Button, Header, Left, Title, Right } from 'native-base'
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import styles from './styles'
import { globalStyles } from '../../utils/globalStyles'
import { ScreenNames } from '../../utils/ScreenNames'

interface CardDetails {
  name: string
  type: string
  add: string
  city: string
  mo_no: string
  state: string
  no: string
}

interface ListItem {
  item: CardDetails
  index?: number
}

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

export default function Address() {
  const navigation = useNavigation()

  const renderItem = ({ item }: ListItem) => {
    return (
      <TouchableOpacity>
        <View style={styles._viewcard}>
          <View
            style={[
              globalStyles.rowContainer,
              globalStyles.alignItemCenter,
              styles.justifyBeetween,
            ]}
          >
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
            <Ionicons name="chevron-forward-outline" size={22} color="black" />
          </View>
          <View>
            <Text style={styles._textname}>{item.card}</Text>
            <Text style={styles._textname}>{item.name}</Text>
            <Text style={styles._textname}>{item.add}</Text>
            <Text style={styles._textname}>{item.city}</Text>
            <Text style={styles._textname}>{item.mo_no}</Text>
            <Text style={styles._textname}>{item.state}</Text>
            <Text style={styles._textname}>{item.no}</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles._container}>
      <Header style={styles.header}>
        <Left style={styles._container}>
          <Button transparent onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={32}
              color="black"
              style={globalStyles.alignItemCenter}
            />
            <Text style={styles.backButton}>Back</Text>
          </Button>
        </Left>
        <Body style={styles.headerBody}>
          <Title style={styles.headerTitle}>Addresses</Title>
        </Body>
        <Right style={styles._container}></Right>
      </Header>
      <FlatList
        data={details}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Button
        style={styles.addAddressButtonContainer}
        onPress={() =>
          navigation.navigate(ScreenNames.HomeScreens.ADD_ADDRESS_SCREEN)
        }
      >
        <Text style={styles.addButtonText}>Add new delivery address</Text>
      </Button>
    </SafeAreaView>
  )
}
