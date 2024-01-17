import { useLocation } from "react-router-dom";
import "./ProductDetails.scss";
import { Header, Footer, Navbar } from "../../../userComponents";
import moov from "../../../assets/moov.jpg";
import { FormInput } from "../../../components";

const Productdetails = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  return (
    <>
      <div className="product-page">
        <div className="product-page__header">
          <Header />
        </div>

        <div className="product-page__navbar">
          <Navbar />
        </div>

        <main className="product-page__main">
          <div className="product-page__grid">
            {/* grid-column 1 */}
            <div className="product-page__image">
              <img src={moov} alt="product_image" />
            </div>

            {/* grid-column 2 */}
            <div className="product-page__container">
              <div className="product-page__details">
                <div className="product-page__details-left">
                  <h5 className="product__company">Company Name</h5>
                  <h1 className="product__title">Moov</h1>
                  <p className="product__seller">Seller</p>
                </div>
                <div className="product-page__details-right">
                  <button>Like</button>
                  <button>Share</button>
                </div>
              </div>

              <div className="product-page__meta">
                <p className="product__stock">In stock</p>
                <p className="product__price">$100</p>
                <p className="product__mrp">$200</p>
                <p className="product__discount">50% off</p>
              </div>

              <div className="product-page__description">
                <h3 className="product__description-title">Description</h3>
                <p className="product__description-text">
                  Product description goes here
                </p>
                <div className="product-page__description__buttons">
                  <button>Buy Now</button>
                </div>
              </div>
            </div>

            {/* grid-column 3 */}
            <div className="product-page__cart">
              <div className="product-page__cart-offers">
                <h3 className="product__offers-title">Offers</h3>
                <p className="product__offers-text">Offers goes here</p>
              </div>
              
              <div className="product-page__cart-container">
                <div className="product-page__cart-quantity">
                  <p className="product__quantity-label">Qty</p>
                  <select className="product__quantity-selector">
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div className="product-page__cart-location">
                  <FormInput
                    type="number"
                    name="pincode"
                    label="Enter your pincode"
                    placeholder="Enter your pincode"
                    required
                  />
                </div>
                <button className="product__cart-button">Add to cart</button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="proudct-page__footer">
        <Footer />
      </div>
    </>
  );
};

export default Productdetails;
