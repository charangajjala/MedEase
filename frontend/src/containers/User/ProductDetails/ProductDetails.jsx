import { useLocation } from "react-router-dom";
import "./ProductDetails.scss";
import { Header, Footer, Navbar } from "../../../userComponents";
import moov from '../../../assets/moov.jpg';

const Productdetails = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  return (
    <div className="product-page">
      <header className="product-page__header">
        <Header />
      </header>
      <nav className="product-page__navbar">
        <Navbar />
      </nav>
      <main className="product-page__main">
        <div className="product-page__container">
          <div className="product-page__image-container">
            <img
              src={moov}
              alt="product"
              className="product-page__image"
            />
          </div>
          <div className="product-page__details">
            <h1 className="product-page__title">Product Title</h1>
            <h2 className="product-page__price">$200</h2>
            <p className="product-page__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              voluptatum, quibusdam, nemo, voluptatibus quidem quos voluptates
              consequatur quae doloribus voluptas quas atque asperiores.
              Quisquam, voluptate. Quas, voluptatum. Quisquam, voluptate.
            </p>
            <div className="product-page__additional-info">
              <h3 className="product-page__subtitle">Active Ingredients</h3>
              <ul className="product-page__ingredients-list">
                <li>Ingredient A</li>
                <li>Ingredient B</li>
                <li>Ingredient C</li>
              </ul>
              <h3 className="product-page__subtitle">Usage Instructions</h3>
              <p>
                Apply a small amount to the affected area up to 3 times daily.
              </p>
              <h3 className="product-page__subtitle">Warnings</h3>
              <p>Do not use on broken skin. Avoid contact with eyes.</p>
              <h3 className="product-page__subtitle">Reviews</h3>
              <div className="product-page__reviews">
                {/* Reviews could be a list or a component displaying them */}
              </div>
            </div>
            <div className="product-page__actions">
              <button className="product-page__add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="product-page__footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Productdetails;
