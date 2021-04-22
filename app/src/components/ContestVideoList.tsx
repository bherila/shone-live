import React from 'react'
import { View, FlatList, StyleProp, ViewStyle } from 'react-native'
import styles from '../Screens/VoteAndWin/styles'
import ContestListItem from './ContestListItem'

interface Props {
  data: any[]
  scrollable?: boolean
  renderHeader?: () => JSX.Element
  renderFooter?: () => JSX.Element
}

const renderItem = ({ item, index }) => (
  <ContestListItem item={item} index={index} />
)

const renderItemSeparator = () => <View style={styles.itemSeparator}></View>

const ContestVideoList = ({
  data,
  renderFooter,
  renderHeader,
  scrollable
}: Props) => {
  const footer = () => {
    return <View style={styles.footer}></View>
  }

  return (
    <FlatList
      data={data}
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
