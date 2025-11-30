import { gql } from "@apollo/client";

export const COMPANIES_MOST_BOUGHT = gql(`
    query CompaniesMostBought {
  companiesMostBought {
      id
      companyId
      companyName
      totalSells
      slug
      logoUrl
    }
  }
`);

export const COMPANY_BY_SLUG = gql(`
  query CompaniesBySlug($slug: String) {
  companiesBySlug(slug: $slug) {
      id
      name
      logoUrl
      bannerUrl
      deliveryDriveThru
      deliveryPickup
      username
      score
      slug
    }
  }
`);

export const BRANCHES_BY_COMPANY = gql(`
  query BranchesByCompany(
    $cityId: String!
    $companyId: ID!
    $latitude: Float
    $longitude: Float
  ) {
    branchesByCompany(
      cityId: $cityId
      companyId: $companyId
      latitude: $latitude
      longitude: $longitude
    ) {
      id
      name
    }
  }
`);

export const COMPANIES_NEAREST = gql(`
  query CompaniesNearest(
    $cityId: String!
    $longitude: Float
    $latitude: Float
    $deliveryMethod: DeliveryMethod
  ) {
    companiesNearest(
      cityId: $cityId
      longitude: $longitude
      latitude: $latitude
      deliveryMethod: $deliveryMethod
      limit: 30
    ) {
      companyId
      branchId
      branchName
      companyName
      logoUrl
      distance
      address
      scheduleType
      latitude
      longitude
      slug
      scheduleInfo {
        alwaysOpen {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
        orderOnly {
          monday
          tuesday
          wednesday
          thursday
          friday
          saturday
          sunday
        }
        specificTime {
          monday {
            status
            initialTime
            finalTime
          }
          tuesday {
            status
            initialTime
            finalTime
          }
          wednesday {
            status
            initialTime
            finalTime
          }
          thursday {
            status
            initialTime
            finalTime
          }
          friday {
            status
            initialTime
            finalTime
          }
          saturday {
            status
            initialTime
            finalTime
          }
          sunday {
            status
            initialTime
            finalTime
          }
        }
      }
    }
  }
`);
