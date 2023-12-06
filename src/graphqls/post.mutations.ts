import { graphql } from '../gql-codegen';

export const ADD_NEW_POST_MUTATION = graphql(`
  mutation AddNewPost($title: String!, $content: String!, $userId: String!) {
    addNewPost(title: $title, content: $content, userId: $userId) {
      id
      title
      content
      userId
      date
      reactions {
        thumbsUp
        hooray
        heart
        rocket
        eyes
      }
    }
  }
`);
