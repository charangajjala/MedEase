import { Footer, Header } from "../../../userComponents";
import "./Checkout.scss";

const Checkout = () => {
  return (
    <>
      <div className="checkout-page">
        <div className="checkout-page__header">
          <Header />
        </div>

        <main className="checkout-page__main">
          <div className="checkout-page__content">
            <form className="checkout-form">
              <h2>Checkout</h2>
              
              <div className="form-section">
                <h3>Customer Information</h3>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email Address" />
              </div>

              <div className="form-section">
                <h3>Shipping Address</h3>
                <input type="text" placeholder="Street Address" />
                <input type="text" placeholder="City" />
                <input type="text" placeholder="State/Province" />
                <input type="text" placeholder="Postal Code" />
                <input type="text" placeholder="Country" />
              </div>

              <div className="form-section">
                <h3>Billing Details</h3>
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="Card Holder Name" />
                <input type="text" placeholder="Expiry Date" />
                <input type="text" placeholder="CVV" />
              </div>

              <button type="submit" className="submit-button">Place Order</button>
            </form>
          </div>
        </main>

        <div className="checkout-page__footer">
          <Footer />
        </div>
      </div>
    </>
  )
};

export default Checkout;
