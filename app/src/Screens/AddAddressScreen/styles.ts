import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'
import FontNames from '../../utils/Fonts/FontNames'

const styles = StyleSheet.create({
  submitButtonContainer: {
    margin: widthPercentageToDP(4),
  },
  _container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  submitText: {
    fontFamily: FontNames.POPPINS_SEMIBOLD,
    color: AppColors.WHITE,
    fontSize: RFValue(16),
  },
  justifyBeetween: {
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 20, alignSelf: 'center' },
  headerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { elevation: 0, backgroundColor: 'transparent' },
  backButton: {
    color: AppColors.BLACK,
    alignSelf: 'center',
  },
})

export default styles
