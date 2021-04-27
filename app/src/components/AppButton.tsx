import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  title: string
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const AppButton = ({ title, onPress, containerStyle, textStyle }: Props) => {
  return (
    <TouchableOpacity
      style={[globalStyles.buttonContainer, containerStyle]}
      onPress={onPress}
    >
      <Text style={[globalStyles.primaryButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton
