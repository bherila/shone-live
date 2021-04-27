import { useNavigation } from '@react-navigation/core'
import React, { useCallback } from 'react'
import { View, Text, Image } from 'react-native'
import AppButton from '../../components/AppButton'
import ContestVideoList from '../../components/ContestVideoList'
import YourRankingComp from '../../components/YourRankingComp'
import { useAppSelector } from '../../redux/store'
import { globalStyles } from '../../utils/globalStyles'
import { ScreenNames } from '../../utils/ScreenNames'
import styles from './styles'

const IMAGE_MOCK_DATA = [
  {
    image_url: 'https://picsum.photos/200/300',
    likes: 150,
    bar_count: 80,
  },
  {
    image_url: 'https://picsum.photos/200/300',
    likes: 80,
    bar_count: 55,
  },
  {
    image_url: 'https://picsum.photos/200/300',
    likes: 245,
    bar_count: 60,
  },
]

const index = () => {
  const user = useAppSelector(state => state.user.user)
  const navigation = useNavigation()

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerStyle}>
        <View style={[globalStyles.rowContainer, globalStyles.alignItemCenter]}>
          <Image
            source={require('../../../assets/avatar.jpg')}
            resizeMode="cover"
            style={styles.profilePic}
          />
          <Text style={styles.username} numberOfLines={1}>
            {user?.username}
          </Text>
        </View>
        <View style={styles.buttonsGroup}>
          <AppButton
            containerStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            title="View Challenges"
            onPress={() => {}}
          />
          <AppButton
            containerStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            title="Share Your Page"
            onPress={() => {}}
          />
        </View>
        <YourRankingComp
          ranking={0}
          votes={0}
          onPress={() =>
            navigation.navigate(ScreenNames.HomeScreens.RANKING_DETAILS_SCREEN)
          }
        />
      </View>
    )
  }, [])

  const renderFooter = useCallback(() => {
    return <View style={styles.footer}></View>
  }, [])

  return (
    <View style={globalStyles.container}>
      <View style={styles.container}>
        <ContestVideoList
          data={IMAGE_MOCK_DATA}
          renderHeader={renderHeader}
          renderFooter={renderFooter}
        />
      </View>
    </View>
  )
}

export default index
