/* eslint-disable react/jsx-key */
// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Modal,
} from 'react-native'
import { Video } from 'expo-av'
// css
import styles from './styles'
// icons
// components
import { Poll } from '../../components'
import { LinearGradient } from 'expo-linear-gradient'
import ProductBuyDialog from '../../components/ProductBuyDialog'
import ProductBuyDialogLight from '../../components/ProductBuyDialogLight'
import { Ionicons } from '@expo/vector-icons'

// purchased component is available but right now its not used
export default function Home() {
  const [modalvisible, setModalVisible] = useState(false)

  // render() {
  interface Product {
    id: string
    qtyLeft: number
    imageUrl: string
    price: number
    currency: string
  }

  interface ChatMessage {
    name: string
    profileImage: string
    message: string
  }

  interface Poll {
    question: string
    options: string[]
  }

  interface LiveShow {
    name: string
    handle: string
    featuredProductId: string // corresponds to one of the IDs of products array
    products: Product[]
    chats: ChatMessage[]
    activePoll?: Poll | null // if activePoll != null then the poll can be rendered as an overlay
  }

  const exampleShow: LiveShow = {
    name: 'Show title',
    handle: '@annasaccessories',
    featuredProductId: 'prodct1',
    products: [
      {
        id: 'prodct1',
        qtyLeft: 2,
        imageUrl: 'TODO',
        price: 129,
        currency: 'USD',
      },
    ],
    chats: [
      {
        name: 'iglit',
        message: 'comment',
        profileImage: 'TODO',
      },
      {
        name: 'iglit',
        message: 'comment',
        profileImage: 'TODO',
      },
      {
        name: 'iglit',
        message: 'comment',
        profileImage: 'TODO',
      },
      {
        name: 'iglit',
        message: 'comment',
        profileImage: 'TODO',
      },
    ],
    activePoll: {
      question: 'What metal should I use next?',
      options: ['Rose Gold', 'Platinum', 'Silver'],
    },
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Video
        source={{
          uri:
            'https://s3-eu-west-1.amazonaws.com/video.gallereplay.com/artistarea/Lighthouse%20stands%20in%20Istanbul%E2%80%99s%20harbour_0554659b-5dc1-43d6-8a93-b31ec6b67f63/Cinemagraph_plain/1920x1080/cinemagraph.mp4',
        }}
        style={styles.backgroundVideo}
        rate={1}
        shouldPlay={true}
        isLooping={true}
        volume={1}
        muted={true}
        resizeMode="cover"
      />
      <View style={styles._body_section}>
        {/* <<<<<<<<<<<<<< SCREEN HEADER >>>>>>>>>>>> */}
        <View style={styles._header}>
          <Text style={styles._title}>{exampleShow.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={styles._shop_all}>
              <Text style={styles.shop_btn_text}>LIVE</Text>
            </TouchableOpacity>
            <Image
              style={{
                width: 25,
                height: 25,
                marginLeft: 10,
                tintColor: 'white',
              }}
              source={require('../../../assets/view.png')}
            />
            <Text
              style={{
                textAlign: 'center',
                marginLeft: 3,
                fontSize: 12,
                color: 'white',
              }}
            >
              29.1K
            </Text>
          </View>
        </View>
        {/* <<<<<<<<<<<<<< ACTIVE POLL>>>>>>>>>>>> */}

        {exampleShow.activePoll === null ? (
          <Poll data={exampleShow.activePoll} />
        ) : null}
        {/* <<<<<<<<<<<<<< FOOTER >>>>>>>>>>>> */}
        <View style={styles._footer}>
          <View style={styles._footer_inner_section}>
            <View style={styles._message_section}>
              {exampleShow.chats.map((val, i) => {
                return (
                  <View style={styles._chat_row} key={i}>
                    <Image
                      source={require('../../../assets/chatIcon.png')}
                      style={styles._user_profile}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles._name}>{val.name}</Text>
                      <Text style={styles._message}>{val.message}</Text>
                    </View>
                  </View>
                )
              })}
            </View>
            {/* <<<<<<<<<<<<<< PRODUCT >>>>>>>>>>>> */}
            {modalvisible ? null : (
              <View style={styles._footer_right_secttion}>
                {exampleShow.products.map((val, i) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(!modalvisible)
                        }}
                      >
                        <ImageBackground
                          source={require('../../../assets/morethree.png')}
                          resizeMode={'cover'}
                          style={styles._footerproductimage}
                        >
                          <LinearGradient
                            colors={['transparent', '#fff']}
                            style={{ height: 140, width: 110 }}
                          >
                            <View
                              style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                flex: 1,
                              }}
                            >
                              <Text style={{ fontSize: 10, fontWeight: '200' }}>
                                PRODUCT NAME
                              </Text>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  paddingVertical: 6,
                                }}
                              >
                                <Text
                                  style={{ fontSize: 12, fontWeight: '600' }}
                                >
                                  $560
                                </Text>
                                <View style={styles._viewbuy}>
                                  <Text style={styles._textbuy}>@buy</Text>
                                </View>
                              </View>
                            </View>
                          </LinearGradient>
                        </ImageBackground>
                        <Text style={styles._textbrand}>{'brand name'}</Text>
                      </TouchableOpacity>
                    </>
                  )
                })}
              </View>
            )}
          </View>
          {/* <<<<<<<<<<<<<< CHAT SECTION >>>>>>>>>>>> */}
          <View style={styles._footer_chat_row}>
            <TextInput
              style={styles._text_input}
              placeholder="Add comment..."
              placeholderTextColor="rgb(209,205,205)"
            />
            <View style={styles.footer_btns_row}>
              <TouchableOpacity style={styles._footer_icon_circle}>
                {/* <Entypo
                                        name="share-alternative"
                                        size={20}
                                        color="rgb(249,160,63)"
                                    /> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles._footer_icon_circle}>
                {/* <FontAwesome
                                        name="diamond"
                                        size={20}
                                        color="rgb(249,160,63)"
                                    /> */}
              </TouchableOpacity>
            </View>
          </View>
          {/* <ProductBuyDialogLight /> */}
        </View>

        <Modal visible={modalvisible} transparent={true}>
          <View style={styles._viewmodal}>
            <TouchableOpacity
              style={{ position: 'absolute', right: 25, top: 50 }}
              onPress={() => {
                setModalVisible(!modalvisible)
              }}
            >
              <Ionicons
                name="close-circle-outline"
                size={32}
                color="white"
                style={{ alignSelf: 'center' }}
              />
            </TouchableOpacity>
            <Text style={styles._textmodal}>
              {
                'Which are the most insanely\nbeatiful watches you could\nafford?'
              }
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                alignSelf: 'center',
              }}
            >
              <View>
                <Image
                  source={require('../../../assets/morethree.png')}
                  resizeMode={'cover'}
                  style={styles._footerproductimage}
                />
                <Text style={styles._textmodalname}>Name</Text>
                <View style={styles._viewmodallike}>
                  <Image
                    style={styles._iconlike}
                    source={require('../../../assets/ic_like.png')}
                    resizeMode={'contain'}
                  />
                  <Text style={styles._textmodal}>50</Text>
                </View>
              </View>
              <View>
                <Image
                  source={require('../../../assets/morethree.png')}
                  resizeMode={'cover'}
                  style={styles._footerproductimage}
                />
                <Text style={styles._textmodalname}>Name</Text>
                <View style={styles._viewmodallike}>
                  <Image
                    style={styles._iconlike}
                    source={require('../../../assets/ic_like.png')}
                    resizeMode={'contain'}
                  />
                  <Text style={styles._textmodal}>30</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  )
  // }
}
