import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export type Address = {
  __typename?: 'Address'
  id: Scalars['String']
  city: Scalars['String']
  country: Scalars['String']
  line1: Scalars['String']
  line2: Scalars['String']
  postal_code: Scalars['String']
  state: Scalars['String']
  name: Scalars['String']
  phone: Scalars['String']
}

export type Brand = {
  __typename?: 'Brand'
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  showSegments?: Maybe<Array<ShowSegment>>
  userBrandRoles?: Maybe<Array<UserBrandRole>>
  ownerUser: User
}

export type ConsumerLead = {
  __typename?: 'ConsumerLead'
  id: Scalars['String']
  email: Scalars['String']
  submitted_timestamp: Scalars['DateTime']
}

export type CreateAddressDto = {
  userId: Scalars['String']
  city: Scalars['String']
  country: Scalars['String']
  line1: Scalars['String']
  line2: Scalars['String']
  postalCode: Scalars['String']
  state: Scalars['String']
  name: Scalars['String']
  phone: Scalars['String']
}

export type CreateBrandDto = {
  name: Scalars['String']
  description: Scalars['String']
}

export type CreateLineItemsDto = {
  orderId: Scalars['String']
  skuId: Scalars['String']
  amount: Scalars['Float']
}

export type CreateProductDto = {
  showSegmentId?: Maybe<Scalars['String']>
  brandId?: Maybe<Scalars['String']>
  name: Scalars['String']
  description: Scalars['String']
  variantData: CreateVariantDto
}

export type CreateShowDto = {
  title: Scalars['String']
  imageUrl: Scalars['String']
  startDate: Scalars['DateTime']
  endDate: Scalars['DateTime']
}

export type CreateShowSegmentDto = {
  showId: Scalars['String']
  brandId: Scalars['String']
  title: Scalars['String']
  productsIds: Array<Scalars['String']>
}

export type CreateShowWithSegmentDto = {
  brandId: Scalars['String']
  title: Scalars['String']
  imageUrl: Scalars['String']
  startDate: Scalars['DateTime']
  endDate: Scalars['DateTime']
  showSegment: ShowSegmentDto
}

export type CreateSkuDto = {
  variantId?: Maybe<Scalars['String']>
  name: Scalars['String']
  COGS: Scalars['String']
  friendlyName: Scalars['String']
  stock: Scalars['Float']
}

export type CreateUserBrandRoleDto = {
  brandId: Scalars['String']
  userId: Scalars['String']
  read: Scalars['Boolean']
  write: Scalars['Boolean']
  admin: Scalars['Boolean']
}

export type CreateUserShowRoleDto = {
  showId: Scalars['String']
  userId: Scalars['String']
  read: Scalars['Boolean']
  write: Scalars['Boolean']
  admin: Scalars['Boolean']
  streamTo: Scalars['Boolean']
}

export type CreateVariantDto = {
  productId?: Maybe<Scalars['String']>
  name: Scalars['String']
  description: Scalars['String']
  skuData: CreateSkuDto
}

export type CreateorderDto = {
  showSegmentId: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}

export type LineItem = {
  __typename?: 'LineItem'
  id: Scalars['String']
  amount: Scalars['Float']
  order: Order
  sku: Sku
}

export type MessageEntity = {
  __typename?: 'MessageEntity'
  id: Scalars['String']
  timestamp: Scalars['DateTime']
  message: Scalars['String']
  alias: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  add_address: Address
  addBrand: Brand
  updateBrand: Brand
  addConsumerLead: ConsumerLead
  add_message: MessageEntity
  addLineItems: LineItem
  updateLineItems: LineItem
  addOrder: Order
  updateOrder: Order
  addProduct: Product
  update_product: Product
  addVariant: Variant
  update_variant: Variant
  addSku: Sku
  updateSku: Sku
  add_payment: Payment
  add_show: Show
  addShowWithSegment: Show
  addShowSegment: ShowSegment
  updateShowSegment: ShowSegment
  add_show_your_style_entry: ShowYourStyleEntry
  add_video_id_from_transloadit: ShowYourStyleVideoIdEntry
  add_show_your_style_vote: ShowYourStyleVote
  add_show_your_style_view_record: ShowYourStyleViewRecord
  add_user: Scalars['String']
  update_user: User
  add_userbrandrole: UserBrandRole
  update_userbrandrole: UserBrandRole
  add_usershowrole: UserShowRole
  update_usershowrole: UserShowRole
}

export type MutationAdd_AddressArgs = {
  data: CreateAddressDto
}

export type MutationAddBrandArgs = {
  data: CreateBrandDto
}

export type MutationUpdateBrandArgs = {
  data: UpdateBrandDto
}

export type MutationAddConsumerLeadArgs = {
  email: Scalars['String']
}

export type MutationAdd_MessageArgs = {
  message: Scalars['String']
  showId: Scalars['String']
}

export type MutationAddLineItemsArgs = {
  data: CreateLineItemsDto
}

export type MutationUpdateLineItemsArgs = {
  data: UpdateLineItemsDto
}

export type MutationAddOrderArgs = {
  data: CreateorderDto
}

export type MutationUpdateOrderArgs = {
  data: UpdateorderDto
}

export type MutationAddProductArgs = {
  data: CreateProductDto
}

export type MutationUpdate_ProductArgs = {
  data: UpdateProductDto
}

export type MutationAddVariantArgs = {
  data: CreateVariantDto
}

export type MutationUpdate_VariantArgs = {
  data: UpdateVariantDto
}

export type MutationAddSkuArgs = {
  data: CreateSkuDto
}

export type MutationUpdateSkuArgs = {
  data: UpdateSkuDto
}

