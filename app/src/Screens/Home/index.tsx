// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  FlatList
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

import { useMutation, useQuery } from '@apollo/client'
import { GetShow, GetShowVariables } from '../../graphql/queries/types/GetShow'
import { GET_SHOW } from '../../graphql/queries/getShow'
import Loader from '../../components/Loader'
import { globalStyles } from '../../utils/globalStyles'
import { ADD_MESSAGE } from '../../graphql/mutations/addMessage'
import {
  AddMessage,
  AddMessageVariables
} from '../../graphql/mutations/types/AddMessage'
import { useAppSelector } from '../../redux/store'

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

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageList, setMessageList] = useState<any>([])
  const user = useAppSelector(state => state.user.user)

  const { data: show, error, loading } = useQuery<GetShow, GetShowVariables>(
    GET_SHOW,
    {
      variables: {
        ID: parseFloat(route.params.showId)
      },
      pollInterval: 2000
    }
  )

  const [
    addMessage,
    { data: messageData, error: messageError, loading: messageLoading }
  ] = useMutation<AddMessage, AddMessageVariables>(ADD_MESSAGE, {
    variables: {
      message: message,
      showID: parseFloat(route.params.showId),
      userID: user ? parseFloat(user?.id) : 0
    }
  })
  console.log(message, route.params.showId, user?.id)

  useEffect(() => {
    if (messageError) Alert.alert(messageError.message)
    console.log({ messageData })
    setMessageList([...messageList, messageData])
    setIsLoading(false)
  }, [messageData, messageError])

  useEffect(() => {
    if (error) Alert.alert(error.message)

    setMessageList(show?.show?.chatMessages)
  }, [show, error])

  return (
    <View style={globalStyles.container}>
      <Loader isLoading={loading} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Agora Live Streaming Component */}
          {/* <LiveStream
            isHost={route.params?.type === 'create'}
            token={''}
            channelID={route.params.showId}
          /> */}

          <View style={styles._body_section}>
            {/* <<<<<<<<<<<<<< SCREEN HEADER >>>>>>>>>>>> */}
            <View style={styles._header}>
              <Header data={exampleShow} show={show} />
            </View>
            {/* <<<<<<<<<<<<<< ACTIVE POLL>>>>>>>>>>>> */}

            {exampleShow.activePoll === null ? (
              <Poll data={exampleShow.activePoll} />
            ) : null}
            {/* <<<<<<<<<<<<<< FOOTER >>>>>>>>>>>> */}
            <View style={styles._footer}>
              <View style={styles._footer_inner_section}>
                <View style={styles._message_section}>
                  <FlatList
                    scrollEnabled
                    bounces
                    keyExtractor={(item, index) => 'key' + index}
                    data={messageList}
                    extraData={messageList}
                    keyboardShouldPersistTaps="always"
                    renderItem={({ item, index }) => {
                      return (
                        <View style={styles._chat_row}>
                          <Image
                            source={require('../../../assets/chatIcon.png')}
                            style={styles._user_profile}
                          />
                          <View style={{ flex: 1 }}>
                            <Text style={styles._name}>
                              {item?.author_alias}
                            </Text>
                            <Text style={styles._message}>{item?.message}</Text>
                          </View>
                        </View>
                      )
                    }}
                  />
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
                  onChangeText={text => setMessage(text)}
                />
                <View style={styles.footer_btns_row}>
                  <TouchableOpacity
                    disabled={isLoading}
                    style={styles._footer_icon_circle}
                    onPress={async () => {
                      if (message) {
                        console.log({ messageList })

                        setIsLoading(true)
                        setMessageList([
                          ...messageList,
                          {
                            author_alias: user?.username,
                            id: '20',
                            message: message,
                            timestamp: '2021-04-12T00:29:57.162Z',
                            __typename: 'MessageEntity'
                          }
                        ])
                        await addMessage()
                      }
                    }}
                  >
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
    </View>
  )
}

export default LiveShow
