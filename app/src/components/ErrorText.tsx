import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { AppColors } from '../utils/colors'
import FontSizes from '../utils/FontSizes'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  error: string
}

const ErrorText = ({ error }: Props) => {
  return <Text style={[globalStyles.textBody1, styles.errorText]}>{error}</Text>
}

export default ErrorText

const styles = StyleSheet.create({
  errorText: {
    color: AppColors.ERROR_PRIMARY,
    textAlign: 'left',
    fontSize: FontSizes.EXTRA_SMALL_12,
    margin: 0,
    marginHorizontal: widthPercentageToDP(3),
    marginVertical: widthPercentageToDP(2),
  },
})
