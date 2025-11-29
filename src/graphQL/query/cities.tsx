import { gql } from "@apollo/client";
export const CITIES_LIST = gql(`
query CitiesList {
  citiesList {
    id
    name
    status
    slug
    lat
    lng
  }
}    
`);


export const CITY_BY_LOCATION = gql(`
query CityByLocation($getLocationInput: GetLocationInput!) {
  cityByLocation(getLocationInput: $getLocationInput) {
    street
    label
    city {
      id
      name
    }
  }
}  
`)