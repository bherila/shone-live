import { StyleSheet } from 'react-native'

export const AppColors = {
  BLACK: '#000000',
  WHITE: '#ffffff',
  // PRIMARY: '#fcb345',
  LIGHT_YELLOW: '#FFC46A',
  PRIMARY_BACKGROUND: '#131313',
  DARK_GREY: '#1C1C1C',
  DARK_GREY_BORDER: '#1F1F1F',
  LIGHT_GREY: '#8A8A8A',
  PRIMARY_GREY_TEXT: '#131313',

  //Main Primary
  MAIN_PRIMARY: '#FFCB74',

  //Neutral
  NEUTRAL_PRIMARY: '#121212',
  NEUTRAL_SECONDARY: '#898989',

  //Other
  DIVIDER: '#E7E7E7',
  BACKGROUND: '#F8F8F8',

  //Error
  ERROR_PRIMARY: '#FF7474',
}

const theme = StyleSheet.create({
  bg: {
    backgroundColor: '#fcb345',
  },
  color: {
    color: AppColors.WHITE,
  },
  borderColor: {
    borderColor: '#fcb345',
  },
  iconColor: {
    color: '#fcb345',
  },
  textColor: {
    color: '#fcb345',
  },
  buttonColor: {
    backgroundColor: '#3B48EE',
  },
})

export default theme