export type MutationAdd_PaymentArgs = {
  quantity: Scalars['String']
  productId: Scalars['String']
}

export type MutationAdd_ShowArgs = {
  data: CreateShowDto
}

export type MutationAddShowWithSegmentArgs = {
  data: CreateShowWithSegmentDto
}

export type MutationAddShowSegmentArgs = {
  data: CreateShowSegmentDto
}

export type MutationUpdateShowSegmentArgs = {
  data: UpdateShowSegmentDto
}

export type MutationAdd_Show_Your_Style_EntryArgs = {
  videoUrl: Scalars['String']
}

export type MutationAdd_Video_Id_From_TransloaditArgs = {
  videoId: Scalars['String']
}

export type MutationAdd_Show_Your_Style_VoteArgs = {
  entryId: Scalars['String']
  viewDuration: Scalars['Float']
  vote: Scalars['Float']
}

export type MutationAdd_Show_Your_Style_View_RecordArgs = {
  entryId: Scalars['String']
}

export type MutationAdd_UserArgs = {
  phone: Scalars['String']
}

export type MutationUpdate_UserArgs = {
  user: UpdateUserEntityDto
}

export type MutationAdd_UserbrandroleArgs = {
  data: CreateUserBrandRoleDto
}

export type MutationUpdate_UserbrandroleArgs = {
  data: UpdateUserBrandRoleDto
}

export type MutationAdd_UsershowroleArgs = {
  data: CreateUserShowRoleDto
}

export type MutationUpdate_UsershowroleArgs = {
  data: UpdateUserShowRoleDto
}

export type Order = {
  __typename?: 'Order'
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  user: User
  showSegment: ShowSegment
  lineItems?: Maybe<Array<LineItem>>
}

export type PaginationQueryDto = {
  limit: Scalars['Float']
  offset: Scalars['Float']
}

export type Payment = {
  __typename?: 'Payment'
  id: Scalars['String']
  product: Product
  user: User
  quantity: Scalars['Float']
}

export type Product = {
  __typename?: 'Product'
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  user: User
  showSegments?: Maybe<Array<ShowSegment>>
  brand?: Maybe<Brand>
  variants?: Maybe<Array<Variant>>
}

export type Query = {
  __typename?: 'Query'
  address?: Maybe<Address>
  addresses: Array<Address>
  brand?: Maybe<Brand>
  brands: Array<Brand>
  my_brands: Array<Brand>
  consumerLead?: Maybe<ConsumerLead>
  consumerLeads: Array<ConsumerLead>
  messageEntity?: Maybe<MessageEntity>
  messageEntities: Array<MessageEntity>
  lineItem?: Maybe<LineItem>
  lineItems: Array<LineItem>
  orderLineItems: Array<LineItem>
  order?: Maybe<Order>
  orders: Array<Order>
  myOrders: Array<Order>
  product?: Maybe<Product>
  products: Array<Product>
  myProducts: Array<Product>
  brandProducts: Array<Product>
  showProducts: Array<Product>
  variant?: Maybe<Variant>
  variants: Array<Variant>
  brandVariants: Array<Variant>
  sku?: Maybe<Sku>
  skus: Array<Sku>
  variantSkus: Array<Sku>
  payment?: Maybe<Payment>
  payments: Array<Payment>
  show?: Maybe<Show>
  shows: Array<Show>
  brandShows: Array<Show>
  showSegment?: Maybe<ShowSegment>
  showSegments: Array<ShowSegment>
  showSegmentByBrandAndShow: Array<ShowSegment>
  show_your_style_Entry?: Maybe<ShowYourStyleEntry>
  get_random_show_your_style_entry?: Maybe<ShowYourStyleEntry>
  show_your_style_entries: Array<ShowYourStyleEntry>
  show_your_style_vote?: Maybe<ShowYourStyleVote>
  show_your_style_votes: Array<ShowYourStyleVote>
  show_your_style_view_record?: Maybe<ShowYourStyleViewRecord>
  show_your_style_view_records: Array<ShowYourStyleViewRecord>
  user?: Maybe<User>
  users: Array<User>
  verify_code: User
  userbrandrole?: Maybe<UserBrandRole>
  userbrandroles: Array<UserBrandRole>
  my_userbrandroles: Array<UserBrandRole>
  usershowrole?: Maybe<UserShowRole>
  usershowroles: Array<UserShowRole>
  my_usershowroles: Array<UserShowRole>
}

export type QueryAddressArgs = {
  addressId: Scalars['String']
}

export type QueryBrandArgs = {
  brandId: Scalars['String']
}

export type QueryBrandsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryMy_BrandsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryConsumerLeadArgs = {
  consumerLeadId: Scalars['String']
}

export type QueryConsumerLeadsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryMessageEntityArgs = {
  messageEntityId: Scalars['String']
}

export type QueryLineItemArgs = {
  lineitemsId: Scalars['String']
}

export type QueryLineItemsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryOrderLineItemsArgs = {
  paginationQuery: PaginationQueryDto
  orderId: Scalars['String']
}

export type QueryOrderArgs = {
  orderId: Scalars['String']
}

export type QueryOrdersArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryMyOrdersArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryProductArgs = {
  productId: Scalars['String']
}

export type QueryProductsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryMyProductsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryBrandProductsArgs = {
  paginationQuery: PaginationQueryDto
  brandId: Scalars['String']
}

export type QueryShowProductsArgs = {
  paginationQuery: PaginationQueryDto
  showId: Scalars['String']
}

export type QueryVariantArgs = {
  variantId: Scalars['String']
}

