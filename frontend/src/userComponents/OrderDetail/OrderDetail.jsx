import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetail.scss";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import userEndpoints from "../../constants/userEndpoints";

userEndpoints;

const OrderDetail = () => {
  const location = useLocation();
  const { order } = location.state;
  const axiosPrivate = useAxiosPrivate();
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();

  const { id } = order;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosPrivate.get(
          userEndpoints.GET_ORDER.replace("{id}", id)
        );
        const data = await response.data;
        setOrderDetails(data);
        setProducts(data.products);
        setAddress(data.address);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(orderDetails);

  const formatOrderDate = (date) => {
    const orderDate = new Date(date);
    return orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleClose = () => {
    navigate("/profile/orders");
  };

  return (
    <div className="order-detail">
      <h2>Order Details</h2>
      <div className="order-header">
        <span>Order ID: {order.id}</span>
        <span>Order Date: {formatOrderDate(order.orderDate)}</span>
        <span>Total Amount: ${order.totalAmount}</span>
      </div>
      <div className="order-address">
        <h3>Shipping Address</h3>
        <p>{address.addressLine1}</p>
        <p>{address?.addressLine2}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>
          {address.country} - {address.pincode}
        </p>
      </div>
      <div className="order-products">
        <h3>Products</h3>
        {products.map((product) => (
          <div key={product.id} className="product">
            <span>{product.cartProduct.productTitle}</span>
            <span>Quantity: {product.quantity}</span>
            <span>Price: ${product.totalCost}</span>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            navigate("/invoice", {
              state: {
                order,
                orders: products,
                totalSum: order.totalAmount,
                address,
              },
            });
          }}
        >
          Print
        </button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderDetail;
