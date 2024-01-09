import './Invoice.scss';
import PropTypes from 'prop-types';
import invoice_logo from '../../assets/invoice_logo.png';

const Invoice = ({ activeOrderData }) => {
  const { customerName, orderDate, totalAmount, items } = activeOrderData;

  return (
    <div className="invoice-container">
      <div className="invoice-container__header">
        <h1>Invoice</h1>
        <img src={invoice_logo} alt="logo"  />
      </div>
      <div className="customer-info">
        <p><strong>Customer Name:</strong> {customerName}</p>
        <p><strong>Order Date:</strong> {orderDate}</p>
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
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>${item.pricePerUnit}</td>
                <td>{item.totalUnits}</td>
                <td>${item.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="total-amount">
        <p><strong>Total Amount:</strong> ${totalAmount}</p>
      </div>
    </div>
  );
}

Invoice.propTypes = {
  activeOrderData: PropTypes.object.isRequired,
};

export default Invoice;
