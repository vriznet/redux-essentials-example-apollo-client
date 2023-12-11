import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Notification } from '../../types/notification';
import { RootState } from '.';
import {
  apolloQueryWithDelay,
  dayjsTimezone,
  deepRemoveTypenameInArray,
} from '../../utils';
import {
  MarkAllNotificationsAsReadMutation,
  MarkAllNotificationsAsReadMutationVariables,
  MarkAllNotificationsOfUserAsReadMutation,
  MarkAllNotificationsOfUserAsReadMutationVariables,
  NotificationsSinceQuery,
  NotificationsSinceQueryVariables,
} from '../../gql-codegen/graphql';
import { NOTIFICATIONS_SINCE_QUERY } from '../../graphqls/notification.queries';
import {
  MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION,
  MARK_ALL_NOTIFICATIONS_OF_USER_AS_READ_MUTATION,
} from '../../graphqls/notification.mutations';
import { client } from '../../apollo';
import dayjs from 'dayjs';

type NotificationsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const notificationsAdapter = createEntityAdapter<Notification>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = notificationsAdapter.getInitialState<NotificationsState>({
  status: 'idle',
  error: undefined,
});

export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  { state: RootState }
>('notifications/fetchNotifications', async (_, { getState }) => {
  dayjsTimezone();
  const allNotifications = selectNotifications(getState());
  const [latestNotification] = allNotifications;
  const latestNotificationDate = latestNotification
    ? dayjs(parseInt(latestNotification.date, 10))
        .tz('Asia/Seoul')
        .toISOString()
    : dayjs.unix(0).toISOString();
  const response = await apolloQueryWithDelay<
    NotificationsSinceQuery,
    NotificationsSinceQueryVariables
  >(
    NOTIFICATIONS_SINCE_QUERY,
    500,
    {
      date: latestNotificationDate,
    },
    'network-only'
  );
  if (!response) {
    console.error('Notification not found.');
    return [];
  }
  return deepRemoveTypenameInArray(response.notificationsSince) || [];
});

export const markAllNotificationsAsRead = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>('notifications/markAllNotificationsAsRead', async () => {
  const response = await client.mutate<
    MarkAllNotificationsAsReadMutation,
    MarkAllNotificationsAsReadMutationVariables
  >({
    mutation: MARK_ALL_NOTIFICATIONS_AS_READ_MUTATION,
  });
  if (!response || !response.data) {
    console.error('Something went wrong.');
    return false;
  }
  if (!response.data.markAllNotificationsAsRead.ok) {
    console.error(response.data.markAllNotificationsAsRead.error);
    return false;
  }
  return true;
});

export const markAllNotificationsOfUserAsRead = createAsyncThunk<
  string,
  { userId: string },
  { state: RootState }
>('notifications/markAllNotificationsOfUserAsRead', async ({ userId }) => {
  const response = await client.mutate<
    MarkAllNotificationsOfUserAsReadMutation,
    MarkAllNotificationsOfUserAsReadMutationVariables
  >({
    mutation: MARK_ALL_NOTIFICATIONS_OF_USER_AS_READ_MUTATION,
    variables: { userId },
  });
  if (!response || !response.data) {
    console.error('Something went wrong.');
    return '';
  }
  if (!response.data.markAllNotificationsOfUserAsRead.ok) {
    console.error(response.data.markAllNotificationsOfUserAsRead.error);
    return '';
  }
  return userId;
});

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.status = 'succeeded';
      notificationsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(markAllNotificationsOfUserAsRead.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
      if (action.payload === true) {
        state.status = 'succeeded';
        Object.values(state.entities).forEach((notification) => {
          if (!notification) return;
          notification.read = true;
          notification.isNew = false;
        });
      } else {
        state.status = 'failed';
        state.error = 'Something went wrong.';
      }
    });
    builder.addCase(markAllNotificationsAsRead.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Something went wrong.';
    });
    builder.addCase(
      markAllNotificationsOfUserAsRead.fulfilled,
      (state, action) => {
        if (action.payload !== '') {
          state.status = 'succeeded';
          const userId = action.payload;
          Object.values(state.entities).forEach((notification) => {
            if (!notification) return;
            if (notification.userId === userId) {
              notification.read = true;
              notification.isNew = false;
            }
          });
        } else {
          state.status = 'failed';
          state.error = 'Something went wrong.';
        }
      }
    );
    builder.addCase(markAllNotificationsOfUserAsRead.rejected, (state) => {
      state.status = 'failed';
      state.error = 'Something went wrong.';
    });
  },
});

export const { selectAll: selectNotifications } =
  notificationsAdapter.getSelectors<RootState>(
    (state: RootState) => state.notifications
  );

export default notificationsSlice.reducer;
