import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { ScreenNames } from '../utils/ScreenNames'
import { useNavigation } from '@react-navigation/native'
import { AppColors } from '../utils/colors'

export default function Header(props: any) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles._userData}>
        <Image
          // source={require('../../assets/chatIcon.png')}
          source={{ uri: props.show?.show?.image_url }}
          style={styles._user_profile}
        />
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Text style={styles._name}>{props.show?.show?.title}</Text>
          <Text style={styles._handle}>{props.show?.show?.subtitle}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles._shop_all,
            {
              alignSelf: 'center',
              justifyContent: 'center',
              paddingVertical: 8
            }
          ]}
          onPress={() => navigation.navigate(ScreenNames.HomeScreens.LIVE_SHOW)}
        >
          <Text style={styles.shop_btn_text}>LIVE</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles._circle}>
        <AntDesign name="shrink" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

// style sheet
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 15
  },
  _userData: {
    height: 50,
    backgroundColor: '#00000069',
    borderRadius: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between'
  },
  _circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000069'
  },
  _user_profile: {
    height: 40,
    width: 40,
    borderRadius: 35 / 2
  },
  _shop_all: {
    backgroundColor: 'rgb(0,196,154)',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 7,
    paddingHorizontal: 15,
    height: 40
  },
  shop_btn_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: AppColors.WHITE
  },
  _name: {
    color: AppColors.WHITE,
    fontWeight: 'bold'
  },
  _handle: {
    color: AppColors.WHITE
  }
})
