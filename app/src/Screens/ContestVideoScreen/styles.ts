import { StyleSheet } from 'react-native'
import { AppColors } from '../../utils/colors'
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import FontNames from '../../utils/Fonts/FontNames'
import { RFValue } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.PRIMARY_BACKGROUND,
  },
  shareIcon: {
    width: wp(7),
    height: wp(7),
    alignSelf: 'flex-end',
  },
  okayButton: {
    borderColor: AppColors.LIGHT_YELLOW,
    borderWidth: 2,
    backgroundColor: AppColors.WHITE,
    alignItems: 'center',
    padding: wp(3.5),
    marginHorizontal: wp(4),
    marginTop: wp(4),
    borderRadius: wp(4),
  },
  successIcon: { width: wp(21), height: wp(21), alignSelf: 'center' },
  modalStyle: { justifyContent: 'flex-end', margin: 0 },
  modalContainer: {
    backgroundColor: AppColors.WHITE,
    paddingBottom: heightPercentageToDP(8),
  },
  fullflex: {
    flex: 1,
  },
  buttonText: {
    fontFamily: FontNames.POPPINS_SEMIBOLD,
    color: AppColors.PRIMARY_GREY_TEXT,
  },
  successText: {
    fontFamily: FontNames.POPPINS_SEMIBOLD,
    padding: wp(4),
    fontSize: RFValue(24),
    color: AppColors.DARK_GREY,
  },
  successDescriptionText: {
    fontSize: RFValue(14),
    textAlign: 'center',
    paddingHorizontal: wp(8),
    color: AppColors.LIGHT_GREY,
  },
  header: {
    marginHorizontal: wp(4),
    marginBottom: wp(5),

    backgroundColor: AppColors.PRIMARY_BACKGROUND,
  },
  listSeparator: {
    height: wp(18) / 2,
    zIndex: -1,
  },
  listFooter: {
    height: wp(22),
  },
  headerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerStyle: {
    borderWidth: 2,
    backgroundColor: AppColors.DARK_GREY,
    width: wp(14),
    height: wp(14),
    borderColor: AppColors.DARK_GREY_BORDER,
  },
  iconStyle: { width: wp(6), height: wp(6) },
  modalImageStyle: {
    width: '100%',
    zIndex: -5,
    top: wp(-36),
    position: 'absolute',
  },
  shareButton: {
    backgroundColor: AppColors.LIGHT_YELLOW,
    padding: wp(4),
    marginHorizontal: wp(4),
    marginTop: wp(4),
    borderRadius: wp(4),
    alignItems: 'center',
  },
})
export default styles