export type QueryVariantsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryBrandVariantsArgs = {
  paginationQuery: PaginationQueryDto
  productId: Scalars['String']
}

export type QuerySkuArgs = {
  skuId: Scalars['String']
}

export type QuerySkusArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryVariantSkusArgs = {
  paginationQuery: PaginationQueryDto
  variantId: Scalars['String']
}

export type QueryPaymentArgs = {
  PaymentId: Scalars['String']
}

export type QueryShowArgs = {
  showId: Scalars['String']
}

export type QueryBrandShowsArgs = {
  paginationQuery: PaginationQueryDto
  brandId: Scalars['String']
}

export type QueryShowSegmentArgs = {
  showsegmentId: Scalars['String']
}

export type QueryShowSegmentByBrandAndShowArgs = {
  showId: Scalars['String']
  brandId: Scalars['String']
}

export type QueryShow_Your_Style_EntryArgs = {
  showId: Scalars['String']
}

export type QueryShow_Your_Style_EntriesArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryShow_Your_Style_VoteArgs = {
  showId: Scalars['String']
}

export type QueryShow_Your_Style_VotesArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryShow_Your_Style_View_RecordArgs = {
  showId: Scalars['String']
}

export type QueryShow_Your_Style_View_RecordsArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryUserArgs = {
  userId: Scalars['String']
}

export type QueryVerify_CodeArgs = {
  code: Scalars['String']
  phone: Scalars['String']
}

export type QueryUserbrandroleArgs = {
  userbrandroleId: Scalars['String']
}

export type QueryUserbrandrolesArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryMy_UserbrandrolesArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryUsershowroleArgs = {
  usershowroleId: Scalars['String']
}

export type QueryUsershowrolesArgs = {
  paginationQuery: PaginationQueryDto
}

export type QueryMy_UsershowrolesArgs = {
  paginationQuery: PaginationQueryDto
}

export type Show = {
  __typename?: 'Show'
  id: Scalars['ID']
  title: Scalars['String']
  image_url?: Maybe<Scalars['String']>
  start_date: Scalars['DateTime']
  end_date: Scalars['DateTime']
  chatMessages?: Maybe<Array<MessageEntity>>
  showSegments?: Maybe<Array<ShowSegment>>
  userShowRoles?: Maybe<Array<UserShowRole>>
  owner_user: User
}

export type ShowSegment = {
  __typename?: 'ShowSegment'
  id: Scalars['String']
  title: Scalars['String']
  brand: Brand
  show: Show
  ownerUser: User
  products: Array<Product>
  orders?: Maybe<Array<Order>>
}

export type ShowSegmentDto = {
  title: Scalars['String']
  productsIds: Array<Scalars['String']>
}

export type ShowYourStyleEntry = {
  __typename?: 'ShowYourStyleEntry'
  id: Scalars['String']
  user: User
  video_url: Scalars['String']
  submitted_timestamp: Scalars['DateTime']
}

export type ShowYourStyleVideoIdEntry = {
  __typename?: 'ShowYourStyleVideoIdEntry'
  entry_id: Scalars['Float']
  user: User
  video_id: Scalars['String']
  entry_timestamp: Scalars['DateTime']
  video_url?: Maybe<Scalars['String']>
  is_viewable: Scalars['Boolean']
  error?: Maybe<Scalars['String']>
  json_data?: Maybe<Scalars['String']>
  urls?: Maybe<Scalars['String']>
}

export type ShowYourStyleViewRecord = {
  __typename?: 'ShowYourStyleViewRecord'
  id: Scalars['String']
  entry: ShowYourStyleEntry
  user: User
  view_time: Scalars['DateTime']
}

export type ShowYourStyleVote = {
  __typename?: 'ShowYourStyleVote'
  id: Scalars['String']
  entry: ShowYourStyleEntry
  user: User
  vote: Scalars['Float']
  view_duration: Scalars['Float']
}

export type Sku = {
  __typename?: 'Sku'
  id: Scalars['String']
  name: Scalars['String']
  friendlyName: Scalars['String']
  COGS: Scalars['String']
  stock: Scalars['Float']
  variant: Variant
  skus?: Maybe<Array<LineItem>>
}

export type UpdateBrandDto = {
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}

export type UpdateLineItemsDto = {
  id: Scalars['String']
  amount: Scalars['Float']
}

export type UpdateProductDto = {
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}

export type UpdateShowSegmentDto = {
  id: Scalars['String']
  title: Scalars['String']
}

export type UpdateSkuDto = {
  id: Scalars['String']
  friendlyName: Scalars['String']
  COGS: Scalars['String']
  stock: Scalars['Float']
}

export type UpdateUserBrandRoleDto = {
  id: Scalars['String']
  read: Scalars['Boolean']
  write: Scalars['Boolean']
  admin: Scalars['Boolean']
}

export type UpdateUserEntityDto = {
  id: Scalars['String']
  username?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  file?: Maybe<Scalars['Upload']>
}

export type UpdateUserShowRoleDto = {
  id: Scalars['String']
  read: Scalars['Boolean']
  write: Scalars['Boolean']
  admin: Scalars['Boolean']
  stream_to: Scalars['Boolean']
}

export type UpdateVariantDto = {
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}

export type UpdateorderDto = {
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email?: Maybe<Scalars['String']>
  phone: Scalars['String']
  username?: Maybe<Scalars['String']>
  verification_code_time_sent: Scalars['String']
  token?: Maybe<Scalars['String']>
  profileUrl?: Maybe<Scalars['String']>
}

export type UserBrandRole = {
  __typename?: 'UserBrandRole'
  id: Scalars['String']
  read: Scalars['Boolean']
  write: Scalars['Boolean']
  admin: Scalars['Boolean']
  user: User
  brand: Brand
}

