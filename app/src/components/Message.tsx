import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './../Screens/Home/styles'

interface Props {
  profilePic: string
  alias: string
  message: string
}

const Message = ({ profilePic, alias, message }: Props) => {
  return (
    <View style={styles._chatRow}>
      <Image
        source={{
          uri: profilePic ? profilePic : require('../../../assets/chatIcon.png')
        }}
        style={styles._userProfile}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles._name}>{alias}</Text>
        <Text style={styles._message}>{message}</Text>
      </View>
    </View>
  )
}

export default React.memo(Message)
