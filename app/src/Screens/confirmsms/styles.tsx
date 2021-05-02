import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'
import { globalStyles } from '../../utils/globalStyles'

const styles = StyleSheet.create({
  otpWrapper: {
    height: widthPercentageToDP(20),
    width: '100%',
    margin: 0,
  },
  otpBlockWrapper: {
    marginBottom: widthPercentageToDP(4),
  },
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: AppColors.WHITE,
  },
  headerBody: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInputWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  otpInput: {
    ...globalStyles.textBody1,
  },
  focusedInput: {
    ...globalStyles.textBody1,
    borderColor: AppColors.NEUTRAL_PRIMARY,
  },
  headerLogo: { height: 60, width: 120 },
  _innerView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    paddingTop: 0,
  },
  _deviceImg: {
    height: 230,
    width: 230,
    marginBottom: 20,
    alignSelf: 'center',
  },
  _desc: {
    color: '#525252',
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  _codeInput: {
    height: widthPercentageToDP(15),
    width: widthPercentageToDP(11.5),
    alignItems: 'center',
    justifyContent: 'center',
    ...globalStyles.textBody1,
    ...globalStyles.input,
  },
  _confirmBtn: {
    // width: 350,
    padding: 8,
    borderRadius: 5,
    // alignSelf: "center",
    marginTop: 80,
  },
  _confirmBtn_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    color: AppColors.WHITE,
    fontSize: 18,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    paddingVertical: widthPercentageToDP(5),
    paddingHorizontal: widthPercentageToDP(5),
  },
  headerStyle: { elevation: 0, backgroundColor: 'transparent', borderWidth: 0 },
  iconStyle: { color: AppColors.BLACK },
})

export default styles