export type UserShowRole = {
  __typename?: 'UserShowRole'
  id: Scalars['String']
  read: Scalars['Boolean']
  write: Scalars['Boolean']
  admin: Scalars['Boolean']
  stream_to: Scalars['Boolean']
  user: User
  show: Show
}

export type Variant = {
  __typename?: 'Variant'
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
  product: Product
  skus?: Maybe<Array<Sku>>
}

export type AddBrandMutationVariables = Exact<{
  name: Scalars['String']
  description: Scalars['String']
}>

export type AddBrandMutation = { __typename?: 'Mutation' } & {
  addBrand: { __typename?: 'Brand' } & Pick<
    Brand,
    'id' | 'name' | 'description'
  >
}

export type AddProductMutationVariables = Exact<{
  brandId?: Maybe<Scalars['String']>
  showSegmentId?: Maybe<Scalars['String']>
  name: Scalars['String']
  description: Scalars['String']
  variantData: CreateVariantDto
}>

export type AddProductMutation = { __typename?: 'Mutation' } & {
  addProduct: { __typename?: 'Product' } & Pick<Product, 'id'>
}

export type AddShowSegmentMutationVariables = Exact<{
  showId: Scalars['String']
  brandId: Scalars['String']
  title: Scalars['String']
  productsIds: Array<Scalars['String']> | Scalars['String']
}>

export type AddShowSegmentMutation = { __typename?: 'Mutation' } & {
  addShowSegment: { __typename?: 'ShowSegment' } & Pick<ShowSegment, 'id'>
}

export type AddShowWithSegmentMutationVariables = Exact<{
  brandId: Scalars['String']
  title: Scalars['String']
  startDate: Scalars['DateTime']
  endDate: Scalars['DateTime']
  showSegment: ShowSegmentDto
}>

export type AddShowWithSegmentMutation = { __typename?: 'Mutation' } & {
  addShowWithSegment: { __typename?: 'Show' } & Pick<Show, 'id'>
}

export type AddUserMutationVariables = Exact<{
  phone: Scalars['String']
}>

export type AddUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'add_user'
>

export type SubscribeToWaitlistMutationVariables = Exact<{
  email: Scalars['String']
}>

export type SubscribeToWaitlistMutation = { __typename?: 'Mutation' } & {
  addConsumerLead: { __typename?: 'ConsumerLead' } & Pick<ConsumerLead, 'email'>
}

export type UpdateBrandMutationVariables = Exact<{
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}>

export type UpdateBrandMutation = { __typename?: 'Mutation' } & {
  updateBrand: { __typename?: 'Brand' } & Pick<
    Brand,
    'id' | 'name' | 'description'
  >
}

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['String']
  name: Scalars['String']
  description: Scalars['String']
}>

export type UpdateProductMutation = { __typename?: 'Mutation' } & {
  update_product: { __typename?: 'Product' } & Pick<
    Product,
    'id' | 'name' | 'description'
  >
}

export type UpdateUserMutationVariables = Exact<{
  user: UpdateUserEntityDto
}>

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  update_user: { __typename?: 'User' } & Pick<
    User,
    | 'email'
    | 'id'
    | 'phone'
    | 'profileUrl'
    | 'token'
    | 'username'
    | 'verification_code_time_sent'
  >
}

export type GetBrandQueryVariables = Exact<{
  brandId: Scalars['String']
}>

export type GetBrandQuery = { __typename?: 'Query' } & {
  brand?: Maybe<{ __typename?: 'Brand' } & Pick<Brand, 'name' | 'description'>>
}

export type GetBrandProductsQueryVariables = Exact<{
  brandId: Scalars['String']
  limit: Scalars['Float']
  offset: Scalars['Float']
}>

export type GetBrandProductsQuery = { __typename?: 'Query' } & {
  brandProducts: Array<
    { __typename?: 'Product' } & Pick<Product, 'id' | 'name' | 'description'>
  >
}

export type GetBrandShowsQueryVariables = Exact<{
  brandId: Scalars['String']
  limit: Scalars['Float']
  offset: Scalars['Float']
}>

export type GetBrandShowsQuery = { __typename?: 'Query' } & {
  brandShows: Array<
    { __typename?: 'Show' } & Pick<
      Show,
      'id' | 'title' | 'start_date' | 'end_date'
    > & {
        showSegments?: Maybe<
          Array<{ __typename?: 'ShowSegment' } & Pick<ShowSegment, 'title'>>
        >
      }
  >
}

export type GetConsumerLeadsQueryVariables = Exact<{ [key: string]: never }>

export type GetConsumerLeadsQuery = { __typename?: 'Query' } & {
  consumerLeads: Array<
    { __typename?: 'ConsumerLead' } & Pick<
      ConsumerLead,
      'id' | 'email' | 'submitted_timestamp'
    >
  >
}

export type GetMyBrandsQueryVariables = Exact<{
  limit: Scalars['Float']
  offset: Scalars['Float']
}>

export type GetMyBrandsQuery = { __typename?: 'Query' } & {
  my_brands: Array<
    { __typename?: 'Brand' } & Pick<Brand, 'id' | 'name' | 'description'>
  >
}

export type GetMyProductsQueryVariables = Exact<{
  limit: Scalars['Float']
  offset: Scalars['Float']
}>

export type GetMyProductsQuery = { __typename?: 'Query' } & {
  myProducts: Array<
    { __typename?: 'Product' } & Pick<
      Product,
      'id' | 'name' | 'description'
    > & { brand?: Maybe<{ __typename?: 'Brand' } & Pick<Brand, 'name'>> }
  >
}

