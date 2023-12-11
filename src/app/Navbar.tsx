import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchNotifications,
  selectNotifications,
} from '../redux/module/notificationsSlice';
import { AppDispatch } from '../redux/store';
import { useMutation } from '@apollo/client';
import {
  AddNewNotificationMutation,
  AddNewNotificationMutationVariables,
} from '../gql-codegen/graphql';
import { ADD_NEW_NOTIFICATION_MUTATION } from '../graphqls/notification.mutations';
import randomstring from 'randomstring';
import { selectUsers } from '../redux/module/usersSlice';

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const notifications = useSelector(selectNotifications);
  const numUnreadNotifications = notifications.filter(
    (notification) => !notification.read
  ).length;
  const users = useSelector(selectUsers);
  const addNewNotificationUser = users[0];

  const [addNewNotificationMutation] = useMutation<
    AddNewNotificationMutation,
    AddNewNotificationMutationVariables
  >(ADD_NEW_NOTIFICATION_MUTATION, {
    variables: {
      message: randomstring.generate(10),
      userId: addNewNotificationUser?.id,
    },
  });

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  const addNewNotification = () => {
    addNewNotificationMutation();
  };

  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnreadNotifications}</span>
    );
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/posts">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadNotificationsBadge}
            </Link>
          </div>
          <button className="button" onClick={addNewNotification}>
            Add Test Notification
          </button>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
