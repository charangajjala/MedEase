import Protypes from "prop-types";
import "./OrderTable.scss";

const OrderTable = ({ orders }) => {
  return (
    <div className="order-report-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Mobile</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.mobile}</td>
              <td>{order.totalAmount}</td>
              <td>{order.date}</td>
              <td>
                <button className="action-button">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrderTable.propTypes = {
  orders: Protypes.arrayOf(
    Protypes.shape({
      id: Protypes.number.isRequired,
      customerName: Protypes.string.isRequired,
      mobile: Protypes.string.isRequired,
      totalAmount: Protypes.number.isRequired,
      date: Protypes.string.isRequired,
    })
  ),
};

export default OrderTable;
