import React, { createRef, useCallback, useEffect, useState } from 'react'
import {
  View,
  FlatList,
  Image,
  Alert,
  Text,
  Share,
  TouchableOpacity,
} from 'react-native'
import ContestVideoVoteItem from '../../components/ContestVideoListItem'
import { globalStyles } from '../../utils/globalStyles'
import styles from './styles'
import { Body, Left, Right } from 'native-base'
import Menu, { MenuItem } from 'react-native-material-menu'
import RoundIconButton from '../../components/RoundIconButton'
import { userLogout } from '../../redux/actions/userActions'
import { ScreenNames } from '../../utils/ScreenNames'
import StorageKeys from '../../utils/StorageKeys'
import { useNavigation } from '@react-navigation/core'
import { useDispatch } from 'react-redux'
import { useSecureStore } from '../../hooks/useSecureStore'
import useTransloadit from '../../hooks/useTransloadit'
import Loader from '../../components/Loader'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context'

const CONTEST_VIDEO_LIST = [
  {
    title: 'Day 4',
    heading: 'Springtime in Paris',
    description:
      'This challenge is to post your best 3 outfits for springtime in Paris... for tourists, fine dining, etc event.',
    isNew: true,
    thumbnailImage: 'https://picsum.photos/200',
    expiry: '3 days left',
  },

  {
    title: 'Day 4',
    heading: 'Springtime in Paris',
    description:
      'This challenge is to post your best 3 outfits for springtime in Paris... for tourists, fine dining, etc event.',
    isNew: false,
    thumbnailImage: 'https://picsum.photos/200',
    expiry: '3 days left',
  },
]

export interface VoteItem {
  title: string
  heading: string
  description: string
  isNew: boolean
  thumbnailImage: string
  expiry: string
}

interface ItemProps {
  item: VoteItem
  index?: number
}

type MenuClickOptions = 'VOTE' | 'PROFILE' | 'LOGOUT'

