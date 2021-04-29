import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: hp(7),
  },
  buttonStyle: {
    flex: 1,
    paddingHorizontal: 8,
    marginVertical: 0,
  },
  tabHeaderButton: {
    paddingVertical: 10,
  },
  itemSeparator: {
    width: wp(3),
  },
  selectedTabHeader: {
    backgroundColor: AppColors.BLACK,
    borderRadius: 0,
  },
  selectedTabHeaderText: {
    color: AppColors.WHITE,
  },
  nonSelectedTabHeader: {
    backgroundColor: AppColors.WHITE,
    borderRadius: 0,
  },
  nonSelectedTabHeaderText: {
    color: AppColors.BLACK,
  },
  pagerHeaderGroup: {
    borderRadius: wp(3.5),
    overflow: 'hidden',
    backgroundColor: AppColors.WHITE,
    borderWidth: 1,
    borderColor: AppColors.BLACK,
  },
  topCreatorListWrapper: {
    width: '100%',
    position: 'absolute',
  },
  tabContainerStyle: {
    elevation: 0,
    borderColor: 'transparent',
    height: 0,
    marginTop: hp(7),
  },
})

export default styles
