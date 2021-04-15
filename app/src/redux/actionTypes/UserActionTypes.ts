import { User } from "../../generated/graphql"

export const USER_INIT = 'USER_INIT'
export const USER_INIT_SUCCESS = 'USER_INIT_SUCCESS'
export const USER_INIT_FAILURE = 'USER_INIT_FAILURE'
export const USER_LOGOUT = 'USER_LOGOUT'

export interface UserInitAction {
  type: typeof USER_INIT
}

export interface UserInitSuccessAction {
  type: typeof USER_INIT_SUCCESS
  user: User
}

export interface UserInitFailureAction {
  type: typeof USER_INIT_FAILURE
  error: Object
}

export interface UserLogoutAction {
  type: typeof USER_LOGOUT
  user: {}
}

export type UserActionTypes =
  | UserInitAction
  | UserInitSuccessAction
  | UserInitFailureAction
  | UserLogoutAction
