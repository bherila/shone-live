import { StyleSheet } from 'react-native'

export const AppColors = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  PRIMARY: '#fcb345',
  PRIMARY_BACKGROUND: '#131313',
  DARK_GREY: '#1C1C1C',
  DARK_GREY_BORDER: '#1F1F1F'
}

const theme = StyleSheet.create({
  bg: {
    backgroundColor: '#fcb345'
  },
  color: {
    color: 'white'
  },
  borderColor: {
    borderColor: '#fcb345'
  },
  iconColor: {
    color: '#fcb345'
  },
  textColor: {
    color: '#fcb345'
  },
  buttonColor: {
    backgroundColor: '#3B48EE'
  }
})

export default theme
