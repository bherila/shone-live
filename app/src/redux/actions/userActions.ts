import { User } from '../../../types/models/User'
import {
  UserActionTypes,
  UserLogoutAction,
} from '../actionTypes/userActionTypes'

export const userInit = (): UserActionTypes => {
  return {
    type: 'USER_INIT',
  }
}

export const userInitSuccess = (user: User): UserActionTypes => {
  return {
    type: 'USER_INIT_SUCCESS',
    user,
  }
}

export const userInitFailure = (error: object): UserActionTypes => {
  return {
    type: 'USER_INIT_FAILURE',
    error,
  }
}

export const userLogout = (): UserActionTypes => {
  return {
    type: 'USER_LOGOUT',
    user: {},
  }
}
