import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'
import FontNames from '../../utils/Fonts/FontNames'

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomViewContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp(6),
  },
  voteIcon: {
    width: wp(4),
    height: wp(4),
  },
  heartIcon: {
    width: wp(5),
    height: wp(5),
  },
  closeIconContainer: {
    width: wp(16),
    height: wp(16),
    backgroundColor: AppColors.LIGHT_RED,
    borderRadius: wp(16) / 2,
    margin: wp(2),
  },
  likeIconContainer: {
    backgroundColor: 'transparent',
    borderColor: AppColors.LIGHT_YELLOW,
    borderWidth: 2,
    margin: wp(2),
  },
  titleText: {
    fontSize: RFValue(16),
    fontFamily: FontNames.POPPINS_REGULAR,
    color: AppColors.WHITE,
    textAlign: 'center',
    marginTop: wp(6),
  },
  authorNameText: {
    marginTop: 0,
    marginHorizontal: wp(4),
  },
  container: {
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    zIndex: 4,
  },
  bottomOverlay: {
    height: hp(25),
    position: 'absolute',
    zIndex: 2,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    flex: 1,
  },
})

export default styles
