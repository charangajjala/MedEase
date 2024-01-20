import { useLocation } from "react-router-dom";
import "./ProductDetails.scss";
import { Header, Footer, Navbar } from "../../../userComponents";
import moov from "../../../assets/moov.jpg";
import moov2 from "../../../assets/moov2.jpg";
import { useState } from "react";

const Productdetails = () => {
  const location = useLocation();
  const [mainImage, setMainImage] = useState(moov);
  const data = location.state.data;
  console.log(data);

  const imageGallery = [moov, moov2, moov, moov, moov];

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
          <div className="grid-container">
            <div className="product-page__grid">
              {/* grid-column 1 */}
              {/* <div className="product-page__image">
                <img src={moov} alt="product_image" />
              </div> */}

              <div className="product-page__image">
                <div className="product-page__main-image">
                  <img src={mainImage} alt="Main Product" />
                </div>
                <div className="product-page__thumbnail-container">
                  {imageGallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Thumbnail ${index + 1}`}
                      onClick={() => setMainImage(image)}
                      className="product-page__thumbnail"
                    />
                  ))}
                </div>
              </div>

              {/* grid-column 2 */}
              <div className="product-page__container">
                <div className="product-page__details">
                  <div className="product-page__details-left">
                    <h5 className="product__company">{data.companyName}</h5>
                    <h1 className="product__title">{data.productTitle}</h1>
                    <p className="product__seller">Seller</p>
                  </div>
                  <div className="product-page__details-right">
                    <button>Like</button>
                    <button>Share</button>
                  </div>
                </div>

                <div className="product-page__meta">
                  <div className="stock-status">
                    <p className="product__stock">In stock</p>
                    <h5 className="product__location">Location of the Stock</h5>
                  </div>

                  <div className="stock-details">
                    <h3 className="product__price">${data.costPerMonth}</h3>
                    <h5 className="product__mrp">${data.costPerMonth}</h5>
                    <h5 className="product__discount">50% off</h5>
                  </div>
                </div>

                <div className="product-page__description">
                  <h3 className="product__description-title">Description</h3>
                  <p className="product__description-text">
                    {data.description}
                  </p>
                  <table className="product__description-table">
                    <tbody>
                      <tr>
                        <th>Manufacture Date</th>
                        <td>{data.manufactureDate}</td>
                      </tr>
                      <tr>
                        <th>Expiry Date</th>
                        <td>{data.expiryDate}</td>
                      </tr>
                    </tbody>
                  </table>
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
                    <div className="quantity_selector">
                      <p className="product__quantity-label">Qty</p>
                      <select className="product__quantity-selector">
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                    <div className="product-page__cart-location">
                      <div className="location_selector">
                        <p className="product__pincode-label">Pincode</p>
                        <input
                          className="product__pincode-input"
                          type="number"
                          placeholder="Enter your pincode"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="product-page__cart-buttons">
                    <button className="product__cart-button">
                      Add to cart
                    </button>
                    <button className="product__cart-button">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-page__grid-2">
            <div className="product-page__seller">
              <h3 className="product__seller-title">Seller Details</h3>
              <p className="product__seller-text">Seller details Go Here</p>
            </div>
            <div className="product-page__seller__products">
              <h3 className="product__seller-title">Seller Products</h3>
              <p className="product__seller-text">Seller Products Go Here</p>
            </div>
          </div>

          {/* <div className="product-page__reviews">
            <h3 className="product__reviews-title">Reviews</h3>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="product__review-item">
                <div className="product__review-stars">★★★★☆</div>
                <p className="product__reviews-text">
                  The product is excellent, and I love using it!
                </p>
              </div>
            ))}
          </div> */}
        </main>
      </div>
      <div className="proudct-page__footer">
        <Footer />
      </div>
    </>
  );
};

export default Productdetails;
