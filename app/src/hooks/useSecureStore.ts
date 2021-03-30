import React from 'react'
import StorageKeys from '../utils/StorageKeys'
import * as SecureStore from 'expo-secure-store'

export const useSecureStore = (key?: string) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any>()
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    if (key) {
      setIsLoading(true)
      ;(async () => {
        try {
          const storedItem = await SecureStore.getItemAsync(key)
          console.log({ storedItem })

          if (storedItem) {
            const parsedData =
              typeof storedItem == 'object'
                ? await JSON.parse(storedItem)
                : storedItem
            setData(parsedData)
          }
          setIsLoading(false)
        } catch (e) {
          console.log('ERROR: UNABLE TO RETRIVE ITEM FROM STORAGE', { e })
          setIsLoading(false)
          setError(e)
        }
      })()
    }
  }, [])

  const setItem = async (key: string, value: any) => {
    try {
      const response = await SecureStore.setItemAsync(
        key,
        JSON.stringify(value)
      )
    } catch (e) {
      console.log('ERROR: UNABLE TO SAVE ITEM IN STORAGE', { e })
      setError(e)
    }
  }

  return { isLoading, data, setItem, error }
}
