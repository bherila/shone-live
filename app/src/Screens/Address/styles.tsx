import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  _viewcard: {
    marginHorizontal: 15,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#fff'
  },
  _texttype: {
    fontSize: 12,
    fontWeight: '600'
    // marginVertical : 10
  },
  _textname: {
    fontSize: 12,
    fontWeight: '300',
    marginVertical: 5,
    color: 'grey'
  },
  _imagecard: {
    height: 25,
    width: 25,
    alignSelf: 'flex-start'
    // marginRight: 5
  }
})

export default styles