export type GetProductQueryVariables = Exact<{
  productId: Scalars['String']
}>

export type GetProductQuery = { __typename?: 'Query' } & {
  product?: Maybe<
    { __typename?: 'Product' } & Pick<Product, 'name' | 'description'> & {
        variants?: Maybe<
          Array<
            { __typename?: 'Variant' } & Pick<
              Variant,
              'id' | 'name' | 'description'
            > & {
                skus?: Maybe<
                  Array<
                    { __typename?: 'Sku' } & Pick<
                      Sku,
                      'id' | 'name' | 'friendlyName' | 'COGS' | 'stock'
                    >
                  >
                >
              }
          >
        >
      }
  >
}

export type GetShowQueryVariables = Exact<{
  showId: Scalars['String']
}>

export type GetShowQuery = { __typename?: 'Query' } & {
  show?: Maybe<
    { __typename?: 'Show' } & Pick<
      Show,
      'id' | 'title' | 'start_date' | 'end_date'
    > & {
        showSegments?: Maybe<
          Array<
            { __typename?: 'ShowSegment' } & Pick<
              ShowSegment,
              'id' | 'title'
            > & {
                products: Array<
                  { __typename?: 'Product' } & Pick<Product, 'name'>
                >
              }
          >
        >
      }
  >
}

export type GetShowSegmentByBrandAndShowQueryVariables = Exact<{
  brandId: Scalars['String']
  showId: Scalars['String']
}>

export type GetShowSegmentByBrandAndShowQuery = { __typename?: 'Query' } & {
  showSegmentByBrandAndShow: Array<
    { __typename?: 'ShowSegment' } & Pick<ShowSegment, 'id' | 'title'> & {
        products: Array<{ __typename?: 'Product' } & Pick<Product, 'name'>>
      }
  >
}

export type GetShowsQueryVariables = Exact<{ [key: string]: never }>

export type GetShowsQuery = { __typename?: 'Query' } & {
  shows: Array<
    { __typename?: 'Show' } & Pick<Show, 'id' | 'title' | 'image_url'> & {
        chatMessages?: Maybe<
          Array<
            { __typename?: 'MessageEntity' } & Pick<
              MessageEntity,
              'id' | 'message' | 'alias'
            >
          >
        >
      }
  >
}

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = { __typename?: 'Query' } & {
  users: Array<{ __typename?: 'User' } & Pick<User, 'email'>>
}

export type VerifyCodeQueryVariables = Exact<{
  code: Scalars['String']
  phone: Scalars['String']
}>

export type VerifyCodeQuery = { __typename?: 'Query' } & {
  verify_code: { __typename?: 'User' } & Pick<
    User,
    | 'id'
    | 'email'
    | 'phone'
    | 'username'
    | 'verification_code_time_sent'
    | 'token'
    | 'profileUrl'
  >
}

export const AddBrandDocument = gql`
  mutation AddBrand($name: String!, $description: String!) {
    addBrand(data: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`
export type AddBrandMutationFn = Apollo.MutationFunction<
  AddBrandMutation,
  AddBrandMutationVariables
>

/**
 * __useAddBrandMutation__
 *
 * To run a mutation, you first call `useAddBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBrandMutation, { data, loading, error }] = useAddBrandMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useAddBrandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddBrandMutation,
    AddBrandMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddBrandMutation, AddBrandMutationVariables>(
    AddBrandDocument,
    options,
  )
}
export type AddBrandMutationHookResult = ReturnType<typeof useAddBrandMutation>
export type AddBrandMutationResult = Apollo.MutationResult<AddBrandMutation>
export type AddBrandMutationOptions = Apollo.BaseMutationOptions<
  AddBrandMutation,
  AddBrandMutationVariables
>
export const AddProductDocument = gql`
  mutation AddProduct(
    $brandId: String
    $showSegmentId: String
    $name: String!
    $description: String!
    $variantData: CreateVariantDto!
  ) {
    addProduct(
      data: {
        brandId: $brandId
        showSegmentId: $showSegmentId
        name: $name
        description: $description
        variantData: $variantData
      }
    ) {
      id
    }
  }
`
export type AddProductMutationFn = Apollo.MutationFunction<
  AddProductMutation,
  AddProductMutationVariables
>

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      showSegmentId: // value for 'showSegmentId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      variantData: // value for 'variantData'
 *   },
 * });
 */
export function useAddProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProductMutation,
    AddProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(
    AddProductDocument,
    options,
  )
}
export type AddProductMutationHookResult = ReturnType<
  typeof useAddProductMutation
>
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>
export type AddProductMutationOptions = Apollo.BaseMutationOptions<
  AddProductMutation,
  AddProductMutationVariables
>
export const AddShowSegmentDocument = gql`
  mutation AddShowSegment(
    $showId: String!
    $brandId: String!
    $title: String!
    $productsIds: [String!]!
  ) {
    addShowSegment(
      data: {
        showId: $showId
        brandId: $brandId
        title: $title
        productsIds: $productsIds
      }
    ) {
      id
    }
  }
`
export type AddShowSegmentMutationFn = Apollo.MutationFunction<
  AddShowSegmentMutation,
  AddShowSegmentMutationVariables
>

/**
 * __useAddShowSegmentMutation__
 *
 * To run a mutation, you first call `useAddShowSegmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShowSegmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShowSegmentMutation, { data, loading, error }] = useAddShowSegmentMutation({
 *   variables: {
 *      showId: // value for 'showId'
 *      brandId: // value for 'brandId'
 *      title: // value for 'title'
 *      productsIds: // value for 'productsIds'
 *   },
 * });
 */
