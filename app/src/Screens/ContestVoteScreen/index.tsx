import { Video } from 'expo-av'
import React from 'react'
import { View, StatusBar, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { globalStyles } from '../../utils/globalStyles'
import styles from './styles'
import { Thumbnail } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { AppColors } from '../../utils/colors'
import { useNavigation } from '@react-navigation/core'
import { ScreenNames } from '../../utils/ScreenNames'

const gradientOverlayColors = ['#00000000', AppColors.DARK_GREY + '90']

const index = () => {
  const navigation = useNavigation()
  return (
    <View style={globalStyles.darkContainer}>
      <StatusBar barStyle="light-content" />
      <Video
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/gasalertdemo.appspot.com/o/Screen%20Recording%202021-04-20%20at%206.39.16%20PM.mov?alt=media&token=3bd5ba48-b630-4272-bcde-c771905399ba',
        }}
        style={styles.backgroundVideo}
        rate={1}
        shouldPlay={true}
        isLooping={true}
        volume={1}
        isMuted={true}
        resizeMode="cover"
      />

      <LinearGradient
        colors={gradientOverlayColors}
        style={styles.bottomOverlay}
      />

      <SafeAreaView style={[globalStyles.colorlessContainer, styles.container]}>
        <View
          style={[
            globalStyles.rowContainer,
            globalStyles.alignItemCenter,
            { justifyContent: 'space-between' },
          ]}
        >
          <View
            style={[globalStyles.rowContainer, globalStyles.alignItemCenter]}
          >
            <Thumbnail source={{ uri: 'https://picsum.photos/200' }} />
            <Text style={[styles.titleText, styles.authorNameText]}>
              Alex Turner
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                ScreenNames.MainScreenTabs.CONTEST_VIDEO_LIST_SCREEN,
              )
            }
          >
            <Image
              style={styles.voteIcon}
              source={require('../../../assets/close.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomViewContainer}>
          <View style={[globalStyles.viewCenter, globalStyles.rowContainer]}>
            <TouchableOpacity
              style={[styles.closeIconContainer, globalStyles.viewCenter]}
            >
              <Image
                style={styles.voteIcon}
                source={require('../../../assets/close.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.closeIconContainer,
                globalStyles.viewCenter,
                styles.likeIconContainer,
              ]}
            >
              <Image
                style={[styles.heartIcon]}
                resizeMode="contain"
                source={require('../../../assets/heart_fill.png')}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.titleText} numberOfLines={1}>
            Springtime In Paris
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default index
