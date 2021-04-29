import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { AppColors } from '../../utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
  },
  tabContainerStyle: {
    elevation: 0,
    borderColor: 'transparent',
    height: 0,
    // marginTop: hp(7)
  },

  _screenHeading: {
    fontSize: 20,
    color: '#525252',
    fontWeight: 'bold',
    paddingVertical: 10,
    // textAlign: "center",
  },
  _image: {
    width: 150,
    height: 200,
    borderRadius: 6,
    // flex:1
  },
  _imageView: {
    width: 150,
    height: 200,
    borderWidth: 2,
    borderRadius: 6,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  _newArrView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  _circle: {
    backgroundColor: AppColors.WHITE,
    height: 40,
    width: 40,
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(43,43,43,0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: AppColors.WHITE,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 100,
    borderStartColor: 'red',
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  _notificationImage: {
    height: 200,
    width: 200,
  },
  _desc: {
    color: '#525252',
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 20,
  },
  _confirmBtn: {
    width: '100%',
    padding: 8,
    borderRadius: 5,
    marginVertical: 12,
  },
  _confirmBtn_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
    color: AppColors.WHITE,
    fontSize: 18,
  },
  _crossCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.WHITE,
    elevation: 10,
    position: 'absolute',
    right: -5,
    top: -5,
  },
  _userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  _profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  headerBody: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
