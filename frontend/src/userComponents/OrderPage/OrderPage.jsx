import "./OrderPage.scss";
import userEndpoints from "../../constants/userEndpoints";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading from "../../assets/loader.svg";

const OrderPage = () => {
  const [orders, setOrders] = useState();
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOrdersLoading(true);
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get(userEndpoints.GET_ORDERS);
        const data = await response.data;
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsOrdersLoading(false);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleViewDetails = (order) => {
    navigate("/profile/orderDetails", { state: { order } });
  };

  const formatedOrderDate = (date) => {
    const formatedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formatedDate;
  };

  if (isOrdersLoading) {
    return (
      <div className="loading-page">
        <img src={loading} alt="Loading" />
        <p>Loading Orders...</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1>My Orders</h1>

      <section className="order-history">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Total</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{formatedOrderDate(order.orderDate)}</td>
                <td>{order.totalAmount}</td>
                <td>
                  <button onClick={() => handleViewDetails(order)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrderPage;
