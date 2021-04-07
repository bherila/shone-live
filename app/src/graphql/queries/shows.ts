import gql from 'graphql-tag'

export const GET_SHOWS = gql`
  query GetShows {
    shows {
      id
      title
      image_url
      chatMessages {
        id
        message
        author_alias
      }
    }
  }
`
