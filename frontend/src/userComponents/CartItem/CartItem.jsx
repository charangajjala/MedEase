import PropTypes from "prop-types";
import image from "../../assets/moov.jpg";
import "./CartItem.scss";
import { Button } from "../../components";

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <img src={image} alt={item.product.productName} />
      </div>
      <div className="cart-item__details">
        <h3 className="title">{item.product.productName}</h3>
        <p className="meta">Company Name</p>
        <p className="meta">In stock</p>
        <p className="price">${item.product.pricePerUnit}</p>
        <div className="quantity-container">
          <div className="quantity-div">
            <p className="quantity-label">Qty</p>
            <select className="quantity-selector">
              <option value="{item.quantity}">{item.quantity}</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <Button className="remove-button" name="Remove" />
          <Button className="save-button" name="Save for later" />
        </div>
      </div>
      <div className="cart-item__price-container">
        <p className="sale-price">${item.totalCost}</p>
        <p className="original-price">${item.mrp}</p>
        <p className="discount-tag">20% off</p>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      productName: PropTypes.string.isRequired,
      pricePerUnit: PropTypes.string.isRequired,
      totalUnits: PropTypes.number.isRequired,
    }).isRequired,
    mrp: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    totalCost: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;
