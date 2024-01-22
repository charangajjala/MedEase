import "./OrderPage.scss";
import userEndpoints from "../../constants/userEndpoints";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [orders, setOrders] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosPrivate.get(userEndpoints.GET_ORDERS);
        const data = await response.data;
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatedOrderDate = (date) => {
    const formatedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formatedDate;
  };

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
                  <button>View Details</button>
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
