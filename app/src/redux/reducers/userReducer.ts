import { User } from '../../../types/models/User'
import { UserActionTypes } from '../actionTypes/userActionTypes'

interface UserState {
  user: User | null
  isLoading: boolean
  error: any
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
}

export const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case 'USER_INIT':
      return {
        ...state,
        isLoading: true,
      }
    case 'USER_INIT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        user: action.user,
      }

    case 'USER_INIT_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }

    case 'USER_LOGOUT':
      return {
        ...state,
        isLoading: false,
        user: null,
      }

    default:
      return state
  }
}
