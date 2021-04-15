import gql from 'graphql-tag'

export const ADD_MESSAGE = gql`
  mutation AddMessage($showID: Float!, $message: String!) {
    add_message(showId: $showID, message: $message) {
      id
      message
      timestamp
      alias
    }
  }
`
