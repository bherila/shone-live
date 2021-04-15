/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMessage
// ====================================================

export interface AddMessage_add_message {
  __typename: 'MessageEntity'
  id: string
  timestamp: any
  message: string
  author_alias: string
}

export interface AddMessage {
  add_message: AddMessage_add_message
}

export interface AddMessageVariables {
  message: string
  showID: number
}
