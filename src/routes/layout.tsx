import { Outlet } from 'react-router-dom';
import Navbar from '../app/Navbar';
import { GlobalStyles } from '../components/GlobalStyles';

const Layout = () => {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