export function useAddShowSegmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddShowSegmentMutation,
    AddShowSegmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddShowSegmentMutation,
    AddShowSegmentMutationVariables
  >(AddShowSegmentDocument, options)
}
export type AddShowSegmentMutationHookResult = ReturnType<
  typeof useAddShowSegmentMutation
>
export type AddShowSegmentMutationResult = Apollo.MutationResult<AddShowSegmentMutation>
export type AddShowSegmentMutationOptions = Apollo.BaseMutationOptions<
  AddShowSegmentMutation,
  AddShowSegmentMutationVariables
>
export const AddShowWithSegmentDocument = gql`
  mutation AddShowWithSegment(
    $brandId: String!
    $title: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $showSegment: ShowSegmentDto!
  ) {
    addShowWithSegment(
      data: {
        brandId: $brandId
        title: $title
        imageUrl: ""
        startDate: $startDate
        endDate: $endDate
        showSegment: $showSegment
      }
    ) {
      id
    }
  }
`
export type AddShowWithSegmentMutationFn = Apollo.MutationFunction<
  AddShowWithSegmentMutation,
  AddShowWithSegmentMutationVariables
>

/**
 * __useAddShowWithSegmentMutation__
 *
 * To run a mutation, you first call `useAddShowWithSegmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShowWithSegmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShowWithSegmentMutation, { data, loading, error }] = useAddShowWithSegmentMutation({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      title: // value for 'title'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      showSegment: // value for 'showSegment'
 *   },
 * });
 */
export function useAddShowWithSegmentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddShowWithSegmentMutation,
    AddShowWithSegmentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddShowWithSegmentMutation,
    AddShowWithSegmentMutationVariables
  >(AddShowWithSegmentDocument, options)
}
export type AddShowWithSegmentMutationHookResult = ReturnType<
  typeof useAddShowWithSegmentMutation
>
export type AddShowWithSegmentMutationResult = Apollo.MutationResult<AddShowWithSegmentMutation>
export type AddShowWithSegmentMutationOptions = Apollo.BaseMutationOptions<
  AddShowWithSegmentMutation,
  AddShowWithSegmentMutationVariables
>
export const AddUserDocument = gql`
  mutation AddUser($phone: String!) {
    add_user(phone: $phone)
  }
`
export type AddUserMutationFn = Apollo.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>

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
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserMutation,
    AddUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options,
  )
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>
export const SubscribeToWaitlistDocument = gql`
  mutation SubscribeToWaitlist($email: String!) {
    addConsumerLead(email: $email) {
      email
    }
  }
`
export type SubscribeToWaitlistMutationFn = Apollo.MutationFunction<
  SubscribeToWaitlistMutation,
  SubscribeToWaitlistMutationVariables
>

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
export function useSubscribeToWaitlistMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubscribeToWaitlistMutation,
    SubscribeToWaitlistMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SubscribeToWaitlistMutation,
    SubscribeToWaitlistMutationVariables
  >(SubscribeToWaitlistDocument, options)
}
export type SubscribeToWaitlistMutationHookResult = ReturnType<
  typeof useSubscribeToWaitlistMutation
>
export type SubscribeToWaitlistMutationResult = Apollo.MutationResult<SubscribeToWaitlistMutation>
export type SubscribeToWaitlistMutationOptions = Apollo.BaseMutationOptions<
  SubscribeToWaitlistMutation,
  SubscribeToWaitlistMutationVariables
>
export const UpdateBrandDocument = gql`
  mutation UpdateBrand($id: String!, $name: String!, $description: String!) {
    updateBrand(data: { id: $id, name: $name, description: $description }) {
      id
      name
      description
    }
  }
`
export type UpdateBrandMutationFn = Apollo.MutationFunction<
  UpdateBrandMutation,
  UpdateBrandMutationVariables
>

/**
 * __useUpdateBrandMutation__
 *
 * To run a mutation, you first call `useUpdateBrandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBrandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBrandMutation, { data, loading, error }] = useUpdateBrandMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateBrandMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBrandMutation,
    UpdateBrandMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateBrandMutation, UpdateBrandMutationVariables>(
    UpdateBrandDocument,
    options,
  )
}
export type UpdateBrandMutationHookResult = ReturnType<
  typeof useUpdateBrandMutation
>
export type UpdateBrandMutationResult = Apollo.MutationResult<UpdateBrandMutation>
export type UpdateBrandMutationOptions = Apollo.BaseMutationOptions<
  UpdateBrandMutation,
  UpdateBrandMutationVariables
>
export const UpdateProductDocument = gql`
  mutation UpdateProduct($id: String!, $name: String!, $description: String!) {
    update_product(data: { id: $id, name: $name, description: $description }) {
      id
      name
      description
    }
  }
`
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument, options)
}
export type UpdateProductMutationHookResult = ReturnType<
  typeof useUpdateProductMutation
>
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>
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
`
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>

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
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  )
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>
export const GetBrandDocument = gql`
  query GetBrand($brandId: String!) {
    brand(brandId: $brandId) {
      name
      description
    }
  }
`

/**
 * __useGetBrandQuery__
 *
 * To run a query within a React component, call `useGetBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandQuery({
 *   variables: {
 *      brandId: // value for 'brandId'
 *   },
 * });
 */
export function useGetBrandQuery(
  baseOptions: Apollo.QueryHookOptions<GetBrandQuery, GetBrandQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBrandQuery, GetBrandQueryVariables>(
    GetBrandDocument,
    options,
  )
}
export function useGetBrandLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBrandQuery,
    GetBrandQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBrandQuery, GetBrandQueryVariables>(
    GetBrandDocument,
    options,
  )
}
export type GetBrandQueryHookResult = ReturnType<typeof useGetBrandQuery>
export type GetBrandLazyQueryHookResult = ReturnType<
  typeof useGetBrandLazyQuery
