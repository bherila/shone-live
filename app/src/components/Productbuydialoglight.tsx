/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../utils/colors'

export default function Productbuydialog () {
  return (
        <View style={styles._mainview}>
        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
        <Image style={styles._image}
          source={require('../../assets/product.jpg')} />
          <View style={{ justifyContent: 'space-around' }}>
          <Text style={styles._textname}>Product name</Text>
          <Text style={styles._textdesc}>{'\nWhich are the most \ninsanely beautiful \nwatches you could \naffored?'}</Text>
          </View>
        </View>
      <TouchableOpacity style={{ marginTop: 15, backgroundColor: '#3B48EE', width: '100%', height: 40, borderRadius: 10, justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, textAlign: 'center', color: '#fff' }}>Add to Cart $320</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  _mainview: {
    backgroundColor: colors.white,
    margin: 20,
    padding: 20,
    borderRadius: 25
  },
  _image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    alignContent: 'flex-end'
  },
  _textname: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '500'
  },
  _textdesc: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '300'
  },
  _buttonview: {
    marginTop: 15,
    backgroundColor: colors.buttonColor,
    width: '100%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center'
  }
})
