import { StyleSheet } from 'react-native'
import { AppColors } from '../../utils/colors'

const styles = StyleSheet.create({
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
    width: '100%',
  },
  otpInput: { borderWidth: 1, borderRadius: 5 },
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
    // borderTopWidth: 1,
    // borderBottomWidth: 1,
    // borderRightWidth: 1,
    // borderLeftWidth: 1,
    padding: 2,
    // borderRadius: 10,
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
  justifyCenter: {
    justifyContent: 'center',
  },
  headerStyle: { elevation: 0, backgroundColor: 'transparent' },
  iconStyle: { color: AppColors.BLACK },
})

export default styles
