/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetShows
// ====================================================

export interface GetShows_shows_chatMessages {
  __typename: "MessageEntity";
  id: string;
  message: string;
  timestamp: any;
  alias: string;
}

export interface GetShows_shows {
  __typename: "Show";
  id: string;
  title: string;
  image_url: string | null;
  start_date: any;
  end_date: any;
  chatMessages: GetShows_shows_chatMessages[] | null;
}

export interface GetShows {
  shows: GetShows_shows[];
}
