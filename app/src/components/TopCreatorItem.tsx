import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import FontNames from '../utils/Fonts/FontNames'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  creator: {
    rank: number
    profile_pic: string
    name: string
    numOfLikes: number
  }
  index: number
}

const TopCreatorItem = ({ creator, index }: Props) => {
  return (
    <View style={[globalStyles.rowContainer, globalStyles.alignItemCenter]}>
      <View style={styles.barRankIcon}>
        <Image
          source={require('../../assets/bar.png')}
          style={styles.barIcon}
        />
        <Text style={[globalStyles.primaryText, styles.rankTextStyle]}>
          {creator.rank}
        </Text>
      </View>
      <View style={[globalStyles.rowContainer, styles.creatorDetailsContainer]}>
        <View style={globalStyles.rowContainer}>
          <Image
            source={{ uri: creator.profile_pic }}
            style={styles.creatorProfilePic}
          />
          <Text style={[globalStyles.primaryText, styles.creatorName]}>
            {creator.name}
          </Text>
        </View>
        <View style={[globalStyles.rowContainer, styles.likeContainer]}>
          <Image
            source={require('../../assets/like.png')}
            style={styles.likeIcon}
          />
          <Text style={[globalStyles.primaryText, styles.numOfLikes]}>
            {creator.numOfLikes}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default TopCreatorItem

const styles = StyleSheet.create({
  barIcon: {
    width: wp(4.5),
    height: wp(4.5),
    tintColor: 'black',
  },
  numOfLikes: {
    minWidth: wp(8),
    maxWidth: wp(10),
    fontFamily: FontNames.POPPINS_MEDIUM,
  },
  likeIcon: {
    tintColor: 'black',
    width: wp(5),
    height: wp(5),
    marginHorizontal: wp(1),
    alignSelf: 'center',
  },
  likeContainer: { paddingHorizontal: wp(3) },
  creatorName: {
    padding: wp(2),
    fontFamily: FontNames.POPPINS_MEDIUM,
  },
  creatorProfilePic: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10) / 2,
    margin: wp(0.5),
    alignSelf: 'center',
  },
  creatorDetailsContainer: {
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: wp(0.6),
    flex: 1,
    borderRadius: wp(10),
    marginStart: wp(6),
    alignItems: 'center',
  },
  rankTextStyle: {
    position: 'absolute',
    right: wp(1.2),
    top: wp(-4),
    zIndex: 15,
    fontSize: RFValue(15),
    fontWeight: 'bold',
    fontFamily: FontNames.POPPINS_SEMIBOLD,
  },
  barRankIcon: {
    width: wp(7),
    height: wp(7),
    alignSelf: 'center',
    top: wp(2),
  },
})
