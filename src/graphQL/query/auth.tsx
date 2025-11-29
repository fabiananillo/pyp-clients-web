import { gql } from "@apollo/client";

export const RECOVERPASSWORDVALIDATION = gql(`
query RecoverPasswordValidation($recoverPasswordValidationInput: RecoverPasswordValidationInput!) {
  recoverPasswordValidation(recoverPasswordValidationInput: $recoverPasswordValidationInput) {
    isValid
  }
}
`);
