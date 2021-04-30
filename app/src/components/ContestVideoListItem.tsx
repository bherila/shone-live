import React, { memo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import { VoteItem } from '../Screens/ContestVideoScreen'
import { AppColors } from '../utils/colors'
import FontNames from '../utils/Fonts/FontNames'
import { globalStyles } from '../utils/globalStyles'

interface Props {
  voteItem: VoteItem
  isLastIndex: boolean
  onPress?: () => void
}

const ContestVideoVoteItem = ({
  voteItem: { title, heading, description, isNew, thumbnailImage, expiry },
  isLastIndex,
  onPress,
}: Props) => {
  return (
    <View>
      <View>
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: thumbnailImage }}
            style={styles.imageThumbnail}
          >
            <View
              style={[
                globalStyles.viewCenter,
                styles.playButtonAbsoluteWrapper,
              ]}
            >
              <TouchableOpacity style={[styles.playButtonContainer]}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={require('../../assets/play_round.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContentContainer}>
              <TouchableOpacity style={styles.expiryContainer}>
                <Text style={[globalStyles.primaryText, styles.expiryText]}>
                  {expiry}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={[globalStyles.rowContainer, styles.dayNewContainer]}>
            <View style={globalStyles.rowContainer}>
              <Image
                source={require('../../assets/calendar.png')}
                style={styles.calanderIcon}
              />
              <Text style={styles.dayText}>{title}</Text>
            </View>
            {isNew && (
              <View style={styles.newTextContainer}>
                <Text style={[styles.dayText, styles.newText]}>New</Text>
              </View>
            )}
          </View>

          <Text
            style={[globalStyles.primaryTextMontserrat, styles.heading]}
            numberOfLines={1}
          >
            {heading}
          </Text>
          <Text
            style={[globalStyles.primaryTextMontserrat, styles.descriptionText]}
            numberOfLines={3}
          >
            {description}
          </Text>
        </View>
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadIconContainer}
            onPress={onPress}
          >
            <Image
              source={require('../../assets/upload.png')}
              style={styles.uploadIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isLastIndex && <View style={styles.footerSpace}></View>}
    </View>
  )
}

export default memo(ContestVideoVoteItem)

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.WHITE,
    padding: wp(7.5),
    borderRadius: wp(11),
    paddingBottom: hp(6),
    marginHorizontal: wp(5),
  },
  footerSpace: {
    height: hp(10),
    zIndex: -10,
  },
  uploadContainer: {
    alignSelf: 'center',
    padding: wp(3),
    backgroundColor: AppColors.PRIMARY_BACKGROUND,
    borderRadius: 100,
    position: 'absolute',
    bottom: wp(-18) / 2,
  },
  uploadIcon: { width: wp(5.5), height: wp(5.5) },
  uploadIconContainer: {
    backgroundColor: AppColors.PRIMARY,
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(15) / 2,
  },
  heading: {
    textTransform: 'capitalize',
    paddingTop: wp(4),
  },
  dayNewContainer: {
    marginTop: wp(5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calanderIcon: {
    height: wp(5),
    width: wp(5),
    tintColor: AppColors.LIGHT_GREY,
  },
  imageThumbnail: {
    width: '100%',
    height: hp(19),
    borderRadius: wp(8),
    overflow: 'hidden',
  },
  expiryContainer: {
    borderRadius: wp(50),
    backgroundColor: AppColors.WHITE,
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
  },
  expiryText: {
    color: AppColors.BLACK,
    fontSize: RFValue(12),
    fontFamily: FontNames.MONTSERRAT_BOLD,
  },

  imageContentContainer: {
    padding: wp(5),
    alignItems: 'flex-start',
  },
  playButtonContainer: {
    width: wp(10),
    height: wp(10),
  },
  playButtonAbsoluteWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dayText: {
    fontSize: RFValue(10),
    fontFamily: FontNames.MONTSERRAT_BOLD,
    color: AppColors.LIGHT_GREY,
    marginHorizontal: wp(2),
    alignSelf: 'center',
  },
  newText: {
    color: AppColors.WHITE,
  },
  newTextContainer: {
    backgroundColor: AppColors.PRIMARY_BACKGROUND,
    borderRadius: wp(50),
    paddingVertical: wp(1.2),
    paddingHorizontal: wp(0.5),
  },
  descriptionText: {
    paddingTop: wp(2),
    fontSize: RFValue(10),
    fontFamily: FontNames.MONTSERRAT_REGULAR,
    color: AppColors.LIGHT_GREY,
  },
})
