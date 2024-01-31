import {
  Sidebar,
  ToggleButton,
  Header,
  Footer,
  ReportTable,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import { links } from "../../../constants/links.js";
import { useEffect, useState } from "react";
import endpoints from "../../../constants/endpoints.js";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import "./SellerReports.scss";
import { useNavigate } from "react-router-dom";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const columnHeaders = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Mobile",
  },
];

const SellerReports = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();
  const axiosPrivate = useAxiosPrivate();
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.GET_SELLERS_URL);
        const data = await response.data;
        setSellers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewClick = (seller) => {
    navigate("/admin/seller/" + seller.id);
  };

  return (
    <>
      <div className="seller-report">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="seller-report__main">
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
            heading={"Seller Report"}
          />
          <div className="seller-report__content">
            <ReportTable
              data={sellers}
              columnHeaders={columnHeaders}
              renderRowActions={(seller) => (
                <button
                  className="action-button view"
                  onClick={() => handleViewClick(seller)}
                >
                  View
                </button>
              )}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SellerReports;
