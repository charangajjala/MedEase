import "./SearchResult.scss";
import moov from "../../assets/moov.jpg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useCart from "../../context/CartContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import endpoints from "../../constants/endpoints";
import toast from "react-hot-toast";

const SearchResult = ({ product }) => {
  const currentDate = new Date();
  const expiryDate = new Date(product.expiryDate);
  const timeDiff = expiryDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const navigate = useNavigate();
  const { cartCount, updateCartCount } = useCart();
  const axiosPrivate = useAxiosPrivate();
  // Using a predefined variable for medicineId
  const productId = product.id;

  let expiryClass = "";
  let expiryText = "Expired";

  if (daysLeft > 0) {
    if (daysLeft > 365) {
      expiryText = "Expires in more than a year";
      expiryClass = "expires-long";
    } else if (daysLeft <= 7) {
      expiryText = `Expires in ${daysLeft} days`;
      expiryClass = "expires-soon";
    } else if (daysLeft <= 30) {
      expiryText = `Expires in ${daysLeft} days`;
      expiryClass = "expires-medium";
    } else {
      expiryText = `Expires in ${daysLeft} days`;
      expiryClass = "expires-long";
    }
  } else {
    expiryClass = "expired";
  }

  const handleNavigate = () => {
    navigate("/product", { state: { data: product } });
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
      toast.success("Added to cart");
      updateCartCount(cartCount + 1);
    } catch (err) {
      console.error("Error adding product to cart:", err);
      toast.error("Error adding product to cart");
    }
  };

  const addToCart = async (product) => {
    console.log("The product id is:", product.id);
    try {
      const response = await axiosPrivate.post(endpoints.ADD_TO_CART_URL, {
        medicineId: productId,
        quantity: 1,
        costPerMonth: product.costPerMonth,
      });
      const data = await response.data;
      return data;
    } catch (err) {
      console.error("Error in addToCart:", err);
      throw err;
    }
  };

  return (
    <div className="results">
      <div className="results__image" onClick={handleNavigate}>
        <img src={moov} alt={product.productTitle} />
      </div>
      <div className="results__info">
        <div className="results__info-details" onClick={handleNavigate}>
          <div className="results__info-name">
            <h2>{product.productTitle}</h2>
          </div>
          <div className="results__info-type">
            <p>Type: {product.productType}</p>
          </div>
          <div className="results__info-company">
            <p>Company: {product.companyName}</p>
          </div>
          <div className={`results__info-expiry ${expiryClass}`}>
            <p>{expiryText}</p>
          </div>
          <div className="results__info-code">
            <p>Product Code: {product.productCode}</p>
          </div>
          <div className="results__info-description">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="results__info-buy">
          <div className="results__info-price">
            <h3>${product.costPerMonth}</h3>
          </div>
          <div
            className={`results__info-stock ${
              product.totalStock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            <p>{product.totalStock > 0 ? "In Stock" : "Out of Stock"}</p>
          </div>
          <div className="results__info-actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  product: PropTypes.object,
};

export default SearchResult;
