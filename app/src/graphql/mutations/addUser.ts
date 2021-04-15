import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation AddUser($phone: String!) {
    addUser(phone: $phone)
  }
`
