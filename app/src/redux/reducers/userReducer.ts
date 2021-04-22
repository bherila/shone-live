import { User } from '../../generated/graphql'
import { UserActionTypes } from '../actionTypes/UserActionTypes'

interface UserState {
  user: User | null
  isLoading: boolean
  error: any
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case 'USER_INIT':
      return {
        ...state,
        isLoading: true
      }
    case 'USER_INIT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.user
      }

    case 'USER_INIT_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    case 'USER_LOGOUT':
      return {
        ...state,
        isLoading: false,
        user: null
      }

    case 'USER_UPDATE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.user
        }
      }

    default:
      return state
  }
}
