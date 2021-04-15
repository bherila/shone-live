/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_update_user {
  __typename: 'User'
  id: string
  email: string | null
  phone: string
  username: string | null
  token: string | null
}

export interface UpdateUser {
  update_user: UpdateUser_update_user
}

export interface UpdateUserVariables {
  userID: string
  username: string
  email: string
}
