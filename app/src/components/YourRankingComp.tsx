import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from '../Screens/VoteAndWin/styles'
import { countFormatter } from '../utils/helper'

interface Props {
  ranking: number
  votes: number
  onPress?: () => void
}

const YourRankingComp = ({ ranking, votes, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.rankingContainer}
      disabled={!onPress}
      onPress={onPress}
    >
      <Text style={[styles.textStyle, styles.yourRanking]}>Your Ranking</Text>
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>Ranking</Text>
        <Text style={styles.textStyle}>{countFormatter(ranking)}</Text>
      </View>
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>Votes</Text>
        <Text style={styles.textStyle}>{countFormatter(votes)}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(YourRankingComp)
