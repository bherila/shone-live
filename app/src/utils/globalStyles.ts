import { StyleSheet } from 'react-native'
import theme from './colors'

const ROUNDED_BUTTON_CONTAINER_SIZE = 80

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  absoluteView: {
    position: 'absolute'
  },
  absolouteCenter: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  loader: {
    backgroundColor: '#33333390',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  header: {
    elevation: 0,
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.textColor.color,
    margin: 8
  },
  primaryButtonText: {
    fontSize: 20,
    fontFamily: 'bahnscift',
    color: 'black',
    textAlign: 'center'
  },
  profileLogo: {
    height: 60,
    width: 120
  },
  roundIconButtonContainer: {
    width: ROUNDED_BUTTON_CONTAINER_SIZE,
    height: ROUNDED_BUTTON_CONTAINER_SIZE,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: ROUNDED_BUTTON_CONTAINER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff50'
  }
})
