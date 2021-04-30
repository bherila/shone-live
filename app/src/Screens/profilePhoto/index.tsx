import React, { useEffect, useState } from 'react'
import { Image, View, TouchableOpacity, Alert } from 'react-native'
import theme, { AppColors } from './../../utils/colors'
import styles from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import { Body, Icon, Button, Header, Left, Right } from 'native-base'
import Text from './../../components/Text'
import Camera from './../../components/camera'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScreenNames } from '../../utils/ScreenNames'
import { useDispatch } from 'react-redux'
import {
  UpdateUserMutation,
  useUpdateUserMutation,
} from '../../generated/graphql'
import useImagePicker from '../../hooks/useImagePicker'
import { userUpdateStore } from '../../redux/actions/userActions'
import { generateRNFile } from '../../utils/helper'
import Loader from '../../components/Loader'
import StorageKeys from '../../utils/StorageKeys'
import { useSecureStore } from '../../hooks/useSecureStore'

export default function ProfilePhoto() {
  const navigation = useNavigation()
  const route: any = useRoute()

  const [openCamera, setOpenCamera] = useState(true)
  const { setItem } = useSecureStore()

  const { pickImage, image, error, setImage } = useImagePicker(500)

  const dispatch = useDispatch()

  const [
    updateUser,
    { data, error: userUpdateError, loading: userUpdateLoading },
  ] = useUpdateUserMutation({
    fetchPolicy: 'no-cache',
  })

  const setUserToStorage = async (data: UpdateUserMutation) => {
    await setItem(StorageKeys.AUTH_TOKEN, data.update_user.token)
    await setItem(StorageKeys.USER, data.update_user)
  }

  useEffect(() => {
    if (userUpdateError) return Alert.alert(userUpdateError.message)
    if (data) {
      setUserToStorage(data)
      dispatch(userUpdateStore(data.update_user))
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ScreenNames.HomeScreens.MAIN_SCREEN,
          },
        ],
      })
    }
  }, [data, userUpdateError, userUpdateLoading])

  const onUploadPress = async () => {
    if (image) {
      const name = image.uri.split('/').pop()

      const file = generateRNFile(
        image.uri,
        name ? name : `picture${Date.now()}`,
      )

      await updateUser({
        variables: {
          user: {
            email: route.params?.email || '',
            username: `${route.params?.username}`,
            file: file,
          },
        },
      })
    } else {
      Alert.alert('Please choose an image.')
    }
  }

  useEffect(() => {
    if (error) return Alert.alert(error.message)
  }, [image, error])

  const capture = (v) => {
    setOpenCamera(true)
    setImage(v)
  }
  return (
    <View style={styles.container}>
      <Loader isLoading={userUpdateLoading} />
      {openCamera ? (
        <>
          <Header style={{ elevation: 0, backgroundColor: 'transparent' }}>
            <Left style={{ flex: 1 }}>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" style={{ color: AppColors.BLACK }} />
              </Button>
            </Left>
            <Body
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('./../../../assets/logo.png')}
                style={{ height: 60, width: 120 }}
              />
            </Body>
            <Right style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  onUploadPress()
                }}
              >
                <Text style={theme.textColor}>Next</Text>
              </TouchableOpacity>
            </Right>
          </Header>

          <View style={styles._innerView}>
            <Text style={styles._screenHeading}>Profile Photo</Text>
            <Text style={styles._desc}>
              Shone is a community full of authentic users. Go ahead, and upload
              your best photo!
            </Text>
            <View style={styles._circle}>
              {image ? (
                <>
                  {image && (
                    <Image
                      source={{ uri: image.uri }}
                      style={styles._avatarImg}
                    />
                  )}
                </>
              ) : (
                <Image
                  source={require('./../../../assets/avatar.jpg')}
                  style={styles._avatarImg}
                />
              )}

              <TouchableOpacity
                style={[styles._editView, theme.bg]}
                onPress={pickImage}
              >
                <MaterialIcons name="mode-edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
            }}
          >
            <TouchableOpacity
              style={[styles._confirmBtn, theme.bg]}
              onPress={pickImage}
            >
              <Text style={styles._confirmBtn_text}>Upload from album</Text>
            </TouchableOpacity>

            <View style={styles._orView}>
              <View style={[styles._orCircle, theme.bg]}>
                <Text style={styles._orText}>OR</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles._confirmBtn, theme.bg]}
              onPress={() => setOpenCamera(false)}
            >
              <Text style={styles._confirmBtn_text}>Take a photo</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Camera func={capture} />
      )}
    </View>
  )
}
