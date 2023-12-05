import { Link } from 'react-router-dom';

const Navbar = () => {
  const tempNumUnreadNotifications = 1;

  const fetchNewNotifications = () => {};

  let unreadNotificationsBadge;

  if (tempNumUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{tempNumUnreadNotifications}</span>
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
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
