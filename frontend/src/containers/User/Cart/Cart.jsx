import "./Cart.scss";
import { Header, Navbar, Footer, CartItem } from "../../../userComponents";
// import cartItems from "../../../constants/cartItems";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import endpoints from "../../../constants/endpoints";

const Cart = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [cartItems, setCartItems] = useState([]);

  const handleCheckout = () => {
    // navigate("/checkout");
    console.log("Checkout");
  };

  const handleContinueShopping = () => {
    navigate("/dashboard");
  };

  const totalCost = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * item.cartProduct.costPerMonth;
    }, 0);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axiosPrivate.get(endpoints.GET_CART_URL);
        const data = response.data;
        setCartItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cart">
      <div className="cart__header">
        <Header />
      </div>

      <div className="cart__navbar">
        <Navbar />
      </div>

      <main className="cart__main">
        <div className="cart__content-left">
          <div className="cart__content-left__header">
            <h2>
              Shopping Cart <hr />
            </h2>
          </div>
          <div className="cart__content-left__items">
            <div className="cart__content-left__items-header"></div>
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
          <div className="cart__content-left__buttons">
            <Button name="Remove All" />
          </div>
        </div>

        <div className="cart__content-right">
          <div className="cart__content-right__summary">
            <h2>
              Summary <hr />
            </h2>
            <div className="cart__content-right__summary__subtotal">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>$ 100</span>
            </div>
            <div className="cart__content-right__summary__discount">
              <span>Discount offered</span>
              <p>- $ 20</p>
            </div>
            <div className="cart__content-right__summary__total">
              <span>Total ({cartItems.length} items)</span>
              <span>$ {totalCost()}</span>
            </div>
            <div className="cart__content-right__summary__checkout">
              <Button name="Checkout" onClick={handleCheckout} />
              <Button
                name="Continue Shopping"
                onClick={handleContinueShopping}
              />
            </div>
          </div>
          <div className="cart__content-right__others">
            {/* add this if necessary else just leave it */}
          </div>
        </div>
      </main>
      <div className="cart__footer">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
