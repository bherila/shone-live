/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import theme from '../utils/colors'

export default function ProductBuyDialog () {
  return (
        <View style={styles._mainview}>
        <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
          <View style={{ justifyContent: 'space-around' }}>
          <Text style={styles._textname}>Product</Text>
          <Text style={styles._textdesc}>{'\nWhich are the most \ninsanely beautiful \nwatches you could \naffored?'}</Text>
          </View>
          <Image style={styles._image}
          source={require('../../assets/product.jpg')} />
        </View>
      <TouchableOpacity style={[styles._buttonview, theme.buttonColor]}>
        <Text style={{ fontSize: 16, textAlign: 'center', color: '#fff' }}>Add to Cart $320</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  _mainview: {
    backgroundColor: '#00000069',
    margin: 20,
    padding: 20,
    borderRadius: 25
  },
  _image: {
    height: 110,
    width: 110,
    borderRadius: 10,
    alignContent: 'flex-end'
  },
  _textname: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fff',
    fontWeight: 'bold'
  },
  _textdesc: {
    fontSize: 14,
    textAlign: 'left',
    color: '#fff',
    fontWeight: '300'
  },
  _buttonview: {
    marginTop: 15,
    width: '100%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center'
  }
})
