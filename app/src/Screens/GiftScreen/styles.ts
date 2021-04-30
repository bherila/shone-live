import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'

const styles = StyleSheet.create({
  closeIcon: {
    width: wp(4),
    height: wp(4),
    tintColor: AppColors.BLACK,
  },
  closeIconContainer: {
    alignSelf: 'flex-end',
    padding: wp(4),
  },
})

export default styles
