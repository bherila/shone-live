import React from 'react'
import { View, FlatList, StyleProp, ViewStyle } from 'react-native'
import styles from '../Screens/VoteAndWin/styles'
import ContestListItem from './TopVideosListItem'

interface Props {
  data: any[]
  scrollable?: boolean
  renderHeader?: () => JSX.Element
  renderFooter?: () => JSX.Element
  contentContainerStyle?: StyleProp<ViewStyle>
}

const renderItem = ({ item, index }) => (
  <ContestListItem item={item} index={index} />
)

const renderItemSeparator = () => <View style={styles.itemSeparator}></View>

const ContestVideoList = ({
  data,
  renderFooter,
  renderHeader,
  scrollable,
  contentContainerStyle,
}: Props) => {
  const footer = () => {
    return <View style={styles.footer}></View>
  }

  return (
    <FlatList
      data={data}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={scrollable}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item, index) => `key-contest${index}`}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter || footer}
      ItemSeparatorComponent={renderItemSeparator}
    />
  )
}

export default React.memo(ContestVideoList)
