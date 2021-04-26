/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { AppColors } from '../utils/colors'
// <<<<<<<<<<<<<<<<<<< ACTIVE POLL COMPONENT >>>>>>>>>>>>>>>>>>>
export default function PurchasedItems() {
  return (
    <View style={styles.container}>
      <View style={styles._profile_view}>
        <Image
          source={require('../../assets/chatIcon.png')}
          style={styles._user_pic}
        />
      </View>
      <View style={styles._description}>
        <Text style={styles._options_text}>
          Alison H. purchased from Anna's Accessories{' '}
        </Text>
      </View>
    </View>
  )
}
// style sheet
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
  },
  _description: {
    backgroundColor: '#00000069',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
    marginVertical: 1,
  },
  _profile_view: {
    backgroundColor: '#00000069',
    borderRadius: 60,
    height: 120,
    width: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  _question: {
    color: AppColors.WHITE,
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  _options_text: {
    color: AppColors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
  },
  _user_pic: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
})
