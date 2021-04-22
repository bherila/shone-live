import { ApolloError } from '@apollo/client'
import { setItemAsync } from 'expo-secure-store'
import { Dispatch } from 'redux'
import { User } from '../../generated/graphql'
import StorageKeys from '../../utils/StorageKeys'
import { AppActions } from '../actionTypes'
import { UserActionTypes } from '../actionTypes/UserActionTypes'

export const userInit = (): UserActionTypes => {
  return {
    type: 'USER_INIT'
  }
}

export const userInitSuccess = (user: User): UserActionTypes => {
  return {
    type: 'USER_INIT_SUCCESS',
    user
  }
}

export const userInitFailure = (error: ApolloError | any): UserActionTypes => {
  return {
    type: 'USER_INIT_FAILURE',
    error
  }
}

export const userLogout = (): UserActionTypes => {
  return {
    type: 'USER_LOGOUT',
    user: {}
  }
}

export const userUpdateStore = (user: User) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      await setItemAsync(StorageKeys.USER, JSON.stringify(user))
      dispatch(userInitSuccess(user))
    } catch (e) {
      dispatch(userInitFailure(e))
    }
  }
}
