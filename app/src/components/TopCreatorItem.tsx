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
    <View
      style={[globalStyles.rowContainer, { flex: 1, alignItems: 'center' }]}
    >
      <View
        style={{
          width: wp(7),
          height: wp(7),
          alignSelf: 'center',
          top: 8
        }}
      >
        <Image
          source={require('../../assets/bar.png')}
          style={{
            width: wp(4.5),
            height: wp(4.5),
            tintColor: 'black'
          }}
        />
        <Text
          style={[
            globalStyles.primaryText,
            {
              position: 'absolute',
              right: 5,
              top: -17,
              zIndex: 15,
              fontSize: RFValue(15),
              fontWeight: 'bold',
              fontFamily: FontNames.POPPINS_SEMIBOLD
            }
          ]}
        >
          {creator.rank}
        </Text>
      </View>
      <View
        style={[
          globalStyles.rowContainer,
          {
            justifyContent: 'space-between',
            borderColor: 'black',
            borderWidth: 3,
            flex: 1,
            borderRadius: wp(10),
            marginStart: wp(6),
            alignItems: 'center'
          }
        ]}
      >
        <View style={globalStyles.rowContainer}>
          <Image
            source={{ uri: creator.profile_pic }}
            style={{
              width: wp(10),
              height: wp(10),
              borderRadius: 42 / 2,
              margin: 2
            }}
          />
          <Text
            style={[
              globalStyles.primaryText,
              {
                padding: wp(2),
                fontFamily: FontNames.POPPINS_MEDIUM
              }
            ]}
          >
            {creator.name}
          </Text>
        </View>
        <View style={[globalStyles.rowContainer, { paddingHorizontal: wp(3) }]}>
          <Image
            source={require('../../assets/like.png')}
            style={{
              tintColor: 'black',
              width: wp(5),
              height: wp(5),
              marginHorizontal: wp(1),
              alignSelf: 'center'
            }}
          />
          <Text
            style={[
              globalStyles.primaryText,
              {
                minWidth: wp(8),
                maxWidth: wp(10),
                fontFamily: FontNames.POPPINS_MEDIUM
              }
            ]}
          >
            {creator.numOfLikes}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default TopCreatorItem

const styles = StyleSheet.create({})
