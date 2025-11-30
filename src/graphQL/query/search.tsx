import { gql } from "@apollo/client";

export const GLOBAL_SEARCH = gql(`
  query GlobalSearch(
    $query: String!
    $cityId: String!
    $latitude: Float
    $longitude: Float
  ) {
    globalSearch(
      query: $query
      cityId: $cityId
      latitude: $latitude
      longitude: $longitude
    ) {
      type
      id
      name
      description
      imageUrl
      slug
      address
      distance
      price
      companyName
    }
  }
`);