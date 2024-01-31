import "./OrderPage.scss";
import userEndpoints from "../../constants/userEndpoints";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const loading =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/loader.svg";
const noorders =
  "https://medeaseportal-bucket.s3.us-east-2.amazonaws.com/assets/no-orders.svg";

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
    // navigate("/profile/orderDetails", { state: { order } });
    navigate("/profile/orderDetails/{id}".replace("{id}", order.id));
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
        {orders?.length > 0 ? (
          <>
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
          </>
        ) : (
          <div className="no-orders">
            <div className="no-orders__img">
              <img src={noorders} alt="No Orders" />
            </div>
            <div className="no-orders__context">
              <h2>You have no orders.</h2>
            </div>
            <div className="no-orders__buttons">
              <button onClick={() => navigate("/")}>Shop Now</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderPage;
