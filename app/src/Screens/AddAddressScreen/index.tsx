import { Body, Button, Header, Left, Right, Title } from 'native-base'
import React, { useState } from 'react'
import { TextInput, Alert, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../../utils/globalStyles'
import styles from './styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { useAddAddressMutation } from '../../generated/graphql'
import { useAppSelector } from '../../redux/store'

const index = () => {
  const navigation = useNavigation()
  const userId = useAppSelector((state) => state.user.user?.id)

  const [city, setCity] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [line1, setLine1] = useState<string>('')
  const [line2, setLine2] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')

  const handleSubmit = () => {
    if (
      city &&
      country &&
      line1 &&
      postalCode &&
      state &&
      name &&
      phone &&
      userId
    ) {
      console.log('Success')
      addAddress({
        variables: {
          address: {
            city,
            country,
            line1,
            line2,
            name,
            phone,
            postalCode,
            state,
            userId,
          },
        },
      })
    } else {
      Alert.alert('Please enter all the necessary details')
    }
  }

  const [addAddress, { data, error, loading }] = useAddAddressMutation()

  return (
    <SafeAreaView style={globalStyles.container}>
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
          <Title style={styles.headerTitle}>Add Address</Title>
        </Body>
        <Right style={styles._container}></Right>
      </Header>

      <View style={{ marginTop: 32 }}>
        <TextInput
          style={globalStyles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          placeholder="Enter City"
          style={globalStyles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
        />

        <TextInput
          placeholder="Address Line 1"
          style={globalStyles.input}
          value={line1}
          onChangeText={(text) => setLine1(text)}
        />
        <TextInput
          placeholder="Address Line 2"
          style={globalStyles.input}
          value={line2}
          onChangeText={(text) => setLine2(text)}
        />
        <TextInput
          placeholder="Postal Code"
          style={globalStyles.input}
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
        />
        <TextInput
          placeholder="State"
          style={globalStyles.input}
          value={state}
          onChangeText={(text) => setState(text)}
        />
        <TextInput
          placeholder="Enter Country"
          style={globalStyles.input}
          value={country}
          onChangeText={(text) => setCountry(text)}
        />
      </View>

      <Button block style={styles.submitButtonContainer}>
        <Text style={styles.submitText}>Submit</Text>
      </Button>
    </SafeAreaView>
  )
}

export default index
