import "./CartItem.scss";
import moov from "../../assets/moov.jpg";
import PropTypes from "prop-types";

const CartItem = ({item}) => {
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={moov} alt="product" />
      </div>
      <div className="cart-item__details">
        <h3>{item.product.productName}</h3>
        <h3>{item.product.pricePerUnit}</h3>
        <h3>{item.product.totalUnits}</h3>
        <h3>{item.quantity * item.product.pricePerUnit}</h3>
      </div>
    </div>
  )
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