>
export type GetBrandQueryResult = Apollo.QueryResult<
  GetBrandQuery,
  GetBrandQueryVariables
>
export const GetBrandProductsDocument = gql`
  query GetBrandProducts($brandId: String!, $limit: Float!, $offset: Float!) {
    brandProducts(
      paginationQuery: { limit: $limit, offset: $offset }
      brandId: $brandId
    ) {
      id
      name
      description
    }
  }
`

/**
 * __useGetBrandProductsQuery__
 *
 * To run a query within a React component, call `useGetBrandProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandProductsQuery({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetBrandProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBrandProductsQuery,
    GetBrandProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBrandProductsQuery, GetBrandProductsQueryVariables>(
    GetBrandProductsDocument,
    options,
  )
}
export function useGetBrandProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBrandProductsQuery,
    GetBrandProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetBrandProductsQuery,
    GetBrandProductsQueryVariables
  >(GetBrandProductsDocument, options)
}
export type GetBrandProductsQueryHookResult = ReturnType<
  typeof useGetBrandProductsQuery
>
export type GetBrandProductsLazyQueryHookResult = ReturnType<
  typeof useGetBrandProductsLazyQuery
>
export type GetBrandProductsQueryResult = Apollo.QueryResult<
  GetBrandProductsQuery,
  GetBrandProductsQueryVariables
>
export const GetBrandShowsDocument = gql`
  query GetBrandShows($brandId: String!, $limit: Float!, $offset: Float!) {
    brandShows(
      paginationQuery: { limit: $limit, offset: $offset }
      brandId: $brandId
    ) {
      id
      title
      start_date
      end_date
      showSegments {
        title
      }
    }
  }
`

/**
 * __useGetBrandShowsQuery__
 *
 * To run a query within a React component, call `useGetBrandShowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandShowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandShowsQuery({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetBrandShowsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBrandShowsQuery,
    GetBrandShowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBrandShowsQuery, GetBrandShowsQueryVariables>(
    GetBrandShowsDocument,
    options,
  )
}
export function useGetBrandShowsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBrandShowsQuery,
    GetBrandShowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBrandShowsQuery, GetBrandShowsQueryVariables>(
    GetBrandShowsDocument,
    options,
  )
}
export type GetBrandShowsQueryHookResult = ReturnType<
  typeof useGetBrandShowsQuery
>
export type GetBrandShowsLazyQueryHookResult = ReturnType<
  typeof useGetBrandShowsLazyQuery
>
export type GetBrandShowsQueryResult = Apollo.QueryResult<
  GetBrandShowsQuery,
  GetBrandShowsQueryVariables
>
export const GetConsumerLeadsDocument = gql`
  query GetConsumerLeads {
    consumerLeads(paginationQuery: { limit: 10, offset: 0 }) {
      id
      email
      submitted_timestamp
    }
  }
`

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
export function useGetConsumerLeadsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetConsumerLeadsQuery,
    GetConsumerLeadsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetConsumerLeadsQuery, GetConsumerLeadsQueryVariables>(
    GetConsumerLeadsDocument,
    options,
  )
}
export function useGetConsumerLeadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetConsumerLeadsQuery,
    GetConsumerLeadsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetConsumerLeadsQuery,
    GetConsumerLeadsQueryVariables
  >(GetConsumerLeadsDocument, options)
}
export type GetConsumerLeadsQueryHookResult = ReturnType<
  typeof useGetConsumerLeadsQuery
>
export type GetConsumerLeadsLazyQueryHookResult = ReturnType<
  typeof useGetConsumerLeadsLazyQuery
>
export type GetConsumerLeadsQueryResult = Apollo.QueryResult<
  GetConsumerLeadsQuery,
  GetConsumerLeadsQueryVariables
>
export const GetMyBrandsDocument = gql`
  query GetMyBrands($limit: Float!, $offset: Float!) {
    my_brands(paginationQuery: { limit: $limit, offset: $offset }) {
      id
      name
      description
    }
  }
`

/**
 * __useGetMyBrandsQuery__
 *
 * To run a query within a React component, call `useGetMyBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBrandsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMyBrandsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMyBrandsQuery,
    GetMyBrandsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyBrandsQuery, GetMyBrandsQueryVariables>(
    GetMyBrandsDocument,
    options,
  )
}
export function useGetMyBrandsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyBrandsQuery,
    GetMyBrandsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyBrandsQuery, GetMyBrandsQueryVariables>(
    GetMyBrandsDocument,
    options,
  )
}
export type GetMyBrandsQueryHookResult = ReturnType<typeof useGetMyBrandsQuery>
export type GetMyBrandsLazyQueryHookResult = ReturnType<
  typeof useGetMyBrandsLazyQuery
>
export type GetMyBrandsQueryResult = Apollo.QueryResult<
  GetMyBrandsQuery,
  GetMyBrandsQueryVariables
>
export const GetMyProductsDocument = gql`
  query GetMyProducts($limit: Float!, $offset: Float!) {
    myProducts(paginationQuery: { limit: $limit, offset: $offset }) {
      id
      name
      description
      brand {
        name
      }
    }
  }
`

/**
 * __useGetMyProductsQuery__
 *
 * To run a query within a React component, call `useGetMyProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMyProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMyProductsQuery,
    GetMyProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyProductsQuery, GetMyProductsQueryVariables>(
    GetMyProductsDocument,
    options,
  )
}
export function useGetMyProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyProductsQuery,
    GetMyProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyProductsQuery, GetMyProductsQueryVariables>(
    GetMyProductsDocument,
    options,
  )
}
export type GetMyProductsQueryHookResult = ReturnType<
  typeof useGetMyProductsQuery
>
export type GetMyProductsLazyQueryHookResult = ReturnType<
  typeof useGetMyProductsLazyQuery
>
export type GetMyProductsQueryResult = Apollo.QueryResult<
  GetMyProductsQuery,
  GetMyProductsQueryVariables
>
export const GetProductDocument = gql`
  query GetProduct($productId: String!) {
    product(productId: $productId) {
      name
      description
      variants {
        id
        name
        description
        skus {
          id
          name
          friendlyName
          COGS
          stock
        }
      }
    }
  }
`

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetProductQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProductQuery,
    GetProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(
    GetProductDocument,
    options,
  )
}
export function useGetProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProductQuery,
    GetProductQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(
    GetProductDocument,
    options,
  )
}
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>
export type GetProductLazyQueryHookResult = ReturnType<
  typeof useGetProductLazyQuery
>
export type GetProductQueryResult = Apollo.QueryResult<
  GetProductQuery,
  GetProductQueryVariables
>
export const GetShowDocument = gql`
  query GetShow($showId: String!) {
    show(showId: $showId) {
      id
      title
      start_date
      end_date
      showSegments {
        id
        title
        products {
          name
        }
      }
    }
  }
`

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
 *      showId: // value for 'showId'
 *   },
 * });
 */
