import "./AdminDashboard.scss";
import store from "../../assets/store.jpg";
import logo from "../../assets/logo.png";
import { useState, useRef, useEffect } from "react";

import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
} from "../../components/index.js";

import {links} from '../../constants/links.js';


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
