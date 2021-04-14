import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation AddUser($phone: String!) {
    add_user(phone: $phone)
  }
`
