import gql from 'graphql-tag'

export const GET_SHOWS = gql`
  query GetShows {
    shows {
      id
      title
      image_url
      start_date
      end_date
      chatMessages {
        id
        message
        timestamp
        alias
      }
    }
  }
`
