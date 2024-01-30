import "./ProductCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import generateS3ImageUrl from "../../utils/s3Utils";

const ProductCard = ({ onAddToCart, data, addingToCart, imageKey }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  if (!data) {
    return null;
  }

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (isFavorite == false) {
      toast.success("Added to favorites");
    } else {
      toast.success("Removed from favorites");
    }
  };

  const handleNavigation = () => {
    // navigate("/product", { state: { data: data } });
    navigate("/product/{id}".replace("{id}", data.id));
  };
  const cardClasses = addingToCart
    ? "product-card product-card__blurred"
    : "product-card";

  return (
    <div className={cardClasses}>
      <div className="product-card__image">
        {isLoading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
        <img
          src={generateS3ImageUrl(imageKey)}
          alt="Moov Fast Pain Relief Spray"
          onClick={handleNavigation}
          onLoad={handleImageLoaded}
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
  addingToCart: PropTypes.bool,
  imageKey: PropTypes.string,
};

export default ProductCard;
