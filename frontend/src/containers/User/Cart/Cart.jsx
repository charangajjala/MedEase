import "./Cart.scss";
import { Header, Footer, CartItem } from "../../../userComponents";
import cartItems from "../../../constants/cartItems";

const Cart = () => {
  return (
    <div className="cart">
      <div className="cart__header">
        <Header />
      </div>

      <main className="cart__main">
        <div className="cart__content-left">
          <div className="cart__content-left__header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="cart__content-left__items">
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="cart__content-right">
          <div className="cart__content-right__summary">
            <h2>Summary</h2>
          </div>
          <div className="cart__content-right__others">
            <h2>Other Items</h2>
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
