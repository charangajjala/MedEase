import moov from "../../assets/moov.jpg";
import "./ProductCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ onAddToCart, data, addingToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleNavigation = () => {
    navigate("/product", { state: { data: data } });
  };
  const cardClasses = addingToCart
    ? "product-card product-card__blurred"
    : "product-card";

  return (
    <div className={cardClasses}>
      <div className="product-card__image">
        <img
          src={moov}
          alt="Moov Fast Pain Relief Spray"
          onClick={handleNavigation}
        />
        <button className="product-card__favorite" onClick={toggleFavorite}>
          <FontAwesomeIcon icon={faHeart} color={isFavorite ? "red" : "gray"} />
        </button>
      </div>
      <div className="product-card__content">
        <div
          className="product-card__content__title"
          onClick={handleNavigation}
        >
          <h3>{data.productTitle}</h3>
          <span
            className="product-card__content__weight"
            onClick={handleNavigation}
          >
            55g
          </span>
        </div>
        <div
          className="product-card__content__price"
          onClick={handleNavigation}
        >
          {/* <p className="product-card__content__actual-price">
            ${data.costPerMonth}.00
          </p> */}
          <p className="product-card__content__discounted-price">
            ${data.costPerMonth}.00
          </p>
          {/* <p className="product-card__content__save">Save up to 20% !</p> */}
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
  data: PropTypes.object,
  addingToCart: PropTypes.objectOf(PropTypes.bool),
};

export default ProductCard;
