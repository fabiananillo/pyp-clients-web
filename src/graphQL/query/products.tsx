import { gql } from "@apollo/client";

export const PRODUCTS_BY_COMPANY = gql(`
query ProductsByCompany($companyId: String!, $cityId: String!, $catalog: CatalogType!) {
  productsByCompany(companyId: $companyId, cityId: $cityId, catalog: $catalog) {
    id
    name
    priceBefore
    discountValue
    price
    description
    preparationTimeMin
    isFlash
    isCoupon
    score
    slug
    clientUrl
    productImages {
      url
    }
  }
}    
`);


export const PRODUCT_BY_CLIENTURL = gql(
  `
 query Product($clientUrl: String) {
  product(clientUrl: $clientUrl) {
    id
    name
    initialQuantity
    priceBefore
    discountValue
    price
    sku
    description
    preparationTimeMin
    isFlash
    isCoupon
    startDate
    expireDate
    readableConditions
    includeComplements
    score
    status
    slug
    clientUrl
    productImages {
      url
    }
    couponDeal
    couponType
    complements {
      name
    }
    foodClass {
      name
    }
    foodCategory {
      name
    }
  }
}
  `
)