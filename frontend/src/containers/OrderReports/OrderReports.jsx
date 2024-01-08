import {
  Sidebar,
  ToggleButton,
  Footer,
  Header,
  OrderTable,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle.jsx";

import { links } from "../../constants/links.js";
import orders from "../../constants/orders.js";
import logo from "../../assets/logo.png";
import "./OrderReports.scss";

const OrderReports = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

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
              heading={"All Orders Report"}
            />
          </div>
          <div className="order-reports__content">
            <OrderTable orders={orders} />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OrderReports;
