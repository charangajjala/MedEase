import "./AddMedicine.scss";
// import store from "../../assets/store.jpg";
// import logo from "../../assets/logo.png";
// import { useState, useRef, useEffect } from "react";

// import Sidebar from "../Sidebar/Sidebar";
// import ToggleButton from "../ToggleButton/ToggleButton";
import Footer from "../Footer/Footer";
// import Header from "../Header/Header";
// import { links } from "../../constants/links.js";

const AddMedicine = () => {
  // const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const dropdownRef = useRef(null);

  // const toggleSidebar = () => {
  //   setIsSidebarVisible(!isSidebarVisible);
  // };

  // const toggleDropdown = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  return (
    <>
      {/* <ToggleButton
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />

      <Sidebar logo={logo} links={links} isSidebarVisible={isSidebarVisible} />

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
      /> */}

      <Footer />
    </>
  );
};

export default AddMedicine;
