import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ImageSourcePropType,
  TouchableOpacity
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import FontNames from '../utils/Fonts/FontNames'
import { globalStyles } from '../utils/globalStyles'
import RoundIconButton from './RoundIconButton'

interface Props {
  item: {
    image_url: ImageSourcePropType
    likes: number
    bar_count: number
  }
  index: number
}

const ContestListItem = ({
  item: { image_url, likes, bar_count },
  index
}: Props) => {
  const dim = index % 2 == 0 ? { marginRight: wp(5) } : { marginLeft: wp(5) }
  return (
    <TouchableOpacity style={[styles.container, dim]}>
      <ImageBackground
        source={
          image_url ? { uri: image_url } : require('../../assets/avatar.jpg')
        }
        style={styles.image}
      >
        <RoundIconButton
          containerStyle={[styles.playButton]}
          iconStyle={{ height: 19, width: 13 }}
          iconUri={require('../../assets/play.png')}
          onPress={() => {}}
        />
        <View style={[globalStyles.rowContainer, styles.likeBarcontainer]}>
          <View style={styles.item}>
            <Image
              style={styles.icon}
              source={require('../../assets/like.png')}
            />
            <Text style={styles.text}>{likes}</Text>
          </View>
          <View style={styles.item}>
            <Image
              style={styles.icon}
              source={require('../../assets/bar.png')}
            />
            <Text style={styles.text}>{bar_count}/100</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default ContestListItem

const styles = StyleSheet.create({
  container: {
    height: hp(27),
    width: wp(40),
    maxWidth: wp(40),
    flex: 1,
    margin: 0,
    borderRadius: wp(2.5),
    overflow: 'hidden',
    backgroundColor: 'grey',
    position: 'relative'
  },
  likeBarcontainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff30'
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    alignItems: 'center'
  },
  icon: {
    width: wp(3),
    height: wp(3)
  },
  text: {
    fontFamily: FontNames.POPPINS_SEMIBOLD,
    fontSize: RFValue(10),
    marginHorizontal: wp(1),
    color: 'white'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2.5)
  },
  playButton: {
    position: 'absolute',
    backgroundColor: '#F7F6FC80',
    borderWidth: 0,
    width: wp(14),
    height: wp(14),
    zIndex: 11,
    top: 100,
    bottom: 100,
    left: 50,
    right: 50
  }
})
