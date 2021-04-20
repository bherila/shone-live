import React from 'react'
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageStyle
} from 'react-native'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  iconUri: ImageSourcePropType
  onPress: () => void
  iconStyle?: ImageStyle
}

const RoundIconButton = ({ iconUri, onPress, iconStyle }: Props) => {
  return (
    <TouchableOpacity
      style={globalStyles.roundIconButtonContainer}
      onPress={onPress}
    >
      <Image style={iconStyle} source={iconUri} />
    </TouchableOpacity>
  )
}

export default RoundIconButton
