import React from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../utils/globalStyles'
import styles from './styles'

const index = () => {
  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text>Hello there</Text>
    </View>
  )
}

export default index
