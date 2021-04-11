import gql from 'graphql-tag'

export const UPDATE_USER = gql`
  mutation UpdateUser($userID: String!, $username: String!, $email: String!) {
    updateUser(userId: $userID, username: $username, email: $email) {
      id
      email
      phone
      username
      verificationCodeTimeSent
      token
    }
  }
`
