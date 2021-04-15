import { gql } from '@apollo/client'

export const VERIFY_CODE = gql`
  query VerifyCode($code: String!, $phone: String!) {
    verify_code(code: $code, phone: $phone) {
      id
      email
      phone
      username
      token
    }
  }
`
