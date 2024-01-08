import {
  Sidebar,
  ToggleButton,
  Header,
  Footer,
  Button,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";
// import { useNavigate } from "react-router-dom";

import { links } from "../../constants/links.js";
// import { companyNames } from "../../constants/companyNames.js";
import dummyData from "../../constants/dummyData.js";
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

  const totalSum = dummyData
  .reduce((acc, item) => acc + parseFloat(item.totalCost), 0)
  .toFixed(2);

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
            heading={"Order Report"}
          />
          <div className="order-report__content">
            <div className="order-report__order-details">
              <div className="order-report__order-details__heading">
                <h2>Order Details</h2>
                <hr />
              </div>
              <div className="order-report__order-details__content">
                <table>
                  <tbody>
                    <tr>
                      <td>Order ID</td>
                      <td>106</td>
                      <td>Order Date</td>
                      <td>11 Oct 2021 01:13 AM</td>
                    </tr>
                    <tr>
                      <td>Customer Name</td>
                      <td>Jay Kumar</td>
                      <td>Customer Mobile</td>
                      <td>84359834509</td>
                    </tr>
                    <tr>
                      <td>Order Status</td>
                      <td>Paid</td>
                      <td>Total Amount</td>
                      <td>3500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="order-report__order-items">
              <div className="order-report__order-items__heading">
                <h2>Order Items</h2>
                <hr />
              </div>
              <div className="order-report__order-items__content">
              <table>
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Total Units</th>
                      <th>Cost Per Unit</th>
                      <th>Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.productName}</td>
                        <td>{item.totalUnits}</td>
                        <td>{item.pricePerUnit}</td>
                        <td>{item.totalCost}</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="4">Total</td>
                      <td>{totalSum}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="order-report__button">
              {/* Add an invoice component and pass the data into it */}
              <Button name="Print Invoice" type="submit" />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OrderReport;
