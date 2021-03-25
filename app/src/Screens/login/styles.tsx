import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  _logView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(246,246,246)',
  },
  _bodyView: {
    flex: 1,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    marginLeft: -40,
    marginRight: -40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  _logo: {
    height: 100,
    width: 290,
    alignSelf: 'center',
    marginBottom: 20,
  },
  _inputFiled: {
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 5,
    alignSelf: 'center',
    width: '96%',
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  _card: {
    width: '78%',
    marginTop: -110,
    padding: 10,
    borderRadius: 10,
  },
  _input: {
    // textAlign: "center",
    flex: 1,
    color: 'grey',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18,
  },
  _continue_btn: {
    width: '96%',
    marginVertical: 20,
    height: 55,
    borderRadius: 10,
  },
  _btn_text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  _login_desc: {
    textAlign: 'center',
    fontSize: 18,
    color: '#525252',
  },
  _footer_text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '300',
    fontSize: 17,
  },
  _fotter_row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  _fb_btn: {
    height: 60,
    width: 60,
    backgroundColor: '#4166b2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  _apple_btn: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
  },
  _footerBox: {
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
  },
  _box_text: {
    textAlign: 'center',
  },
})

export default styles
