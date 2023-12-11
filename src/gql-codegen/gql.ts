/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  mutation AddNewNotification($message: String!, $userId: String!) {\n    addNewNotification(message: $message, userId: $userId) {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n':
    types.AddNewNotificationDocument,
  '\n  mutation MarkAsRead($id: String!) {\n    markAsRead(id: $id) {\n      ok\n      error\n    }\n  }\n':
    types.MarkAsReadDocument,
  '\n  mutation MarkAllNotificationsAsRead {\n    markAllNotificationsAsRead {\n      ok\n      error\n    }\n  }\n':
    types.MarkAllNotificationsAsReadDocument,
  '\n  mutation MarkAllNotificationsOfUserAsRead($userId: String!) {\n    markAllNotificationsOfUserAsRead(userId: $userId) {\n      ok\n      error\n    }\n  }\n':
    types.MarkAllNotificationsOfUserAsReadDocument,
  '\n  query Notifications {\n    notifications {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n':
    types.NotificationsDocument,
  '\n  query NotificationsSince($date: String!) {\n    notificationsSince(date: $date) {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n':
    types.NotificationsSinceDocument,
  '\n  mutation AddNewPost($title: String!, $content: String!, $userId: String!) {\n    addNewPost(title: $title, content: $content, userId: $userId) {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n':
    types.AddNewPostDocument,
  '\n  mutation UpdatePost($id: String!, $title: String!, $content: String!) {\n    updatePost(id: $id, title: $title, content: $content) {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n':
    types.UpdatePostDocument,
  '\n  mutation AddPostReaction($postId: String!, $reactionName: String!) {\n    addPostReaction(postId: $postId, reactionName: $reactionName) {\n      ok\n      error\n    }\n  }\n':
    types.AddPostReactionDocument,
  '\n  query Posts {\n    posts {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        id\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n':
    types.PostsDocument,
  '\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n':
    types.UsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddNewNotification($message: String!, $userId: String!) {\n    addNewNotification(message: $message, userId: $userId) {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n'
): (typeof documents)['\n  mutation AddNewNotification($message: String!, $userId: String!) {\n    addNewNotification(message: $message, userId: $userId) {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MarkAsRead($id: String!) {\n    markAsRead(id: $id) {\n      ok\n      error\n    }\n  }\n'
): (typeof documents)['\n  mutation MarkAsRead($id: String!) {\n    markAsRead(id: $id) {\n      ok\n      error\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MarkAllNotificationsAsRead {\n    markAllNotificationsAsRead {\n      ok\n      error\n    }\n  }\n'
): (typeof documents)['\n  mutation MarkAllNotificationsAsRead {\n    markAllNotificationsAsRead {\n      ok\n      error\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation MarkAllNotificationsOfUserAsRead($userId: String!) {\n    markAllNotificationsOfUserAsRead(userId: $userId) {\n      ok\n      error\n    }\n  }\n'
): (typeof documents)['\n  mutation MarkAllNotificationsOfUserAsRead($userId: String!) {\n    markAllNotificationsOfUserAsRead(userId: $userId) {\n      ok\n      error\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Notifications {\n    notifications {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n'
): (typeof documents)['\n  query Notifications {\n    notifications {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query NotificationsSince($date: String!) {\n    notificationsSince(date: $date) {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n'
): (typeof documents)['\n  query NotificationsSince($date: String!) {\n    notificationsSince(date: $date) {\n      id\n      date\n      message\n      userId\n      read\n      isNew\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddNewPost($title: String!, $content: String!, $userId: String!) {\n    addNewPost(title: $title, content: $content, userId: $userId) {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation AddNewPost($title: String!, $content: String!, $userId: String!) {\n    addNewPost(title: $title, content: $content, userId: $userId) {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation UpdatePost($id: String!, $title: String!, $content: String!) {\n    updatePost(id: $id, title: $title, content: $content) {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation UpdatePost($id: String!, $title: String!, $content: String!) {\n    updatePost(id: $id, title: $title, content: $content) {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation AddPostReaction($postId: String!, $reactionName: String!) {\n    addPostReaction(postId: $postId, reactionName: $reactionName) {\n      ok\n      error\n    }\n  }\n'
): (typeof documents)['\n  mutation AddPostReaction($postId: String!, $reactionName: String!) {\n    addPostReaction(postId: $postId, reactionName: $reactionName) {\n      ok\n      error\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Posts {\n    posts {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        id\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n'
): (typeof documents)['\n  query Posts {\n    posts {\n      id\n      title\n      content\n      userId\n      date\n      reactions {\n        id\n        thumbsUp\n        hooray\n        heart\n        rocket\n        eyes\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
