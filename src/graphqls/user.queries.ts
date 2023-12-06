import { graphql } from '../gql-codegen';

export const USERS_QUERY = graphql(`
  query Users {
    users {
      id
      name
    }
  }
`);
