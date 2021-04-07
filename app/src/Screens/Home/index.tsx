// eslint-disable-next-line no-use-before-define
import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'
// css
import styles from './styles'
// icons
import { FontAwesome, Entypo } from '@expo/vector-icons'
// components
import { Header, Poll } from '../../components'
// purchased component is available but right now its not used

import { useRoute } from '@react-navigation/core'
import LiveStream from '../../components/LiveStream/LiveStream'
import { agoraToken } from '../../utils/environment'

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

interface ILiveShow {
  name: string
  handle: string
  featuredProductId: string // corresponds to one of the IDs of products array
  products: Product[]
  chats: ChatMessage[]
  activePoll?: Poll | null // if activePoll != null then the poll can be rendered as an overlay
}

const exampleShow: ILiveShow = {
  name: "Anna's Accessories",
  handle: '@annasaccessories',
  featuredProductId: 'prodct1',
  products: [
    {
      id: 'prodct1',
      qtyLeft: 2,
      imageUrl: 'TODO',
      price: 129,
      currency: 'USD'
    }
  ],
  chats: [
    {
      name: 'Mike A.',
      message: 'DOPE!!!',
      profileImage: 'TODO'
    },
    {
      name: 'Allison H.',
      message: 'YAAASSSSS!!!',
      profileImage: 'TODO'
    },
    {
      name: 'Sarah M.',
      message:
        "This makes me so happy to see. I've always wanted something like this in Platinum. Bling... bling...",
      profileImage: 'TODO'
    }
  ],
  activePoll: {
    question: 'What metal should I use next?',
    options: ['Rose Gold', 'Platinum', 'Silver']
  }
}

const LiveShow = (props: any) => {
  const route: any = useRoute()

  return (
    <TouchableWithoutFeedback
      style={{ height: '100%' }}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Agora Live Streaming Component */}
        <LiveStream
          isHost={route.params?.type === 'create'}
          token={agoraToken}
          channelID="demo"
        />

        <View style={styles._body_section}>
          {/* <<<<<<<<<<<<<< SCREEN HEADER >>>>>>>>>>>> */}
          <View style={styles._header}>
            <Header data={exampleShow} props={props} />
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
              <View style={styles._footer_right_secttion}>
                {exampleShow.products.map((val, i) => {
                  return (
                    <TouchableOpacity style={styles._left_box} key={i}>
                      <Text style={styles._heading}>{val.qtyLeft} LEFT</Text>
                      <Image
                        source={require('../../../assets/product.jpg')}
                        style={{ height: 40, width: 40 }}
                      />
                    </TouchableOpacity>
                  )
                })}
                <TouchableOpacity style={styles._shop_all}>
                  <Text style={styles.shop_btn_text}>Shop All</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <<<<<<<<<<<<<< CHAT SECTION >>>>>>>>>>>> */}
            <View style={styles._footer_chat_row}>
              <TextInput
                style={styles._text_input}
                placeholder="Say Something.."
                placeholderTextColor="rgb(209,205,205)"
              />
              <View style={styles.footer_btns_row}>
                <TouchableOpacity style={styles._footer_icon_circle}>
                  <Entypo
                    name="share-alternative"
                    size={20}
                    color="rgb(249,160,63)"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles._footer_icon_circle}>
                  <FontAwesome
                    name="diamond"
                    size={20}
                    color="rgb(249,160,63)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

export default LiveShow
