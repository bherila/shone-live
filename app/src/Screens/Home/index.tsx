// eslint-disable-next-line no-use-before-define
import React, { useEffect, useRef, useState } from 'react'
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
  FlatList,
} from 'react-native'
import styles from './styles'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { Header, Poll } from '../../components'

import { useRoute } from '@react-navigation/core'
import LiveStream from '../../components/LiveStream/LiveStream'

import { useMutation, useQuery } from '@apollo/client'
import { GetShow, GetShowVariables } from '../../graphql/queries/types/GetShow'
import { GET_SHOW } from '../../graphql/queries/getShow'
import Loader from '../../components/Loader'
import { ADD_MESSAGE } from '../../graphql/mutations/addMessage'
import {
  AddMessage,
  AddMessageVariables,
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
      currency: 'USD',
    },
  ],
  chats: [
    {
      name: 'Mike A.',
      message: 'DOPE!!!',
      profileImage: 'TODO',
    },
    {
      name: 'Allison H.',
      message: 'YAAASSSSS!!!',
      profileImage: 'TODO',
    },
    {
      name: 'Sarah M.',
      message:
        "This makes me so happy to see. I've always wanted something like this in Platinum. Bling... bling...",
      profileImage: 'TODO',
    },
  ],
  activePoll: {
    question: 'What metal should I use next?',
    options: ['Rose Gold', 'Platinum', 'Silver'],
  },
}

const LiveShow = () => {
  const route: any = useRoute()

  const flatlist = useRef<any>()

  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState<any>([])
  const user = useAppSelector((state) => state.user.user)

  const { data: show, error, loading } = useQuery<GetShow, GetShowVariables>(
    GET_SHOW,
    {
      variables: {
        ID: parseFloat(route.params.showId),
      },

      pollInterval: 2000,
    }
  )

  const [
    addMessage,
    { data: messageData, loading: messageLoading, error: messageError },
  ] = useMutation<AddMessage, AddMessageVariables>(ADD_MESSAGE, {
    variables: {
      showID: parseFloat(route.params.showId),
      message: message,
    },
  })

  useEffect(() => {
    if (messageError) return Alert.alert(messageError.message)
    if (messageData?.add_message) {
      flatlist?.current?.scrollToEnd({ animated: true })
    }
  }, [messageData, messageError])

  useEffect(() => {
    if (error) return Alert.alert(error.message)
    setMessageList(show?.show?.chatMessages)
  }, [show, error])

  const onMessageSend = async (message: string) => {
    if (message) {
      Keyboard.dismiss()
      const data = [
        ...messageList,
        {
          alias: user?.username,
          id: '20',
          message: message,
          timestamp: '2021-04-12T00:29:57.162Z',
        },
      ]

      setMessageList(data)
      flatlist?.current?.scrollToEnd({ animated: true })

      await addMessage()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <Loader isLoading={loading} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          {/* Agora Live Streaming Component */}
          <LiveStream
            isHost={route.params?.type === 'create'}
            token={''}
            channelID={route.params.showId}
          />

          <View style={styles._bodySection}>
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
              <View style={styles._footerInnerSection}>
                <View style={styles._messageSection}>
                  <View style={{ height: 200 }}>
                    <FlatList
                      ref={flatlist}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        flexGrow: 1,
                      }}
                      keyExtractor={(item, index) => `key${index}`}
                      data={messageList}
                      extraData={messageList}
                      keyboardShouldPersistTaps="handled"
                      renderItem={({ item }) => {
                        return (
                          <View style={styles._chatRow}>
                            <Image
                              source={require('../../../assets/chatIcon.png')}
                              style={styles._userProfile}
                            />
                            <View style={{ flex: 1 }}>
                              <Text style={styles._name}>{item?.alias}</Text>
                              <Text style={styles._message}>
                                {item?.message}
                              </Text>
                            </View>
                          </View>
                        )
                      }}
                    />
                  </View>
                </View>

                {/* <<<<<<<<<<<<<< PRODUCT >>>>>>>>>>>> */}
                <View style={styles._footerRightSecttion}>
                  {exampleShow.products.map((val, i) => {
                    return (
                      <TouchableOpacity style={styles._leftBox} key={i}>
                        <Text style={styles._heading}>{val.qtyLeft} LEFT</Text>
                        <Image
                          source={require('../../../assets/product.jpg')}
                          style={{ height: 40, width: 40 }}
                        />
                      </TouchableOpacity>
                    )
                  })}
                  <TouchableOpacity style={styles._shopAll}>
                    <Text style={styles.shopBtnText}>Shop All</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* <<<<<<<<<<<<<< CHAT SECTION >>>>>>>>>>>> */}

              <View style={styles._footerChaRow}>
                <TextInput
                  style={styles._textInput}
                  placeholder="Say Something.."
                  placeholderTextColor="rgb(209,205,205)"
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
                <View style={styles.footerBtnsRow}>
                  <TouchableOpacity
                    disabled={messageLoading}
                    style={styles._footerIconCircle}
                    onPress={async () => {
                      onMessageSend(message)
                      setMessage('')
                    }}
                  >
                    <Entypo
                      name="share-alternative"
                      size={20}
                      color="rgb(249,160,63)"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles._footerIconCircle}>
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
      </>
    </TouchableWithoutFeedback>
  )
}

export default LiveShow
