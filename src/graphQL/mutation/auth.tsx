import { gql } from "@apollo/client";



export const NEWPASSWORD = gql(`
mutation NewPassword($newPasswordInput: NewPasswordInput!) {
  newPassword(newPasswordInput: $newPasswordInput) {
    password
  }
}
`);

