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

export const UPDATE_POST_MUTATION = graphql(`
  mutation UpdatePost($id: String!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
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

export const ADD_POST_REACTION_MUTATION = graphql(`
  mutation AddPostReaction($postId: String!, $reactionName: String!) {
    addPostReaction(postId: $postId, reactionName: $reactionName) {
      ok
      error
    }
  }
`);
