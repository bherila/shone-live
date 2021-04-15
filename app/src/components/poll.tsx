// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export interface IPoll {
  question: string
  options: any[]
}

export default function Poll(props: { data: IPoll | null }) {
  return (
    <View style={styles.container}>
      <View style={styles._question_view}>
        <TouchableOpacity style={styles._shop_all}>
          <Text style={styles.shop_btn_text}>POLL</Text>
        </TouchableOpacity>
        <Text style={styles._question}>{props.data?.question}</Text>
      </View>
      {props.data?.options.map((val, i) => {
        return (
          <View style={styles._options} key={i}>
            <Text style={styles._options_text}>{val}</Text>
          </View>
        )
      })}
    </View>
  )
}
// style sheet
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20
  },
  _options: {
    backgroundColor: '#b9764f9e',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    marginVertical: 1
  },
  _shop_all: {
    backgroundColor: 'rgb(249,160,63)',
    borderRadius: 25,
    paddingVertical: 9,
    alignSelf: 'center',
    position: 'absolute',
    top: -20,
    paddingHorizontal: 25
  },
  shop_btn_text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    elevation: 5
  },
  _question_view: {
    backgroundColor: '#00000069',
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 2
  },
  _question: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center'
  },
  _options_text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  }
})
