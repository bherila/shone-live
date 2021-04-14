/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VerifyCode
// ====================================================

export interface VerifyCode_verify_code {
  __typename: "User";
  id: string;
  email: string | null;
  phone: string;
  username: string | null;
  token: string | null;
}

export interface VerifyCode {
  verify_code: VerifyCode_verify_code;
}

export interface VerifyCodeVariables {
  code: string;
  phone: string;
}
