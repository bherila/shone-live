import gql from 'graphql-tag'

export const ADD_MESSAGE = gql`
  mutation AddMessage($userID: Float!, $message: String!, $showID: Float!) {
    addMessage(user_id: $userID, message: $message, show_id: $showID) {
      id
      timestamp
      message
      author_alias
    }
  }
`
