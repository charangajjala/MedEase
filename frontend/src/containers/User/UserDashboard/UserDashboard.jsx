import { Sidebar, ToggleButton, Footer, Header } from "../../../components";
import "./UserDashboard.scss";

import store from "../../../assets/store.jpg";
import logo from "../../../assets/logo.png";
import { userLinks } from "../../../constants/userLinks";

import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

const UserDashboard = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  return (
    <>
      <div className="user-dashboard">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={userLinks}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="user-dashboard__main">
          <Header
            dropdownRef={dropdownRef}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
            userName={"User"}
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
            heading={"User Dashboard"}
          />

          <div className="user-dashboard__content">
            <img src={store} alt="store" />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
