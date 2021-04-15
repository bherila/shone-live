import { StyleSheet } from 'react-native'
import theme from './colors'

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
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.textColor.color,
    margin: 8,
  },
  primaryButtonText: {
    fontSize: 20,
    fontFamily: 'bahnscift',
    color: 'black',
    textAlign: 'center',
  },
})
