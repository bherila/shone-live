import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  title: string
  onPress: () => void
}

const AppButton = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={globalStyles.buttonContainer} onPress={onPress}>
      <Text style={globalStyles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton
