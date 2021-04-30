import React from 'react'
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  iconUri: ImageSourcePropType
  onPress: () => void
  iconStyle?: ImageStyle
  containerStyle?: StyleProp<ViewStyle>
}

const RoundIconButton = ({
  iconUri,
  onPress,
  iconStyle,
  containerStyle,
}: Props) => {
  return (
    <TouchableOpacity
      style={[globalStyles.roundIconButtonContainer, containerStyle]}
      onPress={onPress}
    >
      <Image style={iconStyle} source={iconUri} />
    </TouchableOpacity>
  )
}

export default RoundIconButton
