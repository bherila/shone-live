import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'
import FontNames from '../../utils/Fonts/FontNames'

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  divider: {
    borderWidth: 0.5,
    marginHorizontal: 10,
    borderColor: '#DCDCDC',
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
  _viewcard: {
    marginHorizontal: 15,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  _texttype: {
    fontSize: 12,
    fontWeight: '600',
    // marginVertical: 10,
  },
  _textname: {
    fontSize: 12,
    fontWeight: '300',
    marginBottom: 5,
    color: 'grey',
  },
  _imagecard: {
    height: 25,
    width: 25,
    alignSelf: 'flex-start',
    // marginRight: 5
  },
  addAddressButtonContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: widthPercentageToDP(1),
    marginHorizontal: widthPercentageToDP(4),
  },
  addButtonText: {
    color: AppColors.WHITE,
    fontFamily: FontNames.POPPINS_SEMIBOLD,
  },
})

export default styles
