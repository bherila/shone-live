import { ApolloError } from '@apollo/client'
import { User } from '../../generated/graphql'
import { UserActionTypes } from '../actionTypes/UserActionTypes'

export const userInit = (): UserActionTypes => {
  return {
    type: 'USER_INIT'
  }
}

export const userInitSuccess = (user: User ): UserActionTypes => {
  return {
    type: 'USER_INIT_SUCCESS',
    user
  }
}

export const userInitFailure = (error: ApolloError): UserActionTypes => {
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
