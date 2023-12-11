import { graphql } from '../gql-codegen';

export const POSTS_QUERY = graphql(`
  query Posts {
    posts {
      id
      title
      content
      userId
      date
      reactions {
        id
        thumbsUp
        hooray
        heart
        rocket
        eyes
      }
    }
  }
`);
