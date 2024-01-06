import "./AdminDashboard.scss";
import store from "../../assets/store.jpg";
import logo from "../../assets/logo.png";

import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
} from "../../components/index.js";

import {links} from '../../constants/links.js';
import useVisibilityToggle from "../../hooks/useVisibilityToggle.jsx";


const AdminDashboard = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  return (
    <>
      <div className="admin-dashboard">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="admin-dashboard__main">
          <Header
            dropdownRef={dropdownRef}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            userName={"Admin"}
            dropdownMenu={[
              {
                name: "Profile",
                link: "/profile",
              },
              {
                name: "Logout",
                link: "/logout",
              },
            ]}
            heading={"Medical Store Management System Admin Dashboard"}
          />

          <div className="admin-dashboard__content">
            <div className="admin-dashboard__content-right">
              {links.map((link, index) => (
                <a
                  href="/"
                  key={index}
                  className="admin-dashboard__content-right__link"
                >
                  {link}
                </a>
              ))}
            </div>
            <img src={store} alt="store" />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
