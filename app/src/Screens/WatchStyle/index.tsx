import { Video } from 'expo-av'
import React, { useRef, useState } from 'react'
import { View, Text, Image } from 'react-native'
import Loader from '../../components/Loader'
import { globalStyles } from '../../utils/globalStyles'
import { StatusBar } from 'expo-status-bar'
import RoundIconButton from '../../components/RoundIconButton'
import AppButton from '../../components/AppButton'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ICON_CLOSE_WIDTH = 33
const ICON_CLOSE_HEIGHT = 33
const ICON_HEART_HEIGHT = 45
const ICON_HEART_WIDTH = 50

const closeStyle = {
  width: ICON_CLOSE_WIDTH,
  height: ICON_CLOSE_HEIGHT,
}

const heartStyle = {
  width: ICON_HEART_WIDTH,
  height: ICON_HEART_HEIGHT,
}

const WatchStyle = () => {
  const video = useRef<Video>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <View style={globalStyles.container}>
      <Loader isLoading={isLoading} />
      <StatusBar translucent style={'inverted'} />
      <Video
        ref={video}
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/gasalertdemo.appspot.com/o/Screen%20Recording%202021-04-20%20at%206.39.16%20PM.mov?alt=media&token=3bd5ba48-b630-4272-bcde-c771905399ba',
        }}
        style={styles.video}
        isLooping={true}
        shouldPlay={isPlaying}
        volume={1}
        resizeMode="cover"
        onLoad={() => setIsLoading(false)}
      />
      <View style={[styles.bottomView, globalStyles.absoluteView]}>
        <View style={[globalStyles.rowContainer, styles.bottomViewWrapper]}>
          <RoundIconButton
            iconUri={require('../../../assets/close.png')}
            iconStyle={closeStyle}
            onPress={() => {}}
          />
          <View style={closeStyle} />
          <RoundIconButton
            iconStyle={heartStyle}
            iconUri={require('../../../assets/heart.png')}
            onPress={() => {}}
          />
        </View>

        <View
          style={[
            globalStyles.rowContainer,
            styles.bottomTextButtonShareContainer,
          ]}
        >
          <Text style={styles.textStyle}>your points {0}</Text>
          <AppButton
            title="see prizes"
            onPress={() => {}}
            textStyle={styles.textStyle}
            containerStyle={styles.seePriceButtonContainer}
          />
          <TouchableOpacity>
            <Image
              style={styles.shareIcon}
              source={require('../../../assets/share.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default WatchStyle
