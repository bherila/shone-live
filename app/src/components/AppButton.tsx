import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  StyleSheet,
} from 'react-native'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  title: string
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  leftIcon?: () => JSX.Element
  rightIcon?: () => JSX.Element
  disableDefaultIcon?: boolean
}

const AppButton = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  leftIcon,
  rightIcon,
  disableDefaultIcon,
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        globalStyles.buttonContainer,
        globalStyles.rowContainer,
        containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={[globalStyles.colorlessContainer, styles.iconContainer]}>
        {leftIcon?.()}
      </View>
      <Text
        style={[
          globalStyles.textHeader2,
          globalStyles.colorlessContainer,
          textStyle,
        ]}
      >
        {title}
      </Text>
      <View
        style={[
          globalStyles.colorlessContainer,
          styles.iconContainer,
          styles.rightIconContainer,
        ]}
      >
        {rightIcon ? (
          rightIcon()
        ) : !disableDefaultIcon ? (
          <Image
            source={require('../../assets/dots_3.png')}
            style={globalStyles.defaultIconStyle}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
  },
  rightIconContainer: {
    alignItems: 'flex-end',
  },
})
