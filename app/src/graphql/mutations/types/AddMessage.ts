/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMessage
// ====================================================

export interface AddMessage_addMessage {
  __typename: "MessageEntity";
  id: string;
  timestamp: any;
  message: string;
  author_alias: string;
}

export interface AddMessage {
  addMessage: AddMessage_addMessage;
}

export interface AddMessageVariables {
  userID: number;
  message: string;
  showID: number;
}
