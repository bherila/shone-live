/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react'
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  FlatList,
  Platform
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
import { ScreenNames } from '../../utils/ScreenNames'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../redux/actions/userActions'
import AppButton from '../../components/AppButton'
import Uppy, { StrictTypes } from '@uppy/core'
import Transloadit from '@uppy/transloadit'
import * as ImagePicker from 'expo-image-picker'
import { TRANSLOADIT_KEY, TRANSLOADIT_TEMPLATE_ID } from 'react-native-dotenv'

interface ListItem {
  item: GetShows_shows
  index: number
}

export default function MainScreen() {
  const navigation = useNavigation()

  const dispatch = useDispatch()

  const { setItem, error } = useSecureStore()

  const [modalVisible, setModalVisible] = useState(false)
  const [video, setVideo] = useState<any>()

  //@ts-ignore
  let uppyRef: Uppy.Uppy = new Uppy({
    autoProceed: true,
    debug: true
  })

  uppyRef.use(Transloadit, {
    importFromUploadURLs: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TRANSLOADIT_TEMPLATE_ID
    }
  })

  uppyRef.on('complete', result => {
    console.log('Upload complete:', result)
  })

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

  useEffect(() => {
    if (showsError) Alert.alert(showsError?.message)
  }, [showsError])

  const menu = useRef<any>()

  const hideMenu = () => {
    menu?.hide()
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
    dispatch(userLogout())

    navigation.reset({
      index: 0,
      routes: [
        {
          name: ScreenNames.AuthScreens.LOGIN
        }
      ]
    })

    hideMenu()
  }

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      if (video) {
        try {
          console.log({ video })
          console.log(video.uri)

          // const url = video.uri.replace('file:///', 'file:/')
          // const response = await fetch(url)
          // const blob = await response.blob()

          // console.log({ response, blob })

          uppyRef.addFile({
            name: video.uri.split('/').pop(), // file name
            type: 'video/*', // file type
            data: new Blob([JSON.stringify(video, null, 2)], {
              type: 'video/*'
            }), // file blob
            source: 'Local', // optional, determines the source of the file, for example, Instagram
            isRemote: false, // optional, set to true if actual file is not in the browser, but on some remote server, for example, when using companion in combination with Instagram

            extension: '.mp4'
          })

          uppyRef.upload()
        } catch (e) {
          console.log({ e })
        }
      }
    })()
  }, [video])

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
      videoMaxDuration: 60
    })

    console.log(result)

    if (!result.cancelled) {
      setVideo(result)
    }
  }

  const renderShowItem = ({ item, index }: ListItem) => {
    return (
      <TouchableOpacity
        style={styles._imageView}
        onPress={() => {
          navigation.navigate(ScreenNames.HomeScreens.HOME, {
            type: 'join',
            showId: item.id
          })
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
        <View style={globalStyles.rowContainer}>
          <AppButton title="Show Your Style" onPress={pickVideo} />

          <AppButton title="Watch Styles" onPress={() => Alert.alert('hii')} />
        </View>
        {/* <UppyFilePicker
          uppy={uppy}
          show={isFilePickerVisible}
          onRequestClose={() => setIsFilePickerVisible(false)}
          companionUrl="http://localhost:3000"
        /> */}

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
