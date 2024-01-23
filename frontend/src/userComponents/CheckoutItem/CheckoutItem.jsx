import "./CheckoutItem.scss";
import moov from "../../assets/moov.jpg";

const CheckoutItem = () => {
  return (
    <div className="checkout-item">
      <div className="checkout-item__image">
        <img src={moov} alt="Product Image" />
      </div>
      <div className="checkout-item__details">
        <div className="checkout-item__details__name">
          <p>Product Name</p>
        </div>
        <div className="checkout-item__details__price">
          <p>Price</p>
        </div>
        <div className="checkout-item__details__quantity">
          <p>Quantity</p>
        </div>
        <div className="checkout-item__details__total">
          <p>Total</p>
        </div>
        <div className="checkout-item__details__instock">
          <p>In Stock</p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutItem;
