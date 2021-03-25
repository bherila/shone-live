// eslint-disable-next-line no-use-before-define
import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { Video } from 'expo-av'
// css
import styles from './styles'
// icons
import { FontAwesome, Entypo } from '@expo/vector-icons'
// components
import { Header, Poll } from '../../components'
// purchased component is available but right now its not used
export default class LiveShow extends Component {
  render () {
    interface Product {
      id: string;
      qtyLeft: number;
      imageUrl: string;
      price: number;
      currency: string;
    }

    interface ChatMessage {
      name: string;
      profileImage: string;
      message: string;
    }

    interface Poll {
      question: string;
      options: string[];
    }

    interface LiveShow {
      name: string;
      handle: string;
      featuredProductId: string; // corresponds to one of the IDs of products array
      products: Product[];
      chats: ChatMessage[];
      activePoll?: Poll | null; // if activePoll != null then the poll can be rendered as an overlay
    }

    const exampleShow: LiveShow = {
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

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Video
          source={{
            uri:
              'https://s3-eu-west-1.amazonaws.com/video.gallereplay.com/artistarea/Lighthouse%20stands%20in%20Istanbul%E2%80%99s%20harbour_0554659b-5dc1-43d6-8a93-b31ec6b67f63/Cinemagraph_plain/1920x1080/cinemagraph.mp4'
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
            <Header data={exampleShow} props={this.props} />
          </View>
          {/* <<<<<<<<<<<<<< ACTIVE POLL>>>>>>>>>>>> */}

          {exampleShow.activePoll === null
            ? (
            <Poll data={exampleShow.activePoll} />
              )
            : null}
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
    )
  }
}
