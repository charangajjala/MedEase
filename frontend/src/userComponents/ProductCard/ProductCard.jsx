import { faReorder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moov from "../../assets/moov.jpg";
import "./ProductCard.scss";

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="product-card__like">
        <FontAwesomeIcon icon={faReorder} />
      </div>
      <div className="product-card__image">
        <img src={moov} alt="product" />
      </div>
      <div className="product-card__content">
        <div className="product-card__content__title">
          <h3>Moov 55g</h3>
        </div>
        <div className="product-card__content__price">
          <p>₹199.00 <span className="price-discount">Save 20%</span></p>
        </div>
        <div className="product-card__content__button">
          <button>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
