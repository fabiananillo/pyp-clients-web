import { gql } from "@apollo/client";

export const LOGIN = gql(`
mutation Login($loginInput: LoginInput!) {
  clientLogin(loginInput: $loginInput) {
    token
    client {
      id
      email
      documentNumber
      firstName
      lastName
      profilePicture
      phoneCode
      phoneNumber
      gender
      birthDate
      relativeLocationFeed
      showOnboarding
      activeNotifications
      status
    }
  }
}
`);

export const REGISTER = gql(`
mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    token
    user {
      id
      email
      phone
    }
  }
}
`);

export const NEWPASSWORD = gql(`
mutation NewPassword($newPasswordInput: NewPasswordInput!) {
  newPassword(newPasswordInput: $newPasswordInput) {
    password
  }
}
`);

