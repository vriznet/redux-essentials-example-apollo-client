import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../redux/module/usersSlice';
import {
  markAllNotificationsAsRead,
  selectNotifications,
} from '../redux/module/notificationsSlice';
import { useEffect } from 'react';
import classnames from 'classnames';
import { AppDispatch } from '../redux/store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { dayjsTimezone } from '../utils';

const NotificationsList = () => {
  dayjsTimezone();
  dayjs.extend(relativeTime);

  const dispatch = useDispatch<AppDispatch>();

  const notifications = useSelector(selectNotifications);
  const users = useSelector(selectUsers);

  const renderedNotifications = notifications.map((notification) => {
    const date = dayjs(parseInt(notification.date, 10))
      .tz('Asia/Seoul')
      .toDate();
    const timeAgo = dayjs(date).fromNow();
    const user = users.find((user) => user.id === notification.userId) || {
      name: 'Unknown User',
    };

    const notificationClassname = classnames('notification', {
      new: notification.isNew,
    });

    return (
      <div key={notification.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{timeAgo}</i>
        </div>
      </div>
    );
  });

  useEffect(() => {
    dispatch(markAllNotificationsAsRead());
  }, []);

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  );
};

export default NotificationsList;
