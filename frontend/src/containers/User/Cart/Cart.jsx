import "./Cart.scss";
import { Header, Footer } from "../../../userComponents";
import cartItems from "../../../constants/cartItems";
import image from "../../../assets/moov.jpg";

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
              <div key={index} className="cart__content-left__items__item">
                <div className="cart__content-left__items__item__image">
                  <img src={image} alt="product" />
                </div>
                <div className="cart__content-left__items__item__details">
                  <h3>{item.product.productName}</h3>
                  <h3>{item.product.pricePerUnit}</h3>
                  <h3>{item.product.totalUnits}</h3>
                  <h3>{item.totalCost}</h3>
                </div>
              </div>
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
