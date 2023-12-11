import { graphql } from '../gql-codegen';

export const ADD_NEW_NOTIFICATION_MUTATION = graphql(`
  mutation AddNewNotification($message: String!, $userId: String!) {
    addNewNotification(message: $message, userId: $userId) {
      id
      date
      message
      userId
      read
      isNew
    }
  }
`);

export const MARK_AS_READ_MUTATION = graphql(`
  mutation MarkAsRead($id: String!) {
    markAsRead(id: $id) {
      ok
      error
    }
  }
`);

export const MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION = graphql(`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead {
      ok
      error
    }
  }
`);

export const MARK_ALL_NOTIFICATIONS_OF_USER_AS_READ_MUTATION = graphql(`
  mutation MarkAllNotificationsOfUserAsRead($userId: String!) {
    markAllNotificationsOfUserAsRead(userId: $userId) {
      ok
      error
    }
  }
`);
