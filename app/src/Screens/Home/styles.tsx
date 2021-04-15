import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  _header: {
    // height: 100,
    // backgroundColor: "#00000069",
  },
  _bodySection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  _footer: {
    backgroundColor: '#00000069',
  },
  _chatRow: {
    flexDirection: 'row',
    // alignItems:"center",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  _userProfile: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    marginRight: 10,
  },
  _name: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
  },
  _message: {
    color: 'white',
  },
  _footerChaRow: {
    borderTopWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 7,
  },
  _leftBox: {
    height: 80,
    width: 80,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  _footerInnerSection: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  _messageSection: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  _footerRightSecttion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: 16,
  },
  _heading: {
    backgroundColor: 'rgb(43,65,98)',
    borderRadius: 10,
    color: 'white',
    textAlign: 'center',
    padding: 2,
    marginHorizontal: 4,
    marginTop: -5,
    fontWeight: 'bold',
    fontSize: 12,
  },
  _shopAll: {
    backgroundColor: 'rgb(249,160,63)',
    borderRadius: 25,
    width: 70,
    marginVertical: 10,
    paddingVertical: 7,
  },
  shopBtnText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    elevation: 5,
  },
  _textInput: {
    color: 'white',
    paddingVertical: 10,
    // marginBottom:15,
    paddingLeft: 30,
    fontWeight: 'bold',
  },
  _footerIconCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(115,107,111)',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default styles
