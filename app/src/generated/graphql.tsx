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
  add_show_your_style_entry: ShowYourStyleEntry;
  add_video_id_from_transloadit: ShowYourStyleVideoIdEntry;
  add_show_your_style_vote: ShowYourStyleVote;
  add_show_your_style_view_record: ShowYourStyleViewRecord;
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


export type MutationAdd_Show_Your_Style_EntryArgs = {
  videoUrl: Scalars['String'];
};


export type MutationAdd_Video_Id_From_TransloaditArgs = {
  videoId: Scalars['String'];
};


export type MutationAdd_Show_Your_Style_VoteArgs = {
  entryId: Scalars['Float'];
  viewDuration: Scalars['Float'];
  vote: Scalars['Float'];
};


export type MutationAdd_Show_Your_Style_View_RecordArgs = {
  entryId: Scalars['Float'];
};


export type MutationAdd_UserArgs = {
  phone: Scalars['String'];
};


export type MutationUpdate_UserArgs = {
  user: UpdateUserEntityDto;
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
  show_your_style_Entry?: Maybe<ShowYourStyleEntry>;
  get_random_show_your_style_entry?: Maybe<ShowYourStyleEntry>;
  show_your_style_entries: Array<ShowYourStyleEntry>;
  show_your_style_vote?: Maybe<ShowYourStyleVote>;
  show_your_style_votes: Array<ShowYourStyleVote>;
  show_your_style_view_record?: Maybe<ShowYourStyleViewRecord>;
  show_your_style_view_records: Array<ShowYourStyleViewRecord>;
  user?: Maybe<User>;
  users: Array<User>;
  verify_code: User;
};


export type QueryAddressArgs = {
  addressId: Scalars['Float'];
};


export type QueryConsumerLeadArgs = {
  consumerLeadId: Scalars['Float'];
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
  productId: Scalars['Float'];
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


export type QueryShow_Your_Style_EntryArgs = {
  showId: Scalars['Float'];
};


export type QueryShow_Your_Style_EntriesArgs = {
  paginationQuery: PaginationQueryDto;
};


export type QueryShow_Your_Style_VoteArgs = {
  showId: Scalars['Float'];
};


export type QueryShow_Your_Style_VotesArgs = {
  paginationQuery: PaginationQueryDto;
};


export type QueryShow_Your_Style_View_RecordArgs = {
  showId: Scalars['Float'];
};


export type QueryShow_Your_Style_View_RecordsArgs = {
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

export type ShowYourStyleVideoIdEntry = {
  __typename?: 'ShowYourStyleVideoIdEntry';
  entry_id: Scalars['Float'];
  user: User;
  video_id: Scalars['String'];
  entry_timestamp: Scalars['DateTime'];
  video_url?: Maybe<Scalars['String']>;
  is_viewable: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
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

export type UpdateUserEntityDto = {
  id: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  file?: Maybe<Scalars['Upload']>;
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

export type AddMessageMutationVariables = Exact<{
  message: Scalars['String'];
  showID: Scalars['Float'];
}>;


export type AddMessageMutation = (
  { __typename?: 'Mutation' }
  & { add_message: (
    { __typename?: 'MessageEntity' }
    & Pick<MessageEntity, 'id' | 'timestamp' | 'message' | 'alias'>
  ) }
);

export type AddUserMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type AddUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'add_user'>
);

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserEntityDto;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { update_user: (
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id' | 'phone' | 'profileUrl' | 'token' | 'username' | 'verification_code_time_sent'>
  ) }
);

export type GetShowQueryVariables = Exact<{
  ID: Scalars['Float'];
}>;


export type GetShowQuery = (
  { __typename?: 'Query' }
  & { show?: Maybe<(
    { __typename?: 'Show' }
    & Pick<Show, 'id' | 'title' | 'image_url' | 'start_date' | 'end_date'>
    & { chatMessages?: Maybe<Array<(
      { __typename: 'MessageEntity' }
      & Pick<MessageEntity, 'id' | 'timestamp' | 'message' | 'alias'>
    )>> }
  )> }
);

export type GetShowsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShowsQuery = (
  { __typename?: 'Query' }
  & { shows: Array<(
    { __typename?: 'Show' }
    & Pick<Show, 'id' | 'title' | 'image_url'>
    & { chatMessages?: Maybe<Array<(
      { __typename?: 'MessageEntity' }
      & Pick<MessageEntity, 'id' | 'message' | 'alias'>
    )>> }
  )> }
);

export type VerifyCodeQueryVariables = Exact<{
  code: Scalars['String'];
  phone: Scalars['String'];
}>;


export type VerifyCodeQuery = (
  { __typename?: 'Query' }
  & { verify_code: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'phone' | 'username' | 'verification_code_time_sent' | 'token' | 'profileUrl'>
  ) }
);


export const AddMessageDocument = gql`
    mutation AddMessage($message: String!, $showID: Float!) {
  add_message(message: $message, showId: $showID) {
    id
    timestamp
    message
    alias
  }
}
    `;
export type AddMessageMutationFn = Apollo.MutationFunction<AddMessageMutation, AddMessageMutationVariables>;

/**
 * __useAddMessageMutation__
 *
 * To run a mutation, you first call `useAddMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMessageMutation, { data, loading, error }] = useAddMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *      showID: // value for 'showID'
 *   },
 * });
 */
export function useAddMessageMutation(baseOptions?: Apollo.MutationHookOptions<AddMessageMutation, AddMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMessageMutation, AddMessageMutationVariables>(AddMessageDocument, options);
      }
export type AddMessageMutationHookResult = ReturnType<typeof useAddMessageMutation>;
export type AddMessageMutationResult = Apollo.MutationResult<AddMessageMutation>;
export type AddMessageMutationOptions = Apollo.BaseMutationOptions<AddMessageMutation, AddMessageMutationVariables>;
export const AddUserDocument = gql`
    mutation AddUser($phone: String!) {
  add_user(phone: $phone)
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($user: UpdateUserEntityDto!) {
  update_user(user: $user) {
    email
    id
    phone
    profileUrl
    token
    username
    verification_code_time_sent
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetShowDocument = gql`
    query GetShow($ID: Float!) {
  show(showId: $ID) {
    id
    title
    image_url
    start_date
    end_date
    chatMessages {
      id
      timestamp
      message
      alias
      __typename
    }
  }
}
    `;

/**
 * __useGetShowQuery__
 *
 * To run a query within a React component, call `useGetShowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShowQuery({
 *   variables: {
 *      ID: // value for 'ID'
 *   },
 * });
 */
export function useGetShowQuery(baseOptions: Apollo.QueryHookOptions<GetShowQuery, GetShowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShowQuery, GetShowQueryVariables>(GetShowDocument, options);
      }
export function useGetShowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShowQuery, GetShowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShowQuery, GetShowQueryVariables>(GetShowDocument, options);
        }
