import React, { useEffect } from 'react'
import {
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native'
import theme from './../../utils/colors'
import styles from './styles'
import {
  MaterialIcons,
  AntDesign,
  Entypo,
  SimpleLineIcons
} from '@expo/vector-icons'
import { Body, Icon, Button, Header, Left, Right, ListItem } from 'native-base'

import Text from './../../components/Text'
import { useNavigation } from '@react-navigation/native'
import { ScreenNames } from '../../utils/ScreenNames'
import useImagePicker from '../../hooks/useImagePicker'
import { ReactNativeFile } from 'apollo-upload-client'
import * as mime from 'react-native-mime-types'
import { useUpdateUserMutation } from '../../generated/graphql'
import { useAppSelector } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { userUpdateStore } from '../../redux/actions/userActions'
import Loader from '../../components/Loader'

export default function Account() {
  const navigation = useNavigation()

  const { pickImage, image, error, setImage } = useImagePicker(500)

  const dispatch = useDispatch()

  const [
    updateUser,
    { data, error: userUpdateError, loading: userUpdateLoading }
  ] = useUpdateUserMutation()

  useEffect(() => {
    console.log({ data, userUpdateError, userUpdateLoading })

    if (userUpdateError) return Alert.alert(userUpdateError.message)
    if (data) {
      dispatch(userUpdateStore(data.update_user))
      setImage(undefined)
    }
  }, [data, userUpdateError, userUpdateLoading])

  const user = useAppSelector(state => state.user.user)

  const generateRNFile = async (uri: string, name: string) => {
    const mimeType = mime.lookup(uri)
    return uri
      ? new ReactNativeFile({
          uri: Platform.OS === 'ios' ? uri.replace('file:///', 'file:/') : uri,
          type: mimeType ? mimeType : 'image/jpeg',
          name
        })
      : null
  }

  const onUploadPress = async () => {
    if (image) {
      const name = image.uri.split('/').pop()

      const file = await generateRNFile(
        image.uri,
        name ? name : `picture${Date.now()}`
      )

      await updateUser({
        variables: {
          user: {
            file: file
          }
        }
      })
    }
  }

  useEffect(() => {
    console.log({ image })

    if (error) return Alert.alert(error?.message)
    if (image) {
      onUploadPress()
    }
  }, [image, error])

  return (
    <View style={styles.container}>
      <Loader isLoading={userUpdateLoading} />
      <Header style={{ elevation: 0, backgroundColor: 'transparent' }}>
        <Left style={{ flex: 1 }}>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{ color: 'black' }} />
          </Button>
        </Left>
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
          <TouchableOpacity
            style={styles._userAvatar}
            onPress={() => navigation.navigate(ScreenNames.AuthScreens.LOGIN)}
          >
            <Image
              // source={require('./../../../assets/exist.jpg')}
              source={
                user?.profileUrl
                  ? { uri: user.profileUrl }
                  : require('./../../../assets/exist.jpg')
              }
              style={styles._profilePic}
            />
          </TouchableOpacity>
        </Right>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles._circle}>
          <Image
            // source={require('./../../../assets/avatar.jpg')}
            source={
              user?.profileUrl
                ? { uri: user.profileUrl }
                : require('./../../../assets/exist.jpg')
            }
            style={styles._avatarImg}
          />

          <TouchableOpacity
            style={[styles._editView, theme.bg]}
            onPress={pickImage}
          >
            <MaterialIcons name="mode-edit" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ListItem icon style={styles._list}>
          <Left>
            <Image
              source={require('./../../../assets/ordersicon.png')}
              style={styles._list_icon}
            />
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text style={styles._pages}>Orders</Text>
          </Body>
          <Right style={{ borderBottomWidth: 0 }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
          </Right>
        </ListItem>

        <ListItem icon style={styles._list}>
          <Left>
            <AntDesign
              name="staro"
              size={20}
              color="grey"
              style={{ marginLeft: 10 }}
            />
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text style={styles._pages}>Reviews</Text>
          </Body>
          <Right style={{ borderBottomWidth: 0 }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
          </Right>
        </ListItem>

        <ListItem icon style={styles._list}>
          <Left>
            <MaterialIcons
              name="payment"
              size={20}
              color="grey"
              style={{ marginLeft: 10 }}
            />
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text style={styles._pages}>Payment Methods</Text>
          </Body>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.HomeScreens.PAYMENT)}
          >
            <Right style={{ borderBottomWidth: 0 }}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="grey"
              />
            </Right>
          </TouchableOpacity>
        </ListItem>

        <ListItem icon style={styles._list}>
          <Left>
            <Entypo
              name="location"
              size={20}
              color="grey"
              style={{ marginLeft: 10 }}
            />
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text style={styles._pages}>Addresses</Text>
          </Body>
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNames.HomeScreens.ADDRESS)}
          >
            <Right style={{ borderBottomWidth: 0 }}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="grey"
              />
            </Right>
          </TouchableOpacity>
        </ListItem>

        <ListItem icon style={styles._list}>
          <Left>
            <SimpleLineIcons
              name="user-follow"
              size={20}
              color="grey"
              style={{ marginLeft: 10 }}
            />
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text style={styles._pages}>Who I’m Following</Text>
          </Body>
          <Right style={{ borderBottomWidth: 0 }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
          </Right>
        </ListItem>

        <ListItem icon style={styles._list}>
          <Left>
            <MaterialIcons
              name="notifications-none"
              size={20}
              color="grey"
              style={{ marginLeft: 10 }}
            />
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text style={styles._pages}>Notifications</Text>
          </Body>
          <Right style={{ borderBottomWidth: 0 }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
          </Right>
        </ListItem>

        <ListItem icon style={styles._list}>
          <Left>
            <Image
              source={require('./../../../assets/sellericon.png')}
              style={styles._list_icon}
            />
          </Left>
          <Body style={{ borderBottomWidth: 0 }}>
            <Text style={styles._pages}>Become a Seller</Text>
          </Body>

          <Right style={{ borderBottomWidth: 0 }}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="grey" />
          </Right>
        </ListItem>
      </ScrollView>
    </View>
  )
}
