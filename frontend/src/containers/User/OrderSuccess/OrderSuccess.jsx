import "./OrderSucess.scss";
import orderSucess from "../../../assets/order_placed.gif";
import { Footer, Header, Navbar } from "../../../userComponents";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/dashboard");
  };

  const handleViewOrder = () => {
    navigate("/profile/orders");
  };

  return (
    <div className="order-success">
      <div className="order-success__header">
        <Header />
      </div>
      <div className="order-success__navbar">
        <Navbar />
      </div>
      <main className="order-success__main">
        <div className="order-success__content">
          <div className="order-success__gif">
            <img src={orderSucess} alt="Order Placed" />
            <h1>Order Placed Successfully!</h1>
          </div>
          <div className="order-success__buttons">
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleViewOrder}>View Order</button>
          </div>
        </div>
      </main>
      <div className="order-success__footer">
        <Footer />
      </div>
    </div>
  );
};

export default OrderSuccess;
