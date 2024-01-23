import {
  Sidebar,
  ToggleButton,
  Header,
  Footer,
  Button,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";

import { links } from "../../../constants/links.js";
import logo from "../../../assets/logo.png";

import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";

import "./OrderReport.scss";
import { useNavigate } from "react-router-dom";
import endpoints from "../../../constants/endpoints.js";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";

const OrderReport = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const [orderDetails, setOrderDetails] = useState([]);
  const location = useLocation();
  const tableRef = useRef();
  const { order } = location.state;
  const { username, orderDate, id, totalAmount } = order;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosPrivate.get(
          endpoints.GET_ADMIN_ORDER_URL.replace("{id}", id)
        );
        const data = await response.data;
        console.log(data);
        setOrderDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="order-report__content" ref={tableRef}>
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
                      <td>{id}</td>
                      <td>Order Date</td>
                      <td>{orderDate}</td>
                    </tr>
                    <tr>
                      <td>Customer Name</td>
                      <td>{username}</td>
                      <td>Customer Mobile</td>
                      <td>9121042757</td>
                    </tr>
                    <tr>
                      <td>Order Status</td>
                      <td>Paid</td>
                      <td>Total Amount</td>
                      <td>{totalAmount}</td>
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
                    {orderDetails.products.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.cartItem.productTitle}</td>
                        <td>{item.quantity}</td>
                        <td>{item.cartItem.costPerMonth}</td>
                        <td>{item.totalCost}</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="4">Total</td>
                      <td>{totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="order-report__button">
            <Button
              name="Download Invoice"
              type="submit"
              onClick={() => {
                navigate("/admin/invoice", {
                  state: { order, orderDetails, totalAmount },
                });
              }}
            />
            <Button
              name="Back to Orders"
              onClick={() => {
                navigate("/admin/report");
              }}
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default OrderReport;
