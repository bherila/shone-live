import { StyleSheet } from 'react-native'
import { AppColors } from '../../utils/colors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: wp(5),
    backgroundColor: AppColors.PRIMARY_BACKGROUND,
  },
  listSeparator: {
    height: wp(18) / 2,
    zIndex: -1,
  },
  listFooter: {
    height: wp(22),
  },
})
export default styles
