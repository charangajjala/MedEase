import "./AddMedicine.scss";
import logo from "../../assets/logo.png";
import { useState, useRef } from "react";

import Sidebar from "../Sidebar/Sidebar";
import ToggleButton from "../ToggleButton/ToggleButton";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { links } from "../../constants/links.js";

const AddMedicine = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="add-product-form">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="add-product-form__main">
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
            heading={"Add Medicine"}
          />

          <div className="add-product-form__content">
            
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AddMedicine;
