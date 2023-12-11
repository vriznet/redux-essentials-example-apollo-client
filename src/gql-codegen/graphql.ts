/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AddNewPostResponse = {
  __typename?: 'AddNewPostResponse';
  content: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  reactions: PostReactions;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewNotification: Notification;
  addNewPost: AddNewPostResponse;
  addPostReaction: MutationResponse;
  markAllNotificationsAsRead: MutationResponse;
  markAllNotificationsOfUserAsRead: MutationResponse;
  markAsRead: MutationResponse;
  updatePost: Post;
};

export type MutationAddNewNotificationArgs = {
  message: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAddNewPostArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationAddPostReactionArgs = {
  postId: Scalars['String']['input'];
  reactionName: Scalars['String']['input'];
};

export type MutationMarkAllNotificationsOfUserAsReadArgs = {
  userId: Scalars['String']['input'];
};

export type MutationMarkAsReadArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdatePostArgs = {
  content: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Notification = {
  __typename?: 'Notification';
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isNew: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  userId: Scalars['String']['output'];
};

export type Post = {
  __typename?: 'Post';
  content: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  reactions?: Maybe<PostReactions>;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type PostReactions = {
  __typename?: 'PostReactions';
  eyes: Scalars['Int']['output'];
  heart: Scalars['Int']['output'];
  hooray: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rocket: Scalars['Int']['output'];
  thumbsUp: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  notifications: Array<Maybe<Notification>>;
  notificationsSince: Array<Maybe<Notification>>;
  posts: Array<Maybe<Post>>;
  users: Array<Maybe<User>>;
};

export type QueryNotificationsSinceArgs = {
  date: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  notifications: Array<Maybe<Notification>>;
  posts: Array<Maybe<Post>>;
};

export type AddNewNotificationMutationVariables = Exact<{
  message: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;

export type AddNewNotificationMutation = {
  __typename?: 'Mutation';
  addNewNotification: {
    __typename?: 'Notification';
    id: string;
    date: string;
    message: string;
    userId: string;
    read: boolean;
    isNew: boolean;
  };
};

export type MarkAsReadMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type MarkAsReadMutation = {
  __typename?: 'Mutation';
  markAsRead: {
    __typename?: 'MutationResponse';
    ok: boolean;
    error?: string | null;
  };
};

export type MarkAllNotificationsAsReadMutationVariables = Exact<{
  [key: string]: never;
}>;

export type MarkAllNotificationsAsReadMutation = {
  __typename?: 'Mutation';
  markAllNotificationsAsRead: {
    __typename?: 'MutationResponse';
    ok: boolean;
    error?: string | null;
  };
};

export type MarkAllNotificationsOfUserAsReadMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type MarkAllNotificationsOfUserAsReadMutation = {
  __typename?: 'Mutation';
  markAllNotificationsOfUserAsRead: {
    __typename?: 'MutationResponse';
    ok: boolean;
    error?: string | null;
  };
};

export type NotificationsQueryVariables = Exact<{ [key: string]: never }>;

export type NotificationsQuery = {
  __typename?: 'Query';
  notifications: Array<{
    __typename?: 'Notification';
    id: string;
    date: string;
    message: string;
    userId: string;
    read: boolean;
    isNew: boolean;
  } | null>;
};

export type NotificationsSinceQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;

export type NotificationsSinceQuery = {
  __typename?: 'Query';
  notificationsSince: Array<{
    __typename?: 'Notification';
    id: string;
    date: string;
    message: string;
    userId: string;
    read: boolean;
    isNew: boolean;
  } | null>;
};

export type AddNewPostMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;

export type AddNewPostMutation = {
  __typename?: 'Mutation';
  addNewPost: {
    __typename?: 'AddNewPostResponse';
    id: string;
    title: string;
    content: string;
    userId: string;
    date: string;
    reactions: {
      __typename?: 'PostReactions';
      thumbsUp: number;
      hooray: number;
      heart: number;
      rocket: number;
      eyes: number;
    };
  };
};

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;

export type UpdatePostMutation = {
  __typename?: 'Mutation';
  updatePost: {
    __typename?: 'Post';
    id: string;
    title: string;
    content: string;
    userId: string;
    date: string;
    reactions?: {
      __typename?: 'PostReactions';
      thumbsUp: number;
      hooray: number;
      heart: number;
      rocket: number;
      eyes: number;
    } | null;
  };
};

export type AddPostReactionMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  reactionName: Scalars['String']['input'];
}>;

export type AddPostReactionMutation = {
  __typename?: 'Mutation';
  addPostReaction: {
    __typename?: 'MutationResponse';
    ok: boolean;
    error?: string | null;
  };
};

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
  __typename?: 'Query';
  posts: Array<{
    __typename?: 'Post';
    id: string;
    title: string;
    content: string;
    userId: string;
    date: string;
    reactions?: {
      __typename?: 'PostReactions';
      id: string;
      thumbsUp: number;
      hooray: number;
      heart: number;
      rocket: number;
      eyes: number;
    } | null;
  } | null>;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: 'Query';
  users: Array<{ __typename?: 'User'; id: string; name: string } | null>;
};

export const AddNewNotificationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddNewNotification' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'message' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addNewNotification' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'message' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'message' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'read' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isNew' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddNewNotificationMutation,
  AddNewNotificationMutationVariables
>;
export const MarkAsReadDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MarkAsRead' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'markAsRead' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ok' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MarkAsReadMutation, MarkAsReadMutationVariables>;
export const MarkAllNotificationsAsReadDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MarkAllNotificationsAsRead' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'markAllNotificationsAsRead' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ok' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MarkAllNotificationsAsReadMutation,
  MarkAllNotificationsAsReadMutationVariables
>;
export const MarkAllNotificationsOfUserAsReadDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MarkAllNotificationsOfUserAsRead' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'markAllNotificationsOfUserAsRead' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ok' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MarkAllNotificationsOfUserAsReadMutation,
  MarkAllNotificationsOfUserAsReadMutationVariables
>;
export const NotificationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Notifications' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'notifications' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'read' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isNew' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<NotificationsQuery, NotificationsQueryVariables>;
export const NotificationsSinceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'NotificationsSince' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'date' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'notificationsSince' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'date' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'date' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'read' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isNew' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  NotificationsSinceQuery,
  NotificationsSinceQueryVariables
>;
export const AddNewPostDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddNewPost' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'content' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addNewPost' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'content' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'content' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'thumbsUp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hooray' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'heart' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rocket' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'eyes' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddNewPostMutation, AddNewPostMutationVariables>;
export const UpdatePostDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePost' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'title' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'content' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updatePost' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'title' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'title' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'content' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'content' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'thumbsUp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hooray' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'heart' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rocket' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'eyes' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const AddPostReactionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AddPostReaction' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'postId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reactionName' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addPostReaction' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'postId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'postId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reactionName' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reactionName' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'ok' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddPostReactionMutation,
  AddPostReactionMutationVariables
>;
export const PostsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Posts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'posts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'content' } },
                { kind: 'Field', name: { kind: 'Name', value: 'userId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'reactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'thumbsUp' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hooray' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'heart' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'rocket' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'eyes' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;
export const UsersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Users' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'users' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
