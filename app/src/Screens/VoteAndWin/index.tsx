import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import AppButton from '../../components/AppButton'
import ContestListItem from '../../components/ContestListItem'
import { useAppSelector } from '../../redux/store'
import { globalStyles } from '../../utils/globalStyles'
import styles from './styles'

const IMAGE_MOCK_DATA = [
  {
    image_url: 'https://picsum.photos/200/300',
    likes: 150,
    bar_count: 80
  },
  {
    image_url: 'https://picsum.photos/200/300',
    likes: 80,
    bar_count: 55
  },
  {
    image_url: 'https://picsum.photos/200/300',
    likes: 245,
    bar_count: 60
  }
]

const index = () => {
  const user = useAppSelector(state => state.user.user)

  const renderHeader = () => (
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

      <TouchableOpacity style={styles.rankingContainer}>
        <Text style={[styles.textStyle, styles.yourRanking]}>Your Ranking</Text>
        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>Ranking</Text>
          <Text style={styles.textStyle}>{0}</Text>
        </View>
        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>Votes</Text>
          <Text style={styles.textStyle}>{0}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  const renderFooter = () => <View style={styles.footer}></View>
  const renderItemSeparator = () => <View style={styles.itemSeparator}></View>

  const renderItem = ({ item, index }) => (
    <ContestListItem item={item} index={index} />
  )

  return (
    <View style={[globalStyles.container, styles.container]}>
      <FlatList
        data={IMAGE_MOCK_DATA}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item, index) => `key${index}`}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderItemSeparator}
      />
    </View>
  )
}

export default index