const index = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { setItem } = useSecureStore()

  const {
    pickVideo,
    data: videoUploadData,
    error: videoUploadError,
    isLoading: isVideoUploading,
  } = useTransloadit()

  const menu = createRef<any>()

  const showMenu = () => {
    menu?.current?.show()
  }

  const handleMenuClick = async (item: MenuClickOptions) => {
    switch (item) {
      case 'PROFILE':
        navigation.navigate(ScreenNames.HomeScreens.ACCOUNT)
        break

      case 'VOTE':
        navigation.navigate(ScreenNames.HomeScreens.VOTE_AND_WIN)
        break

      case 'LOGOUT':
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

        break
    }
    menu?.current?.hide()
  }

  const renderVoteItem = useCallback(
    ({ item, index }: ItemProps) => (
      <ContestVideoVoteItem
        voteItem={item}
        onPress={pickVideo}
        isLastIndex={index == CONTEST_VIDEO_LIST.length - 1}
      />
    ),
    [],
  )

  const keyExtractor = (item: VoteItem, index: number) =>
    `key-${item.title}${index}`

  const renderSepartor = useCallback(
    () => <View style={styles.listSeparator} />,
    [],
  )

  const renderHeader = useCallback(() => {
    return (
      <View
        style={[globalStyles.rowContainer, globalStyles.header, styles.header]}
      >
        <Left style={globalStyles.colorlessContainer}>
          <RoundIconButton
            containerStyle={styles.iconContainerStyle}
            iconStyle={styles.iconStyle}
            iconUri={require('../../../assets/gift_yellow.png')}
            onPress={() => {
              navigation.navigate(ScreenNames.HomeScreens.GIFT_SCREEN)
            }}
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
            <MenuItem onPress={() => handleMenuClick('VOTE')}>
              Vote and Win
            </MenuItem>
            <MenuItem onPress={() => handleMenuClick('PROFILE')}>
              View Profile
            </MenuItem>
            <MenuItem onPress={() => handleMenuClick('LOGOUT')}>
              Logout
            </MenuItem>
          </Menu>
        </Right>
      </View>
    )
    // return (
    //   <Header style={[globalStyles.header, styles.header]} transparent>
    //     <Left style={globalStyles.colorlessContainer}>
    //       <RoundIconButton
    //         containerStyle={styles.iconContainerStyle}
    //         iconStyle={styles.iconStyle}
    //         iconUri={require('../../../assets/gift_yellow.png')}
    //         onPress={() => {
    //           navigation.navigate(ScreenNames.HomeScreens.GIFT_SCREEN)
    //         }}
    //       />
    //     </Left>
    //     <Body style={styles.headerBody}>
    //       <Image
    //         source={require('./../../../assets/shone_logo_light.png')}
    //         style={globalStyles.shoneLogo}
    //         resizeMode="contain"
    //       />
    //     </Body>
    //     <Right style={globalStyles.colorlessContainer}>
    //       <Menu
    //         ref={menu}
    //         button={
    //           <RoundIconButton
    //             containerStyle={styles.iconContainerStyle}
    //             onPress={showMenu}
    //             iconStyle={styles.iconStyle}
    //             iconUri={require('./../../../assets/profile_yellow.png')}
    //           />
    //         }
    //       >
    //         <MenuItem onPress={() => handleMenuClick('VOTE')}>
    //           Vote and Win
    //         </MenuItem>
    //         <MenuItem onPress={() => handleMenuClick('PROFILE')}>
    //           View Profile
    //         </MenuItem>
    //         <MenuItem onPress={() => handleMenuClick('LOGOUT')}>
    //           Logout
    //         </MenuItem>
    //       </Menu>
    //     </Right>
    //   </Header>
    // )
  }, [])

  useEffect(() => {
    if (videoUploadError)
      return Alert.alert(videoUploadError.title, videoUploadError.details)

    if (videoUploadData?.assembly_id) {
      //TODO: Call graphQL mutation to send video id to store in Database
      setIsModalOpen(true)
    }
  }, [videoUploadData, videoUploadError])

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <SafeAreaView style={[globalStyles.darkContainer]}>
      <Loader isLoading={isVideoUploading} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={CONTEST_VIDEO_LIST}
        renderItem={renderVoteItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSepartor}
        ListHeaderComponent={renderHeader}
      />

      <Modal
        isVisible={isModalOpen}
        onSwipeComplete={() => setIsModalOpen(false)}
        swipeDirection="down"
        style={styles.modalStyle}
        animationInTiming={600}
        animationOutTiming={600}
      >
        <View style={styles.modalContainer}>
          <View>
            <Image
              source={require('../../../assets/success.png')}
              resizeMode="contain"
              style={styles.successIcon}
            />
            <Text
              style={[
                globalStyles.primaryText,
                globalStyles.alignSelfCenter,
                styles.successText,
              ]}
            >
              Success!
            </Text>
            <Text
              style={[
                globalStyles.primaryText,
                globalStyles.alignSelfCenter,
                styles.successDescriptionText,
              ]}
            >
              You look amazing ! We can't wait to see your style shine!
            </Text>

            <TouchableOpacity
              style={styles.shareButton}
              onPress={() =>
                Share.share({
                  url: 'https://shone.live/vote/330',
                })
              }
            >
              <View style={globalStyles.rowContainer}>
                <View style={styles.fullflex}></View>
                <Text style={[globalStyles.primaryText, styles.buttonText]}>
                  Share
                </Text>
                <View style={styles.fullflex}>
                  <Image
                    style={styles.shareIcon}
                    source={require('../../../assets/share_default.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.okayButton}
              onPress={() => setIsModalOpen(false)}
            >
              <Text style={[globalStyles.primaryText, styles.buttonText]}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../../assets/modal_top.png')}
            resizeMode="contain"
            style={styles.modalImageStyle}
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default index
