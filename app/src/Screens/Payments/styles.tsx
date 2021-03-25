import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
_viewcard: {
    marginHorizontal: 15,
    marginTop : 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  _texttype: { 
    fontSize :12, 
    fontWeight : '600', 
    marginVertical : 10 
  },
  _textname: {
    fontSize :12, 
    fontWeight : '300', 
    marginVertical : 5 ,
    color : 'grey'
  },
  _imagecard: { 
    height: 25, 
    width: 25, 
    alignSelf: 'flex-start', 
    marginRight: 5 
  }

})

export default styles
