import { StyleSheet } from 'react-native'
import { AppColors } from '../../utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  _header: {
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 15
  },
  _title: {
    color: AppColors.WHITE,
    fontSize: 25,
    fontWeight: 'bold'
  },
  _body_section: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  _footer: {
    backgroundColor: '#00000069'
  },
  _footerproductimage: {
    height: 140,
    width: 110,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 30
  },
  _textbrand: {
    marginTop: 8,
    color: AppColors.WHITE,
    fontSize: 14,
    fontWeight: '200'
  },
  _viewbuy: {
    marginLeft: 5,
    backgroundColor: 'blue',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'center'
  },
  _textbuy: {
    fontSize: 12,
    color: AppColors.WHITE,
    textAlign: 'center',
    fontWeight: '300'
  },
  _chat_row: {
    flexDirection: 'row',
    // alignItems:"center",
    marginVertical: 5,
    paddingHorizontal: 10
  },
  _user_profile: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
    marginRight: 10
  },
  _name: {
    color: AppColors.WHITE,
    // fontWeight: 'bold',
    flex: 1,
    fontWeight: '200',
    fontSize: 14
  },
  _message: {
    color: AppColors.WHITE,
    fontWeight: '300',
    fontSize: 14
  },
  _footer_chat_row: {
    // borderTopWidth: 1,
    // borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15,
    paddingTop: 7
  },
  _left_box: {
    height: 80,
    width: 80,
    borderRadius: 20,
    backgroundColor: AppColors.WHITE
  },
  _footer_inner_section: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between'
  },
  _message_section: {
    flexDirection: 'column',
    flex: 3
  },
  _footer_right_secttion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  _heading: {
    backgroundColor: 'rgb(43,65,98)',
    borderRadius: 10,
    color: AppColors.WHITE,
    textAlign: 'center',
    padding: 2,
    marginHorizontal: 4,
    marginTop: -5,
    fontWeight: 'bold',
    fontSize: 12
  },
  _shop_all: {
    backgroundColor: 'red',
    width: 40,
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 2
  },
  shop_btn_text: {
    color: AppColors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    elevation: 5
  },
  _text_input: {
    color: AppColors.WHITE,
    paddingVertical: 10,
    // marginBottom:15,
    paddingLeft: 30,
    fontSize: 15
    // fontWeight: 'bold'
  },
  _footer_icon_circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    // backgroundColor: 'rgb(115,107,111)',
    backgroundColor: '#00000069',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer_btns_row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  _viewmodal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  _textmodal: {
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center'
  },
  _textmodalname: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    marginRight: 30,
    marginVertical: 5,
    fontWeight: '200'
  },
  _viewmodallike: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30
  },
  _iconlike: {
    height: 18,
    width: 18,
    marginRight: 5
  }
})

export default styles
