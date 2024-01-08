import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  ReportTable,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

import { links } from "../../constants/links.js";
import products from "../../constants/products.js";
import logo from "../../assets/logo.png";
import "./ProductReports.scss";
import { useNavigate } from 'react-router-dom';

const columnHeaders = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "cost", label: "Cost" },
];

const ProductReports = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/reportExt");
  };

  return (
    <>
      <div className="product-reports">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="product-reports__main">
          <div className="product-reports__main__header">
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
              heading={"Product Reports"}
            />
          </div>

          <div className="product-reports__main__content">
            <ReportTable
              columnHeaders={columnHeaders}
              data={products}
              renderRowActions={() => (
                <button className="action-button view" onClick={handleClick}>View</button>
              )}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductReports;
