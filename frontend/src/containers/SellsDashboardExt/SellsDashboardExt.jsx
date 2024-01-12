import {
  Sidebar,
  ToggleButton,
  Header,
  Footer,
  Button,
  SelectField,
  FormInput,
} from "../../components/index.js";
import useVisibilityToggle from "../../hooks/useVisibilityToggle";
import { useLocation, useNavigate } from "react-router-dom";

import { links } from "../../constants/links.js";
import endpoints from "../../constants/endpoints.js";
import logo from "../../assets/logo.png";

import dummyData from "../../constants/dummyData.js";
import "./SellsDashboardExt.scss";
import { useEffect, useReducer } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";
import { useState } from "react";

// {dummyData.map((item) => (
//   <tr key={item.id}>
//     <td>{item.id}</td>
//     <td>{item.productName}</td>
//     <td>{item.pricePerUnit}</td>
//     <td>{item.totalUnits}</td>
//     <td>{item.totalCost}</td>
//     <td>
//       <button>Delete</button>
//     </td>
//   </tr>
// ))}

const initalState = {
  id: "",
  productName: "",
  pricePerUnit: "",
  totalUnits: "",
  totalCost: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ID":
      return { ...state, id: action.payload };
    case "SET_PRODUCT_NAME":
      return { ...state, productName: action.payload };
    case "SET_PRICE_PER_UNIT":
      return { ...state, pricePerUnit: action.payload };
    case "SET_TOTAL_UNITS":
      return { ...state, totalUnits: action.payload };
    case "SET_TOTAL_COST":
      return { ...state, totalCost: action.payload };
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
  const [orders, setOrders] = useState(dummyData);
  const [totalSum, setTotalSum] = useState(0);
  const [products, setProducts] = useState([]);

  // Need to modify this it just currently generates a random number
  const orderId = Math.floor(Math.random() * 1000);
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
  ).padStart(2, "0")}`;

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const handleDelete = (id) => {
    const updatedOrder = orders.filter((item) => item.id !== id);
    setOrders(updatedOrder);
  };

  const handleNumChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      dispatch({
        type: "SET_TOTAL_UNITS",
        payload: value,
      });
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
    // no the order types instead we need to fetch the product list
    const fetchProductTypes = async () => {
      const response = await axiosPrivate.get(endpoints.GET_CATERGORY_URL);
      const formatProductTypes = response.data.map((item) => {
        return { value: item.id.toString(), label: item.categoryName };
      });
      setProductTypes(formatProductTypes);
      setProducts(response.data);
    };

    fetchProductTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      console.log(item.id);
                      if (item.id === parseInt(e.target.value)) {
                        dispatch({
                          type: "SET_PRODUCT_NAME",
                          payload: item.productName,
                        });
                        dispatch({
                          type: "SET_PRICE_PER_UNIT",
                          payload: item.pricePerUnit,
                        });
                        dispatch({
                          type: "SET_ID",
                          payload: item.id,
                        });
                        dispatch({
                          type: "SET_TOTAL_COST",
                          payload: (
                            Number(item.pricePerUnit) * Number(state.totalUnits)
                          ).toString(),
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
                    navigate("/reportExt");
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
