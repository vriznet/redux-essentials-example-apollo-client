import { formatDistanceToNow, parseISO } from 'date-fns';
import Spinner from '../components/Spinner';
import { notifications } from '../data/notifications';
import { Notification } from '../types/notification';
import { users } from '../data/users';

const NotificationsList = () => {
  const useGetNotificationsQuery: (userId: string) => {
    loading: boolean;
    data: {
      notifications: Notification[];
    } | null;
    error: {
      message: string;
    } | null;
  } = (userId) => {
    return {
      loading: false,
      data: {
        notifications: notifications.filter(
          (notification) => notification.userId === userId
        ),
      },
      error: null,
    };
  };

  const {
    loading: getNotificationsQueryLoading,
    data: getNotificationsQueryData,
    error: getNotificationsQueryError,
  } = useGetNotificationsQuery('1');

  if (getNotificationsQueryLoading || !getNotificationsQueryData) {
    return <Spinner text="Loading..." />;
  }

  if (getNotificationsQueryError) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an error has occured.</p>
        <p>
          <i>Error: {getNotificationsQueryError.message}</i>
        </p>
      </div>
    );
  }

  const renderedNotifications = getNotificationsQueryData.notifications.map(
    (notification) => {
      const date = parseISO(notification.date);
      const timeAgo = formatDistanceToNow(date);
      const user = users.find((user) => user.id === notification.userId) || {
        name: 'Unknown User',
      };

      return (
        <div key={notification.id} className="notification">
          <div>
            <b>{user.name}</b> {notification.message}
          </div>
          <div title={notification.date}>
            <i>{timeAgo} ago</i>
          </div>
        </div>
      );
    }
  );

  return (
    <section>
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};

export default NotificationsList;
