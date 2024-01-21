import PropTypes from "prop-types";
import image from "../../assets/moov.jpg";
import "./CartItem.scss";
import { Button } from "../../components";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import endpoints from "../../constants/endpoints";

// [
//   {
//     "id": 1,
//     "cartProduct": {
//       "id": 2,
//       "productTitle": "Medicine 2",
//       "costPerMonth": 15,
//       "totalStock": 52
//     },
//     "quantity": 1,
//     "totalCost": 15
//   }
// ]

const CartItem = ({ item }) => {
  const axiosPrivate = useAxiosPrivate();

  const isAuthenticated = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && auth.accessToken;
  };

  const handleQuantityChange = async (e) => {
    try {
      if (isAuthenticated()) {
        const response = await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
          medicineId: item.id,
          quantity: e.target.value,
          costPerMonth: item.cartProduct.costPerMonth,
        });
        const data = response.data;
        console.log(data);
      }
    } catch (err) {
      console.log("Error in handleQuantityChange:", err);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item__image-container">
        <img src={image} alt={item.cartProduct.productTitle} />
      </div>
      <div className="cart-item__details">
        <h3 className="title">{item.cartProduct.productTitle}</h3>
        <p className="meta">Company Name</p>
        <p className="meta">In stock</p>
        <p className="price">${item.cartProduct.costPerMonth}</p>
        <div className="quantity-container">
          <div className="quantity-div">
            <p className="quantity-label">Qty</p>
            <select
              className="quantity-selector"
              onChange={(e) => handleQuantityChange(e)}
            >
              <option value={`${item.quantity}`}>{item.quantity}</option>
              <option value={`${item.quantity + 1}`}>
                {item.quantity + 1}
              </option>
              <option value={`${item.quantity + 2}`}>
                {item.quantity + 2}
              </option>
              <option value={`${item.quantity + 3}`}>
                {item.quantity + 3}
              </option>
            </select>
          </div>
          <Button className="remove-button" name="Remove" />
          <Button className="save-button" name="Save for later" />
        </div>
      </div>
      <div className="cart-item__price-container">
        <p className="sale-price">${item.cartProduct.costPerMonth * item.quantity}</p>
        {/* <p className="original-price">${item.cartProduct.costPerMonth}</p> */}
        {/* <p className="discount-tag">20% off</p> */}
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cartProduct: PropTypes.shape({
      productTitle: PropTypes.string.isRequired,
      costPerMonth: PropTypes.number.isRequired,
      totalStock: PropTypes.number.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
