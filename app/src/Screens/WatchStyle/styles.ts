import { StyleSheet } from 'react-native'
import FontNames from '../../utils/Fonts/FontNames'
import { RFValue } from 'react-native-responsive-fontsize'
import { AppColors } from '../../utils/colors'

export default StyleSheet.create({
  video: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#00000099',
  },
  bottomView: {
    alignSelf: 'center',
    width: '100%',
    bottom: 0,
    paddingBottom: 50,
  },
  bottomTextButtonShareContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottomViewWrapper: {
    alignSelf: 'center',
    paddingBottom: 100,
  },
  textStyle: {
    fontFamily: FontNames.POPPINS_REGULAR,
    color: AppColors.WHITE,
    fontSize: RFValue(16),
  },

  seePriceButtonContainer: {
    backgroundColor: AppColors.BLACK,
    flex: 0,
    paddingVertical: 8,
  },
  shareIcon: {
    width: 43,
    height: 38,
  },
})
