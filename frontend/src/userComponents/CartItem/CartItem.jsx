import PropTypes from "prop-types";
import image from "../../assets/moov.jpg";
import "./CartItem.scss";

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <img src={image} alt={item.product.productName} />
      </div>
      <div className="cart-item__details">
        <h3 className="title">{item.product.productName}</h3>
        <p className="meta">#1 Best Seller in Gaming Mice</p>{" "}
        <p className="meta">In stock</p>
        <p className="price">${item.product.pricePerUnit}</p>
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
