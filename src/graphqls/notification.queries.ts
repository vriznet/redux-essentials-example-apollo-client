import { graphql } from '../gql-codegen';

export const NOTIFICATIONS_QUERY = graphql(`
  query Notifications {
    notifications {
      id
      date
      message
      userId
      read
      isNew
    }
  }
`);

export const NOTIFICATIONS_SINCE_QUERY = graphql(`
  query NotificationsSince($date: String!) {
    notificationsSince(date: $date) {
      id
      date
      message
      userId
      read
      isNew
    }
  }
`);
