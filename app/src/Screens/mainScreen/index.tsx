/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react'
import {
  Image,
  View,
  TouchableOpacity,
  Modal,
  Platform,
  StatusBar,
} from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import { Entypo } from '@expo/vector-icons'
import { Body, Header, Left, Right } from 'native-base'
import Menu, { MenuItem } from 'react-native-material-menu'
import Text from './../../components/Text'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../utils/globalStyles'
import Loader from '../../components/Loader'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'
import { ScreenNames } from '../../utils/ScreenNames'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../redux/actions/userActions'
import * as ImagePicker from 'expo-image-picker'
import { Show, useGetShowsQuery } from '../../generated/graphql'
import { UppyClient } from '../../utils/TransloaditApi'
import RoundIconButton from '../../components/RoundIconButton'

interface ListItem {
  item: Show
  index: number
}

export default function MainScreen() {
  const uppy = UppyClient().uppy

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { setItem } = useSecureStore()

  const [modalVisible, setModalVisible] = useState(false)

  // const {
  //   data: shows,
  //   error: showsError,
  //   loading: isShowsLoading
  // } = useGetShowsQuery()

  const commingSoon = [
    {
      img: require('./../../../assets/comingone.png'),
    },
    {
      img: require('./../../../assets/comingtwo.png'),
    },
    {
      img: require('./../../../assets/comingthree.png'),
    },
  ]

  const moreShows = [
    {
      img: require('../../../assets/moreone.png'),
    },
    {
      img: require('../../../assets/moretwo.png'),
    },
    {
      img: require('../../../assets/morethree.png'),
    },
  ]

  useEffect(() => {
    setModalVisible(true)
  }, [])

  // useEffect(() => {
  //   if (showsError) Alert.alert(showsError?.message)
  // }, [showsError])

  const menu = useRef<any>()

  const hideMenu = () => {
    menu?.current?.hide()
  }

  const showMenu = () => {
    menu?.current?.show()
  }

  const ViewProfile = () => {
    navigation.navigate(ScreenNames.HomeScreens.ACCOUNT)
    hideMenu()
  }

  const Logout = async () => {
    await setItem(StorageKeys.AUTH_TOKEN, '')
    await setItem(StorageKeys.USER, '')
    dispatch(userLogout())

    navigation.reset({
      index: 0,
      routes: [
        {
          name: ScreenNames.AuthScreens.LOGIN,
        },
      ],
    })

    hideMenu()
  }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status === ImagePicker.PermissionStatus.DENIED) {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const navigateToVoteScreen = () => {
    navigation.navigate(ScreenNames.HomeScreens.VOTE_AND_WIN)
    hideMenu()
  }

  const renderShowItem = ({ item }: ListItem) => {
    return (
      <TouchableOpacity
        style={styles._imageView}
        onPress={() => {
          navigation.navigate(ScreenNames.HomeScreens.HOME, {
            type: 'join',
            showId: item.id,
          })
        }}
      >
        <Image
          source={{
            uri: item.image_url
              ? item.image_url
              : 'https://picsum.photos/200/300',
          }}
          style={styles._image}
        />
      </TouchableOpacity>
    )
  }

  const renderHeader = () => {
    return (
      <Header style={[globalStyles.header, styles.header]} transparent>
        <Left style={globalStyles.colorlessContainer}>
          <RoundIconButton
            containerStyle={styles.iconContainerStyle}
            iconStyle={styles.iconStyle}
            iconUri={require('../../../assets/gift_yellow.png')}
            onPress={() => {}}
          />
        </Left>
        <Body style={styles.headerBody}>
          <Image
            source={require('./../../../assets/shone_logo_light.png')}
            style={globalStyles.shoneLogo}
            resizeMode="contain"
          />
        </Body>
        <Right style={globalStyles.colorlessContainer}>
          <Menu
            ref={menu}
            button={
              <RoundIconButton
                containerStyle={styles.iconContainerStyle}
                onPress={showMenu}
                iconStyle={styles.iconStyle}
                iconUri={require('./../../../assets/profile_yellow.png')}
              />
            }
          >
            <MenuItem onPress={navigateToVoteScreen}>Vote and Win</MenuItem>
            <MenuItem onPress={() => ViewProfile()}>View Profile</MenuItem>
            <MenuItem onPress={() => Logout()}>Logout</MenuItem>
          </Menu>
        </Right>
      </Header>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <Loader
        isLoading={isShowsLoading || isVideoUploading}
        isProgressShown={isVideoUploading}
        progress={progress}
        total={100}
      /> */}

      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyles.rowContainer}>
          <AppButton title="Show Your Style" onPress={pickVideo} />

          <AppButton
            title="Watch Styles"
            onPress={() => {
              navigation.navigate(ScreenNames.HomeScreens.WATCH_STYLE)
            }}
          />
        </View>
        <Text style={styles._screenHeading}>What’s on now!</Text>
        <View style={styles._newArrView}>
          {shows?.shows && (
            <FlatList
              data={shows.shows as Show[]}
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
                    onPress={() =>
                      navigation.navigate(ScreenNames.HomeScreens.LIVE_SHOW)
                    }
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
                    onPress={() =>
                      navigation.navigate(ScreenNames.HomeScreens.LIVE_SHOW)
                    }
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
      </ScrollView> */}
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
              style={[
                styles._confirmBtn,
                {
                  backgroundColor: '#e4e4e4',
                },
              ]}
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
