import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  ReportTable,
} from "../../../components/index.js";
import { useNavigate } from "react-router-dom";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import { links } from "../../../constants/links.js";
import orders from "../../../constants/orders.js";
import logo from "../../../assets/logo.png";
import "./OrderReports.scss";

const columnHeaders = [
  {
    key: "orderId",
    label: "ID",
  },
  {
    key: "customerName",
    label: "Customer Name",
  },
  {
    key: "customerMobile",
    label: "Mobile",
  },
  {
    key: "totalSum",
    label: "Total Amount",
  },
  {
    key: "orderDate",
    label: "Date",
  },
];

const OrderReports = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const navigate = useNavigate();
  const handleViewClick = (order) => {
    navigate("/admin/reportExt", { state: { order } });
  };

  return (
    <>
      <div className="order-reports">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="order-reports__main">
          <div className="order-reports__main__header">
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
              heading={"All Orders Reports"}
            />
          </div>
          <div className="order-reports__content">
            <ReportTable
              data={orders}
              columnHeaders={columnHeaders}
              renderRowActions={(order) => (
                <button
                  className="action-button view"
                  onClick={() => handleViewClick(order)}
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

export default OrderReports;
