import moov from "../../assets/moov.jpg";
import "./ProductCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";

const ProductCard = ({ onAddToCart, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      <div className="product-card__image" onClick={onClick}>
        <img src={moov} alt="Moov Fast Pain Relief Spray" />
        <button className="product-card__favorite" onClick={toggleFavorite}>
          <FontAwesomeIcon icon={isFavorite ? fasHeart : farHeart} />
        </button>
      </div>
      <div className="product-card__content">
        <div className="product-card__content__title" onClick={onClick}>
          <h3>Moov 55GM SPRAY</h3>
          <span className="product-card__content__weight" onClick={onClick}>55g</span>
        </div>
        <div className="product-card__content__price" onClick={onClick}>
          <p className="product-card__content__actual-price">Rs. 249.00</p>
          <p className="product-card__content__discounted-price">Rs. 199.00</p>
          <p className="product-card__content__save">Save up to 20% !</p>
        </div>
        <div className="product-card__content__button">
          <button onClick={onAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  onAddToCart: PropTypes.func,
  onClick: PropTypes.func,
};

export default ProductCard;
