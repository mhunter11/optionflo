import gql from 'graphql-tag'

export const GET_USER_INFO = gql`
  query getUserInfo($myUserId: String!) {
    getUser(userId: $myUserId) {
      type
      stripeId
      id
      createdAt
      username
      email
    }
  }
`

export const GET_OPTIONS = gql`
  {
    getOptions {
      ticker
      put_call
      time
      sentiment
      option_symbol
      option_activity_type
      open_interest
      date_expiration
      date
      description
      ask
      cost_basis
      trade_count
      strike_price
      updated
      volume
    }
  }
`

export const SUBSCRIPTION_NEW_OPTION = gql`
  subscription {
    newOption {
      id
      ticker
      put_call
      time
      sentiment
      option_symbol
      option_activity_type
      open_interest
      date_expiration
      date
      description
      ask
      cost_basis
      trade_count
    }
  }
`