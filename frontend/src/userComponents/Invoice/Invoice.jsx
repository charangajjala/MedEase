import "./Invoice.scss";
import PropTypes from "prop-types";
import invoice_logo from "../../assets/invoice_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Invoice = () => {
  console.log("Invoice");
  const location = useLocation();
  const navigate = useNavigate();
  const { order, orders, totalSum, address } = location.state;

  useEffect(() => {
    window.print();

    return () => {
      navigate("/profile/orders");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatOrderDate = (date) => {
    const orderDate = new Date(date);
    return orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="invoice-container">
      <div className="invoice-container__header">
        <h1>Invoice</h1>
        <img src={invoice_logo} alt="logo" />
      </div>
      <div className="customer-info">
        <div className="customer-info__left">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Username :</strong> {order.username}
          </p>
          <p>
            <strong>Order Date:</strong> {formatOrderDate(order.orderDate)}
          </p>
        </div>
        <div className="customer-info__right">
          <p>
            <strong>Address:</strong> {address?.addressLine1}
            {address?.addressLine2}, {address?.city}, {address?.state},{" "}
            {address?.pincode}
          </p>
        </div>
      </div>
      <div className="order-details">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price Per Unit</th>
              <th>Total Units</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item) => (
              <tr key={item.id}>
                <td>{item.cartProduct.productTitle}</td>
                <td>${item.cartProduct.costPerMonth}</td>
                <td>{item.quantity}</td>
                <td>${item.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-amount">
        <p>
          <strong>Total Amount:</strong> ${totalSum}
        </p>
      </div>
    </div>
  );
};

Invoice.propTypes = {
  activeOrderData: PropTypes.object.isRequired,
};

export default Invoice;
