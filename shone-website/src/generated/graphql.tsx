import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Address = {
  __typename?: 'Address';
  id: Scalars['Float'];
  city: Scalars['String'];
  country: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  postal_code: Scalars['String'];
  state: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type ConsumerLead = {
  __typename?: 'ConsumerLead';
  id: Scalars['Float'];
  email: Scalars['String'];
  submitted_timestamp: Scalars['DateTime'];
};

export type CreateAddressDto = {
  userId: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  line1: Scalars['String'];
  line2: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type CreateProductDto = {
  userId: Scalars['String'];
  showId: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateShowInput = {
  title: Scalars['String'];
  image_url?: Maybe<Scalars['String']>;
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};


export type Hello = {
  __typename?: 'Hello';
  id: Scalars['Int'];
  message: Scalars['String'];
};

export type HelloInput = {
  message: Scalars['String'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  id: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  message: Scalars['String'];
  alias: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  add_address: Address;
  addConsumerLead: ConsumerLead;
  addHello: Hello;
  removeHello: Scalars['Boolean'];
  add_message: MessageEntity;
  add_products: Product;
  add_payment: Payment;
  add_show: Show;
  addShowYourStyleEntry: ShowYourStyleEntry;
  addShowYourStyleVotes: ShowYourStyleVote;
  addShowYourStyleViewRecord: ShowYourStyleViewRecord;
  add_user: Scalars['String'];
  update_user: User;
};


export type MutationAdd_AddressArgs = {
  data: CreateAddressDto;
};


export type MutationAddConsumerLeadArgs = {
  email: Scalars['String'];
};


export type MutationAddHelloArgs = {
  newHelloData: HelloInput;
};


export type MutationRemoveHelloArgs = {
  id: Scalars['Float'];
};


export type MutationAdd_MessageArgs = {
  message: Scalars['String'];
  showId: Scalars['Float'];
};


export type MutationAdd_ProductsArgs = {
  data: CreateProductDto;
};


export type MutationAdd_PaymentArgs = {
  quantity: Scalars['String'];
  productId: Scalars['Float'];
};


export type MutationAdd_ShowArgs = {
  data: CreateShowInput;
};


export type MutationAddShowYourStyleEntryArgs = {
  video_url: Scalars['String'];
};


export type MutationAddShowYourStyleVotesArgs = {
  entry_id: Scalars['Float'];
  view_duration: Scalars['Float'];
  vote: Scalars['Float'];
};


export type MutationAddShowYourStyleViewRecordArgs = {
  entry_id: Scalars['Float'];
};


export type MutationAdd_UserArgs = {
  phone: Scalars['String'];
};


export type MutationUpdate_UserArgs = {
  userId: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  file: Scalars['Upload'];
};

export type PaginationQueryDto = {
  limit: Scalars['Float'];
  offset: Scalars['Float'];
};

export type Payment = {
  __typename?: 'Payment';
  id: Scalars['ID'];
  product: Product;
  user: User;
  quantity: Scalars['Float'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['Float'];
  name: Scalars['String'];
  description: Scalars['String'];
  user: User;
  show: Show;
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses: Array<Address>;
  consumerLead?: Maybe<ConsumerLead>;
  consumerLeads: Array<ConsumerLead>;
  hello: Hello;
  hellos: Array<Hello>;
  messageEntity?: Maybe<MessageEntity>;
  messageEntities: Array<MessageEntity>;
  product?: Maybe<Product>;
  products: Array<Product>;
  payment?: Maybe<Payment>;
  payments: Array<Payment>;
  show?: Maybe<Show>;
  shows: Array<Show>;
  showYourStyleEntry?: Maybe<ShowYourStyleEntry>;
  getRandomShowYourStyleEntry?: Maybe<ShowYourStyleEntry>;
  showYourStyleEntries: Array<ShowYourStyleEntry>;
  showYourStyle?: Maybe<ShowYourStyleVote>;
  showYourStyleVotes: Array<ShowYourStyleVote>;
  showYourStyleViewRecord?: Maybe<ShowYourStyleViewRecord>;
  showYourStyleViewRecords: Array<ShowYourStyleViewRecord>;
  user?: Maybe<User>;
  users: Array<User>;
  verify_code: User;
};


export type QueryAddressArgs = {
  addressId: Scalars['Float'];
};


export type QueryConsumerLeadArgs = {
  showId: Scalars['Float'];
};


export type QueryConsumerLeadsArgs = {
  paginationQuery: PaginationQueryDto;
};


export type QueryHelloArgs = {
  id: Scalars['Float'];
};


export type QueryHellosArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};


export type QueryMessageEntityArgs = {
  messageEntityId: Scalars['Float'];
};


export type QueryProductArgs = {
  showId: Scalars['Float'];
};


export type QueryProductsArgs = {
  paginationQuery: PaginationQueryDto;
};


export type QueryPaymentArgs = {
  PaymentId: Scalars['Float'];
};


export type QueryShowArgs = {
  showId: Scalars['Float'];
};


export type QueryShowYourStyleEntryArgs = {
  showId: Scalars['Float'];
};


export type QueryShowYourStyleEntriesArgs = {
  paginationQuery: PaginationQueryDto;
};


export type QueryShowYourStyleArgs = {
  showId: Scalars['Float'];
};


export type QueryShowYourStyleVotesArgs = {
  paginationQuery: PaginationQueryDto;
};


export type QueryShowYourStyleViewRecordArgs = {
  showId: Scalars['Float'];
};


export type QueryShowYourStyleViewRecordsArgs = {
  paginationQuery: PaginationQueryDto;
};


export type QueryUserArgs = {
  userId: Scalars['Float'];
};


export type QueryVerify_CodeArgs = {
  code: Scalars['String'];
  phone: Scalars['String'];
};

export type Show = {
  __typename?: 'Show';
  id: Scalars['ID'];
  title: Scalars['String'];
  image_url?: Maybe<Scalars['String']>;
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  chatMessages?: Maybe<Array<MessageEntity>>;
};

export type ShowYourStyleEntry = {
  __typename?: 'ShowYourStyleEntry';
  id: Scalars['Float'];
  user: User;
  video_url: Scalars['String'];
  submitted_timestamp: Scalars['DateTime'];
};

export type ShowYourStyleViewRecord = {
  __typename?: 'ShowYourStyleViewRecord';
  id: Scalars['Float'];
  entry: ShowYourStyleEntry;
  user: User;
  view_time: Scalars['DateTime'];
};

export type ShowYourStyleVote = {
  __typename?: 'ShowYourStyleVote';
  id: Scalars['Float'];
  entry: ShowYourStyleEntry;
  user: User;
  vote: Scalars['Float'];
  view_duration: Scalars['Float'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  verification_code_time_sent: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  profileUrl?: Maybe<Scalars['String']>;
};

export type SubscribeToWaitlistMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SubscribeToWaitlistMutation = (
  { __typename?: 'Mutation' }
  & { addConsumerLead: (
    { __typename?: 'ConsumerLead' }
    & Pick<ConsumerLead, 'email'>
  ) }
);

export type GetConsumerLeadsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConsumerLeadsQuery = (
  { __typename?: 'Query' }
  & { consumerLeads: Array<(
    { __typename?: 'ConsumerLead' }
    & Pick<ConsumerLead, 'id' | 'email' | 'submitted_timestamp'>
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )> }
);


export const SubscribeToWaitlistDocument = gql`
    mutation SubscribeToWaitlist($email: String!) {
  addConsumerLead(email: $email) {
    email
  }
}
    `;
export type SubscribeToWaitlistMutationFn = Apollo.MutationFunction<SubscribeToWaitlistMutation, SubscribeToWaitlistMutationVariables>;

/**
 * __useSubscribeToWaitlistMutation__
 *
 * To run a mutation, you first call `useSubscribeToWaitlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToWaitlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToWaitlistMutation, { data, loading, error }] = useSubscribeToWaitlistMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSubscribeToWaitlistMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToWaitlistMutation, SubscribeToWaitlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToWaitlistMutation, SubscribeToWaitlistMutationVariables>(SubscribeToWaitlistDocument, options);
      }
export type SubscribeToWaitlistMutationHookResult = ReturnType<typeof useSubscribeToWaitlistMutation>;
export type SubscribeToWaitlistMutationResult = Apollo.MutationResult<SubscribeToWaitlistMutation>;
export type SubscribeToWaitlistMutationOptions = Apollo.BaseMutationOptions<SubscribeToWaitlistMutation, SubscribeToWaitlistMutationVariables>;
export const GetConsumerLeadsDocument = gql`
    query getConsumerLeads {
  consumerLeads(paginationQuery: {limit: 10, offset: 0}) {
    id
    email
    submitted_timestamp
  }
}
    `;

/**
 * __useGetConsumerLeadsQuery__
 *
 * To run a query within a React component, call `useGetConsumerLeadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConsumerLeadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConsumerLeadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConsumerLeadsQuery(baseOptions?: Apollo.QueryHookOptions<GetConsumerLeadsQuery, GetConsumerLeadsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConsumerLeadsQuery, GetConsumerLeadsQueryVariables>(GetConsumerLeadsDocument, options);
      }
export function useGetConsumerLeadsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConsumerLeadsQuery, GetConsumerLeadsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConsumerLeadsQuery, GetConsumerLeadsQueryVariables>(GetConsumerLeadsDocument, options);
        }
export type GetConsumerLeadsQueryHookResult = ReturnType<typeof useGetConsumerLeadsQuery>;
export type GetConsumerLeadsLazyQueryHookResult = ReturnType<typeof useGetConsumerLeadsLazyQuery>;
export type GetConsumerLeadsQueryResult = Apollo.QueryResult<GetConsumerLeadsQuery, GetConsumerLeadsQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  users {
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;