export type GetShowQueryHookResult = ReturnType<typeof useGetShowQuery>;
export type GetShowLazyQueryHookResult = ReturnType<typeof useGetShowLazyQuery>;
export type GetShowQueryResult = Apollo.QueryResult<GetShowQuery, GetShowQueryVariables>;
export const GetShowsDocument = gql`
    query GetShows {
  shows {
    id
    title
    image_url
    chatMessages {
      id
      message
      alias
    }
  }
}
    `;

/**
 * __useGetShowsQuery__
 *
 * To run a query within a React component, call `useGetShowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShowsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShowsQuery(baseOptions?: Apollo.QueryHookOptions<GetShowsQuery, GetShowsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShowsQuery, GetShowsQueryVariables>(GetShowsDocument, options);
      }
export function useGetShowsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShowsQuery, GetShowsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShowsQuery, GetShowsQueryVariables>(GetShowsDocument, options);
        }
export type GetShowsQueryHookResult = ReturnType<typeof useGetShowsQuery>;
export type GetShowsLazyQueryHookResult = ReturnType<typeof useGetShowsLazyQuery>;
export type GetShowsQueryResult = Apollo.QueryResult<GetShowsQuery, GetShowsQueryVariables>;
export const VerifyCodeDocument = gql`
    query VerifyCode($code: String!, $phone: String!) {
  verify_code(code: $code, phone: $phone) {
    id
    email
    phone
    username
    verification_code_time_sent
    token
    profileUrl
  }
}
    `;

/**
 * __useVerifyCodeQuery__
 *
 * To run a query within a React component, call `useVerifyCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useVerifyCodeQuery(baseOptions: Apollo.QueryHookOptions<VerifyCodeQuery, VerifyCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyCodeQuery, VerifyCodeQueryVariables>(VerifyCodeDocument, options);
      }
export function useVerifyCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyCodeQuery, VerifyCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyCodeQuery, VerifyCodeQueryVariables>(VerifyCodeDocument, options);
        }
export type VerifyCodeQueryHookResult = ReturnType<typeof useVerifyCodeQuery>;
export type VerifyCodeLazyQueryHookResult = ReturnType<typeof useVerifyCodeLazyQuery>;
export type VerifyCodeQueryResult = Apollo.QueryResult<VerifyCodeQuery, VerifyCodeQueryVariables>;