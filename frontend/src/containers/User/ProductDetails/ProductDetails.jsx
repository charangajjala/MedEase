import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.scss";
import { Header, Footer, Navbar, LoginBox } from "../../../userComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faShareAlt as fasShareAlt } from "@fortawesome/free-solid-svg-icons";

import moov from "../../../assets/moov.jpg";
import moov2 from "../../../assets/moov2.jpg";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import endpoints from "../../../constants/endpoints";
import { useReducer } from "react";
import useCart from "../../../context/CartContext";
import AuthContext from "../../../context/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const inititalState = {
  quantity: 1,
  pincode: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_QUANTITY":
      return {
        ...state,
        quantity: action.payload,
      };
    case "SET_PINCODE":
      return {
        ...state,
        pincode: action.payload,
      };
    default:
      return state;
  }
};

const Productdetails = () => {
  const { id } = useParams();
  const [mainImage, setMainImage] = useState(moov);
  const [isFavorite, setIsFavorite] = useState(false);
  // const [cartCount, setCartCount] = useState(0);
  const { cartCount, updateCartCount } = useCart();
  const [showLoginBox, setShowLoginBox] = useState(false);
  // const [addedToCart, setAddedToCart] = useState(false);
  const [state, dispatch] = useReducer(reducer, inititalState);
  const imageGallery = [moov, moov2, moov, moov2, moov];
  const [data, setData] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  // const isAuthenticated = () => {
  //   const auth = JSON.parse(localStorage.getItem("auth"));
  //   return auth && auth.accessToken;
  // };

  useEffect(() => {
    const fetchCartLength = async () => {
      if (auth?.accessToken) {
        try {
          const response = await axiosPrivate.get(endpoints.GET_CART_URL);
          const data = await response.data;
          const totalQuantity = data.reduce((acc, item) => {
            return acc + item.quantity;
          }, 0);
          updateCartCount(totalQuantity);
        } catch (err) {
          console.error(err);
        }
      } else {
        updateCartCount(0);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await axiosPrivate.get(
          endpoints.GET_PRODUCT_URL.replace("{id}", id)
        );
        const data = await response.data;
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCartLength();
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Login Functionality
  const promptLogin = () => {
    setShowLoginBox(true);
  };

  const handleLoginSucess = () => {
    setShowLoginBox(false);
    console.log("Login Success");
  };

  const toggleLoginModal = () => {
    setShowLoginBox(!showLoginBox);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (isFavorite === false) {
      toast.success("Added to your wishlist");
    } else {
      toast.success("Removed from your wishlist");
    }
  };

  const handleAddToCart = async () => {
    const { id, costPerMonth } = data;
    const { quantity } = state;
    if (auth?.accessToken) {
      try {
        await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
          medicineId: id,
          quantity,
          costPerMonth,
        });
        // setAddedToCart(true);
        updateCartCount(cartCount + quantity);
        toast.success("Added to cart!");
        // setTimeout(() => setAddedToCart(false), 3000);
      } catch (err) {
        console.error(err);
        toast.error("Error adding to cart");
      }
    } else {
      promptLogin();
    }
  };

  const handleBuyNow = async () => {
    const { id, costPerMonth } = data;
    const { quantity } = state;
    if (auth?.accessToken) {
      try {
        await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
          medicineId: id,
          quantity,
          costPerMonth,
        });
        // Response Ideality 200 or 201
        // setAddedToCart(true);
        updateCartCount(cartCount + quantity);
        navigate("/checkout");
      } catch (err) {
        console.error(err);
      }
    } else {
      promptLogin();
    }
  };

  return (
    <>
      {showLoginBox && (
        <div className="dashboard-blur">
          <LoginBox
            onClose={toggleLoginModal}
            onLogin={handleLoginSucess}
            show={showLoginBox}
          />
        </div>
      )}
      <div className="product-page">
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="product-page__header">
          <Header />
        </div>

        <div className="product-page__navbar">
          <Navbar cartCount={cartCount} />
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
                <div className="product-page__thumbnails">
                  <div className="product-page__thumbnails-container">
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
                    <button onClick={toggleFavorite}>
                      <FontAwesomeIcon
                        icon={faHeart}
                        color={isFavorite ? "red" : "white"}
                      />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={fasShareAlt} />
                    </button>
                  </div>
                </div>

                <div className="product-page__meta">
                  <div className="stock-status">
                    <p className="product__stock">In stock</p>
                    <h5 className="product__location">Location of the Stock</h5>
                  </div>

                  <div className="stock-details">
                    <h3 className="product__price">${data.costPerMonth}</h3>
                    {/* <h5 className="product__mrp">${data.costPerMonth}</h5> */}
                    {/* <h5 className="product__discount">50% off</h5> */}
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
                      <p className="product__quantity-label">Quantity</p>
                      <select
                        className="product__quantity-selector"
                        onChange={(e) => {
                          dispatch({
                            type: "SET_QUANTITY",
                            payload: Number(e.target.value),
                          });
                        }}
                      >
                        {Array.from({ length: 5 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="product-page__cart-location">
                      {/* <div className="location_selector">
                        <p className="product__pincode-label">Pincode</p>
                        <input
                          className="product__pincode-input"
                          type="number"
                          placeholder="Enter your pincode"
                          value={state.pincode}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_PINCODE",
                              payload: e.target.value,
                            });
                          }}
                          required
                        />
                      </div> */}
                    </div>
                  </div>

                  {/* {addedToCart && (
                    <div className="add-to-cart-notification">
                      Product added to cart!
                    </div>
                  )} */}

                  <div className="product-page__cart-buttons">
                    <button
                      className="product__cart-button"
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </button>
                    <button
                      className="product__cart-button"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-page__grid-2">
            <div className="product-page__seller">
              <h3 className="product__seller-title">Seller Details</h3>
              <div className="seller-details-table">
                <div className="seller-row">
                  <div className="seller-key">Name</div>
                  <div className="seller-value">John Doe Electronics</div>
                </div>
                <div className="seller-row">
                  <div className="seller-key">Location</div>
                  <div className="seller-value">
                    123 Tech Drive, Silicon Valley, CA
                  </div>
                </div>
                <div className="seller-row">
                  <div className="seller-key">Experience</div>
                  <div className="seller-value">
                    10 years in electronics retail
                  </div>
                </div>
                <div className="seller-row">
                  <div className="seller-key">Specialty</div>
                  <div className="seller-value">
                    High-end audio and video equipment
                  </div>
                </div>
                <div className="seller-row">
                  <div className="seller-key">Contact</div>
                  <div className="seller-value">
                    john.doe@jdelectronics.com | +1 234 567 890
                  </div>
                </div>
                <div className="seller-row">
                  <div className="seller-key">Ratings</div>
                  <div className="seller-value">
                    4.8/5 (Based on 320 reviews)
                  </div>
                </div>
                <div className="seller-row">
                  <div className="seller-key">Shipping Policy</div>
                  <div className="seller-value">
                    2-3 business days for domestic, 5-7 days for international
                  </div>
                </div>
              </div>
            </div>

            <div className="product-page__seller__products">
              <h3 className="product__seller-title">Seller Products</h3>
              <ul className="product-list">
                <li>Ultra HD 4K Smart TV - 55 inches</li>
                <li>Wireless Noise-Cancelling Headphones</li>
                <li>Portable Bluetooth Speaker - Waterproof</li>
                <li>Latest Gaming Console - 1TB</li>
                <li>High-Speed HDMI Cable - 10ft</li>
                <li>Smartphone with High-Resolution Camera - 128GB</li>
                <li>Professional Grade Laptop - 16GB RAM</li>
                <li>Tablet with Stylus - 64GB</li>
                <li>VR Headset with Room-Scale Tracking</li>
                <li>Wireless Charging Pad - Fast Charge</li>
              </ul>
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
