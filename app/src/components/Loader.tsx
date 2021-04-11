import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from '../Screens/login/styles'
import theme from '../utils/colors'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  isLoading: boolean
}

const Loader = ({ isLoading }: Props) => {
  return isLoading ? (
    <ActivityIndicator
      style={[
        globalStyles.absoluteView,
        globalStyles.absolouteCenter,
        globalStyles.loader,
      ]}
      size="large"
      color={theme.textColor.color}
    />
  ) : null
}

export default Loader
