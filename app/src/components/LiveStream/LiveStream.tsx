import { useRoute, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ActivityIndicator, Platform, AppState } from 'react-native'
import RtcEngine, {
  RtcLocalView,
  VideoRemoteState,
  RtcRemoteView,
  ChannelProfile,
  ClientRole,
  VideoRenderMode,
} from 'react-native-agora'
import { requestCameraAndAudioPermission } from '../../utils/helper'
import styles from './styles'
import { APP_ID } from '../../utils/environment'

interface Props {
  isHost: boolean
  token: string | undefined
  channelID: string
}

const LiveStream = (props: Props) => {
  const { isHost, token, channelID } = props
  const AgoraEngine = useRef<RtcEngine>()

  const [peerIds, setPeerIds] = useState<any[]>([])
  const [joined, setJoined] = useState(false)
  const [
    broadcasterVideoState,
    setBroadcasterVideoState,
  ] = useState<VideoRemoteState>(VideoRemoteState.Starting)
  const [isBroadcaster, setIsBroadcaster] = useState(isHost)

  useEffect(() => {
    init()
      .then(async () => {
        const uid = isBroadcaster ? 1 : 0

        try {
          await AgoraEngine.current?.joinChannel(token, channelID, null, uid)
        } catch (e) {
          console.log('Join Error', { e })
        }

        AgoraEngine.current?.addListener(
          'RemoteVideoStateChanged',
          (uid, state: VideoRemoteState) => {
            if (uid === 1) setBroadcasterVideoState(state)
          }
        )
      })
      .catch((e) => console.log('Initialization Error : ', { e }))

    return () => {
      ;(async () => {
        try {
          await AgoraEngine.current?.stopPreview()
          await AgoraEngine.current?.destroy()
        } catch (e) {
          console.log('Error ', { e })
        }
      })()
    }
  }, [])

  const videoStateMessage = (state: any) => {
    switch (state) {
      case VideoRemoteState.Stopped:
        console.log('Video turned off by Host')
        return 'Video turned off by Host'

      case VideoRemoteState.Frozen:
        console.log('Connection Issue, Please Wait')
        return 'Connection Issue, Please Wait'

      case VideoRemoteState.Failed:
        console.log('Network Error')
        return 'Network Error'

      default:
        return 'No Video is Playing'
    }
  }

  const init = async () => {
    if (Platform.OS === 'android') await requestCameraAndAudioPermission()
    try {
      const id = (AgoraEngine.current = await RtcEngine.create(APP_ID))
      console.log('Engine Initialized')

      await AgoraEngine.current.enableVideo()
      await AgoraEngine.current.startPreview()

      await AgoraEngine.current.setChannelProfile(
        ChannelProfile.LiveBroadcasting
      )

      if (isBroadcaster) {
        await AgoraEngine.current.setClientRole(ClientRole.Broadcaster)
      }

      // This callback will triggered when the remote user successfully joins the channel.
      AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed)
        setBroadcasterVideoState(VideoRemoteState.Decoding)
        if (peerIds.indexOf(uid) === -1) {
          setPeerIds([...peerIds, uid])
        }
      })

      // This callback will triggered when the remote user leaves the channel or drops offline.
      AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason)
        const ids = peerIds.filter((id) => id !== uid)
        setPeerIds(ids)
      })

      // This callback will triggered when the local user successfully joins the channel.
      AgoraEngine.current.addListener(
        'JoinChannelSuccess',
        async (channel, uid, elapsed) => {
          console.log('JoinChannelSuccess', channel, uid, elapsed)
          setJoined(true)
          try {
            // await AgoraEngine.current?.enableVideo()
          } catch (e) {
            console.log('Enable Video Error', { e })
          }
        }
      )
    } catch (e) {
      console.log('ERROR WHILE CREATING RTC ENGINE', { e })
    }
  }

  return (
    <View style={styles.backgroundVideo}>
      <>
        {!joined ? (
          <ActivityIndicator
            style={[styles.backgroundVideo, { zIndex: 5 }]}
            color="#333"
            size="large"
          />
        ) : (
          <>
            {isBroadcaster ? (
              <RtcLocalView.SurfaceView
                style={styles.backgroundVideo}
                channelId={channelID}
                renderMode={VideoRenderMode.Hidden}
              />
            ) : broadcasterVideoState === VideoRemoteState.Decoding ? (
              <RtcRemoteView.SurfaceView
                uid={1}
                style={styles.backgroundVideo}
                channelId={channelID}
                renderMode={VideoRenderMode.Hidden}
                zOrderMediaOverlay={true}
              />
            ) : (
              <View
                style={[
                  styles.backgroundVideo,
                  { alignItems: 'center', justifyContent: 'center' },
                ]}
              >
                <Text>{videoStateMessage(broadcasterVideoState)}</Text>
              </View>
            )}
          </>
        )}
      </>
    </View>
  )
}

export default LiveStream
