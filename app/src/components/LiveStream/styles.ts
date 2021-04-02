import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  backgroundVideo: {
    position: 'absolute',

    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: Dimensions.get('screen').height
  }
})

export default styles
