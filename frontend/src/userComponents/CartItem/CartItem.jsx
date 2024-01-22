import PropTypes from "prop-types";
import image from "../../assets/moov.jpg";
import "./CartItem.scss";
import { Button } from "../../components";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import endpoints from "../../constants/endpoints";
import { useReducer } from "react";
import useAnimatedNumber from "../../hooks/useAnimatedNumber";

const initialState = {
  quantity: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUANTITY":
      return { ...state, quantity: action.payload };
    default:
      throw new Error();
  }
}

const CartItem = ({ item, onQuantityChange, disabled }) => {
  const axiosPrivate = useAxiosPrivate();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    quantity: item.quantity,
  });

  const isAuthenticated = () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth && auth.accessToken;
  };

  const handleQuantityChange = async (e) => {
    const newQuantity = Number(e.target.value);
    dispatch({ type: "SET_QUANTITY", payload: newQuantity });
    console.log(item)
    try {
      if (isAuthenticated()) {
        const response = await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
          medicineId: item.cartProduct.id,
          quantity: newQuantity,
          costPerMonth: item.cartProduct.costPerMonth,
        });
        const data = response.data;
        console.log(data);
        onQuantityChange(item.id, newQuantity);
      }
    } catch (err) {
      console.log("Error in handleQuantityChange:", err);
    }
  };

  const totalValue = item.cartProduct.costPerMonth * item.quantity;
  const animatedTotalValue = useAnimatedNumber(totalValue);

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
              value={state.quantity}
              disabled={disabled}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <option key={index} value={index}>
                  {index}
                </option>
              ))}
            </select>
          </div>
          <Button className="remove-button" name="Remove" />
          <Button className="save-button" name="Save for later" />
        </div>
      </div>
      <div className="cart-item__price-container">
        <p className="sale-price">${animatedTotalValue}</p>
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
      id: PropTypes.number.isRequired,
      productTitle: PropTypes.string.isRequired,
      costPerMonth: PropTypes.number.isRequired,
      totalStock: PropTypes.number.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  onQuantityChange: PropTypes.func,
};

export default CartItem;
