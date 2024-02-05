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
// import orders from "../../../constants/orders.js";
// import logo from "../../../assets/logo.png";
import "./OrderReports.scss";
import endpoints from "../../../constants/endpoints.js";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";

const logo =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/logo.png";

const columnHeaders = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "username",
    label: "Username",
  },
  // {
  //   key: "customerMobile",
  //   label: "Mobile",
  // },
  {
    key: "totalAmount",
    label: "Total Amount ($)",
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
  const [orders, setOrders] = useState([]);
  const handleViewClick = (order) => {
    navigate("/admin/reportExt", { state: { order } });
  };
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.ADMIN_ORDERS_URL);
        const data = response.data;
        console.log("The Orders Received are", data);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
