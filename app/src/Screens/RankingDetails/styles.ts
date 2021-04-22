import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const styles = StyleSheet.create({
  headerStyle: {
    marginTop: hp(7),
    marginBottom: 0
  },
  buttonStyle: {
    flex: 1,
    paddingHorizontal: 8,
    marginVertical: 0
  },
  itemSeparator: {
    width: wp(3)
  },
  selectedTabHeader: {
    backgroundColor: 'black',
    borderRadius: 0
  },
  selectedTabHeaderText: {
    color: 'white'
  },
  nonSelectedTabHeader: {
    backgroundColor: 'white',
    borderRadius: 0
  },
  nonSelectedTabHeaderText: {
    color: 'black'
  },
  pagerHeaderGroup: {
    borderRadius: wp(3.5),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'
  }
})

export default styles
