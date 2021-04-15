import gql from 'graphql-tag'

export const GET_SHOW = gql`
  query GetShow($ID: Float!) {
    show(showId: $ID) {
      id
      title
      image_url
      start_date
      end_date
      chatMessages {
        id
        timestamp
        message
        alias
      }
    }
  }
`
