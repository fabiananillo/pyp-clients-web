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
