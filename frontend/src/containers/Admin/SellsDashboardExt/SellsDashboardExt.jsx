import {
  Sidebar,
  ToggleButton,
  Header,
  Footer,
  Button,
  SelectField,
  FormInput,
} from "../../../components/index.js";
import useVisibilityToggle from "../../../hooks/useVisibilityToggle.jsx";
import { useLocation, useNavigate } from "react-router-dom";

import { links } from "../../../constants/links.js";
import endpoints from "../../../constants/endpoints.js";
import logo from "../../../assets/logo.png";

import "./SellsDashboardExt.scss";
import { useEffect, useReducer } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate.jsx";
import { useState } from "react";

const initalState = {
  id: "",
  totalUnits: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_TOTAL_UNITS":
      return { ...state, totalUnits: action.payload };
    default:
      return state;
  }
}

const SellsDashboardExt = () => {
  const {
    isSidebarVisible,
    toggleSidebar,
    isDropdownOpen,
    toggleDropdown,
    dropdownRef,
  } = useVisibilityToggle();

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const axiosPrivate = useAxiosPrivate();
  const [productTypes, setProductTypes] = useState([]);
  const [state, dispatch] = useReducer(reducer, initalState);
  const [orders, setOrders] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [products, setProducts] = useState([]);
  const [orderId] = useState(Math.floor(Math.random() * 1000));

  const now = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const orderDate = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.get(
        endpoints.GET_ONE_MEDICINE_URL.replace("{id}", state.id)
      );
      const productDetails = response.data;

      const existingOrderIndex = orders.findIndex(
        (order) => order.id === state.id
      );

      if (existingOrderIndex !== -1) {
        const updatedOrders = [...orders];
        updatedOrders[existingOrderIndex] = {
          ...updatedOrders[existingOrderIndex],
          totalUnits:
            Number(updatedOrders[existingOrderIndex].totalUnits) +
            Number(state.totalUnits),
          totalCost:
            (Number(updatedOrders[existingOrderIndex].totalUnits) +
              Number(state.totalUnits)) *
            productDetails.costPerMonth,
        };
        setOrders(updatedOrders);
      } else {
        setOrders([
          ...orders,
          {
            id: state.id,
            totalUnits: state.totalUnits,
            productName: productDetails.productTitle,
            pricePerUnit: productDetails.costPerMonth,
            totalCost: state.totalUnits * productDetails.costPerMonth,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleDelete = (id) => {
    const updatedOrder = orders.filter((item) => item.id !== id);
    setOrders(updatedOrder);
  };

  const handleNumChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && Number(value) >= 0) {
      dispatch({
        type: "SET_TOTAL_UNITS",
        payload: value,
      });
    } else {
      console.log("Please enter a valid quantity");
    }
  };

  useEffect(() => {
    const totalSum = orders
      .reduce((acc, item) => acc + parseFloat(item.totalCost), 0)
      .toFixed(2);
    setTotalSum(totalSum);
    console.log(totalSum);
  }, [orders]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      const response = await axiosPrivate.get(endpoints.PRODUCT_REPORTS_URL);
      const formatProductTypes = response.data.map((item) => {
        return { value: item.id.toString(), label: item.name };
      });
      setProductTypes(formatProductTypes);
      setProducts(response.data);
    };

    fetchProductTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    const sellPayload = {
      orderId: orderId,
      orderDate: orderDate,
      customerName: data.customerName,
      customerMobile: data.customerMobile,
      totalSum: totalSum,
      orders: orders,
    };

    console.log(sellPayload);
    navigate("/admin/reportExt", { state: { order: sellPayload } });
  };

  return (
    <>
      <div className="sells-dashboard-ext">
        <ToggleButton
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
        <Sidebar
          logo={logo}
          links={links}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="sells-dashboard-ext__main">
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
            heading={"Sells Dashboard"}
          />
          <div className="sells-dashboard-ext__content">
            <div className="sells-dashboard-ext__customer-details">
              <div className="sells-dashboard-ext__customer-details__header">
                <h2>Customer and Order Details</h2>
                <hr />
              </div>
              <div className="sells-dashboard-ext__customer-details__content">
                <table>
                  <tbody>
                    <tr>
                      <td>Order ID</td>
                      <td>{orderId}</td>
                      <td>Order Date</td>
                      <td>{orderDate}</td>
                    </tr>
                    <tr>
                      <td>Customer Name</td>
                      <td>{data?.customerName}</td>
                      <td>Customer Mobile</td>
                      <td>{data?.customerMobile}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="sells-dashboard-ext__cart-items">
              <div className="sells-dashboard-ext__cart-items__header">
                <h2>Add Items into Cart</h2>
                <hr />
              </div>
              <div className="sells-dashboard-ext__cart-items__content">
                <SelectField
                  label="Select Product"
                  id="product-type"
                  name="product-type"
                  options={productTypes}
                  onChange={(e) => {
                    products.forEach((item) => {
                      if (item.id === parseInt(e.target.value)) {
                        dispatch({
                          type: "SET_ID",
                          payload: item.id,
                        });
                      }
                    });
                  }}
                  required={true}
                />

                <FormInput
                  label="Enter Quantity"
                  type="number"
                  autoComplete="off"
                  id="enterQuantity"
                  name="enterQuantity"
                  required={true}
                  onChange={(e) => {
                    handleNumChange(e);
                  }}
                />

                <Button
                  name="Add to Cart"
                  type="submit"
                  onClick={(e) => handleAdd(e)}
                />
              </div>
            </div>
            <div className="sells-dashboard-ext__order-details">
              <div className="sells-dashboard-ext__order-details__header">
                <h2>Order Item Details</h2>
                <hr />
              </div>
              <div className="sells-dashboard-ext__order-details__content">
                <table>
                  <thead>
                    <tr>
                      <th>Product ID</th>
                      <th>Product Name</th>
                      <th>Price Per Unit</th>
                      <th>Total Units</th>
                      <th>Total Cost</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.productName}</td>
                        <td>{item.pricePerUnit}</td>
                        <td>{item.totalUnits}</td>
                        <td>{item.totalCost}</td>
                        <td>
                          <button onClick={() => handleDelete(item.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td colSpan="4">Total</td>
                      <td>{totalSum}</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {orders.length > 0 && (
              <div className="sells-dashboard-ext__submit-btn">
                <Button
                  name="Save Sell Details"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SellsDashboardExt;
