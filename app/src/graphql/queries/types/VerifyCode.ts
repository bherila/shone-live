/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VerifyCode
// ====================================================

export interface VerifyCode_verifyCode {
  __typename: 'User'
  id: string
  email: string | null
  phone: string
  username: string
  token: string | null
}

export interface VerifyCode {
  verifyCode: VerifyCode_verifyCode
}

export interface VerifyCodeVariables {
  code: string
  phone: string
}
