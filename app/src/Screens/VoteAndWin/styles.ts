import { StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import FontNames from '../../utils/Fonts/FontNames'
import { globalStyles } from '../../utils/globalStyles'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'

const PROFILE_PIC_SIZE = 80

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(7.5),
    marginTop: hp(2.2)
  },
  headerStyle: {
    marginTop: hp(7),
    marginBottom: hp(3.5)
  },
  profilePic: {
    width: PROFILE_PIC_SIZE,
    height: PROFILE_PIC_SIZE,
    borderRadius: PROFILE_PIC_SIZE / 2
  },
  username: {
    fontSize: RFValue(22),
    fontFamily: FontNames.POPPINS_MEDIUM,
    paddingHorizontal: wp(6)
  },
  buttonStyle: {
    backgroundColor: AppColors.BLACK,
    flex: 0,
    margin: 0,
    marginVertical: hp(1)
  },
  buttonTextStyle: {
    color: AppColors.WHITE,
    fontSize: RFValue(18),
    fontFamily: FontNames.POPPINS_MEDIUM
  },
  buttonsGroup: {
    marginTop: hp(2.25),
    marginBottom: hp(1.4)
  },
  rankingContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: wp(3.4),
    paddingHorizontal: wp(4),
    paddingTop: wp(3.6),
    paddingBottom: wp(3)
  },
  textStyle: {
    ...globalStyles.primaryText,
    ...globalStyles.alignSelfCenter
  },
  yourRanking: {
    fontFamily: FontNames.POPPINS_MEDIUM,
    paddingBottom: wp(2)
  },
  containerStyle: {
    ...globalStyles.rowContainer,
    ...globalStyles.alignItemCenter,
    justifyContent: 'space-between'
  },
  itemSeparator: {
    width: wp(4),
    height: hp(4)
  },
  footer: {
    height: hp(6)
  }
})

export default styles
