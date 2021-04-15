/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser {
  __typename: 'User'
  id: string
  email: string | null
  phone: string
  username: string
  verificationCodeTimeSent: string
  token: string | null
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser
}

export interface UpdateUserVariables {
  userID: string
  username: string
  email: string
}
