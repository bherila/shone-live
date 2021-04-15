import { gql } from '@apollo/client'

export const VERIFY_CODE = gql`
  query VerifyCode($code: String!, $phone: String!) {
    verifyCode(code: $code, phone: $phone) {
      id
      email
      phone
      username
      token
    }
  }
`
