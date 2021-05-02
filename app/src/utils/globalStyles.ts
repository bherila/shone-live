import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AppColors } from './colors'
import FontNames from './Fonts/FontNames'
import FontSizes from './FontSizes'

const ROUNDED_BUTTON_CONTAINER_SIZE = 80

const boldStyle = {
  fontFamily: FontNames.MONTSERRAT_BOLD,
  color: AppColors.NEUTRAL_PRIMARY,
  margin: wp(1.5),
}

const regularStyle = {
  fontFamily: FontNames.MONTSERRAT_REGULAR,
  color: AppColors.NEUTRAL_SECONDARY,
  margin: wp(1.5),
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: AppColors.WHITE,
  },
  input: {
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: AppColors.DIVIDER,
    padding: wp(4),
    marginTop: wp(6),
    backgroundColor: AppColors.BACKGROUND,
  },
  defaultIconStyle: {
    width: wp(6),
    height: wp(6),
  },
  darkContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: AppColors.PRIMARY_BACKGROUND,
  },
  colorlessContainer: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
  },
  absolouteCenter: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  loader: {
    backgroundColor: '#33333390',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: { flexDirection: 'row' },
  viewCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemCenter: {
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  header: {
    elevation: 0,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    borderRadius: wp(3.5),
    backgroundColor: AppColors.MAIN_PRIMARY,
    marginVertical: wp(4),
  },
  primaryButtonText: {
    fontSize: RFValue(20),
    fontFamily: 'bahnscift',
    color: AppColors.BLACK,
    textAlign: 'center',
  },
  shoneLogo: {
    height: wp(15),
    width: wp(30),
    alignSelf: 'center',
  },
  roundIconButtonContainer: {
    width: ROUNDED_BUTTON_CONTAINER_SIZE,
    height: ROUNDED_BUTTON_CONTAINER_SIZE,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: ROUNDED_BUTTON_CONTAINER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff50',
  },
  primaryText: {
    fontFamily: FontNames.POPPINS_REGULAR,
    fontSize: RFValue(18),
    color: AppColors.BLACK,
  },
  smallText: {
    fontFamily: FontNames.MONTSERRAT_REGULAR,
    fontSize: FontSizes.EXTRA_SMALL_12,
    textAlign: 'center',
    color: AppColors.LIGHT_GREY,
  },
  smallTextBlack: {
    color: AppColors.BLACK,
  },
  primaryTextMontserrat: {
    fontFamily: FontNames.MONTSERRAT_BOLD,
    fontSize: RFValue(18),
    color: AppColors.PRIMARY_GREY_TEXT,
  },
  transparentBackground: { backgroundColor: '#00000000' },

  textHeader1: {
    ...boldStyle,
    textAlign: 'center',
    fontSize: FontSizes.EXTRA_LARGE_24,
  },
  textHeader2: {
    ...boldStyle,
    textAlign: 'center',
    fontSize: FontSizes.REGULAR_18,
  },
  textHeader4: {
    ...boldStyle,
    textAlign: 'center',
    fontSize: FontSizes.EXTRA_SMALL_12,
  },
  textBody1: {
    ...regularStyle,
    textAlign: 'center',
    fontSize: FontSizes.SMALL_14,
  },
  textBody2: {
    ...regularStyle,
    textAlign: 'center',
    fontSize: FontSizes.EXTRA_SMALL_12,
  },
  colorNeutralPrimary: {
    color: AppColors.NEUTRAL_PRIMARY,
  },
  colorNeutralSecondary: {
    color: AppColors.NEUTRAL_SECONDARY,
  },
  textAlignStart: {
    textAlign: 'left',
  },
  zeroMargin: {
    margin: 0,
  },
})
