import { useEffect, useState } from 'react'
import { requestMediaLibraryPermissions } from '../utils/helper'
import { UppyClient } from '../utils/TransloaditApi'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import Uppy from '@uppy/core'

interface UppyError {
  title: string
  details: string
}

interface UppyUploadSuccess {
  assembly_id: string
}

const useTransloadit = () => {
  const uppy = UppyClient().uppy
  const [data, setData] = useState<UppyUploadSuccess>()
  const [error, setError] = useState<UppyError>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    requestMediaLibraryPermissions()
  }, [])

  //Needed to convert video file to base64 and then to blob, Since Transloadit only allows blob or file data
  const urlToBlob = async (uri: string) => {
    const fileBase64 = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64',
    })

    return new Promise<Blob | File>((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onerror = reject
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response)
        }
      }
      xhr.open('GET', 'data:image/jpeg;base64,' + fileBase64, true)
      xhr.responseType = 'blob' // convert type
      xhr.send()
    })
  }

  const uploadVideoToTransloadit = async (uri: string) => {
    setIsLoading(true)

    const blobData = await urlToBlob(uri)

    //On Complete of the proceess, Either succeed or failed, this will always triggered
    uppy.on('complete', (a: Uppy.UploadResult<{}, {}> | any) => {
      if (a.failed.length > 0) {
        setError({
          title: 'Something Went Wrong !',
          details: a.failed[0].error,
        })
        setIsLoading(false)
      } else if (a.successful.length > 0) {
        setData({
          assembly_id: a.transloadit[0].assembly_id,
        })
        setIsLoading(false)
      }
    })

    uppy.addFile({
      name: uri.split('/').pop(),
      type: 'video/*',
      data: blobData,
      source: 'Local',
      isRemote: false,
    })
    await uppy.upload()
  }

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
        videoMaxDuration: 60,
      })

      if (!result.cancelled) {
        uploadVideoToTransloadit(result.uri)
      }
    } catch (e) {
      console.log('VIDEO_PICKING_ERROR', { e })
    }
  }

  return {
    data,
    error,
    isLoading,
    pickVideo,
  }
}

export default useTransloadit
