import { StatusBar } from 'expo-status-bar'
import React, { useCallback } from 'react'
import { View, Text, FlatList, ListRenderItem } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import ContestVideoVoteItem from '../../components/ContestVideoVoteItem'
import { globalStyles } from '../../utils/globalStyles'
import styles from './styles'

const CONTEST_VIDEO_VOTE = [
  {
    title: 'Day 4',
    heading: 'Springtime in Paris',
    description:
      'This challenge is to post your best 3 outfits for springtime in Paris... for tourists, fine dining, etc event.',
    isNew: true,
    thumbnailImage: 'https://picsum.photos/200',
    expiry: '3 days left',
  },

  {
    title: 'Day 4',
    heading: 'Springtime in Paris',
    description:
      'This challenge is to post your best 3 outfits for springtime in Paris... for tourists, fine dining, etc event.',
    isNew: false,
    thumbnailImage: 'https://picsum.photos/200',
    expiry: '3 days left',
  },
]

export interface VoteItem {
  title: string
  heading: string
  description: string
  isNew: boolean
  thumbnailImage: string
  expiry: string
}

interface ItemProps {
  item: VoteItem
  index?: number
}

interface Props {
  renderHeader?: () => JSX.Element
}

const index = ({ renderHeader }: Props) => {
  const renderVoteItem = useCallback(
    ({ item, index }: ItemProps) => <ContestVideoVoteItem voteItem={item} />,
    [],
  )

  const keyExtractor = (item: VoteItem, index: number) =>
    `key-${item.title}${index}`

  const renderSepartor = useCallback(
    () => <View style={styles.listSeparator} />,
    [],
  )

  return (
    <View style={[globalStyles.container, styles.container]}>
      <StatusBar style="light" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={CONTEST_VIDEO_VOTE}
        renderItem={renderVoteItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSepartor}
        ListHeaderComponent={renderHeader}
      />
    </View>
  )
}

export default index
