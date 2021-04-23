import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import theme, { AppColors } from '../utils/colors'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  isLoading: boolean
  progress?: number
  total?: number
  isProgressShown?: boolean
}

const Loader = ({ isLoading, progress, total, isProgressShown }: Props) => {
  return isLoading ? (
    <View
      style={[
        globalStyles.absoluteView,
        globalStyles.absolouteCenter,
        globalStyles.loader
      ]}
    >
      <ActivityIndicator size="large" color={theme.textColor.color} />
      {isProgressShown && (
        <Text style={{ fontSize: 30, color: AppColors.WHITE }}>
          {progress}/100
        </Text>
      )}
    </View>
  ) : null
}

export default Loader
