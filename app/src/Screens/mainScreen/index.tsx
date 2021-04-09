/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  FlatList
} from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import { Feather, Entypo } from '@expo/vector-icons'
import { Body, Header, Left, Right } from 'native-base'
import Menu, { MenuItem } from 'react-native-material-menu'
import Text from './../../components/Text'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { GET_SHOWS } from '../../graphql/queries/shows'
import { GetShows, GetShows_shows } from '../../graphql/queries/types/GetShows'
import { globalStyles } from '../../utils/globalStyles'
import Loader from '../../components/Loader'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'

interface ListItem {
  item: GetShows_shows
  index: number
}

export default function MainScreen() {
  const navigation = useNavigation()

  const { setItem, error } = useSecureStore()

  const [modalVisible, setModalVisible] = useState(false)

  const { data: shows, error: showsError, loading: isShowsLoading } = useQuery<
    GetShows
  >(GET_SHOWS)
  const newArr = [
    { img: require('./../../../assets/newone.png') },
    { img: require('./../../../assets/newtwo.png') },
    { img: require('./../../../assets/newthree.png') }
  ]

  const commingSoon = [
    { img: require('./../../../assets/comingone.png') },
    { img: require('./../../../assets/comingtwo.png') },
    { img: require('./../../../assets/comingthree.png') }
  ]

  const moreShows = [
    { img: require('../../../assets/moreone.png') },
    { img: require('../../../assets/moretwo.png') },
    { img: require('../../../assets/morethree.png') }
  ]

  useEffect(() => {
    setModalVisible(true)
  }, [])

  const menu = useRef<any>()

  const hideMenu = () => {
    menu?.current?.hide()
  }

  const showMenu = () => {
    menu?.current?.show()
  }

  const ViewProfile = () => {
    navigation.navigate('Account')
    hideMenu()
  }

  const Logout = async () => {
    await setItem(StorageKeys.AUTH_TOKEN, undefined)
    navigation.navigate('Login')

    hideMenu()
  }

  const renderShowItem = ({ item, index }: ListItem) => {
    console.log('ITEM', item)

    return (
      <TouchableOpacity
        style={styles._imageView}
        onPress={() => {
          navigation.navigate('Home', { type: 'join', showId: item.id })
        }}
      >
        <Image
          source={{
            uri: item.image_url
              ? item.image_url
              : 'https://picsum.photos/200/300'
          }}
          style={styles._image}
        />
      </TouchableOpacity>
    )
  }

  console.log({ shows, showsError, isShowsLoading })

  return (
    <View style={globalStyles.container}>
      <Loader isLoading={isShowsLoading} />
      <Header style={{ elevation: 0, backgroundColor: 'transparent' }}>
        <Left />
        <Body
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            source={require('./../../../assets/logo.png')}
            style={{ height: 60, width: 120 }}
          />
        </Body>
        <Right style={{ flex: 1 }}>
          <Menu
            ref={menu}
            button={
              <TouchableOpacity style={styles._userAvatar} onPress={showMenu}>
                <Image
                  source={require('./../../../assets/avatar.jpg')}
                  style={styles._profilePic}
                />
              </TouchableOpacity>
            }
          >
            <MenuItem onPress={() => ViewProfile()}>View Profile</MenuItem>

            <MenuItem onPress={() => Logout()}>Logout</MenuItem>
          </Menu>
        </Right>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles._screenHeading}>What’s on now!</Text>
        <View style={styles._newArrView}>
          {shows?.shows && (
            <FlatList
              data={shows.shows}
              extraData={shows}
              horizontal
              renderItem={renderShowItem}
            />
          )}
        </View>

        <Text style={styles._screenHeading}>Coming up soon</Text>
        <View style={styles._newArrView}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {commingSoon.map((val, i) => {
              return (
                <View key={i} style={styles._imageView}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LiveShow')}
                  >
                    <Image source={val.img} style={styles._image} />
                    <TouchableOpacity style={styles._circle}>
                      <Feather
                        name="user-plus"
                        size={20}
                        style={[theme.iconColor]}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        </View>

        <Text style={styles._screenHeading}>More shows</Text>
        <View style={styles._newArrView}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {moreShows.map((val, i) => {
              return (
                <View key={i} style={styles._imageView}>
                  <Image source={val.img} style={styles._image} />
                  <TouchableOpacity
                    style={styles._circle}
                    onPress={() => navigation.navigate('LiveShow')}
                  >
                    <Feather
                      name="user-plus"
                      size={20}
                      style={[theme.iconColor]}
                    />
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </ScrollView>
      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={false}
        onRequestClose={() => {
          alert('Modal has been closed.')
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles._crossCircle}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Entypo name="cross" size={24} color="black" />
            </TouchableOpacity>
            <Image
              source={require('../../../assets/notificationimage.png')}
              style={styles._notificationImage}
            />
            <Text style={styles._screenHeading}>Can we notify you?</Text>
            <Text style={styles._desc}>
              Please allow us to send you notifications..
            </Text>

            <TouchableOpacity style={[styles._confirmBtn, theme.bg]}>
              <Text style={styles._confirmBtn_text}>Allow</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles._confirmBtn, { backgroundColor: '#e4e4e4' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles._confirmBtn_text, { color: '#525252' }]}>
                Dismiss
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
