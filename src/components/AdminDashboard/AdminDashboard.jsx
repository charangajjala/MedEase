import "./AdminDashboard.scss";
import store from "../../assets/store.jpg";
import logo from "../../assets/logo.png";
import { useState, useRef, useEffect } from "react";

import ToggleButton from "../ToggleButton/ToggleButton";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const links = [
  "Dashboard",
  "Start Sell",
  "Order Report",
  "Product Report",
  "Add Company",
  "Company Report",
  "Add Category",
  "Logout",
];

const AdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="admin-dashboard">
      {/* <aside
      className={`admin-dashboard__sidebar ${
        props.isSidebarVisible ? "" : "admin-dashboard__sidebar--hidden"
      }`}
    >
      <div className="admin-dashboard__logo">
        <img src={props.logo} alt="Medical Store" />
      </div>
      <nav className="admin-dashboard__nav">
        {props.links.map((link, index) => (
          <a href="/" key={index} className="admin-dashboard__nav-link">
            {link}
          </a>
        ))}
      </nav>
    </aside> */}

      <ToggleButton
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />

      {/* <aside
        className={`admin-dashboard__sidebar ${
          isSidebarVisible ? "" : "admin-dashboard__sidebar--hidden"
        }`}
      >
        <div className="admin-dashboard__logo">
          <img src={logo} alt="Medical Store" />
        </div>
        <nav className="admin-dashboard__nav">
          {links.map((link, index) => (
            <a href="/" key={index} className="admin-dashboard__nav-link">
              {link}
            </a>
          ))}
        </nav>
      </aside> */}

      <Sidebar logo={logo} links={links} isSidebarVisible={isSidebarVisible} />

      <main className="admin-dashboard__main">
        {/* <header className="admin-dashboard__header">
          <h1>Medical Store Management System Admin Dashboard</h1>
          <div className="admin-dashboard__user-info" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="admin-dashboard__user-info-button"
            >
              Admin <FaUser />
            </button>
            {isDropdownOpen && (
              <ul className="admin-dashboard__user-info__dropdown-menu">
                <li className="admin-dashboard__user-info__dropdown-menu-item">
                  <a href="/profile">Profile</a>
                </li>
                <li className="admin-dashboard__user-info__dropdown-menu-item">
                  <a href="/logout">
                    Logout <FaSignOutAlt />
                  </a>{" "}
                </li>
              </ul>
            )}
          </div>
        </header> */}

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
  );
};

export default AdminDashboard;
