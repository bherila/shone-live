import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  absoluteView: {
    position: 'absolute',
  },
  absolouteCenter: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  loader: {
    backgroundColor: '#33333390',
  },
})
