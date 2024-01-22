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
            <p>This is the content</p>
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