export function useGetShowQuery(
  baseOptions: Apollo.QueryHookOptions<GetShowQuery, GetShowQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetShowQuery, GetShowQueryVariables>(
    GetShowDocument,
    options,
  )
}
export function useGetShowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetShowQuery,
    GetShowQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetShowQuery, GetShowQueryVariables>(
    GetShowDocument,
    options,
  )
}
export type GetShowQueryHookResult = ReturnType<typeof useGetShowQuery>
export type GetShowLazyQueryHookResult = ReturnType<typeof useGetShowLazyQuery>
export type GetShowQueryResult = Apollo.QueryResult<
  GetShowQuery,
  GetShowQueryVariables
>
export const GetShowSegmentByBrandAndShowDocument = gql`
  query GetShowSegmentByBrandAndShow($brandId: String!, $showId: String!) {
    showSegmentByBrandAndShow(brandId: $brandId, showId: $showId) {
      id
      title
      products {
        name
      }
    }
  }
`

/**
 * __useGetShowSegmentByBrandAndShowQuery__
 *
 * To run a query within a React component, call `useGetShowSegmentByBrandAndShowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShowSegmentByBrandAndShowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShowSegmentByBrandAndShowQuery({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      showId: // value for 'showId'
 *   },
 * });
 */
export function useGetShowSegmentByBrandAndShowQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetShowSegmentByBrandAndShowQuery,
    GetShowSegmentByBrandAndShowQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetShowSegmentByBrandAndShowQuery,
    GetShowSegmentByBrandAndShowQueryVariables
  >(GetShowSegmentByBrandAndShowDocument, options)
}
export function useGetShowSegmentByBrandAndShowLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetShowSegmentByBrandAndShowQuery,
    GetShowSegmentByBrandAndShowQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetShowSegmentByBrandAndShowQuery,
    GetShowSegmentByBrandAndShowQueryVariables
  >(GetShowSegmentByBrandAndShowDocument, options)
}
export type GetShowSegmentByBrandAndShowQueryHookResult = ReturnType<
  typeof useGetShowSegmentByBrandAndShowQuery
>
export type GetShowSegmentByBrandAndShowLazyQueryHookResult = ReturnType<
  typeof useGetShowSegmentByBrandAndShowLazyQuery
>
export type GetShowSegmentByBrandAndShowQueryResult = Apollo.QueryResult<
  GetShowSegmentByBrandAndShowQuery,
  GetShowSegmentByBrandAndShowQueryVariables
>
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
`

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
export function useGetShowsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetShowsQuery, GetShowsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetShowsQuery, GetShowsQueryVariables>(
    GetShowsDocument,
    options,
  )
}
export function useGetShowsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetShowsQuery,
    GetShowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetShowsQuery, GetShowsQueryVariables>(
    GetShowsDocument,
    options,
  )
}
export type GetShowsQueryHookResult = ReturnType<typeof useGetShowsQuery>
export type GetShowsLazyQueryHookResult = ReturnType<
  typeof useGetShowsLazyQuery
>
export type GetShowsQueryResult = Apollo.QueryResult<
  GetShowsQuery,
  GetShowsQueryVariables
>
export const GetUsersDocument = gql`
  query GetUsers {
    users {
      email
    }
  }
`

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
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  )
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  )
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>
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
`

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
export function useVerifyCodeQuery(
  baseOptions: Apollo.QueryHookOptions<
    VerifyCodeQuery,
    VerifyCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<VerifyCodeQuery, VerifyCodeQueryVariables>(
    VerifyCodeDocument,
    options,
  )
}
export function useVerifyCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    VerifyCodeQuery,
    VerifyCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<VerifyCodeQuery, VerifyCodeQueryVariables>(
    VerifyCodeDocument,
    options,
  )
}
export type VerifyCodeQueryHookResult = ReturnType<typeof useVerifyCodeQuery>
export type VerifyCodeLazyQueryHookResult = ReturnType<
  typeof useVerifyCodeLazyQuery
>
export type VerifyCodeQueryResult = Apollo.QueryResult<
  VerifyCodeQuery,
  VerifyCodeQueryVariables
>
