import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";

import OrderTable from "../../components/OrderTable/OrderTable.jsx";

import { links } from "../../constants/links.js";
import orders from "../../constants/orders.js";
import logo from "../../assets/logo.png";
import "./OrderReport.scss";

const OrderReport = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  return (
    <>
      <div className="order-report">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />

        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />

        <main className="order-report__main">
          <div className="order-report__main__header">
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
          </div>
          <div className="order-report__content">
            <OrderTable orders={orders} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OrderReport;
