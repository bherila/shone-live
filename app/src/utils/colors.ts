import { StyleSheet } from 'react-native'

export const AppColors = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  PRIMARY: '#fcb345'
}

const theme = StyleSheet.create({
  bg: {
    backgroundColor: '#fcb345'
  },
  color: {
    color: AppColors.WHITE
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
