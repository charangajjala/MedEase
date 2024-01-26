import {
  Sidebar,
  Header,
  ToggleButton,
  Footer,
  CompanyForm,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";
import { Toaster } from "react-hot-toast";

import { links } from "../../../constants/links.js";

import logo from "../../../assets/logo.png";
import "./AddCompany.scss";

const AddCompany = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  return (
    <>
      <div className="add-company-form">
        <Toaster position="bottom-right" reverseOrder={false} />
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          toggleDropdown={toggleDropdown}
          isDropdownOpen={isDropdownOpen}
          dropdownRef={dropdownRef}
          links={links}
          logo={logo}
        />
        <main className="add-company-form__main">
          <div className="add-company-form__main__header">
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
              heading={"Add New Company"}
            />
          </div>

          <div className="add-company-form__content">
            <CompanyForm method={"Add"} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AddCompany;
