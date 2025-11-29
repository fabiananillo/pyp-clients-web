import { gql } from "@apollo/client";

export const CATEGORIES_LIST = gql(`
   query Query {
  foodCategoryList {
    id
    logo
    name
    slug
    backgroundColor
  }
}
`);
