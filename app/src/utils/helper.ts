import { ReactNativeFile } from 'apollo-upload-client'
import { PermissionsAndroid } from 'react-native'
import * as mime from 'react-native-mime-types'

export async function requestCameraAndAudioPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ])
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.info('You can use the cameras & mic')
    } else {
      console.warn('Permission denied')
    }
  } catch (err) {
    console.error('Permission Error : ', { err })
  }
}

export const generateRNFile = (uri: string, name: string) => {
  const mimeType = mime.lookup(uri)
  return uri
    ? new ReactNativeFile({
        uri,
        type: mimeType ? mimeType : 'image/jpeg',
        name
      })
    : null
}
