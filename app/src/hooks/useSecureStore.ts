import React from 'react'
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
          const storedItem: string = await SecureStore.getItemAsync(key) as string

          if (storedItem) {
            // const parsedData =
            //   typeof storedItem == 'object'
            //     ? await JSON.parse(storedItem)
            //     : storedItem
            const parsedData = JSON.parse(storedItem)
            setData(parsedData)
          }
          setIsLoading(false)
        } catch (e) {
          setIsLoading(false)
          setError(e)
        }
      })()
    }
  }, [])

  const setItem = async (key: string, value: any) => {
    try {
      await SecureStore.setItemAsync(
        key,
        JSON.stringify(value)
      )
    } catch (e) {
      setError(e)
    }
  }

  return { isLoading, data, setItem, error }
}
