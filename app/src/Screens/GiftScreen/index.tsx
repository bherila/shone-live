import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Text, TouchableOpacity, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { globalStyles } from '../../utils/globalStyles'
import styles from './styles'

const index = () => {
  const { goBack } = useNavigation()
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity onPress={goBack} style={styles.closeIconContainer}>
        <Image
          style={styles.closeIcon}
          source={require('../../../assets/close.png')}
        />
      </TouchableOpacity>

      <Text style={globalStyles.primaryButtonText}>Gift Screen</Text>
    </SafeAreaView>
  )
}

export default index
