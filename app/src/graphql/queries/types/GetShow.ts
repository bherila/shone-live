/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShow
// ====================================================

export interface GetShow_show_chatMessages {
  __typename: 'MessageEntity'
  id: string
  timestamp: any
  message: string
  author_alias: string
}

export interface GetShow_show {
  __typename: 'Show'
  id: string
  title: string
  image_url: string | null
  start_date: any
  end_date: any
  chatMessages: GetShow_show_chatMessages[] | null
}

export interface GetShow {
  show: GetShow_show | null
}

export interface GetShowVariables {
  ID: number
}
