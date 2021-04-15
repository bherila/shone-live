import gql from 'graphql-tag'

export const ADD_MESSAGE = gql`
  mutation AddMessage($message: String!, $showID: Float!) {
    add_message(message: $message, show_id: $showID) {
      id
      timestamp
      message
      author_alias
    }
  }
`
