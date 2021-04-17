import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

const useImagePicker = (height: number, width?: number) => {
  const [image, setImage] = useState<
    (ImagePicker.ImagePickerResult & ImageInfo) | ImageManipulator.ImageResult
  >()
  const [error, setError] = useState<any>()

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status === ImagePicker.PermissionStatus.DENIED) {
          alert('Sorry, we need camera roll permissions to make this work!')
        }
      }
    })()
  }, [])

  const resizeImage = async (imageUri: string) => {
    const resizeDimensions = width ? { height, width } : { height }
    console.log({ width, height, resizeDimensions })

    const manipResult = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          resize: resizeDimensions
        }
      ],
      { format: ImageManipulator.SaveFormat.JPEG }
    )

    return manipResult
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6
      })

      if (!result.cancelled) {
        if (height) {
          const resizedImage = await resizeImage(result.uri)
          return setImage(resizedImage)
        }
        setImage(result)
      }
    } catch (e) {
      console.log('useImagePicker : pickImage => ', { e })
      setError(e)
    }
  }

  return {
    pickImage,
    image,
    setImage,
    error,
    resizeImage
  }
}

export default useImagePicker
