import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useRef, useState } from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import AppButton from '../../components/AppButton'
import ContestVideoList from '../../components/ContestVideoList'
import YourRankingComp from '../../components/YourRankingComp'
import { globalStyles } from '../../utils/globalStyles'
import { ScreenNames } from '../../utils/ScreenNames'
import VoteStyles from '../VoteAndWin/styles'
import styles from './styles'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import TopCreatorItem from '../../components/TopCreatorItem'
import { Tab, Tabs } from 'native-base'

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

const CREATOR_MOCK_DATA = [
  {
    rank: 1,
    profile_pic: 'https://picsum.photos/200',
    name: 'John Doe',
    numOfLikes: 120,
  },
  {
    rank: 2,
    profile_pic: 'https://picsum.photos/200',
    name: 'James Doe',
    numOfLikes: 105,
  },
  {
    rank: 3,
    profile_pic: 'https://picsum.photos/200',
    name: 'Ed Doe',
    numOfLikes: 85,
  },
]

const index = () => {
  const navigation = useNavigation()
  const tabRef = useRef<Tabs>(null)

  const [position, setPosition] = useState(0)

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerStyle}>
        <YourRankingComp
          ranking={0}
          votes={0}
          onPress={() =>
            navigation.navigate(ScreenNames.HomeScreens.RANKING_DETAILS_SCREEN)
          }
        />
        <View style={[VoteStyles.buttonsGroup, globalStyles.rowContainer]}>
          <AppButton
            containerStyle={[VoteStyles.buttonStyle, styles.buttonStyle]}
            textStyle={VoteStyles.buttonTextStyle}
            title="Vote More"
            onPress={() => {}}
          />
          <View style={styles.itemSeparator} />
          <AppButton
            containerStyle={[VoteStyles.buttonStyle, styles.buttonStyle]}
            textStyle={VoteStyles.buttonTextStyle}
            title="Invite Friends"
            onPress={() => {}}
          />
        </View>

        <View style={[globalStyles.rowContainer, styles.pagerHeaderGroup]}>
          <AppButton
            containerStyle={[
              VoteStyles.buttonStyle,
              styles.buttonStyle,
              styles.tabHeaderButton,
              position == 0
                ? styles.selectedTabHeader
                : styles.nonSelectedTabHeader,
            ]}
            textStyle={[
              VoteStyles.buttonTextStyle,
              position == 0
                ? styles.selectedTabHeaderText
                : styles.nonSelectedTabHeaderText,
            ]}
            title="Top Creators"
            onPress={() => {
              setPosition(0)
            }}
          />
          <AppButton
            containerStyle={[
              VoteStyles.buttonStyle,
              styles.buttonStyle,
              styles.tabHeaderButton,
              position == 1
                ? styles.selectedTabHeader
                : styles.nonSelectedTabHeader,
            ]}
            textStyle={[
              VoteStyles.buttonTextStyle,
              position == 1
                ? styles.selectedTabHeaderText
                : styles.nonSelectedTabHeaderText,
            ]}
            title="Top Videos"
            onPress={() => {
              setPosition(1)
            }}
          />
        </View>
      </View>
    )
  }, [position])

  const renderCreator = ({ item, index }) => (
    <TopCreatorItem creator={item} index={index} />
  )

  const renderCreatorSeparator = () => (
    <View style={{ height: heightPercentageToDP(1.8) }} />
  )

  return (
    <View style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={VoteStyles.container}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        <Tabs
          tabContainerStyle={styles.tabContainerStyle}
          ref={tabRef}
          tabBarUnderlineStyle={globalStyles.transparentBackground}
          onChangeTab={({ i }) => setPosition(i)}
          locked
          page={position}
        >
          <Tab heading={''} activeTabStyle={globalStyles.transparentBackground}>
            <FlatList
              listKey={'1'}
              data={CREATOR_MOCK_DATA}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => `key${index}`}
              ItemSeparatorComponent={renderCreatorSeparator}
              renderItem={renderCreator}
            />
          </Tab>
          <Tab
            heading={'1'}
            tabStyle={globalStyles.transparentBackground}
            activeTabStyle={globalStyles.transparentBackground}
          >
            <ContestVideoList
              data={IMAGE_MOCK_DATA}
              scrollable={false}
              contentContainerStyle={globalStyles.transparentBackground}
            />
          </Tab>
        </Tabs>
      </ScrollView>
    </View>
  )
}

export default index
